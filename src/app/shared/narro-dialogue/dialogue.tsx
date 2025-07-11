'use client';

import WisdomLoader from '@/components/ui/loader-wisdom';
import { BASE_URL, DYLAN_ID, SIMON_ID, FINN_ID, JEN_ID, assistantImg } from '@/config/bots';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAudioRecorder } from './hooks/useAudioRecorder';
import { NarroDialogueProps, ThreadEvents } from './types';
import MessageDetails from './ui/message-list/message-details';
import ErrorPage from './components/error-page';
import CallTitle from './components/Call/call-title';
import Call from './components/Call/call'
import CallFooter from './components/Call/call-footer';
import Footer from './ui/footer';

import './styles/ErrorPage.css';

import { useSearchParams } from 'next/navigation';
import CallDetails from './components/Call/call-details';


export default function Dialog(props: NarroDialogueProps) {
  const {
    prompt,
    rightLabel,
    onBack,
    aigent,
    user,
    title,
    info,
    estimatedTime,
    onSubmit,
    onStart,
    onThreadCreated,
    injectData,
    step,
    wisdomMessages,
    showFooter = true
  } = props;
  const formId = `form-${title}`;
  const [threadId, setThreadId] = useState('');
  const [audio, setAudio] = useState(null) as any;
  const [getStarted, setGetStarted] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentAssistant, setCurrentAssistant] = useState({} as any);
  const [initialPromptStatus, setInitialPromptStatus] = useState<ThreadEvents | ''>('');
  const [promptStatus, setPromptStatus] = useState<ThreadEvents | ''>('');
  const [isUserSpeaking, setUserSpeaking] = useState<'no' | 'yes' | 'done'>('no');
  const [isProcessingSpeech, setProcessingSpeech] = useState<boolean>(false);

  const audioRecorder = useAudioRecorder();
  const [isLoading, setLoading] = useState(false)
  const botAudioRecorder = useAudioRecorder();
  const [isFetchingAssistants, setFetchingAssistants] = useState<'no' | 'yes' | 'done'>('no');
  const [isError, setError] = useState(false)
  const [isLoadingKnowledge, setLoadingKnowledge] = useState(false);
  const [isRequestingStream, setRequestingStream] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [emotion, setEmotion] = useState<'happiness' | 'retrieving' | 'surprise' | 'neutral' | 'sadness'>('happiness');


  const [show, setShow] = useState(true);
  const [isFullScreen, setFullScreen] = useState(true);


  const onToggle = () => {
    setFullScreen(!isFullScreen)
    setIsTyping(true);
  };

  useEffect(() => {
    return () => {
      botAudioRecorder.handleStopRecording();
      botAudioRecorder.handleStopPlaying()
    }
  }, [])


  const handleStopRecording = async () => {
    audioRecorder.handleStopRecording().then((downloadUrl) => {
      setAudio(downloadUrl);
    });
  }

  const onRecord = () => {
    setUserSpeaking('yes')
    botAudioRecorder.handleStopPlaying();
    audioRecorder.handleStartRecording();
  }

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    await botAudioRecorder.handleStopPlaying()
    setLoadingKnowledge(true);
    await onSubmit(
      threadId,
      () => setLoadingKnowledge(false)
    )
  };

  async function fetchAssistants() {
    setFetchingAssistants('yes');
    try {
      const response = await axios.get(`${BASE_URL}/api/assistants`);
      const bots = response.data.assistants as any;
      if (!bots) {
        setError(true);
        return;
      }
      const nameMapping: any = {
        'dylan': DYLAN_ID,
        'finn': FINN_ID,
        'jen': JEN_ID,
        'simon': SIMON_ID,
      };
      const aigentid = aigent && nameMapping[aigent];
      const fromDb = bots.find((bot: { id: string }) => bot.id === aigentid);
      setCurrentAssistant(fromDb);
      setFetchingAssistants('done');
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    fetchAssistants();
  }, []);




  if (isError) {
    return <ErrorPage />
  }


  const className = isFullScreen ? 'rounded-tr-xl rounded tb-xl' : '';
  return (
    <div className='w-full'>

      <div
        className='flex h-full flex-col col-span-full w-full rounded-xl pb-4'
        style={{
        }}>
        <div
          style={{
            ...(isLoadingKnowledge ? {
              display: 'block',
            } : { display: 'none' }),
          }
          }
        >
          <WisdomLoader isLoading={isLoadingKnowledge} messages={
            wisdomMessages ||
            [
              "Calculating your score...",
              "Creating recommendations...",
            ]
          } />
        </div >
        <form
          id={formId}
          onSubmit={onFormSubmit}
          className='col-span-full w-full h-screen'
          style={{
            ...(isLoadingKnowledge && { display: 'none' }),

            height: '100%'
          }}
        >

          <div className="items-center justify-center my-auto h-full">
            <div className="flex min-h-[550px] h-[620px] w-[100%] gap-5">
              <div className="flex-1 flex flex-col transition-all duration-500 ease-in-out" style={{
                ...(isFullScreen ? {
                  width: '100%',
                } : { width: '100%' })
              }}>
                {/* <CallTitle info={info} title={title} isChatShown={isFullScreen} onToggle={onToggle} /> */}

                {/* <CallDetails estimatedTime={estimatedTime} /> */}

                <Call
                  user={user}
                  isChatShown={isFullScreen}
                  emotion={emotion}
                  audioRecorder={audioRecorder}
                  isUserSpeaking={isUserSpeaking}
                  isProcessingSpeech={isProcessingSpeech}
                  setProcessingSpeech={setProcessingSpeech}
                  botAudioRecorder={botAudioRecorder}
                  promptStatus={promptStatus}
                  setShow={setShow}
                  isRequestingStream={isRequestingStream}
                  show={show}
                  assistantImg={assistantImg}
                  assistantId={`${currentAssistant?.id}`}
                  isTyping={isTyping}
                  isFullScreen={isFullScreen}
                  setFullScreen={setFullScreen}
                />

                <CallFooter
                  handleStopRecording={handleStopRecording}
                  audioRecorder={audioRecorder}
                  show={show}
                  botAudioRecorder={botAudioRecorder}
                  sending={sending}
                  onStopRecording={botAudioRecorder.handleStopPlaying}
                  isPlaying={botAudioRecorder.isPlaying}
                  isUserSpeaking={isUserSpeaking}
                  initialPromptStatus={initialPromptStatus}
                  isRequestingStream={isRequestingStream}
                  promptStatus={promptStatus}
                  isLoading={isLoading}
                  assistantId={`${currentAssistant?.id}`}
                  onRecord={onRecord}
                  isTyping={isTyping}
                  setIsTyping={setIsTyping}
                  setFullScreen={setFullScreen}
                  isFullScreen={isFullScreen}
                />
              </div>


              <div className=" h-inherit flex flex-col  " style={{
                ...(isFullScreen ? {
                  display: 'none',

                } : { display: 'none', }),
              }
              }>
                <MessageDetails
                  setProcessingSpeech={setProcessingSpeech}
                  assistantId={`${currentAssistant?.id}`}
                  setShow={setShow}
                  step={step}
                  audioRecorder={audioRecorder}
                  aigentPrompt={prompt}
                  audio={audio}
                  onStart={onStart}
                  onThreadCreated={onThreadCreated}
                  injectData={injectData}
                  getStarted={getStarted}
                  setGetStarted={setGetStarted}
                  botAudioRecorder={botAudioRecorder}
                  initialPromptStatus={initialPromptStatus}
                  promptStatus={promptStatus}
                  setPromptStatus={setPromptStatus}
                  isFetchingAssistants={isFetchingAssistants}
                  setInitialPromptStatus={setInitialPromptStatus}
                  setRequestingStream={setRequestingStream}
                  isUserSpeaking={isUserSpeaking}
                  setEmotion={setEmotion}
                  setUserSpeaking={setUserSpeaking}
                  setButtonLoading={() => { }}
                  threadId={threadId}
                  isFullScreen={isFullScreen}
                  setFullScreen={setFullScreen}
                  setThreadId={setThreadId}
                  show={show}
                  className={className}
                  isTyping={isTyping}
                  setIsTyping={setIsTyping}
                  user={user}
                />
              </div>
            </div>
          </div>

        </form>
      </div>
      {/* {!isLoadingKnowledge && showFooter &&
        <Footer
          formId={`${formId}`}
          onBack={onBack}
          rightLabel={rightLabel}
        />
      } */}
    </div>
  );

}







