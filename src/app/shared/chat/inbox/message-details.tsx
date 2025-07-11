'use client';

import { useAtomValue } from 'jotai';
import { z } from 'zod';
import { useState, useEffect, useRef } from 'react';
import { PiCaretDownBold, PiFileArchiveDuotone, PiPaperPlaneRightLight, PiMicrophoneStage } from 'react-icons/pi';
import {
  Button,
  Avatar,
  Empty,
  Select,
  Loader,
  Dropdown,
} from 'rizzui';
import cn from '@/utils/class-names';
import firebase from '@/config/firebase.config';
import toast from 'react-hot-toast';
import {
  dataAtom,
} from '@/app/shared/support/inbox/message-list';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import SimpleBar from '@/components/ui/simplebar';
import { useElementSize } from '@/hooks/use-element-size';
import { useMedia } from '@/hooks/use-media';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { currentSession } from '@/config/session';
import ChatBody from './message-body';
import ChatFileUpload from '../../chat-file-upload';
import UploadButton from '../../upload-button';

const FileUpload = dynamic(() => import('@/app/shared/file-upload'), {
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

const contactStatuses = [
  {
    value: 'New',
    label: 'New',
  },
  {
    value: 'Waiting on contact',
    label: 'Waiting on contact',
  },
  {
    value: 'Waiting on us',
    label: 'Waiting on us',
  },
  {
    value: 'Closed',
    label: 'Closed',
  },
];

const CustomDropdown = ({ onSelect }: { onSelect: (option: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200 text-blue-500 p-2 rounded-md"
      >
        <PiFileArchiveDuotone className="h-4 w-4" />
      </Button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <div
              onClick={() => handleSelect('file')}
              className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              File
            </div>
            <div
              onClick={() => handleSelect('image')}
              className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Image
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function ChatDetails({ className, selectedChannel, message }: { className?: string; selectedChannel?: string; setSelectedChannel?: any, message?: any }) {
  const data = useAtomValue(dataAtom);
  const currentUser = currentSession() as any;
  const [isLoading, setIsLoading] = useState(false);
  const [ref, { width }] = useElementSize();
  const isWide = useMedia('(min-width: 1280px) and (max-width: 1440px)', false);

  const [assistantList, setAssistantList] = [
    {
      value: 'Passive',
      label: 'Passive',
    },
    {
      value: 'Responsive',
      label: 'Responsive',
    },
    {
      value: 'Active',
      label: 'Active',
    },
  ];

  // Atom State
  const [messages, setMessages] = useState([]) as any;

  // State
  const [messageData, setMessageData] = useState("");
  const [sending, setSending] = useState(false);
  const [localFile, setLocalFile] = useState("") as any;
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const { push } = useRouter();

  const handleSpeak = (text: string | undefined) => {
    const utterance = new SpeechSynthesisUtterance(text);
    // synth.speak(utterance);
  };

  const stopSpeaking = () => {
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const downloadURL = localStorage.getItem('fileDownloadURL');
      if (downloadURL) {
        setLocalFile(downloadURL);
        localStorage.removeItem('fileDownloadURL');
        clearInterval(interval); // Stop checking once URL is found
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const sendMessage = async () => {
    setSending(true);
    const docRef = doc(collection(firebase.firestore, "chat"));
    const messageRef = doc(collection(firebase.firestore, "messages"));
    const channel = docRef?.id;
    const chatObject = {
      createdAt: serverTimestamp(),
      id: docRef?.id,
      userID: currentUser?.id,
      user: currentUser,
      from: currentUser?.id,
      selected: false,
      channel: channel,
      to: '',
      toID: '',
      title: 'Mark Scott',
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      avatar:
        currentUser?.profilePictureURL,
      company: 'NA',
      markedAsRead: false,
      summary:
        messageData,
      description:
        messageData,
      date: serverTimestamp(),
      category: 'open',
      hasAttachments: false,
      status: 'Closed',
      supportType: 'Chat',
      priority: 'Medium',
      attachments: [
        {}
      ],
    };

    const messageObject = {
      createdAt: serverTimestamp(),
      id: messageRef?.id,
      userID: currentUser?.id,
      user: currentUser,
      from: currentUser?.id,
      channel: channel,
      to: '',
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      avatar:
        currentUser?.profilePictureURL,
      message:
        messageData,
      date: serverTimestamp(),
      category: 'open',
      hasAttachments: false,
      status: false,
      attachments: [
        {}
      ],
    };
    try {
      await setDoc(docRef, chatObject);
      await setDoc(messageRef, messageObject);
      toast.success("Message sent", { position: "bottom-center" });
      setMessageData('');
      setSending(false);
    }
    catch (error) {
      console.error(error);
      toast.error("Error sending message", { position: "bottom-center" });
      setSending(false);
    }
  };

  const sendChatMessage = async () => {
    setSending(true);
    const messageRef = doc(collection(firebase.firestore, "messages"));
    const messageObject = {
      createdAt: serverTimestamp(),
      id: messageRef?.id,
      userID: currentUser?.id,
      user: currentUser,
      from: currentUser?.id,
      channel: selectedChannel,
      to: '',
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      avatar:
        currentUser?.profilePictureURL,
      message:
        messageData,
      date: serverTimestamp(),
      category: 'open',
      hasAttachments: false,
      status: false,
      attachments: [
        {}
      ],
    };
    try {
      await setDoc(messageRef, messageObject);
      toast.success("Message sent", { position: "bottom-center" });
      setMessageData('');
      setSending(false);
    }
    catch (error) {
      console.error(error);
      toast.error("Error sending message", { position: "bottom-center" });
      setSending(false);
    }
  }

  useEffect(() => {
    if (currentUser?.id && selectedChannel) {
      const unsubscribe = fetchData();
      if (unsubscribe) {
        return () => unsubscribe();
      }
    }
  }, [selectedChannel, currentUser?.id]);

  const fetchData = () => {
    try {
      const q = query(collection(firebase.firestore, "messages"), where("channel", "==", selectedChannel), orderBy("createdAt", "asc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const dataFields = querySnapshot.docs
          .map(doc => doc.data());

        setMessages(dataFields);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  function formWidth() {
    if (isWide) return width - 64;
    return width - 44;
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const handleStartRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          setMediaRecorder(mediaRecorder);

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              setAudioBlob(event.data);
            }
          };

          mediaRecorder.start();
          setIsRecording(true);
        })
        .catch(error => {
          console.error('Error accessing microphone:', error);
          toast.error("Error accessing microphone", { position: "bottom-center" });
        });
    } else {
      toast.error("Microphone not supported", { position: "bottom-center" });
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);

      if (audioBlob) {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.wav');

        axios.post('/api/upload-audio', formData)
          .then(response => {
            toast.success("Audio uploaded successfully", { position: "bottom-center" });
          })
          .catch(error => {
            console.error('Error uploading audio:', error);
            toast.error("Error uploading audio", { position: "bottom-center" });
          });
      }
    }
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
        'relative pt-6 lg:rounded-lg lg:border lg:border-muted lg:px-4 lg:py-7 xl:px-5 xl:py-5 2xl:pb-7 2xl:pt-6',
        className
      )}
    >
      <div>
        <header className="flex flex-col gap-4 border-b border-muted pb-5 3xl:flex-row 3xl:items-center">
          <div style={{ justifyContent: "space-between" }} className="flex flex-col items-start justify-between gap-3 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
            <div className="flex items-center gap-2">
              <Avatar
                src={currentUser?.id === message?.userID ? message?.toUser?.profilePictureURL : message?.profilePictureURL}
                size="sm"
                name={currentUser?.id === message?.userID ? `${message?.toUser?.firstName} ${message?.toUser?.lastName}` : `${message?.firstName} ${message?.lastName}`}
              />
              <p style={{ marginTop: '2.5%' }} className='mb-1'>
                {currentUser?.id === message?.userID ? message?.toUser?.firstName : message?.firstName} {currentUser?.id === message?.userID ? message?.toUser?.lastName : message?.lastName}
              </p>
            </div>
          </div>
        </header>

        <div className="[&_.simplebar-content]:grid [&_.simplebar-content]:gap-8 [&_.simplebar-content]:py-5 min-h-[356px]">
          <SimpleBar className="max-h-[356px] min-h-[200px]">
            <ChatBody
              messages={messages}
            />
          </SimpleBar>
        </div>

        <div
          ref={ref}
          className="flex items-start rounded-b-lg @3xl:pt-4 lg:gap-4 lg:pl-0 xl:grid-cols-[48px_1fr] dark:bg-transparent dark:lg:pt-0"
        >
          <div className="items-center justify-between gap-2 mt-6">
            <CustomDropdown onSelect={(option) => console.log(`${option} selected`)} />
            <Button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className="bg-gray-200 text-blue-500 p-2 rounded-md mt-6"
            >
              <PiMicrophoneStage className="h-4 w-4" />
            </Button>
          </div>
          <div
            className="rounded-lg border border-muted bg-gray-50 p-4 2xl:p-5 w-full"
          >
            <Form<FormValues> onSubmit={onSubmit} validationSchema={FormSchema}>
              {({ control, watch, formState: { errors } }) => {
                return (
                  <>
                    {localFile && <div className="flex justify-start">
                      <PiFileArchiveDuotone size={40} className="h-4 w-4 mr-2" />
                      <p>File url: {localFile.slice(0, 50)}...</p>
                    </div>}

                    <div className="mb-2.5 flex items-center justify-between">
                      <textarea
                        className="rounded-md bg-gray-0 dark:bg-gray-50 flex-grow mr-2.5 min-h-[100px] p-2"
                        value={messageData}
                        onChange={(e) => setMessageData(e.target.value)}
                      />

                      <Button
                        type="submit"
                        onClick={sendChatMessage}
                        className="dark:bg-gray-200 dark:text-white"
                        disabled={messageData === "" && selectedChannel === "" ? true : false}
                      >
                        <PiPaperPlaneRightLight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                );
              }}
            </Form>
          </div>
        </div>
      </div>
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

type AvatarOptionTypes = {
  avatar: string;
  label: string;
  [key: string]: any;
};

