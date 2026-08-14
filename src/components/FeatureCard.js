import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography, spacing } from "../theme/theme";

export default function FeatureCard({ icon, title, subtitle }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={22} color={colors.brownAccent} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.cardWhite,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.mintBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h2,
    fontSize: 15,
    marginBottom: 2,
  },
  subtitle: {
    ...typography.body,
    fontSize: 12,
  },
});