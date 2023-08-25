import type { CardRotation } from "../enums/card-rotation.enum"

export interface GameCardState {
  rotation: CardRotation
  faceUp: boolean
}
