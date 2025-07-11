'use client';

import { useAtom } from 'jotai';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AdvancedRadio, RadioGroup } from 'rizzui';
import {
  formDataAtom,
  useStepperAudio,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import HouseIcon from '@/components/icons/house';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import RoomSharedIconColor from '@/components/icons/room-shared-color';
import RoomSingleIconColor from '@/components/icons/room-single-color';
import {
  placeTypeSchema,
  PlaceTypeSchema,
} from '@/utils/validators/multistep-form.schema';
import MessageDetails from '@/app/shared/support/inbox/message-details';
import { currentSession } from '@/config/session';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, setDoc, addDoc, query, collection, updateDoc, getDocs, where, serverTimestamp } from "firebase/firestore";
import FormTextBox from './form-text-box';
import { currentCard } from '@/config/current-card';

const places: {
  value: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}[] = [
    {
      value: '1',
      name: 'An Entire Place',
      description: 'Guests have the whole place to themselves',
      icon: <HouseIcon />,
    },
    {
      value: '2',
      name: 'Single Room',
      description: `Guests have their own room in a home, plus access to shared spaces.`,
      icon: <RoomSingleIconColor />,
    },
    {
      value: '3',
      name: 'A Shared Room',
      description: `Guests sleep in a room or common area that may be shared with you or others.`,
      icon: <RoomSharedIconColor />,
    },
  ];

export default function StepTwo() {
  const { step, gotoNextStep } = useStepperOne();
  const card = currentCard() as any;
  const [formData, setFormData] = useAtom(formDataAtom);
  const currentUser = currentSession() as any;
  const [cardIndex, setCardIndex] = useState('') as any;
  const { audioStatus, setAudioStatus, enableAudio, disableAudio } = useStepperAudio();
  // const [card, setCard] = useState({}) as any;

  const audioRef = useRef() as any;
  let audio = null as any;
  const [playing, setPlaying] = useState(false);
  const [newAudio, setNewAudio] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // This code runs only in the client-side environment
    audioRef.current = new Audio();
  }, []);


  useEffect(() => {
    if (audioStatus === 1) {
      const audio = audioRef.current;
      if (audio) {
        audio.pause(); // Pause the audio
        setPlaying(false); // Update state to reflect audio is not playing
        localStorage.removeItem('audioPlaying'); // Remove 'audioPlaying' from localStorage
      }
    }
  }, [audioStatus]);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PlaceTypeSchema>({
    resolver: zodResolver(placeTypeSchema),
    defaultValues: {
      placeType: formData.placeType,
    },
  });

  useEffect(() => {
    const lastMessage = card?.section3?.audio;
    const storedLastMessage = localStorage.getItem("lastDescription");
    if (audioStatus === 0) {
      if (lastMessage && lastMessage !== storedLastMessage) {
        if (lastMessage) {
          console.log('fetching voice')
          handleSpeak(lastMessage);
          localStorage.setItem("lastDescription", lastMessage);
        }
      }
    }
  }, [card?.section3]);

  // **************************************************************************
  //  Plays audio when an audio link is available
  // **************************************************************************
  useEffect(() => {
    const isAudioEnabled = localStorage.getItem("audioEnabled");
    const isPlaying = localStorage.getItem("audioPlaying");
    // if (isAudioEnabled) {
    if (!isPlaying) {
      audio = audioRef.current;

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
    }
    // }

  }, [newAudio, playing]);

  // **************************************************************************
  //  Handles the processing of the speech url returned
  // **************************************************************************
  const handleSpeak = (text: string) => {
    setNewAudio(text);
    setPlaying(true);
  };


  useEffect(() => {
    if (errors.placeType) {
      toast.error(errors.placeType.message as string);
    }
  }, [errors]);

  const onSubmit = (data: any) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause(); // Pause the audio
      setPlaying(false); // Update state to reflect audio is not playing
      localStorage.removeItem('audioPlaying'); // Remove 'audioPlaying' from localStorage
    }
    gotoNextStep();
  };

  return (
    <div className="col-span-full flex gap-10" style={{ height: 'inherit' }}>
      {/* <FormSummary
          cardTitle='Tools and Templates'
          className="@7xl:me-24"
          title={card?.section3?.title}
          description={card?.section3?.description}
        /> */}




      <div className='w-1/2 ml-10'>

        <FormSummary
          playing={playing}
          setPlaying={setPlaying}
          // showCardTitle={false}
          audioRef={audioRef}
          cardTitle={card?.section3?.title}
          className="@7xl:me-10"
          title={`${card?.section3?.title}`}
          description={``}
        />
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={onSubmit}
        >
          <div className="flex-grow rounded-lg bg-white p-5 @4xl:p-7  border dark:bg-gray-0 ">
            <>
              <div className="flex items-center gap-1">
                <div className='w-full'>
                  <iframe src={card?.section3?.url} className='w-full' height={'400'} frameBorder="0"></iframe>
                </div>
              </div>
            </>
          </div>

          <FormTextBox
            playing={playing}
            setPlaying={setPlaying}
            audioRef={audioRef}
            className="@7xl:me-24 "
            title={card?.section3?.titleTwo}
            description={''}
          />

          <div className="flex-grow rounded-lg bg-white p-5 @4xl:p-7  border dark:bg-gray-0 mt-2">
            <>
              <div className="flex items-center gap-1">
                <div className='w-full'>
                  <iframe src={card?.section3?.documentURLTwo} className='w-full' height={'400'} frameBorder="0"></iframe>
                </div>
              </div>
            </>
          </div>
        </form>
      </div>



      <div className=" w-1/2 mr-10">
        <FormTextBox
          playing={playing}
          setPlaying={setPlaying}
          audioRef={audioRef}
          className="mt-[52px]"
          title={card?.section3?.titleThree}
          description={''}
        />
        {/* <div className="w-full h-100 rounded-lg items-center justify-start"> */}
        {/* <MessageDetails /> */}
        {/* </div> */}
        <div className="flex-grow rounded-lg bg-white p-5 @4xl:p-7  border dark:bg-gray-0 ">

          <div className="flex items-center gap-1">
            <div className='w-full'>
              <iframe src={card?.section3?.documentURLThree} className='w-full' height={'400'} frameBorder="0"></iframe>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
