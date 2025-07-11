'use client';

import {
  useStepperOne
} from '@/app/shared/multi-step/multi-step-1';
import Loader from '@/components/ui/loader';
import { cimCollection } from '@/config/ref/cimBuilderCollection';
import { controls } from '@/config/ref/controls';
import { cim } from '@/config/seller/cim';
import { currentSession } from '@/config/session';
import { marked } from 'marked';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { MdDone } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Button, Text, Textarea } from 'rizzui';
import Footer from '../common/footer';

interface PreviewProps {
  listingId: string,
  id: string,
  onNext: (val: string) => void,
  children?: ReactNode; // Add this line to include children
}

export default function Preview(props: PreviewProps) {
  const { listingId, id, onNext, children } = props;
  const { getMyCIM, updateMyCIM, getAllCards, findNextStep } = cim(listingId)
  const { step, gotoNextStep } = useStepperOne();
  const { data: cimData } = cimCollection();
  const specificData = cimData.find((d: any) => d.id === id);
  const user = currentSession() as any;
  const [msg, setMsg] = React.useState('');
  const [isEditing, setEditing] = React.useState(false);
  const endOfMessagesRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [companyTriviaIndex, setCompanyTriviaIndex] = useState(0);
  const sectionRef = useRef();
  // const [cardData, setCardData] = useState<DocumentData | null | undefined>(null);


  useEffect(() => {
    async function fetchCardData() {
      const data: any = await getMyCIM({ listingId, cardId: id });
      setMsg(data?.summary || '')
    }
    fetchCardData();
  }, []);

  const onSubmit = (data: any) => {

    // gotoNextStep();
  };


  useEffect(() => {
    if (msg.length > 0)
      //@ts-ignore
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);

  const lines = (msg).split('\n');


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


  // if (msg.length === 0) {
  //   return <div
  //     style={{
  //       height: 'inherit',
  //     }}
  //     className='col-span-full flex items-center justify-center'
  //   >
  //     {LoadingComp}
  //   </div>;
  // }

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
      className='mx-auto grid w-[90%] h-full col-span-full'
    >
      {/* <FormSummary
        cardTitle={card?.section5?.title}
        title={card?.section5?.title}
        showTitle={false}
        description={''}
        className='ml-10'
      /> */}

      <div className="flex flex-col items-center mt-10 ">

        {/* <div className="flex w-[70%] mb-5"> */}
        {/* <Button id="print" className='ml-auto' onClick={handlePrint}>Download Succession Plan
            <TbDownload className='ml-2 h-5 w-5' />
            </Button> */}
        {/* </div> */}
        {/* @ts-ignore */}

        <div ref={sectionRef} className='flex flex-col w-[100%] bg-white p-10 border min-h-[800px] h-auto gap-4 shadow-lg'>
          {/* <p>TEST</p> */}
          {children}
          <h1 className='text-center'>{specificData?.section3.title}</h1>

          <div className='flex items-center'>

            <div className='ml-auto flex flex-col items-center '>
              {/* <Image
                src={logo}
                width={100}
                height={100}
                className="object-contain"
                alt={'load image logo'}
              /> */}
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
                    //Add function that updates the summary
                    updateMyCIM({ listingId, cardId: id, params: { summary: msg } })

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
      <Footer onNext={() => {
        const nextStep = findNextStep('section3', id);
        onNext(`${nextStep}`);
      }} />
    </form>
  );

}
