/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where, orderBy } from "firebase/firestore";
import { currentSession } from '../session';

export function providerPackage(id: any) {

    const currentUser = currentSession() as any;
    const [packages, setPackages] = useState([]) as any;

    useEffect(() => {
        fetchPackagesData();
    }, [currentUser?.id, id]);

    // Packages

    const fetchPackagesData = async () => {
        try {
            const q = query(collection(firebase.firestore, "packages"));
            const querySnapshot = await getDocs(q);
            const dataFields = querySnapshot.docs.map(doc => doc.data());
            setPackages(dataFields);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        }
    };

    return packages;
};

