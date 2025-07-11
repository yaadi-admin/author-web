'use client';

import { useState, useEffect } from 'react';
import {
  Button,
} from 'rizzui';
import cn from '@/utils/class-names';
import toast from 'react-hot-toast';
import { PiSkipForwardBold } from 'react-icons/pi'
import MessageBody from './message-body';
import { CiClock2 } from "react-icons/ci";
import SimpleBar from '@/components/ui/simplebar';
import { promptMessage, synthesizeData } from './messages';
import { BASE_URL, checkVoice } from '@/config/bots';
import axios from 'axios';

import { ThreadEvents, ThreadMessage } from './types'
import { useCurrentSession } from '@/config/seller/seller-lite-session';
import { useSearchParams } from 'next/navigation';
interface MessageDetailsProps {
  className?: string,
  audioRecorder: any,
  title: string,
  audio: any,
  handlePlaying?: any,
  setGetStarted: (val: boolean) => void,
  getStarted: boolean,
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
  isLoadingKnowledge: boolean,
  setLoadingKnowledge: (val: boolean) => void,
  setThreadId: (val: any) => void,
  intake: any,
  setButtonLoading: (val: boolean) => void,
  card: any,
}

export default function MessageDetails(props: MessageDetailsProps) {
  const {
    assistantId,
    aigentPrompt,
    card,
    intake,
    threadId,
    setLoadingKnowledge,
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
  const { getUser, session } = useCurrentSession() as any;
  const searchParams = useSearchParams();
  const cardId = searchParams.get('id');
  const listingId = searchParams.get('listingId');
  const [localMessages, setLocalMessages] = useState<ThreadMessage[]>([]);

  function replacePlaceholders(message: string, data: { [key: string]: any }) {
    return message.replace(/{{(.*?)}}/g, (match, key) => data[key] || '');
  }


  const introduceIntakeInformation = async (prompt: string, variables: any = {}) => {
    const response = await axios.post(
      `${BASE_URL}/api/bizbridge/serv/authenticate`,
      {
        type: cardId,
        subKey: listingId,
        key: "intake",
        userID: session?.id,
        function: 'getIntakeData'
      },
      {
        headers: {
          Authorization: 'skl-bhdbjcbcbcbdjb'
        },
        maxContentLength: Infinity, // This sets the max content length to unlimited
        maxBodyLength: Infinity // This sets the max body length to unlimited
      }
    );
    let modifiedPrompt = prompt;
    const msg: any = JSON.parse(response?.data?.Message || '');
    const addedMsg = { ...msg, ...variables }
    modifiedPrompt = replacePlaceholders(modifiedPrompt, addedMsg)
    return { promptWithKnowledge: modifiedPrompt, intakeData: addedMsg }
  }
  useEffect(() => {
    async function loadRelevance() {
      setLoadingKnowledge(true);
      const relevance = card?.section2?.relevance || [];
      const responseThread = await axios.post(`${BASE_URL}/api/threads`)
      const thread_id = responseThread.data.thread.id

      const perplexityURL = `${BASE_URL}/api/perplexity/process`;
      const authorizationToken = "BBL-drizzyxab1142z";
      console.log(cardId);
      if (cardId === "F324hSVeUwN5zQ8dIE3V" || cardId === "CwRt383VNLFlP65FZ9FT") {

        const { promptWithKnowledge, intakeData } = await introduceIntakeInformation(card?.section2?.perplexityPrompt);
        console.log(intakeData);
        const response = await axios.post(
          perplexityURL,
          {

            businessName: intakeData?.businessName,
            businessAddress: '10 Dundas St E 6th Floor, Toronto, ON M5B 2G9',
            businessIndustry: 'Information Technology',
          },
          {
            headers: {
              Authorization: `${authorizationToken}`,
            },
            maxContentLength: Infinity, // This sets the max content length to unlimited
            maxBodyLength: Infinity, // This sets the max body length to unlimited
          }
        );
        await axios.post(
          `${BASE_URL}/api/functions/processFunction`,
          {
            threadId: thread_id,
            data: `This is the micro context,
             localized specific data about the competition and the market where our client operates 
             ${response.data.data.micro}

             This is the macro context,
             localized specific data about the competition and the market where our client operates
             ${response.data.data.macro}`,
          },
          {
            headers: {
            },
            maxContentLength: Infinity, // This sets the max content length to unlimited
            maxBodyLength: Infinity // This sets the max body length to unlimited
          }
        );

      }


      if (relevance.length > 0) {

        for (const item of relevance) {
          if (item === 'organisationalChart') {

            const response = await axios.post(
              `${BASE_URL}/api/bizbridge/serv/authenticate`,
              {
                type: 'vision',
                function: "getKnowledgeData",
                userID: session?.id,
                key: item.value, // Use the 'value' from the relevance object
              },
              {
                headers: {
                  Authorization: 'skl-bhdbjcbcbcbdjb'
                },
                maxContentLength: Infinity, // This sets the max content length to unlimited
                maxBodyLength: Infinity // This sets the max body length to unlimited
              }
            );

            await axios.post(
              `${BASE_URL}/api/functions/processFunction`,
              {
                threadId: thread_id,
                data: response?.data?.Message,
              },
              {
                headers: {
                },
                maxContentLength: Infinity, // This sets the max content length to unlimited
                maxBodyLength: Infinity // This sets the max body length to unlimited
              }
            );

          }
          const response = await axios.post(
            `${BASE_URL}/api/bizbridge/serv/authenticate`,
            {
              type: 'financial',
              function: "getKnowledgeData",
              userID: session?.id,
              key: item.value, // Use the 'value' from the relevance object
            },
            {
              headers: {
                Authorization: 'skl-bhdbjcbcbcbdjb'
              },
              maxContentLength: Infinity, // This sets the max content length to unlimited
              maxBodyLength: Infinity // This sets the max body length to unlimited
            }
          );

          await axios.post(
            `${BASE_URL}/api/functions/processFunction`,
            {
              threadId: thread_id,
              data: response?.data?.Message,
            },
            {
              headers: {
              },
              maxContentLength: Infinity, // This sets the max content length to unlimited
              maxBodyLength: Infinity // This sets the max body length to unlimited
            }
          );
        }

      }


      const { promptWithKnowledge } = await introduceIntakeInformation(aigentPrompt);
      await axios.post(
        `${BASE_URL}/api/functions/processFunction`,
        {
          threadId: thread_id,
          data: promptWithKnowledge,
        },
        {
          headers: {
          },
          maxContentLength: Infinity, // This sets the max content length to unlimited
          maxBodyLength: Infinity // This sets the max body length to unlimited
        }
      );

      setLoadingKnowledge(false);
      setThreadId(thread_id);
      setGetStarted(true);
    }
    if (Object.keys(session).length > 0) {
      loadRelevance();
    }
  }, [session?.id]);



  useEffect(() => {
    async function startConversation() {
      const voice = checkVoice(assistantId);
      const eventSource = new EventSource(`${BASE_URL}/api/threads/${threadId}/runs?assistantId=${assistantId}&threadId=${threadId}&voice=${voice}`);
      eventSource.onmessage = (event) => {
        setButtonLoading(true);
        const eventData = JSON.parse(event.data) as any;
        if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
          handleSpeak(eventData.data.content[0].audio)
          setLocalMessages([eventData.data])
          // setThreadId(eventData.data.thread_id)
          setButtonLoading(false);
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

    if (getStarted) {
      startConversation();
    }
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
            <div className="mt-8 ml-2 flex w-full items-center ">
              <h6 className="mr-2">{title}</h6>
              <CiClock2 className="h-5 w-5 " />
              <div>
                This dialogue will take approximately <b>5</b> minutes to complete.
              </div>
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
          null
          // <div style={{ height: 'calc(100% - 67px)' }}>
          //   <div className='h-full items-center flex justify-center'>
          //     <Button size="lg" className="border-muted bg-gradient-to-r from-primary-color to-primary" onClick={handleGetStarted}>
          //       <PiSkipForwardBold className="me-1 h-4 w-4" />
          //       Get Started
          //     </Button>
          //   </div>
          // </div>
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