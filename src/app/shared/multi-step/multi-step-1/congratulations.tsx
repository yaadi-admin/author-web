'use client';

import Image from 'next/image';
import { Badge } from 'rizzui'
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import congratulationsImg from '@public/hat-confetti.png';
import { useElementSize } from '@/hooks/use-element-size';
import { currentSession } from '@/config/session';
import {
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, setDoc, addDoc, query, collection, updateDoc, getDocs, where, serverTimestamp } from "firebase/firestore";
import { currentCard } from '@/config/current-card';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { sellerSpan } from '@/config/seller/sellerSpan';


export default function Congratulations() {
  const [ref, { width, height }] = useElementSize();
  const { step, gotoNextStep, totalSteps, resetStepper } = useStepperOne();
  const { updateSellerSpanSubCollection, updateProgress } = sellerSpan() as any;
  const { push } = useRouter();
  const card = currentCard() as any;
  const currentUser = currentSession() as any;
  const [cardIndex, setCardIndex] = useState('') as any;
  const [run, setRn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const downloadURL = localStorage.getItem('currentCard');
      if (downloadURL) {
        console.log(downloadURL);
        setCardIndex(downloadURL);
        // localStorage.removeItem('companyURL');
        clearInterval(interval); // Stop checking once URL is found
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);



  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (step === totalSteps - 1) {
      if (currentUser?.role === 'admin') {
        push(routes.adminSellerSpan); resetStepper();
      } else {
        const data = localStorage.getItem('dialogueMessage') || null;
        const cardFormData = localStorage.getItem('cardFormData') || '{}';
        const formData = JSON.parse(cardFormData);
        if (!card.status) {
          await updateProgress({ tag: card.tag, data, formData })
          localStorage.removeItem('dialogueMessage');
          localStorage.removeItem('cardFormData');
        }
        await updateSellerSpanSubCollection(card.id, { status: true })
        push(routes.eCommerce.dashboard);
        resetStepper();
      }
    } else {
      gotoNextStep();
    }
  };

  return (
    <div ref={ref} style={{ height: 'inherit' }} className="col-span-full grid place-content-center">
      <form id={`rhf-${step.toString()}`}
        onSubmit={onSubmit}
      >

        <figure className="relative mx-auto -mt-12 grid place-content-center">
          {/* <Image
            src={congratulationsImg}
            alt="congratulation image"
            priority
            className="mx-auto object-contain"
          /> */}
          <div className="mx-auto -mt-12 max-w-xlg text-center place-content-center">

            <h2 className="text-bold text-black text-2xl w-1/2 mx-auto">
              {card?.section6?.congratulations ? card?.section6?.congratulations : card?.section7?.title}
            </h2>
            <div className='mt-6'>
              <span className='text-black'>{card?.section6?.title ? card?.section6?.title : card?.section7?.feedback}</span>
            </div>
            {/* {<div style={{ width: "50%" }} className="mx-auto grid grid-cols-3 items-center rounded-lg gap-2.5 mt-6 mb-6">
            <div
              // onClick={() => handleFeedback()}
              className="w-full place-content-center">
              <Image
                src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/external-emoji-emoji-justicon-lineal-color-justicon-2.png?alt=media&token=c2b1a419-11f4-42e3-9944-1e865ef409d1'}
                width={200}
                height={200}
                className="object-contain"
                priority
                alt={'Feeling'}
              />
            </div>

            <div
              // onClick={() => handleFeedback()}
              className="w-full place-content-center">
              <Image
                src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/external-emoji-emoji-justicon-lineal-color-justicon-3.png?alt=media&token=774e2c60-b552-4f92-bfe2-aa74d3dd19dd'}
                width={200}
                height={200}
                className="object-contain"
                priority
                alt={'Feeling'}
              />
            </div>

            <div
              // onClick={() => handleFeedback()}
              className="w-full place-content-center">
              <Image
                src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/external-emoji-emoji-justicon-lineal-color-justicon-8.png?alt=media&token=3341035b-1b25-4218-b8c8-d4be7a93b350'}
                width={200}
                height={200}
                className="object-contain"
                priority
                alt={'Feeling'}
              />
            </div>

          </div>} */}

            <div className='grid grid-cols-4 gap-10 w-full text-center'>
              {card?.section6?.nutrition ? (card?.section6?.nutrition)?.map((item: any, index: number) => (
                <div key={index} className='grid'>
                  <Badge variant='flat' className="mt-2 text-base text-black">
                    {item?.label} {' '}
                    <span className='text-green ml-2'>{item?.value}</span>
                  </Badge>
                </div>)) : (card?.section7?.nutrition)?.map((item: any, index: number) => (<div key={index} className='grid'>
                  <Badge variant='flat' className="mt-2 text-base text-black">
                    {item?.label} {' '}
                    <span className='text-green ml-2'>{item?.value}</span>
                  </Badge>
                </div>))}
            </div>
          </div>
        </figure>
        <Confetti className="!fixed mx-auto" width={width} height={height}
        />
      </form>
    </div>
  );
}
