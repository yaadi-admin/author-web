'use client';

import { useState, useEffect } from 'react';
import { Text, Button, ActionIcon } from 'rizzui'
import axios from 'axios';
import Image from 'next/image';
import MessageDetails from './message-details';
import { currentSession } from '@/config/session';
import Frequency from './frequency';
import { controls } from '@/config/ref/controls';
import { useAudioRecorder as useDemoRecorder } from './useAudioRecorder';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import { PiArrowUpLight, PiCheck, PiMicrophoneLight, PiStopLight } from 'react-icons/pi';
import { IoCloseSharp } from "react-icons/io5";

import firebase from '@/config/firebase.config';
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where, } from "firebase/firestore";
import FormSummary from '../../form-summary';
import { useAtomValue } from 'jotai';


import { assistantName, assistantImg, BASE_URL, DYLAN_ID, ROSETTA_ID } from '@/config/bots'

import {
  stepOneTotalSteps,
} from '../../multi-step';


import Loader from '@/components/ui/loader';

interface DialogueDataProps {
  aigent: string,
  aigentPrompt: string,
  isShown: boolean,
  synthesizerPrompt: string,
  title: string,
}

interface DialogProps {
  intakeSource: string,
  setLoading: (val: boolean) => void,
  isLoading: boolean,
  title: string,

  aigentPrompt: string,
  synthesizerPrompt: string,
  dialog: DialogueDataProps,
  step: number,
  goToNextStep: () => void,
  id: string,
  intake: any,
  onFinish: (data: any) => void,
  isButtonLoading: boolean,
  setButtonLoading: (val: boolean) => void,
}

