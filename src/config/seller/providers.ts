/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";
import { currentSession } from '../session';

export function providers(id: string) {

    const currentUser = currentSession() as any;

    const [providers, setProviders] = useState([]) as any;


    // Assistants
    useEffect(() => {
        Promise.all([
            fetchProvidersData()
        ]).catch(error => {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        });
    }, [currentUser?.id, id]);

    // Providers

    const fetchProvidersData = async () => {
        try {
            const q = query(
                collection(firebase.firestore, "providers"),
                where("userID", "==", currentUser.id)
            );
            const querySnapshot = await getDocs(q);

            const dataFields = [] as any;
            querySnapshot.forEach((doc) => {
                dataFields.push({ id: doc.id, ...doc.data() });
            });

            setProviders(dataFields);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        }
    };

    return providers;
};

