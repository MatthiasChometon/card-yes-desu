<script lang="ts">
	import { onMount } from 'svelte';
	import GameBoard from '../components/game-board.svelte';
	import { getDefaultCardFieldZone } from '../services/get-default-card-field-zone';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { CardSize } from '../types/card-size.type';
	import type { PlayableCard } from '../types/playable-card.type';
	import CardHandZone from '../components/card-hand-zone.svelte';

	const cardSize: CardSize = { height: 13.6, width: 9 };
	const cardRatio: number = cardSize.height / cardSize.width;
	const gameState = {
		rotation: 0,
		faceUp: true
	};

	const cardsExamples: PlayableCard[] = [
		{
			id: '1',
			frontPicture: 'https://m.media-amazon.com/images/I/51N+J-WhXCL._AC_UF894,1000_QL80_.jpg',
			backPicture: 'back-card.png',
			gameState
		},
		{
			id: '2',
			frontPicture:
				'https://images.saymedia-content.com/.image/t_share/MTc0NDYwODIxMDE4MTI1Njcy/top-10-strongest-yu-gi-oh-flip-effect-monsters.png',
			backPicture: 'back-card.png',
			gameState
		},
		{
			id: '3',
			frontPicture: 'https://m.media-amazon.com/images/I/51WGL9K+AQL._AC_UF894,1000_QL80_.jpg',
			backPicture: 'back-card.png',
			gameState
		},
		{
			id: '42',
			frontPicture: 'https://www.goatformat.com/uploads/1/1/9/9/119901143/magicianoffaith-sdcl-en-c-1e_orig.png',
			backPicture: 'back-card.png',
			gameState
		},
		{
			id: '22',
			frontPicture:
				'https://images.saymedia-content.com/.image/t_share/MTc0NDYwODIxMDE4MTI1Njcy/top-10-strongest-yu-gi-oh-flip-effect-monsters.png',
			backPicture: 'back-card.png',
			gameState
		},
		{
			id: '312',
			frontPicture: 'https://m.media-amazon.com/images/I/51WGL9K+AQL._AC_UF894,1000_QL80_.jpg',
			backPicture: 'back-card.png',
			gameState
		},
		{
			id: '42222',
			frontPicture: 'https://www.goatformat.com/uploads/1/1/9/9/119901143/magicianoffaith-sdcl-en-c-1e_orig.png',
			backPicture: 'back-card.png',
			gameState
		}
	];
	let fieldCards: CardFieldZoneType = getDefaultCardFieldZone();

	function setTestCards() {
		fieldCards = {
			...fieldCards,
			ActivePlayer: { ...fieldCards.ActivePlayer, Hand: cardsExamples }
		};
	}

	onMount(() => {
		setTestCards();
	});
</script>

<div style="height: 100vh; width: 100vw; display: flex; justify-content: flex-end;">
	<div style="flex: 6;">
		<button
			on:click={() => {
				fieldCards = getDefaultCardFieldZone();
				setTestCards();
			}}>Reset</button
		>
	</div>
	<div style="flex: 8; display: flex; justify-content: flex-end; flex-direction: column; position: relative;">
		<CardHandZone boxStyle="align-items: flex-start;" bind:cards={fieldCards.ActivePlayer.Hand} />
		<GameBoard {cardRatio} bind:cardFieldZone={fieldCards} style="flex: 12;" />
		<CardHandZone boxStyle="align-items: flex-end;" bind:cards={fieldCards.Opponent.Hand} />
	</div>
</div>
