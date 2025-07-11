/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { currentSession } from '../session';

export function successionPlanCollections() {
  const currentUser = currentSession() as any;
  const [loading, setLoading] = useState(false);
  const [successionPlan, setSuccessionPlan] = useState([]) as any;

  useEffect(() => {
    if (currentUser.id) {
      fetchSellerSpanCollectionData();
    }
  }, [currentUser?.id]);

  const fetchSellerSpanCollectionData = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(firebase.firestore, 'successionplan_collection')
        // collection(firebase.firestore, 'succession_plan')
      );
      const querySnapshot = await getDocs(q);
      const dataFields = querySnapshot.docs.map((doc) => doc.data());
      dataFields.sort((a, b) => a.order - b.order);

      setSuccessionPlan(dataFields);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    }
  };

  return { successionPlan, loading };
}
