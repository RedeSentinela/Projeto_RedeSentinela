import React, { useState } from "react";
import { api, salvarToken } from "../services/api";
import { View, Text, Image, StyleSheet } from "react-native";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import AuthButton from "../components/AuthButton";
import SwitchLink from "../components/SwitchLink";
import { useForm } from "../hooks/useForm";
import { colors } from "../theme/theme";
import { erroEmail, erroSenha, semErros } from "../utils/validacao";

type LoginUserScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
    reset: (estado: { index: number; routes: { name: string }[] }) => void;
  };
};

export type LoginUserFormValues = {
  email: string;
  senha: string;
};

export default function LoginUserScreen({ navigation }: LoginUserScreenProps) {
  const { form, updateField } = useForm<LoginUserFormValues>({
    email: "",
    senha: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [mostrarErros, setMostrarErros] = useState(false); // só pinta de vermelho depois de tentar entrar

  const erros = { email: erroEmail(form.email), senha: erroSenha(form.senha) };

  async function onSubmit() {
    setMostrarErros(true);
    if (!semErros(erros)) return;
    setEnviando(true);
    setErro("");
    try {
      const r = await api<{ token: string }>("/auth/usuario/login", { body: form });
      salvarToken(r.token);
    } catch (e) {
      setErro((e as Error).message); // ex: "Email ou senha incorretos."
      return;
    } finally {
      setEnviando(false);
    }
    // quem faz login já tem conta, então já viu o guia inicial no cadastro: vai direto para a Home
    navigation.reset({ index: 0, routes: [{ name: "SearchHelp" }] });
  }

  return (
    <AuthLayout
      titulo="Vamos lá?"
      painelEmbaixo
      painel={
        <View style={styles.linha}>
          <Image
            source={require("../assets/image/waveIMG.png")}
            style={styles.img}
            resizeMode="contain"
          />
          <View style={styles.textos}>
            <Text style={styles.titulo}>Olá novamente!</Text>
            <Text style={styles.subtitulo}>Estamos aqui com você!</Text>
          </View>
        </View>
      }
    >
      <FormField
        icon="mail-outline"
        label="Email:"
        placeholder="email_exemplo@gmail.com"
        keyboardType="email-address"
        value={form.email}
        onChangeText={updateField("email")}
        erro={mostrarErros ? erros.email : ""}
      />
      <FormField
        icon="lock-closed-outline"
        label="Senha:"
        placeholder="••••••••••"
        senha
        value={form.senha}
        onChangeText={updateField("senha")}
        erro={mostrarErros ? erros.senha : ""}
      />

      <AuthButton
        label={enviando ? "Entrando..." : "Entrar"}
        onPress={onSubmit}
        carregando={enviando}
        erro={erro}
      />

      <SwitchLink
        texto="Você não tem uma conta?"
        link="Então vamos criar uma nova conta!"
        onPress={() => navigation.navigate("UserType")}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: "row", alignItems: "flex-end", flexGrow: 1 },
  img: { width: 150, height: 210 },
  textos: { flex: 1, alignItems: "flex-end", alignSelf: "center" },
  titulo: { fontSize: 26, fontWeight: "600", color: colors.creamBg, textAlign: "right" },
  subtitulo: { fontSize: 18, lineHeight: 28, color: colors.creamBg, textAlign: "right", marginTop: 10 },
});
