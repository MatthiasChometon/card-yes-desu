<script lang="ts">
	import { onMount } from 'svelte';
	import CardHand from '../components/card-hand.svelte';
	import GameBoard from '../components/game-board.svelte';
	import { getDefaultCardFieldZone } from '../services/get-default-card-field-zone';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { CardSize } from '../types/card-size.type';
	import type { PlayableCard } from '../types/playable-card.type';

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
			id: '4',
			frontPicture: 'https://www.goatformat.com/uploads/1/1/9/9/119901143/magicianoffaith-sdcl-en-c-1e_orig.png',
			backPicture: 'back-card.png',
			gameState
		}
	];
	let fieldCards: CardFieldZoneType = getDefaultCardFieldZone();

	function setTestCards() {
		const newHand: PlayableCard[][] = cardsExamples.map((card) => {
			return [card];
		});
		fieldCards = { ...fieldCards, ActivePlayer: { ...fieldCards.ActivePlayer, Hand: newHand } };
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
		<CardHand
			bind:cards={fieldCards.ActivePlayer.Hand}
			{cardSize}
			boxStyle="flex: 2; align-items: flex-start;"
			cardZoneBoxStyle="height: 16%;"
		/>
		<GameBoard {cardRatio} cardFieldZone={fieldCards} style="flex: 12;" />
		<CardHand
			cards={fieldCards.Opponent.Hand}
			{cardSize}
			boxStyle="flex: 2; align-items: flex-end;"
			cardZoneBoxStyle="height: 16%;"
		/>
	</div>
</div>
