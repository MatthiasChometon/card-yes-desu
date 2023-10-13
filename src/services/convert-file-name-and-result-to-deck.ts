import { CardZoneType } from "../enums/card-zone-type.enum";
import type { DeckType } from "../types/deck.type";
import type { FileWithNameAndResults } from "../types/file-with-name-and-picture";
import type { StorageCardType } from "../types/storage-card.type";
import { createPlayableCard } from "./create-playable-card";

type CardZoneConfigType = CardZoneType.Deck | CardZoneType.ExtraDeck | CardZoneType.SideDeck;

const lineIsMain = (line: string): boolean => line.startsWith('#main');
const lineIsExtra = (line: string): boolean => line.startsWith('#extra');
const lineIsSide = (line: string): boolean => line.startsWith('!side');
const lineIsEmpty = (line: string): boolean => line === '';

const getCurrentCardZoneType = (currentCardZoneType: CardZoneConfigType | null, line: string): CardZoneConfigType | null => {
 if (lineIsMain(line)) return CardZoneType.Deck;
 if (lineIsExtra(line)) return CardZoneType.ExtraDeck;
 if (lineIsSide(line)) return CardZoneType.SideDeck;
 return currentCardZoneType;
}

const getCardIdsAndZoneTypes = (result: string): Array<{ id: number, cardZoneType: CardZoneConfigType }> => {
 const cardIdsAndZoneTypes: Array<{ id: number, cardZoneType: CardZoneConfigType }> = [];

 let currentCardZoneType: CardZoneConfigType | null = null;
 const lines = result.split('\n');
 lines.forEach(line => {
  const lineWithoutSlashR = line.replace('\r', '');
  currentCardZoneType = getCurrentCardZoneType(currentCardZoneType, lineWithoutSlashR);
  if (currentCardZoneType === null || lineIsMain(line) || lineIsExtra(line) || lineIsSide(line) || lineIsEmpty(line)) return;

  cardIdsAndZoneTypes.push({ id: +lineWithoutSlashR, cardZoneType: currentCardZoneType });
 });

 return cardIdsAndZoneTypes;
}

const createDeck = (name: string, cardIdsAndZoneTypes: Array<{ id: number, cardZoneType: CardZoneConfigType }>, allCards: StorageCardType[]): DeckType => {
 const deck: DeckType = {
  name,
  [CardZoneType.Deck]: [],
  [CardZoneType.ExtraDeck]: [],
  [CardZoneType.SideDeck]: []
 }
 cardIdsAndZoneTypes.forEach(({ id, cardZoneType }) => {
  const card = allCards.find(card => card.id === id);
  if (card === undefined) throw new Error(`Card with id ${id} not found when import deck`);
  deck[cardZoneType].push(createPlayableCard({ frontPicture: card.picture, name: card.name }));
 });

 return deck;
}

export const convertFileNameAndResultToDeck = ({ result, name }: FileWithNameAndResults): DeckType => {
 const nameWithoutExtension = name.split('.ydk')[0]
 const cardIdsAndZoneTypes: Array<{ id: number, cardZoneType: CardZoneConfigType }> = getCardIdsAndZoneTypes(result);
 const allCards: StorageCardType[] = JSON.parse(localStorage.getItem('allCards') || '{}');
 const deck: DeckType = createDeck(nameWithoutExtension, cardIdsAndZoneTypes, allCards);

 return deck;
}
