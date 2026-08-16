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
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../components/PrimaryButton";
import ProgressDots from "../components/ProgressDots";
import { colors, typography, spacing } from "../theme/theme";

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

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.oliveDark, colors.oliveLight]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeTop}>
          {/* Barra superior */}
          <View style={styles.topBar}>
            <Pressable
              onPress={() => navigation.navigate("Home")}
              hitSlop={10}
            >
              <Text style={styles.skip}>Pular</Text>
            </Pressable>
          </View>

          {/* Área da imagem */}
          <View style={styles.illustrationCard}>
            <Image
              source={require("../assets/RedeSentinela.png")}
              style={{
                width: logoWidth,
                height: logoHeight,
              }}
              resizeMode="contain"
            />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Parte branca inferior */}
      <View style={styles.sheet}>
        <View style={styles.sheetContent}>
          <Text style={styles.title}>
            Olá, bem-vinda à Rede Sentinela
          </Text>

          <Text style={styles.subtitle}>
            Passe para o lado e veja o que você pode fazer com o nosso app
          </Text>

          <View style={styles.dotsWrapper}>
            <ProgressDots total={3} activeIndex={0} />
          </View>

          {/* Botão menor */}
          <View style={styles.buttonWrapper}>
            <PrimaryButton
              label="Próximo passo"
              onPress={() => navigation.navigate("Support")}
            />
          </View>

          <Text style={styles.hint}>
            Passe para o lado e veja o que você pode fazer com o nosso app
          </Text>
        </View>
      </View>
    </View>
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

  topBar: {
    width: "100%",
    alignItems: "flex-end",
    paddingTop: Platform.OS === "web" ? spacing.md : 0,
    paddingRight: spacing.sm,
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
  },

  sheetContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },

  title: {
    ...typography.h1,
    textAlign: "center",
    marginBottom: spacing.sm,
  },

  subtitle: {
    ...typography.body,
    textAlign: "center",
    marginBottom: spacing.lg,
  },

  dotsWrapper: {
    marginBottom: spacing.lg,
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
    textAlign: "left",
    marginTop: spacing.lg,
    color: colors.textMuted,
  },
});