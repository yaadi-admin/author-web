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

export function useUsers() {
  const currentUser = currentSession() as any;

  const [users, setUsers] = useState([]) as any;

  useEffect(() => {
    const supportRef = collection(firebase.firestore, 'users');

    const unsubscribeSnapshot = onSnapshot(supportRef, (snapshot) => {
      const supportData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          createdAt: new Date(data.createdAt) // Convert the date string to a Date object
        };
      })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setUsers(supportData);
    });

    return () => {
      unsubscribeSnapshot();
    }
  }, []);

  return { data: users };
}


