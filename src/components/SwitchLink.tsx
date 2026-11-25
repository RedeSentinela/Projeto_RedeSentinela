import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../theme/theme";

type SwitchLinkProps = {
  texto: string;
  link: string;
  onPress: () => void;
};

// "Você já tem uma conta? Então vamos fazer login!"
export default function SwitchLink({ texto, link, onPress }: SwitchLinkProps) {
  return (
    <Text style={styles.texto}>
      {texto}{"\n"}
      <Text style={styles.link} onPress={onPress} accessibilityRole="link">
        {link}
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  texto: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textDark,
    textAlign: "center",
  },
  link: {
    color: colors.oliveLight,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
