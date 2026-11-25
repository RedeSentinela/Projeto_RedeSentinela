import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../theme/theme";

type LoadingScreenProps = {
  navigation: { replace: (screen: string) => void };
};

// Tela de abertura: mostra a logo e segue para o onboarding
export default function LoadingScreen({ navigation }: LoadingScreenProps) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace("Intro"), 1500);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.root}>
      <Image
        source={require("../assets/image/logo.png")}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="Logo RedeSentinela"
      />
      <Text style={styles.texto}>RedeSentinela</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.oliveDark,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: 140, height: 140 },
  texto: { marginTop: 16, fontSize: 26, fontWeight: "700", color: colors.creamBg },
});
