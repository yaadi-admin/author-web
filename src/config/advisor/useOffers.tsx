/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import { currentSession } from '../session';
import axios from 'axios';

export function useUsers(userId: string) {

  const currentUser = currentSession() as any;
  const [offers, setOffers] = useState([]) as any;


  useEffect(() => {
    if (currentUser?.id && userId) {
      const q = query(
        collection(firebase.firestore, "users"),
        where("id", "==", userId),
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const dataList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOffers(dataList);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [currentUser?.id, userId]);


  return { data: offers };
};

