'use client';

import SimpleBar from 'simplebar-react';

import { BASE_URL, checkVoice } from '@/config/bots';
import cn from '@/utils/class-names';
import axios from 'axios';
import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { MdHideSource } from "react-icons/md";
import { Button } from "rizzui";
import { useAtom } from 'jotai';




import { NarroDialogueProps } from '@/app/shared/bizbridge-dialogue/types';
import { ThreadEvents, ThreadMessage } from './types';

import Messages from '../../ui/message-list/message-body';
import Header from '../../ui/message-list/message-header';
import { useModal } from '@/app/shared/modal-views/use-modal';
import Modal from '../../modal';
import 'simplebar-react/dist/simplebar.min.css';
import { messages } from '@/config/ref/messages';
import { useSearchParams } from 'next/navigation';



type BizProps = Omit<NarroDialogueProps, "prompt" | "onSubmit" | "title" | "estimatedTime">
interface MessageDetailsProps extends BizProps {
  step: number,
  assistantId: string,
  className?: string,
  threadId: string,
  setThreadId: (val: any) => void,

  botAudioRecorder: any,
  audioRecorder: any,
  audio: any,
  getStarted: boolean,
  setGetStarted: (val: boolean) => void,
  isFetchingAssistants: 'no' | 'yes' | 'done',
  initialPromptStatus: ThreadEvents | '',
  setRequestingStream: any,
  setInitialPromptStatus: (val: ThreadEvents) => void,
  promptStatus: ThreadEvents | '',
  setPromptStatus: (val: ThreadEvents) => void,
  aigentPrompt: string,
  isRequestingStream: boolean,
  isUserSpeaking: 'no' | 'yes' | 'done',
  setUserSpeaking: (val: 'no' | 'yes' | 'done') => void,
  setButtonLoading: (val: boolean) => void,
  setProcessingSpeech: any,

  onStart: () => Promise<string | null>;

  setShow: (value: boolean) => void,
  show: boolean;
  isTyping: boolean;
  setIsTyping: (value: boolean) => void;
  isFullScreen: boolean;
  setFullScreen: any,
  user?: { firstName: string },
  setEmotion: any;
}




