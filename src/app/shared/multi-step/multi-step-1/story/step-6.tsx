'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { Textarea, Button, Text } from 'rizzui'
import Confetti from 'react-confetti';
import {
  formDataAtom,
  useStepperAudio,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import { currentCard } from '@/config/current-card';
import { currentSession } from '@/config/session';
import { CiRedo } from "react-icons/ci";
import { TbDownload, TbEdit } from "react-icons/tb";
import Markdown from 'react-markdown'
import { marked } from 'marked';
import { MdOutlineRedo, MdDone } from "react-icons/md";
import { intakes } from '@/config/seller/intakes';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import axios from 'axios';
import { BASE_URL, ROSETTA_ID } from './chat/config';
import { synthesizeData } from './chat/messages';
import Loader from '@/components/ui/loader';
import { controls } from '@/config/ref/controls';
import { ThreadEvents } from './chat/types';

interface PreviewProps {
  storySummary: string;
  threadId: string,
  setLoading: (val: boolean) => void;
  rosetta: boolean,
}

export default function Preview(props: PreviewProps) {
  const { threadId, rosetta, setLoading } = props;
  const { step, gotoNextStep } = useStepperOne();
  const user = currentSession() as any;
  const card = currentCard() as any;
  const currIntake = intakes(user.id)[0];

  const logo = currIntake?.logo || 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/The%20Nook%20Logo.png?alt=media&token=aee23fd5-522d-47f4-b30b-29b4a09fea04';
  // const storedLastMessage = localStorage.getItem("lastMessage") as any;
  const [msg, setMsg] = React.useState('');
  const [isEditing, setEditing] = React.useState(false);
  const [rosettaMsgSent, setRosettaMsgSent] = React.useState(false)
  const endOfMessagesRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [companyTriviaIndex, setCompanyTriviaIndex] = useState(0);
  const sectionRef = useRef();


  React.useEffect(() => {
    setLoading(true);
  }, [])
  useEffect(() => {
    async function sendRosettaPrompt() {
      try {
        const rosetta = card.section5.rosettaPrompt?.length > 0 ? card.section5.rosettaPrompt : synthesizeData;
        const response = await axios.post(
          `${BASE_URL}/api/threads/${threadId}/messages`,
          {
            message: rosetta,
          }
        );
        setRosettaMsgSent(true);
      } catch (error) {
        setRosettaMsgSent(false);
        // toast.error("Error setting prompt", { position: "bottom-center" });
      } finally {

      }
    };

    if (rosetta && threadId) {
      sendRosettaPrompt();
    }
  }, [rosetta, card, threadId])


  useEffect(() => {
    if (!rosettaMsgSent) {

      if (companyTriviaIndex < controlsAdmin?.quotes.length - 1) {
        const timer = setTimeout(() => {
          setCompanyTriviaIndex(companyTriviaIndex + 1);
        }, 12000); // 8 seconds

        // Cleanup the timer
        return () => clearTimeout(timer);
      }
    }
  }, [companyTriviaIndex, rosettaMsgSent]);

  useEffect(() => {
    if (!rosettaMsgSent) {

      if (currentIndex < processMessages.length - 1) {
        const timer = setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
        }, 8000); // 3 seconds

        // Cleanup the timer
        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, rosettaMsgSent]);


  useEffect(() => {
    if (rosettaMsgSent) {
      // STREAM RUN
      // https://platform.openai.com/docs/api-reference/runs/createRun
      const eventSource = new EventSource(`${BASE_URL}/api/threads/${threadId}/runs?assistantId=${ROSETTA_ID}&threadId=${threadId}`);

      eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data) as any;
        if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
          localStorage.setItem('dialogueMessage', eventData.data.content[0].text.value);
          // console.log('done');
          // setRosettaSending('done');
          // gotoNextStep();
          setLoading(false);
        }
        console.log(eventData.data)
        if (eventData?.data?.delta?.content?.[0]?.text?.value) {
          const msgdb = eventData.data.delta.content[0].text.value;
          // console.log(msgdb);
          setMsg((prev: any) => prev + msgdb)
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
  }, [rosettaMsgSent]);


  const onSubmit = (data: any) => {
    gotoNextStep();
  };


  useEffect(() => {
    if (msg.length > 0)
      //@ts-ignore
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);

  const lines = msg.split('\n');


  const processMessages = [
    "Preparing your data...",
    "Removing filler words...",
    "Constructing your story...",
    "Finalizing the details..."
  ];
  const controlsAdmin = controls()[1] as any;
  const randomTrivia = controlsAdmin?.quotes[companyTriviaIndex];


  const LoadingComp = (
    <div className='col-span-full'>
      <div className='w-1/2 flex flex-col gap-10 items-center mx-auto'>
        <h1>{processMessages[currentIndex]}</h1>
        <Loader />
        <div className='mt-10 flex flex-col gap-5'>
          <Text className='font-bold'>Words of Wisdom</Text>
          <h2>{randomTrivia?.label}</h2>
          <Text className='ml-auto'> - {randomTrivia?.by}</Text>
        </div>
      </div>
    </div>
  );



  const markdown = lines.map((line, index) => {
    if (line === '') {
      return '\n';
    }
    if (line.startsWith('#### ')) {
      return `#### ${line.substring(5)}\n`;
    }
    if (line.startsWith('### ')) {
      return `### ${line.substring(4)}\n`;
    }
    if (line.startsWith('## ')) {
      return `## ${line.substring(3)}\n`;
    }
    if (line.startsWith('# ')) {
      return `# ${line.substring(2)}\n`;
    }

    return `${line}\n`;
  }).join('\n')

  const html = marked(markdown, { async: false });


  if (msg.length === 0) {
    return <div
      style={{
        height: 'inherit',
      }}
      className='col-span-full flex items-center justify-center'
    >
      {LoadingComp}
    </div>;
  }

  const handlePrint = async () => {
    if (sectionRef.current) {
      // @ts-ignore
      window.print();
    }
  };


  return (

    <form
      id={`rhf-${step.toString()}`}
      onSubmit={onSubmit}
      style={{
        height: 'inherit',
      }}
      className='mx-auto grid w-full h-full col-span-full'
    >
      <FormSummary
        cardTitle={card?.section5?.title}
        title={card?.section5?.title}
        showTitle={false}
        description={''}
        className='ml-10'
      />

      <div className="flex flex-col items-center mt-10 ">


        {/* <div className="flex w-[70%] mb-5"> */}
        {/* <Button id="print" className='ml-auto' onClick={handlePrint}>Download Succession Plan
            <TbDownload className='ml-2 h-5 w-5' />
          </Button> */}
        {/* </div> */}
        {/* @ts-ignore */}

        <div ref={sectionRef} className='flex flex-col w-[70%] bg-white p-10 border min-h-[800px] h-auto gap-10 shadow-lg'>
          <h1 className='text-center'>{card?.section5?.title}</h1>

          <div className='flex items-center'>

            <div className='ml-auto flex flex-col items-center '>
              <Image
                src={logo}
                width={100}
                height={100}
                className="object-contain"
                alt={'load image logo'}
              />
            </div>
          </div>
          {
            isEditing ? <Textarea
              // label="Summary"
              placeholder=""
              rows={40}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            /> :

              <div style={{ whiteSpace: 'pre-wrap', height: '600px', overflowY: 'auto' }}
              >
                <div dangerouslySetInnerHTML={{ __html: html }} />
                {/* <Markdown>

                </Markdown> */}
                {/* {marked.parse(
                  } */}

                <div ref={endOfMessagesRef} />
              </div>
          }
          <div className='flex'>
            {/* {
              <Button variant="outline" onClick={() => { }}>
                <MdOutlineRedo className='me h-5 w-5 mr-1' />
                Redo
              </Button>
            } */}
            <div className='ml-auto flex gap-5'>

              {!isEditing && msg.length > 0 &&
                <Button variant="flat" color="primary" onClick={() => setEditing(true)}><TbEdit className='me h-5 w-5 mr-1' />Edit</Button>
              }
              {isEditing &&
                <Button variant="flat" color="primary" onClick={
                  () => {
                    setEditing(false)
                    localStorage.setItem('dialogueMessage', msg);
                  }
                }><MdDone className='me h-5 w-5 mr-1' /> Done </Button>
              }

            </div>
          </div>
        </div>
      </div>
      <Text className='text-center w-4/5 p-4 m-auto leading-loose' style={{ fontSize: 10 }}>
        Disclaimer: Outputs from the AIgent should not be considered legal, financial, or tax advice and is for informational purposes in your journey and to engage in dialogue to help you make decisions. Our AIgents can make mistakes. Consider checking important information with your advisors or “Hire a Professional“ tab for extra guidance.
      </Text>
    </form>
  );

}
