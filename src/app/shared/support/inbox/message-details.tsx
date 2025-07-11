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
import MessageBody from '@/app/shared/support/inbox/message-body';
import SimpleBar from '@/components/ui/simplebar';
import { useElementSize } from '@/hooks/use-element-size';
import { useMedia } from '@/hooks/use-media';
import dynamic from 'next/dynamic';
// import { SupportType, supportTypes } from '@/data/support-inbox';
import { Assistant } from "openai/resources/beta/assistants/assistants";
import { Thread } from "openai/resources/beta/threads/threads";
import { ThreadMessage } from "openai/resources/beta/threads/messages/messages";
import { Run } from "openai/resources/beta/threads/runs/runs";
import {
  assistantAtom,
  fileAtom,
  runStateAtom,
  messagesAtom,
  threadAtom,
  isValidRunState,
  assistantFileAtom,
  runAtom,
} from '@/config/atom';
import axios from 'axios';
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import { useRouter } from 'next/navigation';
import { currentSession } from '@/config/session';
import { PiPaperPlaneRightLight, PiStopCircleBold, PiMicrophoneStage } from 'react-icons/pi';
import UploadButton from '@/app/shared/upload-button';
import { assistants } from '@/config/ref/assistants';
import './inbox.css';
const FileUpload = dynamic(() => import('@/app/shared/thread-file-upload'), {
  ssr: false,
});

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

const FormSchema = z.object({
  message: z.string({ required_error: 'Invalid email address' }),
});

type FormValues = {
  message: string;
};

