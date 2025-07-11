'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState, useRef } from 'react';
import { currentSession } from '@/config/session';
import { Button, Checkbox, Text, Badge } from 'rizzui';
import Loader from '@/components/ui/loader';
import Image from 'next/image';
import { useModal } from '@/app/shared/modal-views/use-modal';

export default function StepTwo() {
  const { closeModal } = useModal();

  return (
    <div style={{ height: '500px' }} className='col-span-full flex-col space-around mt-16'>
      <div className='flex'>
        <div className="ml-10 pt-0 flex flex-col w-[50%]">
          <Image
            width={400}
            height={300}
            alt="jen"
            src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fbotsv2%2Fjen-pointintg-right-removebg.png?alt=media&token=3d9442bd-5363-4c98-bc43-9ef401c2d5e4'}
          />
        </div>
        <div className='flex flex-col mt-10'>

          <h1>What you need to get started</h1>

          <ul className=" list-inside space-y-2 mt-5">
            <li className='text-lg'>💻 A good internet connection</li>
            <li className='text-lg'>🔇 A quiet place (to hear and record your dialogues)</li>
            <li className='text-lg'>
              📋 Information about the following (you can update these later if you don’t have them on-hand):
              <ul className=" list-inside ml-6 space-y-2">
                <li className='text-lg'>📄 Your business incorporation documents</li>
                <li className='text-lg'>👥 Your Advisor names/contacts (e.g., your lawyer, accountant, consultants)</li>
                <li className='text-lg'>💰 Your financials (nice to have, but not necessary)</li>
              </ul>
            </li>
            <li className='text-lg'>
              ⏳ Some blocks of time:
              <ul className=" list-inside ml-6 space-y-2">
                <li className='text-lg'>
                  🕐 The 6 dialogues range from 20 minutes to over an hour, but you can pick up where you left off
                </li>
              </ul>

            </li>
          </ul>

        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mr-6">
        <Button
          variant="solid"
          onClick={() => closeModal()}
        >
          OK
        </Button>
      </div>
    </div>
  );
}

