import type { DeckType } from '../types/deck.type'
import { localStorageStore } from './local-storage-store.store';

export const playerDecks = localStorageStore<DeckType[]>('playerDecks', []);

export const updateDeckByName = (deck: DeckType) => {
  playerDecks.update((decks) =>
    decks.map((existingDeck) => (existingDeck.name === deck.name ? structuredClone(deck) : existingDeck))
  );
}

export const removeDeckByName = (deckName: string) => {
  playerDecks.update((decks) =>
    decks.filter((existingDeck) => (existingDeck.name !== deckName))
  );
}

export const updateDeckName = (deck: DeckType, lastDeckName: string) => {
  playerDecks.update((decks) =>
    decks.map((existingDeck) => (existingDeck.name === lastDeckName ? structuredClone(deck) : existingDeck))
  );
}

export const addDeck = (deck: DeckType) => {
  playerDecks.update((decks) => [...decks, structuredClone(deck)]);
}

export const addDecks = (newDecks: DeckType[]) => {
  playerDecks.update((decks) => [...decks, ...structuredClone(newDecks)]);
}
