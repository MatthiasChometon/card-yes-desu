<script lang="ts">
	import type { CardSizeType } from '../types/card-size.type';
	import type { CardType } from '../types/card.type';
	import CardZone from './card-zone.svelte';

	export let cards: CardType[],
		cardSize: CardSizeType,
		boxStyle: string = '',
		cardZoneBoxStyle: string = '';
	const { height, width } = cardSize;
</script>

<div style="display: flex; justify-content: center; {boxStyle}">
	<div style="position: absolute; display: flex; justify-content: center; {cardZoneBoxStyle}">
		{#each cards as card (card.id)}
			<CardZone
				cards={[card]}
				superimposed
				style="height: 100%; width: auto; aspect-ratio: {width / height}; margin-left: 2%; margin-right: 2%;"
				cardStyle="background-position: center;"
			/>
		{/each}
	</div>
</div>
