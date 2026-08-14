import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import PrimaryButton from "../components/PrimaryButton";
import { colors, typography, spacing } from "../theme/theme";

export default function SafeReportScreen({ navigation }) {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [attachEvidence, setAttachEvidence] = useState(false);

  function handleNavigate(key) {
    if (key === "Home") navigation.navigate("Home");
    if (key === "Guide") navigation.navigate("Guide");
    if (key === "Report") navigation.navigate("SafeReport");
    if (key === "Profile") navigation.navigate("Profile");
  }

  function handleSubmit() {
    if (!description.trim()) {
      Alert.alert(
        "Conte um pouco mais",
        "Descreva o que aconteceu para que possamos registrar seu relato."
      );
      return;
    }

    // TODO: integrar com o backend / envio criptografado do relato
    Alert.alert(
      "Relato enviado",
      "Seu relato foi enviado com segurança. Obrigado por confiar na Rede Sentinela.",
      [
        {
          text: "OK",
          onPress: () => {
            setDescription("");
            setLocation("");
            setAttachEvidence(false);
          },
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
          <View style={styles.attachRow}>
            <Ionicons name="attach" size={18} color={colors.textDark} />
            <View style={styles.attachTextWrap}>
              <Text style={styles.attachTitle}>Anexar evidência</Text>
              <Text style={styles.attachSubtitle}>
                Fotos, áudios ou capturas de tela
              </Text>
            </View>
            <Switch
              value={attachEvidence}
              onValueChange={setAttachEvidence}
              trackColor={{ false: colors.divider, true: colors.oliveDark }}
              thumbColor="#FFFFFF"
            />
          </View>

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
              label="Enviar Relato Seguro"
              icon="arrow-forward"
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomNav activeKey="Report" onNavigate={handleNavigate} />
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
