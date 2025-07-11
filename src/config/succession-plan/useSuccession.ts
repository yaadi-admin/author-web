'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import {
  doc,
  onSnapshot,
  query,
  collection,
  getDocs,
  where,
  setDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { currentSession } from '../session';

export function useSuccessionPlan() {
  const currentUser = currentSession();

  const updateUser = async (data: any) => {
    if (currentUser.id) {
      const docRef = doc(firebase.firestore, 'users', currentUser.id);
      await updateDoc(docRef, data);
    }
  };

  const updateIntake = async (data: any) => {
    if (currentUser.id) {
      const docRef = doc(
        collection(firebase.firestore, 'succession_plan'),
        currentUser?.id
      );
      await updateDoc(docRef, data);
    }
  };

  const getIntake = async () => {
    if (currentUser.id) {
      const docRef = doc(
        collection(firebase.firestore, 'succession_plan'),
        currentUser?.id
      );
      return (await getDoc(docRef)).data();
    }
  };

  const getUser = async (id: string) => {
    if (id) {
      const docRef = doc(firebase.firestore, 'users', id);
      return (await getDoc(docRef)).data();
    }
  };

  return { session: currentUser, getUser, updateUser, updateIntake, getIntake };
}
