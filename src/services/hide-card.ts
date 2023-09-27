import type { PlayableCard } from "../types/playable-card.type";

export function hideCard (card: PlayableCard): PlayableCard {
  return {
    ...card, gameState: { ...card.gameState, faceUp: false, rotation: 0 }
  }
}
