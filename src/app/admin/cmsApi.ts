import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../lib/firebase";
import type { CmsMediaAsset, CmsRecord, CmsSiteSettings } from "./cmsTypes";

export async function listCmsDocuments<T>(collectionName: string): Promise<CmsRecord<T>[]> {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((entry) => ({ id: entry.id, ...(entry.data() as T) }));
}

export async function createCmsDocument<T>(collectionName: string, payload: T): Promise<string> {
  const result = await addDoc(collection(db, collectionName), payload as Record<string, unknown>);
  return result.id;
}

export async function updateCmsDocument<T>(
  collectionName: string,
  id: string,
  payload: Partial<T>,
): Promise<void> {
  await updateDoc(doc(db, collectionName, id), payload as Record<string, unknown>);
}

export async function deleteCmsDocument(collectionName: string, id: string): Promise<void> {
  await deleteDoc(doc(db, collectionName, id));
}

const SETTINGS_COLLECTION = "site_settings";
const SETTINGS_DOC_ID = "global";

export async function loadSiteSettings(): Promise<CmsSiteSettings | null> {
  const snapshot = await getDoc(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID));
  if (!snapshot.exists()) {
    return null;
  }
  return snapshot.data() as CmsSiteSettings;
}

export async function saveSiteSettings(payload: CmsSiteSettings): Promise<void> {
  await setDoc(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID), payload, { merge: true });
}

export async function uploadMediaAndCreateRecord(file: File, altText: string): Promise<string> {
  const storagePath = `cms-media/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(storageRef);

  const asset: CmsMediaAsset = {
    fileName: file.name,
    url: downloadUrl,
    altText,
    contentType: file.type,
    createdAt: new Date().toISOString(),
  };

  return createCmsDocument<CmsMediaAsset>("media_assets", asset);
}
