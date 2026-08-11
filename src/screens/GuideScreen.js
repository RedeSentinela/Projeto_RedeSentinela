import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { colors, typography, spacing } from "../theme/theme";

const { width } = Dimensions.get("window");

const FILTERS = ["Como Ajudar", "Me Proteger", "Sinais de Alerta"];

// Dados do carrossel
const CAROUSEL_ITEMS = [
  {
    id: "1",
    title: "Aprenda a se proteger",
    subtitle: "Conhecimento é a melhor defesa",
    image: require("../assets/guia.png"),
  },
  {
    id: "2",
    title: "Conheça seus direitos",
    subtitle: "Informação é poder",
    image: require("../assets/guia.png"),
  },
  {
    id: "3",
    title: "Fale com quem entende",
    subtitle: "Apoio especializado 24h",
    image: require("../assets/guia.png"),
  },
];

export default function GuideScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);

  // Autoplay: mudar slide a cada 5 segundos
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = (activeSlide + 1) % CAROUSEL_ITEMS.length;
      goToSlide(next);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const goToSlide = (index) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActiveSlide(index);
    // Reinicia o autoplay ao interagir manualmente
    stopAutoplay();
    startAutoplay();
  };

  const nextSlide = () => {
    const next = (activeSlide + 1) % CAROUSEL_ITEMS.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (activeSlide - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
    goToSlide(prev);
  };

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
            "Se você percebeu que uma amiga, colega ou familiar está passando por uma situação de violência ou abuso, saiba que sua escuta e acolhimento são importantes.",
        }),
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
    {
      id: 4,
      title: "Direitos da mulher: o que você precisa saber",
      type: "Artigo",
      duration: "10 min de leitura",
      icon: "document-text-outline",
      iconBg: "#E3F0F7",
      iconColor: "#2C7A9E",
    },
    {
      id: 5,
      title: "Como reconhecer relacionamentos abusivos",
      type: "Vídeo",
      duration: "15 min",
      icon: "alert-circle-outline",
      iconBg: "#FDE8E8",
      iconColor: "#C0392B",
    },
    {
      id: 6,
      title: "Onde buscar ajuda: guia de serviços",
      type: "Guia Rápido",
      duration: "6 min de leitura",
      icon: "location-outline",
      iconBg: "#F0F0E8",
      iconColor: "#6B8E23",
    },
    {
      id: 7,
      title: "Autocuidado e saúde mental",
      type: "Artigo",
      duration: "7 min de leitura",
      icon: "flower-outline",
      iconBg: "#F3E8F0",
      iconColor: "#8E4585",
    },
    {
      id: 8,
      title: "Como denunciar de forma segura",
      type: "Vídeo",
      duration: "9 min",
      icon: "megaphone-outline",
      iconBg: "#FFF3E0",
      iconColor: "#E67E22",
    },
  ];

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselSlide}>
      <Image source={item.image} style={styles.carouselImage} resizeMode="cover" />
      <LinearGradient
        colors={["transparent", "rgba(26, 54, 54, 0.8)"]}
        style={styles.carouselOverlay}
      >
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
      </LinearGradient>
    </View>
  );

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (width - 32));
    setActiveSlide(index);
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.flex}>
        {/* HEADER */}
        <LinearGradient
          colors={[colors.oliveDark, colors.oliveLight]}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.headerTitle}>Guia de Apoio</Text>
            <Pressable hitSlop={12} style={styles.searchButton}>
              <Ionicons name="search-outline" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
        </LinearGradient>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          style={styles.scrollView}
        >
          {/* CARROSSEL COM SETAS E AUTOPLAY */}
          <View style={styles.carouselWrapper}>
            <FlatList
              ref={flatListRef}
              data={CAROUSEL_ITEMS}
              renderItem={renderCarouselItem}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={width - 32}
              snapToAlignment="center"
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />

            {/* Setas de navegação */}
            <TouchableOpacity style={styles.arrowLeft} onPress={prevSlide}>
              <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.arrowRight} onPress={nextSlide}>
              <Ionicons name="chevron-forward" size={28} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Dots */}
            <View style={styles.dotsContainer}>
              {CAROUSEL_ITEMS.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dot,
                    activeSlide === index && styles.dotActive,
                  ]}
                  onPress={() => goToSlide(index)}
                />
              ))}
            </View>
          </View>

          {/* TÍTULO E SUBTÍTULO */}
          <Text style={styles.title}>Um espaço seguro para aprender</Text>
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
                  activeFilter === label && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter(label)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === label && styles.filterTextActive,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* SEÇÃO CONTEÚDOS */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>CONTEÚDOS RECOMENDADOS</Text>
            <Pressable>
              <Text style={styles.seeAll}>Ver todos</Text>
            </Pressable>
          </View>

          {/* CARDS */}
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
                    { backgroundColor: item.iconBg },
                  ]}
                >
                  <Ionicons name={item.icon} size={24} color={item.iconColor} />
                </View>
                <View style={styles.contentInfo}>
                  <Text style={styles.contentTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <View style={styles.contentMeta}>
                    <Text style={styles.contentTag}>{item.type}</Text>
                    <Text style={styles.contentDot}>•</Text>
                    <Text style={styles.contentDuration}>{item.duration}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
              </View>
            </Pressable>
          ))}

          {/* CARD DE AJUDA - Último elemento */}
          <LinearGradient
            colors={[colors.oliveDark, "#2D4A4A"]}
            style={styles.helpCard}
          >
            <View style={styles.helpContentWrapper}>
              <View style={styles.helpIconContainer}>
                <Ionicons name="call-outline" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.helpTitle}>Precisa de ajuda agora?</Text>
              <Text style={styles.helpSubtitle}>
                Nossos canais de atendimento estão disponíveis 24h para você.
              </Text>
              <Pressable style={styles.helpButton} onPress={() => {}}>
                <LinearGradient
                  colors={[colors.brownAccent, "#7A3D22"]}
                  style={styles.helpButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="call-outline" size={20} color="#FFF" />
                  <Text style={styles.helpButtonLabel}>
                    Falar com uma atendente
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </LinearGradient>

          {/* Espaço extra no final para não cortar o card */}
          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>

      <BottomNav activeKey="Guide" onNavigate={handleNavigate} />
    </View>
  );
}

