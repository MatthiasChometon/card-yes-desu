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
	import { onFieldCardsDataReceived } from '../services/on-field-cards-data-received';
	import { currentCardHover } from '../store/current-card-hover.store';
	import { playerDecks } from '../store/player-decks.store';
	import type { DeckType } from '../types/deck.type';
	import { hideCards } from '../services/hide-playable-cards';
	import { setInitialDeckList } from '../services/set-initial-deck-list';
	import { notification } from '../store/notification.store';

	const cardSize: CardSize = { height: 13.6, width: 9 };
	const cardRatio: number = cardSize.height / cardSize.width;
	let fieldCards: CardFieldZoneType = getDefaultCardFieldZone();
	let playersConnection = PlayersConnection<PlayersConnectionSendedDataType>(onDataReceived, onOpenConnection);
	let opponentCardIdsRevealed: string[] = [];
	let opponentHandRevealed: boolean = false;
	let opponentCardZonePlaceType: CardZonePlaceType.HostPlayer | CardZonePlaceType.InvitedPlayer | null = null;
	let activePlayerCardZonePlaceType: CardZonePlaceType.HostPlayer | CardZonePlaceType.InvitedPlayer | null = null;
	let deck: DeckType | null = null;

	currentCardHover.set(null);

	$: {
		if ($playersConnection.isHost === null) {
			opponentCardZonePlaceType = null;
			activePlayerCardZonePlaceType = null;
		}

		if ($playersConnection.isHost !== null) {
			opponentCardZonePlaceType = !$playersConnection.isHost
				? CardZonePlaceType.HostPlayer
				: CardZonePlaceType.InvitedPlayer;
			activePlayerCardZonePlaceType = $playersConnection.isHost
				? CardZonePlaceType.HostPlayer
				: CardZonePlaceType.InvitedPlayer;
		}
	}

	function onDataReceived(data: PlayersConnectionSendedDataType) {
		const { fieldCards: updatedFieldCards, cardToReveal, revealHand, initialOpponentDeck } = data;
		if (initialOpponentDeck !== null) {
			if (deck === null || activePlayerCardZonePlaceType === null || opponentCardZonePlaceType === null) {
				throw new Error('Deck is null');
			}
			const newFieldCards = setInitialDeckList(fieldCards, initialOpponentDeck, opponentCardZonePlaceType);
			fieldCards = setInitialDeckList(newFieldCards, deck, activePlayerCardZonePlaceType);
			return;
		}
		if (updatedFieldCards !== null) fieldCards = onFieldCardsDataReceived(fieldCards, updatedFieldCards);
		if (cardToReveal !== null) opponentCardIdsRevealed = [...opponentCardIdsRevealed, cardToReveal.id];
		if (revealHand === null) return;
		if (!revealHand) {
			opponentHandRevealed = false;
			opponentCardIdsRevealed = [];
		} else {
			opponentHandRevealed = true;
		}
	}

	function onOpenConnection(): void {
		if (deck === null) throw new Error('Deck is null');
		playersConnection.sendData({ fieldCards: null, cardToReveal: null, revealHand: null, initialOpponentDeck: deck });
	}

	function updateOpponentFieldBoard() {
		playersConnection.sendData({ fieldCards, cardToReveal: null, revealHand: null, initialOpponentDeck: null });
	}

	function onHideHand(): void {
		playersConnection.sendData({ fieldCards, cardToReveal: null, revealHand: false, initialOpponentDeck: null });
	}

	function onHandReveal(): void {
		playersConnection.sendData({ fieldCards, cardToReveal: null, revealHand: true, initialOpponentDeck: null });
	}

	function onCardReveal(card: PlayableCard): void {
		playersConnection.sendData({ fieldCards, cardToReveal: card, revealHand: null, initialOpponentDeck: null });
	}

	async function createYourGame(): Promise<void> {
		if (deck === null) {
			notification.set({ text: 'You need to select a deck', isVisible: true });
			return;
		}
		await playersConnection.createNewGame();
	}

	function connectToCreatedGame(): void {
		if (deck === null) {
			notification.set({ text: 'You need to select a deck', isVisible: true });
			return;
		}
		playersConnection.connectToCreatedGame();
	}

	function hideOpponentHand(cards: PlayableCard[]): PlayableCard[] {
		const cardsWithHiddenCards = cards.map((card) => {
			if (opponentHandRevealed) return { ...card, gameState: { faceUp: true, rotation: 0 } };
			const faceUp = opponentCardIdsRevealed.includes(card.id);
			return { ...card, gameState: { faceUp, rotation: 0 } };
		});

		return cardsWithHiddenCards;
	}

	$: {
		let newField = {
			...fieldCards,
			HostPlayer: {
				...fieldCards.HostPlayer,
				Deck: hideCards(fieldCards.HostPlayer.Deck),
				ExtraDeck: hideCards(fieldCards.HostPlayer.ExtraDeck),
				Side: hideCards(fieldCards.HostPlayer.SideDeck)
			},
			InvitedPlayer: {
				...fieldCards.InvitedPlayer,
				Deck: hideCards(fieldCards.InvitedPlayer.Deck),
				Side: hideCards(fieldCards.InvitedPlayer.SideDeck)
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

<GameInformation
	disableSelectDeck={$playersConnection.isConnectedToOpponent}
	bind:playersConnection={$playersConnection}
	{createYourGame}
	{connectToCreatedGame}
	style="flex: 6;"
	bind:deck
	playerDecks={$playerDecks}
/>
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
