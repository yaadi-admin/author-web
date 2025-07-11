'use client';

import { atom, useAtom, useSetAtom } from 'jotai';
import React, { useEffect, useState, } from 'react';
import { atomWithReset } from 'jotai/utils';
import cn from '@/utils/class-names';
import Footer from './footer';
import Dialog from './story/dialog';

import { dialogueCollection } from '@/config/ref/dialogueCollection';

import Loading from '@/components/ui/loader';
import { currentSession } from '@/config/session';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import firebase from '@/config/firebase.config';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import Preview from './story/preview'

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

interface DialoguesProps {
  document: string;
  data: any;
}


interface DialogueDataProps {
  aigent: string,
  aigentPrompt: string,
  isShown: boolean,
  synthesizerPrompt: string,
  title: string,
}
export default function Dialogues(props: DialoguesProps) {
  const { document, data = {} } = props;
  const { data: template } = dialogueCollection(document) as any;
  const { push } = useRouter();
  const [allDialogues, setDialogues] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [rosetta, setRosetta] = useState(false);
  const { gotoNextStep } = useStepperOne();

  const [intake, setIntake] = useState({} as any);

  const [step] = useAtom(stepperAtomOne);
  const setTotalSteps = useSetAtom(stepOneTotalSteps);

  React.useEffect(() => {
    async function getIntakes() {
      try {
        setIntake({ ...data })
      } catch (error) {
      }
    }
    getIntakes()
  }, [document, data])

  useEffect(() => {
    if (template) {
      const { dialogues = [] } = template;
      const tempArr: any = [];
      if (dialogues.length > 0) {
        dialogues.forEach((d: DialogueDataProps, index: number) => {
          if (d.isShown) {
            tempArr.push({ dialog: d, CustomComponent: Dialog, id: `dialog${index}` });
          }
        })
        tempArr.push({ CustomComponent: Preview })
        setDialogues(tempArr);
        setTotalSteps(tempArr.length);
      }
    }
  }, [template, setTotalSteps])





  const onFinish = async (data: any) => {
    localStorage.setItem('rosettaOutput', data.output)
    gotoNextStep()
    setLoading(false);
  }


  if (intake && Object.keys(intake).length === 0) {
    return (
      <div className="flex justify-center items-center my-auto h-screen"><Loading /></div>
    )
  }
  if (allDialogues.length === 0) return <div className="flex justify-center items-center my-auto h-screen"><Loading /></div>


  const Component = allDialogues[step].CustomComponent;

  return (
    <>
      <div
        className={cn(
          'md:mx-auto 4xs:flex md:grid md:grid-cols-12 4xs:w-full md:w-full'
        )}
        style={{ height: '100%', paddingTop: '', overflowY: 'hidden' }}
      >
        <Component
          dialog={allDialogues[step].dialog}
          setLoading={setLoading}
          isLoading={isLoading}
          isButtonLoading={isButtonLoading}
          setButtonLoading={setButtonLoading}
          rosetta={rosetta}
          setRosetta={setRosetta}
          id={allDialogues[step].id}
          onFinish={onFinish}
          intake={intake}
        />
      </div>
      <Footer isLoading={isLoading} isButtonLoading={isButtonLoading} />
    </>
  );
}
