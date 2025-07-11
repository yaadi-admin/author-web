/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";
import { currentSession } from '../session';

export function providerPackages(id: string) {

    const currentUser = currentSession() as any;
    const [packages, setPackages] = useState([]) as any;
    const [loading, setLoading] = useState(false);

    // Assistants
    useEffect(() => {
        Promise.all([
            fetchPackagesData()
        ]).catch(error => {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        });
    }, [currentUser?.id, id]);

    // Packages

    const fetchPackagesData = async () => {
        try {
            setLoading(true);
            const q = query(collection(firebase.firestore, "packages"), where("userID", "==", currentUser?.id));
            const querySnapshot = await getDocs(q);

            const dataFields = [] as any;
            querySnapshot.forEach((doc) => {
                dataFields.push({ id: doc.id, ...doc.data() });
            });
            setPackages(dataFields);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        } finally {
            setLoading(false)
        }
    };



    const refresh = async () => {
        await fetchPackagesData();
    };


    // Return the collection references
    return { packages, refresh, loading };
};

