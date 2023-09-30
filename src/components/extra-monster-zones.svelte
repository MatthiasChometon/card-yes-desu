<script lang="ts">
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import CardZone from './card-zone.svelte';

	export let cardFieldZone: CardFieldZoneType,
		onCardDrop: () => void,
		onCardChangingPosition: () => void,
		leftZoneIndex: number,
		rightZoneIndex: number;
</script>

<div style="flex: 1; display: flex; width: 100%;">
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone.ExtraMonsterZone[leftZoneIndex]}
		style="margin-left: 34.4%; margin-top: 0.2%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone.ExtraMonsterZone[rightZoneIndex]}
		style="margin-left: 15.2%; margin-top: 0.2%;"
	/>
</div>
