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
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { colors, typography, spacing } from "../theme/theme";

const { width } = Dimensions.get("window");

const FILTERS = ["Como Ajudar", "Me Proteger", "Sinais de Alerta"];

// Quantos cards de conteúdo aparecem antes de expandir
const VISIBLE_COUNT = 4;

// Tipagem simples e local, sem precisar de arquivo separado
type GuideScreenProps = {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
};

type CarouselItem = {
  id: string;
  title: string;
  subtitle: string;
  image: { uri: string };
};

type ContentItem = {
  id: number;
  title: string;
  type: string;
  duration: string;
  image: { uri: string };
  onPress?: () => void;
};

// Cores das pílulas de tag (Artigo / Vídeo / Guia Rápido)
const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Artigo: { bg: "#E8F0E3", text: "#4A7C59" },
  Vídeo: { bg: "#F5E6D8", text: "#B8860B" },
  "Guia Rápido": { bg: "#F2EFE5", text: "#A0522D" },
};

// ============================================================
// CARROSSEL — fotos mais alinhadas ao tema de apoio/acolhimento
// ============================================================
const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: "1",
    title: "Aprenda a se proteger",
    subtitle: "Conhecimento é a melhor defesa",
    image: { uri: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&h=450&fit=crop&crop=center" },
  },
  {
    id: "2",
    title: "Conheça seus direitos",
    subtitle: "Informação é poder",
    image: { uri: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&h=450&fit=crop&crop=center" },
  },
  {
    id: "3",
    title: "Fale com quem entende",
    subtitle: "Apoio especializado 24h",
    image: { uri: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=450&fit=crop&crop=center" },
  },
];

export default function GuideScreen({ navigation }: GuideScreenProps) {
  const { height } = useWindowDimensions();
  const isSmallScreen = height < 700;
  const carouselHeight = isSmallScreen ? 150 : 190;

  const [activeFilter, setActiveFilter] = useState<string>(FILTERS[0]);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [showAllContent, setShowAllContent] = useState<boolean>(false);
  const flatListRef = useRef<FlatList<CarouselItem>>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Autoplay
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

  const goToSlide = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActiveSlide(index);
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

  function handleNavigate(key: string) {
    if (key === "Home") navigation.navigate("Home");
    if (key === "Report") navigation.navigate("Security");
    if (key === "Profile") navigation.navigate("Profile");
  }

  // Conteúdos (guias) — fotos temáticas (apoio, segurança, acolhimento)
  const contentData: ContentItem[] = [
    {
      id: 1,
      title: "Como ajudar uma amiga em risco",
      type: "Artigo",
      duration: "5 min de leitura",
      image: { uri: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=200&h=200&fit=crop&crop=center" },
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
      image: { uri: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=200&h=200&fit=crop&crop=center" },
    },
    {
      id: 3,
      title: "Ciclo da violência: como identificar",
      type: "Guia Rápido",
      duration: "8 min de leitura",
      image: { uri: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=200&h=200&fit=crop&crop=center" },
    },
    {
      id: 4,
      title: "Direitos da mulher: o que você precisa saber",
      type: "Artigo",
      duration: "10 min de leitura",
      image: { uri: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=200&h=200&fit=crop&crop=center" },
    },
    {
      id: 5,
      title: "Como reconhecer relacionamentos abusivos",
      type: "Vídeo",
      duration: "15 min",
      image: { uri: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=200&h=200&fit=crop&crop=center" },
    },
    {
      id: 6,
      title: "Onde buscar ajuda: guia de serviços",
      type: "Guia Rápido",
      duration: "6 min de leitura",
      image: { uri: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=200&h=200&fit=crop&crop=center" },
    },
    {
      id: 7,
      title: "Autocuidado e saúde mental",
      type: "Artigo",
      duration: "7 min de leitura",
      image: { uri: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=200&h=200&fit=crop&crop=center" },
    },
    {
      id: 8,
      title: "Como denunciar de forma segura",
      type: "Vídeo",
      duration: "9 min",
      image: { uri: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&h=200&fit=crop&crop=center" },
    },
  ];

  // Mostra só os 4 primeiros, ou todos, dependendo do estado
  const visibleContent = showAllContent ? contentData : contentData.slice(0, VISIBLE_COUNT);

  const renderCarouselItem = ({ item }: { item: CarouselItem }) => {
    const slideStyle = {
      width: width - 2 * spacing.lg,
      height: carouselHeight,
      position: "relative" as const,
    };
    return (
      <View style={slideStyle}>
        <Image source={item.image} style={styles.carouselImage} resizeMode="cover" />
      </View>
    );
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
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
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 80 },
          ]}
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

            {/* Setas */}
            <TouchableOpacity style={styles.arrowLeft} onPress={prevSlide}>
              <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.arrowRight} onPress={nextSlide}>
              <Ionicons name="chevron-forward" size={26} color="#FFFFFF" />
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
            <Pressable onPress={() => setShowAllContent((prev) => !prev)}>
              <Text style={styles.seeAll}>
                {showAllContent ? "Ver menos" : "Ver +"}
              </Text>
            </Pressable>
          </View>

          {/* CARDS */}
          {visibleContent.map((item) => {
            const tagStyle = TAG_COLORS[item.type] || TAG_COLORS.Artigo;
            return (
              <Pressable
                key={item.id}
                style={styles.contentCard}
                onPress={item.onPress}
              >
                <View style={styles.cardContent}>
                  <Image source={item.image} style={styles.iconContainer} resizeMode="cover" />
                  <View style={styles.contentInfo}>
                    <Text style={styles.contentTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <View style={styles.contentMeta}>
                      <View style={[styles.tagPill, { backgroundColor: tagStyle.bg }]}>
                        <Text style={[styles.contentTag, { color: tagStyle.text }]}>
                          {item.type}
                        </Text>
                      </View>
                      <Text style={styles.contentDuration}>{item.duration}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                </View>
              </Pressable>
            );
          })}

          {/* CARD DE AJUDA */}
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
              <Pressable style={styles.helpButtonWhite} onPress={() => {}}>
                <Ionicons name="call-outline" size={20} color={colors.brownAccent} />
                <Text style={styles.helpButtonLabelBrown}>
                  Entre em contato com uma ONG
                </Text>
              </Pressable>
            </View>
          </LinearGradient>
        </ScrollView>
      </SafeAreaView>

      {/* BOTTOM NAV - FIXO */}
      <BottomNav activeKey="Guide" onNavigate={handleNavigate} />
    </View>
  );
}

// ============================================================
// ESTILOS
// ============================================================
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.creamBg,
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
  carouselImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E8EDE5",
  },
  arrowLeft: {
    position: "absolute",
    left: 8,
    top: "50%",
    transform: [{ translateY: -18 }],
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 18,
    padding: 5,
    zIndex: 10,
  },
  arrowRight: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: [{ translateY: -18 }],
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 18,
    padding: 5,
    zIndex: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 8,
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#D0D0D0",
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.oliveDark,
    width: 18,
  },
  title: {
    ...typography.h1,
    fontSize: 22,
    marginBottom: spacing.xs,
  } as TextStyle,
  subtitle: {
    ...typography.body,
    fontSize: 14,
    color: colors.textBody,
    lineHeight: 20,
    marginBottom: spacing.md,
  } as TextStyle,
  filtersRow: {
    marginBottom: spacing.md,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: colors.mintBg,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: colors.oliveDark,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textBody,
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
    borderColor: colors.divider,
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
    marginRight: spacing.sm,
    backgroundColor: colors.mintBg,
  },
  contentInfo: {
    flex: 1,
    marginRight: spacing.xs,
  },
  contentTitle: {
    ...typography.body,
    fontSize: 14,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: 4,
  } as TextStyle,
  contentMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tagPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  contentTag: {
    fontSize: 11,
    fontWeight: "700",
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
  helpButtonWhite: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    width: "100%",
    paddingVertical: 14,
    gap: 8,
  },
  helpButtonLabelBrown: {
    color: colors.brownAccent,
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },
});