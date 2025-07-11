'use client';

import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { Text, Button } from 'rizzui'
import axios from 'axios';
import Image from 'next/image';
import { GiSoundWaves } from "react-icons/gi";
import { currentSellerSpan } from '@/config/seller/sellerspan-user';
import MessageDetails from './chat/message-details';
import { currentSession } from '@/config/session';
import Frequency from './chat/frequency';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import { PiMicrophoneLight, PiPlayLight, PiStopLight } from 'react-icons/pi';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, query, collection, getDocs, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import { currentCard } from '@/config/current-card';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import { BASE_URL, DYLAN_ID, FINN_ID } from './chat/config';

import {
  formDataAtom,
  useStepperAudio,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import Loader from '@/components/ui/loader';
import { controls } from '@/config/ref/controls';
import {
  rosettaStatusAtom,
} from '@/config/atom';

interface DialogProps {
  setLoading: (val: boolean) => void,
  isLoading: boolean,
  setThreadId: () => void,
  rosetta: boolean,
  setRosetta: (val: boolean) => void,
  threadId: string,
}

import { ThreadEvents } from './chat/types'

export default function Dialog(props: DialogProps) {
  const { setLoading, isLoading = true, threadId, setThreadId, rosetta, setRosetta } = props;
  const currentUser = currentSession() as any;
  const { data } = currentSellerSpan() as any;
  const controlsAdmin = controls()[1] as any;
  const card = currentCard() as any;
  const [audio, setAudio] = useState(null) as any;
  const [getStarted, setGetStarted] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentAssistant, setCurrentAssistant] = useState({});
  const { step, gotoNextStep: goToNext } = useStepperOne();
  const [initialPromptStatus, setInitialPromptStatus] = useState<ThreadEvents | ''>('');
  const [promptStatus, setPromptStatus] = useState<ThreadEvents | ''>('');
  const [isUserSpeaking, setUserSpeaking] = useState<'no' | 'yes' | 'done'>('no');
  const audioRecorder = useAudioRecorder();
  const botAudioRecorder = useAudioRecorder();
  const [isFetchingAssistants, setFetchingAssistants] = useState(false);
  const { frequencyData } = audioRecorder;

  const fetchUserAudio = () => {
    const sellerspanDocRef = doc(firebase.firestore, "sellerspan", currentUser.id);
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
    audioRecorder.handleStopRecording().then(() => {
      fetchUserAudio();
    });
  }

  const gotoNextStep = () => {
    setLoading(false);
    goToNext();
  }


  const onSubmit = (e: any) => {
    setRosetta(true);
    e.preventDefault();
    gotoNextStep();
    // setLoading(true);
  };


  const [currentIndex, setCurrentIndex] = useState(0);
  const [companyTriviaIndex, setCompanyTriviaIndex] = useState(0);

  const randomTrivia = controlsAdmin?.quotes[companyTriviaIndex];

  const processMessages = [
    "Preparing your data...",
    "Removing filler words...",
    "Constructing your story...",
    "Finalizing the details..."
  ];


  useEffect(() => {
    if (isLoading) {

      if (companyTriviaIndex < controlsAdmin?.quotes.length - 1) {
        const timer = setTimeout(() => {
          setCompanyTriviaIndex(companyTriviaIndex + 1);
        }, 12000); // 8 seconds

        // Cleanup the timer
        return () => clearTimeout(timer);
      }
    }
  }, [companyTriviaIndex, isLoading]);

  useEffect(() => {
    if (isLoading) {

      if (currentIndex < processMessages.length - 1) {
        const timer = setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
        }, 8000); // 3 seconds

        // Cleanup the timer
        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, isLoading]);


  useEffect(() => {
    let firstCard = {};
    async function fetchAssistants() {
      setFetchingAssistants(true);
      const response = await axios
        .get(
          `${BASE_URL}/api/assistants`
        )
      const bots = response.data.assistants as any;
      if (bots) {
        if (card.aigent) {
          const aigentObj: any = {
            'dylan': DYLAN_ID,
            'finn': FINN_ID,
          }
          const aigentId = aigentObj[card.aigent];
          const fromDb = bots.find((bot: { id: { dylan: string; finn: string; }; }) => bot.id === aigentId)
          setCurrentAssistant(fromDb);
          firstCard = card;
          setFetchingAssistants(false)
        }
      }
    }
    if (card) {
      if (Object.keys(card).length !== Object.keys(firstCard).length) {
        fetchAssistants()
      }
    }
  }, [card]);

  const assistantImg: any = {
    [DYLAN_ID]: 'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/agent.png?alt=media&token=84eda229-ee0a-428b-9e65-4e23e6ad517b',
    [FINN_ID]: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2F_Finn%20Final%20-%20Transparent%202.png?alt=media&token=a4727af5-a09d-4cc5-afa2-ceaf7887069e'
  };
  const assistantName: any = {
    [DYLAN_ID]: 'Dylan',
    [FINN_ID]: 'Finn'
  };

  if (!card || isFetchingAssistants) return <Loader />

  return (

    <>

      {isLoading && (
        <div className='col-span-full'>
          <div className='w-1/2 flex flex-col gap-10 items-center mx-auto'>
            <h1>{processMessages[currentIndex]}</h1>
            <Loader />
            <div className='mt-10 flex flex-col gap-5'>
              <Text className='font-bold'>Words of Wisdom</Text>
              <h2>{randomTrivia?.label}</h2>
              <Text className='ml-auto'> - {randomTrivia?.by}</Text>
            </div>
          </div>
        </div>
      )
      }

      <form
        id={`rhf-${step.toString()}`}
        onSubmit={onSubmit}
        className='mx-auto grid w-full h-full col-span-full'
        style={{ ...(isLoading && { display: 'none' }), height: 'inherit' }}
      >
        <FormSummary
          cardTitle={card?.section5.title}
          title={card?.section5.title}
          className='ml-10'
          showTitle={false}
          showDescription={false}
          description={card?.section5?.description}
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
                    src={assistantImg[currentAssistant?.id] || 'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/agent.png?alt=media&token=84eda229-ee0a-428b-9e65-4e23e6ad517b'}
                    width={100}
                    height={100}
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
                rosetta={rosetta}
                gotoNextStep={gotoNextStep}
                audioRecorder={audioRecorder}
                question={card?.section5?.title}
                aigentPrompt={card?.section5?.aigentPrompt}
                rosettaPrompt={card?.section5?.rosettaPrompt}
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
                threadId={threadId}
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
                      && <Button onClick={audioRecorder.handleStartRecording} variant='solid' className='z-0 h-14 w-14 rounded-full bg-red absolute animate-ping opacity-100 mt-[12px] '>
                      </Button>
                    }
                    <Button onClick={audioRecorder.handleStartRecording} variant='solid' className='z-50 h-20 w-20 rounded-full bg-red hover:bg-red-600 shadow-2xl'>
                      <PiMicrophoneLight className="h-16 w-16 text-white z-50" />
                    </Button>
                    <p>Click to reply</p>
                  </div>

                }

              </div>
            </div>

          </div>

          <Text className='text-center w-4/5 p-4 m-auto leading-loose' style={{ fontSize: 10 }}>
            Disclaimer: Outputs from the AIgent should not be considered legal, financial, or tax advice and is for informational purposes in your journey and to engage in dialogue to help you make decisions. Our AIgents can make mistakes. Consider checking important information with your advisors or “Hire a Professional“ tab for extra guidance.
          </Text>
        </div >
      </form>
    </>
  );

}
