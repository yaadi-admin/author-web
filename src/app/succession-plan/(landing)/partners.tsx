'use client';

import React from 'react'
import Image from 'next/image';
import { Title } from 'rizzui';

function Partners() {
  return (
    <div className='bg-white w-full flex flex-col pt-20 shadow-lg mt-20'>
      <div className="items-center justify-center">
        <Title
          as="h1"
          className="text-md font-medium w-full text-center mb-6 text-[22px] font-bold sm:text-2xl md:mb-10 md:text-3xl xl:mb-12 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
        >
          Supported by leading Canadian innovation organizations
        </Title>
      </div>
      <div className="
    grid 
    4xs:min-h-12 md:min-h-32 lg:min-h-52
    w-full
    items-center
    justify-center
    4xs:gap-2 lg:gap-10
    4xs:py-2
    md:py-0
    4xs:px-4 sm:px-12 md:px-6 xl:px-20
    bg-white
    4xs:grid-cols-3
    md:grid-cols-8
    ">
        {logos.map((partner, index) => {
          return (
            <div key={`partner-${index}`} className="grid justify-center">
              <Image
                src={partner.logo}
                alt="partner-logo"
                style={{
                  borderRadius: '4px',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
                width={partner.width}
                height={partner.height}
                className='4xs:h-auto 4xs:w-12 sm:h-auto sm:w-20 md:h-auto md:w-auto'
              />
            </div>
          );
        })}
      </div>
    </div>
  )
}

const logos = [


  {
    name: 'Canadian Employee Ownership Coalition',
    logo: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/partners-logos%2Fcanadian-employee-ownership-coalition.png?alt=media&token=8153e4d5-ff71-49cc-ac12-b2647e98f32c',
    width: 200,
    height: 150,
  },
  {
    name: 'Pando Law',
    logo: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/partners-logos%2Fpando-law.png?alt=media&token=767e719f-49c1-4c81-94f6-a5cd178a2853',
    width: 200,
    height: 150,
  },
  {
    name: 'Nama Group',
    logo: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/partners-logos%2Fnama%20group%20horizontal.png?alt=media&token=223ef90e-12b0-4eca-ac18-16ea53429886',
    width: 200,
    height: 150,
  },
  {
    name: 'DMZ',
    logo: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/partners-logos%2Fdmz.png?alt=media&token=3fedd9fc-d941-497b-bae7-e5f7d3266fdc',
    width: 200,
    height: 150,
  },
  {
    name: 'MaRs',
    logo: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/partners-logos%2F718471-middle-removebg-preview.png?alt=media&token=eeb9b579-a92b-45a9-a7a1-731c9527adf8',
    width: 200,
    height: 150,
  },
  {
    name: 'Toronto',
    logo: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/welcome-page-images%2Ftoronto%201.png?alt=media&token=df5d755d-c60b-40c0-a2cd-b048e69267e9',
    width: 200,
    height: 150,
  },
  {
    name: 'Communitech',
    logo: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/partners-logos%2Fcommunitech-big-removebg-preview.png?alt=media&token=faa09671-b4a7-4688-8732-337d34fa1f39',
    width: 200,
    height: 150,
  },
  {
    name: 'Microsoft for Startups',
    logo: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/partners-logos%2Fmicrosoft.png?alt=media&token=f2708458-7990-46c0-a094-bd645a5bc9ca',
    width: 200,
    height: 150,
  },

];


export default Partners