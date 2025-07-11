/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { currentSession } from '../session';

export function listings(id: string) {
  const currentUser = currentSession() as any;
  const [listings, setListings] = useState([]) as any;

  // Assistants
  useEffect(() => {
    Promise.all([fetchListingsData()]).catch((error) => {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    });
  }, [currentUser?.id, id]);

  // Listings

  const fetchListingsData = async () => {
    try {
      const q = query(
        collection(firebase.firestore, 'listings'),
        where('userID', '==', currentUser.id)
      );
      const querySnapshot = await getDocs(q);

      const dataFields = [] as any;
      querySnapshot.forEach((doc) => {
        dataFields.push({ id: doc.id, ...doc.data() });
      });

      setListings(dataFields);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    }
  };

  return listings;
}
