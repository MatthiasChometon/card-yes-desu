import type { CardInformation } from "./card-information.type";
import type { GameCardState } from "./game-card-state.type";

export interface PlayableCard extends CardInformation {
  gameState: GameCardState
  isDndShadowItem?: boolean
}
