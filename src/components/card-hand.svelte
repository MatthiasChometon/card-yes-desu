<script lang="ts">
	import { getContextMenuCardPositionItems } from '../services/get-context-menu-card-position-items';
	import { getContextMenuCardShuffleItems } from '../services/get-context-menu-card-shuffle-items';
	import type { CardSize } from '../types/card-size.type';
	import type { ContextMenuCardItem } from '../types/context-menu-card-item.type';
	import type { PlayableCard } from '../types/playable-card.type';
	import CardZone from './card-zone.svelte';

	export let cards: PlayableCard[][] = [],
		cardSize: CardSize,
		boxStyle: string = '',
		cardZoneBoxStyle: string = '',
		onSelectMenuItem: (card: PlayableCard, item: ContextMenuCardItem) => void = () => {};

	let cardMenuItems: ContextMenuCardItem[] = [
		...getContextMenuCardPositionItems(),
		...getContextMenuCardShuffleItems()
	];

	$: aspectRatio = cardSize.width / cardSize.height;
</script>

<div style="display: flex; justify-content: center; {boxStyle}">
	<div style="position: absolute; display: flex; justify-content: center; {cardZoneBoxStyle}">
		{#each cards as _cardZone, index}
			<CardZone
				{cardMenuItems}
				bind:cards={cards[index]}
				onSelectMenuItem={(card, item) => {
					const { updateCardZones } = item;
					if (updateCardZones !== null) cards = updateCardZones(cards);
					onSelectMenuItem(card, item);
				}}
				superimposed
				style="height: 100%; width: auto; aspect-ratio: {aspectRatio}; margin-left: 2%; margin-right: 2%;"
				cardStyle="background-position: center;"
			/>
		{/each}
	</div>
</div>
