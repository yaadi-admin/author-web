/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import { currentSession } from '../session';
import axios from 'axios';

export function useListings(listingId: string) {
  const [listings, setListings] = useState([]) as any;

  useEffect(() => {
    if (listingId) {
      const q = query(
        collection(firebase.firestore, "listings"),
        where("id", "==", listingId),
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const dataList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setListings(dataList);
      });
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [listingId]);

  return { data: listings };
};

