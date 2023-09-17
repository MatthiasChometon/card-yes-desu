<script lang="ts">
	import { onMount } from 'svelte';
	import GameInformation from '../components/game-information.svelte';
	import { getDefaultCardFieldZone } from '../services/get-default-card-field-zone';
	import { PlayersConnection } from '../store/players-connection.store';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { CardSize } from '../types/card-size.type';
	import { CardZonePlaceType } from '../enums/card-zone-place-type.enum';
	import GameZones from '../components/game-zones.svelte';
	import type { PlayableCard } from '../types/playable-card.type';
	import type { PlayersConnectionSendedDataType } from '../types/players-connection-sended-data.type';

	const cardSize: CardSize = { height: 13.6, width: 9 };
	const cardRatio: number = cardSize.height / cardSize.width;

	let fieldCards: CardFieldZoneType = getDefaultCardFieldZone();
	let playersConnection = PlayersConnection<PlayersConnectionSendedDataType>(onDataReceived);
	let opponentCardRevealed: PlayableCard | null = null;
	let opponentHandRevealed: boolean = false;

	function onDataReceived(data: PlayersConnectionSendedDataType) {
		const { fieldCards: updatedFieldCards, cardToReveal, revealHand, hideHand } = data;
		if (updatedFieldCards !== null) fieldCards = updatedFieldCards;
		if (cardToReveal !== null) opponentCardRevealed = cardToReveal;
		if (revealHand !== null) opponentHandRevealed = true;
		if (hideHand !== null) {
			opponentHandRevealed = false;
			opponentCardRevealed = null;
		}
	}

	function updateOpponentFieldBoard() {
		playersConnection.sendData({ fieldCards, cardToReveal: null, revealHand: null, hideHand: null });
	}

	function onHideHand(): void {
		playersConnection.sendData({ fieldCards, cardToReveal: null, revealHand: false, hideHand: null });
	}

	function onHandReveal(): void {
		playersConnection.sendData({ fieldCards, cardToReveal: null, revealHand: true, hideHand: null });
	}

	function onCardReveal(card: PlayableCard): void {
		playersConnection.sendData({ fieldCards, cardToReveal: card, revealHand: null, hideHand: null });
	}

	onMount(async () => {
		await playersConnection.createNewGame();
	});

	function hideCards(cards: PlayableCard[]): PlayableCard[] {
		return cards.map((card) => ({ ...card, gameState: { faceUp: false, rotation: 0 } }));
	}

	function hideOpponentHand(cards: PlayableCard[]): PlayableCard[] {
		if (opponentHandRevealed) return cards;

		const cardsWithHiddenCards = cards.map((card) => {
			if (card === opponentCardRevealed) return { ...card, gameState: { faceUp: true, rotation: 0 } };
			return { ...card, gameState: { faceUp: false, rotation: 0 } };
		});

		return cardsWithHiddenCards;
	}

	let opponentCardZonePlaceType: CardZonePlaceType.HostPlayer | CardZonePlaceType.InvitedPlayer | null = null;

	$: {
		opponentCardZonePlaceType = !$playersConnection.isHost
			? CardZonePlaceType.HostPlayer
			: CardZonePlaceType.InvitedPlayer;
	}

	$: {
		const fieldCardsWithHiddenCards = {
			...fieldCards,
			HostPlayer: {
				...fieldCards.HostPlayer,
				Deck: hideCards(fieldCards.HostPlayer.Deck),
				ExtraDeck: hideCards(fieldCards.HostPlayer.ExtraDeck)
			},
			InvitedPlayer: {
				...fieldCards.InvitedPlayer,
				Deck: hideCards(fieldCards.InvitedPlayer.Deck),
				ExtraDeck: hideCards(fieldCards.InvitedPlayer.ExtraDeck)
			}
		};

		if (opponentCardZonePlaceType !== null) {
			fieldCards = {
				...fieldCardsWithHiddenCards,
				[opponentCardZonePlaceType]: {
					...fieldCardsWithHiddenCards[opponentCardZonePlaceType],
					Hand: hideOpponentHand(fieldCardsWithHiddenCards[opponentCardZonePlaceType].Hand)
				}
			};
		}
	}

	$: {
		const opponent = !$playersConnection.isHost ? CardZonePlaceType.HostPlayer : CardZonePlaceType.InvitedPlayer;
		fieldCards[opponent].Hand = fieldCards[opponent].Hand.map((card) => {
			return { ...card, gameState: { faceUp: false, rotation: 0 } };
		});
	}
</script>

<div style="height: 100vh; width: 100vw; display: flex; justify-content: flex-end;">
	<GameInformation
		bind:playersConnection={$playersConnection}
		connectToCreatedGame={playersConnection.connectToCreatedGame}
		style="flex: 6;"
		bind:fieldCards
	/>
	{#if $playersConnection.isHost !== null}
		<GameZones
			{onHideHand}
			{onHandReveal}
			{onCardReveal}
			onCardDraw={updateOpponentFieldBoard}
			onShuffleDeck={updateOpponentFieldBoard}
			onShuffleCard={updateOpponentFieldBoard}
			onCardChangingPosition={updateOpponentFieldBoard}
			onCardDrop={updateOpponentFieldBoard}
			opponentCardZonePlaceType={!$playersConnection.isHost
				? CardZonePlaceType.HostPlayer
				: CardZonePlaceType.InvitedPlayer}
			activePlayerCardZonePlaceType={$playersConnection.isHost
				? CardZonePlaceType.HostPlayer
				: CardZonePlaceType.InvitedPlayer}
			extraMonsterZonesLeftZoneIndex={$playersConnection.isHost ? 0 : 1}
			extraMonsterZonesRightZoneIndex={$playersConnection.isHost ? 1 : 0}
			aspectRatio={cardRatio}
			style="flex: 8;"
			bind:fieldCards
		/>
	{/if}
</div>
