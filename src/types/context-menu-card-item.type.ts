import type { CardFieldZoneType } from "./card-field-zone.type"
import type { PlayableCard } from "./playable-card.type"

export interface ContextMenuCardItem {
  displayText: string
  updateCards: ((cards: PlayableCard[], card: PlayableCard) => PlayableCard[]) | null
  updateCardFieldZone: ((cardFieldZone: CardFieldZoneType) => CardFieldZoneType) | null
}
