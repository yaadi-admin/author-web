'use client';

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { Title } from 'rizzui';


function Customers() {
  const [screenSize, setScreenSize] = useState(1440);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "For Business Owners:",
      description: "Complete the plan on your time and terms",
      videoSrc: "business-owners-video.mp4",
    },
    {
      title: "For Succession Consultants & Professional Advisors:",
      description: "Boost your offering and serve more clients",
      videoSrc: "consultants-advisors-video.mp4",
    },
    {
      title: "For Financial Advisors and Wealth Managers:",
      description: "Retain clients by building plans for tomorrow",
      videoSrc: "financial-advisors-video.mp4",
    },
  ];
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
          'linear-gradient(to top, #F9F9F9 50%, #E1F1FD 90%)', // Diagonal split background
      }}
      className="pt-5 sm:pt-8 md:pt-5 grow items-center"
    >
      <div className="flex flex-col items-center gap-10">
        <div className="mt-12 items-center justify-center">
          <Title
            as="h1"
            className="text-md font-medium w-full text-center mb-3 text-[22px] font-bold sm:text-2xl md:mb-5 md:text-3xl  xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
          >
            Putting a plan in the hands of every owner

          </Title>
        </div>
        <div className="flex w-full mx-auto items-center">

          <div className="grid gap-2 w-[90%] mx-auto">
            <div className="flex flex-col md:flex-row">
              {/* Tabs Section */}
              <div className="flex flex-col space-y-4 md:w-1/3">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`p-4 text-left border-l-4 ${activeTab === index
                      ? "border-blue-600 bg-gray-200 "
                      : "border-gray-300 bg-white"
                      }`}
                    onClick={() => setActiveTab(index)}
                  >
                    <h3 className={`font-bold ${activeTab === index ? '' : 'text-black'}`}>{tab.title}</h3>
                    <p className="text-sm">{tab.description}</p>
                  </button>
                ))}
              </div>

              {/* Video Section */}
              <div className={`md:w-2/3 flex items-center justify-center  p-4  bg-gray-200`}>
                <video
                  key={tabs[activeTab].videoSrc}
                  className="w-full h-auto max-h-[400px] border border-blue-700"
                  controls
                >
                  <source src={tabs[activeTab].videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const customers = [
  {
    title: 'Boost your business’ value',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/welcome-page-images%2Fsellers.png?alt=media&token=aaaebcd3-77fb-4d89-8689-f4e260272d74',
    description: 'Demonstrate to other stakeholders, investors, or potential buyers that your business is in it for the long haul by putting together a succession plan. Your plan can help show a buyer of your business that they can transition smoothly into a ‘turnkey’ operation.',
    video: "https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fsuccession-plan%2Fjohn-chatting-w-jen-video-conference.png?alt=media&token=069e6596-aa59-4548-a266-e68ef0f67bf6",
    // thumbnail: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/a.%20videos%2FSlide8%20(2).jpeg?alt=media&token=fd7f5551-3444-444a-97ab-0d359263a741'
  },
  {
    title: 'Build resiliency into your business',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/john-holding-docs-against-chest.png?alt=media&token=bafec73f-085c-4b62-b2c7-12ea2ed39e6f',
    // image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/welcome-page-images%2Fbuyers.png?alt=media&token=f71b7d3c-4cce-4c9a-b73f-a0e8f04f1d3d',
    description: `You never know what might happen tomorrow, but with a plan - you and your team can know how to respond. A succession plan helps make planned or unplanned transitions less disruptive and makes clear the actions and responsibilities of key people.`,
    video: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/john-holding-docs-against-chest.png?alt=media&token=bafec73f-085c-4b62-b2c7-12ea2ed39e6f',
    // video: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fsuccession-plan%2Fjohn-and-family-at-table-2.png?alt=media&token=91206afd-e7aa-46a0-90e3-add522482cdb',

    // video: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/a.%20videos%2FNarro%20-%20Buyers%20Value%20and%20View.mp4?alt=media&token=cdbe6ca6-ec30-46a9-a287-a155a1c3bfbc',
    // thumbnail: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/a.%20videos%2FSlide9%20(2).jpeg?alt=media&token=cd770330-1323-49d1-968f-157222063b6f',
  },
  {
    title: 'Preserve your legacy',
    image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/welcome-page-images%2Fservice-providers.png?alt=media&token=074d6881-90f2-4288-92f5-4466c8297e2f',
    description: `You’ve spent lots of blood, sweat, and tears making the business what it is today – its culture and character are a reflection of you. A succession plan helps codify and express your business legacy for future generations of owners.`,
    video: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fsuccession-plan%2Fjohn-and-family-at-table-2.png?alt=media&token=91206afd-e7aa-46a0-90e3-add522482cdb',

    // video: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/a.%20videos%2FNarro%20-%20Providers%20Value%20and%20View.mp4?alt=media&token=bce3535e-3b18-4ba6-b20a-89cea3c7ac81',
    // thumbnail: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/a.%20videos%2FSlide10%20(2).jpeg?alt=media&token=ea7daba9-fc36-4cb0-87a6-b8761288c77f'
  },
];


// const customers = [
//   {
//     title: 'Planning made easy',
//     image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/welcome-page-images%2Fsellers.png?alt=media&token=aaaebcd3-77fb-4d89-8689-f4e260272d74',
//     description: 'Build with the ease of a conversation with Jen, our expertly-trained AI exit planner agent, who will ask you questions, guide you through, and writeup your plan.',
//     video: "https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fsuccession-plan%2Fjohn-chatting-w-jen-video-conference.png?alt=media&token=069e6596-aa59-4548-a266-e68ef0f67bf6",
//     // thumbnail: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/a.%20videos%2FSlide8%20(2).jpeg?alt=media&token=fd7f5551-3444-444a-97ab-0d359263a741'
//   },
//   {
//     title: 'A plan built for you',
//     image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/john-holding-docs-against-chest.png?alt=media&token=bafec73f-085c-4b62-b2c7-12ea2ed39e6f',
//     // image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/welcome-page-images%2Fbuyers.png?alt=media&token=f71b7d3c-4cce-4c9a-b73f-a0e8f04f1d3d',
//     description: `Every business is unique, and every business needs a succession plan. Your plan reflects your inputs, situation, and needs. Say goodbye to blank templates leaving things up to your imagination.`,
//     video: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/john-holding-docs-against-chest.png?alt=media&token=bafec73f-085c-4b62-b2c7-12ea2ed39e6f',
//     // video: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fsuccession-plan%2Fjohn-and-family-at-table-2.png?alt=media&token=91206afd-e7aa-46a0-90e3-add522482cdb',

//     // video: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/a.%20videos%2FNarro%20-%20Buyers%20Value%20and%20View.mp4?alt=media&token=cdbe6ca6-ec30-46a9-a287-a155a1c3bfbc',
//     // thumbnail: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/a.%20videos%2FSlide9%20(2).jpeg?alt=media&token=cd770330-1323-49d1-968f-157222063b6f',
//   },
//   {
//     title: 'A plan that’s actionable',
//     image: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/welcome-page-images%2Fservice-providers.png?alt=media&token=074d6881-90f2-4288-92f5-4466c8297e2f',
//     description: `Current - Built with expert insights, your plan helps chart your organization, sets out a timetable, and builds a plan to help you think about tomorrow and what actions to take today to help your business be ready for the future.`,
//     video: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fsuccession-plan%2Fjohn-and-family-at-table-2.png?alt=media&token=91206afd-e7aa-46a0-90e3-add522482cdb',

//     // video: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/a.%20videos%2FNarro%20-%20Providers%20Value%20and%20View.mp4?alt=media&token=bce3535e-3b18-4ba6-b20a-89cea3c7ac81',
//     // thumbnail: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/a.%20videos%2FSlide10%20(2).jpeg?alt=media&token=ea7daba9-fc36-4cb0-87a6-b8761288c77f'
//   },
// ];


export default Customers