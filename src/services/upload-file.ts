import { ref, uploadBytes } from '@firebase/storage';
import { createRandomStringId } from './create-random-string-id';
import { PUBLIC_FIREBASE_STORAGE_BUCKET } from '$env/static/public';
import { storage } from './init-firebase';

export const uploadFile = async (file: File): Promise<string> => {
 const fileNameInStorage = `${file.name}-${createRandomStringId()}`
 const cacheControl = 'max-age=31536000';
 const storageRef = ref(storage, fileNameInStorage);

 await uploadBytes(storageRef, file, { cacheControl })
 const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${fileNameInStorage}?alt=media`
 return fileUrl
}
