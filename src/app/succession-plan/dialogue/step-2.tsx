'use client';

import { useForm } from 'react-hook-form';
import FormSummary from './form-summary';
import { useStepperAudio, useStepperOne } from './multi-step';
import { useEffect, useState, useRef } from 'react';
import { currentSession } from '@/config/session';
import { Button, Checkbox, Text, Badge } from 'rizzui';
import Loader from '@/components/ui/loader';
import Image from 'next/image';
import { AiFillPlayCircle, AiFillStop, AiTwotoneAudio } from 'react-icons/ai';

export default function StepOne(props: { card: any; }) {
  const { card } = props;
  const { step, gotoNextStep } = useStepperOne();
  const currentUser = currentSession() as any;
  const [cardIndex, setCardIndex] = useState('') as any;
  const { audioStatus, setAudioStatus, enableAudio, disableAudio } = useStepperAudio();
  const audioRef = useRef() as any;
  const [playing, setPlaying] = useState(false);
  const [newAudio, setNewAudio] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // This code runs only in the client-side environment
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, []);



  useEffect(() => {
    if (card?.section2?.voiceUrl) {
      audioRef.current.src = card?.section2?.voiceUrl;
      audioRef.current.play();
    }
  }, [card?.section2?.voiceUrl])

  const handleStop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause(); // Pause the audio
      setPlaying(false); // Update state to reflect audio is not playing
      localStorage.removeItem('audioPlaying'); // Remove 'audioPlaying' from localStorage
    }
  };

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause(); // Pause the audio
      setPlaying(false); // Update state to reflect audio is not playing
      localStorage.removeItem('audioPlaying'); // Remove 'audioPlaying' from localStorage
    }
    gotoNextStep();
  };
  if (card?.section2) {
    const title =
      <div className='flex'>
        <div className=''>
          {card?.section2?.title}
        </div>
        {/* <div className=''>

          {!playing && <Button
            rounded="pill"
            variant="outline"
            className="gap-2 whitespace-nowrap border-white text-white hover:border-white hover:bg-white"
            onClick={() => handleSpeak(card?.section2?.audio)}
          >
            {<AiFillPlayCircle className="h-10 w-10 text-black" />}
          </Button>}
          {playing && <Button
            rounded="pill"
            variant="outline"
            className="gap-2 whitespace-nowrap border-white text-white hover:border-white hover:bg-white"
            onClick={() => handleStop()}
          >
            {<AiFillStop className="h-10 w-10 text-black" />}
          </Button>}
        </div> */}
      </div>;
    return (
      <div style={{ height: 'inherit' }} className='col-span-full flex gap-10 mt-10'>
        <div className="ml-10 pt-0 flex flex-col w-[80%]">

          <FormSummary
            cardTitle={card?.section2.title}
            descriptionClassName="@7xl:me-10"
            title={title}
            description={card?.section2?.description}
          />
          {/* <Image
            width={300}
            height={200}
            alt="jen"
            src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fbotsv2%2Fjen-pointintg-right-removebg.png?alt=media&token=3d9442bd-5363-4c98-bc43-9ef401c2d5e4'}
          /> */}

          <form
            id={`rhf-${step.toString()}`}
            onSubmit={handleSubmit(onSubmit)}
            className=" "
          >
          </form>
          <form
            id={`rhf-${step.toString()}-next`}
            onSubmit={handleSubmit(onSubmit)}
            className=" "
          >
          </form>
        </div>

        <div className='flex flex-col mt-10'>

          <h3>{card?.section2?.videoDescription}</h3>
          {<video style={{ marginBottom: '0%', marginTop: '2%' }} width="100%" height="100%" controls={true} >
            <source src={card?.section2?.videoURL ? card?.section2?.videoURL : 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/videoplayback.mp4?alt=media&token=19146d13-1918-4157-895b-d1c11207b709'} type="video/mp4" />
            Your browser does not support the video.
          </video>}
        </div>
      </div>
    );
  } else {
    return <Loader />
  }
}

