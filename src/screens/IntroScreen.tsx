import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AuthButton from "../components/AuthButton";
import { colors, spacing } from "../theme/theme";

type IntroScreenProps = {
  navigation: { navigate: (screen: string) => void };
};

// Boas-vindas "Você não está sozinha!", antes de escolher o tipo de cadastro
export default function IntroScreen({ navigation }: IntroScreenProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.titulo}>Você não está sozinha!</Text>
      <Text style={styles.subtitulo}>
        Aqui você encontra acolhimento, informação e uma rede de apoio pronta para te ouvir, sem
        julgamentos e com total sigilo. Cada passo é seu, no seu tempo, e a gente caminha junto.
      </Text>
      <AuthButton label="Próximo passo" onPress={() => navigation.navigate("UserType")} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#A8B378",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    gap: 30,
  },
  titulo: { fontSize: 26, fontWeight: "600", color: colors.creamBg, textAlign: "center" },
  subtitulo: { fontSize: 18, lineHeight: 28, color: colors.creamBg, textAlign: "center" },
});
