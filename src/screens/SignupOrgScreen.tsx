import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import AuthButton from "../components/AuthButton";
import SwitchLink from "../components/SwitchLink";
import { useForm } from "../hooks/useForm";
import { colors } from "../theme/theme";

type SignupOrgScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
    reset: (estado: { index: number; routes: { name: string }[] }) => void;
  };
};

export type SignupOrgFormValues = {
  nome: string;
  cnpj: string;
  telefone: string;
  emailContato: string;
  endereco: string;
  senha: string;
};

const ETAPAS = ["Identificação", "Detalhes", "Confirmação"];

export default function SignupOrgScreen({ navigation }: SignupOrgScreenProps) {
  const { form, updateField, preenchido } = useForm<SignupOrgFormValues>({
    nome: "",
    cnpj: "",
    telefone: "",
    emailContato: "",
    endereco: "",
    senha: "",
  });
  const [step, setStep] = useState(1);

  const stepValido =
    step === 1
      ? preenchido("nome", "cnpj")
      : step === 2
        ? preenchido("telefone", "emailContato", "endereco")
        : preenchido("senha");

  function onSubmit() {
    console.log("Cadastrando organização:", form);
    // TODO: chamada real pra API
    // zera a pilha: depois de entrar, o "voltar" não leva de novo ao login
    navigation.reset({ index: 0, routes: [{ name: "RiskAnalysis" }] });
  }

  return (
    <AuthLayout
      titulo="Cadastro de parceiros"
      painel={
        <>
          <Ionicons name="business-outline" size={52} color={colors.creamBg} style={styles.selo} />
          <Text style={styles.titulo}>Portal de gestão do parceiro</Text>
          <Text style={styles.subtitulo}>
            Junte-se à nossa rede de acolhimento e ajude a transformar vidas em um ambiente seguro e
            humanizado.
          </Text>
        </>
      }
    >
      {/* indicador de etapas */}
      <View style={styles.steps}>
        <View style={styles.trilho} />
        {ETAPAS.map((label, i) => {
          const numero = i + 1;
          const ativa = step === numero;
          const feita = step > numero;
          return (
            <View key={label} style={styles.stepItem}>
              <View style={[styles.bolinha, (ativa || feita) && styles.bolinhaAtiva]}>
                {feita ? (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                ) : (
                  <Text style={[styles.numero, ativa && styles.numeroAtivo]}>{numero}</Text>
                )}
              </View>
              <Text style={[styles.stepLabel, ativa && styles.stepLabelAtiva]}>{label}</Text>
            </View>
          );
        })}
      </View>

      {step === 1 && (
        <>
          <FormField
            icon="business-outline"
            label="Nome da instituição:"
            placeholder="Ex: Instituto Renascer"
            autoCapitalize="words"
            value={form.nome}
            onChangeText={updateField("nome")}
          />
          <FormField
            icon="document-text-outline"
            label="CNPJ da instituição:"
            placeholder="00.000.000/0000-00"
            keyboardType="numeric"
            value={form.cnpj}
            onChangeText={updateField("cnpj")}
          />
        </>
      )}

      {step === 2 && (
        <>
          <FormField
            icon="call-outline"
            label="Telefone:"
            placeholder="(00) 00000-0000"
            keyboardType="phone-pad"
            value={form.telefone}
            onChangeText={updateField("telefone")}
          />
          <FormField
            icon="mail-outline"
            label="Email de contato:"
            placeholder="contato@instituicao.org"
            keyboardType="email-address"
            value={form.emailContato}
            onChangeText={updateField("emailContato")}
          />
          <FormField
            icon="location-outline"
            label="Endereço:"
            placeholder="Rua, número, bairro, cidade"
            autoCapitalize="sentences"
            value={form.endereco}
            onChangeText={updateField("endereco")}
          />
        </>
      )}

      {step === 3 && (
        <FormField
          icon="lock-closed-outline"
          label="Senha:"
          placeholder="••••••••••"
          senha
          value={form.senha}
          onChangeText={updateField("senha")}
        />
      )}

      <View style={styles.botoes}>
        {step > 1 && (
          <AuthButton label="Voltar" variante="secundario" onPress={() => setStep(step - 1)} />
        )}
        {step < 3 ? (
          <AuthButton label="Próximo" onPress={() => setStep(step + 1)} disabled={!stepValido} />
        ) : (
          <AuthButton label="Finalizar cadastro" onPress={onSubmit} disabled={!stepValido} />
        )}
      </View>

      <SwitchLink
        texto="Já tem cadastro?"
        link="Então vamos fazer login!"
        onPress={() => navigation.navigate("LoginOrg")}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  selo: { alignSelf: "center", marginBottom: 12 },
  titulo: { fontSize: 24, fontWeight: "600", color: colors.creamBg, textAlign: "center" },
  subtitulo: {
    fontSize: 17,
    lineHeight: 26,
    color: colors.creamBg,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 40,
  },
  steps: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
  trilho: {
    position: "absolute",
    top: 15,
    left: "16%",
    right: "16%",
    height: 2,
    backgroundColor: colors.divider,
  },
  stepItem: { flex: 1, alignItems: "center", gap: 6 },
  bolinha: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.divider,
    alignItems: "center",
    justifyContent: "center",
  },
  bolinhaAtiva: { backgroundColor: colors.brownAccent },
  numero: { fontWeight: "700", color: colors.textMuted },
  numeroAtivo: { color: "#fff" },
  stepLabel: { fontSize: 14, color: colors.textMuted },
  stepLabelAtiva: { color: colors.brownAccent, fontWeight: "700" },
  botoes: { flexDirection: "row", justifyContent: "center", gap: 12 },
});
