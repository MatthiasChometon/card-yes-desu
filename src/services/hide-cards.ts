import type { PlayableCard } from "../types/playable-card.type";
import { hideCard } from "./hide-card";

export function hideCards (cards: PlayableCard[]): PlayableCard[] {
  return cards.map(card => hideCard(card));
}
