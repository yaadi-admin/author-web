/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import React, { useEffect, useState, useMemo } from 'react';
import { PiStopLight } from 'react-icons/pi';
import BubbleLoader from './ui/message-list/message-loader';
import { currentSession } from '@/config/session';
import { assistantImgs } from '@/config/bots';

interface FrequencyPulseProps {
  frequencyData: Uint8Array;
  imageSrc?: string;
  isUserSpeaking?: any;
  bgColor?: string;
  intials?: string;
  onStopRecording?: any;
  assistantId: string,
  isRequestingStream?: boolean;
  isUser?: boolean,
  isPlaying?: boolean;
  isProcessingSpeech?: boolean;
  emotion?: 'happiness' | 'neutral' | 'retrieving' | 'sadness' | 'surprise' | 'thinking';
}

const FrequencyPulse: React.FC<FrequencyPulseProps> = React.memo(({
  isPlaying,
  isUserSpeaking,
  assistantId,
  isUser,
  isProcessingSpeech,
  frequencyData,
  imageSrc,
  bgColor = '#1A5F85',
  intials,
  emotion,
  onStopRecording,
  isRequestingStream,
}) => {
  const currentUser = currentSession();
  const [pulseData, setPulseData] = useState<number[]>([]);
  const userSpeaking = isUserSpeaking === 'yes';

  const botThinking =
    'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fbotsv2%2Fjen-thinking.png?alt=media&token=559a1cfd-7196-4e15-8cda-47ae3cd20deb';

  useEffect(() => {
    const transformedFrequencyData = Array.from(frequencyData)
      .map((value) => Math.max(0, value / 255))
      .slice(0, 5);
    setPulseData(transformedFrequencyData);
  }, [frequencyData]);

  useEffect(() => {
    let animationFrameId: number;
    const smoothAnimation = () => {
      setPulseData((prev) => {
        const newPulseData = prev.map((size, index) => {
          return Math.max(0, size + (pulseData[index] - size) * 0.1);
        });
        return newPulseData;
      });
      animationFrameId = requestAnimationFrame(smoothAnimation);
    };
    if (isPlaying) {
      smoothAnimation();
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [pulseData, isPlaying]);

  const aigentImg = isRequestingStream
    ? emotion === 'retrieving'
      ? assistantImgs[assistantId]?.[emotion]
      : assistantImgs[assistantId]?.['thinking']
    : emotion
    ? assistantImgs[assistantId]?.[emotion]
    : '';

  return (
    <div className="relative ml-[12%] w-full h-full flex items-center justify-center">
      <div className="absolute flex items-center justify-center w-full h-full">
      {pulseData.map((size, index) => (
        <div
        key={index}
        className="pulse"
        style={
          {
          '--scale': `${1 + size * 0.5}`,
          '--size': `${size * 200 + 100}px`,
          '--opacity': size > 0 ? 1 : 0,
          '--gradient': isUser
            ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1))'
            : 'linear-gradient(to bottom, rgba(87, 54, 251, 0.1), rgba(87, 54, 251, 0.1))',
          } as React.CSSProperties
        }
        />
      ))}
      </div>
      {isUser ? (
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full">
        {currentUser?.profilePictureURL ? (
        <img
          src={currentUser?.profilePictureURL}
          alt=""
          className={`rounded-full shadow-2xl object-contain w-full h-full relative z-10 bg-white transition-transform ${
          isProcessingSpeech ? 'pulse-enlarge' : ''
          }`}
        />
        ) : (
        <span
          className={`rounded-full shadow-2xl flex items-center justify-center w-full h-full z-10 bg-secondary text-secondary-foreground ${
          isProcessingSpeech ? 'pulse-enlarge' : ''
          }`}
        >
          <div className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-regular">{intials}</div>
        </span>
        )}
      </div>
      ) : (
      <div className="rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 relative z-10 flex items-center justify-center bg-green-200 font-regular">
        <img
        src={aigentImg}
        alt=""
        className={`rounded-full shadow-2xl object-contain w-full h-full relative z-10 bg-white transition-transform ${
          isRequestingStream ? 'bg-green-500 animate-pulse' : ''
        }`}
        />
      </div>
      )}
    </div>
  );
});

export default FrequencyPulse;
