import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import ProgressDots from "../components/ProgressDots";
import { colors, typography, spacing } from "../theme/theme";

// Tela 2 do onboarding: "Encontre Apoio Especializado" (passo 2 de 4)
export default function SupportScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeTop}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Ionicons name="arrow-back" size={22} color={colors.textDark} />
          </Pressable>

          <View style={styles.headerTextWrap}>
            <Text style={styles.brand}>Rede Sentinela</Text>
            <Text style={styles.step}>PASSO 2 DE 4</Text>
          </View>

          <View style={{ width: 22 }} />
        </View>

<ScrollView
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
  style={[styles.scrollView, { flex: 1 }]}
>
  <View style={styles.contentWrapper}>
    <View style={styles.illustrationCard}>
      <Image
        source={require("../assets/apoio.png")}
        style={styles.illustrationImage}
        resizeMode="cover"
      />
    </View>

    <Text style={styles.title}>Encontre Apoio Especializado</Text>
    <Text style={styles.subtitle}>
      Localize ONGs, hospitais e profissionais qualificados em uma rede
      segura de acolhimento.
    </Text>
  </View>
</ScrollView>
      </SafeAreaView>

      <View style={styles.sheet}>
        <Pressable style={styles.infoCard}>
          <View style={styles.infoIconWrap}>
            <Ionicons name="people" size={18} color={colors.brownAccent} />
          </View>
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoTitle}>Rede de Apoio</Text>
            <Text style={styles.infoSubtitle}>Chat 24h disponível</Text>
          </View>
        </Pressable>

        <View style={styles.dotsWrapper}>
          <ProgressDots total={4} activeIndex={1} />
        </View>

        <PrimaryButton
          label="Próximo passo"
          onPress={() => navigation.navigate("Security")}
        />

        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backLabel}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.mintBg },
  safeTop: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  headerTextWrap: { alignItems: "center" },
  brand: { ...typography.brand },
  step: {
    ...typography.label,
    marginTop: 2,
  },
  scrollView: {
    flex: 1, // Importante: faz o ScrollView ocupar o espaço disponível
  },
  scrollContent: {
    flexGrow: 1, // Permite o conteúdo crescer
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg, // Adicionado padding inferior
  },
  illustrationCard: {
    width: "100%",
    aspectRatio: 16 / 10,
    maxHeight: 400,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    marginBottom: spacing.md, // Adicionado espaçamento abaixo da imagem
  },
  illustrationImage: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: spacing.sm, // Adicionado espaçamento abaixo do título
  },
  subtitle: {
    ...typography.body,
    textAlign: "center",
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.md, // Adicionado espaçamento abaixo do subtítulo
  },
  sheet: {
    backgroundColor: colors.cardWhite,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -6 },
    elevation: 8,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  infoIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F3EFE0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  infoTextWrap: { flex: 1 },
  infoTitle: { fontSize: 14, fontWeight: "700", color: colors.textDark },
  infoSubtitle: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  dotsWrapper: { alignItems: "center", marginBottom: spacing.md },
  backBtn: { alignItems: "center", marginTop: spacing.md },
  backLabel: { fontSize: 14, fontWeight: "600", color: colors.textDark },

  contentWrapper: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: spacing.xl,
},
});