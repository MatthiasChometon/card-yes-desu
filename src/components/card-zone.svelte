<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import Card from './card.svelte';
	import type { PlayableCard } from '../types/playable-card.type';
	import type { GameCardState } from '../types/game-card-state.type';

	export let style: string = '',
		cards: PlayableCard[] = [],
		superimposed: boolean = false,
		gameCardState: GameCardState | null = null,
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
</script>

<div
	style="width: 8.2%; height: 95%; display: flex; position: relative; {style}"
	use:dndzone={{ items: cards, flipDurationMs: 150, dropTargetStyle }}
	on:consider={handleDrop}
	on:finalize={handleDrop}
>
	{#each cards as card, index (card.id)}
		<Card
			card={getCard(card)}
			style="position: absolute; height: 100%; width: 100%; margin-left: {getMarginLeft(index)}; {cardStyle}"
		/>
	{/each}
</div>
