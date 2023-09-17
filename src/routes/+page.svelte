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
	import { CardZoneType } from '../enums/card-zone-type.enum';
	import type { PlayerCardZoneType } from '../types/player-card-zone.type';

	const cardSize: CardSize = { height: 13.6, width: 9 };
	const cardRatio: number = cardSize.height / cardSize.width;
	let fieldCards: CardFieldZoneType = getDefaultCardFieldZone();
	let playersConnection = PlayersConnection<PlayersConnectionSendedDataType>(onDataReceived);
	let opponentCardIdsRevealed: string[] = [];
	let opponentHandRevealed: boolean = false;

	function onDataReceived(data: PlayersConnectionSendedDataType) {
		const { fieldCards: updatedFieldCards, cardToReveal, revealHand, hideHand } = data;
		if (updatedFieldCards !== null) onFieldCardsDataReceived(updatedFieldCards);
		if (cardToReveal !== null) opponentCardIdsRevealed = [...opponentCardIdsRevealed, cardToReveal.id];
		if (revealHand !== null) opponentHandRevealed = true;
		if (hideHand !== null) {
			opponentHandRevealed = false;
			opponentCardIdsRevealed = [];
		}
	}

	function keepCardLocalGameState(onlineCards: PlayableCard[], localCards: PlayableCard[]) {
		return onlineCards.map((card) => {
			const localCardFounded = localCards.find((localCard) => localCard.id === card.id);
			if (localCardFounded === undefined) return card;
			return { ...card, gameState: { ...card.gameState, ...localCardFounded.gameState } };
		});
	}

	function keepCardZonePlaceLocalGameState(
		cardZonePlaceType: CardZonePlaceType.HostPlayer | CardZonePlaceType.InvitedPlayer,
		updatedFieldCards: CardFieldZoneType
	): CardFieldZoneType {
		return {
			...updatedFieldCards,
			[cardZonePlaceType]: {
				[CardZoneType.Hand]: keepCardLocalGameState(
					updatedFieldCards[cardZonePlaceType][CardZoneType.Hand],
					fieldCards[cardZonePlaceType][CardZoneType.Hand]
				)
			}
		};
	}

	function onFieldCardsDataReceived(updatedFieldCards: CardFieldZoneType) {
		fieldCards = {
			...updatedFieldCards,
			...keepCardZonePlaceLocalGameState(CardZonePlaceType.HostPlayer, updatedFieldCards),
			...keepCardZonePlaceLocalGameState(CardZonePlaceType.InvitedPlayer, updatedFieldCards)
		};
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
			const faceUp = opponentCardIdsRevealed.includes(card.id);
			return { ...card, gameState: { faceUp, rotation: 0 } };
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
		let newField = {
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
			newField = {
				...newField,
				[opponentCardZonePlaceType]: {
					...newField[opponentCardZonePlaceType],
					Hand: hideOpponentHand(newField[opponentCardZonePlaceType].Hand)
				}
			};
		}

		fieldCards = newField;
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
