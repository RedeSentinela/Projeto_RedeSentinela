import { useRef } from "react";
import { PanResponder } from "react-native";

type UseSwipeNavigationOptions = {
  /** Chamado quando o usuário arrasta para a esquerda (avança um passo). */
  onSwipeLeft?: () => void;
  /** Chamado quando o usuário arrasta para a direita (volta um passo). */
  onSwipeRight?: () => void;
  /** Distância mínima em pixels para considerar um "arrasto" válido. */
  threshold?: number;
};

/**
 * Hook que detecta gestos de arrastar horizontal (swipe) e dispara
 * callbacks de navegação — usado para dar efeito de "carrossel" às telas
 * de introdução do app, permitindo trocar de tela arrastando o dedo,
 * além dos botões "Próximo passo" / "Voltar" que já existem.
 *
 * Só assume o gesto quando o arrasto é claramente horizontal (maior que o
 * vertical), para não atrapalhar o scroll normal de conteúdo das telas.
 */
export function useSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  threshold = 60,
}: UseSwipeNavigationOptions) {
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > 20 && Math.abs(dx) > Math.abs(dy) * 2;
      },
      onPanResponderRelease: (_evt, gestureState) => {
        if (gestureState.dx <= -threshold) {
          onSwipeLeft?.();
        } else if (gestureState.dx >= threshold) {
          onSwipeRight?.();
        }
      },
    })
  ).current;

  return panResponder.panHandlers;
}
