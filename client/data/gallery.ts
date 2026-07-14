import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { z } from "zod";
import firebase from "../lib/firebase";

export interface GalleryPhoto {
  id: string;
  url: string;
  name: string;
  sortOrder: number;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  eventDate: string;
  photos: GalleryPhoto[];
  archived: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const albumsCollection = collection(firebase.firestore, "galleryAlbums");

const galleryPhotoSchema = z.object({
  id: z.string().default(""),
  url: z.string().default(""),
  name: z.string().default(""),
  sortOrder: z.number().catch(0),
});

const galleryAlbumSchema = z.object({
  title: z.string().default(""),
  description: z.string().default(""),
  coverImage: z.string().default(""),
  eventDate: z.string().default(""),
  photos: z.array(galleryPhotoSchema).catch([]),
  archived: z.boolean().catch(false),
  published: z.boolean().catch(true),
  createdAt: z.string().default(""),
  updatedAt: z.string().default(""),
});

let albumsCache: GalleryAlbum[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

const isCacheValid = (): boolean => Date.now() - lastFetchTime < CACHE_DURATION;

const sanitizeId = (value?: string): string => {
  if (!value) return "";
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
};

const sortAlbums = (albums: GalleryAlbum[]): GalleryAlbum[] =>
  [...albums].sort(
    (left, right) =>
      new Date(right.eventDate || right.createdAt).getTime() -
      new Date(left.eventDate || left.createdAt).getTime(),
  );

const normalizeAlbum = (documentId: string, data: unknown): GalleryAlbum | null => {
  const parsed = galleryAlbumSchema.safeParse(data);
  if (!parsed.success) {
    console.warn(`Skipping invalid gallery album: ${documentId}`, parsed.error.flatten());
    return null;
  }

  const photos = parsed.data.photos
    .map((photo, index) => ({
      id: photo.id || `photo-${index}`,
      url: photo.url,
      name: photo.name || `Photo ${index + 1}`,
      sortOrder: photo.sortOrder ?? index,
    }))
    .filter((photo) => Boolean(photo.url))
    .sort((left, right) => left.sortOrder - right.sortOrder);

  return {
    id: documentId,
    title: parsed.data.title,
    description: parsed.data.description,
    coverImage: parsed.data.coverImage || photos[0]?.url || "",
    eventDate: parsed.data.eventDate,
    photos,
    archived: parsed.data.archived,
    published: parsed.data.published,
    createdAt: parsed.data.createdAt,
    updatedAt: parsed.data.updatedAt,
  };
};

const invalidateCache = () => {
  albumsCache = [];
  lastFetchTime = 0;
};

export const createPhotoId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `photo-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

export const getAllGalleryAlbums = async (): Promise<GalleryAlbum[]> => {
  try {
    if (isCacheValid() && albumsCache.length > 0) {
      return albumsCache;
    }

    const querySnapshot = await getDocs(query(albumsCollection, orderBy("eventDate", "desc")));
    const albums: GalleryAlbum[] = [];

    querySnapshot.forEach((document) => {
      const album = normalizeAlbum(document.id, document.data());
      if (album) {
        albums.push(album);
      }
    });

    albumsCache = sortAlbums(albums);
    lastFetchTime = Date.now();
    return albumsCache;
  } catch (error) {
    console.error("Error fetching gallery albums:", error);
    // Fallback without orderBy if index is missing
    try {
      const querySnapshot = await getDocs(albumsCollection);
      const albums: GalleryAlbum[] = [];
      querySnapshot.forEach((document) => {
        const album = normalizeAlbum(document.id, document.data());
        if (album) albums.push(album);
      });
      albumsCache = sortAlbums(albums);
      lastFetchTime = Date.now();
      return albumsCache;
    } catch (fallbackError) {
      console.error("Gallery fallback fetch failed:", fallbackError);
      return albumsCache;
    }
  }
};

export const getPublishedGalleryAlbums = async (): Promise<GalleryAlbum[]> => {
  const albums = await getAllGalleryAlbums();
  return albums.filter((album) => album.published);
};

export const getCurrentGalleryAlbums = async (): Promise<GalleryAlbum[]> => {
  const albums = await getPublishedGalleryAlbums();
  return albums.filter((album) => !album.archived);
};

export const getArchivedGalleryAlbums = async (): Promise<GalleryAlbum[]> => {
  const albums = await getPublishedGalleryAlbums();
  return albums.filter((album) => album.archived);
};

export const getGalleryAlbumById = async (
  id: string,
): Promise<GalleryAlbum | undefined> => {
  try {
    const docSnap = await getDoc(doc(firebase.firestore, "galleryAlbums", id));
    if (!docSnap.exists()) {
      return undefined;
    }
    return normalizeAlbum(docSnap.id, docSnap.data()) ?? undefined;
  } catch (error) {
    console.error("Error fetching gallery album:", error);
    return undefined;
  }
};

export const addGalleryAlbum = async (
  newAlbum: Omit<GalleryAlbum, "id" | "createdAt" | "updatedAt"> & { id?: string },
): Promise<GalleryAlbum> => {
  const preferredId = sanitizeId(newAlbum.id || newAlbum.title);
  const docRef = preferredId
    ? doc(firebase.firestore, "galleryAlbums", preferredId)
    : doc(albumsCollection);

  if (preferredId) {
    const existing = await getDoc(docRef);
    if (existing.exists()) {
      throw new Error(
        "An album with this name already exists. Please choose another title.",
      );
    }
  }

  const now = new Date().toISOString();
  const payload: GalleryAlbum = {
    ...newAlbum,
    id: docRef.id,
    photos: newAlbum.photos || [],
    coverImage: newAlbum.coverImage || newAlbum.photos?.[0]?.url || "",
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(docRef, payload);
  invalidateCache();
  return payload;
};

export const updateGalleryAlbum = async (album: GalleryAlbum): Promise<GalleryAlbum> => {
  const payload: GalleryAlbum = {
    ...album,
    coverImage: album.coverImage || album.photos?.[0]?.url || "",
    updatedAt: new Date().toISOString(),
  };

  await setDoc(doc(firebase.firestore, "galleryAlbums", album.id), payload);
  invalidateCache();
  return payload;
};

export const deleteGalleryAlbum = async (albumId: string): Promise<void> => {
  await deleteDoc(doc(firebase.firestore, "galleryAlbums", albumId));
  invalidateCache();
};
