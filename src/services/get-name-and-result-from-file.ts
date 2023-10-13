export async function getNameAndResultFromFile (reader: FileReader, file: File): Promise<{ result: string; name: string; }> {
 return new Promise((resolve, reject) => {
  reader.onload = async () => {
   if (typeof reader.result !== "string") reject(new Error("FileReader result is not a string"));
   const result = reader.result as string;
   resolve({ result, name: file.name });
  };
  reader.onerror = () => { reject(new Error("FileReader error")); };
 });
}
