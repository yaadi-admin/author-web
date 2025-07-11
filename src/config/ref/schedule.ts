/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";
import { currentSession } from '../session';
import { CalendarEvent } from '@/types';

export function schedule() {

    const currentUser = currentSession() as any;

    const [events, setEvents] = useState([]) as any;


    // EVents
    useEffect(() => {
        Promise.all([
            fetchEvents(),
        ]).catch(error => {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        });
    }, [currentUser?.id]);

    // Events

    const fetchEvents = async () => {
        try {
            const q = query(
                collection(firebase.firestore, "events")
            );
            const querySnapshot = await getDocs(q);

            const dataFields = [] as any;
            querySnapshot.forEach((doc) => {
                dataFields.push({ id: doc.id, start: new Date(Date.parse(doc.data().start)), end: new Date(Date.parse(doc.data().end)), ...doc.data() });
            });

            setEvents(dataFields);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        }
    };


    return events;
};

