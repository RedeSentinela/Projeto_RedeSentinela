import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme/theme";

type NavItem = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  isCentral?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { key: "Home", label: "Home", icon: "home-outline" },
  { key: "Guide", label: "Ajuda", icon: "help-circle-outline" },
  { key: "Report", label: "Denúncia", icon: "add", isCentral: true },
  { key: "Profile", label: "Profile", icon: "person-outline" },
];

// Tipagem compartilhada pelas duas versões (nativa e web) e pelo componente exportado
type BottomNavProps = {
  activeKey: string;
  onNavigate: (key: string) => void;
};

// --- Versão nativa (app): barra fixa embaixo, com botão central em destaque ---
function NativeTabBar({ activeKey, onNavigate }: BottomNavProps) {
  return (
    <View style={styles.tabBar}>
      {NAV_ITEMS.map((item) => {
        const isActive = item.key === activeKey;

        if (item.isCentral) {
          return (
            <Pressable
              key={item.key}
              style={styles.centralButton}
              onPress={() => onNavigate(item.key)}
            >
              <Ionicons name={item.icon} size={26} color={colors.cardWhite} />
            </Pressable>
          );
        }

        return (
          <Pressable
            key={item.key}
            style={styles.tabItem}
            onPress={() => onNavigate(item.key)}
          >
            <Ionicons
              name={item.icon}
              size={22}
              color={isActive ? colors.oliveDark : colors.textMuted}
            />
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// --- Versão web: botão de menu sanduíche que abre uma lista de navegação ---
function WebHamburgerMenu({ activeKey, onNavigate }: BottomNavProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Pressable style={styles.hamburgerButton} onPress={() => setOpen(true)} hitSlop={10}>
        <Ionicons name="menu" size={24} color={colors.textDark} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.menuPanel}>
            {NAV_ITEMS.map((item) => {
              const isActive = item.key === activeKey;
              return (
                <Pressable
                  key={item.key}
                  style={[styles.menuRow, isActive && styles.menuRowActive]}
                  onPress={() => {
                    setOpen(false);
                    onNavigate(item.key);
                  }}
                >
                  <Ionicons
                    name={item.isCentral ? "megaphone-outline" : item.icon}
                    size={20}
                    color={isActive ? colors.oliveDark : colors.textDark}
                  />
                  <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                    {item.key === "Report" ? "Fazer denúncia" : item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

export default function BottomNav({ activeKey, onNavigate }: BottomNavProps) {
  if (Platform.OS === "web") {
    return <WebHamburgerMenu activeKey={activeKey} onNavigate={onNavigate} />;
  }
  return <NativeTabBar activeKey={activeKey} onNavigate={onNavigate} />;
}

const styles = StyleSheet.create({
  // Nativo
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.cardWhite,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: 8,
    paddingBottom: 18,
  },
  tabItem: { alignItems: "center", gap: 2 },
  tabLabel: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  tabLabelActive: { color: colors.oliveDark, fontWeight: "700" },
  centralButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.brownAccentDark,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -28,
  },

  // Web
  hamburgerButton: {
    position: "absolute",
    top: 14,
    right: spacing.lg,
    zIndex: 20,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cardWhite,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "flex-end",
  },
  menuPanel: {
    width: 240,
    height: "100%",
    backgroundColor: colors.cardWhite,
    paddingTop: 60,
    paddingHorizontal: spacing.md,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuRowActive: {},
  menuLabel: { fontSize: 15, color: colors.textDark, marginLeft: 12 },
  menuLabelActive: { color: colors.oliveDark, fontWeight: "700" },
});