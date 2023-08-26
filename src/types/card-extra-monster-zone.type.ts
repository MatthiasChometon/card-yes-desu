import type { PlayableCard } from "./playable-card.type";

type TwoElementArray<T> = [T, T];

export type CardExtraMonsterZoneType = TwoElementArray<PlayableCard[]>
