'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Title, Text } from 'rizzui';
// import Accordion from '@/components/ui/accordion';
// import './faq.css';
export default function Faq() {
  const { push } = useRouter();
  // const [selected, setSelected] = useState(-1);
  return (
    <div
      className="grow items-center pt-20 sm:pt-32 md:pt-40 pb-[56px]"
    >
      <div className="flex flex-col items-center gap-10 4xs:px-4 4xs:w-full sm:w-full lg:w-4/5 m-auto">

        <Title
          as="h1"
          className="text-md  w-full text-center text-[22px]  sm:text-2xl md:text-3xl xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
        >
          Be part of the “9%” of owners with a plan
          {/* <span className="ml-2 font-normal text-emerald-500">$49.99</span> */}
        </Title>
        <Title
          as="h1"
          className="text-md font-medium w-full text-center text-[22px] font-normal sm:text-2xl md:text-xl xl:text-2xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
        >
          {/* (<i>Limited-time Offer</i> <b className='text-red-500'>50% off</b>) */}
        </Title>
        <div className='grid grid-cols-3 w-[100%] gap-10'>
          <div className='flex flex-col gap-32'>
            <Title as="h2" className='text-center text'>
              Hire a Consultant <br />(10 Hours):
            </Title>
            <Title as="h1" className="text-center text-6xl font-semibold">
              <div className="relative inline-block text-black">
                <span>
                  $3,000
                </span>
                <div className="absolute inset-6 pointer-events-none">
                  <div className="w-full h-2 bg-red-500 rotate-45 absolute top-1/2 left-0 transform -translate-y-1/2"></div>
                  <div className="w-full h-2 bg-red-500 -rotate-45 absolute top-1/2 left-0 transform -translate-y-1/2"></div>
                </div>
              </div>
            </Title>
          </div>

          <div className='flex flex-col gap-32'>
            <Title as="h2" className='text-center'>
              SuccessionBuilder <br /> Regular Price:
            </Title>
            <Title as="h1" className="text-center text-6xl font-semibold">

              <div className="relative inline-block text-black">
                <span>
                  $1,999

                </span>
                <div className="absolute inset-6 pointer-events-none">
                  <div className="w-full h-2 bg-red-500 rotate-45 absolute top-1/2 left-0 transform -translate-y-1/2"></div>
                  <div className="w-full h-2 bg-red-500 -rotate-45 absolute top-1/2 left-0 transform -translate-y-1/2"></div>
                </div>
              </div>
            </Title>
          </div>

          <div className='flex flex-col gap-32'>
            <Title as="h2" className='text-center'>
              SuccessionBuilder <br /> Limited-Time Price:
            </Title>
            <Title as="h1" className="text-green-600 text-center text-6xl font-semibold">
              $499/<br /> <span className='mt-6'>client</span>
            </Title>
          </div>


        </div>
        <Title
          className='text-6xl text-green-600'
          as="h1"
        >
          +2 week money-back guarantee
          {/* (<i>Limited-time Offer</i> <b className='text-red-500'>50% off</b>) */}
        </Title>
        {/* <Title
          as="h1"
          className="text-md font-medium w-full text-center text-[22px] font-semibold sm:text-2xl md:text-3xl xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
        >
          Be part of the “9%” for
          <span className="ml-2 font-normal line-through">$99.99</span>
        </Title>
        <Title
          as="h1"
          className="text-md font-medium w-full text-center text-[22px] font-normal sm:text-2xl md:text-xl xl:text-2xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
        >
          Special Price: Only
          <span className="text-red-500 ml-1 font-normal">$49.99</span> for a Limited Time!
        </Title> */}
        <div className='w-full md:w-[80%] mx-auto '>

          <div className="4xs:w-full">
            <div className="mt-8 grid justify-center gap-4 xl:gap-6">
              <Button
                color="primary"
                size="xl"
                className="rounded-full "
                onClick={() => push('/succession-plan/signup')}
              >
                <p className="font-semibold">Start your plan today</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
