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
} from 'firebase/firestore';
import { currentSession } from '../session';

export function providerClients(id: string) {
  const currentUser = currentSession() as any;
  const [clients, setClients] = useState([]) as any;

  // Assistants
  useEffect(() => {
    Promise.all([fetchChatData()]).catch((error) => {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    });
  }, [currentUser?.id, id]);

  // Chats
  const fetchChatData = async () => {
    try {
      const q = query(
        collection(firebase.firestore, 'clients'),
        where('providerID', '==', currentUser?.id)
      );
      const querySnapshot = await getDocs(q);

      const dataFields = [] as any;
      querySnapshot.forEach((doc) => {
        dataFields.push({ id: doc.id, ...doc.data() });
      });

      setClients(dataFields);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    }
  };

  // Return the collection references
  return clients;
}
