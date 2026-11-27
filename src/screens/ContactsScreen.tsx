import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Linking,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as SMS from "expo-sms";
import * as Location from "expo-location";
import BottomNav from "../components/BottomNav";
import { useNavigation } from "@react-navigation/native";
import { api, salvarToken } from "../services/api";
import { colors, typography, spacing } from "../theme/theme";
import { erroObrigatorio, erroTelefone, mascaraTelefone } from "../utils/validacao";

// Tipagem simples e local, sem precisar de arquivo separado
type ContactsScreenProps = {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
};

type Contact = {
  id: string;
  name: string;
  relation: string;
  phone: string;
  avatarBg: string;
};

type ContatoApi = { id: number; nome: string; telefone: string; relacao: string | null };

const CORES_AVATAR = [colors.avatarGreen, colors.avatarPeach];

function paraContato(c: ContatoApi, i: number): Contact {
  return {
    id: String(c.id),
    name: c.nome,
    relation: c.relacao ?? "", // vazio = sem relação informada
    phone: c.telefone,
    avatarBg: CORES_AVATAR[i % CORES_AVATAR.length],
  };
}

// Alert com botões não funciona na versão web, então lá usamos o confirm do navegador
function confirmar(titulo: string, texto: string, aoConfirmar: () => void) {
  if (Platform.OS === "web") {
    if (window.confirm(`${titulo}\n\n${texto}`)) aoConfirmar();
    return;
  }
  Alert.alert(titulo, texto, [
    { text: "Cancelar", style: "cancel" },
    { text: "Remover", style: "destructive", onPress: aoConfirmar },
  ]);
}

