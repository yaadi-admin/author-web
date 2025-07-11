/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import { currentSession } from '../session';
import axios from 'axios';
import { BASE_URL } from '../bots';

export function useListings(status: string) {
  const currentUser = currentSession() as any;
  const [listings, setListings] = useState([]) as any;

  useEffect(() => {
    if (currentUser?.id && status) {
      const q = query(
        collection(firebase.firestore, "listings"),
        where("sellerID", "==", currentUser?.id),
        where("status", "==", status),
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
  }, [currentUser?.id, status]);

  const getIntake = async (id: string) => {
    try {
      const q = query(
        collection(firebase.firestore, "intakes"),
        where("userID", "==", id),
      );
      const querySnapshot = await getDocs(q);

      const dataFields = [] as any;
      querySnapshot.forEach((doc) => {
        dataFields.push({ id: doc.id, ...doc.data() });
      });
      return dataFields?.[0] || {};
    } catch (error) {
      console.error('Error fetching intake data:', error);
      return {};
    }
  };

  const updateStatus = async (id: string, data: any) => {
    try {
      const docRef = doc(collection(firebase.firestore, "listings"), id);
      await updateDoc(docRef, { ...data });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updateListing = async (id: string, data: any) => {
    try {
      const docRef = doc(collection(firebase.firestore, "listings"), id);
      const listingData = (await getDoc(docRef)).data();
      const existingProgress = listingData?.progress || {};
      await updateDoc(docRef, { progress: { ...existingProgress, ...data } });
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  const fetchBySellerEmail = async (sellerEmail: string) => {
    try {
      const q = query(
        collection(firebase.firestore, "listings"),
        where("email", "==", sellerEmail)
      );
      const querySnapshot = await getDocs(q);

      const dataFields = [] as any;
      querySnapshot.forEach((doc) => {
        dataFields.push({ id: doc.id, ...doc.data() });
      });
      return dataFields?.[0] || [];
    } catch (error) {
      console.error('Error fetching data by seller email:', error);
      return [];
    }
  };

  const fetchListings = async (sellerID: string) => {
    try {
      const q = query(
        collection(firebase.firestore, "listings"),
        where("brokerID", "==", currentUser.id),
        where("sellerID", "==", sellerID)
      );
      const querySnapshot = await getDocs(q);

      const dataFields = [] as any;
      querySnapshot.forEach((doc) => {
        dataFields.push({ id: doc.id, ...doc.data() });
      });
      return dataFields?.[0] || [];
    } catch (error) {
      console.error('Error fetching listings:', error);
      return [];
    }
  };

  const addListing = async (data: any) => {
    if (currentUser.id) {
      try {
        const docRef = doc(collection(firebase.firestore, "listings"));
        await setDoc(docRef, {
          user: currentUser,
          brokerID: currentUser.id,
          title: data.businessName,
          thumbnail: 'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/placeholder.png?alt=media&token=45670c71-620e-450a-89e5-d90d37a54119',
          description: `Owned by ${data.firstName} ${data.lastName}`,
          status: 'pending',
          createdAt: serverTimestamp(),
          price: {
            original: 0,
            sale: 0,
          },
          ...data,
        });
        const listingId = docRef.id;

        const words = [
          "apple", "banana", "cherry", "date", "fig", "grape", "kiwi",
          "lemon", "mango", "nectarine", "orange", "peach", "quince",
          "raspberry", "strawberry", "tangerine", "watermelon"
        ];

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const randomWordIndex = Math.floor(Math.random() * words.length);
        const word = words[randomWordIndex];
        const randomLetterIndex = Math.floor(Math.random() * letters.length);
        const letter = letters[randomLetterIndex];
        const result = btoa(word + letter).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

        const userData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: 'seller',
          password: result,
          listingId,
        };

        await sendClientEmail(userData);
        await handleThreadCreate(userData);
      } catch (error) {
        console.error('Error adding listing:', error);
      }
    }
  };

  const addNewListing = async (data: any) => {
    try {
      const brokerRef = doc(collection(firebase.firestore, "users"), "UjOrNoEjcLTCxnprG1lqSn5EW622");
      const brokerData = (await getDoc(brokerRef)).data();
      if (data.companyName && currentUser && brokerRef) {
        const docRef = doc(collection(firebase.firestore, "listings"));
        await setDoc(docRef, {
          user: currentUser,
          broker: brokerData,
          brokerID: brokerRef?.id,
          sellerID: currentUser?.id,
          id: docRef?.id,
          title: data?.companyName,
          thumbnail: 'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/placeholder.png?alt=media&token=45670c71-620e-450a-89e5-d90d37a54119',
          description: `Owned by ${currentUser.firstName} ${currentUser.lastName}`,
          status: 'pending',
          createdAt: serverTimestamp(),
          price: {
            original: 0,
            sale: 0,
          },
          ...data,
        });
      }
    } catch (error) {
      console.error('Error adding new listing:', error);
    }
  };

  const handleThreadCreate = async (data: any) => {
    const Threads = [] as any;
    try {
      const responses = await Promise.all([
        axios.post(`${BASE_URL}/api/threads`),
        axios.post(`${BASE_URL}/api/threads`),
        axios.post(`${BASE_URL}/api/threads`),
        axios.post(`${BASE_URL}/api/threads`)
      ]);
      responses.forEach(response => {
        Threads.push(response?.data?.thread.id);
      });
    } catch (error) {
      console.error('Error creating threads:', error);
    } finally {
      if (Threads.length > 2) {
        const url = `${BASE_URL}/api/bizbridge/serv/authenticate`;
        try {
          await axios.post(
            url,
            {
              userData: { ...data },
              function: 'createNewUser',
              threads: Threads,
            },
            {
              headers: {
                Authorization: 'skl-bhdbjcbcbcbdjb'
              },
            }
          );
        } catch (error) {
          console.error('Error authenticating user:', error);
        }
      }
    }
  };

  const sendClientEmail = async (data: any) => {
    if (currentUser.id) {
      try {
        const docRef = doc(collection(firebase.firestore, "client_request"));
        await setDoc(docRef, {
          id: docRef.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          requestedById: currentUser.id,
          createdAt: serverTimestamp(),
          user: currentUser,
        });
      } catch (error) {
        console.error('Error sending client email:', error);
      }
    }
  };

  return { data: listings, addListing, updateListing, fetchListings, fetchBySellerEmail, updateStatus, getIntake, addNewListing };
};

