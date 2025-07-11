'use client';

import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, Title, Text } from 'rizzui';

import { routes } from '@/config/routes';

function Hero() {
  const { push } = useRouter();
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(to bottom, #F9F9F9 50%, #E1F1FD 90%)', // Diagonal split background
      }}
      className="flex grow px-6 xl:px-10 items-center  lg:h-[calc(100vh-80px)] pt-10 pb-16 4xs:h-full"
    >
      <div className="w-[100%]">

        <div className="h-full mx-auto max-w-[1180px] flex w-full flex-col-reverse justify-between text-center lg:flex-row lg:gap-5 lg:text-start 3xl:max-w-[1520px] 4xs:items-center 4xs:gap-0">
          <div className="flex gap-5 flex-col">
            <Title
              as="h4"
              style={{ fontWeight: '500' }}
              className="text-5xl font-bold mt-2"
            >
              It’s never been easier to plan for tomorrow, today
            </Title>
            <Text className="
          max-w-[612px] md:max-w-full font-normal leading-loose xl:leading-loose text-xl
          ">
              Prepare for your planned or unplanned exit and preserve your business’ legacy with Narro’s SuccesionBuilder™.
            </Text>
            <Text className="
          max-w-[612px] md:max-w-full font-normal leading-loose xl:leading-loose text-xl
          ">
              Built with best practices supported by technology, you’ll be guided through a succession planning process that’s affordable, accessible, and easy.
            </Text>
            {/* <Text className="max-w-[612px] md:max-w-full font-normal leading-loose xl:leading-loose text-xl">
            We’re finance, deals, legal, real estate, and technology experts who’ve re-imagined how small-to-medium businesses (SMBs) are sold and bought through our AI-powered platform – making deals easier, happier, and more affordable.
          </Text>
          <Text className="max-w-[612px] md:max-w-full font-normal leading-loose xl:leading-loose text-xl">
            We’re a movement wrapped in technology, where our mission is to enable “ownership for anybody”.
          </Text> */}
            <div className="4xs:w-full lg:w-7/12">
              <div className="w-full mt-8 grid grid-cols-1 justify-center gap-4 xl:gap-6">
                <Button
                  color="primary"
                  size="lg"
                  className="rounded-full h-12 px-4 xl:h-14 xl:px-6"
                  onClick={() => push('/succession-plan/signup')}
                >
                  <p className="font-semibold">Get Started</p>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src={
                'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/landing-page-sb%2Fbg-1.png?alt=media&token=751accb0-fc5c-4d11-be1d-0974df10824d'
              }
              alt="coming-soon"
              width={1000}
              height={1000}
              className="max-w-[256px] sm:max-w-xs lg:max-w-lg 2xl:max-w-xl 3xl:max-w-[632px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;