export default function ContactsScreen({ navigation }: ContactsScreenProps) {
  const nav = useNavigation<any>();

  // sair: apaga o token e volta para a escolha de perfil, sem histórico
  function sair() {
    salvarToken(null);
    nav.reset({ index: 0, routes: [{ name: "UserType" }] });
  }

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [erro, setErro] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [novo, setNovo] = useState({ nome: "", telefone: "", relacao: "" });
  const [salvando, setSalvando] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null); // null = criando um contato novo
  const [mostrarErros, setMostrarErros] = useState(false);
  const errosForm = { nome: erroObrigatorio(novo.nome, "o nome"), telefone: erroTelefone(novo.telefone) };

  // carrega os contatos da usuária logada
  useEffect(() => {
    api<ContatoApi[]>("/contatos")
      .then((lista) => setContacts(lista.map(paraContato)))
      .catch((e: Error) => setErro(e.message));
  }, []);
  const [query, setQuery] = useState<string>("");
  const [sendingAlert, setSendingAlert] = useState(false);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  function handleNavigate(key: string) {
    if (key === "Home") navigation.navigate("SearchHelp");
    if (key === "Guide") navigation.navigate("Guide");
    if (key === "Report") navigation.navigate("SafeReport");
    if (key === "Profile") navigation.navigate("Contacts");
  }

  function handleAlertContacts() {
    if (contacts.length === 0) {
      Alert.alert(
        "Nenhum contato cadastrado",
        "Cadastre ao menos um contato de confiança antes de enviar o alerta."
      );
      return;
    }

    Alert.alert(
      "Alertar contatos",
      "Um SMS de alerta com sua localização será enviado aos seus contatos " +
        "de confiança. O envio funciona mesmo sem internet, usando apenas o " +
        "sinal de celular e o GPS do aparelho. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Alertar agora",
          style: "destructive",
          onPress: sendAlertSMS,
        },
      ]
    );
  }

  async function sendAlertSMS() {
    setSendingAlert(true);
    try {
      // Verifica se o aparelho é capaz de enviar SMS. Isso não depende de
      // internet: o SMS trafega pelo canal de sinalização da rede celular
      // (a mesma usada para ligações), então funciona sem Wi-Fi/dados móveis.
      const isAvailable = await SMS.isAvailableAsync();

      if (!isAvailable) {
        Alert.alert(
          "SMS indisponível neste dispositivo",
          "Não foi possível encontrar um app de SMS ativo. Verifique se há " +
            "um chip com sinal de celular inserido no aparelho."
        );
        return;
      }

      const numbers = contacts.map((c) => c.phone);
      const locationLine = await getLocationLine();

      const message =
        "🚨 Alerta Rede Sentinela: preciso de ajuda. Esta mensagem foi " +
        "enviada automaticamente pelo app. Por favor, entre em contato " +
        "comigo assim que possível." +
        (locationLine ? `\nMinha localização: ${locationLine}` : "");

      // Abre o app nativo de SMS do sistema já com destinatários e mensagem
      // preenchidos. Quem envia de fato é o app de mensagens do celular,
      // usando o plano de SMS da operadora — sem custo para o app em si.
      const { result } = await SMS.sendSMSAsync(numbers, message);

      if (result === "sent" || result === "unknown") {
        // No Android o SO frequentemente retorna "unknown" mesmo quando o
        // SMS foi enviado com sucesso, pois não há confirmação de entrega.
        Alert.alert("Alerta enviado", "Seus contatos foram notificados por SMS.");
      } else if (result === "cancelled") {
        Alert.alert("Envio cancelado", "O envio do SMS foi cancelado.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro ao enviar",
        "Não foi possível abrir o envio de SMS. Tente novamente."
      );
    } finally {
      setSendingAlert(false);
    }
  }

  // Obtém a localização atual e devolve um link de mapa para embutir no SMS.
  // O GPS funciona via satélite, sem depender de internet ou dados móveis —
  // só a abertura do link pelo destinatário é que vai precisar de internet.
  // Se o usuário negar a permissão ou o GPS não responder a tempo, retorna
  // null e o alerta é enviado normalmente, apenas sem a localização.
  async function getLocationLine(): Promise<string | null> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return null;

      const position = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        }),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000)),
      ]);

      if (!position) return null;

      const { latitude, longitude } = position.coords;
      return `https://maps.google.com/?q=${latitude},${longitude}`;
    } catch (error) {
      console.warn("Não foi possível obter a localização:", error);
      return null;
    }
  }

  function handleCallPolice() {
    Linking.openURL("tel:190").catch(() =>
      Alert.alert("Não foi possível iniciar a ligação")
    );
  }

  function fecharForm() {
    setMostrarForm(false);
    setEditandoId(null);
    setMostrarErros(false);
    setNovo({ nome: "", telefone: "", relacao: "" });
  }

  function handleAddNew() {
    if (mostrarForm && !editandoId) return fecharForm();
    fecharForm();
    setMostrarForm(true);
  }

  async function salvar() {
    setMostrarErros(true);
    if (errosForm.nome || errosForm.telefone) return;
    setSalvando(true);
    setErro("");
    try {
      if (editandoId) {
        const editado = await api<ContatoApi>(`/contatos/${editandoId}`, { method: "PUT", body: novo });
        setContacts((prev) =>
          prev.map((c, i) => (c.id === editandoId ? paraContato(editado, i) : c))
        );
      } else {
        const criado = await api<ContatoApi>("/contatos", { body: novo });
        setContacts((prev) => [...prev, paraContato(criado, prev.length)]);
      }
      fecharForm();
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setSalvando(false);
    }
  }

  // abre o formulário já preenchido, logo embaixo do contato
  function handleEdit(contact: Contact) {
    if (editandoId === contact.id) return fecharForm(); // tocar no lápis de novo fecha
    setNovo({ nome: contact.name, telefone: mascaraTelefone(contact.phone), relacao: contact.relation });
    setEditandoId(contact.id);
    setMostrarErros(false);
    setMostrarForm(true);
  }

  function handleDelete(contact: Contact) {
    confirmar(
      "Remover contato",
      `Deseja remover ${contact.name} do seu círculo de confiança?`,
      async () => {
        try {
          await api(`/contatos/${contact.id}`, { method: "DELETE" });
          setContacts((prev) => prev.filter((c) => c.id !== contact.id));
        } catch (e) {
          setErro((e as Error).message);
        }
      }
    );
  }

  // mesmo formulário para criar e para editar
  const formulario = (
    <View style={styles.formCard}>
      <Text style={styles.formTitulo}>{editandoId ? "Editar contato" : "Novo contato"}</Text>
      <TextInput
        style={[styles.formInput, mostrarErros && !!errosForm.nome && styles.formInputErro]}
        placeholder="Nome"
        placeholderTextColor={colors.textMuted}
        value={novo.nome}
        onChangeText={(nome) => setNovo((n) => ({ ...n, nome }))}
        accessibilityLabel="Nome do contato"
      />
      {mostrarErros && errosForm.nome ? <Text style={styles.erroCampo}>{errosForm.nome}</Text> : null}
      <TextInput
        style={[styles.formInput, mostrarErros && !!errosForm.telefone && styles.formInputErro]}
        placeholder="Telefone (com DDD)"
        placeholderTextColor={colors.textMuted}
        keyboardType="phone-pad"
        value={novo.telefone}
        onChangeText={(t) => setNovo((n) => ({ ...n, telefone: mascaraTelefone(t) }))}
        accessibilityLabel="Telefone do contato"
      />
      {mostrarErros && errosForm.telefone ? (
        <Text style={styles.erroCampo}>{errosForm.telefone}</Text>
      ) : null}
      <TextInput
        style={styles.formInput}
        placeholder="Relação (ex: mãe, amiga)"
        placeholderTextColor={colors.textMuted}
        value={novo.relacao}
        onChangeText={(relacao) => setNovo((n) => ({ ...n, relacao }))}
        accessibilityLabel="Relação com o contato"
      />
      <View style={styles.formBotoes}>
        <Pressable style={styles.formCancelar} onPress={fecharForm} accessibilityRole="button">
          <Text style={styles.formCancelarLabel}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={[styles.formButton, styles.flex, salvando && { opacity: 0.5 }]}
          onPress={salvar}
          disabled={salvando}
          accessibilityRole="button"
        >
          <Text style={styles.formButtonLabel}>
            {salvando ? "Salvando..." : editandoId ? "Salvar alterações" : "Salvar contato"}
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      {/* sobe o conteúdo quando o teclado abre, para ele não tampar o campo */}
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "web" ? undefined : "padding"}>
      <SafeAreaView edges={["top", "bottom"]} style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
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
            <Pressable
              style={styles.logoutButton}
              hitSlop={8}
              onPress={sair}
              accessibilityRole="button"
              accessibilityLabel="Sair da conta"
            >
              <Ionicons name="log-out-outline" size={18} color={colors.dangerRed} />
              <Text style={styles.logoutText}>Sair da conta</Text>
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
                (pressed || sendingAlert) && { opacity: 0.9 },
              ]}
              onPress={handleAlertContacts}
              disabled={sendingAlert}
            >
              {sendingAlert ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Ionicons name="notifications" size={18} color="#FFFFFF" />
              )}
              <Text style={styles.alertButtonLabel}>
                {sendingAlert ? "Enviando..." : "Alertar Contatos"}
              </Text>
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
            <React.Fragment key={contact.id}>
            <View style={styles.contactCard}>
              <View style={[styles.avatar, { backgroundColor: contact.avatarBg }]}>
                <Ionicons name="person" size={20} color={colors.brownAccentDark} />
              </View>

              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactMeta}>
                  {contact.relation || "Contato"} • {contact.phone}
                </Text>
              </View>

              <Pressable
                hitSlop={8}
                style={styles.iconButton}
                onPress={() => handleEdit(contact)}
                accessibilityLabel={`Editar ${contact.name}`}
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
            {editandoId === contact.id && formulario}
            </React.Fragment>
          ))}

          {filteredContacts.length === 0 && (
            <Text style={styles.emptyText}>Nenhum contato encontrado.</Text>
          )}

          {erro ? <Text style={styles.erroText}>{erro}</Text> : null}

          {/* FORMULÁRIO DE NOVO CONTATO (o de edição aparece embaixo do contato) */}
          {mostrarForm && !editandoId && formulario}

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
              Ao tocar em "Alertar Contatos", um SMS com sua localização
              atual é enviado a todos os contatos do seu círculo de
              confiança. O envio funciona mesmo sem internet: o SMS usa o
              sinal de celular (rede da operadora) e a localização usa o GPS
              do aparelho — nenhum dos dois depende de Wi-Fi ou dados
              móveis.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      </KeyboardAvoidingView>

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
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.dangerRed,
    backgroundColor: colors.dangerRedBg,
  },
  logoutText: { color: colors.dangerRed, fontWeight: "700", fontSize: 13 },

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
  erroText: { color: colors.dangerRed, fontSize: 14, marginBottom: spacing.sm },
  formCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 14,
    padding: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  formInput: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textDark,
  },
  formButton: {
    backgroundColor: colors.brownAccent,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: "center",
  },
  formButtonLabel: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
  formTitulo: { fontSize: 15, fontWeight: "700", color: colors.textDark },
  formInputErro: { borderColor: colors.dangerRed },
  erroCampo: { color: colors.dangerRed, fontSize: 13, marginTop: -4 },
  formBotoes: { flexDirection: "row", gap: spacing.sm },
  formCancelar: {
    borderWidth: 1.5,
    borderColor: colors.brownAccent,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  formCancelarLabel: { color: colors.brownAccent, fontWeight: "700", fontSize: 15 },

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