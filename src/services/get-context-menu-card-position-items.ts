import type { ContextMenuCardItem } from "../types/context-menu-card-item.type";

export function getContextMenuCardPositionItems (): ContextMenuCardItem[] {
	return [
		{
			displayText: 'Defense position',
			cardState: { rotation: 90, faceUp: true }
		},
		{
			displayText: 'Attack position',
			cardState: { rotation: 0, faceUp: true }
		},
		{
			displayText: 'Flip position',
			cardState: { rotation: 90, faceUp: false }
		}
	]
}
