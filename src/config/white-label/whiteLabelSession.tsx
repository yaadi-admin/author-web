/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";

interface User {
  uid: string;
  [key: string]: any;
}

export function currentWhiteLabelSession() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeAuth = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        const userDocRefz = doc(firebase.firestore, "users", user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRefz, (snapshot) => {
          console.log('asd', snapshot.exists());
          console.log(snapshot);
          console.log(snapshot.data());
          if (!snapshot.exists()) {
            // Handle if the user document doesn't exist (create it, if needed)
          } else {
            const userData = snapshot.data() as User;
            if (JSON.stringify(currentUser) !== JSON.stringify(userData)) {
              setCurrentUser(userData);
            }
          }
        });

        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [currentUser]);

  return { currentUser };
};