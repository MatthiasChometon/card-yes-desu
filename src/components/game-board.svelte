<script lang="ts">
	import CardZone from '../components/card-zone.svelte';
	import { getContextMenuCardPositionItems } from '../services/get-context-menu-card-position-items';
	import type { ContextMenuCardItem } from '../types/context-menu-card-item.type';
	import type { PlayableCard } from '../types/playable-card.type';

	export let cards: PlayableCard[],
		cardRatio: number,
		style: string = '';

	let cardMenuItems: ContextMenuCardItem[] = getContextMenuCardPositionItems();
</script>

<div
	style="aspect-ratio: {cardRatio}; width: 100%; height: 100%; position: relative; display: flex; align-items: center; flex-direction: column; {style}"
>
	<img
		style="aspect-ratio: {cardRatio}; height: 100%; position: absolute; z-index: -1;"
		src="yugioh-field.webp"
		alt="yugioh field"
	/>
	<div style="aspect-ratio: {cardRatio}; height: 100%; display: flex; flex-direction: column;">
		<div style="flex: 1; display: flex; width: 100%; margin-top: 1.7%;">
			<CardZone
				{cardMenuItems}
				superimposed
				gameCardState={{ faceUp: false, rotation: 0 }}
				{cards}
				style="margin-left: 2.1%;"
			/>
			<CardZone {cardMenuItems} style="margin-left: 12.2%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.4%;" />
			<CardZone
				{cardMenuItems}
				superimposed
				gameCardState={{ faceUp: false, rotation: 0 }}
				style="margin-left: 12.2%;"
			/>
		</div>
		<div style="flex: 1; display: flex; width: 100%;">
			<CardZone {cardMenuItems} superimposed style="margin-left: 2.1%;" />
			<CardZone {cardMenuItems} superimposed style="margin-left: 1.8%;" />
			<CardZone {cardMenuItems} style="margin-left: 2.2%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.4%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.4%;" />
			<CardZone {cardMenuItems} superimposed style="margin-left: 2.5%;" />
			<CardZone {cardMenuItems} style="margin-left: 1.6%;" />
		</div>
		<div style="flex: 1; display: flex; width: 100%;">
			<CardZone {cardMenuItems} style="margin-left: 34.4%; margin-top: 0.2%;" />
			<CardZone {cardMenuItems} style="margin-left: 15.2%; margin-top: 0.2%;" />
		</div>
		<div style="flex: 1; display: flex; width: 100%;">
			<CardZone {cardMenuItems} style="margin-left: 2.3%;" />
			<CardZone {cardMenuItems} superimposed style="margin-left: 1.6%;" />
			<CardZone {cardMenuItems} style="margin-left: 2.4%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.4%;" />
			<CardZone {cardMenuItems} superimposed style="margin-left: 2.4%;" />
			<CardZone {cardMenuItems} superimposed style="margin-left: 1.6%;" />
		</div>
		<div style="flex: 1; display: flex; width: 100%; margin-bottom: 1%;">
			<CardZone
				{cardMenuItems}
				superimposed
				gameCardState={{ faceUp: false, rotation: 0 }}
				style="margin-left: 2.3%;"
			/>
			<CardZone {cardMenuItems} style="margin-left: 12.2%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone {cardMenuItems} style="margin-left: 3.4%;" />
			<CardZone
				{cardMenuItems}
				superimposed
				gameCardState={{ faceUp: false, rotation: 0 }}
				style="margin-left: 12.2%;"
			/>
		</div>
	</div>
</div>
