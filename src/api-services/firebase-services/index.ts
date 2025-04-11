import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { nanoid } from 'nanoid'; 
import {storage} from "./config";


export async function uploadBase64ToFirebase(base64Image: string): Promise<string> {
  try {
    //const storage = getStorage();
    const fileName = `shop-photos/${nanoid()}.jpg`; // A random unique name
    const storageRef = ref(storage, fileName);

    await uploadString(storageRef, base64Image, 'data_url');

    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading base64 to Firebase:', error);
    throw error;
  }
}
