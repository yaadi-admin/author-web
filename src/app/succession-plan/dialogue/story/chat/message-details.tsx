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
import { BASE_URL, checkVoice } from '@/config/bots';

import axios from 'axios';

import { ThreadEvents, ThreadMessage } from './types'
import { useCurrentSession } from '@/config/succession-session';
interface MessageDetailsProps {
  className?: string,
  audioRecorder: any,
  title: string,
  audio: any,
  handlePlaying?: any,
  setGetStarted: (val: boolean) => void,
  getStarted: boolean,
  handleStopRecording?: any,
  botAudioRecorder: any,
  sending: boolean,
  aigentPrompt: string,
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
  step: number,
  setLoading: (val: boolean) => void,
  setThreadId: (val: any) => void,
  intake: any,
  setButtonLoading: (val: boolean) => void,
}

export default function MessageDetails(props: MessageDetailsProps) {
  const {
    assistantId,
    aigentPrompt,
    intake,
    threadId,
    setThreadId,
    className,
    botAudioRecorder,
    title,
    audio,
    getStarted,
    setGetStarted,
    setInitialPromptStatus,
    initialPromptStatus,
    promptStatus,
    setPromptStatus,
    setButtonLoading,
    setLoading,
    isUserSpeaking,
    step,
    setUserSpeaking,
  } = props;
  const { getUser, updateUser, session } = useCurrentSession() as any;


  const [localMessages, setLocalMessages] = useState<ThreadMessage[]>([]);

  function replacePlaceholders(message: string, data: { [key: string]: any }) {
    return message.replace(/{{(.*?)}}/g, (match, key) => data[key] || '');
  }


  useEffect(() => {

    async function fetchMessages(threadId: string) {
      setButtonLoading(true);
      const response = await axios
        .get<{ messages: any }>(
          `${BASE_URL}/api/threads/${threadId}/messages`, {
        })

      setLocalMessages(response?.data?.messages)
      setInitialPromptStatus(ThreadEvents.THREAD_MESSAGE_COMPLETED)
      setButtonLoading(false);
    }

    async function getUserThreadIds() {
      const newStep = step + 1;
      const user = await getUser(session.id);

      const currentThread = user?.threadIds?.find((v: any) => v?.step === newStep);

      if (currentThread?.step === newStep) {
        setThreadId(currentThread.id);
        fetchMessages(currentThread.id);
      } else {

        // CREATE THREAD AND RUN
        let initialPromptMessage = aigentPrompt || promptMessage;

        initialPromptMessage = replacePlaceholders(initialPromptMessage, intake);


        // https://platform.openai.com/docs/api-reference/runs/createThreadAndRun
        const voice = checkVoice(assistantId);
        const eventSource = new EventSource(`${BASE_URL}/api/threads/runs-stream?assistantId=${assistantId}&message=${encodeURIComponent(initialPromptMessage)}&voice=${voice}`);

        eventSource.onmessage = (event) => {
          setButtonLoading(true);
          const eventData = JSON.parse(event.data) as any;
          if (eventData.event === ThreadEvents.THREAD_MESSAGE_DELTA) {
            const deltaValue = eventData?.data?.delta?.content?.[0]?.text?.value;

            if (deltaValue !== undefined) {

            }
          }
          if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
            handleSpeak(eventData.data.content[0].text.value, () => {
              setLocalMessages([eventData.data])
              setInitialPromptStatus(eventData.event)
            })
            setThreadId(eventData.data.thread_id)
            const userData = user?.threadIds || [];
            updateUser({ threadIds: [...userData, { id: eventData.data.thread_id, step: step + 1 }] });
            setButtonLoading(false);
          } else {
            setInitialPromptStatus(eventData.event)
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

    if (getStarted && Object.keys(session).length) {
      getUserThreadIds();
    }
  }, [getStarted, session?.id]);

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
      const eventSource = new EventSource(`${BASE_URL}/api/threads/${threadId}/runs-stream?assistantId=${assistantId}&threadId=${threadId}&voice=${voice}`);

      eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data) as any;
        if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
          setUserSpeaking('no');
          handleSpeak(eventData.data.content[0].text.value, () => {
            setLocalMessages([...localMessages, eventData.data])
            setPromptStatus(eventData.event)
          })
        } else {
          setPromptStatus(eventData.event)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserSpeaking]);


  const handleSpeak = (message: string, cb: () => void) => {
    // botAudioRecorder.handlePlayAudio(base64);
    botAudioRecorder.handleAudioStream(message, cb);
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
              <h6 className="mt-8 ml-2">{title}</h6>
            </div>
          </div>
        </header>

        {getStarted ?
          <div style={{ height: 'calc(100%)', maxHeight: 'calc(100% - 81px)' }}>

            <SimpleBar style={{ height: 'inherit' }}>
              <MessageBody
                step={step}
                messages={localMessages}
                initialPromptStatus={initialPromptStatus}
                promptStatus={promptStatus}
                isUserSpeaking={isUserSpeaking}
              />
            </SimpleBar>

          </div> :
          // <div style={{ height: 'calc(100% - 67px)' }}>
          //   <div className='h-full items-center flex justify-center'>
          //     <Button size="lg" className="border-muted bg-gradient-to-r from-primary-color to-primary" onClick={handleGetStarted}>
          //       <PiSkipForwardBold className="me-1 h-4 w-4" />
          //       Get Started
          //     </Button>
          //   </div>
          // </div>
          null
        }
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