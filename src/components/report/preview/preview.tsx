/* eslint-disable @next/next/no-img-element */
'use client';


import Loader from '@/components/ui/loader';
import firebase from '@/config/firebase.config';
import { successionPlanCollections } from '@/config/ref/successionPlanCollections';
import { useCurrentSession } from '@/config/succession-session';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { TbDownload } from "react-icons/tb";
import { Button, Empty, EmptyProductBoxIcon, Text } from 'rizzui';
import './preview.css';
import Section from './section/index';


import { successionPlan } from '@/config/client/successionPlan';
import { controls } from '@/config/ref/controls';
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from 'react';

import UndrawComponent from '@/components/undraw';
import { SvgAgreement, SvgBusinessPlan, SvgGoodTeam, SvgIdeation, SvgPlans, SvgPlayTime, SvgTeamCollaboration } from "iblis-react-undraw";
import AdvisoryTeam from './advisory-team';
import CompanyOverview from './company-overview';
import CoverPage from './cover-page';
import EssentialDocuments from './essential-documents';
import OverallScore from './overall-score';
import TableOfContents from './table-of-contents';

export default function PreviewWrapper(props: any) {
  const { clientId } = props;
  const { successionPlan, loading } = successionPlanCollections() as any;

  const methods = useForm({});
  if (!successionPlan.length || loading) return <Loader />;


  return (
    <FormProvider {...methods}>
      <Preview {...props}
        card={successionPlan} clientId={clientId} />
    </FormProvider>
  )
}



