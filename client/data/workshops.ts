import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { z } from "zod";
import firebase from "../lib/firebase";

export interface Workshop {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  url: string;
  comingSoon?: boolean;
}

const workshopsCollection = collection(firebase.firestore, "workshops");

const workshopSchema = z.object({
  id: z.number().int().positive().catch(0),
  date: z.string().default(""),
  title: z.string().default(""),
  description: z.string().default(""),
  image: z.string().default(""),
  isActive: z.boolean().catch(true),
  url: z.string().default(""),
  comingSoon: z.boolean().catch(false),
});

let workshopsCache: Workshop[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

const isCacheValid = (): boolean => Date.now() - lastFetchTime < CACHE_DURATION;

const sortWorkshops = (items: Workshop[]): Workshop[] =>
  [...items].sort((left, right) => left.id - right.id);

const normalizeWorkshop = (documentId: string, data: unknown): Workshop | null => {
  const parsed = workshopSchema.safeParse(data);
  if (!parsed.success) {
    console.warn(`Skipping invalid workshop document: ${documentId}`, parsed.error.flatten());
    return null;
  }

  const derivedId = parsed.data.id || Number(documentId);
  if (!Number.isFinite(derivedId) || derivedId <= 0) {
    console.warn(`Skipping workshop with invalid id: ${documentId}`);
    return null;
  }

  return {
    id: derivedId,
    date: parsed.data.date,
    title: parsed.data.title,
    description: parsed.data.description,
    image: parsed.data.image,
    isActive: parsed.data.isActive,
    url: parsed.data.url,
    comingSoon: parsed.data.comingSoon,
  };
};

const resolveWorkshopDocRef = async (id: number) => {
  const canonicalRef = doc(workshopsCollection, id.toString());
  const canonicalSnapshot = await getDoc(canonicalRef);
  if (canonicalSnapshot.exists()) {
    return canonicalRef;
  }

  const fallbackSnapshot = await getDocs(
    query(workshopsCollection, where("id", "==", id), limit(1)),
  );
  const fallbackDocument = fallbackSnapshot.docs[0];
  if (fallbackDocument) {
    return doc(firebase.firestore, "workshops", fallbackDocument.id);
  }

  return canonicalRef;
};

const initialWorkshops: Workshop[] = [
  {
    id: 1,
    date: "October 25th, 2025",
    title: "Redeemed For a Purpose Workshop & Book Launch",
    description:
      "Join us for an inspiring workshop and book launch as we explore the journey of healing, purpose, and transformation. This event is a must-attend for anyone looking to find their place in the world and live a life of purpose.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-19%20at%2018.00.44.jpeg?alt=media&token=8a288f2f-86e7-4b3c-a745-d73dff52bec4",
    isActive: true,
    url: "https://caribtix.vbotickets.com/event/Redeemed_For_A_Purpose/167873",
  },
  {
    id: 2,
    date: "November 15th, 2025",
    title: "This Event is Coming Soon",
    description:
      "An exciting new workshop focused on building resilience and overcoming life's challenges. Details coming soon - stay tuned for more information.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/coming-soon-letter-hanging-door-600nw-2497993761.webp?alt=media&token=ab00d3a3-6e03-4828-9552-14cb58f298aa",
    isActive: false,
    comingSoon: true,
    url: "#",
  },
  {
    id: 3,
    date: "December 5th, 2025",
    title: "Another Amazing Workshop",
    description:
      "A special end-of-year workshop designed to help you reflect, reset, and prepare for the new year ahead. Join us for this powerful session of transformation.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/coming-soon-letter-hanging-door-600nw-2497993761.webp?alt=media&token=ab00d3a3-6e03-4828-9552-14cb58f298aa",
    isActive: false,
    comingSoon: true,
    url: "#",
  },
];

export const getAllWorkshops = async (): Promise<Workshop[]> => {
  try {
    if (isCacheValid() && workshopsCache.length > 0) {
      return workshopsCache;
    }

    const querySnapshot = await getDocs(query(workshopsCollection, orderBy("id", "asc")));
    const workshops: Workshop[] = [];

    querySnapshot.forEach((document) => {
      const workshop = normalizeWorkshop(document.id, document.data());
      if (workshop) {
        workshops.push(workshop);
      }
    });

    workshopsCache = sortWorkshops(workshops);
    lastFetchTime = Date.now();
    return workshopsCache;
  } catch (error) {
    console.error("Error fetching workshops:", error);
    return sortWorkshops(workshopsCache);
  }
};

export const getWorkshopById = async (id: number): Promise<Workshop | undefined> => {
  try {
    if (isCacheValid() && workshopsCache.length > 0) {
      return workshopsCache.find((workshop) => workshop.id === id);
    }

    const workshops = await getAllWorkshops();
    return workshops.find((workshop) => workshop.id === id);
  } catch (error) {
    console.error("Error fetching workshop:", error);
    return undefined;
  }
};

export const addWorkshop = async (workshop: Omit<Workshop, "id">): Promise<Workshop> => {
  try {
    const existingWorkshops = await getAllWorkshops();
    const newId = Math.max(...existingWorkshops.map((item) => item.id), 0) + 1;

    const newWorkshop: Workshop = {
      ...workshop,
      id: newId,
    };

    await setDoc(doc(workshopsCollection, newId.toString()), newWorkshop);

    workshopsCache = sortWorkshops([
      ...workshopsCache.filter((item) => item.id !== newWorkshop.id),
      newWorkshop,
    ]);
    lastFetchTime = Date.now();

    return newWorkshop;
  } catch (error) {
    console.error("Error adding workshop:", error);
    throw error;
  }
};

export const updateWorkshop = async (updatedWorkshop: Workshop): Promise<Workshop> => {
  try {
    const docRef = await resolveWorkshopDocRef(updatedWorkshop.id);
    await setDoc(docRef, updatedWorkshop);

    const index = workshopsCache.findIndex((workshop) => workshop.id === updatedWorkshop.id);
    if (index !== -1) {
      workshopsCache[index] = updatedWorkshop;
    } else {
      workshopsCache.push(updatedWorkshop);
    }
    workshopsCache = sortWorkshops(workshopsCache);
    lastFetchTime = Date.now();

    return updatedWorkshop;
  } catch (error) {
    console.error("Error updating workshop:", error);
    throw error;
  }
};

export const deleteWorkshop = async (id: number): Promise<boolean> => {
  try {
    const docRef = await resolveWorkshopDocRef(id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return false;
    }

    await deleteDoc(docRef);

    workshopsCache = workshopsCache.filter((workshop) => workshop.id !== id);
    lastFetchTime = Date.now();

    return true;
  } catch (error) {
    console.error("Error deleting workshop:", error);
    throw error;
  }
};

export const setWorkshops = (newWorkshops: Workshop[]): void => {
  workshopsCache = sortWorkshops(newWorkshops);
  lastFetchTime = Date.now();
};

export const injectInitialWorkshops = async (): Promise<void> => {
  try {
    console.log("Starting to inject initial workshops...");

    for (const workshop of initialWorkshops) {
      const existingWorkshop = await getWorkshopById(workshop.id);
      if (!existingWorkshop) {
        await setDoc(doc(workshopsCollection, workshop.id.toString()), workshop);
        console.log(`✅ Injected workshop: ${workshop.title}`);
      } else {
        console.log(`⏭️  Workshop already exists: ${workshop.title}`);
      }
    }

    workshopsCache = [];
    lastFetchTime = 0;

    console.log("✨ Initial workshops injection completed!");
  } catch (error) {
    console.error("❌ Error injecting initial workshops:", error);
    throw error;
  }
};
