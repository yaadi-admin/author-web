/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where, orderBy } from "firebase/firestore";
import { currentSession } from '../session';

export function intakes(id: string) {

    const currentUser = currentSession() as any;
    const [intakes, setIntakes] = useState([]) as any;

    useEffect(() => {
      if(id){ 
        fetchPackagesData();
      }
    }, [id]);


    const fetchPackagesData = async () => {
        try {
      
            const q = query(
              collection(firebase.firestore, "intakes"),
              where("userID", "==", id)
          );
          const querySnapshot = await getDocs(q);

          const dataFields = [] as any;
          querySnapshot.forEach((doc) => {
              dataFields.push({ id: doc.id, ...doc.data() });
          });
          setIntakes(dataFields);

        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)
        }
    };

    return intakes;
};

