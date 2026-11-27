import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import PrimaryButton from "../components/PrimaryButton";
import { colors, typography, spacing } from "../theme/theme";
import { api } from "../services/api";

const MAX_ANEXOS = 3;
const MAX_MB = 10;

// parte = o arquivo em si (File do navegador ou File do expo-file-system, os dois funcionam como Blob)
type Anexo = { nome: string; tipo: string; tamanho: number; parte: Blob };

// Tipagem simples e local, sem precisar de arquivo separado
type SafeReportScreenProps = {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
};

export default function SafeReportScreen({ navigation }: SafeReportScreenProps) {
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [enviando, setEnviando] = useState(false);

  // abre a galeria/arquivos do celular, só com imagens e áudios
  async function escolherAnexo() {
    let escolhidos: Anexo[] = [];
    if (Platform.OS === "web") {
      const r = await DocumentPicker.getDocumentAsync({ type: ["image/*", "audio/*"], multiple: true });
      if (r.canceled) return;
      escolhidos = r.assets.flatMap((a) =>
        a.file ? [{ nome: a.name, tipo: a.mimeType ?? a.file.type, tamanho: a.size ?? a.file.size, parte: a.file }] : []
      );
    } else {
      // no celular usamos o seletor do expo-file-system: ele já dá permissão de leitura do arquivo
      const r = await File.pickFileAsync({ mimeTypes: ["image/*", "audio/*"], multipleFiles: true });
      if (r.canceled) return;
      escolhidos = r.result.map((f) => ({
        nome: f.name,
        tipo: f.type ?? "",
        tamanho: f.size ?? 0,
        parte: f as unknown as Blob,
      }));
    }
    const grandes = escolhidos.filter((a) => a.tamanho > MAX_MB * 1024 * 1024);
    if (grandes.length) {
      Alert.alert("Arquivo muito grande", `Cada anexo pode ter no máximo ${MAX_MB} MB.`);
    }
    const novos = escolhidos.filter((a) => a.tamanho <= MAX_MB * 1024 * 1024);
    setAnexos((atuais) => {
      const juntos = [...atuais, ...novos];
      if (juntos.length > MAX_ANEXOS) {
        Alert.alert("Limite de anexos", `Você pode anexar até ${MAX_ANEXOS} arquivos.`);
      }
      return juntos.slice(0, MAX_ANEXOS);
    });
  }

  function handleNavigate(key: string) {
    if (key === "Home") navigation.navigate("SearchHelp");
    if (key === "Guide") navigation.navigate("Guide");
    if (key === "Report") navigation.navigate("SafeReport");
    if (key === "Profile") navigation.navigate("Contacts");
  }

  async function handleSubmit() {
    if (!description.trim()) {
      Alert.alert(
        "Conte um pouco mais",
        "Descreva o que aconteceu para que possamos registrar seu relato."
      );
      return;
    }

    // texto + arquivos vão juntos num FormData
    const dados = new FormData();
    dados.append("descricao", description);
    dados.append("local", location);
    for (const a of anexos) dados.append("anexos", a.parte, a.nome);

    setEnviando(true);
    try {
      // sem login o relato fica anônimo (usuario_id vazio no banco)
      await api("/registros", { body: dados });
    } catch (e) {
      Alert.alert("Não foi possível enviar", (e as Error).message);
      return;
    } finally {
      setEnviando(false);
    }

    setDescription("");
    setLocation("");
    setAnexos([]);
    Alert.alert(
      "Relato enviado",
      "Seu relato foi enviado com segurança. Obrigado por confiar na Rede Sentinela."
    );
  }

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
              <Text style={styles.headerTitle}>Registro Seguro</Text>
            </View>
            <Pressable
              hitSlop={12}
              onPress={() =>
                Alert.alert(
                  "Ajuda",
                  "Preencha os campos abaixo com calma. Você pode deixar a localização em branco se preferir."
                )
              }
            >
              <Ionicons
                name="help-circle-outline"
                size={22}
                color={colors.textDark}
              />
            </Pressable>
          </View>

          {/* SELO / ESPAÇO SEGURO */}
          <View style={styles.badgeWrap}>
            <View style={styles.badgeCircle}>
              <Ionicons
                name="shield-checkmark"
                size={30}
                color={colors.oliveDark}
              />
            </View>
          </View>

          <Text style={styles.title}>Este é um espaço seguro</Text>
          <Text style={styles.subtitle}>
            Sua identidade está protegida. Relate o que aconteceu com calma e
            segurança.
          </Text>

          {/* O QUE ACONTECEU */}
          <Text style={styles.fieldLabel}>O que aconteceu?</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva o ocorrido com o máximo de detalhes que se sentir confortável em compartilhar…"
            placeholderTextColor={colors.textMuted}
            style={styles.textarea}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          {/* LOCALIZAÇÃO */}
          <Text style={styles.fieldLabel}>Localização (opcional)</Text>
          <View style={styles.locationInputWrap}>
            <Ionicons
              name="location-outline"
              size={18}
              color={colors.textMuted}
            />
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="Ex: Rua, Bairro ou Estabelecimento"
              placeholderTextColor={colors.textMuted}
              style={styles.locationInput}
            />
          </View>

          {/* ANEXAR EVIDÊNCIA */}
          <Pressable
            style={styles.attachRow}
            onPress={escolherAnexo}
            disabled={anexos.length >= MAX_ANEXOS}
            accessibilityRole="button"
            accessibilityLabel="Adicionar foto ou áudio"
          >
            <Ionicons name="attach" size={18} color={colors.textDark} />
            <View style={styles.attachTextWrap}>
              <Text style={styles.attachTitle}>Anexar evidência</Text>
              <Text style={styles.attachSubtitle}>
                Fotos, áudios ou capturas de tela (até {MAX_ANEXOS}, {MAX_MB} MB cada)
              </Text>
            </View>
            <Ionicons
              name="add-circle"
              size={26}
              color={anexos.length >= MAX_ANEXOS ? colors.divider : colors.oliveDark}
            />
          </Pressable>

          {anexos.map((a, i) => (
            <View key={`${a.nome}-${i}`} style={styles.anexoItem}>
              <Ionicons
                name={a.tipo.startsWith("audio") ? "musical-notes-outline" : "image-outline"}
                size={18}
                color={colors.oliveDark}
              />
              <Text style={styles.anexoNome} numberOfLines={1}>
                {a.nome}
              </Text>
              <Pressable
                hitSlop={10}
                onPress={() => setAnexos((atuais) => atuais.filter((_, j) => j !== i))}
                accessibilityLabel={`Remover ${a.nome}`}
              >
                <Ionicons name="close-circle" size={20} color={colors.dangerRed} />
              </Pressable>
            </View>
          ))}

          {/* INFO / CRIPTOGRAFIA */}
          <View style={styles.infoBox}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={colors.oliveDark}
              style={{ marginTop: 1 }}
            />
            <Text style={styles.infoText}>
              Seu relato será criptografado. Nenhuma informação pessoal será
              compartilhada com terceiros sem seu consentimento explícito.
            </Text>
          </View>

          {/* ENVIAR */}
          <View style={styles.submitWrapper}>
            <PrimaryButton
              label={enviando ? "Enviando..." : "Enviar Relato Seguro"}
              icon="arrow-forward"
              onPress={enviando ? () => {} : handleSubmit}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      </KeyboardAvoidingView>

      <BottomNav activeKey="Report" onNavigate={handleNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  anexoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
  },
  anexoNome: { flex: 1, fontSize: 14, color: colors.textDark },
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

  badgeWrap: { alignItems: "center", marginTop: spacing.sm },
  badgeCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.mintBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },

  title: {
    ...typography.h2,
    fontSize: 21,
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    ...typography.body,
    textAlign: "center",
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },

  fieldLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 8,
  },
  textarea: {
    backgroundColor: colors.cardWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 16,
    padding: spacing.md,
    minHeight: 130,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: spacing.md,
  },

  locationInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.cardWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 14,
    paddingHorizontal: spacing.sm + 4,
    height: 50,
    marginBottom: spacing.md,
  },
  locationInput: { flex: 1, fontSize: 14, color: colors.textDark },

  attachRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.cardWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 16,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  attachTextWrap: { flex: 1 },
  attachTitle: { fontSize: 14, fontWeight: "700", color: colors.textDark },
  attachSubtitle: { fontSize: 12, color: colors.textMuted, marginTop: 1 },

  infoBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  infoText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textBody,
  },

  submitWrapper: { marginBottom: spacing.md },
});