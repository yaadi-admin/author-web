/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where, orderBy } from "firebase/firestore";
import { currentSession } from '../session';

export function controls() {

    const currentUser = currentSession() as any;
    const [adminControls, setAdminControls] = useState([]) as any;

    // Assistants
    useEffect(() => {
        fetchControlsData();
    }, [currentUser?.id]);

    // Controls

    const fetchControlsData = async () => {
        try {
            const q = query(collection(firebase.firestore, "controls"));
            const querySnapshot = await getDocs(q);
            const dataFields = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAdminControls(dataFields);
        } catch (error) {
            console.error('Error fetching controls data:', error);
            // Handle error (e.g., display error message, retry logic)
        }
    };


    return adminControls;
};

