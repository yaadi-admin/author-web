/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { currentSession } from '../../session';
import { Server } from 'http';
import axios from 'axios';

export function useIntake() {
  const currentUser = currentSession() as any;
  const fetchIntakeData = async (sellerID: string) => {
    try {
      const q = query(collection(firebase.firestore, "real-estate-intakes"), where("userID", "==", sellerID));
      const querySnapshot = await getDocs(q);
      const dataFields = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return (dataFields[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    }
  };

  const fetchBrokerIntake = async () => {
    try {
      const q = query(collection(firebase.firestore, "real-estate-intakes"), where("userID", "==", currentUser?.id));
      const querySnapshot = await getDocs(q);
      const dataFields = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return (dataFields[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    }
  };



  return { fetchIntakeData, fetchBrokerIntake };
};

