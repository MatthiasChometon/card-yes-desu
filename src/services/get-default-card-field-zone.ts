import { CardZonePlaceType } from "../enums/card-zone-place-type.enum";
import { CardZoneType } from "../enums/card-zone-type.enum";
import type { CardExtraMonsterZoneType } from "../types/card-extra-monster-zone.type";
import type { CardFieldZoneType } from "../types/card-field-zone.type";
import type { PlayerCardZoneType } from "../types/player-card-zone.type";

export function getDefaultCardFieldZone (): CardFieldZoneType {
  const defaultPlayerCards: PlayerCardZoneType = {
    [CardZoneType.Hand]: [],
    [CardZoneType.Deck]: [],
    [CardZoneType.ExtraDeck]: [],
    [CardZoneType.MonsterField]: [
      [], [], [], [], []
    ],
    [CardZoneType.Graveyard]: [],
    [CardZoneType.Banished]: [],
    [CardZoneType.SpellTrapZone]: [
      [], [], [], [], []
    ],
    [CardZoneType.FieldSpellZone]: [],
    [CardZoneType.SideDeck]: []
  }

  const defaultExtraMonsterZone: CardExtraMonsterZoneType = [
    [],
    []
  ]

  const cardFieldZone = {
    [CardZonePlaceType.HostPlayer]: structuredClone(defaultPlayerCards),
    [CardZonePlaceType.ExtraMonsterZone]: defaultExtraMonsterZone,
    [CardZonePlaceType.InvitedPlayer]: structuredClone(defaultPlayerCards)
  };

  return cardFieldZone
}
