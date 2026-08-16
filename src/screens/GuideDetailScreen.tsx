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
      sections?: Section[];
      content?: string; // presente no GuideScreen original, mantido por segurança
    };
  };
};

// União de todos os formatos possíveis de seção do conteúdo
type Section =
  | { type: "paragraph"; text: string }
  | { type: "divider" }
  | { type: "subtitle"; text: string }
  | { type: "item"; title: string; description: string }
  | { type: "checklist"; items: string[] }
  | { type: "xlist"; items: string[] }
  | { type: "bullet"; items: string[] };

export default function GuideDetailScreen({ navigation, route }: GuideDetailScreenProps) {
  const params = route?.params || {};

  const defaultContent: { title: string; type: string; sections: Section[] } = {
    title: "Como ajudar uma amiga em risco",
    type: "Guia de Apoio",
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
        text: "Como identificar os sinais"
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
        text: "O que dizer (e o que não dizer)"
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
        text: "Como oferecer ajuda prática"
      },
      {
        type: "paragraph",
        text: "Além do apoio emocional, você pode oferecer ajuda concreta:"
      },
      {
        type: "bullet",
        items: [
          "Oferecer um lugar seguro para ela ficar",
          "Ajudar a criar um plano de segurança",
          "Acompanhar em consultas médicas ou jurídicas",
          "Manter contato frequente para mostrar que ela não está sozinha",
          "Guardar documentos importantes em um local seguro"
        ]
      },
      {
        type: "divider"
      },
      {
        type: "subtitle",
        text: "Cuidando de você também"
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
            <Text key={index} style={styles.subtitleText}>
              {item.text}
            </Text>
          );
        case "item":
          return (
            <View key={index} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Ionicons name="bulb-outline" size={22} color="#A0522D" />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          );
        case "checklist":
          return (
            <View key={index} style={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
                <Text style={styles.cardLabel}>O que ajuda</Text>
              </View>
              {item.items.map((text, i) => (
                <View key={i} style={styles.cardItem}>
                  <Ionicons name="checkmark" size={18} color="#2E7D32" style={styles.cardIcon} />
                  <Text style={styles.cardText}>{text}</Text>
                </View>
              ))}
            </View>
          );
        case "xlist":
          return (
            <View key={index} style={[styles.cardContainer, styles.cardDanger]}>
              <View style={styles.cardHeader}>
                <Ionicons name="close-circle" size={24} color="#C62828" />
                <Text style={[styles.cardLabel, styles.cardLabelDanger]}>O que evitar</Text>
              </View>
              {item.items.map((text, i) => (
                <View key={i} style={styles.cardItem}>
                  <Ionicons name="close" size={18} color="#C62828" style={styles.cardIcon} />
                  <Text style={[styles.cardText, styles.cardTextDanger]}>{text}</Text>
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
        {/* HEADER SIMPLIFICADO */}
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={12}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </Pressable>

          <Text style={styles.headerTitle}>SafeSpace</Text>

          <View style={styles.placeholder} />
        </View>

        {/* CONTEÚDO */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{type}</Text>
          </View>

          <Text style={styles.title}>{title}</Text>

          {renderSections()}
        </ScrollView>

        {/* BOTÃO FIXO - MAIS ELEGANTE */}
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
  placeholder: {
    width: 40,
    height: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 140,
  },
  tagContainer: {
    backgroundColor: "#E8F0E3",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4A7C59",
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 20,
    lineHeight: 36,
  },
  paragraphText: {
    fontSize: 16,
    color: "#444444",
    lineHeight: 26,
    marginBottom: 16,
    paddingLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0D6CC",
    marginVertical: 28,
    opacity: 0.5,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 14,
    marginTop: 4,
    paddingLeft: 4,
  },
  itemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EDE8E2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2C2C2C",
    marginLeft: 10,
  },
  itemDescription: {
    fontSize: 15,
    color: "#555555",
    lineHeight: 22,
    paddingLeft: 34,
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#E8E2DA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardDanger: {
    borderColor: "#FCE4E4",
    backgroundColor: "#FFF8F8",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2C2C2C",
    marginLeft: 10,
  },
  cardLabelDanger: {
    color: "#B71C1C",
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  cardIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  cardText: {
    flex: 1,
    fontSize: 15,
    color: "#444444",
    lineHeight: 22,
  },
  cardTextDanger: {
    color: "#5D2E2E",
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