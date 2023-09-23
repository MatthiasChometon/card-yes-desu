import { writable } from 'svelte/store'
import { browser } from '$app/environment';
import type { DeckType } from '../types/deck.type'

const storageName = 'playerDecks'
const initialValue = browser ? JSON.parse(window.localStorage.getItem(storageName) ?? '[]') ?? [] : [];

export const playerDecks = writable<DeckType[]>(initialValue)

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

playerDecks.subscribe((decks) => {
  if (browser) {
    window.localStorage.setItem(storageName, JSON.stringify(decks));
  }
})
