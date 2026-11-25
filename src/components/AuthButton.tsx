import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../theme/theme";

type AuthButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variante?: "primario" | "secundario";
};

// Botão marrom dos formulários de login/cadastro (fica apagado enquanto o form não é válido)
export default function AuthButton({ label, onPress, disabled, variante = "primario" }: AuthButtonProps) {
  const secundario = variante === "secundario";
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.button,
        secundario && styles.secundario,
        pressed && !secundario && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.label, secundario && styles.labelSecundario]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.brownAccent,
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 36,
    alignSelf: "center",
    marginTop: 12,
  },
  secundario: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.brownAccent,
  },
  pressed: { backgroundColor: colors.brownAccentDark },
  disabled: { opacity: 0.5 },
  label: { color: "#fff", fontSize: 17, fontWeight: "600" },
  labelSecundario: { color: colors.brownAccent },
});
