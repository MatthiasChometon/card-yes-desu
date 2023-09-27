import type { CardFieldZoneType } from "./card-field-zone.type"
import type { DeckType } from "./deck.type"
import type { PlayableCard } from "./playable-card.type"

export interface PlayersConnectionSendedDataType {
  fieldCards: CardFieldZoneType | null
  cardToReveal: PlayableCard | null
  revealHand: boolean | null
  initialOpponentDeck: DeckType | null
}