function Preview(props: { card: any; isLoading: boolean, setLoading: any, clientId: any, isModal?: boolean }) {
  const { card, isLoading, setLoading, clientId, isModal = false } = props;
  const { register, handleSubmit } = useFormContext();
  const { push } = useRouter();
  const [intake, setIntake] = useState({} as any);
  const { updateCard, getCards } = successionPlan();
  const { session: currentUser, getUser } = useCurrentSession() as any;
  const [cards, setCards] = useState<any>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#236C95');
  const secondaryColor = '#1C4862';
  const colors = ["#236C95", "#63B7CB", "#1F3A3D", "#BBD871", "#A569BD", "#F39C12"];
  // "#A569BD", "#F39C12",
  React.useEffect(() => {
    async function fetchIntake() {
      const docRef = doc(firebase.firestore, "succession_plan", clientId);
      const response = await getDoc(docRef);
      const intakeData = response?.data ? response?.data() : {};
      setIntake(intakeData)
    };
    if (currentUser.id) {
      fetchIntake();
    }

  }, [currentUser?.id])



  React.useEffect(() => {
    async function fetchCards() {
      setLoading(true);
      const cards = await getCards(clientId)

      const imgMap: Record<string, JSX.Element> = {
        'j1GpYFd50qxNCKvLE3IE': <UndrawComponent
          primaryColor={primaryColor}
          Illustration={SvgIdeation}
          className="w-1/2 ml-auto mb-2"
        />,
        "2Do9WjkLziYRes00W92H": <UndrawComponent
          primaryColor={primaryColor}
          Illustration={SvgTeamCollaboration}
          className="w-1/2 ml-auto mb-2"
        />,
        "m0JAnfffcA11R7CBUPPC": <UndrawComponent
          primaryColor={primaryColor}
          Illustration={SvgPlayTime}
          className="w-1/3 ml-auto mb-2"
        />,
        "0LPuzUXIg4OnpfCen3Gt": <UndrawComponent
          primaryColor={primaryColor}
          Illustration={SvgGoodTeam}
          className="w-1/2 ml-auto mb-2"
        />,
        "wQjuFN2CdbmnGMQdbzK5": <UndrawComponent
          primaryColor={primaryColor}
          Illustration={SvgBusinessPlan}
          className="w-1/2 ml-auto mb-2"
        />,
        "r0VtOZHgCqzrC0eacGTo": <UndrawComponent
          primaryColor={primaryColor}
          Illustration={SvgPlans}
          className="w-1/2 ml-auto mb-2"
        />,
        "hlBbHuAtObR22n8L7rS3": <UndrawComponent
          primaryColor={primaryColor}
          Illustration={SvgAgreement}
          className="w-1/3 ml-auto mb-2"
        />,
      };
      const nextCards = cards.map((c: any, index: number) => (
        {
          cardId: c?.id,
          title: c?.title,
          score: c?.assessmentScore,
          isOpen: true,
          image: imgMap[c?.id],
        }
      ));

      setCards(nextCards);
      setLoading(false);
    };
    if (clientId) {
      fetchCards();
    }

  }, [card, clientId, primaryColor]);

  const sectionRef = useRef();

  const handlePrint = async () => {

    if (isModal) {
      const link = `${window.location.origin}/advisor/report?clientId=${clientId}`;
      window.open(link, '_blank');
    } else {
      setLoading(true);
      const oldCards = cards.map((card: any) => ({ ...card, isOpen: true }))

      setCards(oldCards);
      setLoading(false);

      if (sectionRef.current) {
        // @ts-ignore
        const printContents = sectionRef.current.innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        setTimeout(() => {
          window.print();
          document.body.innerHTML = originalContents;
          // Restore React's component state after printing
          window.location.reload();
        }, 3000)

      }
    }


  };

  const controlsAdmin = controls()[1] as any;

  const onFinish = async (cardId: string, output: string) => {
    if (currentUser?.id) {
      await updateCard(`${cardId}`, {
        html: output
      });
    }
  }
  const onSubmit = (data: any) => {
    push('/succession-plan/congratulations')
    // gotoNextStep();
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [companyTriviaIndex, setCompanyTriviaIndex] = useState(0);

  const randomTrivia = controlsAdmin?.quotes[companyTriviaIndex];

  useEffect(() => {
    if (isLoading) {

      if (companyTriviaIndex < controlsAdmin?.quotes.length - 1) {
        const timer = setTimeout(() => {
          setCompanyTriviaIndex(companyTriviaIndex + 1);
        }, 6000); // 3 seconds

        // Cleanup the timer
        return () => clearTimeout(timer);
      }
    }
  }, [companyTriviaIndex, isLoading]);

  useEffect(() => {
    if (isLoading) {

      if (currentIndex < processMessages.length - 1) {
        const timer = setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
        }, 12000); // 3 seconds

        // Cleanup the timer
        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, isLoading]);


  const processMessages = [
    "Preparing your data...",
    "Removing filler words...",
    "Constructing your story...",
    "Finalizing the details..."
  ];


  const LoadingComp = (
    <div className='col-span-full mt-40'>
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

  if (isLoading) {
    return LoadingComp;
  }

  if (cards.length === 0) {
    return <div className='flex justify-center items-center h-full flex-col'>
      <Empty
        image={<EmptyProductBoxIcon />}
        text="Nothing to see here yet. Please complete the report first."
      />;
    </div>;
  }

  const title =
    <div className='flex'>
      <div className=''>
        {card?.section5?.title}
      </div>
    </div>;

  const scores = cards.map((c: any) => c.score).filter(Number)

  return (
    <div style={{ height: '100%', marginBottom: '24px', }} className='col-span-full flex'>
      <div className='flex flex-col w-[95%] mx-auto'>
        <h1 className='mr-
        auto'>{title}</h1>

        <div className='flex w-full mx-auto mt-12'>
          <div className='flex flex-col'>
            <h3>
              Color Palette
            </h3>
            <div className='flex mt-4'>
              {colors.map((color, index) => {
                return (
                  <button
                    key={color}
                    className={`mr-4 rounded-full w-10 h-10`}
                    style={{ backgroundColor: color }}
                    onClick={() => setPrimaryColor(`${color}`)}
                  />
                )
              })}
            </div>
          </div>
          <Button id="print" className='ml-auto' onClick={handlePrint}>Download Succession Plan
            <TbDownload className='ml-2 h-5 w-5' />
          </Button>
        </div>

        {/* This is the Succession Plan that will be shown when clicking the button View Report on the Advisor Dashboard it ends on line 546 and I need to fetch data from intake, card, formattedDate and sectionRef. We should also import the component Advisor  '*/}
        <div className='flex w-full mx-auto mt-4'>

          {/* @ts-ignore */}
          <div className="pt-0 flex items-center justify-center col-span-full flex flex-col gap-10 w-full" ref={sectionRef} id="succession-plan">

            <div className='flex items-center justify-center col-span-full'>
              <CoverPage intake={intake} primaryColor={primaryColor} />
            </div>
            <TableOfContents primaryColor={primaryColor} />
            <CompanyOverview intake={intake} primaryColor={primaryColor} secondaryColor={secondaryColor} />
            <AdvisoryTeam intake={intake} primaryColor={primaryColor} />
            <OverallScore scores={scores} primaryColor={primaryColor} overAllRecommendations={intake?.overallRecommendations || ''} />
            <div className='flex items-center justify-center col-span-full flex-col gap-5 my-10 mb-20'>
              {cards?.map(({ cardId, threadId, runId, title, rosettaPrompt, isOpen, image }: {
                cardId: string,
                image: React.ReactNode,
                runId: string, threadId: string, title: string, rosettaPrompt: string, isOpen: boolean

              }, index: number) =>
                <Section
                  cardId={cardId}
                  clientId={clientId}
                  image={image}
                  cards={cards}
                  runId={runId}
                  key={`${threadId}-${isOpen}`}
                  title={title}
                  threadId={threadId}
                  index={index + 1}
                  rosettaPrompt={rosettaPrompt}
                  onFinish={onFinish}
                  isOpen={isOpen}
                  primaryColor={primaryColor}
                />
              )}
            </div>
            <EssentialDocuments intake={intake} primaryColor={primaryColor} />

          </div>
        </div>
        <Text className='text-center w-4/5 p-4 m-auto leading-regular' style={{ fontSize: 10 }}>
          Disclaimer: Outputs from the AIgent should not be considered legal, financial, or tax advice and is for informational purposes in your journey and to engage in dialogue to help you make decisions. Our AIgents can make mistakes. Consider checking important information with your advisors for extra guidance.
        </Text>
      </div>
    </div>
  );
}

