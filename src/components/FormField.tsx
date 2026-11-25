import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Platform, type TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme/theme";

type FormFieldProps = TextInputProps & {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  senha?: boolean; // mostra o olho para exibir/ocultar a senha
};

export default function FormField({ icon, label, senha, ...inputProps }: FormFieldProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.box}>
        <Ionicons name={icon} size={18} color={colors.brownAccent} />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={senha && !mostrarSenha}
          autoCapitalize="none"
          accessibilityLabel={label}
          {...inputProps}
        />
        {senha ? (
          <Pressable
            onPress={() => setMostrarSenha((v) => !v)}
            hitSlop={10}
            accessibilityLabel={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
          >
            <Ionicons
              name={mostrarSenha ? "eye-outline" : "eye-off-outline"}
              size={18}
              color={colors.brownAccent}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: spacing.md, width: "100%" },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.brownAccent,
    marginBottom: 6,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    minWidth: 0,
    fontSize: 14,
    color: colors.textDark,
    padding: 0,
    // tira o contorno azul do navegador (só existe na versão web)
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  } as object,
});
