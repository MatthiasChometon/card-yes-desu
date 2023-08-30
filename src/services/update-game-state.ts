import type { GameCardState } from "../types/game-card-state.type";
import type { PlayableCard } from "../types/playable-card.type";
import { updateObjectInArrayById } from "./updateObjectInArrayById";
import { updateSubObject } from "./updateSubObject";

export function updateGameState (cards: PlayableCard[], card: PlayableCard, newGameState: GameCardState): PlayableCard[] {
  const newCard = updateSubObject(card, 'gameState', newGameState)
  return updateObjectInArrayById(cards, newCard);
}
