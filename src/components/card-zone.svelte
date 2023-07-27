<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import Card from './card.svelte';
	import type { CardType } from '../types/card.type';

	export let style: string = '',
		cards: CardType[] = [];

	let dropTargetStyle = {
		background: 'rgba(0, 0, 0, 0.2)'
	};

	const handleDrop = (e: { detail: { items: CardType[] } }) => (cards = e.detail.items);
</script>

<div
	style="width: 8.2%; height: 95%; display: flex; position: relative; {style}"
	use:dndzone={{ items: cards, flipDurationMs: 150, dropTargetStyle }}
	on:consider={handleDrop}
	on:finalize={handleDrop}
>
	{#each cards as card, index (card.id)}
		<Card {card} style="position: absolute; height: 100%; width: 100%; margin-left: calc({index}% * 12);" />
	{/each}
</div>
