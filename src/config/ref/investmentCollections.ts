/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where, orderBy } from "firebase/firestore";
import { currentSession } from '../session';

export function investmentCollection() {

    const currentUser = currentSession() as any;
    const [investmentSpan, setInvestmentSpan] = useState([]) as any;


    // Assistants
    useEffect(() => {
        fetchInvestmentCollectionData();
    }, [currentUser?.id]);

    // SellerSpan Collection

    const fetchInvestmentCollectionData = async () => {
        try {
            const q = query(collection(firebase.firestore, "investment_collection"));
            const querySnapshot = await getDocs(q);
            const dataFields = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setInvestmentSpan(dataFields);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        }
    };


    return { investmentSpan };
};

