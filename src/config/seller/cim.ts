/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { cimCollection } from '@/config/ref/cimCollections';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function cim(listingId: string) {
  // const currentUser = currentSession() as any;
  const [cimState, setCimState] = useState([]) as any;
  const [listingCim, setListingCim] = useState(null);

  const cim_collection = cimCollection() as any;

  useEffect(() => {
    if (cim_collection && listingId) {
      Promise.all([fetchCIM()]).catch((error) => {
        console.error('Error fetching data:', error);
        // Handle error (e.g., display error message, retry logic)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId, cim_collection]);

  useEffect(() => {
    async function getListingZ() {
      const listing: any = await getListing(listingId);
      setListingCim(listing);
    }
    getListingZ();
  }, [listingId]);

  const fetchCIM = async () => {
    if (!listingId) {
      console.log('Invalid or missing currentUser id');
      return;
    }
    try {
      const cimDocQuery = query(
        collection(firebase.firestore, 'cim'),
        where('id', '==', listingId)
      );
      const sellerspanSnapshot = await getDocs(cimDocQuery);
      const sellerspanDoc = sellerspanSnapshot.docs[0];
      const cardsCollectionPath = collection(sellerspanDoc.ref, 'cards');
      const orderedCardsCollectionPath = query(
        cardsCollectionPath,
        orderBy('order', 'asc')
      );
      const cardsSnapshot = await getDocs(orderedCardsCollectionPath);

      const cardsData = [] as any;

      const userCards = [] as any;
      cardsSnapshot.forEach((card) => userCards.push(card.data()));
      const userCardIds = userCards.map((card: { id: any }) => card.id);
      cim_collection.forEach((template: any) => {
        if (userCardIds.includes(template.id)) {
          const currCard = userCards.find(
            (c: { id: any }) => c.id === template.id
          );
          cardsData.push({
            ...currCard,
            isTemplate: false,
          });
        } else {
          cardsData.push({ ...template, isTemplate: true });
        }
      });
      setCimState(cardsData);
    } catch (error) {
      console.error('Error fetching cards data:', error);
    }
  };

  const requestCIM = async (data: {
    broker: any;
    seller: any;
    listingId?: any;
  }) => {
    const { listingId, broker, seller } = data;
    const cimListing = doc(firebase.firestore, 'cim', listingId);

    const cimData = {
      id: cimListing.id,
      broker,
      seller,
    };
    await setDoc(cimListing, cimData);
  };

  const buildMyCIM = async (data: {
    listing: any;
    listingId?: any;
    sellerID: string;
  }) => {
    const { listingId, listing, sellerID } = data;
    const cimListing = doc(firebase.firestore, 'cim', listingId);

    const cimData = {
      id: cimListing.id,
      sellerID,
      listing,
    };
    await setDoc(cimListing, cimData);
    const cardsCollectionRef = collection(cimListing, 'cards');

    // Loop through each card in the 'cards' array and add them to the 'cards' collection
    for (const card of cim_collection) {
      const cardDocRef = doc(cardsCollectionRef, card.id); // Automatically generates a unique ID
      await setDoc(cardDocRef, card);
    }
    return cim_collection.filter((c: any) => !c.disabled)[0].id;
  };

  const updateMyCIM = async (data: {
    listingId: string;
    cardId: string;
    params?: any;
  }) => {
    const { listingId, cardId, params = {} } = data;
    // Reference the 'cim' document by listingId
    const cimListingRef = doc(firebase.firestore, 'cim', listingId);

    // Reference the 'cards' collection inside the 'cim' document
    const cardsCollectionRef = collection(cimListingRef, 'cards');

    // Reference the specific card document within the 'cards' collection by cardId
    const cardDocRef = doc(cardsCollectionRef, cardId);

    // Update the card document with the provided data
    await updateDoc(cardDocRef, {
      ...params,
    });
  };

  const getListing = async (listingId: string) => {
    const cardRef = doc(firebase.firestore, 'cim', listingId);
    const cardData = (await getDoc(cardRef)).data();
    return cardData;
  };

  const getMyCIM = async (data: { listingId: string; cardId: string }) => {
    const { listingId, cardId } = data;
    const cardRef = doc(firebase.firestore, 'cim', listingId, 'cards', cardId);
    const cardData = (await getDoc(cardRef)).data();
    return cardData;
  };

  const getIntake = async (sellerId: string) => {
    const q = query(
      collection(firebase.firestore, 'intakes'),
      where('userID', '==', sellerId)
    );
    const querySnapshot = await getDocs(q);

    const dataFields = [] as any;
    querySnapshot.forEach((doc) => {
      dataFields.push({ id: doc.id, ...doc.data() });
    });
    return dataFields[0];
  };

  const getAllCards = async (data: { listingId: string }) => {
    const { listingId } = data;
    const docRef = doc(collection(firebase.firestore, 'cim'), listingId);
    const allCards: any = [];
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`Document ID: ${docSnap.id}`);
      console.log('Document Data:', docSnap.data());

      // Reference to the 'cards' subcollection within the specific document
      const cardsRef = collection(docRef, 'cards');
      const cardsSnapshot = await getDocs(cardsRef);

      cardsSnapshot.forEach((cardDoc) => {
        allCards.push(cardDoc.data());
      });
    } else {
      console.log('No such document!');
    }
    return allCards;
  };

  const findCurrentStep = (id: string) => {
    const currentCard = cim_collection
      .filter((t: any) => !t.disabled)
      .find((c: any) => c.id === id);

    if (!currentCard) return ''; // Return null if the card is not found

    const sections = ['section1', 'section2', 'section3', 'section4']; // List all the sections in order
    for (let i = 0; i < sections.length; i++) {
      const nextSection = sections[i];
      if (currentCard[nextSection]?.isShown) {
        switch (nextSection) {
          case 'section1':
            return 'form';
          case 'section2':
            return 'dialogue';
          case 'section3':
            return 'summary';
          case 'section4':
            return 'congratulations';
          default:
            return nextSection;
        }
      }
    }

    return '';
  };

  const findNextStep = (section: string, id: string) => {
    const currentCard = cim_collection
      .filter((t: any) => !t.disabled)
      .find((c: any) => c.id === id);

    if (!currentCard) return ''; // Return null if the card is not found

    const sections = ['section1', 'section2', 'section3', 'section4']; // List all the sections in order
    const currentIndex = sections.indexOf(section);

    if (currentIndex === -1 || currentIndex === sections.length - 1) {
      return ''; // Return null if the section is not found or it's the last one
    }

    // Start checking from the next section onwards
    for (let i = currentIndex + 1; i < sections.length; i++) {
      const nextSection = sections[i];
      if (currentCard[nextSection]?.isShown) {
        if (nextSection === 'section2') {
          return 'dialogue';
        }
        if (nextSection === 'section3') {
          return 'summary';
        }
        if (nextSection === 'section4') {
          return 'congratulations';
        }
      }
    }

    return ''; // Return null if no subsequent section has `isShown` true
  };

  return {
    data: cimState,
    listingCim,
    getIntake,
    requestCIM,
    buildMyCIM,
    updateMyCIM,
    getListing,
    getAllCards,
    getMyCIM,
    findNextStep,
    findCurrentStep,
  };
}
