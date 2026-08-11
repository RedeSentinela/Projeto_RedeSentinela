import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import ProgressDots from "../components/ProgressDots";
import { colors, typography, spacing } from "../theme/theme";

export default function SupportScreen({ navigation }) {
  const { width, height } = useWindowDimensions();

  const isSmallScreen = height < 700;
  const isVerySmallScreen = height < 620;

  // Imagem um pouco menor para dar mais espaço ao sheet
  const imageHeight = isVerySmallScreen
    ? 200
    : isSmallScreen
    ? 240
    : 280;

  const imageWidth = Math.min(width - 40, 420);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeTop}>

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
            Localize ONGs, hospitais e profissionais qualificados em uma rede
            segura de acolhimento.
          </Text>
        </View>
      </SafeAreaView>

      {/* Sheet ocupando mais espaço */}
      <View
        style={[
          styles.sheet,
          isSmallScreen && styles.sheetSmall,
        ]}
      >

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
            <Text style={styles.liveText}>Ao vivo</Text>
          </View>
        </View>

        <View style={styles.dotsWrapper}>
          <ProgressDots
            total={4}
            activeIndex={1}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            label="Próximo passo"
            onPress={() => navigation.navigate("Security")}
          />
        </View>

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

  safeTop: {
    flex: 1,
  },

  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
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

  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 2,
  },

  illustrationCard: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 8,
    backgroundColor: "transparent",
    alignSelf: "center",
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

  sheet: {
    backgroundColor: colors.cardWhite,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 16, // Aumentado
    paddingBottom: 20, // Aumentado
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    elevation: 6,
    // Ocupa mais espaço
    flex: 0.45, // Aumentado de 0.35 para 0.45
  },

  sheetSmall: {
    paddingTop: 12,
    paddingBottom: 16,
    flex: 0.4,
  },

  infoCard: {
    height: 48, // Aumentado um pouco
    width: "75%",
    maxWidth: 320,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 10, // Aumentado
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

  dotsWrapper: {
    alignItems: "center",
    height: 20, // Aumentado
    justifyContent: "center",
    marginBottom: 8, // Aumentado
  },

  buttonWrapper: {
    width: "55%",
    maxWidth: 260,
    alignSelf: "center",
    marginBottom: 4,
  },

  backBtn: {
    height: 24, // Aumentado
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  backLabel: {
    fontSize: 12, // Aumentado
    fontWeight: "600",
    color: colors.textDark,
  },
});