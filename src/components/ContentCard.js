import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme/theme";

const TAG_COLORS = {
  Artigo: { bg: "#EFEAD9", text: colors.brownAccentDark },
  Vídeo: { bg: "#DCE7D3", text: colors.oliveDark },
  "Guia Rápido": { bg: "#F3D9C4", text: colors.brownAccentDark },
};

export default function ContentCard({ icon, iconBg, title, tag, duration, onPress }) {
  const tagStyle = TAG_COLORS[tag] || TAG_COLORS.Artigo;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.iconWrap, { backgroundColor: iconBg || colors.mintBg }]}>
        <Ionicons name={icon} size={20} color={colors.oliveDark} />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.metaRow}>
          <View style={[styles.tagPill, { backgroundColor: tagStyle.bg }]}>
            <Text style={[styles.tagLabel, { color: tagStyle.text }]}>{tag}</Text>
          </View>
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardWhite,
    borderRadius: 16,
    padding: spacing.sm + 4,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  textWrap: { flex: 1 },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 4,
  },
  metaRow: { flexDirection: "row", alignItems: "center" },
  tagPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    marginRight: 8,
  },
  tagLabel: { fontSize: 11, fontWeight: "700" },
  duration: { fontSize: 12, color: colors.textMuted },
});