'use client';

import { useAtomValue, useAtom } from 'jotai';
import { z } from 'zod';
import { LuReply } from 'react-icons/lu';
import { useState, useEffect, useRef } from 'react';
import {
  Title,
  Text,
  Badge,
  Button,
  Avatar,
  Empty,
  Select,
  Loader,
} from 'rizzui';
import cn from '@/utils/class-names';
import firebase from '@/config/firebase.config';
import toast from 'react-hot-toast';
import {
  dataAtom,
  messageIdAtom,
} from '@/app/shared/support/inbox/message-list';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import ActionDropdown from '@/app/shared/support/inbox/action-dropdown';
import MessageBody from './content';
import SimpleBar from '@/components/ui/simplebar';
import { useElementSize } from '@/hooks/use-element-size';
import { useMedia } from '@/hooks/use-media';
import { ThreadMessage } from "openai/resources/beta/threads/messages/messages";
import { Run } from "openai/resources/beta/threads/runs/runs";
import {
  assistantAtom,
  fileAtom,
  runStateAtom,
  messagesAtom,
  threadAtom,
  assistantFileAtom,
  runAtom,
} from '@/config/atom';
import axios from 'axios';
import { collection, doc, getDocs, onSnapshot, query } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { currentSession } from '@/config/session';
import { PiPaperPlaneRightLight, PiStopCircleBold, PiMicrophoneStage } from 'react-icons/pi';
import { assistants } from '@/config/ref/assistants';
import '../inbox.css';
import Header from './header';
import { Assistant, ThreadEvents } from './types';
import { BASE_URL } from '@/config/bots';



