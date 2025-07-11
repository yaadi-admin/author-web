/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";
import { currentSession } from '../session';

export function assistants(id: string) {

    const currentUser = currentSession() as any;

    const [assistant, setAssistant] = useState([]) as any;


    // Assistants
    useEffect(() => {
        Promise.all([
            fetchAssistantData()
        ]).catch(error => {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        });
    }, [currentUser?.id, id]);

    // Providers

    const fetchAssistantData = async () => {
        try {
            const q = query(collection(firebase.firestore, "assistants"));
            const querySnapshot = await getDocs(q);
            const dataFields = querySnapshot.docs.map(doc => doc.data());
            setAssistant(dataFields);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        }
    };


    return assistant;
};

