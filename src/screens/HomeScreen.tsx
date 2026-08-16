import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { colors, typography, spacing } from "../theme/theme";

// tel modelo simples — substituir pela tela real do app
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Você está na Rede Sentinela</Text>
        <Text style={styles.subtitle}>
          Essa é uma tela placeholder. Continue construindo o app a partir
          daqui.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.mintBg },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  title: { ...typography.h1, textAlign: "center", marginBottom: spacing.sm },
  subtitle: { ...typography.body, textAlign: "center" },
});