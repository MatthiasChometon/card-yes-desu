<script lang="ts">
	import OpponentCardZones from './opponent-card-zones.svelte';
	import { CardZonePlaceType } from '../enums/card-zone-place-type.enum';
	import { drawCards } from '../services/draw-cards';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { ContextMenuItem } from '../types/context-menu-item.type';
	import ActivePlayerCardZones from './active-player-card-zones.svelte';
	import ExtraMonsterZones from './extra-monster-zones.svelte';

	export let cardFieldZone: CardFieldZoneType,
		aspectRatio: number,
		style: string = '',
		onCardDrop: () => void = () => {};

	const drawOneCardDisplayText = 'Draw one card';
	const drawFiveCardsDisplayText = 'Draw five cards';

	let activePlayerDeckMenuItems: ContextMenuItem[] = [
		{
			displayText: drawOneCardDisplayText,
			onClick: () => {
				cardFieldZone = drawCards(cardFieldZone, 1, CardZonePlaceType.ActivePlayer);
			}
		},
		{
			displayText: drawFiveCardsDisplayText,
			onClick: () => {
				cardFieldZone = drawCards(cardFieldZone, 5, CardZonePlaceType.ActivePlayer);
			}
		}
	];
	let opponentDeckMenuItems: ContextMenuItem[] = [
		{
			displayText: drawOneCardDisplayText,
			onClick: () => {
				cardFieldZone = drawCards(cardFieldZone, 1, CardZonePlaceType.Opponent);
			}
		},
		{
			displayText: drawFiveCardsDisplayText,
			onClick: () => {
				cardFieldZone = drawCards(cardFieldZone, 5, CardZonePlaceType.Opponent);
			}
		}
	];
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
		<ActivePlayerCardZones deckMenuItems={activePlayerDeckMenuItems} bind:cardFieldZone {onCardDrop} />
		<ExtraMonsterZones bind:cardFieldZone {onCardDrop} />
		<OpponentCardZones deckMenuItems={opponentDeckMenuItems} bind:cardFieldZone {onCardDrop} />
	</div>
</div>
