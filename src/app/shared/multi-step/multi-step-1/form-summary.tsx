'use client';

import {
  stepOneTotalSteps,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import cn from '@/utils/class-names';
import { useAtomValue } from 'jotai';
import { AiFillStop } from 'react-icons/ai';
import { Button } from 'rizzui';

interface FormSummaryProps {
  title: React.ReactNode | string;
  description: React.ReactNode | string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  cardTitle?: string;
  playing?: any;
  setPlaying?: any;
  audioRef?: any;
  showDescription?: boolean;
  showTitle?: boolean;
  showCardTitle?: boolean;
}

const handleStop = (playing: any, setPlaying: any, audioRef: any) => {
  const audio = audioRef.current;
  if (audio) {
    audio.pause(); // Pause the audio
    setPlaying(false); // Update state to reflect audio is not playing
    localStorage.removeItem('audioPlaying'); // Remove 'audioPlaying' from localStorage
  }
};

export default function FormSummary({
  title,
  cardTitle,
  showCardTitle = true,
  showTitle = true,
  showDescription = true,
  description,
  className,
  titleClassName,
  descriptionClassName,
  playing,
  setPlaying,
  audioRef,
}: FormSummaryProps) {
  const { step } = useStepperOne();
  const total = useAtomValue(stepOneTotalSteps)
  return (
    <div className={cn('text-base text-black', className)}>
      {showCardTitle ?
        <div className="flex">
          <span className="me-2 mt-2.5 h-0.5 w-11 bg-black/[.35]" /> {' '}
          {cardTitle ? cardTitle : `Card ${step + 1} of ${total}`}
          {playing && <Button
            rounded="pill"
            variant="flat"
            style={{ backgroundColor: 'transparent' }}
            className="whitespace-nowrap border-white text-white w-1/10 -mt-2"
            onClick={() => handleStop(playing, setPlaying, audioRef)}
          >
            {<AiFillStop className="h-8 w-8 text-black" />}
          </Button>}
          <div className="flex">
            <span className="me-2 mt-2.5 h-0.5 w-11 bg-white/[.35]" /> Step{' '}
            {step + 1} of {total}
          </div>
        </div> : <div />
      }
      <article className="mt-4 @3xl:mt-9">
        {showTitle ?
          <h1
            className={cn(
              'text-xl text-black @3xl:text-2xl @7xl:text-3xl @[113rem]:text-4xl',
              titleClassName
            )}
          >
            {title}
          </h1>
          : null}
        {showDescription ?
          <p
            className={cn(
              'mt-3 text-sm leading-relaxed @3xl:text-base',
              descriptionClassName
            )}
          >
            {description}
          </p> : null}
      </article>
    </div>
  );
}
