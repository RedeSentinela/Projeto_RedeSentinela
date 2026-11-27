import React, { useState } from "react";
import { api, salvarToken } from "../services/api";
import { Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import AuthButton from "../components/AuthButton";
import SwitchLink from "../components/SwitchLink";
import { useForm } from "../hooks/useForm";
import { colors } from "../theme/theme";
import { erroCnpj, erroSenha, mascaraCnpj, semErros } from "../utils/validacao";

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
  const { form, updateField } = useForm<LoginOrgFormValues>({
    cnpj: "",
    senha: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [mostrarErros, setMostrarErros] = useState(false);

  const erros = { cnpj: erroCnpj(form.cnpj), senha: erroSenha(form.senha) };

  async function onSubmit() {
    setMostrarErros(true);
    if (!semErros(erros)) return;
    setEnviando(true);
    setErro("");
    try {
      const r = await api<{ token: string }>("/auth/organizacao/login", { body: form });
      salvarToken(r.token);
    } catch (e) {
      setErro((e as Error).message);
      return;
    } finally {
      setEnviando(false);
    }
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
        onChangeText={(t) => updateField("cnpj")(mascaraCnpj(t))}
        erro={mostrarErros ? erros.cnpj : ""}
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
        label={enviando ? "Entrando..." : "Autenticar acesso"}
        onPress={onSubmit}
        carregando={enviando}
        erro={erro}
      />

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
