import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, getDoc, query, orderBy } from 'firebase/firestore';
import firebase from '../lib/firebase';

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

// Firestore collection reference
const workshopsCollection = collection(firebase.firestore, 'workshops');

// Cache for workshops to improve performance
let workshopsCache: Workshop[] = [];
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to check if cache is valid
const isCacheValid = (): boolean => {
  return Date.now() - lastFetchTime < CACHE_DURATION;
};

// Initial workshop data for seeding
const initialWorkshops: Workshop[] = [
  {
    id: 1,
    date: "October 25th, 2025",
    title: "Redeemed For a Purpose Workshop & Book Launch",
    description: "Join us for an inspiring workshop and book launch as we explore the journey of healing, purpose, and transformation. This event is a must-attend for anyone looking to find their place in the world and live a life of purpose.",
    image: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-19%20at%2018.00.44.jpeg?alt=media&token=8a288f2f-86e7-4b3c-a745-d73dff52bec4",
    isActive: true,
    url: "https://caribtix.vbotickets.com/event/Redeemed_For_A_Purpose/167873"
  },
  {
    id: 2,
    date: "November 15th, 2025",
    title: "This Event is Coming Soon",
    description: "An exciting new workshop focused on building resilience and overcoming life's challenges. Details coming soon - stay tuned for more information.",
    image: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/coming-soon-letter-hanging-door-600nw-2497993761.webp?alt=media&token=ab00d3a3-6e03-4828-9552-14cb58f298aa",
    isActive: false,
    comingSoon: true,
    url: "#"
  },
  {
    id: 3,
    date: "December 5th, 2025",
    title: "Another Amazing Workshop",
    description: "A special end-of-year workshop designed to help you reflect, reset, and prepare for the new year ahead. Join us for this powerful session of transformation.",
    image: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/coming-soon-letter-hanging-door-600nw-2497993761.webp?alt=media&token=ab00d3a3-6e03-4828-9552-14cb58f298aa",
    isActive: false,
    comingSoon: true,
    url: "#"
  }
];

// Firestore functions for managing workshops
export const getAllWorkshops = async (): Promise<Workshop[]> => {
  try {
    if (isCacheValid() && workshopsCache.length > 0) {
      return workshopsCache;
    }

    const q = query(workshopsCollection, orderBy('id', 'asc'));
    const querySnapshot = await getDocs(q);
    const workshops: Workshop[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      workshops.push(data as Workshop);
    });
    
    workshopsCache = workshops;
    lastFetchTime = Date.now();
    return workshops;
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return workshopsCache; // Return cached data if available
  }
};

export const getWorkshopById = async (id: number): Promise<Workshop | undefined> => {
  try {
    // First check cache
    if (isCacheValid() && workshopsCache.length > 0) {
      return workshopsCache.find(workshop => workshop.id === id);
    }

    // If not in cache, fetch all workshops (they're small in number)
    const workshops = await getAllWorkshops();
    return workshops.find(workshop => workshop.id === id);
  } catch (error) {
    console.error('Error fetching workshop:', error);
    return undefined;
  }
};

export const addWorkshop = async (workshop: Omit<Workshop, 'id'>): Promise<Workshop> => {
  try {
    // Get the next available ID
    const existingWorkshops = await getAllWorkshops();
    const newId = Math.max(...existingWorkshops.map(w => w.id), 0) + 1;
    
    const newWorkshop: Workshop = {
      ...workshop,
      id: newId
    };

    // Create a custom document ID using the workshop ID
    const docRef = doc(workshopsCollection, newId.toString());
    await updateDoc(docRef, newWorkshop as any).catch(async () => {
      // Document doesn't exist, create it
      await addDoc(workshopsCollection, newWorkshop);
    });
    
    // Update cache
    workshopsCache = [newWorkshop, ...workshopsCache];
    
    return newWorkshop;
  } catch (error) {
    console.error('Error adding workshop:', error);
    throw error;
  }
};

export const updateWorkshop = async (updatedWorkshop: Workshop): Promise<Workshop> => {
  try {
    // Find the document with matching ID
    const q = query(workshopsCollection);
    const querySnapshot = await getDocs(q);
    let docId: string | null = null;
    
    querySnapshot.forEach((document) => {
      if (document.data().id === updatedWorkshop.id) {
        docId = document.id;
      }
    });
    
    if (!docId) {
      throw new Error('Workshop not found');
    }
    
    const docRef = doc(firebase.firestore, 'workshops', docId);
    await updateDoc(docRef, updatedWorkshop as any);
    
    // Update cache
    const index = workshopsCache.findIndex(workshop => workshop.id === updatedWorkshop.id);
    if (index !== -1) {
      workshopsCache[index] = updatedWorkshop;
    }
    
    return updatedWorkshop;
  } catch (error) {
    console.error('Error updating workshop:', error);
    throw error;
  }
};

export const deleteWorkshop = async (id: number): Promise<boolean> => {
  try {
    // Find the document with matching ID
    const q = query(workshopsCollection);
    const querySnapshot = await getDocs(q);
    let docId: string | null = null;
    
    querySnapshot.forEach((document) => {
      if (document.data().id === id) {
        docId = document.id;
      }
    });
    
    if (!docId) {
      return false;
    }
    
    const docRef = doc(firebase.firestore, 'workshops', docId);
    await deleteDoc(docRef);
    
    // Update cache
    workshopsCache = workshopsCache.filter(workshop => workshop.id !== id);
    
    return true;
  } catch (error) {
    console.error('Error deleting workshop:', error);
    throw error;
  }
};

export const setWorkshops = (newWorkshops: Workshop[]): void => {
  workshopsCache = [...newWorkshops];
  lastFetchTime = Date.now();
};

// Function to inject initial data into Firestore (for seeding)
export const injectInitialWorkshops = async (): Promise<void> => {
  try {
    console.log('Starting to inject initial workshops...');
    
    for (const workshop of initialWorkshops) {
      // Check if workshop already exists
      const existingWorkshop = await getWorkshopById(workshop.id);
      if (!existingWorkshop) {
        // Create document with custom ID
        const docRef = doc(workshopsCollection, workshop.id.toString());
        await updateDoc(docRef, workshop as any).catch(async () => {
          // Document doesn't exist, create it
          await addDoc(workshopsCollection, workshop);
        });
        console.log(`✅ Injected workshop: ${workshop.title}`);
      } else {
        console.log(`⏭️  Workshop already exists: ${workshop.title}`);
      }
    }
    
    // Clear cache to force refresh
    workshopsCache = [];
    lastFetchTime = 0;
    
    console.log('✨ Initial workshops injection completed!');
  } catch (error) {
    console.error('❌ Error injecting initial workshops:', error);
    throw error;
  }
};

// Export workshops for backward compatibility - now returns async data
export const workshopData = getAllWorkshops();
export const workshops = getAllWorkshops();
