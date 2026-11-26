import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { api } from "../services/api";
import { colors, typography, spacing } from "../theme/theme";

type SearchHelpScreenProps = {
  navigation: { navigate: (screen: string, params?: object) => void };
};

type ResultadoBusca = {
  id: number;
  nome: string;
  endereco: string;
  descServicos: string | null;
};

// "Busque Ajuda": encontra ONGs e serviços de apoio pelo bairro
export default function SearchHelpScreen({ navigation }: SearchHelpScreenProps) {
  const [bairro, setBairro] = useState("");
  const [resultados, setResultados] = useState<ResultadoBusca[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  function handleNavigate(key: string) {
    if (key === "Home") navigation.navigate("SearchHelp");
    if (key === "Guide") navigation.navigate("Guide");
    if (key === "Report") navigation.navigate("SafeReport");
    if (key === "Profile") navigation.navigate("Contacts");
  }

  async function buscar() {
    setCarregando(true);
    setErro("");
    try {
      setResultados(await api<ResultadoBusca[]>(`/organizacoes?bairro=${encodeURIComponent(bairro)}`));
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setCarregando(false);
    }
  }

  // ao abrir a tela, já mostra os locais cadastrados
  useEffect(() => {
    buscar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top", "bottom"]} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.titulo}>Busque Ajuda</Text>

          <View style={styles.hero}>
            <Text style={styles.heroTitulo}>Encontre apoio perto de você</Text>
            <Text style={styles.heroTexto}>
              Conectamos você a uma rede segura de ONGs e profissionais especializados
            </Text>
          </View>

          <View style={styles.buscaLinha}>
            <Ionicons name="location-outline" size={18} color={colors.brownAccent} />
            <TextInput
              style={styles.buscaInput}
              placeholder="Digite seu Bairro"
              placeholderTextColor={colors.textMuted}
              value={bairro}
              onChangeText={setBairro}
              onSubmitEditing={buscar}
              accessibilityLabel="Bairro"
            />
            <Pressable
              style={({ pressed }) => [styles.buscaBotao, pressed && styles.pressed]}
              onPress={buscar}
              accessibilityRole="button"
            >
              <Ionicons name="search" size={16} color="#fff" />
              <Text style={styles.buscaBotaoTexto}>Buscar</Text>
            </Pressable>
          </View>

          <Text style={styles.secaoTitulo}>Locais de apoio:</Text>

          {carregando && <ActivityIndicator color={colors.oliveDark} />}
          {erro ? <Text style={styles.aviso}>{erro}</Text> : null}
          {!carregando && !erro && resultados.length === 0 && (
            <Text style={styles.aviso}>Nenhum local encontrado nesse bairro.</Text>
          )}

          {resultados.map((r) => (
            <View key={r.id} style={styles.card}>
              <View style={styles.cardIcone}>
                <Ionicons name="business-outline" size={22} color={colors.oliveDark} />
              </View>
              <View style={styles.flex}>
                <Text style={styles.cardNome}>{r.nome}</Text>
                <Text style={styles.cardEndereco}>{r.endereco}</Text>
                {r.descServicos ? <Text style={styles.cardDesc}>{r.descServicos}</Text> : null}
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>

      <BottomNav activeKey="Home" onNavigate={handleNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.creamBg },
  flex: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: 100 },
  titulo: { ...typography.h1, color: colors.oliveDark, fontSize: 26, marginBottom: 20 },
  hero: { backgroundColor: "#E2F5B4", borderRadius: 18, padding: spacing.lg, marginBottom: 35 },
  heroTitulo: { fontSize: 20, fontWeight: "700", color: colors.oliveDark, marginBottom: 8 },
  heroTexto: { fontSize: 15, lineHeight: 21, color: colors.oliveDark },
  buscaLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 12,
    paddingLeft: 12,
    marginBottom: 40,
  },
  buscaInput: { flex: 1, minWidth: 0, fontSize: 15, color: colors.textDark, paddingVertical: 12 },
  buscaBotao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.brownAccent,
    borderRadius: 12,
    padding: 15,
  },
  pressed: { backgroundColor: colors.brownAccentDark },
  buscaBotaoTexto: { color: "#fff", fontWeight: "600", fontSize: 15 },
  aviso: { fontSize: 14, color: colors.textBody, marginBottom: 16 },
  secaoTitulo: { fontSize: 18, fontWeight: "700", color: colors.textDark, marginBottom: 14 },
  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: colors.cardWhite,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardIcone: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#E5EFC9",
    alignItems: "center",
    justifyContent: "center",
  },
  cardNome: { fontSize: 16, fontWeight: "700", color: colors.textDark },
  cardEndereco: { fontSize: 14, color: colors.textBody, marginTop: 2 },
  cardDesc: { fontSize: 12, color: colors.textBody, marginTop: 2 },
});