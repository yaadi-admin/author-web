/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import {
    doc,
    onSnapshot,
} from 'firebase/firestore';
import { currentSession } from '../session';

export function currentSellerSpan() {
    const currentUser = currentSession() as any;

    const [sellerSpan, setSellerSpan] = useState([]) as any;
    const currId = currentUser?.id;

    useEffect(() => {
      if(currId) {
            const userDocRef = doc(firebase.firestore, "sellerspan", currId);
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

    // Return the collection references
    return { data: sellerSpan };
}


