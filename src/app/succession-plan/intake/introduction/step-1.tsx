'use client';

import { useRef } from 'react';

interface StepOneProps {
  gotoNextStep: () => void,
}

export default function StepOne(props: StepOneProps) {
  const { gotoNextStep } = props;
  const audioRef = useRef() as any;

  const onSubmit = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause(); // Pause the audio
      localStorage.removeItem('audioPlaying'); // Remove 'audioPlaying' from localStorage
    }
    gotoNextStep();
  };

  return (
    <div style={{ height: 'inherit' }}
      className='col-span-full flex flex-col gap-10'>
      <div className="mt-4 flex flex-col w-[80%] gap-5 items-center mx-auto justify-center">
        <h1>Welcome to SuccessionBuilder!</h1>
        <h5>Click the video below to Play</h5>
        <form
          id={'1'}
          onSubmit={() => onSubmit()}
          className=""
        >
          <video
            width="100%"
            height="100%"
            className='cursor-pointer'
            controls={true}
            poster={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fjen-cover%20(1).png?alt=media&token=fdd3d01c-08a9-4ce4-888b-dcaf76ba9a76'}
          >
            <source src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/SuccessionBuilder%20Intro%20Video.mp4?alt=media&token=a75004f9-3d71-4786-b8da-36c60cdde3b2'} type="video/mp4" />
            Your browser does not support the video.
          </video>
        </form>
      </div>
    </div>
  );
}

