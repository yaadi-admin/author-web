/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import firebase from '@/config/firebase.config';
import axios from 'axios';
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { currentSession } from '../session';
import { BASE_URL } from '../bots';

export function useListings(status: string) {

  const currentUser = currentSession() as any;
  const [listings, setListings] = useState([]) as any;


  useEffect(() => {
    if (currentUser?.id && status) {
      const q = query(
        collection(firebase.firestore, "succession_plan"),
        where("advisorID", "==", currentUser.id),
        where("status", "==", status),
      );



      const unsubscribe = onSnapshot(q, (snapshot) => {
        const dataList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setListings(dataList);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [currentUser?.id, status]);

  const getUser = async (id: string) => {
    if (id) {

      const q = query(
        collection(firebase.firestore, "users"),
        where("id", "==", id),
      );
      const querySnapshot = await getDocs(q);

      const dataFields = [] as any;
      querySnapshot.forEach((doc) => {
        dataFields.push({ id: doc.id, ...doc.data() });
      });



      return dataFields?.[0] || {};
    }
  }

  const getIntake = async (id: string) => {
    if (id) {

      const q = query(
        collection(firebase.firestore, "intakes"),
        where("userID", "==", id),
      );
      const querySnapshot = await getDocs(q);

      const dataFields = [] as any;
      querySnapshot.forEach((doc) => {
        dataFields.push({ id: doc.id, ...doc.data() });
      });



      return dataFields?.[0] || {};
    }
  }

  const generateRandomPassword = () => {
    const words = [
      "apple", "banana", "cherry", "date", "fig", "grape", "kiwi",
      "lemon", "mango", "nectarine", "orange", "peach", "quince",
      "raspberry", "strawberry", "tangerine", "watermelon"
    ];

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    // Select a random word from the list
    const randomWordIndex = Math.floor(Math.random() * words.length);
    const word = words[randomWordIndex];

    // Select a random letter from the letters string
    const randomLetterIndex = Math.floor(Math.random() * letters.length);
    const letter = letters[randomLetterIndex];
    // const result = btoa(word + letter).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    return word + letter;
  }

  const promoteToOnboarding = async (oldId: string, data: any) => {
    if (currentUser.id) {
      const password = generateRandomPassword();
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: 'client',
        password: password,
      };
      const response: any = await handleThreadCreate(userData)
      const clientId = response.data.Message;
      // await sendClientEmail(userData, 'onboarding')

      // created user id
      console.log('client Id', clientId);
      // ZBQ0K6yQUKfunb0xG4OeuJ3eHjy2
      const q = query(collection(firebase.firestore, "succession_plan"), where("email", "==", data.email));
      // await deleteDoc(doc(firebase.firestore, "succession_plan", oldId));

      const querySnapshot = await getDocs(q);
      const clientByEmail = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
      // existing succession plan id
      // 0m8nvV3g1i6lhw7LT54N"
      if (clientByEmail) {
        console.log(clientByEmail);
        const clientData = { ...clientByEmail }; // Copy the document data
        const { id, ...nextData } = clientData;
        // Create a new document with the new id
        const newDocRef = doc(collection(firebase.firestore, "succession_plan"), clientId);
        await setDoc(newDocRef, {
          ...nextData,
          advisorID: currentUser.id,
          advisor: currentUser,
          title: data.businessName,
          thumbnail: 'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/placeholder.png?alt=media&token=45670c71-620e-450a-89e5-d90d37a54119',
          description: `Owned by ${data.firstName} ${data.lastName}`,
          createdAt: serverTimestamp(),
          price: {
            original: 0,
            sale: 0,
          },
          ...data,
          id: clientId,
          password: password,
          status: 'onboarding',
        });

        console.log('delete id', id)
        // Delete the old document
        const oldDocRef = doc(firebase.firestore, "succession_plan", id);
        await deleteDoc(oldDocRef);

      }
    }
  }
  const updateStatus = async (id: string, data: any) => {
    const docRef = doc(collection(firebase.firestore, "succession_plan"), id);
    await updateDoc(docRef, { ...data });
  }


  const updateListing = async (id: string, data: any) => {
    const docRef = doc(collection(firebase.firestore, "succession_plan"), id);
    const listingData = (await getDoc(docRef)).data();
    console.log(listingData);
    const existingProgress = listingData?.progress || {}
    await updateDoc(docRef, { progress: { ...existingProgress, ...data } });
  }

  const fetchListings = async (sellerID: string) => {
    try {
      const q = query(
        collection(firebase.firestore, "succession_plan"),
        where("advisorID", "==", currentUser.id),
        where("sellerID", "==", sellerID)
      );
      const querySnapshot = await getDocs(q);

      const dataFields = [] as any;
      querySnapshot.forEach((doc) => {
        dataFields.push({ id: doc.id, ...doc.data() });
      });
      return dataFields?.[0] || [];
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    }
  };


  const addListing = async (data: any) => {
    const nextStatus = data.status === 'Book a discovery meeting' ? 'discovery' : 'onboarding';
    if (data.status === 'Book a discovery meeting') {
      const docRef = doc(collection(firebase.firestore, "succession_plan"));
      await setDoc(docRef, {
        advisor: currentUser,
        advisorID: currentUser.id,
        title: data.businessName,
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/placeholder.png?alt=media&token=45670c71-620e-450a-89e5-d90d37a54119',
        description: `Owned by ${data.firstName} ${data.lastName}`,
        createdAt: serverTimestamp(),
        price: {
          original: 0,
          sale: 0,
        },
        ...data,
        onBoarding: {
          payment: true,
        },
        status: 'discovery',
      })
      const password = generateRandomPassword();
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: 'client',
        password: password,
        clientId: null,
      };
      await sendClientEmail(userData, nextStatus)

    } else if (data.status === 'Send client onboarding') {

      if (currentUser.id) {

        const password = generateRandomPassword();
        const userData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: 'client',
          password: password,
        };
        await sendClientEmail(userData, nextStatus)
        const response: any = await handleThreadCreate(userData)
        const clientId = response.data.Message;
        const docRef = doc(collection(firebase.firestore, "succession_plan"), clientId);
        await setDoc(docRef, {
          id: clientId,
          user: currentUser,
          advisorID: currentUser.id,
          title: data.businessName,
          thumbnail: 'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/placeholder.png?alt=media&token=45670c71-620e-450a-89e5-d90d37a54119',
          description: `Owned by ${data.firstName} ${data.lastName}`,
          createdAt: serverTimestamp(),
          price: {
            original: 0,
            sale: 0,
          },
          ...data,
          status: 'onboarding',
        })



        // await refresh('in-progress')
      }
    }
  }

  // This creates the threads for the user
  const handleThreadCreate = async (data: any) => {
    const Threads = [] as any;
    try {
      const response = await axios.post(`${BASE_URL}/api/threads`)
      const response2 = await axios.post(`${BASE_URL}/api/threads`)
      const response3 = await axios.post(`${BASE_URL}/api/threads`)
      const response4 = await axios.post(`${BASE_URL}/api/threads`)
      Threads.push(response?.data?.thread.id);
      Threads.push(response2?.data?.thread.id);
      Threads.push(response3?.data?.thread.id);
      Threads.push(response4?.data?.thread.id);

    } catch (error) {
      console.error(error);
    } finally {
      if (Threads.length > 2) {
        const url = `${BASE_URL}/api/bizbridge/serv/authenticate`;

        const response = await axios.post(
          url,
          {
            userData: {
              ...data,
              onBoarding: {
                payment: true
              }
            },
            function: 'createNewClient',
            threads: Threads,
          },
          {
            headers: {
              Authorization: 'skl-bhdbjcbcbcbdjb'
            },
          }
        );
        console.log('new user', response)
        return response;
      }
    }
  };


  // This function invokes the creation of the user account
  // const createUser = (userData: any, Threads: any) => {
  //   try {
  //     createUserWithEmailAndPassword(firebase.auth, userData?.email, userData?.password)
  //       .then((userCredential) => {
  //         const user = userCredential.user;
  //         const rand = Math.floor(Math.random() * (2000000 - 100 + 1)) + 100;
  //         // const storageRef = ref(firebase.storage, `documents/${`audio_` + rand}.mp3`);
  //         // uploadBytes(storageRef, audioBuffer).then((snapshot) => {
  //         //   getDownloadURL(storageRef).then((downloadURL) => {
  //         const userObject = {
  //           createdAt: user.metadata.creationTime,
  //           lastSignIn: user.metadata.lastSignInTime,
  //           emailVerified: user.emailVerified,
  //           phone: "+1",
  //           id: user.uid,
  //           firstName: userData?.firstName,
  //           lastName: userData?.lastName,
  //           email: userData?.email,
  //           profilePictureURL: "https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/icons8-circled-user-male-skin-type-3-80.png?alt=media&token=2d8caf0c-191b-4399-83cb-4eea25d76efd",
  //           role: userData?.role,
  //           isAgreed: true,
  //           audioURL: '',
  //           subscribedToNewsletter: false,
  //           thread: Threads,
  //           lite: true,
  //           sellerID: userData?.listingId
  //         };
  //         try {

  //           setDoc(doc(firebase.firestore, "users", user?.uid), userObject).then(() => {
  //             if (userData?.role == 'seller') {
  //               setDoc(doc(firebase.firestore, "sellerspan", user?.uid), {
  //                 id: user?.uid,
  //                 createdAt: serverTimestamp(),
  //                 progress: 0,
  //               }).then(() => {
  //                 console.log(`${userData?.firstName}, sellerSpan created!`);
  //               });

  //               setDoc(doc(firebase.firestore, "seller_lite_span", user?.uid), {
  //                 id: user?.uid,
  //                 createdAt: serverTimestamp(),
  //                 progress: 0,
  //               }).then(() => {
  //                 console.log(`${userData?.firstName}, sellerSpanLite created!`);
  //               });
  //               const listingRef = doc(collection(firebase.firestore, "listings", userData?.listingId));

  //               updateDoc(listingRef, {
  //                 sellerID: user?.uid,
  //               });

  //               // updateData(user);
  //             }
  //             emailVerification(user);
  //             // logOut();
  //             console.log(`Welcome ${userData?.firstName}, account registered!`);
  //           });
  //         } catch (e) {
  //           console.log("Error creating account", {
  //             position: "bottom-center",
  //           });
  //           console.error("Error creating account: ", e);
  //         }
  //         //   });
  //         // });

  //       })
  //       .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         console.log(errorMessage + ' ' + errorCode);
  //       });
  //   }
  //   catch (error) {
  //     console.error('');
  //   }
  //   finally {
  //   }
  // }

  // This creates their seller lite span collection
  // const updateData = async (user: any) => {
  //   try {
  //     const sellerSpanCollectionQuery = collection(firebase.firestore, "seller_lite_span_collection");
  //     const sellerSpanCollectionSnapshot = await getDocs(sellerSpanCollectionQuery);

  //     sellerSpanCollectionSnapshot.forEach(async (docSnapshot) => {
  //       try {
  //         const docRef = doc(firebase.firestore, "seller_lite_span", user?.uid, "cards", `${docSnapshot.data()?.id}`);
  //         await setDoc(docRef, docSnapshot.data());
  //         console.log(`Document ${docSnapshot.id} updated successfully.`);
  //       } catch (error) {
  //         console.error(`Error updating document ${docSnapshot.id}:`, error);
  //       }
  //     });

  //     console.log("All documents updated successfully.");
  //   } catch (error) {
  //     console.error('Error updating documents:', error);
  //   }
  // };

  // This sends the email verification to the user after the account is created
  // const emailVerification = (user: any) => {
  //   sendEmailVerification(user)
  //     .then(() => {
  //       console.log('Verification Email sent');
  //     })
  //     .catch((error) => {
  //       console.log("An error occurred while sending verification email: ", error);
  //     });
  // }

  const sendClientEmail = async (data: any, status: string) => {
    if (currentUser.id) {
      const docRef = doc(collection(firebase.firestore, "client_request"));
      await setDoc(docRef, {
        id: docRef.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        calendly: currentUser?.calendly || '',
        requestedById: currentUser.id,
        status,
        createdAt: serverTimestamp(),
        advisor: currentUser,
        advisorID: currentUser.id,
        user: data,
      })
    }
  }


  // const refresh = async (status: string) => {
  //   await fetchListingsData(status);
  // }




  return { data: listings, addListing, updateListing, fetchListings, updateStatus, getIntake, promoteToOnboarding };
};

