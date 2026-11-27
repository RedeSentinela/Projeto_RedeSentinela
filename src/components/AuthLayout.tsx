import React, { type ReactNode } from "react";
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "../theme/theme";

type AuthLayoutProps = {
  painel: ReactNode;      // conteúdo do painel verde
  titulo: string;         // título do card branco
  children: ReactNode;    // campos do formulário
  painelEmbaixo?: boolean; // login de usuária: card branco em cima, painel verde embaixo
};

// Molde das telas de login/cadastro: painel verde + card branco arredondado
export default function AuthLayout({ painel, titulo, children, painelEmbaixo }: AuthLayoutProps) {
  // espaço da barra de notificações (topo) e da barra de botões do celular (base)
  const insets = useSafeAreaInsets();
  const topo = painelEmbaixo ? { paddingTop: 90 + insets.top } : { paddingTop: 35 + insets.top };
  const base = { paddingBottom: spacing.xl + insets.bottom };

  const card = (
    <View style={[styles.card, painelEmbaixo ? [styles.cardTopo, topo] : [styles.cardBase, base]]}>
      <Text style={styles.cardTitulo}>{titulo}</Text>
      {children}
    </View>
  );
  const verde = <View style={[styles.painel, painelEmbaixo ? base : topo]}>{painel}</View>;

  return (
    <KeyboardAvoidingView
      style={styles.root}
      // "padding" também no Android: com a tela de ponta a ponta (edge-to-edge) o Android não empurra mais a tela sozinho
      behavior={Platform.OS === "web" ? undefined : "padding"}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {painelEmbaixo ? card : verde}
        {painelEmbaixo ? verde : card}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.oliveDark },
  scroll: { flexGrow: 1 },
  painel: { paddingHorizontal: 28, paddingTop: 35 },
  card: {
    backgroundColor: colors.creamBg,
    paddingHorizontal: 28,
    paddingBottom: spacing.xl,
  },
  cardBase: {
    flexGrow: 1,
    paddingTop: 28,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  cardTopo: {
    paddingTop: 90,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  cardTitulo: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.oliveDark,
    textAlign: "center",
    marginBottom: 25,
  },
});
