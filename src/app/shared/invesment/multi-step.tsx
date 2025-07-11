'use client';

import { atom, useAtom, useSetAtom } from 'jotai';
import React, { useEffect, useState, } from 'react';
import { atomWithReset } from 'jotai/utils';
import cn from '@/utils/class-names';
import Footer from './footer';
import Dialog from './story/dialog';

import Loading from '@/components/ui/loader';
import { currentSession } from '@/config/session';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import firebase from '@/config/firebase.config';
import { investmentCollection } from '@/config/ref/investmentCollections';

export enum audioStat {
  true,
  false,
}

const Stat = audioStat.true;
export const stepperAtomOne = atomWithReset(0);
export const stepperAudio = atomWithReset<audioStat>(Stat);

export function useStepperOne() {
  const [step, setStep] = useAtom(stepperAtomOne);

  function gotoNextStep() {
    setStep(step + 1);
  }
  function gotoPrevStep() {
    setStep(step > 0 ? step - 1 : step);
  }
  function resetStepper() {
    setStep(0);
  }
  return {
    step,
    setStep,
    resetStepper,
    gotoNextStep,
    gotoPrevStep,
  };
}

export function useStepperAudio() {
  const [audioStatus, setAudioStatus] = useAtom(stepperAudio);


  function enableAudio() {
    setAudioStatus(0);
    console.log('Enabled')
  }

  function disableAudio() {
    setAudioStatus(1);
    console.log('Disabled')
  }

  return {
    audioStatus,
    setAudioStatus,
    enableAudio,
    disableAudio,
  };
}



export const stepOneTotalSteps = atom(0);

export default function MultiStepSeller() {
  const currentUser = currentSession() as any;
  const { investmentSpan } = investmentCollection() as any;
  const template = investmentSpan[0];

  const [allCards, setCards] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [rosetta, setRosetta] = useState(false);

  const [intake, setIntake] = useState({} as any);

  const [step] = useAtom(stepperAtomOne);
  const setTotalSteps = useSetAtom(stepOneTotalSteps);

  React.useEffect(() => {
    async function getIntakes() {
      try {
        const q = query(collection(firebase.firestore, "invest_intakes"), where("userID", "==", currentUser?.id));
        const querySnapshot = await getDocs(q);
        const dataFields = querySnapshot.docs.map(doc => doc.data());
        setIntake(dataFields[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., display error message, retry logic)
      }
    }
    if (currentUser?.id) {
      getIntakes()
    }
  }, [currentUser?.id])


  useEffect(() => {
    if (template) {
      const { dialog1 } = template;
      const tempArr = [];
      if (dialog1.isShown) {
        tempArr.push({ dialog: dialog1, CustomComponent: Dialog, id: 'dialog1' });
      }
      setCards(tempArr);
      setTotalSteps(tempArr.length);
    }
  }, [template, setTotalSteps])

  if (intake && Object.keys(intake).length === 0) {
    return (
      <div className="flex justify-center items-center my-auto h-screen"><Loading /></div>
    )
  }
  if (allCards.length === 0) return <div className="flex justify-center items-center my-auto h-screen"><Loading /></div>

  const Component = allCards[step].CustomComponent;
  return (
    <>
      <div
        className={cn(
          'mx-auto grid w-full grid-cols-12 '
        )}
        style={{ height: '100%', paddingTop: '', overflowY: 'hidden' }}
      >
        <Component
          card={template}
          dialog={allCards[step].dialog}
          setLoading={setLoading}
          isLoading={isLoading}
          isButtonLoading={isButtonLoading}
          setButtonLoading={setButtonLoading}
          // threadId={threadId}
          // setThreadId={setThreadId}
          rosetta={rosetta}
          setRosetta={setRosetta}
          id={allCards[step].id}
          intake={intake}
        />
      </div>
      {/* <Footer isLoading={isLoading} isButtonLoading={isButtonLoading} /> */}
    </>
  );
}
