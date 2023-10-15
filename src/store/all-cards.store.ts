import { getCardsFromApi } from "../services/get-cards-from-api";
import { isToday } from "../services/is-today";
import type { StorageCardType } from "../types/storage-card.type";
import { localStorageStore } from "./local-storage-store.store";

export const lastCardsReleaseDate = localStorageStore<string | null>('lastCardsReleaseDate', null);
export const allCards = localStorageStore<StorageCardType[]>('allCards', []);

export const setAllCards = async (fromDate: Date | null): Promise<'dataUpdated' | 'error' | 'noDataToUpdate'> => {
  const hasAllUpdatedCards: boolean = fromDate !== null && isToday(fromDate)
  if (hasAllUpdatedCards) return 'noDataToUpdate'

  const option: Parameters<typeof getCardsFromApi>['0'] = { fromDate }
  const cards = await getCardsFromApi(option)
  if (cards === null) return 'error'
  if (cards.length === 0) return 'noDataToUpdate'

  const cardsDownloaded: StorageCardType[] = []
  cards.forEach(card => {
    card.card_images.forEach(image => {
      const { id } = image
      cardsDownloaded.push({ picture: image.image_url, name: card.name, isCustom: false, id })
    });
  });

  allCards.update(allCards => [...allCards, ...cardsDownloaded])
  lastCardsReleaseDate.set(new Date().toString())
  return 'dataUpdated'
}
