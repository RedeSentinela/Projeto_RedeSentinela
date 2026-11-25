import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme/theme";

type UserTypeScreenProps = {
  navigation: { navigate: (screen: string) => void };
};

const OPCOES = [
  {
    destino: "SignupUser",
    icon: "person-outline",
    titulo: "Usuária comum",
    subtitulo: "Quero apoio e acompanhamento individual",
  },
  {
    destino: "SignupOrg",
    icon: "business-outline",
    titulo: "Organização",
    subtitulo: "Represento uma instituição ou coletivo",
  },
] as const;

// "Para iniciar seu cadastro..." — escolhe entre usuária e organização
export default function UserTypeScreen({ navigation }: UserTypeScreenProps) {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Para iniciar seu cadastro...</Text>
      <Text style={styles.subtitulo}>Como você vai usar esse app?</Text>

      {OPCOES.map((opcao) => (
        <Pressable
          key={opcao.destino}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() => navigation.navigate(opcao.destino)}
          accessibilityRole="button"
        >
          <Ionicons name={opcao.icon} size={44} color={colors.brownAccent} />
          <View style={styles.cardTextos}>
            <Text style={styles.cardTitulo}>{opcao.titulo}</Text>
            <Text style={styles.cardSubtitulo}>{opcao.subtitulo}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.oliveDark },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  titulo: { fontSize: 26, fontWeight: "600", color: colors.creamBg, textAlign: "center" },
  subtitulo: {
    fontSize: 20,
    color: colors.creamBg,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 35,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: colors.divider,
    borderRadius: 16,
    padding: 18,
    minHeight: 100,
    marginBottom: spacing.md,
  },
  cardPressed: { opacity: 0.85 },
  cardTextos: { flex: 1 },
  cardTitulo: { color: colors.brownAccent, fontWeight: "700", fontSize: 20 },
  cardSubtitulo: { color: colors.brownAccent, fontSize: 16, lineHeight: 21, marginTop: 2 },
});
