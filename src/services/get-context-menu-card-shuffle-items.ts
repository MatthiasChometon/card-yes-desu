import type { ContextMenuCardItem } from "../types/context-menu-card-item.type";
import type { PlayableCard } from "../types/playable-card.type";
import { shuffleCards } from "./shuffle-cards";

export function getContextMenuCardShuffleItems (): ContextMenuCardItem[] {
	return [
		{
			displayText: 'Shuffle Hand',
			updateCards: null,
			updateCardZones: (cards: PlayableCard[][]) => shuffleCards(cards),
			updateCardFieldZone: null
		},
	]
}
