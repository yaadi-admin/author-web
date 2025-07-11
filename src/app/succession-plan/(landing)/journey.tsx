'use client';
import React, { useState, useEffect } from 'react';
import { Title } from 'rizzui';
import Image from 'next/image';
function Journey() {
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
            The most important plan you probably don’t have
          </Title>
        </div>
        <div className="flex w-[95%] m-auto items-center">
          <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-x-6 gap-y-10 pb-10">
            {guides.map((guide, index) => {
              return (
                <div
                  key={`guide-${index}`}
                  className="bg-white h-full w-full transform rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    backgroundImage:
                      'linear-gradient(to bottom, #d3e0f7, #fff 60%)',
                  }}
                >
                  <div className="relative -mb-6">
                    <div className="p-6 pb-0">
                      <Image
                        src={guide.image}
                        alt="coming-soon"
                        width={screenSize / 4}
                        height={250}
                        className="
                        rounded
                        4xs:w-[150px] md:w-[250px] lg:w-full xl:w-full 2xl:w-full
                        4xs:m-auto
                        h-full
                        "
                      />
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="mb-4 w-full" />
                    <div className="mx-auto -mb-2 h-10 w-32 bg-gray-1000/50 blur-[57px] [transform:rotateX(80deg)]"></div>
                    <div
                      className="mb-4 w-full"
                      style={{ borderColor: '#ededed', borderBottomWidth: 1 }}
                    />
                    <h2 className="my-4 text-center text-xl font-semibold">
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
    title: 'Be confident about your future',
    description: 'Plan personal and business goals and how to make it happen',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/landing-page-sb%2F1.png?alt=media&token=8c924fad-e6ff-4f6c-927c-20b39daa7a5e'
  },
  {
    title: 'Boost your business’ value',
    description: 'Make your business built to last and turnkey to attract future owners',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/landing-page-sb%2F2.png?alt=media&token=8ed5dae6-782c-46fe-aa72-f34174432565'
  },
  {
    title: 'Build resiliency into your business',
    description: 'Develop plans to be prepared for planned or unplanned exits',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/landing-page-sb%2F3.png?alt=media&token=3b482dec-6e38-4001-bef1-7e487baa3bff'
  },
  {
    title: 'Preserve your legacy',
    description: 'Express the culture, character, and ambitions of your company to future generations ',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/landing-page-sb%2F4.png?alt=media&token=29491b78-bd64-4cd5-884a-3d6ec9a4d29d'
  },
];

export default Journey;