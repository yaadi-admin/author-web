'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import homeFront from '@public/home-front.png';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import { useStepperAudio, useStepperOne } from '@/app/shared/multi-step/multi-step-1';
import { useEffect, useState, useRef } from 'react';
import { currentSession } from '@/config/session';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, setDoc, addDoc, query, collection, updateDoc, getDocs, where, serverTimestamp } from "firebase/firestore";
import { Button, Checkbox, Text, Badge } from 'rizzui';
import FormText from '@/app/shared/multi-step/multi-step-1/form-text';
import { currentCard } from '@/config/current-card';
import Loader from '@/components/ui/loader';

import { AiFillPlayCircle, AiFillStop, AiTwotoneAudio } from 'react-icons/ai';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

export default function StepOne() {
  const { step, gotoNextStep, totalSteps, resetStepper } = useStepperOne();
  const { push } = useRouter();
  const card = currentCard() as any;
  // const [card, setCard] = useState({}) as any;
  const currentUser = currentSession() as any;
  const [cardIndex, setCardIndex] = useState('') as any;
  const { audioStatus, setAudioStatus, enableAudio, disableAudio } = useStepperAudio();
  // const [card, setCard] = useState({}) as any;


  const audioRef = useRef() as any;
  const [playing, setPlaying] = useState(false);
  const [newAudio, setNewAudio] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // This code runs only in the client-side environment
    audioRef.current = new Audio();
  }, []);

  useEffect(() => {
    const lastMessage = card?.section1?.audio;
    if (audioStatus === 0) {
      if (lastMessage) {
        localStorage.setItem("lastDescription", lastMessage);
      }
    }
  }, [card?.section1]);


  // **************************************************************************
  //  Plays audio when an audio link is available
  // **************************************************************************
  useEffect(() => {
    const isAudioEnabled = localStorage.getItem("audioEnabled");
    const isPlaying = localStorage.getItem("audioPlaying");
    // if (isAudioEnabled) {
    // if (!isPlaying) {
    const audio = audioRef.current;

    if (audio) {
      setLoading(false);
      // Check if there's a new audio URL and if it's not empty
      if (newAudio !== '') {
        audio.src = newAudio; // Update audio source

        // If 'playing' is true, play the audio; otherwise, pause it
        if (playing) {
          audio.play();
          localStorage.setItem("audioPlaying", newAudio);
        } else {
          audio.pause();
        }
      } else {
        // If there's no new audio URL, pause the audio
        audio.pause();
      }

      // Add event listener for 'ended' event
      audio.addEventListener('ended', () => {
        setPlaying(false);
        localStorage.removeItem('audioPlaying');
        // setNewAudio('');
      });

      // Clean up event listener
      return () => {
        audio.removeEventListener('ended', () => {
          setPlaying(false);
          localStorage.removeItem('audioPlaying');
          // setNewAudio('');
        });
      };
    }
    // }
    // }

  }, [newAudio, playing]);

  // **************************************************************************
  //  Handles the processing of the speech url returned
  // **************************************************************************
  const handleSpeak = (text: string) => {
    setNewAudio(text);
    setPlaying(true);
  };

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
    // if (step === totalSteps - 1) {
    //   if (currentUser?.role === 'admin') {
    //     push(routes.adminSellerSpan); resetStepper();
    //   } else {
    //     push(routes.eCommerce.dashboard); resetStepper();
    //   }
    // } else {
    //   gotoNextStep();
    // }
    gotoNextStep();
  };
  if (card?.section1) {
    const title =
      <div className='flex'>
        <div className=''>
          {card?.section1?.title}
        </div>
        <div className=''>

          {!playing && <Button
            rounded="pill"
            variant="outline"
            className="gap-2 whitespace-nowrap border-white text-white hover:border-white hover:bg-white"
            onClick={() => handleSpeak(card?.section1?.audio)}
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
        </div>
      </div>;
    return (
      <div style={{ height: 'inherit' }} className='col-span-full flex'>
        <div className="ml-10 pt-0 flex flex-col w-[40%]">

          <FormSummary
            cardTitle={card?.section1.title}
            descriptionClassName="@7xl:me-10"
            title={title}
            description={card?.section1?.description}
          />

          <form
            id={`rhf-${step.toString()}`}
            onSubmit={handleSubmit(onSubmit)}
            className=" "
          >
            <div className='flex flex-col gap-5 mt-10 w-full'>
              <div className='flex items-center w-full' >
                <h4 className='mr-4'>Is this step mandatory?</h4>
                <Badge color="info" variant='flat' className='' >
                  {`${card?.required ? 'Yes' : 'No'}`}
                </Badge>
              </div>


              <div className='flex items-center w-full' >
                <h4 className='mr-4'>{`Who's responsible?`}</h4>
                <div className='flex gap-2'>
                  {(card?.section1?.responsible)?.map((item: any, index: number) => (
                    <Badge
                      key={`who-${index}`}
                      color="info"
                      variant='flat'
                      className=''>
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className='flex items-center w-full' >
                <h4 className='mr-4'>{`Where's it used later?`}</h4>
                <div className='flex gap-2'>

                  {(card?.section1?.referenced)?.map((item: any, index: number) => (
                    <Badge key={`where-${index}`} color="info" variant='flat' className=''>
                      {item}
                    </Badge>))}
                </div>

              </div>
            </div>

          </form>
        </div>

        <div className='flex flex-col mt-9 w-[70%]'>

          <div className='w-full' style={{ marginTop: '5%' }}>
            <iframe
              src={card?.section2?.videoURL}
              height={500}
              allowFullScreen={true}
              width={"100%"}
              frameBorder={0}
            />
          </div>

        </div>
      </div>
    );
  } else {
    return <Loader />
  }
}

