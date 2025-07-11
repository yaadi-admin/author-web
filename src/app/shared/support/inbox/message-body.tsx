'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useAtomValue, useAtom } from 'jotai';
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
import { currentSession } from '@/config/session';
import { FiExternalLink } from 'react-icons/fi';
import { HiOutlineClipboardDocument } from 'react-icons/hi2';
import { PiEye, PiDownloadSimpleBold, PiCheck, PiPaperPlaneRightLight, PiStopCircleBold, PiMicrophoneStage, PiFileAudioFill, PiPlayPauseBold, PiPauseCircle, PiPlay, PiStop } from 'react-icons/pi';
import { Avatar, Title, Text, Tooltip, Empty, Button } from 'rizzui';
import { getRelativeTime } from '@/utils/get-relative-time';
import cn from '@/utils/class-names';
import {
  dataAtom,
  messageIdAtom,
} from '@/app/shared/support/inbox/message-list';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { DotSeparator } from '@/app/shared/support/inbox/message-details';
import pdfIcon from '@public/pdf-icon.svg';
import { ThreadMessage } from "openai/resources/beta/threads/messages/messages";
import { Assistant } from "openai/resources/beta/assistants/assistants";
import toast from "react-hot-toast";
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import ExportedComponent from './pulser';
import { identifyVoice } from '../../multi-step/multi-step-1/story/chat/config';

export default function MessageBody({ className, status, speaking, speakMessage, stopSpeaking, audio, scrollToBottom, synth, handlePlay, assistantObj, defaultAssistant, threadObj, isLoading }:
  { className?: string, status?: any, speaking?: any, speakMessage?: any, stopSpeaking?: any, audio: any, synth?: any, handlePlay: any, scrollToBottom?: any, assistantObj?: any, defaultAssistant?: any, threadObj?: any, isLoading?: any, }) {
  const data = useAtomValue(dataAtom);
  const [currentUser, setCurrentUser] = useState(currentSession()) as any;
  const messageId = useAtomValue(messageIdAtom);
  const [isCopied, setIsCopied] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard() as any;
  const assistantImage = 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/8cac64f9-587d-418f-9d75-7ad36ada1458.png?alt=media&token=f3c3f181-87fc-49ec-a186-246b1a2dc47b';
  const userImage = 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/icons8-user-100.png?alt=media&token=06bf6b37-880b-4fff-94af-621401a66d22';
  const [lastSpokenMessage, setLastSpokenMessage] = useState(null);
  const visualizerRef = useRef<HTMLCanvasElement>(null)

  // const [pulseColor, setPulseColor] = useState('#ff0000'); // Initial color
  // const [scale, setScale] = useState(1); // Initial scale
  // Atom State
  const assistant = assistantObj;
  const [thread, setThread] = useState(threadObj);
  const [messages, setMessages] = useAtom(messagesAtom);
  // State
  const [message, setMessage] = useState("") as any;
  const [sending, setSending] = useState(false);
  const [listing, setListing] = useState(false);
  const [fetching, setFetching] = useState(false);
  const lastMessageRef = useRef(null) as any;
  const prevLengthRef = useRef(messages ? messages.length : 0);

  useEffect(() => {
    if (messages?.length > prevLengthRef.current) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevLengthRef.current = messages?.length;
  }, [messages, scrollToBottom]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Random color generation
  //     const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  //     setPulseColor(randomColor);
  //     setScale(1.2); // Set scale for the pulse effect
  //     setTimeout(() => {
  //       setScale(1); // Reset scale after pulse
  //     }, 250); // Reset scale after 250 milliseconds
  //   }, 300); // Pulse every 300 milliseconds

  //   return () => clearInterval(interval); // Cleanup on component unmount
  // }, [speaking]);

  useEffect(() => {
    fetchMessages();
  }, [threadObj, status]);

  const fetchMessages = async () => {
    setFetching(true);
    if (!threadObj) return;

    try {
      axios
        .get<{ messages: ThreadMessage[], speak: any }>(
          `/api/message/list?threadId=${threadObj?.id}`
        )
        .then((response) => {
          let newMessages = response.data.messages as any;

          if (newMessages?.length) {
            setMessages(newMessages);
            const lMessage = newMessages[newMessages?.length - 1];
            if (lMessage?.role === "assistant") {
              // Speak the last message if it exists and it's different from the last spoken message
              const lastMessage = lMessage?.content[0]?.text?.value;
              const storedLastMessage = localStorage.getItem("lastMessage");
              // fetchMessageVoice(lastMessage);
              if (lastMessage && lastMessage !== storedLastMessage) {
                if (lastMessage) {
                  console.log('fetching voice')
                  fetchMessageVoice(lastMessage);
                  localStorage.setItem("lastMessage", lastMessage);
                }
              }
              if (newMessages?.length > prevLengthRef.current) {
                lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
              }
              prevLengthRef.current = newMessages?.length;
            }
          }

        });
    } catch (error) {
      console.log("error", error);
      toast.error("Error fetching messages", { position: "bottom-center" });
    } finally {
      setFetching(false);
    }
  };

  const fetchMessageVoice = async (message: any) => {
    if (!message) return;
    const voice = identifyVoice('finn');
    try {
      axios
        .get<{ speak: any }>(
          `/api/voice/speak?message=${message}&voice=${voice}`
        )
        .then(async (response) => {
          let speakValue = response.data.speak as any;
          const buffer = Buffer.from(speakValue, 'base64');
          const rand = Math.floor(Math.random() * (2000000 - 100 + 1)) + 100;
          const storageRef = ref(firebase.storage, `documents/${`audio_` + rand}.mp3`);
          await uploadBytes(storageRef, buffer);
          const downloadURL = await getDownloadURL(storageRef);
          console.log("downloadURL", downloadURL);
          speakMessage(downloadURL);
        });
    } catch (error) {
      console.log("error", error);
      toast.error("Error fetching voice response", { position: "bottom-center" });
    } finally {

    }
  };

  if (messages?.length < 1) {
    return (
      <div
        className={cn(
          '!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center',
          className
        )}
      >
        <Empty
          text="Ask a question to get started"
          textClassName="mt-4 text-base text-gray-500"
        />
      </div>
    );
  }


  if (messages?.length > 0) {
    return (
      <div>
        {!speaking ? messages.map((message, index) => (
          <div
            ref={index === messages?.length - 1 ? lastMessageRef : null}
            key={message.id}>
            {!speaking &&
              <div style={{
                marginTop: '5%',
              }} className='flex flex-col'>
                {audio && message.role !== "user" && index === messages?.length - 1 && <div style={{ marginLeft: '70%', marginBottom: '-2.5%' }} >
                  <PiPlay style={{ color: 'darkgoldenrod' }} onClick={handlePlay} className="me-1.5 h-[30px] w-[30px]" />
                </div>}
                <div
                  style={{ marginLeft: message.role === "user" ? '30%' : '0%', marginRight: message.role === "user" ? '0%' : '30%', backgroundColor: message.role === "user" ? '#70C5E0' : '#F3F4F6', padding: '10px', borderRadius: '10px' }}>
                  <div className="ml-1 mt-1 grid gap-2 leading-relaxed xl:ml-1 2xl:mt-1">
                    {<Text>{message?.content[0]?.type === "text"
                      ? message?.content[0]?.text?.value
                      : null}</Text>}
                  </div>
                </div>

              </div>}
          </div>))
          :
          <div onClick={stopSpeaking} className='flex flex-col items-center rounded-lg border-muted w-full'>
            <ExportedComponent />
          </div>}
      </div>
    );
  }
}
