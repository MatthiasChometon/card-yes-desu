<script lang="ts">
	import type { DragAndDropHoverOrDropEvent } from '../../types/drag-and-drop-hover-or-drop-event';
	import type { PlayableCard } from '../../types/playable-card.type';
	import CardZone from '../card-zone.svelte';

	export let cards: PlayableCard[] = [],
		cardStyle: string = '',
		cardZoneStyle: string = '',
		cardZoneContainerStyle: string = '',
		handleCardConsider: ((event: DragAndDropHoverOrDropEvent<PlayableCard[]>) => void) | null = null,
		onCardDrop: () => void = () => {},
		dragDisabled: boolean = false;
</script>

<div style="width: 100%; background-color: rgba(0, 0, 0, 0.2); overflow-y: scroll; {cardZoneContainerStyle}">
	<CardZone
		style="height: 100%; width: 100%; display: flex; flex-wrap: wrap; align-content: flex-start; {cardZoneStyle}"
		cardStyle="position: relative; margin-left: 0; box-sizing: border-box; height: auto; aspect-ratio: 0.69; {cardStyle}"
		bind:cards
		{dragDisabled}
		{onCardDrop}
		customHandleConsider={handleCardConsider}
	/>
</div>
