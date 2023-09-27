import type { CardZonePlaceType } from "../enums/card-zone-place-type.enum";
import type { CardFieldZoneType } from "../types/card-field-zone.type";

export function drawCards (cardFieldZone: CardFieldZoneType, numberToDraw: number, cardZonePlace: CardZonePlaceType.HostPlayer | CardZonePlaceType.InvitedPlayer) {
  const drawCards = cardFieldZone[cardZonePlace].Deck.slice(0, numberToDraw)
  const revealDrawCards = drawCards.map((card) => ({ ...card, gameState: { faceUp: true, rotation: 0 } }))
  const newHand = [...revealDrawCards, ...cardFieldZone[cardZonePlace].Hand];
  const newDeck = cardFieldZone[cardZonePlace].Deck.slice(numberToDraw);

  return {
    ...cardFieldZone,
    [cardZonePlace]: {
      ...cardFieldZone[cardZonePlace],
      Deck: newDeck,
      Hand: newHand
    }
  };
}
