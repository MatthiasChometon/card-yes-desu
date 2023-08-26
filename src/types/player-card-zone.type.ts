import type { CardZoneType } from "../enums/card-zone-type.enum";
import type { PlayableCard } from "./playable-card.type";

type FiveElementArray<T> = [T, T, T, T, T];

export interface PlayerCardZoneType {
  [CardZoneType.Hand]: Array<PlayableCard[]>,
  [CardZoneType.Deck]: PlayableCard[],
  [CardZoneType.ExtraDeck]: PlayableCard[],
  [CardZoneType.MonsterField]: FiveElementArray<PlayableCard[]>,
  [CardZoneType.Graveyard]: PlayableCard[],
  [CardZoneType.Banished]: PlayableCard[],
  [CardZoneType.SpellTrapZone]: FiveElementArray<PlayableCard[]>,
  [CardZoneType.FieldSpellZone]: PlayableCard[],
  [CardZoneType.SideDeck]: PlayableCard[]
}
