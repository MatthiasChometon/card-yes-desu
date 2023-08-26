import type { GameCardState } from "./game-card-state.type"

export interface ContextMenuCardItem {
  displayText: string
  cardState: GameCardState
}
