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
import FeatureCard from "../components/FeatureCard";
import { colors, typography, spacing } from "../theme/theme";

// Tela 3 do onboarding: "Denúncia e Segurança" (passo 3 de 4)
export default function SecurityScreens({ navigation }) {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeTop}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Ionicons name="arrow-back" size={22} color={colors.textDark} />
          </Pressable>

          <View style={styles.headerTextWrap}>
            <Text style={styles.brand}>Rede Sentinela</Text>
            <Text style={styles.step}>PASSO 3 DE 4</Text>
          </View>

          <View style={{ width: 22 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Imagem ajustada - SEM fundo branco */}
          <Image
            source={require("../assets/denuncia.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />

          <Text style={styles.title}>Denúncia e Segurança</Text>
          <Text style={styles.subtitle}>
            Registre denúncias anônimas e configure seus contatos de
            emergência para alertas imediatos.
          </Text>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.sheet}>
        <View style={styles.cardsRow}>
          <FeatureCard
            icon="person-outline"
            title="Contatos"
            subtitle="Alertas rápidos"
          />
          <FeatureCard
            icon="megaphone-outline"
            title="Denúncia Segura"
            subtitle="Canais oficiais"
          />
        </View>

        <View style={styles.dotsWrapper}>
          <ProgressDots total={4} activeIndex={2} />
        </View>

        <PrimaryButton
          label="Próximo passo"
          onPress={() => navigation.navigate("Connect")}
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
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  // REMOVEMOS o illustrationCard e deixamos só a imagem
  illustrationImage: {
    width: 260, // Largura fixa
    height: 260, // Altura fixa (quadrada)
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    textAlign: "center",
    paddingHorizontal: spacing.sm,
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
  cardsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  dotsWrapper: { alignItems: "center", marginBottom: spacing.md },
  backBtn: { alignItems: "center", marginTop: spacing.md },
  backLabel: { fontSize: 14, fontWeight: "600", color: colors.textDark },
});