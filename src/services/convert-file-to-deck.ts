import type { DeckType } from "../types/deck.type";
import { convertFileNameAndResultToDeck } from "./convert-file-name-and-result-to-deck";
import { getNameAndResultFromFile } from "./get-name-and-result-from-file";

export async function convertFileToDeck (file: File): Promise<DeckType> {
 const reader = new FileReader();
 reader.readAsText(file)
 const fileWithNameAndResults = await getNameAndResultFromFile(reader, file);
 const newDeck: DeckType = convertFileNameAndResultToDeck(fileWithNameAndResults);
 return newDeck;
}