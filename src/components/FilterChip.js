import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../theme/theme";

export default function FilterChip({ label, active, onPress }) {
  return (
    <Pressable
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.mintBg,
    marginRight: spacing.sm,
  },
  chipActive: {
    backgroundColor: colors.oliveDark,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.oliveDark,
  },
  labelActive: {
    color: colors.cardWhite,
  },
});