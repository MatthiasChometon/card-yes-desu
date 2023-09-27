import type { CardZonePlaceType } from "../enums/card-zone-place-type.enum";
import type { CardFieldZoneType } from "../types/card-field-zone.type";
import type { DeckType } from "../types/deck.type";
import { hideCards } from "./hide-cards";

export function setInitialDeckList (fieldCards: CardFieldZoneType, deck: DeckType, cardZonePlaceType: CardZonePlaceType.InvitedPlayer | CardZonePlaceType.HostPlayer): CardFieldZoneType {
  return {
    ...fieldCards,
    [cardZonePlaceType]: {
      ...fieldCards[cardZonePlaceType],
      Deck: hideCards(deck.Deck),
      ExtraDeck: hideCards(deck.ExtraDeck),
      SideDeck: hideCards(deck.SideDeck)
    }
  };
}
