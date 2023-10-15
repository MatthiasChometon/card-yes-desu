import type { StorageCardType } from "../types/storage-card.type";
import { createRandomNumberId } from "./create-random-number-id";
import { getNameAndResultFromFile } from "./get-name-and-result-from-file";

export const createStorageCardsWithLocalUrlPicture = async (files: File[]): Promise<StorageCardType[]> => {
 const cardsUploaded = await Promise.all(files.map(async file => {
  const reader = new FileReader();
  reader.readAsDataURL(file)
  const fileWithNameAndResults = await getNameAndResultFromFile(reader, file);
  const { name, result } = fileWithNameAndResults
  const id = createRandomNumberId()
  return { picture: result, name, isCustom: true, id }
 }))
 return cardsUploaded
}
