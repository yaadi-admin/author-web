/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import {
  doc,
  onSnapshot,
  query,
  collection,
  getDocs,
  where,
  orderBy,
  getDoc,
} from 'firebase/firestore';
import { currentSession } from '../session';

export function dialogueCollection(document: string) {
  // const currentUser = currentSession() as any;
  const [data, setData] = useState([]) as any;

  useEffect(() => {
    if (document) {
      fetchCollection();
    }
  }, [document]);

  const fetchCollection = async () => {
    try {
      const docRef = doc(firebase.firestore, 'dialogue_collection', document);
      const docSnap = await getDoc(docRef);
      setData(docSnap.data());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return { data };
}
