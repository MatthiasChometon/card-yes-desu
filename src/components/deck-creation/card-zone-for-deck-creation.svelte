<script lang="ts">
	import type { ContextMenuItem } from '../../types/context-menu-item.type';
	import type { DragAndDropHoverOrDropEvent } from '../../types/drag-and-drop-hover-or-drop-event';
	import type { PlayableCard } from '../../types/playable-card.type';
	import CardZone from '../card-zone.svelte';

	export let cards: PlayableCard[] = [],
		cardStyle: string = '',
		cardZoneStyle: string = '',
		cardZoneContainerStyle: string = '',
		handleCardConsider: ((event: DragAndDropHoverOrDropEvent<PlayableCard[]>) => void) | null = null,
		onCardDrop: () => void = () => {},
		onScroll: (event: UIEvent) => void = () => {},
		noModalGameMenu: boolean = true,
		menuItems: ContextMenuItem[] = [],
		cardClicked: PlayableCard | null = null,
		dragDisabled: boolean = false;
</script>

<div on:scroll={onScroll} style="width: 100%; {cardZoneContainerStyle}">
	<CardZone
		style="height: 100%; width: 100%; display: flex; flex-wrap: wrap; align-content: flex-start; {cardZoneStyle}"
		cardStyle="position: relative; margin-left: 0; box-sizing: border-box; height: auto; aspect-ratio: 0.69; {cardStyle}"
		{menuItems}
		bind:cardClicked
		bind:cards
		canChangePosition={false}
		{noModalGameMenu}
		{dragDisabled}
		{onCardDrop}
		customHandleConsider={handleCardConsider}
	/>
</div>
