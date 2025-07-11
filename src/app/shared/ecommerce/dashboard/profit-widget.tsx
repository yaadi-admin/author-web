'use client';

import { Button, Text } from 'rizzui';
import cn from '@/utils/class-names';
import WidgetCard from '@/components/cards/widget-card';
import ButtonGroupAction from '@/components/charts/button-group-action';
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { PiInfoFill, PiSkipForwardBold } from 'react-icons/pi';
import WelcomeBanner from '@/components/banners/welcome';
import HandWaveIcon from '@/components/icons/hand-wave';
import Image from 'next/image';
import { currentSession } from '@/config/session';
import { useAtomValue, useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import firebase from '@/config/firebase.config';
import axios from 'axios';
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import ProgressCircle from '@/components/ui/progress-circle';
import { sellerSpan } from '@/config/seller/sellerSpan';

export default function ProfitWidget() {
  const currentUser = currentSession() as any;
  const { data, getProgress, progress: overAllScore, addSellerSpanSubCollection } = sellerSpan() as any;
  const currentDate = new Date();
  const [recentUpdates, setRecentUpdates] = useState('') as any;
  const [progress, setProgress] = useState([]) as any;
  const [defaultAssistant, setDefaultAssistant] = useState({ id: 'asst_jPtPyLs7ILtupBpPuAaJCv3p', name: 'Finn, the Financial-Bot', profilePicture: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bot%209.png?alt=media&token=ffe850ed-69d7-4edd-9e6f-5ef6c3dd439c' }) as any;
  const { push } = useRouter();
  const audioRef = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
  const [newAudio, setNewAudio] = useState('');

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      // Check if there's a new audio URL and if it's not empty
      if (newAudio !== '') {
        audio.src = newAudio; // Update audio source

        // If 'playing' is true, play the audio; otherwise, pause it
        if (playing) {
          audio.play();
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
        setNewAudio('');
      });

      // Clean up event listener
      return () => {
        audio.removeEventListener('ended', () => {
          setPlaying(false);
          setNewAudio('');
        });
      };
    }

  }, [newAudio, playing]);



  useEffect(() => {
    getProgress()
  }, [data])

  useEffect(() => {
    const dataFields = [] as any;
    const p = data;
    for (let i = 0; i < p?.length; i++) {
      if (p[i]?.status === false) {
        dataFields?.push(p[i]);
      }
    }
    setProgress(dataFields);
  }, [recentUpdates, data]);

  const handleNextStep = async () => {
    const newCard = await addSellerSpanSubCollection(progress[0]);
    localStorage.setItem('cardData', JSON.stringify(progress[0]));
    push(routes.multiStep);
  }

  const handleIntake = async () => {
    push(routes.eCommerce.createProduct);
  };


  useEffect(() => {
    const lastVisitedTime = localStorage.getItem('lastVisitedTime');
    console.log('lastVisitedTime', lastVisitedTime)
    if (lastVisitedTime) {
      const twoHoursInMillis = 2 * 60 * 60 * 1000; // Convert two hours to milliseconds
      const currentTime = Date.now();
      const timeDifference = currentTime - parseInt(lastVisitedTime);

      // Check if the difference is less than two hours
      if (timeDifference < twoHoursInMillis) {
        if (currentUser?.audioURL) {
          setNewAudio(currentUser?.audioURL);
        }
        setPlaying(playing);
      } else {
        setPlaying(!playing);
      }
    }

    // Store the current time when the component mounts
    localStorage.setItem('lastVisitedTime', Date.now().toString());

    // Clean up
    return () => {
      // Your cleanup code here
    };
  }, []);


  // const nutritions = progressData.map((progress: any) => progress.section7.nutrition.map((nutrition: any) => nutrition.value));
  // const flatList = nutritions.reduce((acc: string | any[], curr: any) => acc.concat(curr), []);
  // const overAllScore = flatList.reduce((acc: number, curr: string) => acc + parseInt(curr), 0);

  return (
    <div className='flex 4xs:flex-col md:flex-row w-full gap-4 '>

      <div className='4xs:w-full md:w-[80%] '>
        <WelcomeBanner
          title={
            <>
              Good {currentDate.getHours() > 12 && currentDate.getHours() < 12 ? 'Morning' : (currentDate.getHours() >= 12 && currentDate.getHours() < 2 ? 'Day' : 'Afternoon')}, {currentUser?.firstName} {' '}
              <HandWaveIcon className="inline-flex h-8 w-8" />
            </>
          }
          description={
            `${progress?.length > 0 && currentUser?.isIntake ? `Keep up the good progress! Click the "Next Step" button below to proceed on your selling journey, or have a look at your dashboard below` : 'Please complete your intake form to help us gather key information and get you started on your selling journey'}.`
          }
          media={
            <div className="absolute -bottom-6 end-0 hidden w-[150px] @2xl:block lg:w-[150px] 2xl:-bottom-6 2xl:w-[150px]">
              <div className="relative">
                <Image
                  src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fdylan.png?alt=media&token=7f44c4db-8718-4210-85eb-f79f78a6383a'}
                  width={150}
                  height={300}
                  alt="Welcome shop image form freepik"
                  className="dark:brightness-95 dark:drop-shadow-md"
                />
              </div>
            </div>
          }
          contentClassName="@2xl:max-w-[calc(100%-340px)]"
          className="border border-muted bg-gray-0 pb-8 @4xl:col-span-12 @7xl:col-span-12 lg:pb-9 dark:bg-gray-100/30"
        >

          {currentUser?.isIntake &&
            <Button size="lg"
              disabled={progress?.[0]?.order === 6 ? true : false}
              className={`border-muted ${progress?.[0]?.order === 6 ? '' : 'bg-gradient-to-r from-primary-color to-primary'}`} onClick={handleNextStep}>
              <PiSkipForwardBold className="me-1 h-4 w-4" /> {'Next Step'}
            </Button>
          }

          {!currentUser?.isIntake &&

            <Button size="lg" className="border-muted bg-gradient-to-r from-primary-color to-primary" onClick={handleIntake}>
              <PiSkipForwardBold className="me-1 h-4 w-4" /> Complete Intake Form
            </Button>}

        </WelcomeBanner>
      </div>

      <div className='4xs:w-full md:w-[20%]'>
        <ProgressCircle
          title="Your Progress"
          body={`${overAllScore}%`}
          progress={overAllScore}
          progressClassName='4xs:w-20 md:w-full'
        />
      </div>
    </div >

  );
}
