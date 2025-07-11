/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import { successionPlanCollections } from '@/config/ref/successionPlanCollections';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  onSnapshot,
  Unsubscribe,
  Timestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { currentSession } from '../session';
import axios from 'axios';
import { BASE_URL } from 'src/config/bots';

export function successionPlan() {
  const currentUser = currentSession() as any;
  const [successionPlan, setSuccessionPlan] = useState([]) as any;
  const [intake, setIntake] = useState({}) as any;
  const [progress, setProgress] = useState(0);
  const [userIntakeData, setUserIntakeData] = useState({}) as any;

  useEffect(() => {
    async function fetchIntake() {
      const docRef = doc(
        firebase.firestore,
        'succession_plan',
        currentUser?.id
      );
      const response = await getDoc(docRef);
      setIntake(response.data());
    }
    if (currentUser?.id) {
      fetchIntake();
    }
  }, [currentUser?.id]);

  const subscribeToIntakeUpdates = (userId: string) => {
    if (userId) {
      const docRef = doc(firebase.firestore, 'succession_plan', userId);
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          setUserIntakeData(snapshot.data());
        } else {
          console.log('No data available for this user.');
        }
      });

      // Return the unsubscribe function for cleanup
      return unsubscribe;
    }
  };

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;
    if (currentUser?.id) {
      unsubscribe = subscribeToIntakeUpdates(currentUser?.id);
    }

    // Clean up the subscription when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser?.id]);

  const { successionPlan: sp_collection } = successionPlanCollections() as any;

  const currId = currentUser?.id;

  const addSuccessionPlanSubCollection = async (card: any) => {
    const docRef = doc(
      firebase.firestore,
      'succession_plan',
      currentUser?.id,
      'cards',
      card.id
    );
    await setDoc(docRef, card);
    const response = await getDoc(docRef);
    return response.data();
  };

  useEffect(() => {
    if (sp_collection && currId) {
      Promise.all([fetchSellerSpanData()]).catch((error) => {
        console.error('Error fetching data:', error);
        // Handle error (e.g., display error message, retry logic)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currId, sp_collection]);

  const fetchSellerSpanData = async () => {
    if (!currId) {
      console.log('Invalid or missing currentUser id');
      return;
    }

    try {
      // Define the query for the specific 'sellerspan' document
      const sellerspanDocQuery = query(
        collection(firebase.firestore, 'succession_plan'),
        where('id', '==', currentUser?.id)
      );

      const sellerspanSnapshot = await getDocs(sellerspanDocQuery);
      if (!sellerspanSnapshot.empty) {
        const sellerspanDoc = sellerspanSnapshot.docs[0]; // assuming unique ids
        const cardsCollectionPath = collection(sellerspanDoc.ref, 'cards');
        const orderedCardsCollectionPath = query(
          cardsCollectionPath,
          orderBy('order', 'asc')
        );
        const cardsSnapshot = await getDocs(orderedCardsCollectionPath);

        const cardsData = [] as any;

        const userCards = [] as any;
        cardsSnapshot.forEach((card) => userCards.push(card.data()));
        const userCardIds = userCards.map((card: { id: any }) => card.id);
        sp_collection.forEach((template: any) => {
          if (userCardIds.includes(template.id)) {
            const currCard = userCards.find(
              (c: { id: any }) => c.id === template.id
            );
            cardsData.push({
              ...currCard,
              isTemplate: false,
            });
          } else {
            cardsData.push({ ...template, isTemplate: true });
          }
        });
        const filteredCards = cardsData.filter(
          (d: any) => d.id !== 'SsFWpV4MFm18pzmWw03x'
        );
        setSuccessionPlan(filteredCards);
      } else {
        console.log('No sp document found for the user');
      }
    } catch (error) {
      console.error('Error fetching cards data:', error);
    }
  };

  const refresh = () => {
    fetchSellerSpanData();
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

  const findNextStep = (section: string, id: string) => {
    const currentCard = sp_collection
      .filter((t: any) => !t.disabled)
      .find((c: any) => c.id === id);

    if (!currentCard) return ''; // Return null if the card is not found

    const sections = ['section1', 'section2', 'section3', 'section4']; // List all the sections in order
    const currentIndex = sections.indexOf(section);

    if (currentIndex === -1 || currentIndex === sections.length - 1) {
      return ''; // Return null if the section is not found or it's the last one
    }

    // Start checking from the next section onwards
    for (let i = currentIndex + 1; i < sections.length; i++) {
      const nextSection = sections[i];
      if (currentCard[nextSection]?.isShown) {
        if (nextSection === 'section2') {
          return 'dialogue';
        }
        if (nextSection === 'section3') {
          return 'summary';
        }
        if (nextSection === 'section4') {
          return 'congratulations';
        }
      }
    }

    return ''; // Return null if no subsequent section has `isShown` true
  };

  const updateCard = async (cardId: string, data: any) => {
    const docRef = doc(
      firebase.firestore,
      'succession_plan',
      currentUser?.id,
      'cards',
      cardId
    );
    await updateDoc(docRef, data);
  };

  const getUser = async (id: string) => {
    if (id) {
      const docRef = doc(firebase.firestore, 'users', id);
      return (await getDoc(docRef)).data();
    }
  };

  const updateUser = async (data: any) => {
    if (currentUser.id) {
      const docRef = doc(firebase.firestore, 'users', currentUser.id);
      await updateDoc(docRef, data);
    }
  };

  const getCards = async (clientId: string) => {
    try {
      // Query the succession_plan collection for the given clientId
      const sellerspanDocQuery = query(
        collection(firebase.firestore, 'succession_plan'),
        where('id', '==', clientId)
      );

      // Get the documents matching the query
      const sellerspanSnapshot = await getDocs(sellerspanDocQuery);

      // Check if any documents were found
      if (!sellerspanSnapshot.empty) {
        // Assuming unique ids, get the first document
        const sellerspanDoc = sellerspanSnapshot.docs[0];

        // Get the path to the cards collection
        const cardsCollectionPath = collection(sellerspanDoc.ref, 'cards');

        // Get the cards documents
        const cardsSnapshot = await getDocs(cardsCollectionPath);

        // Extract and return the cards data
        const cards = cardsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return cards
          .sort((a: any, b: any) => a.order - b.order)
          .filter((c) => c.id !== 'iSBGSwWWtwJTx8hFI3vE');
      } else {
        console.log('No succession plan found for the given clientId.');
        return [];
      }
    } catch (error) {
      console.error('Error getting cards:', error);
      throw error;
    }
  };

  const getCard = async (clientId: string, cardId: string) => {
    try {
      // Query the succession_plan collection for the given clientId
      const sellerspanDocQuery = query(
        collection(firebase.firestore, 'succession_plan'),
        where('id', '==', clientId)
      );

      // Get the documents matching the query
      const sellerspanSnapshot = await getDocs(sellerspanDocQuery);

      // Check if any documents were found
      if (!sellerspanSnapshot.empty) {
        // Assuming unique ids, get the first document
        const sellerspanDoc = sellerspanSnapshot.docs[0];

        // Get the path to the cards collection
        const cardsCollectionPath = collection(sellerspanDoc.ref, 'cards');

        // Query the cards collection for the specific order
        const cardQuery = query(cardsCollectionPath, where('id', '==', cardId));

        // Get the card document
        const cardSnapshot = await getDocs(cardQuery);

        // Check if any card documents were found
        if (!cardSnapshot.empty) {
          // Assuming unique order, get the first card document
          const cardDoc = cardSnapshot.docs[0];
          return { id: cardDoc.id, ...cardDoc.data() };
        } else {
          console.log('No card found for the given order.');
          return null;
        }
      } else {
        console.log('No succession plan found for the given clientId.');
        return null;
      }
    } catch (error) {
      console.error('Error getting card:', error);
      throw error;
    }
  };

  const updateTaskStatus = async (
    fields: any,
    task: any,
    nextStatus: string
  ) => {
    await axios.post(
      `${BASE_URL}/api/bizbridge/serv/authenticate`,
      {
        function: 'updateActionItems',
        userID: currentUser?.id, // document id of succession_plan user
        title: task.name, // title of the item/task to update
        updatedFields: {
          ownerEmail: fields.email, //... fields to be updated with value
          owner: 'Michael Scott',
          status: nextStatus,
        },
      },
      {
        headers: {
          Authorization: 'skl-bhdbjcbcbcbdjb',
        },
        maxContentLength: Infinity, // This sets the max content length to unlimited
        maxBodyLength: Infinity, // This sets the max body length to unlimited
      }
    );
  };

  // try {
  //   if (currentUser.id) {
  //     const docRef = doc(firebase.firestore, 'succession_plan', currentUser?.id);
  //     const docSnapshot = await getDoc(docRef);
  //     if (docSnapshot.exists()) {
  //       const data = docSnapshot.data();
  //       if (data && data.actionItems) {
  //         const updatedActionItems = data.actionItems.map((item, index) =>
  //           index === taskId ? { ...item, status: newStatus } : item
  //         );
  //         await updateDoc(docRef, { actionItems: updatedActionItems });
  //         alert('Task status updated successfully.');
  //       }
  //     }
  //   }
  // } catch (error) {
  //   console.error('Failed to update task status:', error);
  //   alert('Failed to update task status. Please try again.');
  // }

  const editTask = async (task: any, updatedFields: any) => {
    await axios.post(
      `${BASE_URL}/api/bizbridge/serv/authenticate`,
      {
        function: 'updateActionItems',
        userID: currentUser?.id, // document id of succession_plan user
        title: task.taskName, // title of the item/task to update
        updatedFields: {
          ownerEmail: updatedFields.email, //... fields to be updated with value
          owner: updatedFields.owner,
          status: updatedFields.status,
          startDate: updatedFields.startDate,
          endDate: updatedFields.endDate,
        },
      },
      {
        headers: {
          Authorization: 'skl-bhdbjcbcbcbdjb',
        },
        maxContentLength: Infinity, // This sets the max content length to unlimited
        maxBodyLength: Infinity, // This sets the max body length to unlimited
      }
    );
    // try {
    //   if (currentUser.id) {
    //     const docRef = doc(
    //       firebase.firestore,
    //       'succession_plan',
    //       currentUser?.id
    //     );
    //     const docSnapshot = await getDoc(docRef);
    //     if (docSnapshot.exists()) {
    //       const data = docSnapshot.data();
    //       if (data && data.actionItems) {
    //         const updatedActionItems = data.actionItems.map(
    //           (item: any, index: number) =>
    //             index === taskId ? { ...item, ...updatedFields } : item
    //         );
    //         await updateDoc(docRef, { actionItems: updatedActionItems });
    //         alert('Task updated successfully.');
    //       }
    //     }
    //   }
    // } catch (error) {
    //   console.error('Failed to edit task:', error);
    //   alert('Failed to edit task. Please try again.');
    // }
  };

  const startTask = async (task: any, updatedFields: any) => {
    // const startDateTimestamp = Timestamp.fromMillis(
    //   updatedFields.startDate.getTime()
    // );
    // const endDateTimestamp = Timestamp.fromMillis(
    //   updatedFields.endDate.getTime()
    // );

    await axios.post(
      `${BASE_URL}/api/bizbridge/serv/authenticate`,
      {
        function: 'updateActionItems',
        userID: currentUser?.id, // document id of succession_plan user
        title: task.name, // title of the item/task to update
        updatedFields: {
          ownerEmail: 'info@thenarro.com', //... fields to be updated with value
          owner: updatedFields.owner,
          status: updatedFields.status,
          startDate: updatedFields.startDate,
          endDate: updatedFields.endDate,
        },
      },
      {
        headers: {
          Authorization: 'skl-bhdbjcbcbcbdjb',
        },
        maxContentLength: Infinity, // This sets the max content length to unlimited
        maxBodyLength: Infinity, // This sets the max body length to unlimited
      }
    );

    // try {
    //   if (currentUser.id) {
    //     const docRef = doc(
    //       firebase.firestore,
    //       'succession_plan',
    //       currentUser?.id
    //     );
    //     const docSnapshot = await getDoc(docRef);
    //     if (docSnapshot.exists()) {
    //       const data = docSnapshot.data();
    //       if (data && data.actionItems) {
    //         const updatedActionItems = data.actionItems.map(
    //           (item: any, index: number) =>
    //             index === taskId ? { ...item, ...updatedFields } : item
    //         );
    //         await updateDoc(docRef, { actionItems: updatedActionItems });
    //         alert('Task started successfully!');
    //       }
    //     }
    //   }
    // } catch (error) {
    //   console.error('Error starting task:', error);
    //   alert('Failed to start the task. Please try again.');
    // }
  };

  const addTask = async (taskData: any) => {
    // await axios.post(
    //   'BASE_URL/api/bizbridge/serv/authenticate',
    //   {
    //     function: 'updateActionItems',
    //     userID: currentUser?.id, // document id of succession_plan user
    //     title: taskData.taskName, // title of the item/task to update
    //     updatedFields: {
    //       ownerEmail: 'info@thenarro.com', //... fields to be updated with value
    //       owner: taskData.owner,
    //       status: taskData.status,
    //     },
    //   },
    //   {
    //     headers: {
    //       Authorization: 'skl-bhdbjcbcbcbdjb',
    //     },
    //     maxContentLength: Infinity, // This sets the max content length to unlimited
    //     maxBodyLength: Infinity, // This sets the max body length to unlimited
    //   }
    // );

    try {
      if (currentUser.id) {
        const docRef = doc(
          firebase.firestore,
          'succession_plan',
          currentUser?.id
        );
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const updatedActionItems = data?.actionItems
            ? [...data.actionItems, taskData]
            : [taskData];
          await updateDoc(docRef, { actionItems: updatedActionItems });
          alert('Task added successfully!');
        } else {
          // If the document doesn't exist, create it with the new task
          await setDoc(docRef, { actionItems: [taskData] });
          alert('Task added successfully!');
        }
      }
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add the task. Please try again.');
    }
  };

  return {
    data: successionPlan,
    intake,
    userIntakeData,
    getUser,
    addSellerSpanSubCollection: addSuccessionPlanSubCollection,
    refresh,
    currentUser,
    updateUser,
    updateIntake,
    getCards,
    getCard,
    findNextStep,
    updateCard,
    updateTaskStatus,
    editTask,
    startTask,
    addTask,
  };
}
