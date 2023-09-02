<script lang="ts">
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import CardZone from './card-zone.svelte';

	export let cardFieldZone: CardFieldZoneType;
</script>

<div style="flex: 1; display: flex; width: 100%;">
	<CardZone bind:cards={cardFieldZone.ExtraMonsterZone[0]} style="margin-left: 34.4%; margin-top: 0.2%;" />
	<CardZone bind:cards={cardFieldZone.ExtraMonsterZone[1]} style="margin-left: 15.2%; margin-top: 0.2%;" />
</div>
