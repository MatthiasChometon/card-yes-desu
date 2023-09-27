import type { PlayableCard } from "../types/playable-card.type";

export function hideCards (cards: PlayableCard[]): PlayableCard[] {
  return cards.map((card) => ({ ...card, gameState: { faceUp: false, rotation: 0 } }));
}
