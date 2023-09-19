import { CardZonePlaceType } from "../enums/card-zone-place-type.enum";
import { CardZoneType } from "../enums/card-zone-type.enum";
import type { CardFieldZoneType } from "../types/card-field-zone.type";
import type { PlayableCard } from "../types/playable-card.type";

function keepCardLocalGameState (onlineCards: PlayableCard[], localCards: PlayableCard[]) {
  return onlineCards.map((card) => {
    const localCardFounded = localCards.find((localCard) => localCard.id === card.id);
    if (localCardFounded === undefined) return card;
    return { ...card, gameState: { ...card.gameState, ...localCardFounded.gameState } };
  });
}

export function onFieldCardsDataReceived (fieldCards: CardFieldZoneType, updatedFieldCards: CardFieldZoneType): CardFieldZoneType {
  const newFieldCards = {
    ...updatedFieldCards,
    [CardZonePlaceType.HostPlayer]: {
      ...updatedFieldCards[CardZonePlaceType.HostPlayer],
      [CardZoneType.Hand]: keepCardLocalGameState(
        updatedFieldCards[CardZonePlaceType.HostPlayer][CardZoneType.Hand],
        fieldCards[CardZonePlaceType.HostPlayer][CardZoneType.Hand]
      )
    },
    [CardZonePlaceType.InvitedPlayer]: {
      ...updatedFieldCards[CardZonePlaceType.InvitedPlayer],
      [CardZoneType.Hand]: keepCardLocalGameState(
        updatedFieldCards[CardZonePlaceType.InvitedPlayer][CardZoneType.Hand],
        fieldCards[CardZonePlaceType.InvitedPlayer][CardZoneType.Hand]
      )
    }
  };
  return newFieldCards
}
