/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";
import { currentSession } from '../session';

export function currentProvider(id: string) {

    const currentUser = currentSession() as any;
    const [provider, setProvider] = useState({}) as any;

    useEffect(() => {
        Promise.all([
            fetchProviderData()
        ]).catch(error => {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        });
    }, [currentUser?.id, id]);




    // Current Provider
    const fetchProviderData = async () => {
        try {
            const q = query(
                collection(firebase.firestore, "providers"),
                where("id", "==", currentUser?.providerID)
            );
            const querySnapshot = await getDocs(q);

            const dataFields = [] as any;
            querySnapshot.forEach((doc) => {
                dataFields.push({ id: doc.id, ...doc.data() });
            });

            // Assuming you only need one provider, get the first element from dataFields
            // If you expect multiple providers with the same ID, you might need to handle that differently
            setProvider(dataFields[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        }
    };

    // Return the collection references
    return provider;
};

