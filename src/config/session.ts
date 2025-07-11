/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";

export function currentSession() {

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

    return currentUser;
};
