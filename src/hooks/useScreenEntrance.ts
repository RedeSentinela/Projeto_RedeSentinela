import { useCallback, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { useIsFocused } from "@react-navigation/native";

/**
 * Anima a entrada a cada foco da tela. Antes de avançar, chame
 * `prepareForReturn` para que a tela reapareça pelo lado esquerdo ao voltar.
 */
export function useScreenEntrance() {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const imageTranslateX = useRef(new Animated.Value(0)).current;
  const contentTranslateX = useRef(new Animated.Value(0)).current;
  const sheetTranslateX = useRef(new Animated.Value(0)).current;
  const imageProgress = useRef(new Animated.Value(0)).current;
  const contentProgress = useRef(new Animated.Value(0)).current;
  const sheetProgress = useRef(new Animated.Value(0)).current;
  const nextEntranceDirection = useRef<"forward" | "back">("forward");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;

    const direction = nextEntranceDirection.current === "back" ? -1 : 1;
    opacity.setValue(0);
    translateX.setValue(direction * 24);
    imageTranslateX.setValue(direction * 52);
    contentTranslateX.setValue(direction * 64);
    sheetTranslateX.setValue(direction * 46);
    imageProgress.setValue(0);
    contentProgress.setValue(0);
    sheetProgress.setValue(0);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 720,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 820,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(imageProgress, {
        toValue: 1,
        delay: 160,
        duration: 880,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(imageTranslateX, {
        toValue: 0,
        delay: 160,
        duration: 880,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(contentProgress, {
        toValue: 1,
        delay: 320,
        duration: 980,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslateX, {
        toValue: 0,
        delay: 320,
        duration: 980,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(sheetProgress, {
        toValue: 1,
        delay: 240,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslateX, {
        toValue: 0,
        delay: 240,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    contentProgress,
    contentTranslateX,
    imageTranslateX,
    imageProgress,
    isFocused,
    opacity,
    sheetProgress,
    sheetTranslateX,
    translateX,
  ]);

  const prepareForReturn = useCallback(() => {
    nextEntranceDirection.current = "back";
  }, []);

  return {
    entranceStyle: {
      opacity,
      transform: [{ translateX }],
    },
    imageStyle: {
      opacity: imageProgress,
      transform: [
        { translateX: imageTranslateX },
        {
          scale: imageProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        },
      ],
    } as any,
    contentStyle: {
      opacity: contentProgress,
      transform: [
        {
          translateX: contentTranslateX,
        },
      ],
    } as any,
    sheetStyle: {
      opacity: sheetProgress,
      transform: [
        {
          translateX: sheetTranslateX,
        },
      ],
    } as any,
    prepareForReturn,
  };
}
