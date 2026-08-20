import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Platform,
  Image,
  useWindowDimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import ProgressDots from "../components/ProgressDots";
import { colors, typography, spacing } from "../theme/theme";

type SupportScreenProps = {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
};

export default function SupportScreen({
  navigation,
}: SupportScreenProps) {
  const { width, height } = useWindowDimensions();

  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 620;

  /*
   * Mantém a imagem em um tamanho parecido
   * com a proporção usada na WelcomeScreen.
   */
  const imageHeight = isVerySmallScreen
    ? 210
    : isSmallScreen
    ? 240
    : 280;

  const imageWidth = Math.min(width - 40, 420);

  return (
    <View style={styles.root}>

      {/* ÁREA SUPERIOR */}
      <View style={styles.topContainer}>
        <SafeAreaView style={styles.safeTop}>

          {/* HEADER */}
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={12}
              style={styles.headerButton}
            >
              <Ionicons
                name="arrow-back"
                size={21}
                color={colors.textDark}
              />
            </Pressable>

            <View style={styles.headerTextWrap}>
              <Text style={styles.brand}>
                Rede Sentinela
              </Text>

              <Text style={styles.step}>
                PASSO 2 DE 4
              </Text>
            </View>

            <View style={styles.headerPlaceholder} />
          </View>

          {/* CONTEÚDO PRINCIPAL */}
          <View style={styles.mainContent}>

            <View
              style={[
                styles.illustrationCard,
                {
                  width: imageWidth,
                  height: imageHeight,
                },
              ]}
            >
              <Image
                source={require("../assets/apoio.png")}
                style={styles.illustrationImage}
                resizeMode="contain"
              />
            </View>

            <Text
              style={[
                styles.title,
                isSmallScreen && styles.titleSmall,
              ]}
            >
              Encontre Apoio Especializado
            </Text>

            <Text
              style={[
                styles.subtitle,
                isSmallScreen && styles.subtitleSmall,
              ]}
            >
              Localize ONGs, hospitais e profissionais qualificados
              em uma rede segura de acolhimento.
            </Text>

          </View>

        </SafeAreaView>
      </View>

      {/* QUADRADO BRANCO */}
      <View style={styles.sheet}>

        {/* CARD REDE DE APOIO */}
        <View style={styles.infoCard}>

          <View style={styles.infoIconWrap}>
            <Ionicons
              name="people"
              size={14}
              color={colors.brownAccent}
            />
          </View>

          <View style={styles.infoTextWrap}>
            <Text style={styles.infoTitle}>
              Rede de Apoio
            </Text>

            <Text style={styles.infoSubtitle}>
              Chat 24h disponível
            </Text>
          </View>

          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />

            <Text style={styles.liveText}>
              Ao vivo
            </Text>
          </View>

        </View>

        {/* BOLINHAS */}
        <View style={styles.dotsWrapper}>
          <ProgressDots
            total={4}
            activeIndex={1}
          />
        </View>

        {/* BOTÃO */}
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            label="Próximo passo"
            onPress={() => navigation.navigate("Security")}
          />
        </View>

        {/* VOLTAR */}
        <Pressable
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={8}
        >
          <Text style={styles.backLabel}>
            Voltar
          </Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.mintBg,
  },

  /*
   * MESMA PROPORÇÃO DA WELCOME
   */
  topContainer: {
    flex: 1.15,
    backgroundColor: colors.mintBg,
  },

  safeTop: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },

  /* HEADER */
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingTop:
      Platform.OS === "web"
        ? spacing.md
        : 0,

    paddingBottom: spacing.sm,
  },

  headerButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTextWrap: {
    flex: 1,
    alignItems: "center",
  },

  headerPlaceholder: {
    width: 30,
  },

  brand: {
    ...typography.brand,
    fontSize: 18,
  },

  step: {
    ...typography.label,
    fontSize: 11,
    marginTop: 1,
  },

  /* CONTEÚDO DA PARTE SUPERIOR */
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: spacing.sm,
  },

  illustrationCard: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "transparent",
    alignSelf: "center",
    marginBottom: 8,
  },

  illustrationImage: {
    width: "100%",
    height: "100%",
  },

  title: {
    ...typography.h2,
    fontSize: 25,
    lineHeight: 30,
    textAlign: "center",
    marginBottom: 2,
    paddingHorizontal: 5,
  },

  titleSmall: {
    fontSize: 21,
    lineHeight: 25,
  },

  subtitle: {
    ...typography.body,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
    paddingHorizontal: 12,
    maxWidth: 620,
  },

  subtitleSmall: {
    fontSize: 12,
    lineHeight: 16,
  },

  /*
   * QUADRADO BRANCO
   *
   * O marginTop -28 é o mesmo da WelcomeScreen.
   */
  sheet: {
    backgroundColor: colors.cardWhite,

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    marginTop: -28,

    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },

  /* CARD DE REDE DE APOIO */
  infoCard: {
    height: 48,
    width: "75%",
    maxWidth: 320,

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: colors.divider,

    borderRadius: 12,

    paddingHorizontal: 12,
    marginBottom: 10,

    backgroundColor: "#FAFAF5",

    alignSelf: "center",
  },

  infoIconWrap: {
    width: 28,
    height: 28,

    borderRadius: 14,

    backgroundColor: "#F3EFE0",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 8,
  },

  infoTextWrap: {
    flex: 1,
    justifyContent: "center",
  },

  infoTitle: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "700",
    color: colors.textDark,
  },

  infoSubtitle: {
    fontSize: 10,
    lineHeight: 12,
    color: colors.textMuted,
    marginTop: 0,
  },

  /* AO VIVO */
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#E8F5E9",

    paddingHorizontal: 6,
    paddingVertical: 3,

    borderRadius: 8,

    gap: 3,
  },

  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#4CAF50",
  },

  liveText: {
    fontSize: 8,
    fontWeight: "700",
    color: "#2E7D32",
    letterSpacing: 0.3,
  },

  /* BOLINHAS */
  dotsWrapper: {
    alignItems: "center",
    height: 20,
    justifyContent: "center",
    marginBottom: 8,
  },

  /* BOTÃO */
  buttonWrapper: {
    width: "55%",
    maxWidth: 260,
    alignSelf: "center",
    marginBottom: 4,
  },

  /* VOLTAR */
  backBtn: {
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  backLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textDark,
  },
});