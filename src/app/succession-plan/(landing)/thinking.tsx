'use client';

import React, { useState, useEffect } from 'react'
import { Title } from 'rizzui';
import Image from 'next/image';

function Thinking() {
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
        backgroundImage: 'linear-gradient(to bottom, #F9F9F9 40%, #E1F1FD 80%)', // Diagonal split background
      }}
      className="grow items-center mt-20 sm:mt-32 md:mt-40"
    >
      <div className="flex 4xs:flex-col 4xs:gap-12 lg:flex-row items-center w-full m-auto">
        <div className="items-center justify-evenly 4xs:w-full lg:w-[35%]">
          <Title
            as="h2"
            className="font-medium 
            4xs:m-auto lg:ml-[10%]
            4xs:w-[90%] lg:w-[80%] 
            font-bold
            md:text-md
            lg:text-md
            xl:mb-16 xl:text-3xl
            xl:leading-normal
            3xl:text-5xl 3xl:leading-snug"
          >
            Our AIgents learn from your business and our expertise
          </Title>
        </div>
        {/* <Carousel images={images} /> */}
        <div className='items-center 4xs:w-auto lg:w-[65%] lg:mr-24'>
          <Image
            src={
              'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2FBot%20Composition%20(1).png?alt=media&token=90016e32-5d49-49a2-9be3-6c5ee96e2a40'
            }
            alt="coming-soon"
            style={{
              width: '100%',
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 30px',
              // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
              padding: '12px',
              borderRadius: '4px',
            }}
            width={screenSize / 2}
            height={100}
            className='bg-white'
          />
        </div>
      </div>
    </div>
  )
}



export default Thinking