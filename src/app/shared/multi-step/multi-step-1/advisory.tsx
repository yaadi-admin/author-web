'use client';

import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useAtom, useSetAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useFormContext, FormProvider } from 'react-hook-form';
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
import Advisor from './advisor';
import { sellerSpan } from '@/config/seller/sellerSpan';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

export default function StepTwo() {
  const { openModal } = useModal();
  const setLocation = useSetAtom(locationAtom);
  const { step, gotoNextStep, totalSteps, resetStepper } = useStepperOne();
  const { updateAdvisory } = sellerSpan() as any;
  const card = currentCard() as any;
  const { push } = useRouter();
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

  const methods = useForm({
    // resolver: zodResolver(locationSchema),
    defaultValues: {
      advisors: [
        { name: '', email: '', phoneNumber: '', canContact: '', companyName: '', },
        { name: '', email: '', phoneNumber: '', canContact: '', companyName: '', },
        { name: '', email: '', phoneNumber: '', canContact: '', companyName: '', },
        { name: '', email: '', phoneNumber: '', canContact: '', companyName: '', },
        { name: '', email: '', phoneNumber: '', canContact: '', companyName: '', },
      ],
    },
  });

  // useEffect(() => {
  //   if (errors.address) {
  //     toast.error(errors.address.message as string);
  //   }
  // }, [errors]);

  const onSubmit = async (data: any) => {
    // e.preventDefault();
    await updateAdvisory(data.advisors)

    localStorage.setItem('cardFormData', JSON.stringify(data));

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
    //     // await updateSellerSpanSubCollection(card.id, { status: true })
    //     push(routes.eCommerce.dashboard);
    //     resetStepper();
    //   }
    // } else {
    //   gotoNextStep();
    // }
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

  const advisors = [
    { label: 'Who is your lawyer?', position: 'Lawyer', name: '', companyName: '', email: '', phoneNumber: '', canContact: '', details: 'Experience in selling businesses? Y/N/Unsure', action: 'Hire an M&A lawyer' },
    { label: 'Who is your accountant/bookkeeper?', position: 'Accountant/Bookkeeper', name: '', companyName: '', email: '', phoneNumber: '', canContact: '', details: 'Do they prepare your personal and business’ tax filings? Y/N', action: 'Hire an Accountant' },
    { label: 'Who is your real estate broker?', position: 'Real Estate Broker', name: '', companyName: '', email: '', phoneNumber: '', canContact: '', details: 'Experience in selling businesses? Y/N/Unsure', action: 'Hire a Real Estate Broker' },
    { label: 'Who is your tax/estate planner?', position: 'Tax/Estate Planner', name: '', companyName: '', email: '', phoneNumber: '', canContact: '', details: 'Have you discussed your goals with them? Y/N', action: 'Hire an Tax/Estate Planner' },
    { label: 'Who is your financial advisor?', position: 'Financial Advisor', name: '', companyName: '', email: '', phoneNumber: '', canContact: '', details: 'Have you discussed your goals with them? Y/N', action: 'Hire a Financial Advisor' },
  ];



  return (
    <div className="col-span-full flex gap-10" style={{ height: 'inherit' }}>
      <FormProvider {...methods}>

        <div className="mx-10 w-[100%]">
          <FormSummary
            playing={playing}
            setPlaying={setPlaying}
            audioRef={audioRef}
            cardTitle={card?.advisory?.title}
            title={card?.advisory?.title}
            description={card?.advisory?.description}
          />

          <form
            id={`rhf-${step.toString()}`}
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mr-10 w-full grid grid-cols-3 items-center justify-center @5xl:col-span-7 "
          >
            <div {...methods.register('advisors')} className='col-span-full'>

              <table className='col-span-full min-w-full bg-white border border-gray-200 mb-[100px] shadow-md '>

                {/* <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Advisor</th>
                    <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Name</th>

                    <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Company name</th>

                    <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Email</th>
                    <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Phone #</th>
                  </tr>
                </thead> */}
                <div className='py-10'>

                  {advisors.map((advisor, index) => (
                    <Advisor key={index} advisor={advisor} index={index} />
                  ))}
                </div>
              </table>
            </div>

          </form>
        </div>


      </FormProvider>
    </div>
  );
}
