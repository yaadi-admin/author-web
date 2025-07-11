'use client';

import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import cn from '@/utils/class-names';
import Footer from './footer';
import StepOne from './introduction/step-1';
import { useMultiStep } from './use-multi-step';
import { currentSuccessionPlan } from '@/config/succession-plan/succession-plan-user';
import { signInWithEmailAndPassword } from 'firebase/auth';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';
import PageHeader from '@/app/shared/page-header';
import Intake from './Intake';


export default function MultiStepFormOne(props: any) {
  const { params } = props;

  const { step, gotoNextStep } = useMultiStep();

  const { currentUser, updateUser } = currentSuccessionPlan() as any;

  useEffect(() => {
    console.log('here');
    if (params) {
      const { code, email } = params;
      const password = code;
      if (code && email) {

        try {
          signInWithEmailAndPassword(firebase.auth, email, password)
            .then((user) => {
              console.log(user);
              if (user) {
                const userDocRef = doc(firebase.firestore, "users", user?.user?.uid) as any;
                const unsubscribeSnapshot = onSnapshot(userDocRef, (snapshot: { exists: () => any; data: () => any; }) => {
                  console.log(snapshot);
                  if (!snapshot.exists()) {
                    // Handle if the user document doesn't exist (create it, if needed)
                  } else {
                    localStorage.setItem('usrdt', JSON.stringify(snapshot.data()));
                  }
                });
                return () => {
                  unsubscribeSnapshot();
                };
              }
            })
            .catch((error) => {
              console.log(error);
            });

        } catch (e) {
        }
      }
    }
  }, [params])

  useEffect(() => {
    if (window.location.href) {
      if (window.location.href?.split('?')?.[1]?.includes('session_id')) {
        updateUser({ payment: true })
      }
    }
  }, [currentUser.id]);


  return (
    <>
      <div
        className={cn(
          'mx-auto grid w-full grid-cols-12 '
        )}
        style={{ height: '100%', paddingTop: '', overflowY: 'hidden' }}
      >
        {step === 1 && <StepOne gotoNextStep={gotoNextStep} />}
        {step === 2 && <div className='w-full col-span-full'>
          <PageHeader title={'Intake Form'} breadcrumb={[]}>
          </PageHeader>
          <Intake />
        </div>}
      </div>
      <Footer />
    </>
  );
}
