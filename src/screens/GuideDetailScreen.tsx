import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet, // ← ESSA ESTAVA FALTANDO!
  Pressable,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
  Linking,
  ImageSourcePropType,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import YoutubePlayer from "react-native-youtube-iframe";

type GuideDetailScreenProps = {
  navigation: {
    goBack: () => void;
  };
  route?: {
    params?: {
      title?: string;
      type?: string;
      category?: string;
      image?: string | ImageSourcePropType;
      videoId?: string;
      videoCredit?: string;
      videoCreditUrl?: string;
      sections?: Section[];
      content?: string;
    };
  };
};

type Section =
  | { type: "paragraph"; text: string }
  | { type: "divider" }
  | { type: "subtitle"; text: string; icon?: keyof typeof Ionicons.glyphMap; color?: string }
  | { type: "item"; title: string; description: string; icon?: keyof typeof Ionicons.glyphMap; iconColor?: string }
  | { type: "checklist"; items: string[] }
  | { type: "xlist"; items: string[] }
  | { type: "bullet"; items: string[] }
  | { type: "source"; label: string; url: string }
  | { type: "highlight"; icon?: keyof typeof Ionicons.glyphMap; title: string; text: string; source?: string; url?: string };

export default function GuideDetailScreen({ navigation, route }: GuideDetailScreenProps) {
  const params = route?.params || {};
  const [playing, setPlaying] = useState(false);
  const { width } = useWindowDimensions();

  const defaultContent: {
    title: string;
    type: string;
    category: string;
    image: string | ImageSourcePropType;
    sections: Section[];
  } = {
    title: "Como ajudar uma amiga em risco",
    type: "Guia de Apoio",
    category: "Ajudando Amigas",
    image: require("../assets/guia/09_ajudar_amiga.png"),
    sections: [
      {
        type: "paragraph",
        text: "Perceber que alguém que amamos pode estar em uma situação de vulnerabilidade é assustador. Mas sua presença e seu suporte podem ser o primeiro passo para a segurança dela.",
      },
      { type: "divider" },
      { type: "subtitle", text: "Como identificar os sinais", icon: "eye-outline", color: "#4A7C59" },
      { type: "item", title: "Mudanças de Comportamento", description: "Isolamento social repentino, cancelamentos frequentes ou perda de interesse em atividades que ela amava." },
      { type: "item", title: "Sinais Físicos", description: "Marcas inexplicáveis, uso de roupas inadequadas ao clima para cobrir o corpo ou aparência exausta." },
      { type: "item", title: "Dependência de Controle", description: "Ela precisa pedir permissão para tudo ou é monitorada constantemente pelo parceiro via celular." },
      { type: "item", title: "Alterações de Humor", description: "Ansiedade elevada, sobressaltos ou uma postura excessivamente defensiva sobre o relacionamento." },
      { type: "divider" },
      { type: "subtitle", text: "O que dizer (e o que não dizer)", icon: "mail-outline", color: "#7A4A1E" },
      { type: "paragraph", text: "Saber o que falar e como abordar o assunto é fundamental para não piorar a situação da vítima." },
      { type: "checklist", items: ["Estou aqui para você, não importa o que aconteça.", "A culpa não é sua. Ninguém merece passar por isso.", "Eu acredito em você e no que você está me contando."] },
      { type: "xlist", items: ["Por que você simplesmente não vai embora?", "Eu te avisei que ele não prestava.", "Você deve ter feito algo para ele reagir assim."] },
      { type: "divider" },
      { type: "subtitle", text: "Como oferecer ajuda prática", icon: "hand-left-outline", color: "#4A7C59" },
      { type: "item", title: "Porto Seguro", description: "Ofereça sua casa para ela guardar documentos importantes ou uma mochila de emergência com itens essenciais.", icon: "key-outline", iconColor: "#B8860B" },
      { type: "item", title: "Canal de Comunicação", description: "Estabeleça uma palavra-código ou um sinal discreto para que ela possa te avisar se estiver em perigo imediato.", icon: "call-outline", iconColor: "#2E7D32" },
      { type: "item", title: "Pesquisa Segura", description: "Ofereça-se para pesquisar serviços de suporte, delegacias ou ONGs usando seu próprio dispositivo, para não deixar rastros no dela.", icon: "search-outline", iconColor: "#2C7A9E" },
      { type: "divider" },
      { type: "subtitle", text: "Cuidando de você também", icon: "heart-outline", color: "#4A7C59" },
      { type: "paragraph", text: "Apoiar alguém em situação de violência pode ser emocionalmente desgastante. É importante que você também cuide da sua saúde mental:" },
      { type: "bullet", items: ["Busque apoio para você também", "Estabeleça limites saudáveis", "Não se culpe pelo que está fora do seu controle", "Reconheça seus próprios limites", "Busque informações sobre o assunto para se sentir mais preparado"] },
    ],
  };

  const title = params.title || defaultContent.title;
  const type = params.type || defaultContent.type;
  const category = params.category || defaultContent.category;
  const image = params.image || defaultContent.image;
  const videoId = params.videoId;
  const videoCredit = params.videoCredit;
  const videoCreditUrl = params.videoCreditUrl;
  const sections = params.sections || defaultContent.sections;

  const horizontalPadding = 24 * 2;
  const videoWidth = width - horizontalPadding;
  const videoHeight = videoWidth * (9 / 16);

  const handleHelpPress = () => {
    Alert.alert(
      "Ajuda disponível",
      "Você será direcionado para um especialista. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim", onPress: () => console.log("Abrir chat com especialista") },
      ]
    );
  };

  const renderSections = () => {
    if (!sections || sections.length === 0) {
      return null;
    }

    return sections.map((item, index) => {
      switch (item.type) {
        case "paragraph":
          return (
            <Text key={index} style={styles.paragraphText}>
              {item.text}
            </Text>
          );
        case "divider":
          return <View key={index} style={styles.divider} />;
        case "subtitle":
          return (
            <View key={index} style={styles.subtitleRow}>
              <View
                style={[
                  styles.subtitleBadge,
                  { backgroundColor: item.color || "#4A7C59" },
                ]}
              >
                <Ionicons
                  name={item.icon || "sparkles-outline"}
                  size={16}
                  color="#FFF"
                />
              </View>
              <Text style={styles.subtitleText}>{item.text}</Text>
            </View>
          );
        case "item":
          if (item.icon) {
            return (
              <View key={index} style={styles.iconItemCard}>
                <View style={styles.iconItemIconWrap}>
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={item.iconColor || "#4A7C59"}
                  />
                </View>
                <View style={styles.iconItemTextWrap}>
                  <Text style={styles.iconItemTitle}>{item.title}</Text>
                  <Text style={styles.iconItemDescription}>
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }
          return (
            <View key={index} style={styles.itemCard}>
              <View style={styles.itemLabel}>
                <Text style={styles.itemLabelText}>{item.title}</Text>
              </View>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          );
        case "checklist":
          return (
            <View key={index} style={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <Ionicons name="checkmark-circle-outline" size={22} color="#2E7D32" />
                <Text style={styles.cardLabel}>O que ajuda</Text>
              </View>
              {item.items.map((text, i) => (
                <View key={i} style={styles.cardItem}>
                  <View style={[styles.cardDot, { backgroundColor: "#2E7D32" }]} />
                  <Text style={styles.cardText}>"{text}"</Text>
                </View>
              ))}
            </View>
          );
        case "xlist":
          return (
            <View key={index} style={[styles.cardContainer, styles.cardDanger]}>
              <View style={styles.cardHeader}>
                <Ionicons name="close-circle-outline" size={22} color="#C62828" />
                <Text style={[styles.cardLabel, styles.cardLabelDanger]}>O que evitar</Text>
              </View>
              {item.items.map((text, i) => (
                <View key={i} style={styles.cardItem}>
                  <View style={[styles.cardDot, { backgroundColor: "#C62828" }]} />
                  <Text style={[styles.cardText, styles.cardTextDanger]}>"{text}"</Text>
                </View>
              ))}
            </View>
          );
        case "bullet":
          return (
            <View key={index} style={styles.bulletContainer}>
              {item.items.map((text, i) => (
                <View key={i} style={styles.bulletItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{text}</Text>
                </View>
              ))}
            </View>
          );
        case "source":
          return (
            <Pressable
              key={index}
              onPress={() => Linking.openURL(item.url)}
              style={styles.sourceRow}
              hitSlop={8}
            >
              <Ionicons name="link-outline" size={14} color="#A89C8A" />
              <Text style={styles.sourceText}>
                Fonte: <Text style={styles.sourceName}>{item.label}</Text>
              </Text>
            </Pressable>
          );
        case "highlight":
          return (
            <View key={index} style={styles.highlightCard}>
              <View style={styles.highlightHeader}>
                <Ionicons name={item.icon || "information-circle"} size={24} color="#4A7C59" />
                <Text style={styles.highlightTitle}>{item.title}</Text>
              </View>
              <Text style={styles.highlightText}>{item.text}</Text>
              {item.source && (
                <Pressable
                  onPress={() => item.url && Linking.openURL(item.url)}
                  style={styles.highlightSource}
                  hitSlop={8}
                >
                  <Ionicons name="link-outline" size={14} color="#8B5A3C" />
                  <Text style={styles.highlightSourceText}>Fonte: {item.source}</Text>
                </Pressable>
              )}
            </View>
          );
        default:
          return null;
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={12}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </Pressable>
          <Text style={styles.headerTitle}>Guia de Apoio</Text>
          <View style={styles.avatarWrap}>
            <Ionicons name="person" size={18} color="#7A4A1E" />
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator
          persistentScrollbar
        >
          <View style={styles.breadcrumbRow}>
            <Text style={styles.breadcrumbText}>{type}</Text>
            <Ionicons
              name="chevron-forward"
              size={13}
              color="#A89C8A"
              style={styles.breadcrumbChevron}
            />
            <Text style={[styles.breadcrumbText, styles.breadcrumbActive]}>
              {category}
            </Text>
          </View>

          <Text style={styles.title}>{title}</Text>

          {videoId && (
            <View style={styles.videoWrap}>
              {Platform.OS === "web" ? (
                <iframe
                  width="100%"
                  height={videoHeight}
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ border: 0 }}
                />
              ) : (
                <YoutubePlayer
                  height={videoHeight}
                  width="100%"
                  play={playing}
                  videoId={videoId}
                  onChangeState={(state: string) => {
                    if (state === "ended") setPlaying(false);
                  }}
                />
              )}
            </View>
          )}

          {videoId && videoCredit && (
            <Pressable
              onPress={() => videoCreditUrl && Linking.openURL(videoCreditUrl)}
              style={styles.videoCreditCard}
              hitSlop={8}
            >
              <Ionicons name="logo-youtube" size={18} color="#FF0000" />
              <Text style={styles.videoCreditText}>
                <Text style={styles.videoCreditLabel}>Vídeo:</Text> {videoCredit}
              </Text>
              <Ionicons name="open-outline" size={14} color="#A89C8A" />
            </Pressable>
          )}

          {!videoId && image && (
            <Image
              source={typeof image === "string" ? { uri: image } : image}
              style={styles.heroImage}
              resizeMode="cover"
            />
          )}

          {renderSections()}

          {/* 
            ⚠️ RODAPÉ DE CRÉDITOS DO GOVERNO – SÓ APARECE NO GUIA "Como ajudar uma amiga em risco"
          */}
          {title === "Como ajudar uma amiga em risco" && (
            <View style={styles.governmentCredits}>
              <View style={styles.creditsDivider} />
              <Ionicons name="shield-outline" size={24} color="#4A7C59" />
              <Text style={styles.creditsTitle}>
                Conteúdo baseado no Guia Prático de Cuidado à Mulher em Situação de Violência
              </Text>
              <Text style={styles.creditsSub}>
                Ministério da Saúde – Secretaria de Atenção Primária à Saúde, 2025
              </Text>
              <Pressable
                onPress={() =>
                  Linking.openURL(
                    "https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/guias-e-manuais/2025/guia-pratico-de-cuidado-a-mulher-em-situacao-de-violencia.pdf"
                  )
                }
                style={styles.creditsLink}
              >
                <Ionicons name="link-outline" size={14} color="#8B5A3C" />
                <Text style={styles.creditsLinkText}>Acesse o guia completo</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={handleHelpPress}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#8B5A3C", "#A0522D"]}
              style={styles.helpButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.helpButtonContent}>
                <Ionicons name="chatbubble-ellipses-outline" size={20} color="#FFF" />
                <View style={styles.helpButtonTexts}>
                  <Text style={styles.helpButtonSub}>Precisa de apoio?</Text>
                  <Text style={styles.helpButtonLabel}>Falar com um especialista</Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F5F2",
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F5F2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E2DA",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: 0.3,
  },
  avatarWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F3E8D8",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 140,
  },
  breadcrumbRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  breadcrumbText: {
    fontSize: 12,
    color: "#A89C8A",
    fontWeight: "500",
  },
  breadcrumbChevron: {
    marginHorizontal: 4,
  },
  breadcrumbActive: {
    color: "#8B5A3C",
    fontWeight: "700",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 18,
    lineHeight: 33,
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 18,
    marginBottom: 22,
    backgroundColor: "#EDE8E2",
  },
  videoWrap: {
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 8,
    backgroundColor: "#000",
  },
  videoCreditCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#E8E2DA",
    gap: 8,
  },
  videoCreditText: {
    flex: 1,
    fontSize: 13,
    color: "#555",
  },
  videoCreditLabel: {
    fontWeight: "700",
    color: "#1A1A1A",
  },
  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    marginBottom: 16,
  },
  sourceText: {
    fontSize: 12,
    color: "#A89C8A",
  },
  sourceName: {
    fontWeight: "700",
    color: "#8B5A3C",
    textDecorationLine: "underline",
  },
  paragraphText: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#5A5346",
    lineHeight: 24,
    marginBottom: 16,
    paddingLeft: 14,
    borderLeftWidth: 3,
    borderLeftColor: "#D9CBB0",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0D6CC",
    marginVertical: 28,
    opacity: 0.5,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    marginTop: 4,
  },
  subtitleBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    flex: 1,
  },
  itemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  itemLabel: {
    alignSelf: "flex-start",
    backgroundColor: "#F3EFE6",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemLabelText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7A4A1E",
  },
  itemDescription: {
    fontSize: 14.5,
    color: "#555555",
    lineHeight: 21,
  },
  iconItemCard: {
    flexDirection: "row",
    backgroundColor: "#F5F3EE",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  iconItemIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconItemTextWrap: {
    flex: 1,
  },
  iconItemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  iconItemDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginVertical: 10,
  },
  cardDanger: {
    backgroundColor: "#FBEAEA",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 8,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E7D32",
  },
  cardLabelDanger: {
    color: "#C62828",
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 10,
    marginTop: 8,
  },
  cardText: {
    flex: 1,
    fontSize: 14.5,
    color: "#3D3D3D",
    lineHeight: 21,
  },
  cardTextDanger: {
    color: "#3D3D3D",
  },
  bulletContainer: {
    marginVertical: 6,
    paddingLeft: 4,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#A0522D",
    marginRight: 14,
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: "#444444",
    lineHeight: 22,
  },
  highlightCard: {
    backgroundColor: "#F0F7EE",
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4A7C59",
  },
  highlightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  highlightText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#2D3E2D",
    marginBottom: 12,
  },
  highlightSource: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  highlightSourceText: {
    fontSize: 12,
    color: "#8B5A3C",
    textDecorationLine: "underline",
  },
  governmentCredits: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  creditsDivider: {
    width: 60,
    height: 3,
    backgroundColor: "#4A7C59",
    marginBottom: 16,
    borderRadius: 2,
  },
  creditsTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 4,
  },
  creditsSub: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  creditsLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
  },
  creditsLinkText: {
    fontSize: 13,
    color: "#8B5A3C",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  footerContainer: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  helpButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  helpButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  helpButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  helpButtonTexts: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },
  helpButtonSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontWeight: "500",
  },
  helpButtonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});