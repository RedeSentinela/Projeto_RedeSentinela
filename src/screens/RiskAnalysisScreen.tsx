import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { api, salvarToken } from "../services/api";


type OcorrenciaRegiao = {
  regiao: string;
  quantidade: number;
  cor: string;
};

// dados de exemplo MOCKADOS — depois substituímos por uma chamada real à API
const OCORRENCIAS_MOCK: OcorrenciaRegiao[] = [
  { regiao: "Sudeste", quantidade: 542, cor: colors.brownAccent },
  { regiao: "Nordeste", quantidade: 310, cor: colors.oliveDark },
  { regiao: "Sul", quantidade: 215, cor: "#4A5A2A" },
  { regiao: "Centro-Oeste", quantidade: 130, cor: "#F2B872" },
  { regiao: "Norte", quantidade: 97, cor: "#D3C8BA" },
];

const FILTROS = ["Cidade", "Estado", "Região"];

const RESUMO = [
  { icon: "warning-outline", iconBg: colors.inputBg, extra: "+12% este mês", label: "Total Occurrences", valor: "1,284", cor: colors.brownAccent },
  { icon: "location-outline", iconBg: "#E2F5B4", extra: "Zona Sul", label: "Most Vulnerable Area", valor: "São Paulo, SP", cor: colors.oliveDark },
  { icon: "shield-checkmark-outline", iconBg: colors.inputBg, extra: "8 Novas Unidades", label: "Active Support Units", valor: "142", cor: colors.oliveDark },
] as const;

// Painel da organização: "Análise de Áreas de Risco"
export default function RiskAnalysisScreen() {
  const [filtro, setFiltro] = useState(0);
  const [ocorrencias] = useState<OcorrenciaRegiao[]>(OCORRENCIAS_MOCK);

  // a maior barra ocupa 85% do trilho, igual ao layout
  const maior = Math.max(...ocorrencias.map((o) => o.quantidade));

  function filtrarPeriodo() {
    console.log("Filtrando por:", FILTROS[filtro], "- últimos 30 dias");
    // TODO: chamada real pra API, algo como:
    // const dados = await chamar(`/api/ocorrencias?filtro=${filtro}&dias=30`);
  }

  const nav = useNavigation<any>();

  function sair() {
    salvarToken(null);
    nav.reset({ index: 0, routes: [{ name: "UserType" }] });
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color={colors.textDark} />
        <Text style={styles.logo}>SafeSpace</Text>
        <Ionicons name="notifications-outline" size={22} color={colors.textDark} />
        <View style={styles.avatar}>
          <Ionicons name="person-outline" size={18} color={colors.brownAccent} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.titulo}>Análise de Áreas de Risco</Text>

        <View style={[styles.card, styles.filtros]}>
          <View style={styles.filtroLinha}>
            <Text style={styles.filtroLabel}>Filtrar por:</Text>
            {/* toque no chip alterna entre Cidade / Estado / Região */}
            <Pressable style={styles.avatar} onPress={sair} accessibilityLabel="Sair da conta">
              <Ionicons name="log-out-outline" size={18} color={colors.brownAccent} />
            </Pressable>
          </View>
          <Pressable
            style={({ pressed }) => [styles.periodo, pressed && styles.pressed]}
            onPress={filtrarPeriodo}
            accessibilityRole="button"
          >
            <Ionicons name="calendar-outline" size={14} color="#fff" />
            <Text style={styles.periodoTexto}>Últimos 30 dias</Text>
          </Pressable>
        </View>

        {RESUMO.map((item) => (
          <View key={item.label} style={styles.card}>
            <View style={styles.cardTopo}>
              <View style={[styles.cardIcone, { backgroundColor: item.iconBg }]}>
                <Ionicons name={item.icon} size={20} color={item.cor} />
              </View>
              <Text style={styles.cardExtra}>{item.extra}</Text>
            </View>
            <Text style={styles.cardLabel}>{item.label}</Text>
            <Text style={[styles.cardValor, { color: item.cor }]}>{item.valor}</Text>
          </View>
        ))}

        <View style={styles.card}>
          <View style={styles.graficoTopo}>
            <View style={styles.flex}>
              <Text style={styles.graficoTitulo}>Quantidade de Ocorrências vs Região</Text>
              <Text style={styles.graficoSub}>Distribuição regional de pedidos de suporte</Text>
            </View>
            <Ionicons name="ellipsis-vertical" size={20} color={colors.textDark} />
          </View>

          {ocorrencias.map((o) => (
            <View key={o.regiao} style={styles.barraItem}>
              <View style={styles.barraLegenda}>
                <Text style={styles.barraTexto}>{o.regiao}</Text>
                <Text style={[styles.barraTexto, styles.negrito]}>{o.quantidade}</Text>
              </View>
              <View style={styles.trilho}>
                <View
                  style={[
                    styles.preenchida,
                    { width: `${(o.quantidade / maior) * 85}%`, backgroundColor: o.cor },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.creamBg },
  flex: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  logo: { flex: 1, fontSize: 22, fontWeight: "700", color: colors.brownAccent },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.divider,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 24, fontWeight: "700", color: colors.brownAccent, marginBottom: 16 },
  card: {
    backgroundColor: colors.creamBg,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  filtros: { padding: 14, gap: 12, alignItems: "flex-start" },
  filtroLinha: { flexDirection: "row", alignItems: "center", gap: 12 },
  filtroLabel: { fontSize: 13, color: colors.textBody },
  chip: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipTexto: { fontSize: 13, color: colors.textDark },
  periodo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.brownAccent,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pressed: { backgroundColor: colors.brownAccentDark },
  periodoTexto: { color: "#fff", fontSize: 13, fontWeight: "600" },
  cardTopo: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  cardIcone: { width: 46, height: 46, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  cardExtra: { fontSize: 12, color: colors.textBody },
  cardLabel: { fontSize: 13, color: colors.textBody, marginBottom: 2 },
  cardValor: { fontSize: 32, fontWeight: "700" },
  graficoTopo: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 24 },
  graficoTitulo: { fontSize: 22, fontWeight: "700", lineHeight: 29, color: colors.brownAccent },
  graficoSub: { fontSize: 14, lineHeight: 20, color: colors.textBody, marginTop: 4 },
  barraItem: { marginBottom: 16 },
  barraLegenda: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  barraTexto: { fontSize: 13, color: colors.textDark },
  negrito: { fontWeight: "700" },
  trilho: { height: 24, borderRadius: 12, backgroundColor: colors.inputBg, overflow: "hidden" },
  preenchida: { height: "100%", borderRadius: 12 },
});
