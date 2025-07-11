/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { query, collection, getDocs, orderBy } from 'firebase/firestore';
import { currentSession } from '../session';

export function cimCollection() {
  const currentUser = currentSession() as any;
  const [cimCollectionState, setCimCollectionState] = useState([]) as any;

  useEffect(() => {
    fetchSellerSpanCollectionData();
  }, [currentUser?.id]);

  const fetchSellerSpanCollectionData = async () => {
    try {
      const q = query(
        collection(firebase.firestore, 'cimplified_collection'),
        orderBy('order', 'asc')
      );
      const querySnapshot = await getDocs(q);
      const dataFields = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCimCollectionState(dataFields);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return cimCollectionState;
}
