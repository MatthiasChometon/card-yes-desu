<script lang="ts">
	import ActivePlayerCardZones from './active-player-card-zones.svelte';
	import ExtraMonsterZones from './extra-monster-zones.svelte';
	import OpponentCardZones from './opponent-card-zones.svelte';
	import { CardZonePlaceType } from '../enums/card-zone-place-type.enum';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { ContextMenuItem } from '../types/context-menu-item.type';
	import { drawCards } from '../services/draw-cards';

	export let cardFieldZone: CardFieldZoneType,
		cardRatio: number,
		style: string = '';

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
	style="aspect-ratio: {cardRatio}; width: 100%; height: 100%; position: relative; display: flex; align-items: center; flex-direction: column; {style}"
>
	<img
		style="aspect-ratio: {cardRatio}; height: 100%; position: absolute; z-index: -1;"
		src="yugioh-field.webp"
		alt="yugioh field"
	/>
	<div style="aspect-ratio: {cardRatio}; height: 100%; display: flex; flex-direction: column;">
		<ActivePlayerCardZones deckMenuItems={activePlayerDeckMenuItems} bind:cardFieldZone />
		<ExtraMonsterZones bind:cardFieldZone />
		<OpponentCardZones deckMenuItems={opponentDeckMenuItems} bind:cardFieldZone />
	</div>
</div>
