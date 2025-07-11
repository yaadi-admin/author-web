/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import {
  doc,
  onSnapshot,
  collection,
} from 'firebase/firestore';
import { currentSession } from '@/config/session';

export function useSupport() {
  const currentUser = currentSession() as any;

  const [support, setSupport] = useState([]) as any;

  useEffect(() => {
    const supportRef = collection(firebase.firestore, 'support');

    const unsubscribeSnapshot = onSnapshot(supportRef, (snapshot) => {
      const supportData = snapshot.docs.map(doc => doc.data());
      setSupport(supportData);
    });

    return () => {
      unsubscribeSnapshot();
    }
  }, []);

  // Return the collection references
  return { data: support };
}


