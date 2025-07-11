/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { whiteLabelsCollections } from '@/config/ref/whiteLabelCollections';
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
import { currentWhiteLabelSession } from './whiteLabelSession';

export function useWhiteLabel(companyId: string, sectionId?: string) {
  const currentUser = currentWhiteLabelSession() as any;
  const [successionPlan, setSuccessionPlan] = useState([]) as any;

  const { whiteLabelsCollections: wLCollections, sections } = whiteLabelsCollections(`${companyId}`) as any;

  const currId = currentUser?.id;


  const searchUserByEmail = async (email: string) => {
    try {
      const usersCollection = collection(firebase.firestore, 'whitelabel_users');
      const q = query(usersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Assuming unique emails
        return userDoc.data();
      } else {
        console.log('No user found with the provided email.');
        return null;
      }
    } catch (error) {
      console.error('Error searching user by email:', error);
      return null;
    }
  };


  const injectCollections = async (email: string) => {
    const user = await searchUserByEmail(email);

    if (user) {
      sections.forEach(async (section: any) => {
        const docRef = doc(
          firebase.firestore,
          'whitelabels',
          user.userId,
          'sections',
          section.id
        );
        await setDoc(docRef, section);
      });
    }

  };

  const addSuccessionPlanSubCollection = async (card: any) => {
    const docRef = doc(
      firebase.firestore,
      'whitelabels',
      currentUser?.id,
      'sections',
      card.id
    );
    await setDoc(docRef, card);
    const response = await getDoc(docRef);
    return response.data();
  };

  useEffect(() => {
    if (sections) {
      Promise.all([fetchSellerSpanData()]).catch((error) => {
        console.error('Error fetching data:', error);
        // Handle error (e.g., display error message, retry logic)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id, sections]);

  const fetchSellerSpanData = async () => {
    // if (!currId) {
    //   console.log('Invalid or missing currentUser id');
    //   return;
    // }

    try {
      // Define the query for the specific 'sellerspan' document
      const sellerspanDocQuery = query(
        collection(firebase.firestore, 'whitelabels'),
        where('id', '==', 'cbx88grbNwNw2Qz2Jv66')
      );

      const sellerspanSnapshot = await getDocs(sellerspanDocQuery);
      if (!sellerspanSnapshot.empty) {
        const sellerspanDoc = sellerspanSnapshot.docs[0]; // assuming unique ids
        const cardsCollectionPath = collection(sellerspanDoc.ref, 'sections');
        const orderedCardsCollectionPath = query(
          cardsCollectionPath,
          orderBy('order', 'asc')
        );
        const cardsSnapshot = await getDocs(orderedCardsCollectionPath);

        const cardsData = [] as any;

        const userCards = [] as any;
        cardsSnapshot.forEach((card) => userCards.push(card.data()));
        const userCardIds = userCards.map((card: { id: any }) => card.id);
        console.log(sections);
        sections.forEach((template: any) => {
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
        const filteredCards = cardsData.filter(
          (d: any) => d.id !== 'SsFWpV4MFm18pzmWw03x'
        );
        console.log(filteredCards)
        setSuccessionPlan(filteredCards);
      } else {
        console.log('No sp document found for the user');
      }
    } catch (error) {
      console.error('Error fetching cards data:', error);
    }
  };

  const refresh = () => {
    fetchSellerSpanData();
  };

  const updateIntake = async (data: any) => {
    if (currentUser.id) {
      const docRef = doc(
        collection(firebase.firestore, 'whitelabels'),
        currentUser?.id
      );
      await updateDoc(docRef, data);
    }
  };

  const findNextStep = (section: string, id: string) => {
    const currentCard = wLCollections
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

  const updateCard = async (cardId: string, data: any) => {
    const docRef = doc(
      firebase.firestore,
      'whitelabels',
      'cbx88grbNwNw2Qz2Jv66',
      'sections',
      cardId
    );
    await updateDoc(docRef, data);
  };

  const getUser = async (id: string) => {
    if (id) {
      const docRef = doc(firebase.firestore, 'users', id);
      return (await getDoc(docRef)).data();
    }
  };

  const updateUser = async (data: any) => {
    if (currentUser.id) {
      const docRef = doc(firebase.firestore, 'users', currentUser.id);
      await updateDoc(docRef, data);
    }
  };

  const getCards = async (clientId: string) => {
    try {
      // Query the whitelabels collection for the given clientId
      const sellerspanDocQuery = query(
        collection(firebase.firestore, 'whitelabels'),
        where('id', '==', clientId)
      );

      // Get the documents matching the query
      const sellerspanSnapshot = await getDocs(sellerspanDocQuery);

      // Check if any documents were found
      if (!sellerspanSnapshot.empty) {
        // Assuming unique ids, get the first document
        const sellerspanDoc = sellerspanSnapshot.docs[0];

        // Get the path to the cards collection
        const cardsCollectionPath = collection(sellerspanDoc.ref, 'cards');

        // Get the cards documents
        const cardsSnapshot = await getDocs(cardsCollectionPath);

        // Extract and return the cards data
        const cards = cardsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return cards
          .sort((a: any, b: any) => a.order - b.order)
          .filter((c) => c.id !== 'iSBGSwWWtwJTx8hFI3vE');
      } else {
        console.log('No succession plan found for the given clientId.');
        return [];
      }
    } catch (error) {
      console.error('Error getting cards:', error);
      throw error;
    }
  };

  const getCard = async (clientId: string, cardId: string) => {
    try {
      // Query the whitelabels collection for the given clientId
      const sellerspanDocQuery = query(
        collection(firebase.firestore, 'whitelabels'),
        where('id', '==', clientId)
      );

      // Get the documents matching the query
      const sellerspanSnapshot = await getDocs(sellerspanDocQuery);

      // Check if any documents were found
      if (!sellerspanSnapshot.empty) {
        // Assuming unique ids, get the first document
        const sellerspanDoc = sellerspanSnapshot.docs[0];

        // Get the path to the cards collection
        const cardsCollectionPath = collection(sellerspanDoc.ref, 'sections');

        // Query the cards collection for the specific order
        const cardQuery = query(cardsCollectionPath, where('id', '==', cardId));

        // Get the card document
        const cardSnapshot = await getDocs(cardQuery);

        // Check if any card documents were found
        if (!cardSnapshot.empty) {
          // Assuming unique order, get the first card document
          const cardDoc = cardSnapshot.docs[0];
          return { id: cardDoc.id, ...cardDoc.data() };
        } else {
          console.log('No card found for the given order.');
          return null;
        }
      } else {
        console.log('No succession plan found for the given clientId.');
        return null;
      }
    } catch (error) {
      console.error('Error getting card:', error);
      throw error;
    }
  };

  return {
    data: successionPlan,
    addSellerSpanSubCollection: addSuccessionPlanSubCollection,
    refresh,
    currentUser,
    updateUser,
    updateIntake,
    getCards,
    getCard,
    findNextStep,
    updateCard,
    injectCollections,
  };
}
