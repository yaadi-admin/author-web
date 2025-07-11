'use client';

import { useState, useEffect } from 'react';
import { Text, Button, ActionIcon } from 'rizzui'
import axios from 'axios';
import Image from 'next/image';
import { currentSuccessionPlan } from '@/config/succession-plan/succession-plan-user';
import MessageDetails from './message-details';
import { currentSession } from '@/config/session';
import Frequency from './frequency';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import { PiArrowUpLight, PiCheck, PiMicrophoneLight, PiStopLight } from 'react-icons/pi';
import { IoCloseSharp } from "react-icons/io5";

import firebase from '@/config/firebase.config';
import { doc, onSnapshot, } from "firebase/firestore";
import FormSummary from '../../form-summary';
import { useAtomValue } from 'jotai';
import { useCurrentSession } from '@/config/succession-session';


import { assistantName, assistantImg, BASE_URL, JEN_ID, ROSETTA_ID } from '@/config/bots'

import {
  stepOneTotalSteps,
} from '../../multi-step';


import Loader from '@/components/ui/loader';

interface DialogProps {
  setLoading: (val: boolean) => void,
  isLoading: boolean,
  setThreadId: (val: string) => void,
  threadId: string,
  card: any,
  title: string,
  promptMessage: string,
  step: number,
  goToNextStep: () => void,
  id: string,
  intake: any,
  isButtonLoading: boolean,
  setButtonLoading: (val: boolean) => void,
}

import { ThreadEvents } from './types'
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/shared/modal-views/use-modal';

function InfoModalView(props: { titles: string[] }) {
  const { titles } = props;
  const { closeModal } = useModal();

  return (
    <div className="m-auto px-7 pt-6 pb-8">
      <div className="mb-7 flex items-center justify-between">
        <h3>Complete your form</h3>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
        >
          <IoCloseSharp className="h-auto w-6" strokeWidth={1.8} />
        </ActionIcon>
      </div>
      <p className='mb-5'>Go back to these sections and click the       <Button
        variant='solid'
        color="primary"
        size="sm"
        className="ml-auto gap-1"
        rounded="pill"
      >
        Done <PiCheck />
      </Button> button instead of <Button
        variant='flat'
        color="primary"
        size="sm"
        className="ml-auto gap-1"
        rounded="pill"
      >
          Next <PiArrowUpLight className="rotate-90" />
        </Button></p>

      <div className='my-5 '>
        {titles.map((title, index) => <p className="py-2 text-black font-semibold text-md" key={title}>{title}</p>)}
      </div>
      <div className="flex ">
        <Button
          size="md"
          className="col-span-2 mt-4 ml-auto"
          onClick={() => closeModal()}
        >
          I understand
        </Button>
      </div>
    </div>
  );
}

