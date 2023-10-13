import type { DeckType } from "../types/deck.type";
import { convertFileToDeck } from "./convert-file-to-deck";

export const convertFileListYdkToCustomDecks = async (fileList: FileList): Promise<DeckType[]> => {
 const newDecks = await Promise.all(Array.from(fileList).map(async (file) => await convertFileToDeck(file)))
 return newDecks
}
