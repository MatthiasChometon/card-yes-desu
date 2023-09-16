<script lang="ts">
	import type { ContextMenuItem } from '../types/context-menu-item.type';
	import { shuffle } from '../services/shuffle-cards';
	import CardZone from './card-zone.svelte';
	import type { PlayableCard } from '../types/playable-card.type';

	export let cards: PlayableCard[] = [],
		boxStyle: string = '',
		onCardDrop: () => void,
		onCardChangingPosition: () => void;

	const menuItems: ContextMenuItem[] = [
		{
			displayText: 'Shuffle hand',
			onClick: () => {
				cards = shuffle(cards);
			}
		}
	];
</script>

<div style="width: 100%; height: 100%; flex: 3; display: flex; {boxStyle}">
	<CardZone
		{onCardChangingPosition}
		{menuItems}
		bind:cards
		{onCardDrop}
		style="width: 100%; height: 20%; display: flex; justify-content: center; position: absolute;"
		cardStyle="height: 100%; width: 9%; margin-left: 0.5%; margin-right: 0.5%; background-position: center; position: relative;"
	/>
</div>
