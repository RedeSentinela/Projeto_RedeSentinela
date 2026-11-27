import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../theme/theme";

type AuthButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variante?: "primario" | "secundario";
  erro?: string;
  carregando?: boolean; // mostra a rodinha girando e bloqueia o botão
};

// Botão marrom dos formulários de login/cadastro (fica apagado enquanto o form não é válido)
export default function AuthButton({ label, onPress, disabled, variante = "primario", erro, carregando }: AuthButtonProps) {
  const secundario = variante === "secundario";
  return (
    <>
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      <Pressable
        onPress={onPress}
        disabled={disabled || carregando}
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || carregando, busy: carregando }}
        style={({ pressed }) => [
          styles.button,
          secundario && styles.secundario,
          pressed && !secundario && styles.pressed,
          (disabled || carregando) && styles.disabled,
        ]}
      >
        {carregando ? <ActivityIndicator color={secundario ? colors.brownAccent : "#fff"} /> : null}
        <Text style={[styles.label, secundario && styles.labelSecundario]}>{label}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  erro: {
    color: colors.dangerRed,
    textAlign: "center",
    fontSize: 14,
    marginTop: 4
  },

  button: {
    backgroundColor: colors.brownAccent,
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 36,
    alignSelf: "center",
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
