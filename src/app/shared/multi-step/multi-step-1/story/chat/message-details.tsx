'use client';

import { useState, useEffect } from 'react';
import {
  Button,
} from 'rizzui';
import cn from '@/utils/class-names';
import toast from 'react-hot-toast';
import { PiSkipForwardBold } from 'react-icons/pi'
import MessageBody from './message-body';
import SimpleBar from '@/components/ui/simplebar';

import { promptMessage, synthesizeData } from './messages';
import { BASE_URL, checkVoice } from './config';

import axios from 'axios';

import { ThreadEvents, ThreadMessage } from './types'
interface MessageDetailsProps {
  className?: string,
  audioRecorder: any,
  question: string,
  audio: any,
  handlePlaying?: any,
  setGetStarted: (val: boolean) => void,
  getStarted: boolean,
  handleStopRecording?: any,
  botAudioRecorder: any,
  sending: boolean,
  aigentPrompt: string,
  rosettaPrompt: string,
  rosetta: boolean,
  gotoNextStep: () => void,
  setSending: (val: boolean) => void,
  setRosettaValue?: any,
  initialPromptStatus: ThreadEvents | '',
  setInitialPromptStatus: (val: ThreadEvents) => void,
  promptStatus: ThreadEvents | '',
  setPromptStatus: (val: ThreadEvents) => void,
  isUserSpeaking: 'no' | 'yes' | 'done',
  setUserSpeaking: (val: 'no' | 'yes' | 'done') => void,
  assistantId: string,
  threadId: string,
  setThreadId: (val: any) => void
}



const ROSETTA_ID = 'asst_Ro8ljcSTHIhc2UbiYdIJpggl';

