'use client';

import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AdvancedRadio, RadioGroup, FieldError, Radio, Text, Input, Button } from 'rizzui';
import {
  formDataAtom,
  useStepperAudio,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import UserFamilyColorIcon from '@/components/icons/user-family-color';
import QuantityInput from '@/app/shared/multi-step/quantity-input';
import UsersColorIcon from '@/components/icons/users-color';
import UserColorIcon from '@/components/icons/user-color';
import {
  FormStep5Schema,
  formStep5Schema,
} from '@/utils/validators/multistep-form.schema';
import { currentSession } from '@/config/session';
import MessageDetails from '@/app/shared/support/inbox/message-details';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, setDoc, addDoc, query, collection, updateDoc, getDocs, where, serverTimestamp } from "firebase/firestore";
import FormText from './form-text';
import FormTextBox from './form-text-box';
import { currentCard } from '@/config/current-card';

const places: {
  value: string;
  name: string;
  icon: React.ReactNode;
}[] = [
  {
    value: '1',
    name: 'Me',
    icon: <UserColorIcon className="h-full w-full" />,
  },
  {
    value: '2',
    name: 'My Family',
    icon: <UserFamilyColorIcon className="h-full w-full" />,
  },
  {
    value: '3',
    name: 'Other Guests',
    icon: <UsersColorIcon className="h-full w-full" />,
  },
];

export default function StepFive() {
  const { step, gotoNextStep } = useStepperOne();
  const card = currentCard() as any;
  const [formData, setFormData] = useAtom(formDataAtom);
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
    handleSubmit,
    formState: { errors },
  } = useForm<FormStep5Schema>({
    resolver: zodResolver(formStep5Schema),
    defaultValues: {
      guests: formData.guests,
      bedrooms: formData.bedrooms,
      beds: formData.beds,
      guestType: formData.guestType,
      bedroomLock: formData.bedroomLock,
    },
  });


  useEffect(() => {
    const lastMessage = card?.section5?.audio;
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
  }, [card?.section5]);


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
    <>
      <div className="col-span-full flex flex-col justify-center @5xl:col-span-7">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={onSubmit}
          className="grid flex-grow gap-2 -mt-12 rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <>

            <FormTextBox
              playing={playing}
              setPlaying={setPlaying}
              audioRef={audioRef}
              title='Valuation Range Estimates'
              description='Comparing valuations based upon different methodologies using your data, industry, and market trends:'
            />

            <Text>Multiple on EBITDA (from our Market Data)</Text>

            <div className='grid grid-cols-4 gap-4'>

              <div className='grid'>
                <Text>Multiple Ranges</Text>
              </div>

              <div className='grid'>
                {card?.section5?.multiple && (card?.section5?.multiple).map((item: any, index: number) => (<Input
                  key={index}
                  placeholder={item?.label}
                  value={item?.label}
                  className='mt-4'
                // onChange={(e) => setInputField0(e.target.value)}
                // error={errors.firstName?.message as string}
                />))}
              </div>

              <div className='grid'>
                {card?.section5?.multiple && (card?.section5?.multiple).map((item: any, index: number) => (<Text key={index}
                  className='mt-6 text-center'>{item?.range}</Text>))}
              </div>

              <div className='grid'>
                {card?.section5?.multiple && (card?.section5?.multiple).map((item: any, index: number) => (<Input
                  key={index}
                  placeholder={item?.value}
                  value={item?.value}
                  className='mt-4'
                // onChange={(e) => setInputField0(e.target.value)}
                // error={errors.firstName?.message as string}
                />))}
              </div>

            </div>

            <div className='col-span-full justify-end'>
              <Input
                label='Asset-Based Valuation (input from the tool)'
                placeholder='$'
                className='mt-4'
              // onChange={(e) => setInputField0(e.target.value)}
              // error={errors.firstName?.message as string}
              />
            </div>

            <div className='col-span-full justify-end'>
              <Input
                label='Third Party Valuation (if you hired someone)'
                placeholder='$'
                className='mt-4'
              // onChange={(e) => setInputField0(e.target.value)}
              // error={errors.firstName?.message as string}
              />
            </div>

            <Button className="w-full gap-2 @lg:w-auto" >
              Submit your asking price
            </Button>


            {/* <Controller
              name="guests"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="flex items-center justify-between rounded-md border border-muted px-4 py-2.5">
                  <span>Guests</span>
                  <QuantityInput defaultValue={value} onChange={onChange} />
                </div>
              )}
            />
            <Controller
              name="bedrooms"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="flex items-center justify-between rounded-md border border-muted px-4 py-2.5">
                  <span>Bedrooms</span>
                  <QuantityInput defaultValue={value} onChange={onChange} />
                </div>
              )}
            />
            <Controller
              name="beds"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="flex items-center justify-between rounded-md border border-muted px-4 py-2.5">
                  <span>Beds</span>
                  <QuantityInput defaultValue={value} onChange={onChange} />
                </div>
              )}
            />
            <div className="grid gap-4">
              <Text className="font-semibold text-gray-900">
                Does every bedroom should have a lock?
              </Text>
              <Controller
                name="bedroomLock"
                control={control}
                render={({ field: { value, onChange } }) => {
                  console.log('value', value);
                  return (
                    <RadioGroup
                      value={value}
                      setValue={onChange}
                      className="flex gap-4"
                    >
                      <Radio label="Yes" value="yes" name="yes" />
                      <Radio label="No" value="no" name="no" />
                    </RadioGroup>
                  );
                }}
              />
              {errors.bedroomLock && (
                <FieldError error={errors.bedroomLock?.message} />
              )}
            </div>
            <div className="grid gap-4">
              <Text className="font-semibold text-gray-900">
                Who else might be there?
              </Text>
              <Controller
                name="guestType"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioGroup
                    value={value}
                    setValue={onChange}
                    className="col-span-full grid gap-4 @3xl:grid-cols-3 @4xl:gap-6"
                  >
                    {places.map((place) => (
                      <AdvancedRadio
                        key={place.value}
                        value={place.value}
                        className=" [&_.rizzui-advanced-radio]:px-6 [&_.rizzui-advanced-radio]:py-6"
                        inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-radio]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
                      >
                        <span className="mb-3 block h-8 w-8">{place.icon}</span>
                        <p className="font-semibold">{place.name}</p>
                      </AdvancedRadio>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.guestType && (
                <FieldError error={errors.guestType?.message} />
              )}
            </div> */}
          </>
        </form>
      </div>

      <div className="col-span-full flex items-center justify-center @5xl:col-span-5">
        <div className="w-full h-100 rounded-lg items-center justify-start">
          <MessageDetails />
        </div>
        
      </div>
    </>
  );
}
