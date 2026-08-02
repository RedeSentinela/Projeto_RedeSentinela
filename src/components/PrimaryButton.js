import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/theme";

export default function PrimaryButton({ label, onPress, icon = "arrow-forward" }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.label}>{label}</Text>
      {icon ? <Ionicons name={icon} size={18} color="#fff" style={styles.icon} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.brownAccent,
    borderRadius: 30,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  pressed: {
    backgroundColor: colors.brownAccentDark,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  icon: {
    marginLeft: 8,
  },
});
