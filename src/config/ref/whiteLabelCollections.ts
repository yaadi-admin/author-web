/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { currentSession } from '../session';

export function whiteLabelsCollections(companyId: string) {
  // const currentUser = currentSession() as any;
  const [sections, setSections] = useState([] as any);
  const [whiteLabelsCollection, setWhiteLabelsCollections] = useState(
    []
  ) as any;

  useEffect(() => {
    fetchSellerSpanCollectionData();

    if (companyId) {
      getSections(companyId);
    }
  }, [companyId]);

  const getSections = async (companyId: string) => {
    try {
      // Query the whitelabels collection for the given companyId
      const sellerspanDocQuery = query(
        collection(firebase.firestore, 'whitelabels_collection'),
        where('id', '==', companyId)
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
        const cardQuery = query(cardsCollectionPath);

        // Get the card document
        const cardSnapshot = await getDocs(cardQuery);

        // Check if any card documents were found
        if (!cardSnapshot.empty) {
          // Assuming unique order, get the first card document
          const cardDocs = cardSnapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));
          setSections(cardDocs);
        } else {
          console.log('No card found for the given order.');
          return null;
        }
      } else {
        console.log('No succession plan found for the given companyId.');
        return null;
      }
    } catch (error) {
      console.error('Error getting card:', error);
      throw error;
    }
  };

  const fetchSellerSpanCollectionData = async () => {
    try {
      const q = query(collection(firebase.firestore, 'whitelabels_collection'));
      const querySnapshot = await getDocs(q);
      const dataFields = querySnapshot.docs.map((doc) => doc.data());
      dataFields.sort((a, b) => a.order - b.order);
      setWhiteLabelsCollections(dataFields);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    }
  };

  return { whiteLabelsCollection: whiteLabelsCollection, sections };
}
