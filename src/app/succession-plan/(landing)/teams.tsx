'use client';

import React, { useState, useEffect } from 'react'
import { Title, Text } from 'rizzui';
import {
  PiLinkedinLogoFill,
} from 'react-icons/pi';
import Image from 'next/image';

function Teams() {
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
      className="grow items-center pt-20 sm:pt-32 md:pt-40 pb-[56px]"
    >
      <div className="flex flex-col gap-10 justify-center w-[95%] m-auto">
        <Title
          as="h1"
          className="text-md font-medium w-full text-center mb-3 text-[22px] font-bold sm:text-2xl md:mb-5 md:text-3xl  xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
        >
          Built by a team of professionals with SMBs in their DNA
        </Title>
        <div
          style={{
            alignItems: 'center',
          }}
          className="grid 4xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >

          {teamMembers.map((member, index) => {
            return (
              <div
                key={`member-${index}`}
                style={{
                  padding: '15px',
                  borderRadius: '10px',
                  height: '100%',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  backgroundImage: 'linear-gradient(to bottom, #d3e0f7, #fff 60%)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                className="h-full hover:scale-105 hover:shadow-lg mx-auto"
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  className='flex flex-col h-full gap-1'
                >
                  <Image
                    src={member.imageUrl}
                    alt="coming-soon"
                    style={{
                      borderRadius: '10%',
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                    width={screenSize / 4}
                    height={200}
                  />
                  <h4
                    style={{ fontSize: '20px', textAlign: 'center', marginTop: '20px', }}>
                    {member.name}
                  </h4>
                  <p
                    style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      marginBottom: '5px',
                    }}
                  >
                    {member.position}
                  </p>
                  <Text
                    style={{
                      fontSize: '16px',
                      fontWeight: '300',
                      textAlign: 'center',
                    }}
                    className='mt-auto mb-4'
                  >
                    {member.description}
                  </Text>
                  <div className='mt-auto'>

                    <a
                      href={member.linkedIn}
                      rel="norefferer"
                      target="_blank"
                      className="social-btn-shadow inline-block rounded-full bg-white p-3 text-gray-500 transition-all duration-300 hover:text-gray-1000 dark:bg-gray-100 dark:text-gray-700 dark:hover:text-gray-1000"
                    >
                      <PiLinkedinLogoFill className="h-auto w-4" />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}



const teamMembers = [{
  name: 'Randall Baran-Chong, CPA, CA',
  position: 'CEO',
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/image%2014.png?alt=media&token=383f0c9e-93fa-43cd-9bed-bd6f0ba28400',
  description: 'Multi-founder, grandson of a Chinese-Canadian restaurateur',
  linkedIn: 'https://www.linkedin.com/in/randall-baran-chong/',
}, {
  name: 'Winston Edwards Jr.',
  position: 'CTO',
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/image%2026.png?alt=media&token=49a3a1a6-2085-469c-8cfe-c7e7d966dc2b',
  description: 'Multi-founder creator and architect, son of a global export business owner',
  linkedIn: 'https://www.linkedin.com/in/winstoedwardsjr/',
}, {
  name: 'Albert Nam',
  position: 'Broker-Advisor',
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/image%2015.png?alt=media&token=201bcdec-db6f-494e-9908-05a04e83f782',
  description: 'Founder of NAMA Group (A Royal LePage Signature Realty Brokerage)',
  linkedIn: 'https://www.linkedin.com/in/albert-nam-451b4313/',
}, {
  name: 'Alexander DiGiovanni, JD',
  position: 'General Counsel',
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/image%2016.png?alt=media&token=11bd9d90-5093-4868-aebc-018607e4b5b1',
  description: 'Managing Partner, Pando Law & former startup founder',
  linkedIn: 'https://www.linkedin.com/in/alexander-di-giovanni-a80145a3/',
}];


export default Teams