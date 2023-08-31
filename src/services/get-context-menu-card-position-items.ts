import type { GameCardState } from "../types/game-card-state.type";

export function getContextMenuCardPositionItems (): Array<{
	displayText: string,
	newPosition: GameCardState,
}> {
	return [
		{
			displayText: 'Attack position',
			newPosition: { rotation: 0, faceUp: true },
		},
		{
			displayText: 'Defense position',
			newPosition: { rotation: 90, faceUp: true }
		},
		{
			displayText: 'Attack Flip position',
			newPosition: { rotation: 0, faceUp: false }
		},
		{
			displayText: 'Defense Flip position',
			newPosition: { rotation: 90, faceUp: false }
		}
	]
}
