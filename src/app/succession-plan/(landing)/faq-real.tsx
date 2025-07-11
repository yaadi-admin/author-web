'use client';

import React, { useState, useEffect } from 'react'
import { Title, Text } from 'rizzui';
import Accordion from '@/components/ui/accordion';

import './faq.css';

const data = [
  {
    title: 'Why does a business owner like me need a succession plan?',
    content: <div className='4xs:text-md md:text-lg leading-loose'>
      If you are a business owner who wants to:
      <ul>
        <li>Increase the value of the business: by planning for its long-term future, and making it easier/more “turnkey” for a new owner; </li>
        <li>Be ready for a “rainy day”: plans are most necessary when you least expect it - by planning ahead your wishes and understanding of the business, you can be ready to different scenarios in the future; </li>
        <li>Reduce disruptions in a transition: handovers can be done easier, planned ahead, new leaders identified, and plans can be actionable to implement once you decide to transition;</li>
        <li>Maintain your business legacy: by writing out your values, vision, and desires for the future - you can codify your legacy and express yourself into new generations of ownership </li>
      </ul>
      <br />
      Then succession planning is for you! The reality is that few businesses have a succession plan, but all businesses need one. Narro’s SuccessionBuilder makes it easier than ever!   </div>
  },
  {
    title: 'How are you able to have significantly lower the costs of making a plan?',
    content: <div className='4xs:text-md md:text-lg leading-loose'>
      We reduce the time and effort of intermediaries through technology, allowing us to automate, streamline, and optimize the building of a succession plan. We pass those technology-unlocked savings onto you, the business owner, allowing you to enjoy more of their money in their retirement or next step in their journey.
    </div>
  },

  {
    title: 'Who is behind Narro?',
    content: <div className='4xs:text-md md:text-lg leading-loose'>
      Narro is a Toronto, Canada-based technology company founded by professionals in M&A, finance, brokerage, legal and real estate – all with SMB in their blood, as the founders, sons, daughters, and grandchildren of small business owners from around the world. We’ve seen firsthand the pains of busy small business owners to plan for the future, which is why we’re using technology to make it easier, faster, and more affordable than ever.
    </div>
  },
  {
    title: 'Do you provide valuations, legal, tax, or financial advice?',
    content: <div className='4xs:text-md md:text-lg leading-loose'>
      The platform nor our AIgents provide valuations, legal, tax, or financial advice. Our platform does offer information to help you identify and assess options, learn from best practices, and leverage tools and templates to empower you to make your own decisions. However, if you do want professional advice or support, we’ve built relationships with reputable professional service providers who are offering preferred rates to Narro users.     </div>
  },
  {
    title: 'There are succession planning templates out there, how is this different?',
    content: <div className='4xs:text-md md:text-lg leading-loose'>
      Indeed there are! There are lots of available templates you can find online, however, we’ve heard from owners and professionals that the questions are unclear, that blank templates can be daunting to fill out, and most of them require you to do all the planning, thinking, and put it all together. We know most of you are busy, not HR professionals, and want to feel supported - that’s why our builder is designed to use voice-to-voice communication with our specially-trained AI agent to help guide you through every question, and help synthesize your inputs into an actionable report.

    </div>
  },
  {
    title: 'Can I trust the AI? What role does it play?',
    content: <div className='4xs:text-md md:text-lg leading-loose'>
      Our AI is private, confidential and specific to each user. The data you provide is private, secure, and confidential (read our Terms of Service and Privacy Policy for further details). The AI that powers our agents is trained on the best practices and samples of professional succession plans, allowing you to have a comparable experience. The AI is further trained to be supportive and helpful to you in the journey - by being able to explain things, ask deeper questions, and synthesize data rapidly.
    </div>
  },
  {
    title: 'I’m an HR consultant or professional, how can I use this with my client? ',
    content: <div className='4xs:text-md md:text-lg leading-loose '>
      We’d love to help you help your clients! Not only can you use this with your clients, but we can offer group discounts. Please contact info@thenarro.com to discuss arrangements.
    </div>
  }
]

function Faq() {
  const [selected, setSelected] = useState(-1);

  return (
    <div
      className="grow items-center pt-20 sm:pt-32 md:pt-40 pb-[56px]"
    >
      <div className="flex flex-col items-center gap-10 4xs:px-4 4xs:w-full sm:w-full lg:w-4/5 m-auto">
        <Title
          as="h1"
          className="text-md font-medium w-full text-center mb-3 text-[22px] font-bold sm:text-2xl md:mb-5 md:text-3xl  xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
        >
          {`FAQ`}
        </Title>
        <div className='w-full md:w-[80%] mx-auto'>
          {data.map((d, index) => (
            <Accordion
              key={`${d.title}-${index}`}
              title={d.title}
              body={d.content}
              isOpen={index === selected}
              onChange={() => setSelected(index)}
            />
          ))}

        </div>
      </div>
    </div>
  )
}






export default Faq