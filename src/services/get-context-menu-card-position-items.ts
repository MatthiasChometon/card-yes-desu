import type { ContextMenuCardItem } from "../types/context-menu-card-item.type";
import type { GameCardState } from "../types/game-card-state.type";
import type { PlayableCard } from "../types/playable-card.type";
import { updateObjectInArrayById } from "./updateObjectInArrayById";
import { updateSubObject } from "./updateSubObject";

function updateGameState (cards: PlayableCard[], card: PlayableCard, newGameState: GameCardState): PlayableCard[] {
	const newCard = updateSubObject(card, 'gameState', newGameState)
	return updateObjectInArrayById(cards, newCard);
}

export function getContextMenuCardPositionItems (): ContextMenuCardItem[] {
	return [
		{
			displayText: 'Attack position',
			updateCards: (cards: PlayableCard[], card: PlayableCard) => updateGameState(cards, card, { rotation: 0, faceUp: true }),
			updateCardFieldZone: null
		},
		{
			displayText: 'Defense position',
			updateCards: (cards: PlayableCard[], card: PlayableCard) => updateGameState(cards, card, { rotation: 90, faceUp: false }),
			updateCardFieldZone: null
		},
		{
			displayText: 'Flip position',
			updateCards: (cards: PlayableCard[], card: PlayableCard) => updateGameState(cards, card, { rotation: 90, faceUp: false }),
			updateCardFieldZone: null
		}
	]
}