function MessageDetails(props: MessageDetailsProps) {
  const {
    step,
    threadId,
    className,
    user,
    show,
    botAudioRecorder,
    onStart = () => null,
    onThreadCreated,
    injectData,
    audioRecorder,
    audio,
    getStarted,
    setGetStarted,
    isFetchingAssistants,
    setProcessingSpeech,
    setInitialPromptStatus,
    isRequestingStream,
    initialPromptStatus,
    setRequestingStream,
    promptStatus,
    aigentPrompt,
    setEmotion,
    setPromptStatus,
    setButtonLoading,
    isUserSpeaking,
    setThreadId,
    setShow,
    setUserSpeaking,
    isTyping,
    setIsTyping,
    isFullScreen,
    setFullScreen
  } = props;
  const { openModal } = useModal();
  const [message, setMessage] = useState('');
  const messageIdSet = useRef(new Set<string>());
  const inputRef = useRef<HTMLInputElement>(null);   //added
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchParams = useSearchParams();
  const closeChat = () => {
    setShow(false);  // this is setChatVisible passed from parent
    setIsTyping(false);
  };


  const [localMessages, setLocalMessages] = useState<ThreadMessage[]>([]);

  useEffect(() => {

    if (isTyping && inputRef.current) {

      inputRef.current.focus();
    }
  }, [isTyping, isFullScreen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the Enter key is pressed
      if (event.code === 'Enter') {
        event.preventDefault();
        if (message.trim().length) {
          handleSend();
        }

      }
    };

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [message]);

  const assistantId = useMemo(() => `${props.assistantId}`, [props.assistantId]);

  // Memoize any functions to prevent unnecessary rerenders
  const handleSetButtonLoading = useCallback((val: boolean) => {
    setButtonLoading(val)
  }, []);

  const addUniqueMessage = useCallback((newMessage: ThreadMessage) => {       //added
    if (!messageIdSet.current.has(newMessage.id)) {
      messageIdSet.current.add(newMessage.id);
      setLocalMessages(prevMessages => [...prevMessages, newMessage]);
    }
  }, []);

  useEffect(() => {
    async function fetchMessages(threadId: string) {
      // return;
      setRequestingStream(true);
      handleSetButtonLoading(true);
      const response = await axios
        .get<{ messages: any }>(
          `${BASE_URL}/api/threads/${threadId}/messages`, {
        })

      setLocalMessages(response?.data?.messages)
      const voice = checkVoice(assistantId);
      const lastMessage = response?.data?.messages[response?.data?.messages.length - 1];
      const lastMessageText = lastMessage?.content?.[0]?.text?.value;
      localStorage.setItem('currentMessage', lastMessageText);
      handleSpeak(lastMessageText, () => { }, voice)
      setInitialPromptStatus(ThreadEvents.THREAD_MESSAGE_COMPLETED)
      setRequestingStream(false);
      handleSetButtonLoading(false);
    }
    async function startConversation() {
      try {
        const responseThread = await axios.post(`${BASE_URL}/api/threads`);
        const thread_id = responseThread.data.thread.id;
        await axios.post(
          `${BASE_URL}/api/functions/processFunction`,
          {
            threadId: thread_id,
            data: `
            injected data:
            ${JSON.stringify(injectData)}
            
            ----
            
            prompt: ${aigentPrompt}
            `,
          },
          {
            headers: {},
            maxContentLength: Infinity, // This sets the max content length to unlimited
            maxBodyLength: Infinity, // This sets the max body length to unlimited
          }
        );
        setThreadId(thread_id);
        onThreadCreated(thread_id)
        setGetStarted(true);
      } catch (error) {
        console.error("Error starting conversation:", error);
      } finally {
      }
    }
    async function initializeConversation() {
      const existingThreadId = await onStart();
      if (existingThreadId) {
        setThreadId(existingThreadId);
        fetchMessages(existingThreadId)
      } else {
        startConversation();
      }
    }

    if (isFetchingAssistants === 'done') {
      initializeConversation()
    }

  }, [isFetchingAssistants]);


  async function fetchMessagesInstance(threadId: string) {
    // return;
    setRequestingStream(true);
    handleSetButtonLoading(true);
    const response = await axios
      .get<{ messages: any }>(
        `${BASE_URL}/api/threads/${threadId}/messages`, {
      })

    return response?.data?.messages;
  }


  useEffect(() => {
    async function runThread() {
      const voice = checkVoice(assistantId);
      const eventSource = new EventSource(`${BASE_URL}/api/threads/${threadId}/runs-stream?assistantId=${assistantId}&threadId=${threadId}&voice=${voice}`);
      eventSource.onmessage = (event) => {
        handleSetButtonLoading(true);
        const eventData = JSON.parse(event.data) as any;
        if (eventData?.functions === 'SHOW_EIR') {
        } else if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
          handleSpeak(eventData.data.content[0].text.value, () => {
            // setLocalMessages([eventData.data])
            setLocalMessages(prevMessages => [...prevMessages, eventData.data])
            setInitialPromptStatus(eventData.event)
          }, `${voice}`)
          handleSetButtonLoading(false);
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

    if (getStarted) {
      runThread();
    }
  }, [getStarted]);

  // Bot Reply
  useEffect(() => {
    // STREAM RUN

    if (isUserSpeaking === 'done') {
      setEmotion('happiness');
      const documentId = searchParams.get('id');
      timeoutRef.current = setTimeout(() => {
        setEmotion('retrieving');
      }, 4000);
      setRequestingStream(true);
      // https://platform.openai.com/docs/api-reference/runs/createRun
      const voice = checkVoice(assistantId);
      const eventSource = new EventSource(`${BASE_URL}/api/threads/${threadId}/runs-stream?assistantId=${assistantId}&threadId=${threadId}&voice=${voice}&sectionId=zrhuXDuSmkDrMWKDT83p&documentId=${documentId}&email=info@thenarro.com`);
      eventSource.onmessage = async (event) => {
        const eventData = JSON.parse(event.data) as any;
        if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
          if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
          }
          setUserSpeaking('no');
          const messages = await fetchMessagesInstance(threadId);
          localStorage.setItem('currentMessage', messages[messages.length - 1].content[0].text.value);

          const hasFunctionCalling = Array.isArray(eventData?.function) && eventData.function.length > 0;
          const speakValue = eventData.data.content[0].text.value;
          if (hasFunctionCalling) {
            // Use `find` to locate the object with the name 'schedule_call'
            const scheduleCall = eventData.function.find((f: { name: string; }) => f?.name === 'show_meeting_popup');
            const audioText = eventData.function.find((f: { name: string; }) => f?.name === 'generate_audio_text');
            const emotionMatcher = eventData.function.find((f: { name: string; }) => f?.name === 'emotion_matcher');
            if (emotionMatcher) {
              setEmotion(emotionMatcher?.args?.emotion);
            }

            if (scheduleCall) {
              const { meeting_link: calendly, eir_name: name } = scheduleCall.args || {};
              openModal({
                customSize: '80%',
                view: <Modal name={name} calendly={calendly} />,
              });
              handleSpeak(speakValue, async () => {
                setLocalMessages(messages);
                setPromptStatus(eventData.event);
                setRequestingStream(false);
              }, voice || 'nova');
            } else if (audioText) {
              const audioValue = audioText?.args?.text;
              handleSpeak(audioValue, async () => {
                setLocalMessages(messages);
                setPromptStatus(eventData.event);
                setRequestingStream(false);
              }, voice || 'nova');
            } else {
              handleSpeak(speakValue, async () => {
                setLocalMessages(messages);
                setPromptStatus(eventData.event);
                setRequestingStream(false);
              }, voice || 'nova');
            }
          } else {
            handleSpeak(speakValue, async () => {
              setLocalMessages(messages)
              setPromptStatus(eventData.event)
              setRequestingStream(false);
            }, `${voice || 'nova'}`)
          }

        }
        else {
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

  const handleSpeak = (message: string, cb: () => void, voice: string) => {
    // botAudioRecorder.handlePlayAudio(base64);
    botAudioRecorder.handleAudioStream(message, cb, voice);
  };


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
      setProcessingSpeech(true);
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
      setProcessingSpeech(false);

      const data = response.data as any;
      localStorage.setItem('currentMessage', data.translation);
      setLocalMessages(prevMessages => [...prevMessages, {
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

  const [isAtTop, setIsAtTop] = useState(true);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const simpleBarRef = useRef<any | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (simpleBarRef.current) {
        const scrollElement = simpleBarRef.current.getScrollElement();
        const isTop = scrollElement.scrollTop === 0;
        const isBottom = scrollElement.scrollHeight - scrollElement.scrollTop <= (scrollElement.clientHeight + 50);
        setIsAtTop(isTop);
        setIsAtBottom(isBottom);
      }
    };

    const simpleBarInstance = simpleBarRef.current;
    const scrollElement = simpleBarInstance.getScrollElement();

    scrollElement.addEventListener('scroll', handleScroll);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const goToLatestMessage = (e: any) => {
    e.preventDefault();
    const scrollElement = simpleBarRef.current.getScrollElement();
    scrollElement.scrollTo({
      top: scrollElement.scrollHeight, // Scroll to the very bottom
      behavior: 'smooth', // Smooth scroll
    });
  };

  const handleSend = async () => {
    botAudioRecorder.handleStopPlaying();
    setUserSpeaking('yes');

    const response = await axios.post(
      `${BASE_URL}/api/functions/processFunction`,
      {
        threadId: threadId,
        data: message,
      },
      {
        headers: {},
        maxContentLength: Infinity, // This sets the max content length to unlimited
        maxBodyLength: Infinity, // This sets the max body length to unlimited
      }
    );
    const data = response.data as any;
    setLocalMessages(prevMessages => [...prevMessages, {
      content: [{ type: 'text', text: { value: message } }],
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
    setMessage('');
    setUserSpeaking('done');

  }

  return (


    <div
      className={` rounded-md  4xs:w-[500px] 2xl:w-[600px] 
        transform transition-all duration-700 ease-in-out ${isFullScreen
          ? 'translate-y-0 opacity-100 visible'
          : 'translate-y-10 opacity-0 invisible'
        }
        `}
      style={{
        // position: 'absolute',
        height: 'inherit',
        // top: isFullScreen ? '15px' : '0px',
        // left: isFullScreen ? '50px' : 'calc(100% - 100px)', // Left-to-right transition
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        // marginBottom: '5%',
      }}
    >
      {/* <Header />   */}


      <div style={{ height: '560px', maxHeight: '560px', width: '100%' }} className=" ">
        <div className='absolute top-[-24px] right-0'>
          <div className='flex gap-4'>
            {/* {isFullScreen ? null :
              <MdHideSource className="h-4 w-4 cursor-pointer" onClick={closeChat} />
            } */}
            {isFullScreen ?
              <div role='button' className='flex gap-2 cursor-pointer' onClick={() => {
                setFullScreen(false)
              }}>
                <FiMinimize2
                  className="h-4 w-4 " />
              </div>
              :
              null
              // <FiMaximize2 className="h-4 w-4 cursor-pointer" onClick={() => setFullScreen(true)} />
            }
          </div>
        </div>

        {/* Top Fade */}
        {!isAtTop && (
          <div className="z-50 rounded-md absolute top-0 left-0 right-0 h-8 bg-gradient-to-t from-transparent to-white opacity-50 pointer-events-none" />
        )}


        {/* Chat Container */}
        {/* Messages Area */}
        <SimpleBar
          style={{ height: '100%', maxHeight: '100%' }}
          className="py-5 inner flex-1 overflow-y-auto"
          ref={simpleBarRef}
        >
          <Messages
            step={step}
            user={user}
            assistantId={assistantId}
            messages={localMessages}
            initialPromptStatus={initialPromptStatus}
            promptStatus={promptStatus}
            isUserSpeaking={isUserSpeaking}
            isRequestingStream={isRequestingStream}
          />
        </SimpleBar>



        {!isAtBottom &&
          <button
            onClick={goToLatestMessage}
            className="absolute bottom-[12px] left-1/2 z-50 flex h-8 -translate-x-1/2 items-center justify-center gap-1.5 rounded-full bg-neutral-700 px-3 text-sm text-white transition-all hover:scale-105 " aria-label="Scroll to Bottom"><span className="opacity-70"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down size-3"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg></span><span>Jump to latest</span></button>
        }
        {!isAtBottom &&
          <div className="absolute rounded-md bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white opacity-50	pointer-events-none "></div>
        }

        {isTyping && (
          <div className="py-3 px-4 rounded-b-[5px] shadow-lg  border-t bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <span className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="font-secondary flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none  shadow-sm bg-gray-50"
                placeholder="Type your message..."
              />
              <Button
                type="button"
                variant="flat"
                onClick={handleSend}
                className=" rounded-full bg-secondary  px-6 shadow-sm"
              >
                Send
              </Button>
            </span>
          </div>
        )}

      </div>
    </div >
  );
}

const MemoizedMessageDetails = React.memo(MessageDetails);
export default MemoizedMessageDetails;
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
