import type { CardZoneType } from "../enums/card-zone-type.enum";
import type { PlayableCard } from "./playable-card.type";

export interface DeckType {
  name: string
  [CardZoneType.Deck]: PlayableCard[]
  [CardZoneType.ExtraDeck]: PlayableCard[]
  [CardZoneType.SideDeck]: PlayableCard[]
}