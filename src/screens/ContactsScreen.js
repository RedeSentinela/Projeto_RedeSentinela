import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { colors, typography, spacing } from "../theme/theme";

// Dados de exemplo — substitua pela integração real (API / storage local)
const INITIAL_CONTACTS = [
  {
    id: "1",
    name: "Ana Silva",
    relation: "Irmã",
    phone: "(11) 9876-5432",
    avatarBg: colors.avatarGreen,
  },
  {
    id: "2",
    name: "Beatriz Oliveira",
    relation: "Amiga",
    phone: "(11) 9123-4567",
    avatarBg: colors.avatarGreen,
  },
  {
    id: "3",
    name: "Carla Mendes",
    relation: "Vizinha",
    phone: "(11) 9555-1234",
    avatarBg: colors.avatarPeach,
  },
];

export default function ContactsScreen({ navigation }) {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [query, setQuery] = useState("");

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  function handleNavigate(key) {
    if (key === "Home") navigation.navigate("Home");
    if (key === "Guide") navigation.navigate("Guide");
    if (key === "Report") navigation.navigate("SafeReport");
    if (key === "Profile") navigation.navigate("Profile");
  }

  function handleAlertContacts() {
    Alert.alert(
      "Alertar contatos",
      "Seus contatos de confiança serão notificados via SMS e notificação push com sua localização em tempo real. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Alertar agora",
          style: "destructive",
          onPress: () =>
            Alert.alert("Alerta enviado", "Seus contatos foram notificados."),
        },
      ]
    );
  }

  function handleCallPolice() {
    Linking.openURL("tel:190").catch(() =>
      Alert.alert("Não foi possível iniciar a ligação")
    );
  }

  function handleAddNew() {
    // TODO: abrir formulário/tela de cadastro de novo contato de confiança
    Alert.alert("Adicionar novo", "Abra o formulário para cadastrar um novo contato de confiança.");
  }

  function handleEdit(contact) {
    // TODO: abrir formulário de edição pré-preenchido
    Alert.alert("Editar contato", `Editar dados de ${contact.name}.`);
  }

  function handleDelete(contact) {
    Alert.alert(
      "Remover contato",
      `Deseja remover ${contact.name} do seu círculo de confiança?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () =>
            setContacts((prev) => prev.filter((c) => c.id !== contact.id)),
        },
      ]
    );
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons
                name="shield-checkmark"
                size={20}
                color={colors.brownAccent}
              />
              <Text style={styles.headerTitle}>Meus Contatos</Text>
            </View>
            <Pressable hitSlop={12}>
              <Ionicons name="settings-outline" size={22} color={colors.textDark} />
            </Pressable>
          </View>

          {/* CARD "PRECISA DE AJUDA AGORA?" */}
          <View style={styles.helpCard}>
            <Text style={styles.helpTitle}>Precisa de ajuda agora?</Text>
            <Text style={styles.helpSubtitle}>
              Escolha uma ação imediata. Mantenha a calma.
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.alertButton,
                pressed && { opacity: 0.9 },
              ]}
              onPress={handleAlertContacts}
            >
              <Ionicons name="notifications" size={18} color="#FFFFFF" />
              <Text style={styles.alertButtonLabel}>Alertar Contatos</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.policeButton,
                pressed && { opacity: 0.85 },
              ]}
              onPress={handleCallPolice}
            >
              <Ionicons name="call-outline" size={18} color={colors.brownAccent} />
              <Text style={styles.policeButtonLabel}>Ligar para Polícia</Text>
            </Pressable>
          </View>

          {/* BUSCA */}
          <View style={styles.searchRow}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color={colors.textMuted} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Buscar contato"
                placeholderTextColor={colors.textMuted}
                style={styles.searchInput}
              />
            </View>
            <Pressable style={styles.addIconButton} onPress={handleAddNew} hitSlop={8}>
              <Ionicons name="person-add" size={20} color={colors.oliveDark} />
            </Pressable>
          </View>

          {/* CÍRCULO DE CONFIANÇA */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>CÍRCULO DE CONFIANÇA</Text>
            <Text style={styles.sectionCount}>{contacts.length} salvos</Text>
          </View>

          {filteredContacts.map((contact) => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={[styles.avatar, { backgroundColor: contact.avatarBg }]}>
                <Ionicons name="person" size={20} color={colors.brownAccentDark} />
              </View>

              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactMeta}>
                  {contact.relation} • {contact.phone}
                </Text>
              </View>

              <Pressable
                hitSlop={8}
                style={styles.iconButton}
                onPress={() => handleEdit(contact)}
              >
                <Ionicons name="pencil" size={18} color={colors.textMuted} />
              </Pressable>
              <Pressable
                hitSlop={8}
                style={styles.iconButton}
                onPress={() => handleDelete(contact)}
              >
                <Ionicons name="trash" size={18} color={colors.dangerRed} />
              </Pressable>
            </View>
          ))}

          {filteredContacts.length === 0 && (
            <Text style={styles.emptyText}>Nenhum contato encontrado.</Text>
          )}

          {/* ADICIONAR NOVO */}
          <Pressable style={styles.addNewButton} onPress={handleAddNew}>
            <Ionicons name="add-circle-outline" size={20} color={colors.textDark} />
            <Text style={styles.addNewLabel}>Adicionar novo</Text>
          </Pressable>

          {/* INFO */}
          <View style={styles.infoBox}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={colors.oliveDark}
              style={{ marginTop: 1 }}
            />
            <Text style={styles.infoText}>
              Seus contatos serão alertados via SMS e notificação push com sua
              localização em tempo real caso você ative o alerta.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomNav activeKey="Profile" onNavigate={handleNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.creamBg },
  flex: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 100,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerTitle: { ...typography.h2, fontSize: 20 },

  helpCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  helpTitle: { ...typography.h2, fontSize: 19, marginBottom: 4 },
  helpSubtitle: { ...typography.body, marginBottom: spacing.md },
  alertButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.brownAccentDark,
    borderRadius: 30,
    paddingVertical: 15,
    marginBottom: spacing.sm,
  },
  alertButtonLabel: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  policeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.cardWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 30,
    paddingVertical: 15,
  },
  policeButtonLabel: { color: colors.brownAccent, fontSize: 15, fontWeight: "700" },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.inputBg,
    borderRadius: 14,
    paddingHorizontal: spacing.sm + 4,
    height: 48,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.textDark },
  addIconButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.avatarGreen,
    alignItems: "center",
    justifyContent: "center",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  sectionLabel: { ...typography.label, color: colors.oliveDark },
  sectionCount: { fontSize: 12, color: colors.textMuted, fontWeight: "600" },

  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardWhite,
    borderRadius: 16,
    padding: spacing.sm + 4,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 15, fontWeight: "700", color: colors.textDark },
  contactMeta: { fontSize: 12.5, color: colors.textMuted, marginTop: 2 },
  iconButton: { paddingHorizontal: 6, paddingVertical: 4, marginLeft: 4 },

  emptyText: {
    ...typography.body,
    textAlign: "center",
    marginVertical: spacing.md,
  },

  addNewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1.5,
    borderColor: colors.divider,
    borderStyle: "dashed",
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  addNewLabel: { fontSize: 14, fontWeight: "700", color: colors.textDark },

  infoBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 16,
    padding: spacing.md,
  },
  infoText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textBody,
  },
});
