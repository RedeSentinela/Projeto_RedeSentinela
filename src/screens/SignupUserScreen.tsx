import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import AuthButton from "../components/AuthButton";
import SwitchLink from "../components/SwitchLink";
import { useForm } from "../hooks/useForm";
import { colors } from "../theme/theme";

type SignupUserScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
    reset: (estado: { index: number; routes: { name: string }[] }) => void;
  };
};

export type SignupUserFormValues = {
  email: string;
  nome: string;
  senha: string;
};

export default function SignupUserScreen({ navigation }: SignupUserScreenProps) {
  const { form, updateField, formValido } = useForm<SignupUserFormValues>({
    email: "",
    nome: "",
    senha: "",
  });

  function onSubmit() {
    console.log("Cadastrando:", form);
    // TODO: chamada real pra API de cadastro
    // zera a pilha: depois de entrar, o "voltar" não leva de novo ao login
    navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
  }

  return (
    <AuthLayout
      titulo="Você só precisa informar..."
      painel={
        <>
          <Text style={styles.titulo}>Vamos criar uma nova conta?</Text>
          <View style={styles.linha}>
            <Text style={styles.subtitulo}>
              Fique tranquila! Seus dados pessoais estarão invisíveis para nós.
            </Text>
            <Image
              source={require("../assets/image/signupIMG.png")}
              style={styles.img}
              resizeMode="contain"
            />
          </View>
        </>
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
        icon="person-outline"
        label="Nome:"
        placeholder="Seu nome aqui :)"
        autoCapitalize="words"
        value={form.nome}
        onChangeText={updateField("nome")}
      />
      <FormField
        icon="lock-closed-outline"
        label="Senha:"
        placeholder="••••••••••"
        senha
        value={form.senha}
        onChangeText={updateField("senha")}
      />

      <AuthButton label="Criar nova conta" onPress={onSubmit} disabled={!formValido} />

      <SwitchLink
        texto="Você já tem uma conta?"
        link="Então vamos fazer login!"
        onPress={() => navigation.navigate("LoginUser")}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 26, fontWeight: "600", color: colors.creamBg, lineHeight: 34 },
  linha: { flexDirection: "row", alignItems: "flex-end", marginTop: 18 },
  subtitulo: { flex: 1, fontSize: 18, lineHeight: 28, color: colors.creamBg, paddingBottom: 40 },
  img: { width: 140, height: 170 },
});
