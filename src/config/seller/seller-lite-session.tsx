'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, getDoc, updateDoc } from "firebase/firestore";

export function useCurrentSession() {
  const [currentUser, setCurrentUser] = useState({}) as any;

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        const userDocRef = doc(firebase.firestore, "users", user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (snapshot) => {
          if (!snapshot.exists()) {
            // Handle if the user document doesn't exist (create it, if needed)
          } else {
            const userData = snapshot.data();
            currentUser !== userData ? setCurrentUser(userData) : null;
          }
        });

        return () => {
          unsubscribeSnapshot();
        };
      }
    });
  }, [currentUser?.id]);



  // const updateUser = async (data: any) => {
  //   if (currentUser.id) {
  //     console.log(`updateUser`, data)
  //     const docRef = doc(firebase.firestore, "users", currentUser.id);
  //     const previousData = (await getDoc(docRef)).data();
  //     await updateDoc(docRef, data)
  //     if (data.onBoarding) {

  //       const updateDocRef = doc(firebase.firestore, "users", currentUser.id);
  //       const updatedData = (await getDoc(updateDocRef)).data();
  //       console.log(previousData, updatedData)
  //       if (Object.keys(previousData?.onBoarding).length !== Object.keys(updatedData?.onBoarding).length) {
  //         updateUserState(updatedData || {});
  //       }
  //     }
  //   }
  // };

  const updateIntake = async (data: any) => {
    if (currentUser.id) {
      const docRef = doc(collection(firebase.firestore, "succession_plan"), currentUser?.id);
      await updateDoc(docRef, data)
    }
  }

  const getIntake = async () => {
    if (currentUser.id) {
      const docRef = doc(collection(firebase.firestore, "succession_plan"), currentUser?.id);
      return (await getDoc(docRef)).data();
    }
  }

  const getUser = async (id: string) => {
    if (id) {
      const docRef = doc(firebase.firestore, "users", id);
      return (await getDoc(docRef)).data();
    }
  };



  return { session: currentUser, getUser, updateIntake, getIntake };
};
