'use client';

import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import { useEffect, useState, useRef } from 'react';
import { Text, CheckboxGroup, AdvancedCheckbox } from 'rizzui';
import { PiTelevision, PiWifiHigh } from 'react-icons/pi';
import KitchenIcon from '@/components/icons/kitchen';
import WashingMachineIcon from '@/components/icons/washing-machine';
import CarParkingIcon from '@/components/icons/car-parking';
import AirConditionerIcon from '@/components/icons/air-conditioner';
import WorkplaceIcon from '@/components/icons/workplace';
import MeterIcon from '@/components/icons/meter';
import SwimmingPoolIcon from '@/components/icons/swimming-pool';
import BBQGrillIcon from '@/components/icons/bbq-grill';
import DiningIcon from '@/components/icons/dining';
import PoolTableIcon from '@/components/icons/pool-table';
import GymIcon from '@/components/icons/gym';
import SmokeAlarmIcon from '@/components/icons/smoke-alarm';
import FireExtinguisherIcon from '@/components/icons/fire-extinguisher';
import CCCameraIcon from '@/components/icons/CCCamera';
import toast from 'react-hot-toast';
import {
  FormStep6Schema,
  formStep6Schema,
} from '@/utils/validators/multistep-form.schema';
import { currentSession } from '@/config/session';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, setDoc, addDoc, query, collection, updateDoc, getDocs, where, serverTimestamp } from "firebase/firestore";
import Image from 'next/image';
import { currentCard } from '@/config/current-card';

type Amenity = {
  value: string;
  name: string;
  icon: React.ReactNode;
};

const indoorAmenities: Amenity[] = [
  {
    value: 'wifi',
    name: 'Wi-Fi',
    icon: <PiWifiHigh className="h-8 w-8" />,
  },
  {
    value: 'tv',
    name: 'TV',
    icon: <PiTelevision className="h-8 w-8" />,
  },
  {
    value: 'kitchen',
    name: 'Kitchen',
    icon: <KitchenIcon className="h-8 w-8" />,
  },
  {
    value: 'washing-machine',
    name: 'Washing Machine',
    icon: <WashingMachineIcon className="h-8 w-8" />,
  },
  {
    value: 'Parking',
    name: 'Parking',
    icon: <CarParkingIcon className="h-8 w-8" />,
  },
  {
    value: 'Air Conditioning',
    name: 'Air Conditioning',
    icon: <AirConditionerIcon className="h-8 w-8" />,
  },
  {
    value: 'Workplace',
    name: 'Workplace',
    icon: <WorkplaceIcon className="h-8 w-8" />,
  },
  {
    value: 'Water Heating',
    name: 'Water Heating',
    icon: <MeterIcon className="h-8 w-8" />,
  },
];

const outdoorAmenities: Amenity[] = [
  {
    value: 'Swimming Pool',
    name: 'Swimming Pool',
    icon: <SwimmingPoolIcon className="h-8 w-8" />,
  },
  {
    value: 'BBQ Grill',
    name: 'BBQ Grill',
    icon: <BBQGrillIcon className="h-8 w-8" />,
  },
  {
    value: 'Outdoor Dining',
    name: 'Outdoor Dining',
    icon: <DiningIcon className="h-8 w-8" />,
  },
  {
    value: 'Pool Table',
    name: 'Pool Table',
    icon: <PoolTableIcon className="h-8 w-8" />,
  },
  {
    value: 'Gym',
    name: 'Gym',
    icon: <GymIcon className="h-8 w-8" />,
  },
  {
    value: 'Smoke Alarm',
    name: 'Smoke Alarm',
    icon: <SmokeAlarmIcon className="h-8 w-8" />,
  },
  {
    value: 'Fire extinguisher',
    name: 'Fire extinguisher',
    icon: <FireExtinguisherIcon className="h-8 w-8" />,
  },
  {
    value: 'Security Camera',
    name: 'Security Camera',
    icon: <CCCameraIcon className="h-8 w-8" />,
  },
];

export const placeInfoValues = {
  indoorAmenities: [],
  outdoorAmenities: [],
};
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

