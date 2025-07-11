'use client';

import { useEffect, useState } from 'react';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import FormSummary from '../dialogue/form-summary';
import Loader from '@/components/ui/loader';
import { successionPlanCollections } from '@/config/ref/successionPlanCollections';
import Image from 'next/image';
import { Button, Text } from 'rizzui';
import { TbDownload } from "react-icons/tb";
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import { useReward } from 'react-rewards';

import firebase from '@/config/firebase.config';

import { currentSession } from '@/config/session';

import { doc, onSnapshot, setDoc, addDoc, collection, query, where, serverTimestamp, updateDoc } from "firebase/firestore";
import { useElementSize } from '@/hooks/use-element-size';

// components/GoogleCalendarButton.js



// Email component for the modal
const Email = ({ onClose }: { onClose: () => void }) => (
  <div className="p-6 flex flex-col">
    <h2 className="text-2xl font-bold mb-4">Book an appointment</h2>
    {/* <h4>Book a meeting with the CEO of Narro</h4> */}
    {/* <a target="_blank" className='text-blue-500' href="https://calendar.app.google/n9gT5NWTWyaHaaab8">
      https://calendar.app.google/LhyN4FvN8ej9qNmC7
    </a> */}
    {/* <p className="text-lg">Email: randall@thenarro.com</p> */}
    <div className='ml-auto'>
      <Button onClick={onClose} className="mt-4">Close</Button>
    </div>
  </div>
);

export default function PreviewWrapper(props: any) {
  const { successionPlan } = successionPlanCollections() as any;

  const template = successionPlan.find((d: any) => d.id === 'SsFWpV4MFm18pzmWw03x');

  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <Preview {...props} card={template} />
    </FormProvider>
  )
}

function Preview(props: { card: any; }) {
  const { card } = props;
  const { register, handleSubmit } = useFormContext();
  const { push } = useRouter();
  const [ref, { width, height }] = useElementSize();
  const { openModal } = useModal();
  const { closeModal } = useModal();

  const currentUser = currentSession() as any;

  const onFinish = async (index: any, threadId: any, title: any, output: any) => {
    const docRef = doc(collection(firebase.firestore, "succession_plan"), currentUser?.id);
    await updateDoc(docRef, {
      [`document-${index}`]: { threadId, title, output },
    });
  }

  const onSubmit = (data: any) => {
    console.log(data);
    // gotoNextStep();
  };

  const { reward, isAnimating } = useReward('rewardId', 'confetti');

  useEffect(() => {
    reward();
  }, [card])

  const handleContactUs = () => {
    openModal({
      customSize: '600px',
      view: <Email onClose={() => {
        // Any additional close logic
        closeModal();
      }} />,
    });
  };

  if (!card) return <Loader />;

  if (card?.section5) {
    return (
      <div ref={ref} style={{ height: '100%', }} className="col-span-full grid place-content-center items-center justify-center">
        <figure className="relative ">
          <div className="mx-auto -mt-12 max-w-xlg text-center place-content-center">

            <h2 className="text-bold text-black text-2xl mx-auto">
              {card?.section6?.title}
            </h2>
            <Confetti className="!fixed" />

            <div className='mt-6'></div>

            <div className="w-full max-w-xl px-6"></div>

            <form onSubmit={handleSubmit(onSubmit)} className=""></form>

            <div className='grid grid-cols-3 mt-120 pb-20 w-[90%] mx-auto'>
              <div className='flex items-center flex-col gap-2 mt-20'>
                <Text className='w-full text-xl font-bold text-black'>Want to hire a professional advisor? <br />
                  Check out our Professional Services Marketplace
                </Text>
                <div className="flex items-center mb-6">
                  <Button className='mt-6' onClick={() => push('/search/provider')}>Navigate to Provider Marketplace</Button>
                </div>
              </div>

              <div className='flex items-center justify-center'>
                <Image
                  src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fbotsv2%2Fjen-pointintg-right-removebg.png?alt=media&token=3d9442bd-5363-4c98-bc43-9ef401c2d5e4'}
                  width={800}
                  height={800}
                  style={{ width: '300px', height: '300px' }}
                  alt="assistant-image"
                  className="object-contain"
                />
              </div>

              <div className='flex items-center flex-col gap-2 mt-20'>
                <Text className='w-full text-xl font-bold text-black'>Interested in Selling your business? <br /> Try Narro SellerSpan
                </Text>
                <div className="flex items-center mb-6">
                  <Button
                    className='mt-12'
                    onClick={handleContactUs}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </figure>
      </div>
    );
  } else {
    return <Loader />
  }
}