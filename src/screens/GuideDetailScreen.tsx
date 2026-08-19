import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Tipagem simples e local, sem precisar de arquivo separado
type GuideDetailScreenProps = {
  navigation: {
    goBack: () => void;
  };
  route?: {
    params?: {
      title?: string;
      type?: string;
      category?: string;
      image?: string;
      sections?: Section[];
      content?: string; // presente no GuideScreen original, mantido por segurança
    };
  };
};

// União de todos os formatos possíveis de seção do conteúdo
type Section =
  | { type: "paragraph"; text: string }
  | { type: "divider" }
  | { type: "subtitle"; text: string; icon?: keyof typeof Ionicons.glyphMap; color?: string }
  | { type: "item"; title: string; description: string; icon?: keyof typeof Ionicons.glyphMap; iconColor?: string }
  | { type: "checklist"; items: string[] }
  | { type: "xlist"; items: string[] }
  | { type: "bullet"; items: string[] };

export default function GuideDetailScreen({ navigation, route }: GuideDetailScreenProps) {
  const params = route?.params || {};

  const defaultContent: {
    title: string;
    type: string;
    category: string;
    image: string;
    sections: Section[];
  } = {
    title: "Como ajudar uma amiga em risco",
    type: "Guia de Apoio",
    category: "Ajudando Amigas",
    image: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&h=500&fit=crop&crop=center",
    sections: [
      {
        type: "paragraph",
        text: "Perceber que alguém que amamos pode estar em uma situação de vulnerabilidade é assustador. Mas sua presença e seu suporte podem ser o primeiro passo para a segurança dela."
      },
      {
        type: "divider"
      },
      {
        type: "subtitle",
        text: "Como identificar os sinais",
        icon: "eye-outline",
        color: "#4A7C59"
      },
      {
        type: "item",
        title: "Mudanças de Comportamento",
        description: "Isolamento social repentino, cancelamentos frequentes ou perda de interesse em atividades que ela amava."
      },
      {
        type: "item",
        title: "Sinais Físicos",
        description: "Marcas inexplicáveis, uso de roupas inadequadas ao clima (para cobrir o corpo) ou aparência exausta."
      },
      {
        type: "item",
        title: "Dependência de Controle",
        description: "Ela precisa pedir permissão para tudo ou é monitorada constantemente pelo parceiro via celular."
      },
      {
        type: "item",
        title: "Alterações de Humor",
        description: "Ansiedade elevada, sobressaltos, ou uma postura excessivamente defensiva sobre o relacionamento."
      },
      {
        type: "divider"
      },
      {
        type: "subtitle",
        text: "O que dizer (e o que não dizer)",
        icon: "mail-outline",
        color: "#7A4A1E"
      },
      {
        type: "paragraph",
        text: "Saber o que falar e como abordar o assunto é fundamental para não piorar a situação da vítima."
      },
      {
        type: "checklist",
        items: [
          "Estou aqui para você, não importa o que aconteça.",
          "A culpa não é sua. Ninguém merece passar por isso.",
          "Eu acredito em você e no que você está me contando."
        ]
      },
      {
        type: "xlist",
        items: [
          "Por que você simplesmente não vai embora?",
          "Eu te avisei que ele não prestava.",
          "Você deve ter feito algo para ele reagir assim."
        ]
      },
      {
        type: "divider"
      },
      {
        type: "subtitle",
        text: "Como oferecer ajuda prática",
        icon: "hand-left-outline",
        color: "#4A7C59"
      },
      {
        type: "item",
        title: "Porto Seguro",
        description: "Ofereça sua casa para ela guardar documentos importantes ou uma mochila de emergência com itens essenciais.",
        icon: "key-outline",
        iconColor: "#B8860B"
      },
      {
        type: "item",
        title: "Canal de Comunicação",
        description: "Estabeleça uma palavra-código ou um sinal discreto para que ela possa te avisar se estiver em perigo imediato.",
        icon: "call-outline",
        iconColor: "#2E7D32"
      },
      {
        type: "item",
        title: "Pesquisa Segura",
        description: "Ofereça-se para pesquisar serviços de suporte, delegacias ou ONGs usando seu próprio dispositivo, para não deixar rastros no dela.",
        icon: "search-outline",
        iconColor: "#2C7A9E"
      },
      {
        type: "divider"
      },
      {
        type: "subtitle",
        text: "Cuidando de você também",
        icon: "heart-outline",
        color: "#4A7C59"
      },
      {
        type: "paragraph",
        text: "Apoiar alguém em situação de violência pode ser emocionalmente desgastante. É importante que você também cuide da sua saúde mental:"
      },
      {
        type: "bullet",
        items: [
          "Busque apoio para você também",
          "Estabeleça limites saudáveis",
          "Não se culpe pelo que está fora do seu controle",
          "Reconheça seus próprios limites",
          "Busque informações sobre o assunto para se sentir mais preparado"
        ]
      }
    ]
  };

  const title = params.title || defaultContent.title;
  const type = params.type || defaultContent.type;
  const category = params.category || defaultContent.category;
  const image = params.image || defaultContent.image;
  const sections = params.sections || defaultContent.sections;

  const handleHelpPress = () => {
    Alert.alert(
      "Ajuda disponível",
      "Você será direcionado para um especialista. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim", onPress: () => {
          console.log("Abrir chat com especialista");
        }}
      ]
    );
  };

  const renderSections = () => {
    return sections.map((item, index) => {
      switch (item.type) {
        case "paragraph":
          return (
            <Text key={index} style={styles.paragraphText}>
              {item.text}
            </Text>
          );
        case "divider":
          return (
            <View key={index} style={styles.divider} />
          );
        case "subtitle":
          return (
            <View key={index} style={styles.subtitleRow}>
              <View style={[styles.subtitleBadge, { backgroundColor: item.color || "#4A7C59" }]}>
                <Ionicons name={item.icon || "sparkles-outline"} size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.subtitleText}>{item.text}</Text>
            </View>
          );
        case "item":
          // Variante com ícone (ex: "Como oferecer ajuda prática")
          if (item.icon) {
            return (
              <View key={index} style={styles.iconItemCard}>
                <View style={styles.iconItemIconWrap}>
                  <Ionicons name={item.icon} size={20} color={item.iconColor || "#4A7C59"} />
                </View>
                <View style={styles.iconItemTextWrap}>
                  <Text style={styles.iconItemTitle}>{item.title}</Text>
                  <Text style={styles.iconItemDescription}>{item.description}</Text>
                </View>
              </View>
            );
          }
          // Variante com etiqueta (ex: "Como identificar os sinais")
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
        default:
          return null;
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
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

        {/* CONTEÚDO */}
       <ScrollView
  style={styles.scrollView}
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={true}
  persistentScrollbar={true}
>
          {/* BREADCRUMB */}
          <View style={styles.breadcrumbRow}>
            <Text style={styles.breadcrumbText}>{type}</Text>
            <Ionicons name="chevron-forward" size={13} color="#A89C8A" style={styles.breadcrumbChevron} />
            <Text style={[styles.breadcrumbText, styles.breadcrumbActive]}>{category}</Text>
          </View>

          <Text style={styles.title}>{title}</Text>

          {/* IMAGEM DE DESTAQUE */}
          {image ? (
            <Image source={{ uri: image }} style={styles.heroImage} resizeMode="cover" />
          ) : null}

          {renderSections()}
        </ScrollView>

        {/* BOTÃO FIXO */}
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
    height: 190,
    borderRadius: 18,
    marginBottom: 22,
    backgroundColor: "#EDE8E2",
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

  // Cards de item com etiqueta (ex: "Como identificar os sinais")
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

  // Cards de item com ícone (ex: "Como oferecer ajuda prática")
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

  // Cards "O que ajuda" / "O que evitar"
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

  // Bullet simples (usado em "Cuidando de você também")
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