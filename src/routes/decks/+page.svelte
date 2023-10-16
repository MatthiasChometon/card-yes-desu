<script lang="ts">
	import type { PlayableCard } from '../../types/playable-card.type';
	import CardZoneForDeckCreation from '../../components/deck-creation/card-zone-for-deck-creation.svelte';
	import { handleDragAndDropConsiderCopy } from '../../services/handle-drag-and-drop-consider-copy';
	import type { DragAndDropHoverOrDropEvent } from '../../types/drag-and-drop-hover-or-drop-event';
	import type { DeckType } from '../../types/deck.type';
	import { CardZoneType } from '../../enums/card-zone-type.enum';
	import {
		addDeck,
		addDecks,
		playerDecks,
		removeDeckByName,
		updateDeckByName,
		updateDeckName
	} from '../../store/player-decks.store';
	import { createPlayableCard } from '../../services/create-playable-card';
	import { currentCardHover } from '../../store/current-card-hover.store';
	import Card from '../../components/card.svelte';
	import RedirectionList from '../../components/redirection-list.svelte';
	import SelectDeck from '../../components/select-deck.svelte';
	import type { ContextMenuItem } from '../../types/context-menu-item.type';
	import MediaQuery from '../../components/media-query.svelte';
	import ImportDeck from '../../components/import-deck.svelte';
	import { allCards } from '../../store/all-cards.store';
	import { enhance } from '$app/forms';
	import type { StorageCardType } from '../../types/storage-card.type';
	import { uploadFiles } from '../../services/upload-files';
	import { createStorageCardsWithLocalUrlPicture } from '../../services/create-storage-cards-with-local-url-picture';
	import { deleteFileFromStorage } from '../../services/delete-file-from-storage';

	let cardSearchInput: string = '';
	let selectedDeckName: string | null = null;
	let numberOfCardsPerPage: number = 50;
	let page: number = 1;
	let pageNumberList: number[] = [];
	let displayOnlyCustomCards: boolean = false;
	let cardClickedOnSearchCards: PlayableCard | null = null;
	let deck: DeckType = {
		name: '',
		[CardZoneType.Deck]: [],
		[CardZoneType.ExtraDeck]: [],
		[CardZoneType.SideDeck]: []
	};
	let searchCards: PlayableCard[] = [];
	let cardsToUpload: StorageCardType[] = [];

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

	function getPageNumberList(cardsNotPaginated: PlayableCard[]): number[] {
		const numberOfPages = Math.ceil(cardsNotPaginated.length / numberOfCardsPerPage);
		pageNumberList = [...Array(numberOfPages).keys()].map((pageNumber) => pageNumber + 1);
		return pageNumberList;
	}

	const deleteCustomCardMenuItems: ContextMenuItem[] = [
		{
			displayText: 'Delete',
			onClick: () => {
				allCards.update((allCards) => {
					const cardIndex = allCards.findIndex(({ picture }) => picture === cardClickedOnSearchCards!.frontPicture);
					deleteFileFromStorage(allCards[cardIndex].picture);
					allCards.splice(cardIndex, 1);
					return allCards;
				});
			}
		}
	];

	async function addStorageCardsWithLocalUrlPicture(files: File[]): Promise<void> {
		const cards = await createStorageCardsWithLocalUrlPicture(files);
		cardsToUpload = [...cardsToUpload, ...cards];
	}

	async function addCustomCards({ target: { files: fileList } }: { target: { files: FileList } }): Promise<void> {
		if (fileList.length === 0) return;
		const files = Array.from(fileList);

		const [filesUploaded] = await Promise.all([uploadFiles(files), addStorageCardsWithLocalUrlPicture(files)]);

		const cards = structuredClone(cardsToUpload).map((card) => {
			const fileUploaded = filesUploaded.find((file) => file.name === card.name);
			if (fileUploaded === undefined) return card;
			return { ...card, picture: fileUploaded.result };
		});

		allCards.update((allCards) => {
			cardsToUpload = [];
			return [...allCards, ...cards];
		});
	}

	$: numberOfMainDeckCards = deck.Deck.length;
	$: numberOfExtraDeckCards = deck.ExtraDeck.length;
	$: numberOfSideDeckCards = deck.SideDeck.length;
	$: slicedSearchCards = {
		start: (page - 1) * numberOfCardsPerPage,
		end: page * numberOfCardsPerPage
	};
	$: {
		let allCardsCopy = structuredClone([...$allCards, ...cardsToUpload]);
		if (displayOnlyCustomCards) allCardsCopy = allCardsCopy.filter(({ isCustom }) => isCustom);

		const newSearchCardsNotPaginated = allCardsCopy
			.filter((card) => card.name.toLowerCase().includes(cardSearchInput.toLowerCase()))
			.map(({ picture, name }) => createPlayableCard({ frontPicture: picture, name }));
		pageNumberList = getPageNumberList(newSearchCardsNotPaginated);

		searchCards = newSearchCardsNotPaginated.slice(slicedSearchCards.start, slicedSearchCards.end);
	}
