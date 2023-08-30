<script lang="ts">
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { ContextMenuCardItem } from '../types/context-menu-card-item.type';
	import type { PlayableCard } from '../types/playable-card.type';
	import ActivePlayerCardZones from './active-player-card-zones.svelte';
	import ExtraMonsterZones from './extra-monster-zones.svelte';
	import OpponentCardZones from './opponent-card-zones.svelte';

	export let cardFieldZone: CardFieldZoneType,
		cardRatio: number,
		style: string = '';
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
		<ActivePlayerCardZones bind:cardFieldZone />
		<ExtraMonsterZones bind:cardFieldZone />
		<OpponentCardZones bind:cardFieldZone />
	</div>
</div>
