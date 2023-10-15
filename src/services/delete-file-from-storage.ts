import { deleteObject, ref } from "@firebase/storage";
import { storage } from "./init-firebase";

export async function deleteFileFromStorage (fileUrl: string): Promise<void> {
 const storageRef = ref(storage, fileUrl);
 await deleteObject(storageRef);
}