export default function StepTwo() {
  const [formData, setFormData] = useAtom(formDataAtom);
  const card = currentCard() as any;
  const { step, gotoNextStep, totalSteps, resetStepper } = useStepperOne();
  const { push } = useRouter();
  const currentUser = currentSession() as any;
  const [cardIndex, setCardIndex] = useState('') as any;
  // const [card, setCard] = useState({}) as any;


  const audioRef = useRef() as any;
  const [playing, setPlaying] = useState(false);
  const [newAudio, setNewAudio] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // This code runs only in the client-side environment
    audioRef.current = new Audio();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const downloadURL = localStorage.getItem('currentCard');
  //     if (downloadURL) {
  //       console.log(downloadURL);
  //       setCardIndex(downloadURL);
  //       // localStorage.removeItem('companyURL');
  //       clearInterval(interval); // Stop checking once URL is found
  //     }
  //   }, 3000); // Check every 3 seconds

  //   return () => clearInterval(interval); // Clean up interval on component unmount
  // }, []);


  // useEffect(() => {
  //   fetchCardData();
  // }, [currentUser?.id && cardIndex]);

  // const fetchCardData = async () => {
  //   if (!currentUser || !currentUser.id) {
  //     console.error("Invalid or missing currentUser id");
  //     return;
  //   }

  //   try {
  //     // Define the query for the specific 'sellerspan' document
  //     const sellerspanDocQuery = query(
  //       collection(firebase.firestore, "sellerspan"),
  //       where("id", "==", currentUser?.id)
  //     );

  //     // Execute the query
  //     const sellerspanSnapshot = await getDocs(sellerspanDocQuery);

  //     // Check if the document exists and retrieve the 'cards' subcollection
  //     if (!sellerspanSnapshot.empty) {
  //       const sellerspanDoc = sellerspanSnapshot.docs[0]; // assuming unique ids
  //       const cardsCollectionPath = collection(sellerspanDoc.ref, "cards");
  //       const cardsSnapshot = await getDocs(cardsCollectionPath);

  //       const cardsData = [] as any;
  //       cardsSnapshot.forEach(doc => {
  //         if (doc.id === cardIndex)
  //           cardsData.push({ id: doc.id, ...doc.data() });
  //       });

  //       // Assuming you have a function to handle the fetched data
  //       setCard(cardsData[0]);
  //       console.log(cardsData)
  //     } else {
  //       console.log("No sellerspan document found for the user");
  //     }
  //   } catch (error) {
  //     console.error('Error fetching cards data:', error);
  //     // Handle error (e.g., display error message, retry logic)
  //   }
  // };


  useEffect(() => {
    const lastMessage = card?.section6?.audio;
    const storedLastMessage = localStorage.getItem("lastDescription");
    if (lastMessage && lastMessage !== storedLastMessage) {
      if (lastMessage) {
        console.log('fetching voice')
        handleSpeak(lastMessage);
        localStorage.setItem("lastDescription", lastMessage);
      }
    }
  }, [card?.section6]);


  // **************************************************************************
  //  Plays audio when an audio link is available
  // **************************************************************************
  useEffect(() => {
    const isAudioEnabled = localStorage.getItem("audioEnabled");
    const isPlaying = localStorage.getItem("audioPlaying");
    // if (isAudioEnabled) {
    if (!isPlaying) {
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


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormStep6Schema>({
    resolver: zodResolver(formStep6Schema),
    defaultValues: {
      indoorAmenities: formData.indoorAmenities,
      outdoorAmenities: formData.outdoorAmenities,
    },
  });

  useEffect(() => {
    if (errors.indoorAmenities) {
      toast.error(errors.indoorAmenities.message as string);
    }
  }, [errors]);

  const onSubmit = (data: any) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause(); // Pause the audio
      setPlaying(false); // Update state to reflect audio is not playing
      localStorage.removeItem('audioPlaying'); // Remove 'audioPlaying' from localStorage
    }
    localStorage.removeItem('audioPlaying');
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

  return (
    <>
      <div className="col-span-full flex flex-col justify-center @5xl:col-span-4 @6xl:col-span-5">
        <FormSummary
          playing={playing}
          setPlaying={setPlaying}
          audioRef={audioRef}
          cardTitle='Feedback'
          title={card?.section6?.title}
          description="We want to make sure you’re keeping along your journey with confidence!"
        />
        <Image
          src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bot%209.png?alt=media&token=ffe850ed-69d7-4edd-9e6f-5ef6c3dd439c'}
          alt="home front part 2"
          width={'200'}
          height={'200'}
          className="col-span-full grid grid-cols-2 gap-4 @3xl:grid-cols-3 @4xl:gap-6 @6xl:grid-cols-3 mt-4"
        />
      </div>

      <div className="col-span-full flex items-center justify-center @5xl:col-span-8 @6xl:col-span-7">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={onSubmit}
          className="grid flex-grow gap-6 rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <>
            {<div style={{ marginBottom: '2.5%', marginTop: '5%' }} className="w-full">
              <div className="grid gap-5 rounded-lg border border-muted p-4 @2xl:p-6 space-y-2.5">
                <div className="items-center gap-2.5">
                  <div style={{ marginBottom: '2.5%', marginLeft: '-2.5%' }} className="grid gap-5 rounded-lg border-muted p-4 @2xl:p-6 space-y-2.5">
                    {<div className="grid grid-cols-3 items-center gap-2.5">
                      <div
                        // onClick={() => handleFeedback()}
                        className="w-1/3 text-center">
                        <Image
                          src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/external-emoji-emoji-justicon-lineal-color-justicon-2.png?alt=media&token=c2b1a419-11f4-42e3-9944-1e865ef409d1'}
                          width={200}
                          height={200}
                          className="object-contain"
                          priority
                          alt={'Feeling'}
                        />
                      </div>

                      <div
                        // onClick={() => handleFeedback()}
                        className="w-1/3 text-center">
                        <Image
                          src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/external-emoji-emoji-justicon-lineal-color-justicon-3.png?alt=media&token=774e2c60-b552-4f92-bfe2-aa74d3dd19dd'}
                          width={200}
                          height={200}
                          className="object-contain"
                          priority
                          alt={'Feeling'}
                        />
                      </div>

                      <div
                        // onClick={() => handleFeedback()}
                        className="w-1/3 text-center">
                        <Image
                          src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/external-emoji-emoji-justicon-lineal-color-justicon-8.png?alt=media&token=3341035b-1b25-4218-b8c8-d4be7a93b350'}
                          width={200}
                          height={200}
                          className="object-contain"
                          priority
                          alt={'Feeling'}
                        />
                      </div>

                    </div>}

                  </div>

                </div>
              </div>

            </div>}


            {/* <div className="grid gap-4">
              <Text className="font-semibold text-gray-900">
                Tell guests what your place has to offer!
              </Text>
              <Controller
                name="indoorAmenities"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxGroup
                    // TODO: needed to be fixed
                    // @ts-ignore
                    values={value}
                    setValues={onChange}
                    className="col-span-full grid grid-cols-2 gap-4 @3xl:grid-cols-3 @4xl:gap-6 @7xl:grid-cols-4"
                  >
                    {indoorAmenities.map((amenity) => (
                      <AdvancedCheckbox
                        key={amenity.value}
                        value={amenity.value}
                        className=" [&_.rizzui-advanced-checkbox]:px-6 [&_.rizzui-advanced-checkbox]:py-6"
                        inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
                      >
                        <span className="mb-4 block h-8 w-8">
                          {amenity.icon}
                        </span>
                        <p className="font-semibold">{amenity.name}</p>
                      </AdvancedCheckbox>
                    ))}
                  </CheckboxGroup>
                )}
              />
            </div>
            <div className="grid gap-4">
              <Text className="font-semibold text-gray-900">
                Do you have any standout amenities?
              </Text>
              <Controller
                name="outdoorAmenities"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxGroup
                    // TODO: needed to be fixed
                    // @ts-ignore
                    values={value}
                    setValues={onChange}
                    className="col-span-full grid grid-cols-2 gap-4 @3xl:grid-cols-3 @4xl:gap-6 @7xl:grid-cols-4"
                  >
                    {outdoorAmenities.map((amenity) => (
                      <AdvancedCheckbox
                        key={amenity.value}
                        value={amenity.value}
                        className=" [&_.rizzui-advanced-checkbox]:px-6 [&_.rizzui-advanced-checkbox]:py-6"
                        inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
                      >
                        <span className="mb-3 block text-gray-900">
                          {amenity.icon}
                        </span>
                        <p className="font-semibold">{amenity.name}</p>
                      </AdvancedCheckbox>
                    ))}
                  </CheckboxGroup>
                )}
              />
            </div> */}
          </>
        </form>

      </div>
    </>
  );
}