// Estilos (com ajustes na altura do carrossel e remoção do scrollHint)
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 40, // reduzido para o card finalizar bem
  },
  carouselWrapper: {
    marginBottom: spacing.md,
    borderRadius: 16,
    overflow: "hidden",
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
  carouselSlide: {
    width: width - 2 * spacing.lg,
    height: 220, // altura um pouco maior
    position: "relative",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E8EDE5",
  },
  carouselOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  carouselTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  carouselSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontWeight: "400",
  },
  arrowLeft: {
    position: "absolute",
    left: 8,
    top: "50%",
    transform: [{ translateY: -20 }],
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
  arrowRight: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: [{ translateY: -20 }],
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D0D0D0",
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.oliveDark,
    width: 20,
  },
  title: {
    ...typography.h1,
    fontSize: 22,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  filtersRow: {
    marginBottom: spacing.md,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: colors.cardWhite,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  filterChipActive: {
    backgroundColor: colors.oliveDark,
    borderColor: colors.oliveDark,
  },
  filterText: {
    fontSize: 13,
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
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.brownAccent,
  },
  contentCard: {
    backgroundColor: colors.cardWhite,
    borderRadius: 14,
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
    width: 44,
    height: 44,
    borderRadius: 12,
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
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 2,
  },
  contentMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentTag: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: "500",
  },
  contentDot: {
    marginHorizontal: 6,
    color: colors.borderLight,
  },
  contentDuration: {
    fontSize: 11,
    color: colors.textMuted,
  },
  helpCard: {
    borderRadius: 18,
    padding: spacing.md,
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  helpTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  helpSubtitle: {
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.sm,
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
    paddingVertical: 14,
    gap: 8,
  },
  helpButtonLabel: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  // scrollHint removido
});