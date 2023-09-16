<script lang="ts">
	import type { CardZonePlaceType } from '../enums/card-zone-place-type.enum';
	import { drawCards } from '../services/draw-cards';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { ContextMenuItem } from '../types/context-menu-item.type';
	import ActivePlayerCardZones from './active-player-card-zones.svelte';
	import ExtraMonsterZones from './extra-monster-zones.svelte';
	import OpponentCardZones from './opponent-card-zones.svelte';

	export let cardFieldZone: CardFieldZoneType,
		aspectRatio: number,
		style: string = '',
		onCardDrop: () => void,
		onCardChangingPosition: () => void,
		opponentCardZonePlaceType: CardZonePlaceType.HostPlayer | CardZonePlaceType.InvitedPlayer,
		activePlayerCardZonePlaceType: CardZonePlaceType.HostPlayer | CardZonePlaceType.InvitedPlayer,
		extraMonsterZonesLeftZoneIndex: 0 | 1,
		extraMonsterZonesRightZoneIndex: 0 | 1;

	function getActivePlayerDeckMenuItems(
		cardZonePlaceType: CardZonePlaceType.HostPlayer | CardZonePlaceType.InvitedPlayer
	): ContextMenuItem[] {
		return [
			{
				displayText: 'Draw one card',
				onClick: () => {
					cardFieldZone = drawCards(cardFieldZone, 1, cardZonePlaceType);
				}
			},
			{
				displayText: 'Draw five cards',
				onClick: () => {
					cardFieldZone = drawCards(cardFieldZone, 5, cardZonePlaceType);
				}
			}
		];
	}
</script>

<div
	style="aspect-ratio: {aspectRatio}; width: 100%; height: 100%; position: relative; display: flex; align-items: center; flex-direction: column; {style}"
>
	<img
		style="aspect-ratio: {aspectRatio}; height: 100%; position: absolute; z-index: -1;"
		src="yugioh-field.webp"
		alt="yugioh field"
	/>
	<div style="aspect-ratio: {aspectRatio}; height: 100%; display: flex; flex-direction: column;">
		<OpponentCardZones
			cardZonePlaceType={opponentCardZonePlaceType}
			{onCardChangingPosition}
			deckMenuItems={getActivePlayerDeckMenuItems(opponentCardZonePlaceType)}
			bind:cardFieldZone
			{onCardDrop}
		/>
		<ExtraMonsterZones
			leftZoneIndex={extraMonsterZonesLeftZoneIndex}
			rightZoneIndex={extraMonsterZonesRightZoneIndex}
			{onCardChangingPosition}
			bind:cardFieldZone
			{onCardDrop}
		/>
		<ActivePlayerCardZones
			cardZonePlaceType={activePlayerCardZonePlaceType}
			{onCardChangingPosition}
			deckMenuItems={getActivePlayerDeckMenuItems(activePlayerCardZonePlaceType)}
			bind:cardFieldZone
			{onCardDrop}
		/>
	</div>
</div>
