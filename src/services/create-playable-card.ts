import { CardRotation } from "../enums/card-rotation.enum"
import type { PlayableCard } from "../types/playable-card.type"
import { createRandomId } from "./create-random-id"

export function createPlayableCard (card: { frontPicture: string, name: string }): PlayableCard {
  const { frontPicture, name } = card

  return {
    id: createRandomId(),
    name,
    frontPicture,
    backPicture: 'back-card.png',
    gameState: {
      rotation: CardRotation.up,
      faceUp: true
    }
  }
}
