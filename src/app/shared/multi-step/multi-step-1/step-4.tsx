'use client';

import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useAtom, useSetAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import { PiArrowUpDuotone, PiBagDuotone, PiCalendarBlank, PiCheckBold, PiStopCircleDuotone, PiMicrophoneStageDuotone, PiEyeDuotone } from 'react-icons/pi';
import { AdvancedCheckbox, Button, Input, Badge, Title, Text } from 'rizzui';
import Autocomplete, {
  locationAtom,
  type Location,
} from '@/components/google-map/autocomplete';
import Modal from '@/components/ui/modal';
import { useModal } from '@/app/shared/modal-views/use-modal';

import {
  formDataAtom,
  useStepperAudio,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import {
  locationSchema,
  LocationSchema,
} from '@/utils/validators/multistep-form.schema';
import { currentSession } from '@/config/session';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, setDoc, addDoc, query, collection, updateDoc, getDocs, where, serverTimestamp } from "firebase/firestore";
import { providerPackage } from '@/config/seller/packages';
import Image from 'next/image';
import { toCurrency } from '@/utils/to-currency';
import { currentCard } from '@/config/current-card';
import { assistantImg } from './story/chat/config';

export default function StepTwo() {
  const { openModal } = useModal();
  const setLocation = useSetAtom(locationAtom);
  const card = currentCard() as any;
  const { step, gotoNextStep } = useStepperOne();
  const [formData, setFormData] = useAtom(formDataAtom);
  const currentUser = currentSession() as any;
  const [cardIndex, setCardIndex] = useState('') as any;
  const { audioStatus, setAudioStatus, enableAudio, disableAudio } = useStepperAudio();
  // const [card, setCard] = useState({}) as any;
  const [requestedPackage, setRequestedPackage] = useState({}) as any;
  const packages = providerPackage('data') as any;

  const [requested, setRequested] = useState(false);
  const [showMore, setShowMore] = useState({}) as any;
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef() as any;
  const [playing, setPlaying] = useState(false);
  const [newAudio, setNewAudio] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // This code runs only in the client-side environment
    audioRef.current = new Audio();
  }, []);

  useEffect(() => {
    const lastMessage = card?.section4?.audio;
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
  }, [card?.section4]);


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
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationSchema>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      address: formData.address,
      lat: formData.lat,
      lng: formData.lng,
    },
  });

  useEffect(() => {
    if (errors.address) {
      toast.error(errors.address.message as string);
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

  const toggleExpansion = (item: any) => {
    setIsExpanded(!isExpanded);
    setShowMore(item?.id);
  };

  const request = async (item: any) => {
    setRequested(true);
    setRequestedPackage(item);
    const docRef = doc(collection(firebase.firestore, "clients"));
    const clientData = {
      id: docRef.id,
      user: currentUser,
      userID: currentUser?.id,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      title: currentUser?.title ? currentUser?.title : 'N/A',
      role: currentUser?.role,
      package: item,
      packages: packages,
      packageName: item?.name,
      general: false,
      email: currentUser?.email,
      phone: currentUser?.phone ? currentUser?.phone : '',
      website: currentUser?.website ? currentUser?.website : 'N/A',
      linkedin: currentUser?.linkedin ? currentUser?.linkedin : 'N/A',
      company: currentUser?.company ? currentUser?.company : 'N/A',
      industry: currentUser?.industry ? currentUser?.industry : 'N/A',
      city: currentUser?.city ? currentUser?.city : 'N/A',
      createdAt: serverTimestamp(),
      status: false,
      provider: item?.user,
      providerID: item?.userID,
    };

    try {
      await setDoc(docRef, clientData);
      toast.success("Package request sent!", { position: "bottom-center" });
      console.log('Service request was sent to the provider');
    } catch (e) {
      console.log(e)
      setRequested(false);
    }

  };

  const image = assistantImg[card?.aigent];

  return (
    <div className="col-span-full flex gap-10" style={{ height: 'inherit' }}>
      <div className="ml-10 w-1/2">
        <FormSummary
          playing={playing}
          setPlaying={setPlaying}
          audioRef={audioRef}
          cardTitle='Get Enhanced Support'
          title={card?.section4?.title}
          description={card?.section4?.description}
        />

        <Image
          src={image}
          alt="home front part 2"
          width={'200'}
          height={'200'}
          className="mt-12 "
        />
      </div>

      <form
        id={`rhf-${step.toString()}`}
        onSubmit={onSubmit}
        className="mr-10 w-1/2 grid grid-cols-3 items-center justify-center @5xl:col-span-7"
      >
        {packages?.map((item?: any) => (item?.tag === card?.tag &&
          <div key={item?.id} className="w-full">
            {<div style={{ marginBottom: '2.5%', }} className="grid gap-2 rounded-lg border-muted p-2 @2xl:p-2 space-y-2.5">
              <div className="items-center">
                <div className="pt-3 ">
                  <div
                    style={{ marginBottom: '2.5%' }}
                    className="w-full text-center">
                    <Image
                      src={item?.image}
                      width={200}
                      height={200}
                      className="object-contain w-full h-auto"
                      priority
                      alt={'Feeling'}
                    />
                  </div>
                  <div className="grid gap-2 border rounded-lg border-muted p-2 @2xl:p-6 space-y-2.5">
                    <Title
                      as="h6"
                      className="mb-1 truncate font-semibold transition-colors hover:text-primary"
                    >
                      {item?.name}
                    </Title>

                    {/* <>
                      <Text as="p" className="truncate cursor-pointer" onClick={toggleExpansion}>
                        {item?.description}
                      </Text>
                    </> */}
                    <div className="mt-2 flex items-center font-semibold text-gray-900">
                      {toCurrency(Number(item?.minPrice))} - {toCurrency(Number(item?.maxPrice))}
                    </div>
                    <Button onClick={() => openModal({
                      customSize: '700px',
                      view: <Modal
                        title={item.name}
                        btnLabel={requested && requestedPackage?.id === item?.id ? 'Service Request Sent' : 'Request Service'}
                        btnIcon={<PiBagDuotone className="h-4 w-4 mr-2" />}
                        btnProps={{ disabled: requested && requestedPackage?.id === item?.id }}
                        onSubmit={() => request(item)}
                        content={<div className='h-[400px]'>
                          <div className="mt-2 flex items-center font-semibold text-gray-900">
                            {toCurrency(Number(item?.minPrice))} - {toCurrency(Number(item?.maxPrice))}
                          </div>
                          {/* <Image
                            src={item?.image}
                            width={100}
                            height={300}
                            className="object-contain w-20 h-auto"
                            priority
                            alt={'Feeling'}
                          /> */}
                          <div className='mt-6 h-[350px] overflow-y-auto'>
                            {item.description}
                          </div>
                        </div>} />,
                    })} className="w-full gap-2 @lg:w-auto" >
                      <PiEyeDuotone className='h-5 w-5 ' />
                      View Details
                    </Button>

                    {/* <Button disabled={requested && requestedPackage?.id === item?.id} onClick={() => request(item)} className="w-full gap-2 @lg:w-auto" >
                      <PiBagDuotone className="h-4 w-4" />
                      {requested && requestedPackage?.id === item?.id ? 'Service Request Sent' : 'Request Service'}
                    </Button> */}
                  </div>

                </div>

              </div>
            </div>}

          </div>)
        )}
        {/* <Autocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
          onPlaceSelect={handlePlaceSelect}
          mapClassName="rounded-lg"
          spinnerClassName="grid h-full w-full place-content-center"
          className="relative h-[500px] w-full flex-grow rounded-lg bg-gray-50"
          inputProps={{
            size: 'lg',
            type: 'text',
            rounded: 'pill',
            placeholder: 'Search for a location',
            className: 'absolute z-10 flex-grow block right-7 left-7 top-7',
            inputClassName: 'bg-white dark:bg-gray-100 border-0',
          }}
        /> */}
      </form>
    </div>
  );
}
