/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, collection, getDocs, orderBy, where, serverTimestamp, setDoc } from "firebase/firestore";
import { currentSession } from '../session';
import toast from 'react-hot-toast';


type User = {
    id: string,
    firstName: string,
    lastName: string,
}
export function chats(userId?: string) {
    const [messages, setMessages] = useState([]) as any;
    const [specificMessages, setSpecificMessage] = useState([]) as any;
    const currentUser = currentSession() as any;

    // Messages
    useEffect(() => {
      if (currentUser?.id) {
          const unsubscribe = fetchData();
          if(unsubscribe) {
          return () => unsubscribe();
          }
      }
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser?.id && userId) {
        const unsubscribe = fetchSpecificData(userId);
        if(unsubscribe) {
        return () => unsubscribe();
        }
    }
}, [currentUser?.id, userId]);

  
  
const fetchSpecificData = (userId: string) => {
  try {
      const q = query(
          collection(firebase.firestore, "chat"),
          where("to", "==", userId),
          orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const dataFields = querySnapshot.docs
              .filter(doc => {
                  const data = doc.data();
                  // Check if the id matches either toID or from
                  return data.toID === currentUser?.id || data.from === currentUser?.id;
              })
              .map(doc => doc.data());

          setSpecificMessage(dataFields);
      });

      return unsubscribe;
  } catch (error) {
  }
};



  const fetchData = () => {
    try {
        const q = query(
            collection(firebase.firestore, "chat"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const dataFields = querySnapshot.docs
                .filter(doc => {
                    const data = doc.data();
                    // Check if the id matches either toID or from
                    return data.toID === currentUser?.id || data.from === currentUser?.id;
                })
                .map(doc => doc.data());

            setMessages(dataFields);
        });

        return unsubscribe;
    } catch (error) {
    }
};


const sendMessage = async (message: string, recipient: User ) => {
    const docRef = doc(collection(firebase.firestore, "chat"));
    const messageRef = doc(collection(firebase.firestore, "messages"));
    // const notificationRef = doc(collection(firebase.firestore, "notifications"));
    const channel = docRef?.id;
    const chatObject = {
      createdAt: serverTimestamp(),
      id: docRef?.id,
      userID: currentUser?.id,
      user: currentUser,
      from: currentUser?.id,
      selected: false,
      channel: channel,
      to: recipient?.id,
      toUser: recipient,
      toID: recipient?.id,
      title: 'Requesting Support',
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      avatar:
        currentUser?.profilePictureURL,
      company: 'NA',
      markedAsRead: false,
      summary:
        message,
      description:
        message,
      date: serverTimestamp(),
      category: 'support',
      hasAttachments: false,
      status: 'Open',
      supportType: 'Chat',
      priority: 'Medium',
      attachments: [
        {}
      ],
    };

    const messageObject = {
      createdAt: serverTimestamp(),
      id: messageRef?.id,
      userID: currentUser?.id,
      user: currentUser,
      from: currentUser?.id,
      channel: channel,
      to: recipient?.id,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      avatar:
        currentUser?.profilePictureURL,
      message:
        message,
      date: serverTimestamp(),
      category: 'open',
      markedAsRead: false,
      hasAttachments: false,
      status: false,
      attachments: [
        {}
      ],
    };
    // const notificationObject = {
    //   createdAt: serverTimestamp(),
    //   id: notificationRef?.id,
    //   userID: currentUser?.id,
    //   user: currentUser,
    //   metadata: {
    //     channel: channel,
    //     from: currentUser?.id,
    //     data: messageObject,
    //   },
    //   seen: false,
    //   title: 'Requesting Support',
    //   body: message,
    //   to: recipient?.id,
    //   seenAt: null,
    //   toUser: recipient,
    //   type: 'support',

    // };
    try {
      await setDoc(docRef, chatObject);
      await setDoc(messageRef, messageObject);
    //   await setDoc(notificationRef, notificationObject);
      toast.success("Message Sent", { position: "bottom-center" });
    }
    catch (error) {
      console.error(error);
      toast.error("Error sending message", { position: "bottom-center" });
    }
  };


    

    return { messages, sendMessage, specificMessages  };

}