export default function MessageDetails({ className }: { className?: string }) {
  const [screenSize, setScreenSize] = useState(400);
  const data = useAtomValue(dataAtom);
  const { push } = useRouter();
  const url = window.location.pathname;
  const synth = window.speechSynthesis;
  const recognition = new (window as any).webkitSpeechRecognition();
  let silenceTimeout: string | number | NodeJS.Timeout | null | undefined = null;
  recognition.lang = 'en-US';
  const [listening, setListening] = useState(false);
  const pageID = url.split("/").pop();
  const currentUser = currentSession() as any;
  const [agent, setAgent] = useState();
  const [priority, setPriority] = useState('');
  const messageId = useAtomValue(messageIdAtom);
  const [defaultAssistant, setDefaultAssistant] = useState({ id: 'asst_jPtPyLs7ILtupBpPuAaJCv3p', name: 'Finn, the Financial-Bot', profilePicture: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/_Finn%20Final%20-%20Transparent.png?alt=media&token=4cc6ba6c-65cd-4711-b709-62489b8f5e0c' }) as any;
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refValue, { width }] = useElementSize();
  const isWide = useMedia('(min-width: 1280px) and (max-width: 1440px)', false);
  const audioRef = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
  const [newAudio, setNewAudio] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [scrollToEnd, setScrollToEnd] = useState(false)
  // Atom State
  const [file, setFile] = useAtom(fileAtom);
  const [assistantFile, setAssistantFile] = useAtom(assistantFileAtom);
  const [thread, setThread] = useAtom(threadAtom);
  // This stores the list of threads on the users profile
  const [threadList, setThreadList] = useState([]) as any;
  const [run, setRun] = useAtom(runAtom);
  const [runState, setRunState] = useAtom(runStateAtom);
  // State
  const [creating, setCreating] = useState(false);
  const [modifying, setModifying] = useState(false);
  const [listing, setListing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  // State
  const [messageData, setMessageData] = useState("");
  const [fetching, setFetching] = useState(false);
  // State
  const [canceling, setCanceling] = useState(false);
  const [pollingIntervalId, setPollingIntervalId] =
    useState<NodeJS.Timeout | null>(null);

  const [initialPromptStatus, setInitialPromptStatus] = useState<ThreadEvents | ''>('');
  const [promptStatus, setPromptStatus] = useState<ThreadEvents | ''>('');
  const [isSent, setIsSent] = useState<'no' | 'yes' | 'done'>('no');


  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [messages, setMessages] = useState<any>([]);




  useEffect(() => {
    setIsLoading(true);

    // Fetch Assistants

    async function getAssistants() {
      try {
        const q = query(collection(firebase.firestore, "assistants"));
        const querySnapshot = await getDocs(q);
        const dataFields = querySnapshot.docs.map(doc => doc.data());
        const activeAssistants = dataFields.filter(df => df.status === true);
        setAssistant(activeAssistants.find(field => field.systemName === 'dylan') as any)
        setAssistants(activeAssistants as any);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchMessages(threadId: string) {

      const response = await axios
        .get<{ messages: any }>(
          `${BASE_URL}/api/threads/${threadId}/messages/default`, {
        })

      console.log(response.data);
      setMessages(response?.data?.messages)
      // setIsSent('done')

    }

    getAssistants()

    // // **************************************************************************
    // //  Initial fetch for current user and check for the users thread, it then adds the thread if found 
    // // **************************************************************************


    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        const userDocRef = doc(firebase.firestore, "users", user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (snapshot) => {
          if (!snapshot.exists()) {
            // Handle if the user document doesn't exist (create it, if needed)
          } else {
            const userData = snapshot.data();
            if (userData?.thread)
              setThread(userData?.thread[1])
            setThreadList(userData?.thread);
            if (userData?.thread[1]) {
              fetchMessages(userData?.thread[1].id)
            }
            setIsLoading(false);
          }
        });

        return () => {
          unsubscribeSnapshot();
        };
      }
    });

  }, [pageID]);

  const onChangeAssistant = (assistant: Assistant) => {
    setAssistant(assistant);
  }

  console.log(thread);






  // // **************************************************************************
  // //  Controls the size of the chat based on screen size
  // // **************************************************************************
  // useEffect(() => {
  //   const handleResize = () => {
  //     setScreenSize(window?.innerHeight);
  //   };

  //   if (typeof window !== 'undefined') {
  //     setScreenSize(window?.innerHeight);
  //     window.addEventListener('resize', handleResize);
  //   }

  //   return () => {
  //     if (typeof window !== 'undefined') {
  //       window?.removeEventListener('resize', handleResize);
  //     }
  //   };
  // }, []);
  // // **************************************************************************
  // //  Plays audio when an audio link is available
  // // **************************************************************************
  // useEffect(() => {
  //   const audio = audioRef.current;

  //   if (audio) {
  //     setLoading(false);
  //     // Check if there's a new audio URL and if it's not empty
  //     if (newAudio !== '') {
  //       audio.src = newAudio; // Update audio source

  //       // If 'playing' is true, play the audio; otherwise, pause it
  //       if (playing) {
  //         audio.play();
  //       } else {
  //         audio.pause();
  //       }
  //     } else {
  //       // If there's no new audio URL, pause the audio
  //       audio.pause();
  //     }

  //     // Add event listener for 'ended' event
  //     audio.addEventListener('ended', () => {
  //       setPlaying(false);
  //       // setNewAudio('');
  //     });

  //     // Clean up event listener
  //     return () => {
  //       audio.removeEventListener('ended', () => {
  //         setPlaying(false);
  //         // setNewAudio('');
  //       });
  //     };
  //   }

  // }, [newAudio, playing]);
  // // **************************************************************************
  // // Used in the run processing for threads and assistance responses
  // // **************************************************************************
  // useEffect(() => {
  //   // Clean up polling on unmount
  //   return () => {
  //     if (pollingIntervalId) clearInterval(pollingIntervalId);
  //   };
  // }, [pollingIntervalId]);
  // // **************************************************************************
  // //  Fetches the assistant list ad sets the assistant to the default assistant
  // // **************************************************************************
  // useEffect(() => {
  //   handleAssistant();
  // }, [thread]);
  // // **************************************************************************
  // //  Used for creating a timeout for the speech to text audio recording
  // // **************************************************************************
  const resetSilenceTimeout = () => {
    clearTimeout(silenceTimeout as any); // Reset the timeout
    silenceTimeout = setTimeout(() => {
      stopListening();
      // console.log('triggered stop');
    }, 3000); // Reset the timeout for another 5 seconds
  };
  // // **************************************************************************
  // //  Controls the form width
  // // **************************************************************************
  function formWidth() {
    if (isWide) return width - 64;
    return width - 44;
  }

  // // **************************************************************************
  // //  Sends the message added by to the text box
  // // **************************************************************************
  const sendMessage = async () => {
    if (!thread) return;

    try {

      const response = await axios.post(
        `${BASE_URL}/api/threads/${thread.id}/messages`,
        {
          message: messageData,
        }
      );

      const newMessage = response.data.message;
      setMessages([...messages, newMessage]);
      setMessageData("");
      setIsSent('done');
      toast.success("Message Sent", {
        position: "bottom-center",
      });
      // Creates a run to begin processing of the user message request
      // handleCreate()
      // setLoading(true);
    } catch (error) {
      console.log("error", error);
      toast.error("Error sending message", { position: "bottom-center" });
    }
  };

  // // **************************************************************************
  // // Starts the listening of the speech to text
  // // **************************************************************************
  const startListening = () => {
    setListening(true);
    recognition.onresult = (event: { results: { transcript: any; }[][]; }) => {
      const transcript = event.results[0][0].transcript;
      setMessageData(transcript);
      resetSilenceTimeout();
      if (messageData !== "") {
        sendMessage(); // Call sendMessage if messageData is not empty
      }
    };

    recognition.onend = () => {
      // console.log('Speech recognition ended.');
      // Optionally, you can call stopTranscription() here or perform any other action
      // if (messageData !== "") {
      //   sendMessage(); // Call sendMessage if messageData is not empty
      // }
    };

    recognition.start();

    // Start a timeout to stop recognition if there's no speech detected after 5 seconds
    silenceTimeout = setTimeout(() => {
      stopListening();
    }, 3000);
  };
  // // **************************************************************************
  // // Stops the speech to text recognition
  // // **************************************************************************
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      clearTimeout(silenceTimeout as any); // Clear the silence timeout
    }
    setListening(false);

  };
  // // **************************************************************************
  // //  Handles the processing of the speech url returned
  // // **************************************************************************
  const handleSpeak = (text: string) => {
    // setPlaying(true);
    setNewAudio(text);
    // handleSpeakMessage(text);
  };
  // // **************************************************************************
  // //  Handles the pllay button
  // // **************************************************************************
  const handlePlay = () => {
    setPlaying(true);
    // handleSpeakMessage(text);
  };
  // // **************************************************************************
  // //  Handles the stop talking functionality
  // // **************************************************************************
  const handleStopSpeak = () => {
    setPlaying(!playing); // Toggle the 'playing' state
  };



  // Bot Reply
  useEffect(() => {
    // STREAM RUN
    if (isSent === 'done') {
      console.log('hello');
      // https://platform.openai.com/docs/api-reference/runs/createRun
      const eventSource = new EventSource(`${BASE_URL}/api/threads/${thread?.id}/runs/text?assistantId=${assistant?.id}&threadId=${thread?.id}`);

      eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data) as any;
        if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
          setIsSent('no');
          // handleSpeak(eventData.data.content[0].audio)
          setMessages([...messages, eventData.data])
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
  }, [isSent]);




  if (isLoading) {
    return (
      <div
        className={cn(
          '!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center',
          className
        )}
      >
        <Loader variant="spinner" size="xl" />
      </div>
    );
  }


  return (
    <div
      className={cn(
        'relative lg:rounded-lg pr-2',
        className
      )}
    >
      <div>
        <Header assistant={assistant} assistants={assistants} onChangeAssistant={onChangeAssistant} />


        <div style={{ maxHeight: 600, height: 400 }}>
          <SimpleBar style={{ height: '100%' }} classNames={
            messages?.length < 1 ? { contentEl: 'simplebar-content-element' } : {}
          }>
            <MessageBody
              messages={messages}
              promptStatus={promptStatus}
            />
          </SimpleBar>
        </div>



        <div
          ref={refValue}
          className="grid grow grid-cols-[32px_1fr] items-start rounded-b-lg bg-white @3xl:pt-4 lg:gap-4 lg:pl-0 xl:grid-cols-[48px_1fr] dark:bg-transparent dark:lg:pt-0"
        >
          {runState === "queued" || runState === "in_progress" || runState === "cancelling" || runState === "requires_action" || loading ? <figure className="dark:mt-4">
            <Loader variant="spinner" size="xl" />
          </figure> : (!listening ? <Button
            type="button"
            onClick={startListening}
            className="dark:bg-gray-200 dark:text-white mt-2"
            disabled={messageData !== '' ? true : false}
          >
            <PiMicrophoneStage className="h-4 w-4" />
          </Button> : <Button
            type="button"
            onClick={stopListening}
            className="dark:bg-gray-200 dark:text-white mt-2"
          >
            <PiStopCircleBold className="h-4 w-4" />
          </Button>)}
          <div
            className="relative rounded-lg w-full bg-gray-30 p-1.5"
            style={{
              maxWidth: formWidth(),
            }}
          >

            <>
              <div className="relative mb-1 w-full flex items-center justify-between">

                <input
                  type="text"
                  className="rounded-md bg-gray-0 dark:bg-gray-50 flex-grow mr-2.5 [&>.ql-container_.ql-editor]:min-h-[100px]"
                  value={messageData}
                  onChange={(e) => setMessageData(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                />

                {(runState !== "queued" && runState !== "in_progress" && runState !== "cancelling" && runState !== "requires_action" && !loading) && <Button
                  type="submit"
                  onClick={sendMessage}
                  className="dark:bg-gray-200 dark:text-white"
                  disabled={messageData === "" ? true : false}
                >
                  <PiPaperPlaneRightLight className="h-4 w-4" />
                </Button>}

                {(runState === "queued" || runState === "in_progress" || runState === "cancelling" || runState === "requires_action") && <Button
                  type="button"
                  // onClick={handleCancel}
                  className="dark:bg-gray-200 dark:text-white"
                  disabled={canceling ? true : false}
                >
                  <PiStopCircleBold className="h-4 w-4" />
                </Button>}

              </div>
            </>

          </div>
        </div>
      </div>
      <Text className='text-xs text-center w-4/5 p-4 m-auto leading-relaxed'>Disclaimer: Outputs from the AIgent should not be considered legal, financial, or tax advice and is for informational purposes in your journey and to engage in dialogue to help you make decisions. Our AIgents can make mistakes. Consider checking important information with your advisors or “Hire a Professional“ tab for extra guidance.
      </Text>
    </div>
  );
}

