import React from "react";
import { Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import AuthButton from "../components/AuthButton";
import SwitchLink from "../components/SwitchLink";
import { useForm } from "../hooks/useForm";
import { colors } from "../theme/theme";

type LoginOrgScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
    reset: (estado: { index: number; routes: { name: string }[] }) => void;
  };
};

export type LoginOrgFormValues = {
  cnpj: string;
  senha: string;
};

export default function LoginOrgScreen({ navigation }: LoginOrgScreenProps) {
  const { form, updateField, formValido } = useForm<LoginOrgFormValues>({
    cnpj: "",
    senha: "",
  });

  function onSubmit() {
    console.log("Login de organização:", form);
    // TODO: chamada real pra API de login (CNPJ + senha)
    // zera a pilha: depois de entrar, o "voltar" não leva de novo ao login
    navigation.reset({ index: 0, routes: [{ name: "RiskAnalysis" }] });
  }

  return (
    <AuthLayout
      titulo="Para continuar, informe..."
      painel={
        <>
          <Ionicons name="business-outline" size={52} color={colors.creamBg} style={styles.selo} />
          <Text style={styles.titulo}>Portal de gestão do parceiro</Text>
          <Text style={styles.subtitulo}>Acesso restrito:</Text>
          <Text style={styles.pequeno}>
            Credenciais administrativas obrigatórias para acesso ao painel de controle.
          </Text>
        </>
      }
    >
      <FormField
        icon="document-text-outline"
        label="CNPJ da instituição:"
        placeholder="00.000.000/0000-00"
        keyboardType="numeric"
        value={form.cnpj}
        onChangeText={updateField("cnpj")}
      />
      <FormField
        icon="lock-closed-outline"
        label="Senha:"
        placeholder="••••••••••"
        senha
        value={form.senha}
        onChangeText={updateField("senha")}
      />

      <AuthButton label="Autenticar acesso" onPress={onSubmit} disabled={!formValido} />

      <SwitchLink
        texto="Nova instituição?"
        link="Solicitar credenciamento"
        onPress={() => navigation.navigate("SignupOrg")}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  selo: { alignSelf: "center", marginBottom: 12 },
  titulo: { fontSize: 24, fontWeight: "600", color: colors.creamBg, textAlign: "center" },
  subtitulo: { fontSize: 18, color: colors.creamBg, marginTop: 25 },
  pequeno: { fontSize: 16, lineHeight: 22, color: colors.creamBg, marginTop: 6, marginBottom: 30 },
});
