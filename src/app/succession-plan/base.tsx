'use client';
import { useEffect, useState } from 'react';
import firebase from '@/config/firebase.config';
import { signOut } from "firebase/auth";
import { routes } from '@/config/routes';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";
import { currentSession } from '@/config/session';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function Base() {
  const currentUser = currentSession() as any;
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        const userDocRef = doc(firebase.firestore, "users", user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (snapshot) => {
          if (!snapshot.exists()) {
            // Handle if the user document doesn't exist (create it, if needed)
            // push(routes.welcome);
          } else {
            const userData = snapshot.data();


            // Fastlane
            if (userData?.role === "seller" && userData?.lite
              && (user.emailVerified || userData.emailVerified === true)
            ) {
              push(routes.seller.dashboard);
            }
            // SellerSpan 
            else if (userData?.role === "seller" && user.emailVerified) {
              push(routes.eCommerce.dashboard);
            }
            if (userData?.role === "buyer" && user.emailVerified) {
              push(routes?.buyer?.dashboard);
            }
            if (userData?.role === "provider" && user.emailVerified) {
              push(routes?.provider?.dashboard);
            }
            if (userData?.role === "admin" && user.emailVerified) {
              push(routes.eCommerce.dashboard);
            }
            if (userData?.role === "advisor" && (user.emailVerified || userData.emailVerified === true)) {
              push(routes.advisor.dashboard);
            }
            if (userData?.role === "broker" && user.emailVerified) {
              if (userData?.type !== "Real Estate") {
                push(routes.broker.dashboard);
              } else {
                push(routes.realEstateBroker.dashboard);
              }
            }
            // if (userData?.role === "representative" && user.emailVerified) {
            //     push(routes?.searchAndFilter?.flight);
            // }
          }
        });

        return () => {
          unsubscribeSnapshot();
        };
      }
      if (user === undefined) {
        push(routes.welcome);
      }
    });
    if (!currentUser?.id) {
      push(routes.client.landingPage);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading && <div>
        <Image
          src={'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/biz-logo.png?alt=media&token=1990b393-0954-4fa4-869b-ecaeed09ba50'}
          width={500}
          height={500}
          style={{ marginLeft: '-20%' }}
          className="object-contain"
          priority
          alt={'load image logo'}
          sizes="(max-width: 480px) 100vw"
        />
      </div>}
    </div>
  );

}
