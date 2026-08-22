import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "../theme/theme";

type NavItem = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  isCentral?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    key: "Home",
    label: "Home",
    icon: "home-outline",
  },
  {
    key: "Guide",
    label: "Ajuda",
    icon: "help-circle-outline",
  },
  {
    key: "Report",
    label: "Denúncia",
    icon: "add",
    isCentral: true,
  },
  {
    key: "Profile",
    label: "Profile",
    icon: "person-outline",
  },
];

type BottomNavProps = {
  activeKey: string;
  onNavigate: (key: string) => void;
};

/* =========================================================
   NAVEGAÇÃO NATIVA
   ========================================================= */

function NativeTabBar({
  activeKey,
  onNavigate,
}: BottomNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBar,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {/* HOME */}
      <Pressable
        style={styles.tabItem}
        onPress={() => onNavigate("Home")}
      >
        <Ionicons
          name="home-outline"
          size={23}
          color={
            activeKey === "Home"
              ? colors.oliveDark
              : colors.textMuted
          }
        />

        <Text
          style={[
            styles.tabLabel,
            activeKey === "Home" && styles.tabLabelActive,
          ]}
        >
          Home
        </Text>
      </Pressable>

      {/* AJUDA */}
      <Pressable
        style={styles.tabItem}
        onPress={() => onNavigate("Guide")}
      >
        <Ionicons
          name="help-circle-outline"
          size={23}
          color={
            activeKey === "Guide"
              ? colors.oliveDark
              : colors.textMuted
          }
        />

        <Text
          style={[
            styles.tabLabel,
            activeKey === "Guide" && styles.tabLabelActive,
          ]}
        >
          Ajuda
        </Text>
      </Pressable>

      {/* ESPAÇO DO + */}
      <View style={styles.tabItem} />

      {/* PROFILE */}
      <Pressable
        style={styles.tabItem}
        onPress={() => onNavigate("Profile")}
      >
        <Ionicons
          name="person-outline"
          size={23}
          color={
            activeKey === "Profile"
              ? colors.oliveDark
              : colors.textMuted
          }
        />

        <Text
          style={[
            styles.tabLabel,
            activeKey === "Profile" && styles.tabLabelActive,
          ]}
        >
          Profile
        </Text>
      </Pressable>

      {/* + CENTRAL */}
      <Pressable
        style={styles.centralButton}
        onPress={() => onNavigate("Report")}
      >
        <Ionicons
          name="add"
          size={29}
          color="#FFFFFF"
        />
      </Pressable>
    </View>
  );
}

/* =========================================================
   MENU WEB
   ========================================================= */

function WebHamburgerMenu({
  activeKey,
  onNavigate,
}: BottomNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        style={styles.hamburgerButton}
        onPress={() => setOpen(true)}
        hitSlop={10}
      >
        <Ionicons
          name="menu"
          size={24}
          color={colors.textDark}
        />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setOpen(false)}
        >
          <View style={styles.menuPanel}>
            {NAV_ITEMS.map((item) => {
              const isActive = item.key === activeKey;

              return (
                <Pressable
                  key={item.key}
                  style={[
                    styles.menuRow,
                    isActive && styles.menuRowActive,
                  ]}
                  onPress={() => {
                    setOpen(false);
                    onNavigate(item.key);
                  }}
                >
                  <Ionicons
                    name={
                      item.isCentral
                        ? "megaphone-outline"
                        : item.icon
                    }
                    size={20}
                    color={
                      isActive
                        ? colors.oliveDark
                        : colors.textDark
                    }
                  />

                  <Text
                    style={[
                      styles.menuLabel,
                      isActive &&
                        styles.menuLabelActive,
                    ]}
                  >
                    {item.key === "Report"
                      ? "Fazer denúncia"
                      : item.label}
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

/* =========================================================
   COMPONENTE PRINCIPAL
   ========================================================= */

export default function BottomNav({
  activeKey,
  onNavigate,
}: BottomNavProps) {
  if (Platform.OS === "web") {
    return (
      <WebHamburgerMenu
        activeKey={activeKey}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <NativeTabBar
      activeKey={activeKey}
      onNavigate={onNavigate}
    />
  );
}

/* =========================================================
   ESTILOS
   ========================================================= */

const styles = StyleSheet.create({
  /* -------------------------------------------------------
     BARRA INFERIOR
     ------------------------------------------------------- */

  tabBar: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    height: 72,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: colors.cardWhite,

    borderTopWidth: 1,
    borderTopColor: colors.divider,

    zIndex: 100,
    elevation: 20,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 20,
      },
    }),
  },

  /* Cada espaço ocupa exatamente 25% da barra */
  tabItem: {
    flex: 1,

    height: 72,

    alignItems: "center",
    justifyContent: "center",
  },

  tabLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 3,
  },

  tabLabelActive: {
    color: colors.oliveDark,
    fontWeight: "700",
  },

  /* -------------------------------------------------------
     BOTÃO +
     ------------------------------------------------------- */

  centralButton: {
    position: "absolute",

    left: "50%",
    top: -26,

    width: 52,
    height: 52,

    borderRadius: 26,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: colors.brownAccentDark,

    transform: [
      {
        translateX: -26,
      },
    ],

    zIndex: 200,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.22,
        shadowRadius: 7,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  /* -------------------------------------------------------
     WEB
     ------------------------------------------------------- */

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
    shadowOffset: {
      width: 0,
      height: 2,
    },

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

    paddingVertical: 14,

    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },

  menuRowActive: {},

  menuLabel: {
    fontSize: 15,
    color: colors.textDark,
    marginLeft: 12,
  },

  menuLabelActive: {
    color: colors.oliveDark,
    fontWeight: "700",
  },
});