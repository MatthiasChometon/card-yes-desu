import { uploadFile } from "./upload-file";

export async function uploadFiles (files: File[]): Promise<Array<{ name: string, result: string }>> {
 return await Promise.all(files.map(async (file) => {
  const result = await uploadFile(file)
  return { name: file.name, result }
 }))
}