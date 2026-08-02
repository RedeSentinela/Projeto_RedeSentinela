import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../components/PrimaryButton";
import ProgressDots from "../components/ProgressDots";
import FeatureCard from "../components/FeatureCard";
import { Image } from "react-native";
import { colors, typography, spacing } from "../theme/theme";

// Tela 4 (final) do onboarding: "Conecte-se com Apoio"
export default function ConnectScreen({ navigation }) {
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
              source={require("../assets/conecte.png")}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.sheet}>
        <View style={styles.sheetContent}>
          <View style={styles.dotsWrapper}>
            <ProgressDots total={4} activeIndex={3} />
          </View>

          <Text style={styles.title}>Conecte-se com Apoio</Text>
          <Text style={styles.subtitle}>
            Encontre ONGs, hospitais especializados e profissionais prontos
            para ajudar você, tudo de forma rápida, segura e próxima à sua
            localização.
          </Text>

          <View style={styles.cardsRow}>
            <FeatureCard 
              icon="share-social-outline" 
              title="Rede Ampla" 
              subtitle="" 
            />
            <FeatureCard 
              icon="navigate-outline" 
              title="Perto de Você" 
              subtitle="" 
            />
          </View>

          {/* Botão marrom igual aos outros */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.brownAccent, colors.brownAccent]} // Cor marrom
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Começar →</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Pressable
            style={styles.loginRow}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>Já tem conta? </Text>
            <Text style={styles.loginLink}>Fazer login</Text>
          </Pressable>
        </View>
      </View>
    </View>
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
  topBar: {
    alignItems: "flex-end",
    paddingTop: Platform.OS === "web" ? spacing.md : 0,
  },
  skip: { 
    color: "rgba(255,255,255,0.85)", 
    fontSize: 14, 
    fontWeight: "500" 
  },
  illustrationCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  illustrationImage: {
    width: "60%",
    height: "60%",
    borderRadius: 24,
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
    alignItems: "center",
  },
  dotsWrapper: { 
    alignItems: "center", 
    marginBottom: spacing.md 
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
    paddingHorizontal: spacing.sm,
  },
  cardsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.lg,
    width: "100%",
  },
  // Botão marrom
  button: {
    width: "100%",
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  loginText: { 
    fontSize: 13, 
    color: colors.textMuted 
  },
  loginLink: { 
    fontSize: 13, 
    color: colors.brownAccent, 
    fontWeight: "700" 
  },
});