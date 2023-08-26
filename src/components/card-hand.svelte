<script lang="ts">
	import { getContextMenuCardPositionItems } from '../services/get-context-menu-card-position-items';
	import type { CardSize } from '../types/card-size.type';
	import type { ContextMenuCardItem } from '../types/context-menu-card-item.type';
	import type { PlayableCard } from '../types/playable-card.type';
	import CardZone from './card-zone.svelte';

	export let cards: PlayableCard[],
		cardSize: CardSize,
		boxStyle: string = '',
		cardZoneBoxStyle: string = '';

	let cardMenuItems: ContextMenuCardItem[] = getContextMenuCardPositionItems();

	$: aspectRatio = cardSize.width / cardSize.height;
</script>

<div style="display: flex; justify-content: center; {boxStyle}">
	<div style="position: absolute; display: flex; justify-content: center; {cardZoneBoxStyle}">
		{#each cards as card (card.id)}
			<CardZone
				{cardMenuItems}
				cards={[card]}
				superimposed
				style="height: 100%; width: auto; aspect-ratio: {aspectRatio}; margin-left: 2%; margin-right: 2%;"
				cardStyle="background-position: center;"
			/>
		{/each}
	</div>
</div>
