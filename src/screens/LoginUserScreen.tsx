import React, { useState } from "react"
import { api, salvarToken } from "../services/api"
import { View, Text, Image, StyleSheet } from "react-native";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import AuthButton from "../components/AuthButton";
import SwitchLink from "../components/SwitchLink";
import { useForm } from "../hooks/useForm";
import { colors } from "../theme/theme";

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
  const { form, updateField, formValido } = useForm<LoginUserFormValues>({
    email: "",
    senha: "",
  });

  const [enviando, setEnviando] = useState(false);
const [erro, setErro] = useState("");

async function onSubmit() {
  setEnviando(true);
  setErro("");
  try {
    const r = await api<{ token: string }>("/auth/usuario/login", { body: form });
    salvarToken(r.token);
  } catch (e) {
    setErro((e as Error).message);
    return;
  } finally {
    setEnviando(false);
  }
  navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
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
      />
      <FormField
        icon="lock-closed-outline"
        label="Senha:"
        placeholder="••••••••••"
        senha
        value={form.senha}
        onChangeText={updateField("senha")}
      />

      <AuthButton label="Entrar" onPress={onSubmit} disabled={!formValido} />

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
