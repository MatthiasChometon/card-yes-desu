<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import { getContextMenuCardPositionItems } from '../services/get-context-menu-card-position-items';
	import { getContextMenuCardShuffleItems } from '../services/get-context-menu-card-shuffle-items';
	import type { ContextMenuCardItem } from '../types/context-menu-card-item.type';
	import type { PlayableCard } from '../types/playable-card.type';
	import type { DragAndDropHoverOrDropEvent } from '../types/drag-and-drop-hover-or-drop-event';
	import Card from './card.svelte';

	export let cards: PlayableCard[] = [],
		boxStyle: string = '',
		onSelectMenuItem: (card: PlayableCard, item: ContextMenuCardItem) => void = () => {};

	let cardMenuItems: ContextMenuCardItem[] = [
		...getContextMenuCardPositionItems(),
		...getContextMenuCardShuffleItems()
	];

	const handleDrop = ({ detail: { items } }: DragAndDropHoverOrDropEvent<PlayableCard[]>) => {
		cards = items;
	};
</script>

<div style="width: 100%; height: 100%; flex: 3; display: flex; {boxStyle}">
	<div
		style="width: 100%; height: 20%; display: flex; justify-content: center; position: absolute;"
		use:dndzone={{ items: cards, flipDurationMs: 150, dropTargetStyle: { background: 'rgba(0, 0, 0, 0.2)' } }}
		on:consider={handleDrop}
		on:finalize={handleDrop}
	>
		{#each cards as card (card.id)}
			<Card
				onSelectMenuItem={(card, item) => {
					const { updateCards } = item;
					if (updateCards !== null) cards = updateCards(cards, card);
					onSelectMenuItem(card, item);
				}}
				{card}
				{cardMenuItems}
				style="height: 100%; width: 9%; margin-left: 0.5%; margin-right: 0.5%; background-position: center;"
			/>
		{/each}
	</div>
</div>
