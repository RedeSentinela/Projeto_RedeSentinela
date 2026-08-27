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
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../../components/PrimaryButton";
import ProgressDots from "../../components/ProgressDots";
import { colors, typography, spacing } from "../../theme/theme";
import { useSwipeNavigation } from "../../hooks/useSwipeNavigation";
import { useScreenEntrance } from "../../hooks/useScreenEntrance";

// Tipagem simples e local, sem precisar de arquivo separado
type WelcomeScreenProps = {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const { width, height } = useWindowDimensions();

  // Ajusta o tamanho da imagem de acordo com a tela
  const isSmallScreen = width < 380;
  const isLargeScreen = width > 600;

  const logoWidth = isLargeScreen
    ? 320
    : isSmallScreen
    ? width * 0.65
    : width * 0.75;

  const logoHeight = isLargeScreen
    ? 280
    : isSmallScreen
    ? 210
    : 260;

  // Arrastar para a esquerda avança para o próximo passo, como se fosse
  // um carrossel — igual ao botão "Próximo passo".
  const { entranceStyle, imageStyle, contentStyle, sheetStyle, prepareForReturn } = useScreenEntrance();
  const goToSupport = () => {
    prepareForReturn();
    navigation.navigate("Support");
  };
  const swipeHandlers = useSwipeNavigation({ onSwipeLeft: goToSupport });

  return (
    <Animated.View style={[styles.root, entranceStyle]} {...swipeHandlers}>
      <LinearGradient
        colors={[colors.oliveDark, colors.oliveLight]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeTop}>
          <View style={styles.header}>
            <View style={styles.headerPlaceholder} />
            <View style={styles.headerTextWrap}>
              <Text style={styles.brand}>Rede Sentinela</Text>
              <Text style={styles.step}>PASSO 1 DE 4</Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate("Home")}
              hitSlop={10}
              style={styles.skipButton}
            >
              <Text style={styles.skip}>Pular</Text>
            </Pressable>
          </View>

          {/* Área da imagem */}
          <Animated.View style={[styles.illustrationCard, imageStyle]}>
            <Image
              source={require("../../assets/RedeSentinela.png")}
              style={{
                width: logoWidth,
                height: logoHeight,
              }}
              resizeMode="contain"
            />
          </Animated.View>

        </SafeAreaView>
      </LinearGradient>

      {/* Parte branca inferior */}
      <Animated.View style={[styles.sheet, sheetStyle]}>
        <View style={styles.sheetContent}>
          <Animated.View style={contentStyle}>
            <Text style={styles.title}>
              Olá, bem-vinda à Rede Sentinela
            </Text>

            <Text style={styles.subtitle}>
              Toque em "Próximo passo" ou deslize para o lado para continuar
            </Text>
          </Animated.View>

          <View style={styles.dotsWrapper}>
            <ProgressDots total={4} activeIndex={0} />
          </View>

          {/* Botão menor */}
          <View style={styles.buttonWrapper}>
            <PrimaryButton
              label="Próximo passo"
              onPress={goToSupport}
            />
          </View>

          <Text style={styles.hint}>
            Você pode continuar pelo botão ou deslizando para a esquerda
          </Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.oliveLight,
  },

  gradient: {
    flex: 1.15,
  },

  safeTop: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },

  header: {
    width: "100%",
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "web" ? spacing.md : 0,
  },
  headerPlaceholder: {
    width: 44,
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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

  title: {
    ...typography.h1,
    textAlign: "center",
    marginBottom: spacing.sm,
  },

  subtitle: {
    ...typography.body,
    textAlign: "center",
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.lg,
  },

  dotsWrapper: {
    height: 20,
    justifyContent: "center",
    marginBottom: spacing.sm,
  },

  // Botão menor
  buttonWrapper: {
    width: "55%",
    maxWidth: 260,
    alignSelf: "center",
  },

  hint: {
    ...typography.body,
    fontSize: 12,
    textAlign: "center",
    marginTop: spacing.sm,
    color: colors.textMuted,
  },
});