export default function MessageDetails(props: MessageDetailsProps) {
  const {
    assistantId,
    rosetta,
    aigentPrompt,
    rosettaPrompt,
    threadId,
    setThreadId,
    setSending,
    className,
    botAudioRecorder,
    question,
    audio,
    getStarted,
    setGetStarted,
    setInitialPromptStatus,
    initialPromptStatus,
    promptStatus,
    setPromptStatus,
    isUserSpeaking,
    setUserSpeaking,
    gotoNextStep } = props;

  const [localMessages, setLocalMessages] = useState<ThreadMessage[]>([]);


  const [isRosettaSending, setRosettaSending] = useState<'no' | 'yes' | 'done'>('no');


  useEffect(() => {
    // CREATE THREAD AND RUN
    if (getStarted) {
      const initialPromptMessage = aigentPrompt || promptMessage;
      // https://platform.openai.com/docs/api-reference/runs/createThreadAndRun
      const voice = checkVoice(assistantId);
      const eventSource = new EventSource(`${BASE_URL}/api/threads/runs?assistantId=${assistantId}&message=${encodeURIComponent(initialPromptMessage)}&voice=${voice}`);

      eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data) as any;
        if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
          handleSpeak(eventData.data.content[0].audio)
          setLocalMessages([eventData.data])
          setThreadId(eventData.data.thread_id)
        }
        setInitialPromptStatus(eventData.event)
      };

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getStarted]);

  // USER REPLY
  useEffect(() => {
    if (audio) {
      processSpeechToText(audio);
    }
  }, [audio]);


  const processSpeechToText = async (audio: any) => {
    setUserSpeaking('yes');
    const { baseUrl, mediaParams } = splitUrl(audio);

    if (!audio) return;
    try {
      const response = await axios
        .get<{ text: any }>(
          `${BASE_URL}/api/voice/text/fetch`, {
          params: {
            audio: baseUrl,
            token: mediaParams,
            threadId: threadId,
            assistantId: assistantId,
          }
        }
        )
      const data = response.data as any;
      setLocalMessages([...localMessages, {
        content: [{ type: 'text', text: { value: data.translation } }],
        role: 'user',
        run_id: null,
        status: '',
        thread_id: data.thread_id,
        id: '',
        assistant_id: null,
        created_at: 0,
        file_ids: [],
        metadata: undefined,
        object: 'thread.message'
      }])
      setUserSpeaking('done');
    } catch (error) {
      toast.error("Error fetching voice response", { position: "bottom-center" });
    } finally {
    }
  };


  // Bot Reply
  useEffect(() => {
    // STREAM RUN
    if (isUserSpeaking === 'done') {
      // https://platform.openai.com/docs/api-reference/runs/createRun
      const voice = checkVoice(assistantId);
      const eventSource = new EventSource(`${BASE_URL}/api/threads/${threadId}/runs?assistantId=${assistantId}&threadId=${threadId}&voice=${voice}`);

      eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data) as any;
        if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
          setUserSpeaking('no');
          handleSpeak(eventData.data.content[0].audio)
          setLocalMessages([...localMessages, eventData.data])
        }
        setPromptStatus(eventData.event)
      };

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserSpeaking]);


  const handleSpeak = (base64: string) => {
    botAudioRecorder.handlePlayAudio(base64);
  };



  // Rosetta Run
  // useEffect(() => {
  //   // STREAM RUN
  //   if (isRosettaSending === 'yes') {
  //     // https://platform.openai.com/docs/api-reference/runs/createRun
  //     const eventSource = new EventSource(`${BASE_URL}/api/threads/${threadId}/runs?assistantId=${ROSETTA_ID}&threadId=${threadId}`);

  //     eventSource.onmessage = (event) => {
  //       const eventData = JSON.parse(event.data) as any;
  //       if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
  //         // localStorage.setItem('lastMessage', eventData.data.content[0].text.value);
  //         // console.log('done');
  //         // setRosettaSending('done');
  //         // gotoNextStep();
  //       }
  //       if (eventData?.data?.delta?.content?.[0]?.text?.value) {
  //         const msg = eventData.data.delta.content[0].text.value;
  //         setStorySummary((prev: any) => prev + msg)
  //       }
  //       setPromptStatus(eventData.event)
  //     };

  //     eventSource.onerror = (error) => {
  //       console.error('EventSource error:', error);
  //       eventSource.close();
  //     };

  //     return () => {
  //       eventSource.close();
  //     };
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isRosettaSending]);

  // useEffect(() => {
  //   if (rosetta) {
  //     sendRosettaPrompt();
  //   }
  // }, [rosetta])


  const sendRosettaPrompt = async () => {
    setRosettaSending('yes');

    if (!threadId) {
      setRosettaSending('done');
      gotoNextStep();
    }

    try {
      const rosetta = rosettaPrompt?.length > 0 ? rosettaPrompt : synthesizeData;
      const response = await axios.post<{ message: ThreadMessage }>(
        `${BASE_URL}/api/threads/${threadId}/messages`,
        {
          message: rosetta,
        }
      );
    } catch (error) {
      // toast.error("Error setting prompt", { position: "bottom-center" });
    } finally {

      setSending(false);
    }
  };



  const handleGetStarted = () => {
    setGetStarted(true);
  }


  return (
    <div
      className={cn(
        'h-full',
        className
      )}
    >
      <div className='flex flex-col h-full'>
        <header className="flex flex-col gap-4 border-b border-muted pb-5 3xl:flex-row 3xl:items-center">
          <div style={{ justifyContent: "space-between" }} className="flex flex-col items-start justify-between gap-3 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
            <div className="flex w-full">
              <h6 className="mt-8 ml-2">{question}</h6>
            </div>
          </div>
        </header>

        {getStarted ?
          <div style={{ height: 'calc(100%)', maxHeight: 'calc(100% - 67px)' }}>

            <SimpleBar style={{ height: 'inherit' }}>
              <MessageBody
                messages={localMessages}
                initialPromptStatus={initialPromptStatus}
                promptStatus={promptStatus}
                isUserSpeaking={isUserSpeaking}
              />
            </SimpleBar>

          </div> :
          <div style={{ height: 'calc(100% - 67px)' }}>
            <div className='h-full items-center flex justify-center'>
              <Button size="lg" className="border-muted bg-gradient-to-r from-primary-color to-primary" onClick={handleGetStarted}>
                <PiSkipForwardBold className="me-1 h-4 w-4" />
                Get Started
              </Button>
            </div>
          </div>}
      </div>

    </div>
  );
}



function splitUrl(url: string): { baseUrl: string, mediaParams: string } {
  const [baseUrl, params] = url.split('?alt=media');
  if (params) {
    return {
      baseUrl: baseUrl + '?alt=media',
      mediaParams: params.startsWith('&') ? params.slice(1) : params
    };
  } else {
    return { baseUrl, mediaParams: '' };
  }
}