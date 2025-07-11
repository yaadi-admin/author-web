'use client';

import React, { useState, useEffect } from 'react'
import { Title } from 'rizzui';
import Image from 'next/image';

function AIgents() {
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
        backgroundImage: 'linear-gradient(to top, #F9F9F9 40%, #E1F1FD 80%)', // Diagonal split background
      }}
      className="grow items-center pt-20 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col items-center ">
        <div className="items-center justify-center">
          <Title
            as="h1"
            className="text-md font-medium w-full text-center mb-0 text-[22px] font-bold sm:text-2xl md:mb-5 md:text-3xl  xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
          >
            Supported by our AIgents 24/7
          </Title>
        </div>
        {/* <Carousel images={images} /> */}
        <div className="4xs:h-full 4xs:w-full md:w-full m-auto">
          <div className="4xs:flex-col md:flex md:flex-row items-baseline">
            {agents.map((agent, index) => {
              return (
                <div
                  className="w-full"
                  key={`agent-${index}`}
                >
                  <div className="relative -mb-6">
                    <div className="flex justify-center">
                      <Image
                        src={
                          agent.image
                        }
                        alt="coming-soon"

                        width={screenSize / 4}
                        height={100}
                        className="h-auto sm:w-[100px] md:w-[150px] lg:w-[150px] xl:w-[200px] m-auto"
                      />
                    </div>
                  </div>
                  <div className="px-4 pb-6">
                    <div className="mb-4 w-full" />
                    <div className="mx-auto -mb-2 h-10 w-32 [transform:rotateX(80deg)]"></div>
                    <div className='w-[300px] mx-auto'>
                      <h2 className="text-center text-2xl font-medium mb-4">
                        {agent.name}
                      </h2>
                      <p className="text-xl text-center leading-loose text-gray-700">
                        {agent.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="text-center w-full mt-6">
            <p className='text-sm w-full p-4'>
              AIgents are for informational purposes and do not provide legal, financial, tax, or other professional advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const agents = [
  {
    name: 'Finn the Finance AIgent',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2F_Finn%20Final%20-%20Transparent%202.png?alt=media&token=a4727af5-a09d-4cc5-afa2-ceaf7887069e',
    description: 'Trained on accounting, finance, and valuations of SMBs',
  },
  {
    name: '    Dylan the Broker AIgent',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fdylan.png?alt=media&token=7f44c4db-8718-4210-85eb-f79f78a6383a',
    description: 'Trained on the process and strategies of exiting & selling SMBs',
  },
  {
    name: 'Sharon the Buyer AIgent',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fsharon.png?alt=media&token=7fc7eb5f-2dd3-44ce-833a-cbf60925e5e6',
    description: 'Trained on M&A and deal-making to support buyers',
  }
]



export default AIgents