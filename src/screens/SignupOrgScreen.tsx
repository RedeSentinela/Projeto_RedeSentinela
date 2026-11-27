import React, { useEffect, useState } from "react";
import { api, salvarToken } from "../services/api";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import AuthButton from "../components/AuthButton";
import SwitchLink from "../components/SwitchLink";
import FilterChip from "../components/FilterChip";
import { useForm } from "../hooks/useForm";
import { colors } from "../theme/theme";
import {
  erroCnpj,
  erroEmail,
  erroObrigatorio,
  erroSenha,
  erroTelefone,
  erroUf,
  mascaraCnpj,
  mascaraTelefone,
  semErros,
} from "../utils/validacao";

type SignupOrgScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
    reset: (estado: { index: number; routes: { name: string }[] }) => void;
  };
};

export type SignupOrgFormValues = {
  nome: string;
  cnpj: string;
  tipoOrganizacaoId: string;
  telefone: string;
  emailContato: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  descServicos: string;
  senha: string;
};

type TipoOrganizacao = { id: number; nome: string };

const ETAPAS = ["Identificação", "Detalhes", "Confirmação"];

export default function SignupOrgScreen({ navigation }: SignupOrgScreenProps) {
  const { form, updateField } = useForm<SignupOrgFormValues>({
    nome: "",
    cnpj: "",
    tipoOrganizacaoId: "",
    telefone: "",
    emailContato: "",
    endereco: "",
    bairro: "",
    cidade: "",
    uf: "",
    descServicos: "",
    senha: "",
  });
  const [step, setStep] = useState(1);
  const [tipos, setTipos] = useState<TipoOrganizacao[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [mostrarErros, setMostrarErros] = useState(false);

  // tipos de organização vêm do banco (ONG, Hospital, Delegacia da Mulher...)
  useEffect(() => {
    api<TipoOrganizacao[]>("/tipos-organizacao")
      .then(setTipos)
      .catch((e: Error) => setErro(e.message));
  }, []);

  // erros de cada etapa ("" = campo certo)
  const errosPorEtapa: Record<number, Partial<Record<keyof SignupOrgFormValues, string>>> = {
    1: {
      nome: erroObrigatorio(form.nome, "o nome da instituição", 3),
      cnpj: erroCnpj(form.cnpj),
      tipoOrganizacaoId: form.tipoOrganizacaoId ? "" : "Escolha o tipo de organização.",
    },
    2: {
      telefone: erroTelefone(form.telefone),
      emailContato: erroEmail(form.emailContato),
      endereco: erroObrigatorio(form.endereco, "o endereço", 5),
      bairro: erroObrigatorio(form.bairro, "o bairro"),
      cidade: erroObrigatorio(form.cidade, "a cidade"),
      uf: erroUf(form.uf),
    },
    3: {
      descServicos: erroObrigatorio(form.descServicos, "os serviços oferecidos", 10),
      senha: erroSenha(form.senha, true),
    },
  };
  const erros = errosPorEtapa[step];
  const erroDe = (campo: keyof SignupOrgFormValues) => (mostrarErros ? erros[campo] ?? "" : "");

  function proximo() {
    setMostrarErros(true);
    if (!semErros(erros as Record<string, string>)) return;
    setMostrarErros(false);
    setStep(step + 1);
  }

  async function onSubmit() {
    setMostrarErros(true);
    if (!semErros(erros as Record<string, string>)) return;
    setEnviando(true);
    setErro("");
    try {
      const r = await api<{ token: string }>("/auth/organizacao/cadastro", {
        body: { ...form, tipoOrganizacaoId: Number(form.tipoOrganizacaoId), uf: form.uf.toUpperCase() },
      });
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
            erro={erroDe("nome")}
          />
          <FormField
            icon="document-text-outline"
            label="CNPJ da instituição:"
            placeholder="00.000.000/0000-00"
            keyboardType="numeric"
            value={form.cnpj}
            onChangeText={(t) => updateField("cnpj")(mascaraCnpj(t))}
            erro={erroDe("cnpj")}
          />

          <Text style={styles.label}>Tipo de organização:</Text>
          <View style={styles.chips}>
            {tipos.map((t) => (
              <FilterChip
                key={t.id}
                label={t.nome}
                active={form.tipoOrganizacaoId === String(t.id)}
                onPress={() => updateField("tipoOrganizacaoId")(String(t.id))}
              />
            ))}
          </View>
          {erroDe("tipoOrganizacaoId") ? (
            <Text style={styles.erroCampo}>{erroDe("tipoOrganizacaoId")}</Text>
          ) : null}
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
            onChangeText={(t) => updateField("telefone")(mascaraTelefone(t))}
            erro={erroDe("telefone")}
          />
          <FormField
            icon="mail-outline"
            label="Email de contato:"
            placeholder="contato@instituicao.org"
            keyboardType="email-address"
            value={form.emailContato}
            onChangeText={updateField("emailContato")}
            erro={erroDe("emailContato")}
          />
          <FormField
            icon="location-outline"
            label="Endereço:"
            placeholder="Rua e número"
            autoCapitalize="sentences"
            value={form.endereco}
            onChangeText={updateField("endereco")}
            erro={erroDe("endereco")}
          />
          <FormField
            icon="map-outline"
            label="Bairro:"
            placeholder="Ex: Itaquera"
            autoCapitalize="words"
            value={form.bairro}
            onChangeText={updateField("bairro")}
            erro={erroDe("bairro")}
          />
          <View style={styles.linha}>
            <View style={styles.cidade}>
              <FormField
                icon="business-outline"
                label="Cidade:"
                placeholder="Ex: São Paulo"
                autoCapitalize="words"
                value={form.cidade}
                onChangeText={updateField("cidade")}
                erro={erroDe("cidade")}
              />
            </View>
            <View style={styles.uf}>
              <FormField
                icon="flag-outline"
                label="UF:"
                placeholder="SP"
                autoCapitalize="characters"
                maxLength={2}
                value={form.uf}
                onChangeText={updateField("uf")}
                erro={erroDe("uf")}
              />
            </View>
          </View>
        </>
      )}

      {step === 3 && (
        <>
          <FormField
            icon="heart-outline"
            label="Serviços oferecidos:"
            placeholder="Ex: apoio jurídico e psicológico para mulheres"
            autoCapitalize="sentences"
            multiline
            value={form.descServicos}
            onChangeText={updateField("descServicos")}
            erro={erroDe("descServicos")}
          />
          <FormField
            icon="lock-closed-outline"
            label="Senha:"
            placeholder="••••••••••"
            senha
            value={form.senha}
            onChangeText={updateField("senha")}
            erro={erroDe("senha")}
          />
        </>
      )}

      <View style={styles.botoes}>
        {step > 1 && (
          <AuthButton
            label="Voltar"
            variante="secundario"
            onPress={() => {
              setMostrarErros(false);
              setStep(step - 1);
            }}
          />
        )}
        {step < 3 ? (
          <AuthButton label="Próximo" onPress={proximo} />
        ) : (
          <AuthButton
            label={enviando ? "Cadastrando..." : "Finalizar cadastro"}
            onPress={onSubmit}
            carregando={enviando}
          />
        )}
      </View>
      {erro ? <Text style={styles.erroGeral}>{erro}</Text> : null}

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
  label: { fontSize: 15, fontWeight: "600", color: colors.brownAccent, marginBottom: 8 },
  chips: { flexDirection: "row", flexWrap: "wrap", rowGap: 8, marginBottom: 6 },
  erroCampo: { color: colors.dangerRed, fontSize: 13, marginBottom: 8 },
  erroGeral: { color: colors.dangerRed, fontSize: 14, textAlign: "center", marginTop: 10 },
  linha: { flexDirection: "row", gap: 12 },
  cidade: { flex: 1 },
  uf: { width: 90 },
});
