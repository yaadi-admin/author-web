/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, where, orderBy } from "firebase/firestore";
import { currentSession } from '../session';

export function notifications() {

    const currentUser = currentSession() as any;
    const [notifications, setNotifications] = useState<Notification[]>([]);


  
    useEffect(() => {
      if (currentUser?.id) {
          const unsubscribe = fetchNotificationData();
          if(unsubscribe) {
          return () => unsubscribe();
          }
      }
  }, [currentUser?.id]);



    const fetchNotificationData =  () => {
      try {
        const q = query(
          collection(firebase.firestore, "notifications"),
          where("to", "==", currentUser.id)
      );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const dataFields = querySnapshot.docs
                .map(doc => ({id: doc.id, ...doc.data()}));

                setNotifications(dataFields);
        });

        return unsubscribe;
    } catch (error) {
    }

   
    };



    return notifications;
};




export interface Notification {
    id: string
    body?: string
    metadata?: Metadata
    to?: string
    user?: User2
    seenAt?: any
    type?: string
    toUser?: ToUser
    seen?: boolean
    userID?: string
    createdAt?: CreatedAt3
    title?: string
  }
  
  export interface Metadata {
    channel: string
    data: Data
    from: string
  }
  
  export interface Data {
    lastName: string
    avatar: string
    attachments: Attachment[]
    id: string
    markedAsRead: boolean
    channel: string
    userID: string
    status: boolean
    category: string
    firstName: string
    hasAttachments: boolean
    message: string
    to: string
    email: string
    createdAt: CreatedAt
    user: User
    date: Date
    from: string
  }
  
  export interface Attachment {}
  
  export interface CreatedAt {
    seconds: number
    nanoseconds: number
  }
  
  export interface User {
    lastSignIn: string
    isAgreed: boolean
    firstName: string
    role: string
    email: string
    emailVerified: boolean
    lastName: string
    profilePictureURL: string
    id: string
    createdAt: string
    thread: Thread
  }
  
  export interface Thread {
    metadata: Metadata2
    id: string
    created_at: number
    object: string
  }
  
  export interface Metadata2 {}
  
  export interface Date {
    seconds: number
    nanoseconds: number
  }
  
  export interface User2 {
    createdAt: string
    lastName: string
    email: string
    firstName: string
    id: string
    role: string
    isAgreed: boolean
    lastSignIn: string
    emailVerified: boolean
    thread: Thread2
    profilePictureURL: string
  }
  
  export interface Thread2 {
    metadata: Metadata3
    object: string
    created_at: number
    id: string
  }
  
  export interface Metadata3 {}
  
  export interface ToUser {
    firstName: string
    logo: string
    lastName: string
    email: string
    contact: string
    cib: string
    id: string
    linkedIn: string
    category: string
    user: User3
    createdAt: CreatedAt2
    description: string
    province: string
    employeeCount: string
    sellingProposition: string
    representative: string
    dba: string
    userID: string
    expertise: Expertise[]
    website: string
    primaryContact: string
    yearInBusiness: string
  }
  
  export interface User3 {
    createdAt: string
    emailVerified: boolean
    firstName: string
    profilePictureURL: string
    email: string
    role: string
    lastSignIn: string
    isAgreed: boolean
    id: string
    lastName: string
    thread: Thread3
  }
  
  export interface Thread3 {
    metadata: Metadata4
    object: string
    created_at: number
    id: string
  }
  
  export interface Metadata4 {}
  
  export interface CreatedAt2 {
    seconds: number
    nanoseconds: number
  }
  
  export interface Expertise {
    value: boolean
    field: string
  }
  
  export interface CreatedAt3 {
    seconds: number
    nanoseconds: number
  }
  