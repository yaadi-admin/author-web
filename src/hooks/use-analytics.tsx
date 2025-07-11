/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, addDoc, onSnapshot, query, collection, getDocs, orderBy, where, serverTimestamp, setDoc } from "firebase/firestore";
import { currentSession } from '@/config/session';
import { logEvent } from "firebase/analytics";
import { ACTIONS } from '@/config/analyticsEvents';
import { BsGem } from "react-icons/bs";
import { PiPlant, PiShootingStar } from "react-icons/pi";
import { GoRocket } from "react-icons/go";


export { ACTIONS };

export function useAnalytics() {
  const currentUser = currentSession() as any;

  const log = (event: string, extraData: {} = {}) => {
    const analyticsCollection = collection(firebase.firestore, 'analytics');
    const docRef = doc(analyticsCollection);
    setDoc(docRef, {
      userAgent: navigator?.userAgent || null,
      platform: navigator?.platform || null,
      language: navigator?.language || null,
      url: window?.location?.href || null,
      hostname: window?.location?.hostname || null,
      user: currentUser,
      event,
      userId: currentUser?.id || null,
      data: extraData,
    });
  }



  const getCategory = (interest: number, views: number) => {
    if (interest <= 10 && views <= 100) {
      return {
        name: "New",
        icon: <PiPlant size={26} />,
        description: "Ready to welcome interested investors!",
      }; // low interest, low views
    } else if (interest <= 10 && views >= 100) {
      return {
        name: "Popular",
        icon: <GoRocket size={26} />,
        description: "This listing is attracting a lot of attention!",
      }; // low interest, high views
    } else if (interest >= 10 && views <= 100) {
      return {
        name: "Hidden gem",
        icon: <BsGem size={26} />,
        description: "When people find this listing, they want to know more!",
      }; // high interest, low views
    } else if (interest >= 10 && views >= 100) {
      return {
        name: "Super star",
        icon: <PiShootingStar size={26} />,
        description: "Catch it while it lasts, it’s popular with lots of interest!",
      }; // high interest, high views
    }
  };

  const getProductInterests = async (productId: string) => {
    const q = query(collection(firebase.firestore, "analytics"),
      where("data.productId", "==", productId),
      where("event", "==", ACTIONS.MARKETPLACE.IM_INTERESTED_FORM.SUBMIT_BUTTON_CLICK));
    try {
      const querySnapshot = await getDocs(q);
      const count = querySnapshot.size; // The number of matching documents
      return count;
    } catch (e) {
      console.error("Error counting analytics data: ", e);
      return 0;
    }
  };


  const getProductView = async (productId: string) => {
    const q = query(collection(firebase.firestore, "analytics"),
      where("data.productId", "==", productId),
      where("event", "==", ACTIONS.MARKETPLACE.LISTING_LOADED));
    try {
      const querySnapshot = await getDocs(q);
      const count = querySnapshot.size; // The number of matching documents
      return count;
    } catch (e) {
      console.error("Error counting analytics data: ", e);
      return 0;
    }
  };

  const getProductClick = async (productId: string) => {
    const q = query(collection(firebase.firestore, "analytics"),
      where("data.productId", "==", productId),
      where("event", "==", ACTIONS.MARKETPLACE.IM_INTERESTED_BUTTON_CLICK));
    try {
      const querySnapshot = await getDocs(q);
      const count = querySnapshot.size; // The number of matching documents
      return count;
    } catch (e) {
      console.error("Error counting analytics data: ", e);
      return 0;
    }
  };



  return { log, getProductInterests, getProductView, getCategory, getProductClick };
}