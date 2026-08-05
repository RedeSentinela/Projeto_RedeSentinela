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
        type: "item",
        title: "✓ O que dizer:",
        description: "• 'Eu acredito em você'\n• 'Não foi sua culpa'\n• 'Você não está sozinha'\n• 'Estou aqui para te ouvir'\n• 'Existem pessoas que podem te ajudar'"
      },
      {
        type: "item",
        title: "✗ O que NÃO dizer:",
        description: "• 'Por que você não saiu antes?'\n• 'Você deve ter feito algo para provocar'\n• 'Ele não parece ser tão ruim'\n• 'Tenta relevar, todo casal briga'\n• 'Isso é exagero seu'"
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
        type: "item",
        title: "Ações que fazem a diferença",
        description: "• Oferecer um lugar seguro para ela ficar\n• Ajudar a criar um plano de segurança\n• Acompanhar em consultas médicas ou jurídicas\n• Manter contato frequente para mostrar que ela não está sozinha\n• Guardar documentos importantes em um local seguro"
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
        type: "item",
        title: "Autocuidado",
        description: "• Busque apoio para você também\n• Estabeleça limites saudáveis\n• Não se culpe pelo que está fora do seu controle\n• Reconheça seus próprios limites\n• Busque informações sobre o assunto para se sentir mais preparado"
      }
    ]
  };

  const title = params.title || defaultContent.title;
  const type = params.type || defaultContent.type;
  const sections = params.sections || defaultContent.sections;

  const handleHelpPress = () => {
    Alert.alert(
      "Ajuda disponível",
      "Você será direcionado para uma atendente. Deseja continuar?",
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
          >
            <Text style={styles.backText}>←</Text>
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

        {/* BOTÃO FIXO */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={handleHelpPress}
            activeOpacity={0.8}
          >
            <Text style={styles.helpButtonLabel}>Falar com uma atendente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
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
    borderBottomColor: "#F0F0F0",
  },
  backText: {
    fontSize: 28,
    color: "#333333",
    fontWeight: "300",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333333",
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 150,
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
    lineHeight: 27,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
    marginTop: 8,
  },
  itemContainer: {
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2C2C2C",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 16,
    color: "#555555",
    lineHeight: 24,
    paddingLeft: 10,
  },
  footerContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  helpButton: {
    backgroundColor: "#A0522D",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  helpButtonLabel: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});