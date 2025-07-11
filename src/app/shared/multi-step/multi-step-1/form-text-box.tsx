'use client';

import {
  stepOneTotalSteps,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import cn from '@/utils/class-names';
import { useState } from 'react';
import { AiFillStop } from 'react-icons/ai';
import { Button } from 'rizzui';

interface FormSummaryProps {
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  playing?: any;
  setPlaying?: any;
  audioRef?: any;
}

const handleStop = (playing: any, setPlaying: any, audioRef: any) => {
  const audio = audioRef.current;
  if (audio) {
    audio.pause(); // Pause the audio
    setPlaying(false); // Update state to reflect audio is not playing
    localStorage.removeItem('audioPlaying'); // Remove 'audioPlaying' from localStorage
  }
};




export default function FormTextBox({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  playing,
  setPlaying,
  audioRef,
}: FormSummaryProps) {
  const { step } = useStepperOne();
  const [showMore, setShowMore] = useState({}) as any;
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={cn('text-base text-black', className)}>
      <article className="mt-4 @3xl:mt-9">
        <div className="flex">
          <h1
            className={cn(
              'text-xl text-black @3xl:text-2xl @7xl:text-3xl @[113rem]:text-4xl',
              titleClassName
            )}
          >
            {title}
          </h1>
          {playing && <Button
            rounded="pill"
            variant="flat"
            style={{ backgroundColor: 'transparent' }}
            className="whitespace-nowrap border-white text-white w-1/10 -mt-2"
            onClick={() => handleStop(playing, setPlaying, audioRef)}
          >
            {<AiFillStop className="h-8 w-8 text-black" />}
          </Button>}
        </div>
        {isExpanded ? (
          <>
            <p
              className={cn(
                'mt-3 text-sm leading-relaxed @3xl:text-base',
                descriptionClassName
              )}
            >
              {description}
            </p>
            <p onClick={toggleExpansion} style={{ color: 'blue' }}>Show Less</p>
          </>
        ) :
          (
            <>
              <p
                className={cn(
                  'mt-3 text-sm leading-relaxed @3xl:text-base truncate cursor-pointer',
                  descriptionClassName
                )}
              >
                {description}
              </p>
              {description && <p onClick={toggleExpansion} style={{ color: 'blue' }}>Show More</p>}
            </>
          )}
      </article>
    </div>
  );
}
