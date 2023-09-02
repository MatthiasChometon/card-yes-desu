<script lang="ts">
	import HandZone from './hand-zone.svelte';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import GameBoardZones from './game-board-zones.svelte';

	export let style = '',
		fieldCards: CardFieldZoneType,
		aspectRatio: number;
</script>

<div style="display: flex; justify-content: flex-end; flex-direction: column; position: relative; {style}">
	<HandZone boxStyle="align-items: flex-start;" bind:cards={fieldCards.ActivePlayer.Hand} />
	<GameBoardZones {aspectRatio} bind:cardFieldZone={fieldCards} style="flex: 12;" />
	<HandZone boxStyle="align-items: flex-end;" bind:cards={fieldCards.Opponent.Hand} />
</div>