import { ThreadEvents } from './types'
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { routes } from '@/config/routes';
import { useListings } from '@/config/seller/useListings';
import { unknown } from 'zod';

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
  const { openModal } = useModal();
  const {
    onFinish,
    setLoading,
    isLoading,
    intakeSource,
    setButtonLoading,
    title,
    aigentPrompt,
    dialog,
    synthesizerPrompt,
    step,
    intake,
    goToNextStep
  } = props;
  const [threadId, setThreadId] = useState('');
  const currentUser = currentSession() as any;
  const control = controls() as any;

  const { push } = useRouter();
  const [audio, setAudio] = useState(null) as any;
  const [getStarted, setGetStarted] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentAssistant, setCurrentAssistant] = useState({});
  const [initialPromptStatus, setInitialPromptStatus] = useState<ThreadEvents | ''>('');
  const [promptStatus, setPromptStatus] = useState<ThreadEvents | ''>('');
  const [isUserSpeaking, setUserSpeaking] = useState<'no' | 'yes' | 'done'>('no');
  const audioRecorder = useDemoRecorder();
  const botAudioRecorder = useAudioRecorder();
  const [isFetchingAssistants, setFetchingAssistants] = useState<'no' | 'yes' | 'done'>('no');
  const { frequencyData } = audioRecorder;
  const { fetchBySellerEmail } = useListings('pending');
  useEffect(() => {
    return () => {
      botAudioRecorder.handleStopRecording();
    }
  }, [])




  const handleStopRecording = async () => {
    audioRecorder.handleStopRecording()
      .then(audioBlob => {
        console.log('Audio blob returned:', audioBlob);
        setAudio(audioBlob);
      })
      .catch(error => {
        console.error('Error stopping recording:', error);
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
    setLoading(true);
    await botAudioRecorder.handleStopPlaying()

    const synthesizerPrompt = control[2].rosettaPrompt || `Based on the owner's responses, synthesize a clear and personalized set of recommendations to improve their business’s readiness for sale, incorporating references to Narro’s key tools and services. Do not write "tailored responses" while generating output.
Synthesize the user's response and based on the response give recommendations from below
Specific instructions:
Make sure to inject the name of the owner and company when necessary to in recommendations
Do not summarize the statement in the dialog pertaining to clicking the next button.
Remove phrases like "It sounds like," "I think," or "It seems that."
Do not include prompt questions while generating report
Day-to-Day Role Prompt:
"How would you describe your current role in managing the business? Please select the option that best fits:
I handle everything myself.
I manage the day-to-day operations directly.
I only step in when necessary, staying largely hands-off.
I am not involved at all in daily operations, and the management team runs things."

Recommendation Output Based on Response:
If the user selects handling everything or managing directly:
"Given that you're still heavily involved in daily operations, it might be beneficial to begin transitioning towards a more hands-off role. This not only makes the business more attractive to buyers by showing it can run independently, but it also ensures long-term stability. We recommend using SuccessionBuilder on Narro to create a strong succession plan and prepare your team for the transition, allowing the business to operate without your constant oversight."
If the user selects largely hands-off or not involved:
"Since you're already maintaining a hands-off role, your business is positioned well for potential buyers. To further strengthen its appeal, consider formalizing a succession plan using SuccessionBuilder on Narro. This tool helps solidify leadership transitions and ensures the next generation of management is prepared to lead effectively, adding long-term value to the business."
Administrative Readiness Prompt:
"Do you have all your key administrative documents, such as incorporation papers, financial statements for the past three years, and tax filings, properly organized and easily accessible?"
Recommendation Output Based on Response:
If the user selects No:
"Since your administrative documents are not yet fully organized, it's important to address this as soon as possible. Buyers value businesses with complete and accessible records, and disorganization can lead to delays or complications during the sale. Narro offers access to vetted Professional Services Providers who specialize in M&A transactions. These experts can assist in getting your documentation in order, often at preferred rates, ensuring you're fully prepared for the sale process."
If the user selects Yes:
"Great to hear that your administrative documents are well-organized. This positions you well for a smooth sale process. To further optimize your readiness, consider working with Professional Services Providers through Narro, who can provide expert M&A advice to ensure all necessary paperwork is properly aligned for potential buyers."
Financial Mindset Prompt:
"What has been your financial approach to managing the business?
Primarily focused on minimizing taxes.
Focused on maximizing business value for potential buyers."
Recommendation Output Based on Response:
If the user selects minimizing taxes:
"While minimizing taxes is a smart strategy for day-to-day operations, when preparing for a sale, it's better to shift focus towards maximizing the overall value of your business. Buyers are attracted to businesses with strong profitability and growth potential. We recommend using SellerSpan on Narro, a tool that helps assess your business’s readiness and offers actionable insights to enhance its value before entering the market."
If the user selects maximizing value:
"You're already on the right track by focusing on maximizing your business's value. To further refine this approach, use Narro’s SellerSpan tool. It provides a detailed assessment of your business's readiness for sale and helps identify areas where you can further enhance value, ensuring you get the best possible outcome."`
    const submit = async () => {
      if (threadId) {
        const rosettaPrompt = replacePlaceholders(synthesizerPrompt, intake);

        const response = await axios.post(
          `${BASE_URL}/api/threads/${threadId}/messages`,
          {
            message: rosettaPrompt || 'Synthesize the response',
          }
        );
        if (response) {
          const eventSource = new EventSource(`${BASE_URL}/api/threads/${threadId}/runs/text?assistantId=${ROSETTA_ID}&threadId=${threadId}`);

          eventSource.onmessage = async (event) => {
            const eventData = JSON.parse(event.data) as any;
            if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
              const output = eventData.data.content[0].text.value;
              const dataObj = {
                output: output,
                threadId: threadId,
              }
              await onFinish(dataObj);
            }
          };

          eventSource.onerror = (error) => {
            console.error('EventSource error:', error);
            eventSource.close();
          };

          return () => {
            eventSource.close();
          };
        }


      }
    }
    submit();
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
        const fromDb = bots.find((bot: { id: string }) => bot.id === DYLAN_ID)
        setCurrentAssistant(fromDb);
        firstCard = dialog;
        setFetchingAssistants('done')
      }
    }
    if (dialog) {
      if (Object.keys(dialog).length !== Object.keys(firstCard).length) {
        fetchAssistants()
      }
    }
  }, [dialog]);

  const userSpeaking = isUserSpeaking === 'yes' ? true : false
  const initialBotThinking = initialPromptStatus && (initialPromptStatus !== ThreadEvents.THREAD_MESSAGE_COMPLETED);

  const botThinking = promptStatus && (promptStatus !== ThreadEvents.THREAD_MESSAGE_COMPLETED);



  if (!dialog || isFetchingAssistants === 'yes') return (
    <div className='flex justify-center items-center my-auto h-screen col-span-full'>
      <Loader />
    </div>)

  return (

    <form
      id={`rhf-${step.toString()}`}
      onSubmit={onSubmit}
      className='mx-auto grid w-full h-full col-span-full w-full'
      style={{
        // ...(isLoading && { display: 'none' }),
        height: 'inherit'
      }}
    >
      <FormSummary
        cardTitle={title}
        title={title}
        // className='ml-10'
        showTitle={false}
        showDescription={false}
        description={''}
      />

      <div className="flex items-center mb-10 w-full">

        <div
          className='flex md:mx-auto md:flex-row 4xs:flex-col 4xs:gap-10 4xs:h-full 4xs:w-full md:w-[90%] bg-white px-10 border gap-5 justify-between'

          style={{
            // height: 'calc(100vh - 240px)'
          }}>

          <div className='4xs:h-full 4xs:pt-10 4xs:w-full md:w-[240px] flex flex-col pb-4 box-shadow bg-white 4xs:pr-0 md:pr-12 md:border-r rounded gap-5'>
            <div className='flex items-center justify-center m-auto relative'>

              <div className='4xs:w-40 4xs:h-40  md:w-[120px] md:h-[120px] border rounded-full'>
                <Image
                  //@ts-ignore
                  src={assistantImg[currentAssistant?.id] || 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/jen.jpeg?alt=media&token=a69ffbaf-7314-463f-ab4c-4598830dfa36'}
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
              <div className='4xs:h-12 md:h-32 flex flex-row'>
                <Frequency frequencyData={botAudioRecorder.frequencyData} bgColor='bg-[#246B94]' />
              </div>

              {(initialBotThinking || botThinking) &&
                <div className="4xs:flex md:hidden">
                  <div style={{ marginTop: '5%', marginBottom: '5%' }}>
                    <div style={{
                      backgroundColor: '#246B94',
                      padding: '10px',
                      width: '80px',
                      borderRadius: '20px'
                    }}>
                      <div className="pt-2">
                        <div className="flex justify-center items-center space-x-2">
                          <div className="bubble w-3 h-3 bg-white rounded-full"></div>
                          <div className="bubble w-3 h-3 bg-white rounded-full"></div>
                          <div className="bubble w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        {/* <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-800"></div>
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-1600"></div>
                          </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              }
              {(userSpeaking) &&
                <div className="4xs:flex md:hidden">
                  <div style={{ marginTop: '5%', marginBottom: '5%' }}>
                    <div style={{
                      backgroundColor: '#1abc9c',
                      padding: '10px',
                      width: '80px',
                      borderRadius: '20px'
                    }}>
                      <div className="pt-2">
                        <div className="flex justify-center items-center space-x-2">
                          <div className="bubble w-3 h-3 bg-white rounded-full"></div>
                          <div className="bubble w-3 h-3 bg-white rounded-full"></div>
                          <div className="bubble w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        {/* <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-800"></div>
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-1600"></div>
                          </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              }

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
          <div className='4xs:hidden md:block 4xs:w-full md:w-[80%]'>
            <MessageDetails
              // @ts-ignore
              assistantId={currentAssistant?.id}
              intake={intake}
              step={step}
              audioRecorder={audioRecorder}
              title={title}
              aigentPrompt={aigentPrompt}
              audio={audio}
              getStarted={getStarted}
              setGetStarted={setGetStarted}
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


          <div className=' 4xs:w-1/2 md:w-[240px] 4xs:w-full flex flex-col pb-4 box-shadow bg-white 4xs:pl-0 md:pl-12 md:border-l rounded gap-5'>
            <div className='relative flex items-center justify-center m-auto '>
              <div className='4xs:hidden md:flex 4xs:w-20 4xs:h-20  md:w-[120px] md:h-[120px] border rounded-full '>
                <Image
                  src={currentUser.profilePictureURL || 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fdefault%20photo.jpg?alt=media&token=afb93866-72e9-405a-b15c-74b7575c145c'}
                  width={600}
                  height={600}
                  alt="user profile image"
                  className="w-full h-full object-contain rounded-full "
                />
              </div>
            </div>

            <div className={`flex flex-col items-center gap-2`}>
              <h2 className='4xs:hidden md:flex'>{intake.name}</h2>
              <div className='4xs:hidden md:flex 4xs:16 md:h-32 flex flex-row'>
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
                  {(!botAudioRecorder.isPlaying && initialPromptStatus === 'thread.message.completed') &&
                    <>
                      <Button onClick={() => {
                        botAudioRecorder.handleStopPlaying();
                        audioRecorder.handleStartRecording();
                      }} variant='solid' className='z-50 h-20 w-20 rounded-full bg-red hover:bg-red-600 shadow-2xl'>
                        <PiMicrophoneLight className="h-16 w-16 text-white z-50" />
                      </Button>
                      <p>Click to reply</p>
                    </>
                  }

                </div>

              }

            </div>
          </div>

        </div>

        {/* <Text className='text-center w-4/5 p-4 m-auto leading-regular' style={{ fontSize: 10 }}>
          Disclaimer: Outputs from the AIgent should not be considered legal, financial, or tax advice and is for informational purposes in your journey and to engage in dialogue to help you make decisions. Our AIgents can make mistakes. Consider checking important information with your advisors for extra guidance.
        </Text> */}
      </div >
    </form >
  );

}