import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../components/PrimaryButton";
import ProgressDots from "../components/ProgressDots";
import { Image } from "react-native";
import { colors, typography, spacing } from "../theme/theme";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.oliveDark, colors.oliveLight]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeTop}>
          <View style={styles.topBar}>
            <Pressable onPress={() => navigation.navigate("Home")}>
              <Text style={styles.skip}>Pular</Text>
            </Pressable>
          </View>

          <View style={styles.illustrationCard}>
          <Image
            source={require("../assets/RedeSentinela.png")}
            style={{ width: "25%", height: "80%", borderRadius: 24 }}
            resizeMode="cover"
          />
        </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.sheet}>
        <View style={styles.sheetContent}>
          <Text style={styles.title}>Olá, bem-vinda à Rede Sentinela</Text>
          <Text style={styles.subtitle}>
            Passe para o lado e veja o que você pode fazer com o nosso app
          </Text>

          <View style={styles.dotsWrapper}>
            <ProgressDots total={3} activeIndex={0} />
          </View>

          <PrimaryButton
            label="Próximo passo"
            onPress={() => navigation.navigate("Support")}
          />

          <Text style={styles.hint}>
            Passe para o lado e veja o que você pode fazer com o nosso app
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.oliveLight },
  gradient: { flex: 1.15 },
  safeTop: { flex: 1, paddingHorizontal: spacing.lg },
  topBar: {
    alignItems: "flex-end",
    paddingTop: Platform.OS === "web" ? spacing.md : 0,
  },
  skip: { color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: "500" },
  illustrationCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  illustrationInner: {
    backgroundColor: "#fff",
    borderRadius: 24,
    width: "78%",
    aspectRatio: 0.72,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  illustrationCaption: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: spacing.sm,
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
  dotsWrapper: { marginBottom: spacing.lg },
  hint: {
    ...typography.body,
    fontSize: 12,
    textAlign: "left",
    marginTop: spacing.lg,
    color: colors.textMuted,
  },
});
