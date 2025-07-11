'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiSave } from 'react-icons/fi';
import { Button } from 'rizzui';
import cn from '@/utils/class-names';
import { useMedia } from '@/hooks/use-media';
import { siteConfig } from '@/config/site.config';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import {
  formDataAtom,
  initialFormData,
  stepperAtomOne,
  useStepperOne,
  useStepperAudio,
} from '@/app/shared/multi-step/multi-step-1';
import { AiFillAudio, AiOutlineAudioMuted, AiTwotoneAudio, AiTwotonePauseCircle, AiTwotoneSound } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { currentSession } from '@/config/session';

interface FooterProps {
  className?: string;
  formId?: number;
}

export default function Header({ className }: FooterProps) {
  const isMobile = useMedia('(max-width: 767px)', false);
  const { step, gotoPrevStep } = useStepperOne();
  const { push } = useRouter();
  const { audioStatus, setAudioStatus, enableAudio, disableAudio } = useStepperAudio();
  const currentUser = currentSession() as any;

  const handleSave = () => {
    localStorage.removeItem('currentCard');
    localStorage.removeItem('cardData');
    if (currentUser?.role === 'admin') {
      push(routes.adminSellerSpan);
    } else {
      push(routes.eCommerce.dashboard);
    }
  }

  return (
    <header
      className={cn(
        'flex w-full items-center justify-between px-4 py-5 md:h-20 md:px-5 lg:px-8 4xl:px-10',
        className
      )}
    >
      <Link href={'/ecommerce'}>
        <Image
          src={isMobile ? siteConfig.icon : siteConfig.logo}
          alt={siteConfig.title}
          style={{ width: 250, height: 60 }}
          width={250}
          height={60}
          className=""
          priority
        />
      </Link>
      <div className="flex items-center gap-2">
        {(step !== 5) && audioStatus === 0 && <Button
          rounded="pill"
          variant="solid"
          className="gap-2 whitespace-nowrap border-white text-white hover:border-white hover:bg-white hover:text-black"
          onClick={disableAudio}
        >
          {<AiTwotoneSound className="h-4 w-4" />}
        </Button>}

        {(step !== 5) && audioStatus === 1 && <Button
          rounded="pill"
          variant="solid"
          className="gap-2 whitespace-nowrap border-white text-white hover:border-white hover:bg-white hover:text-black"
          onClick={enableAudio}
        >
          {<AiTwotonePauseCircle className="h-4 w-4" />}
        </Button>}
        {/* {(step === 4) && <Button variant="outline"
          rounded="pill" className="text-black hover:enabled:text-black">
          Card Description
        </Button>} */}
        {(step !== 5) && <Button
          rounded="pill"
          variant="flat"
          // color='gray'
          className="gap-2 whitespace-nowrap border-white text-black"
          onClick={handleSave}
        >
          <FiSave className="h-4 w-4" />
          Save & Exit
        </Button>}
      </div>
    </header>
  );
}