</script>

<MediaQuery query="(min-width: 800px)" let:matches>
	{#if matches}
		<div style="flex: 1;">
			{#if $currentCardHover !== null}
				<Card card={$currentCardHover} style="position: relative; padding: 2%;" />
			{/if}
		</div>
	{:else if $currentCardHover !== null}
		<Card
			card={$currentCardHover}
			style="position: absolute; padding: 2%; left: 0; width: 50%; background-color: rgba(0, 0, 0, 0.7);"
		/>
	{/if}
	<div style="flex: 2; margin: 1%; display: flex; flex-direction: column;">
		<RedirectionList />
		<div style="flex: 1; display: flex; align-items: center; flex-wrap: wrap;">
			<h1>Deck :</h1>
			<input style="margin-left: 1%; margin-top: 0.5%; font-size: 1.6rem;" type="text" bind:value={deck.name} />
			{#if $playerDecks.length > 0}
				<SelectDeck bind:selectedDeckName playerDecks={$playerDecks} bind:deck />
			{/if}
			<button style="padding: 0.3%; margin-left: 1%; margin-top: 5px; font-size: 1.2rem;" on:click={saveDeck}
				>save</button
			>
			<button style="padding: 0.3%; margin-left: 1%; margin-top: 5px; font-size: 1.2rem;" on:click={renameDeck}
				>rename</button
			>
			<button style="padding: 0.3%; margin-left: 1%; margin-top: 5px; font-size: 1.2rem;" on:click={deleteDeck}
				>delete</button
			>
		</div>
		<p>main deck ({numberOfMainDeckCards})</p>
		<div style="flex: 6; display: flex; overflow-y: scroll; background-color: rgba(0, 0, 0, 0.2);">
			<CardZoneForDeckCreation bind:cards={deck.Deck} cardStyle="width: 10%;" cardZoneContainerStyle="flex: 5;" />
		</div>
		<p style="margin-top: 1.5%;">extra deck ({numberOfExtraDeckCards})</p>
		<div style="flex: 2; display: flex; overflow-y: scroll; background-color: rgba(0, 0, 0, 0.2);">
			<CardZoneForDeckCreation bind:cards={deck.ExtraDeck} cardStyle="width: 10%;" cardZoneContainerStyle="flex: 5;" />
		</div>
		<p style="margin-top: 1.5%;">side deck ({numberOfSideDeckCards})</p>
		<div style="flex: 2; display: flex; overflow-y: scroll; background-color: rgba(0, 0, 0, 0.2);">
			<CardZoneForDeckCreation bind:cards={deck.SideDeck} cardStyle="width: 10%;" cardZoneContainerStyle="flex: 5;" />
		</div>
	</div>
	<div style="flex: 1; margin: 1%; display: flex; flex-direction: column;">
		<div style="flex: 1;">
			<h1>Search cards</h1>
			<input type="text" bind:value={cardSearchInput} />
			<label for="displayOnlyCustomCards" style="white-space: nowrap;">display only custom cards:</label>
			<input
				type="checkbox"
				id="displayOnlyCustomCards"
				bind:checked={displayOnlyCustomCards}
				on:change={() => {
					page = 1;
				}}
			/>
		</div>
		<CardZoneForDeckCreation
			{handleCardConsider}
			noModalGameMenu={!displayOnlyCustomCards}
			menuItems={deleteCustomCardMenuItems}
			bind:cards={searchCards}
			bind:cardClicked={cardClickedOnSearchCards}
			cardStyle="width: 20%;"
			cardZoneContainerStyle="flex: 12; overflow-y: scroll; background-color: rgba(0, 0, 0, 0.2);"
		/>
		<div style="display: flex; flex-direction: column;">
			<div style="display: flex; justify-content: center; gap: 4%; margin: 1%;">
				<button
					style="padding: 0.3%; font-size: 1.2rem;"
					on:click={() => {
						if (page > 1) page--;
					}}>previous</button
				>
				<select style="margin-top: 0.5%; width: 20%; padding: 0.3%; font-size: 1.2rem;" bind:value={page}>
					{#each pageNumberList as pageNumber}
						<option value={pageNumber}>{pageNumber}</option>
					{/each}
				</select>
				<button
					style="padding: 0.3%; font-size: 1.2rem;"
					on:click={() => {
						if (page < pageNumberList.length) page++;
					}}>next</button
				>
			</div>
			<div style="display: flex; justify-content: center; gap: 4%; margin: 1%; flex-direction: column;">
				<div style="display: flex; margin-bottom: 1%;">
					<form method="POST" action="/decks" use:enhance enctype="multipart/form-data">
						<label for="customCardsFromInput">Upload custom cards:</label>
						<input
							accept="image/webp, image/jpeg, image/png, image/*"
							id="customCardsFromInput"
							name="files"
							multiple
							type="file"
							on:change={addCustomCards}
						/>
					</form>
				</div>
				<ImportDeck onDecksImport={addDecks} />
			</div>
		</div>
	</div>
</MediaQuery>
