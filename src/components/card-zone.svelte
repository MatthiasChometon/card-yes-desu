<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import Card from './card.svelte';
	import type { PlayableCard } from '../types/playable-card.type';
	import type { GameCardState } from '../types/game-card-state.type';
	import type { ContextMenuCardItem } from '../types/context-menu-card-item.type';
	import { updateSubObject } from '../services/updateSubObject';
	import type { DragAndDropHoverOrDropEvent } from '../types/drag-and-drop-hover-or-drop-event';

	export let style: string = '',
		cards: PlayableCard[] = [],
		superimposed: boolean = false,
		gameCardState: GameCardState | null = null,
		cardMenuItems: ContextMenuCardItem[],
		cardStyle: string = '',
		onSelectMenuItem: (card: PlayableCard, item: ContextMenuCardItem) => void = () => {};

	let dropTargetStyle = { background: 'rgba(0, 0, 0, 0.2)' };

	const handleDrop = ({ detail: { items } }: DragAndDropHoverOrDropEvent<PlayableCard[]>) => (cards = items);
	const getMarginLeft = (index: number): string => (superimposed ? '0' : `${index * 12}px`);
	const getCard = (card: PlayableCard): PlayableCard =>
		gameCardState === null ? card : updateSubObject(card, 'gameState', gameCardState);
</script>

<div
	style="width: 8.2%; height: 95%; display: flex; position: relative; {style}"
	use:dndzone={{ items: cards, flipDurationMs: 150, dropTargetStyle }}
	on:consider={handleDrop}
	on:finalize={handleDrop}
>
	{#each cards as card, index (card.id)}
		<Card
			onSelectMenuItem={(card, item) => {
				const { updateCards } = item;
				if (updateCards !== null) cards = updateCards(cards, card);
				onSelectMenuItem(card, item);
			}}
			{cardMenuItems}
			card={getCard(card)}
			style="position: absolute; height: 100%; width: 100%; margin-left: {getMarginLeft(index)}; {cardStyle}"
		/>
	{/each}
</div>
