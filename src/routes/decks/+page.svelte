<script lang="ts">
	import { CardRotation } from '../../enums/card-rotation.enum';
	import type { PlayableCard } from '../../types/playable-card.type';
	import CardZoneForDeckCreation from '../../components/deck-creation/card-zone-for-deck-creation.svelte';
	import { handleDragAndDropConsiderCopy } from '../../services/handle-drag-and-drop-consider-copy';
	import type { DragAndDropHoverOrDropEvent } from '../../types/drag-and-drop-hover-or-drop-event';
	import type { DeckType } from '../../types/deck.type';
	import { CardZoneType } from '../../enums/card-zone-type.enum';
	import { playerDecks, removeDeckByName, updateDeckByName, updateDeckName } from '../../store/player-decks.store';

	let cardSearchInput: string = '';
	let selectedDeckName: string | null = null;
	let deck: DeckType = {
		name: '',
		[CardZoneType.Deck]: [],
		[CardZoneType.ExtraDeck]: [],
		[CardZoneType.SideDeck]: []
	};
	let searchCards: PlayableCard[] = [
		{
			id: '1',
			frontPicture: 'https://m.media-amazon.com/images/I/51N+J-WhXCL._AC_UF894,1000_QL80_.jpg',
			backPicture: 'back-card.png',
			gameState: {
				rotation: CardRotation.up,
				faceUp: true
			}
		},
		{
			id: '2',
			frontPicture:
				'https://images.saymedia-content.com/.image/t_share/MTc0NDYwODIxMDE4MTI1Njcy/top-10-strongest-yu-gi-oh-flip-effect-monsters.png',
			backPicture: 'back-card.png',
			gameState: {
				rotation: CardRotation.up,
				faceUp: true
			}
		},
		{
			id: '3',
			frontPicture: 'https://www.cards-capital.com/67159/exodia-l-interdit.jpg',
			backPicture: 'back-card.png',
			gameState: {
				rotation: CardRotation.up,
				faceUp: true
			}
		},
		{
			id: '4',
			frontPicture: 'https://www.cards-capital.com/62923/dragon-rose-noire.jpg',
			backPicture: 'back-card.png',
			gameState: {
				rotation: CardRotation.up,
				faceUp: true
			}
		},
		{
			id: '5',
			frontPicture: 'https://www.lerepairedudragon.fr/86404/dragon-rose-rougeatre-str-liov-yu-gi-oh.jpg',
			backPicture: 'back-card.png',
			gameState: {
				rotation: CardRotation.up,
				faceUp: true
			}
		},
		{
			id: '6',
			frontPicture: 'https://yugioh-france.fr/wp-content/uploads/2021/06/pousse-basale-de-roses.jpg',
			backPicture: 'back-card.png',
			gameState: {
				rotation: CardRotation.up,
				faceUp: true
			}
		}
	];

	function handleCardConsider(event: DragAndDropHoverOrDropEvent<PlayableCard[]>) {
		const { items } = handleDragAndDropConsiderCopy(event, searchCards);
		searchCards = items;
	}

	function saveDeck(): void {
		const deckAlreadyExisting = $playerDecks.find((playerDeck) => playerDeck.name === deck.name);
		if (deckAlreadyExisting === undefined) {
			selectedDeckName = deck.name;
			playerDecks.update((decks) => [...decks, structuredClone(deck)]);
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

	$: numberOfMainDeckCards = deck.Deck.length;
	$: numberOfExtraDeckCards = deck.ExtraDeck.length;
	$: numberOfSideDeckCards = deck.SideDeck.length;
</script>

<div style="display: flex; width: 100%; height: 100vh;">
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
	</div>
</div>
