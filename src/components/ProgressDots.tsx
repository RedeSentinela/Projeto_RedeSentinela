import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../theme/theme";

type ProgressDotsProps = {
  total?: number;
  activeIndex?: number;
  onGreen?: boolean;
};

export default function ProgressDots({ total = 3, activeIndex = 0, onGreen = false }: ProgressDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i === activeIndex;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              active && styles.dotActive,
              !active && {
                backgroundColor: onGreen ? colors.dotInactiveOnGreen : colors.dotInactive,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.brownAccent,
  },
});