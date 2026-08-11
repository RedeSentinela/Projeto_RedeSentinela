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

export default function GuideDetailScreen({ navigation, route }) {
  const params = route?.params || {};

  const defaultContent = {
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
          console.log("Abrir chat ou ligação");
        }}
      ]
    );
  };

  const renderSections = () => {
    return sections.map((item, index) => {
      switch(item.type) {
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
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          );
        case "checklist":
          return (
            <View key={index} style={styles.cardContainer}>
              <Text style={styles.cardLabel}>✓ O que ajuda</Text>
              {item.items.map((text, i) => (
                <View key={i} style={styles.cardItem}>
                  <Ionicons name="checkmark-circle" size={22} color="#4CAF50" style={styles.cardIcon} />
                  <Text style={styles.cardText}>{text}</Text>
                </View>
              ))}
            </View>
          );
        case "xlist":
          return (
            <View key={index} style={[styles.cardContainer, styles.cardDanger]}>
              <Text style={styles.cardLabel}>✗ O que evitar</Text>
              {item.items.map((text, i) => (
                <View key={i} style={styles.cardItem}>
                  <Ionicons name="close-circle" size={22} color="#E53935" style={styles.cardIcon} />
                  <Text style={styles.cardText}>{text}</Text>
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
            <Ionicons name="arrow-back" size={24} color="#333333" />
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>SafeSpace</Text>
            <Text style={styles.headerSubtitle}>Guía de Apoyo | Ajudando Amigas</Text>
          </View>

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

        {/* BOTÃO FIXO */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={handleHelpPress}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#A0522D", "#8B4513"]}
              style={styles.helpButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.helpButtonContent}>
                <Text style={styles.helpButtonTop}>Precisa de apoio agora?</Text>
                <View style={styles.helpButtonRow}>
                  <Text style={styles.helpButtonLabel}>Falar com um especialista ou psicólogo</Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFF" style={styles.helpButtonIcon} />
                </View>
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
    backgroundColor: "#F5F6F8",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
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
    borderBottomColor: "#EEEEEE",
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    alignItems: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333333",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#888888",
    fontWeight: "500",
    marginTop: 1,
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
    paddingBottom: 160,
  },
  tagContainer: {
    backgroundColor: "#E8F0E3",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 14,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4A7C59",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 18,
    lineHeight: 34,
  },
  paragraphText: {
    fontSize: 16,
    color: "#444444",
    lineHeight: 26,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E8E8E8",
    marginVertical: 24,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 14,
    marginTop: 4,
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2C2C2C",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 15,
    color: "#555555",
    lineHeight: 22,
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardDanger: {
    borderColor: "#FFE8E8",
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2C2C2C",
    marginBottom: 12,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  cardIcon: {
    marginRight: 12,
    marginTop: 1,
  },
  cardText: {
    flex: 1,
    fontSize: 15,
    color: "#444444",
    lineHeight: 22,
  },
  bulletContainer: {
    marginVertical: 6,
    paddingLeft: 4,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  bulletDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#A0522D",
    marginRight: 12,
    marginTop: 8,
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
    borderRadius: 24,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  helpButton: {
    borderRadius: 24,
    overflow: "hidden",
  },
  helpButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  helpButtonContent: {
    alignItems: "flex-start",
  },
  helpButtonTop: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  helpButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  helpButtonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  helpButtonIcon: {
    marginLeft: 12,
  },
});