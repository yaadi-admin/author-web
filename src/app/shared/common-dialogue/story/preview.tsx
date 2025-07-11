'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { Textarea, Button, Text, Input } from 'rizzui'
import Confetti from 'react-confetti';
import {
  formDataAtom,
  useStepperAudio,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import { BASE_URL } from '@/config/bots';

import { currentCard } from '@/config/current-card';
import { currentSession } from '@/config/session';
import { CiRedo } from "react-icons/ci";
import { TbDownload, TbEdit } from "react-icons/tb";
import Markdown from 'react-markdown'
import { marked } from 'marked';
import { MdOutlineRedo, MdDone } from "react-icons/md";
import { intakes } from '@/config/seller/intakes';
import FormSummary from '../form-summary';
import axios from 'axios';
import { synthesizeData } from './chat/messages';
import Loader from '@/components/ui/loader';
import { controls } from '@/config/ref/controls';
import { ThreadEvents } from './chat/types';
import { addDoc, collection } from 'firebase/firestore';
import firebase from '@/config/firebase.config';

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
  const [email, setEmail] = React.useState('');
  const [companyTriviaIndex, setCompanyTriviaIndex] = useState(0);
  const [isDone, setDone] = useState(false);
  const sectionRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: any) => {
    gotoNextStep();
  };

  useEffect(() => {
    const rosettaOutput = localStorage.getItem('rosettaOutput');
    setMsg(`${rosettaOutput}`);
  }, [])
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

  const onDone = async () => {
    //handle axios
    setIsLoading(true);

    try {

      const rosettaOutput = localStorage.getItem('rosettaOutput');

      const url = `${BASE_URL}/api/bizbridge/serv/authenticate`;

      await addDoc(collection(firebase.firestore, "demo-leads"), {
        email,
        name: localStorage.getItem('name'),
        companyName: localStorage.getItem('companyName'),
        title: 'Narro Demo Report',
        report: rosettaOutput,
      });

      const response = await axios.post(
        url,
        {
          toUserEmail: email,
          title: `Narro Demo Report`,
          markup: rosettaOutput,
          function: 'sendDemoCompleteEmail',
        },
        {
          headers: {
            Authorization: 'skl-bhdbjcbcbcbdjb'
          },
        }
      );

    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setDone(true);
    }


  }
  if (isDone) {
    return (
      <div className="w-full max-w-xl px-6 col-span-full mx-auto">
        <figure className="relative mb-12 aspect-[60/45] md:mb-20">
          <Image
            src={
              'https://isomorphic-furyroad.s3.amazonaws.com/public/congratulations.jpg'
            }
            alt="congratulation image"
            fill
            priority
            sizes="(max-width: 768px) 140px"
            className="h-auto w-full object-cover"
          />
        </figure>
        <Confetti className="!fixed" />
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-900 md:text-2xl">
            Congratulations!
          </h2>
          <p className="mb-6 text-gray-500">Check your email for the results of your report at
            <b className="ml-2">
              {email}
            </b>
          </p>
        </div>
      </div>

    )
  }
  return (
    <div className="w-full max-w-xl px-6 col-span-full mx-auto">
      <div className="text-center">
        <h2 className="mb-2 text-xl font-semibold text-gray-900 md:text-2xl">
          {"Thank you for trying our demo! We will need your email to send the report."}
        </h2>
        <p className="mb-6 text-gray-500">{"Kindly provide your email address, and we’ll send the report results right to your inbox!"}
        </p>
        <Input
          label={'Email Address'}
          placeholder={'Email-address'}
          value={email}
          className='my-5'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button

          disabled={isLoading}
          rounded="pill"
          variant='solid'
          onClick={() => onDone()}
          color="primary"
          className="ml-auto gap-1"
        >
          {`Submit`}

          {isLoading ?
            <Loader />
            :
            null
          }
        </Button>

      </div>
    </div>
  )
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
        cardTitle={'Your Business Story'}
        title={'Your Business Story'}
        showTitle={false}
        description={''}
      // className='ml-10'
      />

      <div className="flex flex-col items-center mt-10 ">


        {/* <div className="flex w-[70%] mb-5"> */}
        {/* <Button id="print" className='ml-auto' onClick={handlePrint}>Download Succession Plan
            <TbDownload className='ml-2 h-5 w-5' />
          </Button> */}
        {/* </div> */}
        {/* @ts-ignore */}

        <div ref={sectionRef} className='flex flex-col 4xs:w-full md:w-[70%] bg-white p-10 border min-h-[800px] h-auto gap-10 shadow-lg'>
          <h1 className='text-center'>{'Your Business Story'}</h1>

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
