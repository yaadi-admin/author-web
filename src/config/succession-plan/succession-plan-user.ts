/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import {
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
} from 'firebase/firestore';
// import { currentSession } from '../session';
import { useCurrentSession } from '../succession-session';

export function currentSuccessionPlan() {
    const { session: currentUser } = useCurrentSession()
    // const currentUser = currentSession() as any;

    const [sellerSpan, setSellerSpan] = useState([]) as any;
    const currId = currentUser?.id;

    useEffect(() => {
      if(currId) {
            const userDocRef = doc(firebase.firestore, "succession_plan", currId);
            const unsubscribeSnapshot = onSnapshot(userDocRef, (snapshot) => {
                if (!snapshot.exists()) {
                    // Handle if the user document doesn't exist (create it, if needed)
                } else {
                    const cardData = snapshot.data();
                     setSellerSpan(cardData);
                }
            });

            return () => {
                unsubscribeSnapshot();
            }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currId]);

      const updateUser = async (data: any) => {
        if (currentUser) {
            if (firebase && firebase.firestore && currentUser?.id) {
                const docRef = await doc(firebase.firestore, "users", currentUser.id);
                        const existingData = (await getDoc(docRef)).data();
          const onBoarding = { onBoarding: { ...existingData?.onBoarding, ...data } }
          await updateDoc(docRef, onBoarding);
            } else {
                console.error("Firebase is not initialized properly or currentUser.id is undefined");
            }
        } else {
            console.error("currentUser is undefined");
        }
    };
    
    // Return the collection references
    return { data: sellerSpan, updateUser, currentUser };
}