import { getAllCardsFromApi } from "../services/get-all-cards-from-api";
import { isToday } from "../services/is-today";
import type { StorageCardType } from "../types/storage-card.type";
import { localStorageStore } from "./local-storage-store.store";

export const lastCardsReleaseDate = localStorageStore<string | null>('lastCardsReleaseDate', null);
export const allCards = localStorageStore<StorageCardType[]>('allCards', []);

export const addCustomCardsFromFileList = async (files: FileList) => {
  let newCustomCards: StorageCardType[] = []
  const filePromises = Array.from(files).map((file) => {
    return new Promise<void>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const picture = reader.result as string;
        const name = file.name;
        newCustomCards.push({ picture, name, isCustom: true });
        resolve();
      };
    });
  });

  await Promise.all(filePromises)
  allCards.update(allCards => [...allCards, ...newCustomCards])
}

export const setAllCards = async (fromDate: Date | null): Promise<'dataUpdated' | 'error' | 'noDataToUpdate'> => {
  const hasAllUpdatedCards: boolean = fromDate !== null && isToday(fromDate)
  if (hasAllUpdatedCards) return 'noDataToUpdate'

  let option: Parameters<typeof getAllCardsFromApi>['0'] = { fromDate }
  const cards = await getAllCardsFromApi(option)
  if (cards === null) return 'error'
  if (cards.length === 0) return 'noDataToUpdate'

  let cardsDownloaded: StorageCardType[] = []
  cards.forEach(card => {
    card.card_images.forEach(image => {
      cardsDownloaded.push({ picture: image.image_url, name: card.name, isCustom: false })
    });
  });

  allCards.update(allCards => [...allCards, ...cardsDownloaded])
  lastCardsReleaseDate.set(new Date().toString())
  return 'dataUpdated'
}
