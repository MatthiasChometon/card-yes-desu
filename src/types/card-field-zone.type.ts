import type { CardZonePlaceType } from "../enums/card-zone-place-type.enum";
import type { CardExtraMonsterZoneType } from "./card-extra-monster-zone.type";
import type { PlayerCardZoneType } from "./player-card-zone.type";

export interface CardFieldZoneType {
  [CardZonePlaceType.HostPlayer]: PlayerCardZoneType;
  [CardZonePlaceType.ExtraMonsterZone]: CardExtraMonsterZoneType;
  [CardZonePlaceType.InvitedPlayer]: PlayerCardZoneType;
};
