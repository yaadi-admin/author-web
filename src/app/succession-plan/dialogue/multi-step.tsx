'use client';

import { atom, useAtom, useSetAtom } from 'jotai';
import React, { useEffect, useState, } from 'react';
import { atomWithReset } from 'jotai/utils';
import cn from '@/utils/class-names';
import Footer from '@/app/multi-step/footer';
import StepTwo from './step-2';
import StepThree from './story/dialog';
import { successionPlanCollections } from '@/config/ref/successionPlanCollections';

import Loading from '@/components/ui/loader';

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

export default function MultiStepFormOne() {
  const { successionPlan } = successionPlanCollections() as any;

  const template = successionPlan[0];

  const [allCards, setCards] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);
  const [rosetta, setRosetta] = useState(false);
  const [threadId, setThreadId] = useState('');


  const [step] = useAtom(stepperAtomOne);
  const setTotalSteps = useSetAtom(stepOneTotalSteps);

  useEffect(() => {
    setLoading(false);
  }, [])

  useEffect(() => {
    if (template) {
      const { section2, section3 } = template;
      const tempArr = [];
      const { dialog1 } = section3;
      if (section2.isShown) {
        tempArr.push({ ...section2, CustomComponent: StepTwo });
      }
      if (section3.isShown && dialog1.isShown) {
        tempArr.push({ ...section3, CustomComponent: StepThree });
      }

      setCards(tempArr);
      console.log(tempArr);
      setTotalSteps(tempArr.length);
    }
  }, [template])


  if (allCards.length === 0) return <Loading />

  const Component = allCards[step].CustomComponent;


  return (
    <>
      <div
        className={cn(
          'mx-auto grid w-full grid-cols-12 place-content-center gap-5 px-5'
        )}
        style={{ height: 'calc(100vh - 100px)', paddingTop: '70px', overflowY: 'auto' }}
      >
        <Component
          card={template}
          setLoading={setLoading}
          isLoading={isLoading}
          threadId={threadId}
          setThreadId={setThreadId}
          rosetta={rosetta}
          setRosetta={setRosetta}
        />
      </div>
      <Footer isLoading={isLoading} />
    </>
  );
}

// const updateData = async () => {
//   const docRef = doc(firebase.firestore, "sellerspan", 'TXpu590EVtg5JCU3r3ANeD80Ohy2', "cards", `2`);
//     await setDoc(docRef, {
//       ...card
//     });
// }


{/* <Button onClick={updateData}>Send to Brian</Button> */ }

