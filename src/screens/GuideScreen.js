import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { colors, typography, spacing } from "../theme/theme";

const FILTERS = [
  "Como Ajudar",
  "Me Proteger",
  "Sinais de Alerta",
];

const HERO_IMAGE = require("../assets/guia.png");

export default function GuideScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

  function handleNavigate(key) {
    if (key === "Home") navigation.navigate("Home");
    if (key === "Report") navigation.navigate("Security");
    if (key === "Profile") navigation.navigate("Profile");
  }

  const contentData = [
    {
      id: 1,
      title: "Como ajudar uma amiga em risco",
      type: "Artigo",
      duration: "5 min de leitura",
      icon: "hand-left-outline",
      iconBg: "#E8F0E3",
      iconColor: "#4A7C59",
      onPress: () =>
        navigation.navigate("GuideDetail", {
          title: "Como ajudar uma amiga em risco",
          type: "Artigo",
          content:
            "Se você percebeu que uma amiga, colega ou familiar está passando por uma situação de violência ou abuso, saiba que sua escuta e acolhimento são importantes."
        })
    },
    {
      id: 2,
      title: "Guia de segurança digital",
      type: "Vídeo",
      duration: "12 min",
      icon: "shield-checkmark-outline",
      iconBg: "#F5E6D8",
      iconColor: "#B8860B",
    },
    {
      id: 3,
      title: "Ciclo da violência: como identificar",
      type: "Guia Rápido",
      duration: "8 min de leitura",
      icon: "heart-outline",
      iconBg: "#F2EFE5",
      iconColor: "#A0522D",
    },
  ];

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.flex}>
        {/* HEADER COM GRADIENTE */}
        <LinearGradient
          colors={[colors.oliveDark, colors.oliveLight]}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={12}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="#FFFFFF"
              />
            </Pressable>

            <Text style={styles.headerTitle}>
              Guia de Apoio
            </Text>

            <Pressable
              hitSlop={12}
              style={styles.searchButton}
            >
              <Ionicons
                name="search-outline"
                size={24}
                color="#FFFFFF"
              />
            </Pressable>
          </View>
        </LinearGradient>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HERO COM OVERLAY */}
          <View style={styles.heroContainer}>
            <Image
              source={HERO_IMAGE}
              style={styles.heroImage}
              resizeMode="contain"
            />
            <LinearGradient
              colors={['transparent', 'rgba(26, 54, 54, 0.7)']}
              style={styles.heroOverlay}
            >
              <Text style={styles.heroTitle}>Aprenda a se proteger</Text>
              <Text style={styles.heroSubtitle}>Conhecimento é a melhor defesa</Text>
            </LinearGradient>
          </View>

          {/* TÍTULO E SUBTÍTULO */}
          <Text style={styles.title}>
            Um espaço seguro para aprender
          </Text>

          <Text style={styles.subtitle}>
            Informação é proteção. Encontre orientações claras e acolhedoras
            sobre como identificar riscos e buscar ajuda.
          </Text>

          {/* FILTROS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersRow}
          >
            {FILTERS.map((label) => (
              <Pressable
                key={label}
                style={[
                  styles.filterChip,
                  activeFilter === label && styles.filterChipActive
                ]}
                onPress={() => setActiveFilter(label)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === label && styles.filterTextActive
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* SEÇÃO CONTEÚDOS */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>
              CONTEÚDOS RECOMENDADOS
            </Text>
            <Pressable>
              <Text style={styles.seeAll}>Ver todos</Text>
            </Pressable>
          </View>

          {/* CARDS DE CONTEÚDO */}
          {contentData.map((item) => (
            <Pressable
              key={item.id}
              style={styles.contentCard}
              onPress={item.onPress}
            >
              <View style={styles.cardContent}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: item.iconBg }
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color={item.iconColor}
                  />
                </View>

                <View style={styles.contentInfo}>
                  <Text style={styles.contentTitle} numberOfLines={2}>
                    {item.title}
                  </Text>

                  <View style={styles.contentMeta}>
                    <Text style={styles.contentTag}>
                      {item.type}
                    </Text>
                    <Text style={styles.contentDot}>•</Text>
                    <Text style={styles.contentDuration}>
                      {item.duration}
                    </Text>
                  </View>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#CCCCCC"
                />
              </View>
            </Pressable>
          ))}

          {/* CARD DE AJUDA */}
          <LinearGradient
            colors={[colors.oliveDark, '#2D4A4A']}
            style={styles.helpCard}
          >
            <View style={styles.helpContentWrapper}>
              <View style={styles.helpIconContainer}>
                <Ionicons name="call-outline" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.helpTitle}>
                Precisa de ajuda agora?
              </Text>
              <Text style={styles.helpSubtitle}>
                Nossos canais de atendimento estão disponíveis 24h para você.
              </Text>

              <Pressable
                style={styles.helpButton}
                onPress={() => {}}
              >
                <LinearGradient
                  colors={[colors.brownAccent, '#7A3D22']}
                  style={styles.helpButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color="#FFF"
                  />
                  <Text style={styles.helpButtonLabel}>
                    Falar com uma atendente
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </LinearGradient>

          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>

      <BottomNav
        activeKey="Guide"
        onNavigate={handleNavigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  flex: {
    flex: 1,
  },
  headerGradient: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: 8,
    paddingBottom: 14,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  searchButton: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 100,
  },
  heroContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: spacing.lg,
    backgroundColor: colors.cardWhite,
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    fontWeight: "400",
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  filtersRow: {
    marginBottom: spacing.md,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: colors.cardWhite,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  filterChipActive: {
    backgroundColor: colors.oliveDark,
    borderColor: colors.oliveDark,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.brownAccent,
  },
  contentCard: {
    backgroundColor: colors.cardWhite,
    borderRadius: 16,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  contentInfo: {
    flex: 1,
    marginRight: spacing.xs,
  },
  contentTitle: {
    ...typography.body,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  contentMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentTag: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: "500",
  },
  contentDot: {
    marginHorizontal: 6,
    color: colors.borderLight,
  },
  contentDuration: {
    fontSize: 12,
    color: colors.textMuted,
  },
  helpCard: {
    borderRadius: 20,
    padding: spacing.lg,
    marginTop: spacing.md,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  helpContentWrapper: {
    alignItems: "center",
  },
  helpIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  helpTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  helpSubtitle: {
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  helpButton: {
    width: "100%",
    borderRadius: 30,
    overflow: "hidden",
  },
  helpButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 10,
  },
  helpButtonLabel: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});