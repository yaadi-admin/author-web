/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import { currentSession } from '../session';
import axios from 'axios';

export function useOffers(listingID: string) {

  const currentUser = currentSession() as any;
  const [offers, setOffers] = useState([]) as any;


  useEffect(() => {
    if (currentUser?.id && listingID) {
      const q = query(
        collection(firebase.firestore, "offers"),
        where("listingID", "==", listingID),
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
  }, [currentUser?.id, listingID]);


  return { data: offers };
};

