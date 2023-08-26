<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import Card from './card.svelte';
	import type { PlayableCard } from '../types/playable-card.type';
	import type { GameCardState } from '../types/game-card-state.type';
	import type { ContextMenuCardItem } from '../types/context-menu-card-item.type';
	import { updateObjectInArrayById } from '../services/updateObjectInArrayById';
	import { updateSubObject } from '../services/updateSubObject';

	export let style: string = '',
		cards: PlayableCard[] = [],
		superimposed: boolean = false,
		gameCardState: GameCardState | null = null,
		cardMenuItems: ContextMenuCardItem[],
		cardStyle: string = '';

	let dropTargetStyle = {
		background: 'rgba(0, 0, 0, 0.2)'
	};

	const handleDrop = (e: { detail: { items: PlayableCard[] } }) => (cards = e.detail.items);

	function getMarginLeft(index: number): string {
		return superimposed ? '0' : `${index * 12}px`;
	}

	function getCard(card: PlayableCard): PlayableCard {
		if (gameCardState === null) return card;

		return { ...card, gameState: { ...card.gameState, ...gameCardState } };
	}

	function onCardClick(card: PlayableCard, { cardState }: ContextMenuCardItem): void {
		const cardUpdated = updateSubObject(card, 'gameState', cardState);
		cards = updateObjectInArrayById(cards, cardUpdated);
	}
</script>

<div
	style="width: 8.2%; height: 95%; display: flex; position: relative; {style}"
	use:dndzone={{ items: cards, flipDurationMs: 150, dropTargetStyle }}
	on:consider={handleDrop}
	on:finalize={handleDrop}
>
	{#each cards as card, index (card.id)}
		<Card
			{onCardClick}
			{cardMenuItems}
			card={getCard(card)}
			style="position: absolute; height: 100%; width: 100%; margin-left: {getMarginLeft(index)}; {cardStyle}"
		/>
	{/each}
</div>
