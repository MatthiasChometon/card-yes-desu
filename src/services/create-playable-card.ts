import { CardRotation } from "../enums/card-rotation.enum"
import type { PlayableCard } from "../types/playable-card.type"
import { createRandomStringId } from "./create-random-string-id"

export function createPlayableCard (card: { frontPicture: string, name: string }): PlayableCard {
  const { frontPicture, name } = card

  return {
    id: createRandomStringId(),
    name,
    frontPicture,
    backPicture: 'back-card.png',
    gameState: {
      rotation: CardRotation.up,
      faceUp: true
    }
  }
}
