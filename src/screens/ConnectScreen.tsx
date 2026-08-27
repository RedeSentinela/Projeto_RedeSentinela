import React from "react";
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import ProgressDots from "../components/ProgressDots";
import FeatureCard from "../components/FeatureCard";
import { colors, typography, spacing } from "../theme/theme";
import { useSwipeNavigation } from "../hooks/useSwipeNavigation";
import { useScreenEntrance } from "../hooks/useScreenEntrance";

// Tipagem simples e local, sem precisar de arquivo separado
type ConnectScreenProps = {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
};

// Tela 4 (final) do onboarding: "Conecte-se com Apoio"
export default function ConnectScreen({ navigation }: ConnectScreenProps) {
  // Arrastar para a esquerda conclui a introdução (mesmo destino do botão
  // "Começar"); para a direita volta ao passo anterior.
  const { entranceStyle, imageStyle, contentStyle, sheetStyle, prepareForReturn } = useScreenEntrance();
  const goToGuide = () => {
    prepareForReturn();
    navigation.navigate("Guide");
  };
  const swipeHandlers = useSwipeNavigation({
    onSwipeLeft: goToGuide,
    onSwipeRight: () => navigation.goBack(),
  });

  return (
    <Animated.View style={[styles.root, entranceStyle]} {...swipeHandlers}>
      <LinearGradient
        colors={[colors.oliveDark, colors.oliveLight]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeTop}>
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={12}
              style={styles.headerButton}
            >
              <Ionicons name="arrow-back" size={22} color={colors.cardWhite} />
            </Pressable>

            <View style={styles.headerTextWrap}>
              <Text style={styles.brand}>Rede Sentinela</Text>
              <Text style={styles.step}>PASSO 4 DE 4</Text>
            </View>

            <Pressable
              onPress={goToGuide}
              style={styles.skipButton}
              hitSlop={10}
            >
              <Text style={styles.skip}>Pular</Text>
            </Pressable>
          </View>

          <Animated.View style={[styles.illustrationCard, imageStyle]}>
            <Image
              source={require("../assets/conecte.png")}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View style={contentStyle}>
            <View style={styles.textContent}>
              <Text style={styles.title}>Conecte-se com Apoio</Text>
              <Text style={styles.subtitle}>
                Encontre ONGs, hospitais especializados e profissionais prontos
                para ajudar você, tudo de forma rápida, segura e próxima à sua
                localização.
              </Text>
            </View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>

      <Animated.View style={[styles.sheet, sheetStyle]}>
        <View style={styles.sheetContent}>
          <View style={styles.cardsRow}>
            <View style={styles.cardWrapper}>
              <FeatureCard
                icon="share-social-outline"
                title="Rede ampla"
                subtitle="Profissionais e instituições de confiança"
              />
            </View>
            <View style={styles.cardWrapper}>
              <FeatureCard
                icon="navigate-outline"
                title="ONGs e hospitais"
                subtitle="Apoio localizado"
              />
            </View>
          </View>

          <View style={styles.dotsWrapper}>
            <ProgressDots total={4} activeIndex={3} />
          </View>

          <View style={styles.buttonWrapper}>
            <PrimaryButton
              label="Começar"
              onPress={goToGuide}
            />
          </View>

          <Pressable
            style={styles.loginRow}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>Já tem conta? </Text>
            <Text style={styles.loginLink}>Fazer login</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.oliveLight },
  gradient: { flex: 1.15 },
  safeTop: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: Platform.OS === "web" ? spacing.md : 0,
  },
  header: {
    width: "100%",
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "web" ? spacing.md : 0,
  },
  headerButton: {
    width: 44,
    alignItems: "flex-start",
  },
  headerTextWrap: {
    flex: 1,
    alignItems: "center",
  },
  brand: {
    ...typography.brand,
    color: colors.cardWhite,
  },
  step: {
    ...typography.label,
    fontSize: 10,
    color: "rgba(255,255,255,0.72)",
    marginTop: 1,
  },
  skipButton: {
    width: 44,
    alignItems: "flex-end",
  },
  skip: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    fontWeight: "500",
  },
  illustrationCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  illustrationImage: {
    width: "58%",
    height: "78%",
  },
  textContent: {
    transform: [{ translateY: -36 }],
  },
  sheet: {
    backgroundColor: colors.cardWhite,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -28,
    paddingTop: spacing.lg,
    minHeight: 300,
    justifyContent: "center",
  },
  sheetContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    alignItems: "center",
  },
  dotsWrapper: {
    alignItems: "center",
    height: 20,
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h1,
    textAlign: "center",
    marginBottom: spacing.sm,
    color: colors.cardWhite,
  },
  subtitle: {
    ...typography.body,
    textAlign: "center",
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.md,
    color: "rgba(255,255,255,0.86)",
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
    width: "100%",
  },
  cardWrapper: { width: "48%" },
  buttonWrapper: {
    width: "55%",
    maxWidth: 260,
    alignSelf: "center",
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
  },
  loginText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  loginLink: {
    fontSize: 13,
    color: colors.brownAccent,
    fontWeight: "700",
  },
});
