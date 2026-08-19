// Paleta extraída das telas de onboarding do Rede Sentinela
export const colors = {
  oliveDark: "#5C6A44",     // fundo tela 1 (topo do gradiente)
  oliveLight: "#7C8A62",    // fundo tela 1 (base do gradiente)
  mintBg: "#DCE7D3",        // fundo tela 2
  cardWhite: "#FFFFFF",
  brownAccent: "#7A4A1E",   // botão / título "Rede Sentinela"
  brownAccentDark: "#5E3A16",
  textDark: "#2E2A22",
  textBody: "#6B6558",
  textMuted: "#8C8878",
  dotInactive: "#D8D3C4",
  dotInactiveOnGreen: "rgba(255,255,255,0.4)",
  divider: "#E7E2D6",

  // Paleta extra — telas "Meus Contatos" e "Registro Seguro"
  creamBg: "#FAF9F5",       // fundo geral das telas (bege claro)
  surfaceMuted: "#F2F1EA",  // cards neutros (ex: card "Precisa de ajuda agora?")
  inputBg: "#F1EFE6",
  avatarGreen: "#DCE9AE",
  avatarPeach: "#FCEBD9",
  dangerRed: "#C0392B",
  dangerRedBg: "#F7DEDE",
};

export const typography = {
  h1: { fontSize: 24, fontWeight: "700", color: colors.textDark },
  h2: { fontSize: 22, fontWeight: "700", color: colors.brownAccent },
  body: { fontSize: 14, fontWeight: "400", color: colors.textBody, lineHeight: 20 },
  label: { fontSize: 11, fontWeight: "700", letterSpacing: 1, color: colors.textMuted },
  brand: { fontSize: 16, fontWeight: "700", color: colors.brownAccent },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};