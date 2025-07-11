/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";
import { currentSession } from '../session';

export function qualibuy(id: string) {

    const currentUser = currentSession() as any;
    const [qualibuy, setQualibuy] = useState([]) as any;


    // Assistants
    useEffect(() => {
        Promise.all([
            fetchQualibuyData()
        ]).catch(error => {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        });
    }, [currentUser?.id, id]);

    // Qualibuy

    const fetchQualibuyData = async () => {
        try {
            const q = query(
                collection(firebase.firestore, "qualibuy"),
                where("sellerID", "==", currentUser.id)
            );
            const querySnapshot = await getDocs(q);

            const dataFields = [] as any;
            querySnapshot.forEach((doc) => {
                dataFields.push({ id: doc.id, ...doc.data() });
            });

            setQualibuy(dataFields);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        }
    };


    return qualibuy;
};

