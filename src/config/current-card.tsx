/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";

export function currentCard() {

    const [card, setCard] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const downloadURL = localStorage.getItem('cardData');
            if (downloadURL) {
                const deserializedObject = JSON.parse(downloadURL) as any;
                setCard(deserializedObject);
                clearInterval(interval); // Stop checking once URL is found
            }
        }, 10); // Check every 3 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    return card;
};