export default function MessageDetails({ className }: { className?: string }) {
  const [screenSize, setScreenSize] = useState(400);
  const data = useAtomValue(dataAtom);
  const assistantsData = assistants('data') as any;
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
  const [assistantImage, setAssistantImage] = useState('https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bot%207.png?alt=media&token=ed037b2d-342e-477e-bab4-ce7f36fec527');
  const audioRef = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
  const [newAudio, setNewAudio] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [scrollToEnd, setScrollToEnd] = useState(false)
  // Atom State
  const [assistant, setAssistant] = useAtom(assistantAtom);
  const [file, setFile] = useAtom(fileAtom);
  const [assistantFile, setAssistantFile] = useAtom(assistantFileAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
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
  const [sending, setSending] = useState(false);
  const [fetching, setFetching] = useState(false);
  // State
  const [canceling, setCanceling] = useState(false);
  const [pollingIntervalId, setPollingIntervalId] =
    useState<NodeJS.Timeout | null>(null);

  // **************************************************************************
  //  Initial fetch for current user and check for the users thread, it then adds the thread if found 
  // **************************************************************************

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
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
            setIsLoading(false);
          }
        });

        return () => {
          unsubscribeSnapshot();
        };
      }
    });
  }, [pageID]);
  // **************************************************************************
  //  Controls the size of the chat based on screen size
  // **************************************************************************
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window?.innerHeight);
    };

    if (typeof window !== 'undefined') {
      setScreenSize(window?.innerHeight);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window?.removeEventListener('resize', handleResize);
      }
    };
  }, []);
  // **************************************************************************
  //  Plays audio when an audio link is available
  // **************************************************************************
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      setLoading(false);
      // Check if there's a new audio URL and if it's not empty
      if (newAudio !== '') {
        audio.src = newAudio; // Update audio source

        // If 'playing' is true, play the audio; otherwise, pause it
        if (playing) {
          audio.play();
        } else {
          audio.pause();
        }
      } else {
        // If there's no new audio URL, pause the audio
        audio.pause();
      }

      // Add event listener for 'ended' event
      audio.addEventListener('ended', () => {
        setPlaying(false);
        // setNewAudio('');
      });

      // Clean up event listener
      return () => {
        audio.removeEventListener('ended', () => {
          setPlaying(false);
          // setNewAudio('');
        });
      };
    }

  }, [newAudio, playing]);
  // **************************************************************************
  // Used in the run processing for threads and assistance responses
  // **************************************************************************
  useEffect(() => {
    // Clean up polling on unmount
    return () => {
      if (pollingIntervalId) clearInterval(pollingIntervalId);
    };
  }, [pollingIntervalId]);
  // **************************************************************************
  //  Fetches the assistant list ad sets the assistant to the default assistant
  // **************************************************************************
  useEffect(() => {
    handleAssistant();
  }, [thread]);
  // **************************************************************************
  //  Used for creating a timeout for the speech to text audio recording
  // **************************************************************************
  const resetSilenceTimeout = () => {
    clearTimeout(silenceTimeout as any); // Reset the timeout
    silenceTimeout = setTimeout(() => {
      stopListening();
      // console.log('triggered stop');
    }, 3000); // Reset the timeout for another 5 seconds
  };
  // **************************************************************************
  //  Controls the form width
  // **************************************************************************
  function formWidth() {
    if (isWide) return width - 64;
    return width - 44;
  }
  // **************************************************************************
  // Starts the listening of the speech to text
  // **************************************************************************
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
  // **************************************************************************
  // Stops the speech to text recognition
  // **************************************************************************
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      clearTimeout(silenceTimeout as any); // Clear the silence timeout
    }
    setListening(false);

  };
  // **************************************************************************
  //  Handles the processing of the speech url returned
  // **************************************************************************
  const handleSpeak = (text: string) => {
    // setPlaying(true);
    setNewAudio(text);
    // handleSpeakMessage(text);
  };
  // **************************************************************************
  //  Handles the pllay button
  // **************************************************************************
  const handlePlay = () => {
    setPlaying(true);
    // handleSpeakMessage(text);
  };
  // **************************************************************************
  //  Handles the stop talking functionality
  // **************************************************************************
  const handleStopSpeak = () => {
    setPlaying(!playing); // Toggle the 'playing' state
  };
  // **************************************************************************
  //  Sends the message added by to the text box
  // **************************************************************************
  const sendMessage = async () => {
    if (!thread) return;
    setSending(false);

    try {
      const response = await axios.get<{ message: ThreadMessage }>(
        `/api/messages/create?threadId=${thread.id}&message=${messageData}`,
        // { message: messageData, threadId: thread.id }
      );

      const newMessage = response.data.message;
      setMessages([...messages, newMessage]);
      setMessageData("");
      toast.success("Message Sent", {
        position: "bottom-center",
      });
      // Creates a run to begin processing of the user message request
      handleCreate()
      // setLoading(true);
    } catch (error) {
      console.log("error", error);
      toast.error("Error sending message", { position: "bottom-center" });
    } finally {
      setSending(false);
    }
  };
  // **************************************************************************
  // Handles the functionality for changing to a different assistant
  // **************************************************************************
  // const handleChangeAssistant = async (assistant: any) => {
  //   setListing(true);
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get<{ assistants: Assistant[] }>(
  //       `/api/assistant/list`
  //     );
  //     const assistants = response.data.assistants;
  //     for (let i = 0; i < assistants.length; i++) {
  //       if (assistants[i].id === assistant?.id) {
  //         setAssistant(assistants[i]);
  //         if (i === 0) {
  //           setThread(threadList[3])
  //         }
  //         if (i === 1) {
  //           setThread(threadList[2])
  //         }
  //         if (i === 2) {
  //           setThread(threadList[1])
  //         }
  //         if (i === 3) {
  //           setThread(threadList[0])
  //         }
  //         console.log(assistants[i]);
  //         toast.success(`Hi I'm ${assistants[i]?.name}`, { position: "bottom-center" });
  //       }
  //     }
  //     // console.log(assistants)
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log("error", error);
  //     toast.error("Error listing assistants", { position: "bottom-center" });
  //   } finally {
  //     setIsLoading(false);
  //     setListing(false);
  //   }
  // };
  // **************************************************************************
  //  Handles the initial loading of the assistants and setting a default assistant
  // **************************************************************************
  const handleAssistant = async () => {
    setIsLoading(true);
    setListing(true);
    try {
      const response = await axios.get<{ assistants: Assistant[] }>(
        `/api/assistant/list`
      );

      const assistants = response.data.assistants;
      // setAssistant(assistants);
      // if (pageID !== 'file') {
      for (let i = 0; i < assistants.length; i++) {
        if (assistants[i].id === defaultAssistant?.id) {
          setAssistant(assistants[i]);
          // console.log(assistant);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
      // toast.error("Error listing assistants", { position: "bottom-center" });
    } finally {
      setListing(false);
      setIsLoading(false);
      console.log('Updated assistant!');
    }
  };
  // **************************************************************************
  //  Handles the thread creation 
  // **************************************************************************
  // const handleThreadCreate = async () => {
  //   setCreating(true);
  //   try {
  //     const response = await axios.get<{ thread: Thread }>(
  //       "/api/thread/create"
  //     );

  //     const newThread = response.data.thread;
  //     setThread(newThread);
  //     localStorage.setItem("thread", JSON.stringify(newThread));
  //     await updateDoc(doc(firebase.firestore, "users", currentUser?.id), { thread: newThread }).then(() => {
  //       console.log(`Thread data was added to the user's document`);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     // toast.error("Failed to create thread", { position: "bottom-center" });
  //   } finally {
  //     setCreating(false);
  //   }
  // };
  // **************************************************************************
  //  Starts a run polling for processing the user request 
  // **************************************************************************
  const startPolling = (runId: string) => {
    if (!thread) return;
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get<{ run: Run }>(
          `/api/run/retrieve?threadId=${thread.id}&runId=${runId}`
        );
        const updatedRun = response.data.run;

        setRun(updatedRun);
        setRunState(updatedRun.status);

        if (
          ["cancelled", "failed", "completed", "expired"].includes(
            updatedRun.status
          )
        ) {
          clearInterval(intervalId);
          setPollingIntervalId(null);
          // fetchMessages();
        }
      } catch (error) {
        console.error("Error polling run status:", error);
        clearInterval(intervalId);
        setPollingIntervalId(null);
      }
    }, 500);

    setPollingIntervalId(intervalId);
  };
  // **************************************************************************
  //  Starts the run request for thread and assistant processing
  // **************************************************************************
  const handleCreate = async () => {
    if (!assistant || !thread) return;

    setCreating(true);
    try {
      const response = await axios.get<{ run: Run }>(
        `/api/run/create?threadId=${thread.id}&assistantId=${assistant.id}`
      );

      const newRun = response.data.run;
      setRunState(newRun.status);
      setRun(newRun);
      localStorage.setItem("run", JSON.stringify(newRun));

      // Start polling after creation
      startPolling(newRun.id);
    } catch (error) {
      // toast.error("Error creating run.", { position: "bottom-center" });
      console.error(error);
    } finally {
      setCreating(false);
    }
  };
  // **************************************************************************
  //  Handles the cancel thread run 
  // **************************************************************************
  const handleCancel = async () => {
    if (!run || !thread) return;

    setCanceling(true);
    try {
      const response = await axios.get<{ run: Run }>(
        `/api/run/cancel?runId=${run.id}&threadId=${thread.id}`
      );

      const newRun = response.data.run;
      setRunState(newRun.status);
      setRun(newRun);
      toast.success("Canceled", { position: "bottom-center" });
      setLoading(false);
      localStorage.setItem("run", JSON.stringify(newRun));
    } catch (error) {
      // toast.error("Error canceling run.", { position: "bottom-center" });
      console.error(error);
      setLoading(false);
    } finally {
      setCanceling(false);
      setLoading(false);
    }
  };
  // **************************************************************************
  //  Logs the data when the form is submitted
  // **************************************************************************
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // console.log(data);
  };

  // **************************************************************************
  //  Scroll to bottom of page
  // **************************************************************************
  const handleScrollToBottom = () => {
    setScrollToEnd(!scrollToEnd);
  };

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
        <header className="flex flex-col gap-4 border-b border-muted pb-5 3xl:flex-row 3xl:items-center">
          <div style={{ justifyContent: "space-between" }} className="flex flex-col items-start justify-between gap-3 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
            <div className="flex w-full">
              <Avatar
                name={assistant?.name ? assistant?.name : 'Assistant'}
                initials={'Ai'}
                src={defaultAssistant?.profilePicture ? defaultAssistant?.profilePicture : assistantImage}
                className="!h-8 !w-8 bg-[#70C5E0] font-medium text-white xl:!h-12 xl:!w-12"
              />
              <h6 className="mt-4 ml-2">{defaultAssistant?.name ? defaultAssistant?.name : "Assistant"}</h6>
            </div>
            {/* <ActionDropdown assistants={assistantsData} setDefaultAssistant={handleChangeAssistant} className="ml-auto sm:ml-[unset]" /> */}
          </div>
        </header>



        <div style={{ maxHeight: 600, height: 400 }}>
          <SimpleBar style={{ height: '100%' }} classNames={{
            contentEl: 'simplebar-content-element'
          }}>
            <MessageBody synth={synth} stopSpeaking={handleStopSpeak} scrollToBottom={scrollToEnd} speaking={playing} handlePlay={handlePlay} isLoading={loading} audio={newAudio} speakMessage={handleSpeak} status={runState} assistantObj={assistant} defaultAssistant={defaultAssistant} threadObj={thread} />
          </SimpleBar>
        </div>

        {/* <Button onClick={handleScrollToBottom} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          Scroll to Bottom
        </Button> */}

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
            className="dark:bg-gray-200 dark:text-white"
          >
            <PiStopCircleBold className="h-4 w-4" />
          </Button>)}
          <div
            className="relative rounded-lg w-full bg-gray-30 p-1.5"
            style={{
              maxWidth: formWidth(),
            }}
          >
            <Form<FormValues> onSubmit={onSubmit} validationSchema={FormSchema}>
              {({ control, watch, formState: { errors } }) => {
                return (
                  <>
                    <div className="relative mb-1 w-full flex items-center justify-between">
                      {/* {!listening ? <Button
                        type="button"
                        onClick={startListening}
                        className="dark:bg-gray-200 dark:text-white"
                        // disabled={(runState === "queued" || runState === "in_progress" || runState === "cancelling" || runState === "requires_action") ? true : false}
                        disabled={true}
                      >
                        <PiMicrophoneStage className="h-4 w-4" />
                      </Button> : <Button
                        type="button"
                        onClick={stopListening}
                        className="dark:bg-gray-200 dark:text-white"
                      >
                        <PiStopCircleBold className="h-4 w-4" />
                      </Button>} */}

                      <input
                        type="text"
                        className="rounded-md bg-gray-0 dark:bg-gray-50 flex-grow mr-2.5 [&>.ql-container_.ql-editor]:min-h-[100px]"
                        value={messageData}
                        onChange={(e) => setMessageData(e.target.value)}
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
                        onClick={handleCancel}
                        className="dark:bg-gray-200 dark:text-white"
                        disabled={canceling ? true : false}
                      >
                        <PiStopCircleBold className="h-4 w-4" />
                      </Button>}

                    </div>
                  </>
                );
              }}
            </Form>
          </div>
        </div>
      </div>
      <Text className='text-xs text-center w-4/5 p-4 m-auto leading-relaxed'>Disclaimer: Outputs from the AIgent should not be considered legal, financial, or tax advice and is for informational purposes in your journey and to engage in dialogue to help you make decisions. Our AIgents can make mistakes. Consider checking important information with your advisors or “Hire a Professional“ tab for extra guidance.
      </Text>
    </div>
  );
}

export function DotSeparator({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      {...props}
    >
      <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
    </svg>
  );
}

