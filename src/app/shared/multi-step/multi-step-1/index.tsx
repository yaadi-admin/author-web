'use client';

import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect, useState, } from 'react';
import { atomWithReset, atomWithStorage } from 'jotai/utils';
import cn from '@/utils/class-names';
import Footer from '@/app/multi-step/footer';
import StepOne from '@/app/shared/multi-step/multi-step-1/step-1';
import StepTwo from '@/app/shared/multi-step/multi-step-1/step-2';
import StepThree from '@/app/shared/multi-step/multi-step-1/step-3';

import OriginalStepThree from '@/app/shared/multi-step/multi-step-1/original-step3';
import StepFour from '@/app/shared/multi-step/multi-step-1/step-4';
// import StepFive from '@/app/shared/multi-step/multi-step-1/step-5';
import StepFive from './story/step-5';
import StepSix from './story/step-6';
import Advisory from './advisory';
import Checklist from './checklist';
import StepSeven from '@/app/shared/multi-step/multi-step-1/step-6';
// import StepSeven from '@/app/shared/multi-step/multi-step-1/step-7';
import Congratulations from '@/app/shared/multi-step/multi-step-1/congratulations';
import { FileSchema } from '@/utils/validators/common-rules';
import { currentCard } from '@/config/current-card';
import Loading from '@/components/ui/loader';
type FormDataType = {
  propertyType: string;
  placeType: string;
  address: string | undefined;
  lat: number | undefined;
  lng: number | undefined;
  guests: number | undefined;
  bedrooms: number | undefined;
  beds: number | undefined;
  bedroomLock: string;
  guestType: string;
  indoorAmenities: string[] | undefined;
  outdoorAmenities: string[] | undefined;
  propertyName: string;
  propertyDescription: string | undefined;
  priceRange: number[] | undefined;
  photos: FileSchema[] | undefined;
};

export const initialFormData = {
  propertyType: '',
  placeType: '',
  address: '',
  lat: undefined,
  lng: undefined,
  guests: undefined,
  bedrooms: undefined,
  beds: undefined,
  bedroomLock: '',
  guestType: '',
  indoorAmenities: [],
  outdoorAmenities: [],
  propertyName: '',
  propertyDescription: '',
  priceRange: undefined,
  photos: undefined,
};

export const formDataAtom = atomWithStorage<FormDataType>(
  'multiStepForm',
  initialFormData
);

export enum Step {
  StepOne,
  StepTwo,
  OriginalStepThree,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
  StepSeven
}

export enum audioStat {
  true,
  false,
}

const Stat = audioStat.true;
export const stepperAtomOne = atomWithReset<Step>(0);
export const stepperAudio = atomWithReset<audioStat>(Stat);

export function useStepperOne() {
  const totalSteps = useAtomValue(stepOneTotalSteps);
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
    totalSteps,
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
  const card = currentCard() as any;


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
    if (card) {
      const { section1, section2, section3, section4, section5, section6, advisory, checklist } = card;
      const tempArr = [];
      console.log('card', card);
      if (card?.id === 'vVAVR7gZB7eS7UcjfKSQ') {
        if (section1.isShown) {
          tempArr.push({ ...section1, CustomComponent: StepOne });
        }
        if (section2.isShown) {
          tempArr.push({ ...section2, CustomComponent: StepTwo });
        }
        if (section3.isShown) {
          tempArr.push({ ...section3, CustomComponent: OriginalStepThree });
        }
        if (section4.isShown) {
          tempArr.push({ ...section4, CustomComponent: StepFour });
        }
        if (section5.isShown) {
          tempArr.push({ ...section5, CustomComponent: StepFive });
        }
        if (section5.isShown) {
          tempArr.push({ ...section5, CustomComponent: StepSix });
        }
        if (section6.isShown) {
          tempArr.push({ ...section6, CustomComponent: Congratulations });
        }

      } else {
        if (section1.isShown) {
          tempArr.push({ ...section1, CustomComponent: StepOne });
        }
        if (section2.isShown) {
          tempArr.push({ ...section2, CustomComponent: StepTwo });
        }

        if (section3.isShown) {
          tempArr.push({ ...section3, CustomComponent: StepThree });
        }
        if (section4.isShown) {
          tempArr.push({ ...section4, CustomComponent: StepFour });
        }
        if (section5.isShown) {
          tempArr.push({ ...section5, CustomComponent: StepFive });
        }
        if (section5.isShown) {
          tempArr.push({ ...section5, CustomComponent: StepSix });
        }
        if (advisory?.isShown) {
          tempArr.push({ ...advisory, CustomComponent: Advisory });
        }
        if (checklist?.isShown) {
          tempArr.push({ ...checklist, CustomComponent: Checklist });
        }
        if (section6.isShown) {
          tempArr.push({ ...section6, CustomComponent: Congratulations });
        }
      }

      setCards(tempArr);
      setTotalSteps(tempArr.length);
    }
  }, [card])

  console.log(card);

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