export default function Dialog(props: DialogProps) {
  const totalSteps = useAtomValue(stepOneTotalSteps);
  const { openModal } = useModal();
  const { id, intake, setLoading, isLoading, setButtonLoading, threadId, setThreadId, card, title, promptMessage, step, goToNextStep } = props;
  const currentUser = currentSession() as any;
  const { data, updateUser: updateSuccession } = currentSuccessionPlan() as any;
  const { push } = useRouter();
  const [audio, setAudio] = useState(null) as any;
  const [getStarted, setGetStarted] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentAssistant, setCurrentAssistant] = useState({});
  const [initialPromptStatus, setInitialPromptStatus] = useState<ThreadEvents | ''>('');
  const [promptStatus, setPromptStatus] = useState<ThreadEvents | ''>('');
  const [isUserSpeaking, setUserSpeaking] = useState<'no' | 'yes' | 'done'>('no');
  const audioRecorder = useAudioRecorder();
  const botAudioRecorder = useAudioRecorder();
  const [isFetchingAssistants, setFetchingAssistants] = useState<'no' | 'yes' | 'done'>('no');
  const { frequencyData } = audioRecorder;
  const { getUser, updateUser, session, updateIntake } = useCurrentSession();

  useEffect(() => {
    return () => {
      botAudioRecorder.handleStopRecording();
    }
  }, [])
  const fetchUserAudio = () => {
    const sellerspanDocRef = doc(firebase.firestore, "succession_plan", currentUser.id);
    const unsubscribeSnapshot = onSnapshot(sellerspanDocRef, (snapshot) => {
      if (!snapshot.exists()) {
        // Handle if the user document doesn't exist (create it, if needed)
      } else {
        const userData = snapshot.data();
        if (userData?.chatAudio) {
          if (userData?.chatAudio !== data?.chatAudio) {
            setAudio(userData?.chatAudio);
          }
        }
      }
    });

    return () => {
      unsubscribeSnapshot();
    };
  }


  const handleStopRecording = async () => {
    audioRecorder.handleStopRecording("succession_plan").then(() => {
      fetchUserAudio();
    });
  }



  function replacePlaceholders(message: string, data: { [key: string]: any }) {
    return message.replace(/{{(.*?)}}/g, (match, key) => data[key] || '');
  }

  const onNext = async () => {
    await botAudioRecorder.handleStopPlaying()
    goToNextStep();
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(false);
    await botAudioRecorder.handleStopPlaying()


    const submit = async () => {
      if (threadId) {

        let rosettaPrompt = card?.section3?.[id]?.rosettaMessage;
        const leonardoPrompt = card?.section3?.[id]?.leonardoPrompt;

        const nextLeonardoPrompt = (leonardoPrompt || '').trim().length === 0 ? null : leonardoPrompt;
        const documentSP = `document-${step}`;
        await updateIntake({
          [documentSP]: {
            leonardoPrompt: nextLeonardoPrompt,
          }
        })
        await updateSuccession({ [`dialogue-${[step]}`]: true })

        rosettaPrompt = replacePlaceholders(rosettaPrompt, intake);

        axios.post(
          `${BASE_URL}/api/rosetta/succession`,
          {
            promptRosetta: rosettaPrompt || 'Synthesize the response',
            user: currentUser,
            userID: currentUser.id,
            threadId,
            leonardoPrompt: nextLeonardoPrompt,
            documentId: documentSP,
          },
          {
            headers: {
            },
            maxContentLength: Infinity, // This sets the max content length to unlimited
            maxBodyLength: Infinity // This sets the max body length to unlimited
          }
        );
        // const response = await axios.post(
        //   `${BASE_URL}/api/threads/${threadId}/runs/regular?assistantId=${ROSETTA_ID}&threadId=${threadId}`,
        //   {
        //     message: rosettaPrompt || 'Synthesize the response',
        //   }
        // );
        // @ts-ignore
        // const runId = response.data.thread.id;


        const user = await getUser(session?.id);
        const userData = user?.threadRunIds || [];
        const index = userData.findIndex((item: { step: number }) => item.step === step);

        if (index !== -1) {
          userData[index] = { id: threadId, step };
        } else {
          userData.push({ id: threadId, step });
        }

        await updateUser({ threadRunIds: userData });

        if (step === totalSteps - 1) {
          await updateSuccession({ dialogue: true })
          push('/succession-plan/checklist');
        } else {
          goToNextStep();
        }

      }
    }
    if (step === totalSteps) {
      const steps: any[] = [];
      const requiredSteps = [1, 2, 3, 4, 5];
      const user = await getUser(session?.id);
      const userData = user?.threadRunIds || [];
      userData.forEach((r: any) => {
        steps.push(r.step);
      });
      const stepsMissing = requiredSteps.filter(step => !steps.includes(step));
      const titles: string[] = [];
      stepsMissing.forEach((step) => {
        titles.push(`Step ${step}: ${card.section3[`dialog${step}`]?.title}`)
      })
      if (stepsMissing.length) {
        openModal({
          view: <InfoModalView titles={titles} />,
          customSize: '480px',
        })
        return;
      } else {
        submit();
      }
    } else {
      submit();
    }
  };

  useEffect(() => {
    if (isFetchingAssistants === 'done') {
      setGetStarted(true);
    }
  }, [isFetchingAssistants])

  useEffect(() => {
    let firstCard = {};
    async function fetchAssistants() {
      setFetchingAssistants('yes');
      const response = await axios
        .get(
          `${BASE_URL}/api/assistants`
        )
      const bots = response.data.assistants as any;
      if (bots) {
        const fromDb = bots.find((bot: { id: string }) => bot.id === JEN_ID)
        setCurrentAssistant(fromDb);
        firstCard = card;
        setFetchingAssistants('done')
      }
    }
    if (card) {
      if (Object.keys(card).length !== Object.keys(firstCard).length) {
        fetchAssistants()
      }
    }
  }, [card]);


  if (!card || isFetchingAssistants === 'yes') return <div className='flex justify-center items-center my-auto h-screen col-span-full'><Loader /></div>

  return (
    <>
      <form
        id={`rhf-${step.toString()}-next`}
        onSubmit={onNext}
      ></form>
      <form
        id={`rhf-${step.toString()}`}
        onSubmit={onSubmit}
        className='mx-auto grid w-full h-full col-span-full'
        style={{ ...(isLoading && { display: 'none' }), height: 'inherit' }}
      >
        <FormSummary
          cardTitle={title}
          title={title}
          className='ml-10'
          showTitle={false}
          showDescription={false}
          description={''}
        />

        <div className="flex flex-col items-center mb-10">

          <div className='flex flex-row w-[90%] bg-white px-10 border gap-5 justify-between' style={{
            height: 'calc(100vh - 240px)'
          }}>
            <div className='w-[240px] flex flex-col pb-4 box-shadow bg-white pr-12 border-r rounded gap-5'>
              <div className='flex items-center justify-center m-auto relative'>

                <div className='absolute w-[120px] h-[120px] border rounded-full'>
                  <Image
                    //@ts-ignore
                    src={assistantImg[currentAssistant?.id] || 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/jen.jpeg?alt=media&token=a69ffbaf-7314-463f-ab4c-4598830dfa36'}
                    width={400}
                    height={400}
                    alt="assistant-image"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
              <div className={` flex flex-col items-center gap-2`}>
                <h2>{
                  //@ts-ignore
                  assistantName[currentAssistant?.id]
                }</h2>
                <div className='h-32 flex flex-row'>
                  <Frequency frequencyData={botAudioRecorder.frequencyData} bgColor='bg-[#246B94]' />
                </div>


                {botAudioRecorder.isPlaying &&
                  <div className='flex flex-col items-center gap-2'>
                    <Button color='danger'
                      // disabled={}
                      variant='outline' onClick={botAudioRecorder.handleStopPlaying} className='z-50 h-20 w-20 rounded-full  bg-white hover:bg-white-600 shadow-2xl'>
                      <PiStopLight className="h-16 w-16" />
                    </Button>
                    <div>Click to stop</div>
                  </div>
                }


              </div>
            </div>
            <div className='w-[80%]'>
              <MessageDetails
                // @ts-ignore
                assistantId={currentAssistant?.id}
                intake={intake}
                step={step}
                audioRecorder={audioRecorder}
                title={title}
                aigentPrompt={promptMessage}
                audio={audio}
                getStarted={getStarted}
                setGetStarted={setGetStarted}
                handleStopRecording={handleStopRecording}
                botAudioRecorder={botAudioRecorder}
                sending={sending}
                setSending={setSending}
                initialPromptStatus={initialPromptStatus}
                promptStatus={promptStatus}
                setPromptStatus={setPromptStatus}
                setInitialPromptStatus={setInitialPromptStatus}
                isUserSpeaking={isUserSpeaking}
                setUserSpeaking={setUserSpeaking}
                setButtonLoading={setButtonLoading}
                threadId={threadId}
                setLoading={setLoading}
                setThreadId={setThreadId}
              />

            </div>
            <div className='w-[240px] flex flex-col pb-4 box-shadow bg-white pl-12 border-l rounded gap-5'>
              <div className='relative flex items-center justify-center m-auto '>
                <div className='absolute w-[120px] h-[120px] border rounded-full '>
                  <Image
                    src={currentUser.profilePictureURL}
                    width={600}
                    height={600}
                    alt="user profile image"
                    className="w-full h-full object-cover rounded-full "
                  />
                </div>
              </div>

              <div className={`flex flex-col items-center gap-2`}>
                <h2>{currentUser.firstName}</h2>
                <div className='h-32 flex flex-row'>
                  <Frequency frequencyData={frequencyData} bgColor='bg-[#1abc9c]' />
                </div>


                {audioRecorder.isRecording ?
                  <div className='flex flex-col items-center gap-2'>

                    <Button color='danger' variant='outline' onClick={handleStopRecording} className='z-50 h-20 w-20 rounded-full  bg-white hover:bg-white-600 shadow-2xl'>
                      <PiStopLight className="h-16 w-16" />
                    </Button>
                    <div>Click to stop</div>
                  </div>
                  :
                  getStarted && !isLoading &&
                  <div className='flex flex-col items-center gap-2 relative'>

                    {!botAudioRecorder.isPlaying && !audioRecorder.isRecording && !sending &&
                      isUserSpeaking === 'no' &&
                      (initialPromptStatus === ThreadEvents.THREAD_MESSAGE_COMPLETED || promptStatus === ThreadEvents.THREAD_MESSAGE_COMPLETED)
                      && <Button onClick={
                        () => {
                          botAudioRecorder.handleStopPlaying();
                          audioRecorder.handleStartRecording()
                        }
                      } variant='solid' className='z-0 h-14 w-14 rounded-full bg-red absolute animate-ping opacity-100 mt-[12px] '>
                      </Button>
                    }
                    <Button onClick={() => {
                      botAudioRecorder.handleStopPlaying();
                      audioRecorder.handleStartRecording()
                    }} variant='solid' className='z-50 h-20 w-20 rounded-full bg-red hover:bg-red-600 shadow-2xl'>
                      <PiMicrophoneLight className="h-16 w-16 text-white z-50" />
                    </Button>
                    <p>Click to reply</p>
                  </div>

                }

              </div>
            </div>

          </div>

          <Text className='text-center w-4/5 p-4 m-auto leading-regular' style={{ fontSize: 10 }}>
            Disclaimer: Outputs from the AIgent should not be considered legal, financial, or tax advice and is for informational purposes in your journey and to engage in dialogue to help you make decisions. Our AIgents can make mistakes. Consider checking important information with your advisors for extra guidance.
          </Text>
        </div >
      </form>
    </>
  );

}