/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import {
  doc,
  query,
  collection,
  getDoc,
  getDocs,
  where,
  setDoc,
  orderBy,
  updateDoc,
  addDoc,
} from 'firebase/firestore';
import { currentSession } from '../session';
import { sellerSpanCollection } from '@/config/ref/sellerSpanLiteCollections';

const COLLECTION = 'seller_lite_span';

export function sellerSpanLite() {
  const currentUser = currentSession() as any;

  const [sellerSpan, setSellerSpan] = useState([]) as any;
  const [progress, setProgress] = useState(0);
  const { sellerSpan: sellerspan_collection } = sellerSpanCollection() as any;

  const currId = currentUser?.id;

  useEffect(() => {
    if (sellerspan_collection && currId) {
      Promise.all([fetchSellerSpanData()]).catch((error) => {
        console.error('Error fetching data:', error);
        // Handle error (e.g., display error message, retry logic)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currId, sellerspan_collection]);

  const fetchSellerSpanData = async () => {
    if (!currId) {
      console.log('Invalid or missing currentUser id');
      return;
    }
    try {
      // Define the query for the specific 'sellerspan' document
      const sellerspanDocQuery = query(
        collection(firebase.firestore, COLLECTION),
        where('id', '==', currentUser.id)
      );

      // Execute the query
      const sellerspanSnapshot = await getDocs(sellerspanDocQuery);
      // Check if the document exists and retrieve the 'cards' subcollection
      const sellerspanDoc = sellerspanSnapshot.docs[0]; // assuming unique ids
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
      sellerspan_collection.forEach((template: any) => {
        if (userCardIds.includes(template.id)) {
          const currCard = userCards.find(
            (c: { id: any }) => c.id === template.id
          );
          cardsData.push({
            ...currCard,
            aigent: template.aigent || 'dylan',
            isTemplate: false,
          });
        } else {
          cardsData.push({ ...template, isTemplate: true });
        }
      });
      // Assuming you have a function to handle the fetched data
      setSellerSpan(cardsData);
    } catch (error) {
      console.error('Error fetching cards data:', error);
      // Handle error (e.g., display error message, retry logic)
    }
  };

  const addSellerSpanSubCollection = async (card: any) => {
    console.log("card", card);
    const docRef = doc(
      firebase.firestore,
      COLLECTION,
      currentUser?.id,
      'cards',
      card.id
    );
    await setDoc(docRef, card);
    const response = await getDoc(docRef);
    return response.data();
  };

  const updateSellerSpanSubCollection = async (id: string, data: any) => {
    const docRef = doc(
      firebase.firestore,
      COLLECTION,
      currentUser?.id,
      'cards',
      id
    );
    await updateDoc(docRef, data);
  };

  const getIntake = async () => {
    try {
      const q = query(
        collection(firebase.firestore, 'intakes'),
        where('userID', '==', currentUser?.id)
      );
      const querySnapshot = await getDocs(q);
      const dataFields = querySnapshot.docs.map((doc) => doc.data());
      return dataFields[0];
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    }
  };

  const updateIntake = async (data: any) => {
    const currIntake = await getIntake();
    const docRef = doc(firebase.firestore, 'intakes', currIntake?.id);
    await updateDoc(docRef, data);
  };

  const updateProgress = async (card: {
    tag: string;
    data: string;
    formData: any;
  }) => {
    const progressCollection = collection(firebase.firestore, 'progress');
    const docRef = doc(progressCollection);
    const progressData = {
      userID: currId,
      tag: card.tag,
      data: card.data,
      ...card.formData,
    };
    const progressDocRef = doc(firebase.firestore, COLLECTION, currentUser?.id);
    const progData = (await getDoc(progressDocRef)).data();
    const updatedProgress = progData?.progress + 6.6;
    await updateDoc(progressDocRef, {
      progress: updatedProgress,
    });
    setProgress(updatedProgress);
    await setDoc(docRef, progressData);
  };

  const updateAdvisory = async (advisors: any[]) => {
    const nextAdvisors = advisors.filter(
      (advisor: { name: string }) => advisor.name.trim() !== ''
    );
    const teamDocRef = doc(firebase.firestore, 'team', currentUser?.id);
    await setDoc(teamDocRef, { advisors: nextAdvisors });
  };

  const getProgress = async () => {
    if (currentUser.id) {
      const docRef = doc(firebase.firestore, COLLECTION, currentUser?.id);
      const response = await getDoc(docRef);
      setProgress(response?.data()?.progress || 0);
    }
  };

  const refresh = () => {
    fetchSellerSpanData();
  };

  // Return the collection references
  return {
    data: sellerSpan,
    addSellerSpanSubCollection,
    updateSellerSpanSubCollection,
    refresh,
    progress,
    getProgress,
    updateProgress,
    updateAdvisory,
    updateIntake,
    getIntake,
  };
}
