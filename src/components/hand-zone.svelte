<script lang="ts">
	import type { ContextMenuItem } from '../types/context-menu-item.type';
	import { shuffle } from '../services/shuffle-cards';
	import CardZone from './card-zone.svelte';
	import type { PlayableCard } from '../types/playable-card.type';

	export let cards: PlayableCard[] = [],
		boxStyle: string = '',
		hasCardListModal: boolean = true,
		onCardDrop: () => void,
		onCardChangingPosition: () => void,
		onShuffleCard: () => void,
		onCardReveal: (card: PlayableCard) => void,
		onHideHand: () => void,
		onHandReveal: () => void;

	let cardClicked: PlayableCard | null = null;

	const menuItems: ContextMenuItem[] = [
		{
			displayText: 'Shuffle hand',
			onClick: () => {
				cards = shuffle(cards);
				onShuffleCard();
			}
		},
		{
			displayText: 'Hide hand',
			onClick: () => {
				onHideHand();
			}
		},
		{
			displayText: 'Reveal hand',
			onClick: () => {
				onHandReveal();
			}
		},
		{
			displayText: 'Reveal card',
			onClick: () => {
				if (cardClicked === null) throw new Error("cardClicked can't be null");
				onCardReveal(cardClicked);
			}
		}
	];
</script>

<div style="width: 100%; height: 100%; flex: 3; display: flex; {boxStyle}">
	<CardZone
		{hasCardListModal}
		modalGameMenuStyle="top: auto;"
		bind:cardClicked
		{onCardChangingPosition}
		{menuItems}
		bind:cards
		{onCardDrop}
		style="width: 100%; height: 20%; display: flex; justify-content: center; position: absolute;"
		cardStyle="height: 100%; width: 9%; margin-left: 0.5%; margin-right: 0.5%; background-position: center; position: relative;"
	/>
</div>
