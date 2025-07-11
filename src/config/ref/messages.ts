/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";
import { currentSession } from '../session';

export function messages(id: string) {

    const currentUser = currentSession() as any;

    const [messagesData, setMessagesData] = useState([]) as any;


    // Assistants
    useEffect(() => {
        Promise.all([
            fetchMessagesData(),
        ]).catch(error => {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        });
    }, [currentUser?.id, id]);

    // Messages

    const fetchMessagesData = async () => {
        try {
            const q = query(
                collection(firebase.firestore, "messages"),
                where("to", "==", currentUser.id), // where "to" field matches current user's ID
                where("from", "==", currentUser.id) // where "from" field matches current user's ID
            );
            const querySnapshot = await getDocs(q);

            const dataFields = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setMessagesData(dataFields);
        } catch (error) {
            // console.error('Error fetching messages data:', error);
            // Handle error (e.g., display error message, retry logic)
        }
    };


    return messagesData;
};

