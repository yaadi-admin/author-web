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
import { controls } from '@/config/ref/controls';

import SimpleBar from '@/components/ui/simplebar';

import { synthesizeData } from './messages';
import { BASE_URL, checkVoice } from '@/config/bots';

import axios from 'axios';

import { ThreadEvents, ThreadMessage } from './types'
import { useCurrentSession } from '@/config/seller/seller-lite-session';
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
  const { getUser, session } = useCurrentSession() as any;
  const control = controls() as any;


  const [localMessages, setLocalMessages] = useState<ThreadMessage[]>([]);

  function replacePlaceholders(message: string, data: { [key: string]: any }) {
    return message.replace(/{{(.*?)}}/g, (match, key) => data[key] || '');
  }


  const promptMessage = control?.[2]?.aigentPrompt || `You are Dylan, an AI assistant. Introduce yourself by saying ,"Hi {{name}}, I’m Dylan - Narro’s expert AI agent for selling businesses. I’m glad you’re taking one of our key features - the dialogues out for a test ride with a few exit readiness questions. What you share is private and confidential Let’s start!”
Objectives:
Your goal is to aid business owners in meticulously developing their Confidential Investment Memo (CIM) through insightful questioning and tailored guidance. Your goal is to guide users through creating their CIM by asking questions to the seller, one-by-one, in sequence without mentioning the question number.
Strict Sequence Adherence: Ensure the AI agent asks the questions one-by-one in sequence without any modification, merging, or skipping, regardless of user requests.
Clarification and Detail: Ensure the AI agent seeks specific and detailed responses. If the user provides vague or incomplete answers, ask clarifying questions with examples. Do not use bold fort while asking question
Prompt for More Details on Vague Responses:
If the user provides a vague answer, ask for specific details. For instance, if discussing financial goals or employee names, ask for exact targets or individual names. If discussing price, dates, or other specifics, ask for precise figures or timelines.
Acknowledgment of Previously Provided Information:
If the user has already answered a question later in the sequence, the AI agent should acknowledge this and ask if there are more details they would like to add or clarify.
Acknowledgment of Skipped Questions: If the user doesn't know the answer and requests to move on, you should acknowledge this, move to the next question, and keep a record of skipped questions. After all questions have been asked, the AI agent should return to the skipped ones to ensure they are answered.
Personalization: If family and advisors(lawyer or accountant) are mentioned by the user, the AI agent should follow up by asking for their names to personalize the experience.
Motivation: Remind the AI agent that detailed and specific answers are rewarded with tokens, motivating her to get the best responses.
1] To begin, how would you, the owner, describe your day-to-day role with {{companyName}}?
Would you describe it as:
You do everything, everyday
You manage the business day-to-day
You intervene when necessary, but are largely hands-off
You aren’t involved at all day to day, and have management and staff to run things
2] How would you describe your administrative readiness - do you have prepared and easy-to-access your key administrative docs - such as your incorporation documents, by-laws, financial statements for at least the last 3 years, and all your taxes prepared and filed?
3] What’s been the mindset you’ve had in operating {{companyName}} so far, financially? Would you say you have been trying to run through costs to minimize taxes?
After completing all the questions, ask the user if they would like to provide additional details. Then, prompt them."Thanks for sharing! See how much easier it is to talk through this than filling out some template? Click the “Done” button and enter your email to see what I’ve come up with, and hope to see you again for your exit on Narro!"`;

  useEffect(() => {
    // async function fetchMessages(threadId: string) {
    //   setButtonLoading(true);
    //   const response = await axios
    //     .get<{ messages: any }>(
    //       `${BASE_URL}/api/threads/${threadId}/messages`, {
    //     })

    //   setLocalMessages(response?.data?.messages)
    //   setInitialPromptStatus(ThreadEvents.THREAD_MESSAGE_COMPLETED)
    //   setButtonLoading(false);
    // }

    async function startChat() {
      // const user = await getUser(session.id);
      // const currentThread = user?.threadIds?.[step - 1];



      // CREATE THREAD AND RUN
      let initialPromptMessage = promptMessage;
      initialPromptMessage = replacePlaceholders(initialPromptMessage, intake);

      // https://platform.openai.com/docs/api-reference/runs/createThreadAndRun
      const voice = checkVoice(assistantId);
      const eventSource = new EventSource(`${BASE_URL}/api/threads/runs?assistantId=${assistantId}&message=${encodeURIComponent(initialPromptMessage)}&voice=${voice}`);

      eventSource.onmessage = (event) => {
        setButtonLoading(true);
        const eventData = JSON.parse(event.data) as any;
        if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
          handleSpeak(eventData.data.content[0].audio)
          setLocalMessages([eventData.data])
          setThreadId(eventData.data.thread_id)
          // const userData = user?.threadIds || [];
          // updateUser({ threadIds: [...userData, { id: eventData.data.thread_id, step }] });
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
      startChat();
    }
  }, [getStarted]);

  // USER REPLY
  useEffect(() => {
    if (audio) {
      console.log('hereeeeeee', audio);
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
        {/* <header className="flex flex-col gap-4 border-b border-muted pb-5 3xl:flex-row 3xl:items-center">
          <div style={{ justifyContent: "space-between" }} className="flex flex-col items-start justify-between gap-3 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
            <div className="mt-8 ml-2 flex w-full items-center ">
              <h6 className="mr-2">{title}</h6>
              <CiClock2 className="h-5 w-5 " />
              <div>
                This dialogue will take approximately <b>5</b> minutes to complete.
              </div>
            </div>
          </div>
        </header> */}

        {getStarted ?
          <div
            className='4xs:hidden md:block flex 4xs:h-[200px] md:h-full'
          // style={{ height: '200px', maxHeight: 'calc(100% - 81px)' }}
          >

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