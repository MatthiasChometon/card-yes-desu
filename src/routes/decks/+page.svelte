<script lang="ts">
	import type { PlayableCard } from '../../types/playable-card.type';
	import CardZoneForDeckCreation from '../../components/deck-creation/card-zone-for-deck-creation.svelte';
	import { handleDragAndDropConsiderCopy } from '../../services/handle-drag-and-drop-consider-copy';
	import type { DragAndDropHoverOrDropEvent } from '../../types/drag-and-drop-hover-or-drop-event';
	import type { DeckType } from '../../types/deck.type';
	import { CardZoneType } from '../../enums/card-zone-type.enum';
	import {
		addDeck,
		playerDecks,
		removeDeckByName,
		updateDeckByName,
		updateDeckName
	} from '../../store/player-decks.store';
	import { allCards } from '../../store/all-cards.store';
	import { createPlayableCard } from '../../services/create-playable-card';
	import { currentCardHover } from '../../store/current-card-hover.store';
	import Card from '../../components/card.svelte';

	let cardSearchInput: string = '';
	let selectedDeckName: string | null = null;
	let numberOfCardsPerPage: number = 50;
	let page: number = 1;
	let pageNumberList: number[] = [];
	let deck: DeckType = {
		name: '',
		[CardZoneType.Deck]: [],
		[CardZoneType.ExtraDeck]: [],
		[CardZoneType.SideDeck]: []
	};
	let searchCards: PlayableCard[] = [];

	function handleCardConsider(event: DragAndDropHoverOrDropEvent<PlayableCard[]>) {
		const { items } = handleDragAndDropConsiderCopy(event, searchCards);
		searchCards = items;
	}

	function saveDeck(): void {
		const deckAlreadyExisting = $playerDecks.find((playerDeck) => playerDeck.name === deck.name);
		if (deckAlreadyExisting === undefined) {
			selectedDeckName = deck.name;
			addDeck(deck);
			return;
		}

		updateDeckByName(deck);
	}

	function renameDeck(): void {
		if (selectedDeckName === null) return;
		updateDeckName(deck, selectedDeckName);
		selectedDeckName = deck.name;
	}

	function deleteDeck(): void {
		if (selectedDeckName === null) return;
		removeDeckByName(deck.name);
	}

	function onDeckSelect({ target: { value } }: { target: { value: string } }): void {
		const foundDeck = $playerDecks.find((playerDeck) => playerDeck.name === value);
		if (foundDeck === undefined) throw new Error('Deck not found');
		deck = foundDeck;
	}

	function getPageNumberList(cardsNotPaginated: PlayableCard[]): number[] {
		const numberOfPages = Math.ceil(cardsNotPaginated.length / numberOfCardsPerPage);
		pageNumberList = [...Array(numberOfPages).keys()].map((pageNumber) => pageNumber + 1);
		return pageNumberList;
	}

	$: numberOfMainDeckCards = deck.Deck.length;
	$: numberOfExtraDeckCards = deck.ExtraDeck.length;
	$: numberOfSideDeckCards = deck.SideDeck.length;
	$: slicedSearchCards = {
		start: (page - 1) * numberOfCardsPerPage,
		end: page * numberOfCardsPerPage
	};
	$: {
		const newSearchCardsNotPaginated = $allCards
			.filter((card) => card.name.toLowerCase().includes(cardSearchInput.toLowerCase()))
			.map(({ picture, name }) => createPlayableCard({ frontPicture: picture, name }));
		pageNumberList = getPageNumberList(newSearchCardsNotPaginated);

		searchCards = newSearchCardsNotPaginated.slice(slicedSearchCards.start, slicedSearchCards.end);
	}
</script>

<div style="display: flex; flex: 1;">
	{#if $currentCardHover !== null}
		<Card card={$currentCardHover} style="position: relative; padding: 2%;" />
	{/if}
</div>
<div style="flex: 2; margin: 1%; display: flex; flex-direction: column;">
	<div style="flex: 1; display: flex; align-items: center;">
		<h1>Deck :</h1>
		<input style="margin-left: 1%; margin-top: 0.5%; font-size: 1.6rem;" type="text" bind:value={deck.name} />
		{#if $playerDecks.length > 0}
			<select
				style="margin-left: 1%; margin-top: 0.5%; width: 20%; padding: 0.3%; font-size: 1.2rem;"
				bind:value={selectedDeckName}
				on:change={onDeckSelect}
			>
				{#each $playerDecks as playerDeck (playerDeck.name)}
					<option value={playerDeck.name}>{playerDeck.name}</option>
				{/each}
			</select>
		{/if}
		<button style="padding: 0.3%; margin-left: 1%; margin-top: 5px; font-size: 1.2rem;" on:click={saveDeck}>save</button
		>
		<button style="padding: 0.3%; margin-left: 1%; margin-top: 5px; font-size: 1.2rem;" on:click={renameDeck}
			>rename</button
		>
		<button style="padding: 0.3%; margin-left: 1%; margin-top: 5px; font-size: 1.2rem;" on:click={deleteDeck}
			>delete</button
		>
	</div>
	<div style="flex: 2; display: flex; flex-direction: column;">
		<p style="flex: 1;">main deck ({numberOfMainDeckCards})</p>
		<CardZoneForDeckCreation bind:cards={deck.Deck} cardStyle="width: 10%;" cardZoneContainerStyle="flex: 5;" />
	</div>
	<div style="flex: 2; display: flex; flex-direction: column;">
		<p style="flex: 1; margin-top: 1.5%;">extra deck ({numberOfExtraDeckCards})</p>
		<CardZoneForDeckCreation bind:cards={deck.ExtraDeck} cardStyle="width: 10%;" cardZoneContainerStyle="flex: 5;" />
	</div>
	<div style="flex: 2; display: flex; flex-direction: column;">
		<p style="flex: 1; margin-top: 1.5%;">side deck ({numberOfSideDeckCards})</p>
		<CardZoneForDeckCreation bind:cards={deck.SideDeck} cardStyle="width: 10%;" cardZoneContainerStyle="flex: 5;" />
	</div>
</div>
<div style="flex: 1; margin: 1%; display: flex; flex-direction: column;">
	<div style="flex: 1;">
		<h1>Search cards</h1>
		<input type="text" bind:value={cardSearchInput} />
	</div>
	<CardZoneForDeckCreation
		{handleCardConsider}
		bind:cards={searchCards}
		cardStyle="width: 20%;"
		cardZoneContainerStyle="flex: 12;"
	/>
	<select style="margin-top: 0.5%; width: 20%; padding: 0.3%; font-size: 1.2rem;" bind:value={page}>
		{#each pageNumberList as pageNumber}
			<option value={pageNumber}>{pageNumber}</option>
		{/each}
	</select>
</div>
