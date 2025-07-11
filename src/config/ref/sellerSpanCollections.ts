/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where, orderBy } from "firebase/firestore";
import { currentSession } from '../session';

export function sellerSpanCollection() {

    const currentUser = currentSession() as any;
    const [sellerSpan, setSellerSpan] = useState([]) as any;


    // Assistants
    useEffect(() => {
        fetchSellerSpanCollectionData();
    }, [currentUser?.id]);

    // SellerSpan Collection

    const fetchSellerSpanCollectionData = async () => {
        try {
            const q = query(collection(firebase.firestore, "sellerspan_collection"), orderBy("order", "asc"));
            const querySnapshot = await getDocs(q);
            const dataFields = querySnapshot.docs.map(doc => doc.data());
            setSellerSpan(dataFields);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        }
    };


    return sellerSpan;
};

