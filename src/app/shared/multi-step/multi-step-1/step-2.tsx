'use client';

import { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AdvancedRadio, Button, RadioGroup } from 'rizzui';
import HouseIcon from '@/components/icons/house';
import ApartmentIcon from '@/components/icons/apartment';
import BarnIcon from '@/components/icons/barn';
import SkyscraperIcon from '@/components/icons/skyscraper';
import TentIcon from '@/components/icons/tent';
import CabinIcon from '@/components/icons/cabin';
import CastleIcon from '@/components/icons/castle';
import CaveIcon from '@/components/icons/cave';
import ContainerHouseIcon from '@/components/icons/container-house';
import MobileHomeIcon from '@/components/icons/mobile-home';
import HouseBoatIcon from '@/components/icons/house-boat';
import FarmHouseIcon from '@/components/icons/farm-house';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import {
  formDataAtom,
  useStepperOne,
  useStepperAudio,
} from '@/app/shared/multi-step/multi-step-1';
import {
  PropertyTypeSchema,
  propertyTypeSchema,
} from '@/utils/validators/multistep-form.schema';
import { currentSession } from '@/config/session';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, setDoc, addDoc, query, collection, updateDoc, getDocs, where, serverTimestamp } from "firebase/firestore";
import Image from 'next/image';
import { assistantImg } from './story/chat/config';
import { currentCard } from '@/config/current-card';
import { AiFillPlayCircle, AiFillStop, AiTwotoneAudio } from 'react-icons/ai';

const properties: { name: string; label: string; icon: React.ReactNode }[] = [
  { name: 'house', label: 'House', icon: <HouseIcon /> },
  { name: 'apartment', label: 'Apartment', icon: <ApartmentIcon /> },
  { name: 'barn', label: 'Barn', icon: <BarnIcon /> },
  { name: 'tower', label: 'Tower', icon: <SkyscraperIcon /> },
  { name: 'tent', label: 'Tent', icon: <TentIcon /> },
  { name: 'cabin', label: 'Cabin', icon: <CabinIcon /> },
  { name: 'castle', label: 'Castle', icon: <CastleIcon /> },
  { name: 'cave', label: 'Cave', icon: <CaveIcon /> },
  { name: 'container', label: 'Container', icon: <ContainerHouseIcon /> },
  { name: 'mobile-home', label: 'Mobile Home', icon: <MobileHomeIcon /> },
  // { name: 'hotel', label: 'Hotel', icon: <HouseIcon /> },
  { name: 'house-boat', label: 'House Boat', icon: <HouseBoatIcon /> },
  // { name: 'tiny-home', label: 'Tiny Home', icon: <HouseIcon /> },
  // { name: 'tree-house', label: 'Tree House', icon: <HouseIcon /> },
  { name: 'farm-house', label: 'Farm House', icon: <FarmHouseIcon /> },
];
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/loader';



export default function StepTwo() {
  const { step, gotoNextStep, totalSteps, resetStepper } = useStepperOne();
  const { push } = useRouter();
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
    return () => {
      handleStop();
    }
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

  useEffect(() => {
    const lastMessage = card?.section2?.audio;
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
  }, [card?.section2, currentUser?.id]);


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

  }, [newAudio, playing,]);

  // **************************************************************************
  //  Handles the processing of the speech url returned
  // **************************************************************************
  const handleSpeak = (text: string) => {
    setNewAudio(text);
    setPlaying(true);
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PropertyTypeSchema>({
    // resolver: zodResolver(propertyTypeSchema),
    defaultValues: {
      // propertyType: formData.propertyType,
    },
  });

  useEffect(() => {
    if (errors.propertyType) {
      toast.error(errors.propertyType.message as string);
    }
  }, [errors]);

  const onSubmit = (data: any) => {
    handleStop();
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

  const handleStop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause(); // Pause the audio
      setPlaying(false); // Update state to reflect audio is not playing
      localStorage.removeItem('audioPlaying'); // Remove 'audioPlaying' from localStorage
    }
  };

  const image = assistantImg[card?.aigent];


  const title =
    <div className='flex'>
      <div className=''>
        {card?.section2.titleTwoVideo}
      </div>
      <div className=''>

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
      </div>
    </div>;

  if (card?.section2) {
    return (
      <div style={{ height: 'inherit' }} className='col-span-full flex'>

        <div className="ml-10 pt-0 flex flex-col w-[40%]">
          <FormSummary
            cardTitle={`${card?.section2?.titleTwoVideo}`}
            className="@7xl:me-10"
            title={title}
            description={`${card?.section2?.description}`}
          />
          <Image
            src={image}
            // src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/_Finn%20Final%20-%20Transparent.png?alt=media&token=4cc6ba6c-65cd-4711-b709-62489b8f5e0c'}
            alt="home front part 2"
            width={'200'}
            height={'200'}
            className="mx-auto col-span-full grid grid-cols-2 gap-4 @3xl:grid-cols-3 @4xl:gap-6 @6xl:grid-cols-3 mt-4"
          />
        </div>

        <div className="flex flex-col mt-9 w-[60%]">
          <form
            id={`rhf-${step.toString()}`}
            onSubmit={onSubmit}
            className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
          >
            <>
              {<video style={{ marginBottom: '0%', }} width="100%" height="500" controls={true}>
                <source src={card?.section2?.videoURLTwo ? card?.section2?.videoURLTwo : 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/Introducing%20QualiBuy!.mp4?alt=media&token=a4b3d646-43e3-4158-9738-50a8d781707b'} type="video/mp4" />
                Your browser does not support the video.
              </video>}
              {/* <Image
              src={card?.section2?.url}
              alt="home front part 2"
              className="col-span-full grid grid-cols-2 gap-4 @3xl:grid-cols-3 @4xl:gap-6 @6xl:grid-cols-3"
            /> */}
              {/* <Controller
              name="propertyType"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  value={value}
                  setValue={onChange}
                  className="col-span-full grid grid-cols-2 gap-4 @3xl:grid-cols-3 @4xl:gap-6 @6xl:grid-cols-3"
                >
                  {properties.map((property) => (
                    <AdvancedRadio
                      key={property.name}
                      value={property.name}
                      className=" [&_.rizzui-advanced-radio]:px-6 [&_.rizzui-advanced-radio]:py-6"
                      inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-radio]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
                    >
                      <span className="mb-4 block h-8 w-8 [&_svg]:w-8">
                        {property.icon}
                      </span>
                      <span className="font-semibold">{property.label}</span>
                    </AdvancedRadio>
                  ))}
                </RadioGroup>
              )}
            /> */}
            </>
          </form>
        </div>
      </div>
    );
  } else {
    return <Loader />
  }
}
