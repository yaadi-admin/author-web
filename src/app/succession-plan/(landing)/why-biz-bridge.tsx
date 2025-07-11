'use client';
import React, { useState, useEffect } from 'react';
import { Title } from 'rizzui';
import Image from 'next/image';
function WhySuccessionBuilder() {
  const [screenSize, setScreenSize] = useState(1440);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window?.innerWidth);
    };
    if (typeof window !== 'undefined') {
      setScreenSize(window?.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window?.removeEventListener('resize', handleResize);
      }
    };
  }, []);
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(to bottom, #F9F9F9 50%, #E1F1FD 90%)', // Diagonal split background
      }}
      className="grow mt-20 sm:mt-32 md:mt-40 py-12"
    >
      <div className="flex flex-col items-center gap-10">
        <div className="items-center justify-center">
          <Title
            as="h1"
            className="text-md font-medium w-full text-center mb-6 text-[22px] font-bold sm:text-2xl md:mb-10 md:text-3xl xl:mb-12 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
          >
            Why SuccessionBuilder?
          </Title>
        </div>
        <div className="flex w-[95%] m-auto items-center">
          <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-x-6 gap-y-10 pb-10">
            {guides.map((guide, index) => {
              return (
                <div
                  key={`guide-${index}`}
                  className="bg-white flex flex-col h-full w-full transform rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    backgroundImage:
                      'linear-gradient(to bottom, #d3e0f7, #fff 60%)',
                  }}
                >
                  <div className=" h-[50%]">
                    <div className="p-6 pb-0 h-full w-full">
                      <Image
                        src={guide.image}
                        alt="coming-soon"
                        width={screenSize / 4}
                        height={250}
                        className="
                        object-contain
                        rounded-md
                        4xs:w-[150px] md:w-[250px] lg:w-full xl:w-full 2xl:w-full
                        4xs:m-auto
                        h-full
                        "
                      />
                    </div>
                  </div>
                  <div className="px-6  h-[50%]">
                    <div className=" mb-4 w-full" />
                    <div className="mx-auto -mb-2 h-10 w-32 bg-gray-1000/50 blur-[57px] [transform:rotateX(80deg)]"></div>
                    {/* <div
                      className="mb-4 w-full"
                      style={{ borderColor: '#ededed', borderBottomWidth: 1 }}
                    /> */}
                    <h2 className="mb-4  text-center text-xl font-semibold">
                      {guide.title}
                    </h2>
                    <p className="4xs:text-md md:text-lg text-center leading-loose text-gray-700">
                      {guide.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
const guides = [
  {
    title: 'Best Practice Built',
    description: 'We’ve designed SuccessionBuilder with experts and from the experience of exited owners to cover the complexities of succession planning',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/landing-page-sb%2F5.jpg?alt=media&token=779c931e-3b34-4176-abb1-4a7f572286e5',
  },
  {
    title: 'Simple and easy',
    description: 'Our guided workflow builds your plan as easily as a conversation – through dialogues with our voice-to-voice',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/landing-page-sb%2F6.jpeg?alt=media&token=b167fc0a-7236-46b6-b8f9-4ad49a806296',
  },
  {
    title: 'Action-oriented',
    description: 'The plan identifies next steps you and your advisors need to take; with a network of vetted professionals who offer enhanced support',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/landing-page-sb%2F7.png?alt=media&token=582c54b5-7f96-4cb8-a329-64fdc263e9ad'
  },
  {
    title: 'Secure and reliable',
    description: 'Our platform protects data, complying with industry-leading standards and cybersecurity practices to keep your data safe',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/landing-page-sb%2F8.png?alt=media&token=a68b6e41-8afa-4a37-8b41-53eb100ca544'
  },
];

export default WhySuccessionBuilder;