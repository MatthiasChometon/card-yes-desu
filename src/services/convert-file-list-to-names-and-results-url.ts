import { getNameAndResultFromFile } from "./get-name-and-result-from-file";

export async function convertFileListToNamesAndResultsUrl (fileList: FileList): Promise<Array<{ name: string, result: string }>> {
 const filesWithNameAndResults: Array<{ name: string, result: string }> = await Promise.all(
  Array.from(fileList).map(async (file) => {
   const reader = new FileReader();
   reader.readAsDataURL(file)
   return await getNameAndResultFromFile(reader, file);
  }))

 return filesWithNameAndResults
}