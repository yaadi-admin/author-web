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
import Document from './document';

export default function Checklist() {
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

  const documentsArray = [
    {
      name: "Articles of Incorporation",
      periodCovered: "Most recent",
      readilyAccessible: "Yes/Need to gather/Needs to be prepared",
      needsAdjustmentOrEdits: "Yes/No/Unsure",
      professionalSupport: "Yes/No",
      helperMessage: "Business incorporation documents, such as the certificate of incorporation, partnership agreements, titles, and other necessary legal papers, are crucial for establishing and operating a business entity.",
      buttonLabel: 'Lawyers',
      professional: 'Lawyer',
    },
    {
      name: "Income Statement",
      periodCovered: "Last 3 years",
      readilyAccessible: "Yes/Need to gather/Needs to be prepared",
      needsAdjustmentOrEdits: "Yes/No/Unsure",
      professionalSupport: "Yes/No",
      helperMessage: "Financial statements such as the Income Statement, Balance Sheet, and Cash Flow Statement summarise a company's financial performance and position.",
      buttonLabel: 'Accountants',
      professional: 'Accountant',
    },
    {
      name: "Balance Sheet",
      periodCovered: "Most recent period (last year or sooner)",
      readilyAccessible: "Yes/Need to gather/Needs to be prepared",
      needsAdjustmentOrEdits: "Yes/No/Unsure",
      professionalSupport: "Yes/No",
      helperMessage: "Financial statements such as the Income Statement, Balance Sheet, and Cash Flow Statement summarise a company's financial performance and position.",
      buttonLabel: 'Accountants',
      professional: 'Accountant',
    },
    {
      name: "Cash Flow Statement",
      periodCovered: "Last 3 years",
      readilyAccessible: "Yes/Need to gather/Needs to be prepared",
      needsAdjustmentOrEdits: "Yes/No/Unsure",
      professionalSupport: "Yes/No",
      helperMessage: "Financial statements such as the Income Statement, Balance Sheet, and Cash Flow Statement summarise a company's financial performance and position.",
      buttonLabel: 'Accountants',
      professional: 'Accountant',
    },
    {
      name: "Tax Returns",
      periodCovered: "Last 3 years",
      readilyAccessible: "Yes/Need to gather/Needs to be prepared",
      needsAdjustmentOrEdits: "Yes/No/Unsure",
      professionalSupport: "Yes/No",
      helperMessage: "Filings with the tax authorities for business income taxes, withholding taxes, and any other documentation received or sent to tax authorities.",
      buttonLabel: 'Accountants',
      professional: 'Accountant',
    },
    {
      name: "Financial Projections",
      periodCovered: "3 Years Forward",
      readilyAccessible: "Yes/Need to gather/Needs to be prepared",
      needsAdjustmentOrEdits: "Yes/No/Unsure",
      professionalSupport: "Yes/No",
      helperMessage: "Supporting documents include all relevant records pertaining to transactions, receipts, invoices, and other supporting documents for both income and expenses are included.",
      buttonLabel: 'Accountants',
      professional: 'Accountant',
    },
    {
      name: "Lease/Rental Agreement",
      periodCovered: "Most Recent",
      readilyAccessible: "Yes/Need to gather/Needs to be prepared",
      needsAdjustmentOrEdits: "Yes/No/Unsure",
      professionalSupport: "Yes/No",
      helperMessage: "Includes lease agreements, customer and supplier contracts, non-disclosure agreements, intellectual property (copyrights, patents, trademarks), loan/credit agreements, insurance policies (e.g., property, vehicular, product liability), and business licences and permits.",
      buttonLabel: 'Real Estate Broker',
      professional: 'Real Estate Broker',
    },
    {
      name: "Business Licenses / Certificates",
      periodCovered: "Most Recent",
      readilyAccessible: "Yes/Need to gather/N/A",
      needsAdjustmentOrEdits: "N/A",
      professionalSupport: "N/A",
      helperMessage: "Includes lease agreements, customer and supplier contracts, non-disclosure agreements, intellectual property (copyrights, patents, trademarks), loan/credit agreements, insurance policies (e.g., property, vehicular, product liability), and business licences and permits."
    },
    {
      name: "Product/Service Catalogue",
      periodCovered: "Most Recent",
      readilyAccessible: "Yes/Need to gather/N/A",
      needsAdjustmentOrEdits: "N/A",
      professionalSupport: "N/A",
      helperMessage: "Supporting documents include all relevant records pertaining to transactions, receipts, invoices, and other supporting documents for both income and expenses are included."
    },
    {
      name: "Customer List and Key Contracts",
      periodCovered: "Most Recent",
      readilyAccessible: "Yes/Need to gather/Needs to be prepared",
      needsAdjustmentOrEdits: "N/A",
      professionalSupport: "N/A",
      helperMessage: "Includes lease agreements, customer and supplier contracts, non-disclosure agreements, intellectual property (copyrights, patents, trademarks), loan/credit agreements, insurance policies (e.g., property, vehicular, product liability), and business licences and permits."
    },
    {
      name: "Equipment List",
      periodCovered: "Most Recent",
      readilyAccessible: "Yes/Need to gather/Needs to be prepared",
      needsAdjustmentOrEdits: "N/A",
      professionalSupport: "N/A",
      helperMessage: "Supporting documents include all relevant records pertaining to transactions, receipts, invoices, and other supporting documents for both income and expenses are included."
    },
    {
      name: "Inventory List",
      periodCovered: "Most Recent",
      readilyAccessible: "Yes/Need to gather/Needs to be prepared/N/A",
      needsAdjustmentOrEdits: "N/A",
      professionalSupport: "N/A",
      helperMessage: "Supporting documents include all relevant records pertaining to transactions, receipts, invoices, and other supporting documents for both income and expenses are included."
    },
    {
      name: "Intellectual Property Registration/Certificates",
      periodCovered: "Most Recent",
      readilyAccessible: "Yes/Need to gather/Needs to be prepared/N/A",
      needsAdjustmentOrEdits: "N/A",
      professionalSupport: "N/A",
      helperMessage: "Includes lease agreements, customer and supplier contracts, non-disclosure agreements, intellectual property (copyrights, patents, trademarks), loan/credit agreements, insurance policies (e.g., property, vehicular, product liability), and business licences and permits.",
      buttonLabel: 'Lawyers',
      professional: 'Lawyer',
    },
    {
      name: "Employee Contracts",
      periodCovered: "Most Recent",
      readilyAccessible: "Yes/Need to gather/Needs to be prepared/N/A",
      needsAdjustmentOrEdits: "N/A",
      professionalSupport: "N/A",
      helperMessage: "Employee manuals and handbooks serve as comprehensive guides for employees, covering a range of crucial topics such as expected conduct, job instructions, benefits, and promotion criteria.",
    }
  ];



  const defaultDocumentArray = documentsArray.map((doc) => ({ ...doc, readilyAccessible: '', needsAdjustmentOrEdits: '', professionalSupport: '' })); //
  const methods = useForm({
    // resolver: zodResolver(locationSchema),
    defaultValues: {
      checklist: [
        ...defaultDocumentArray,
      ],
    },
  });

  // useEffect(() => {
  //   if (errors.address) {
  //     toast.error(errors.address.message as string);
  //   }
  // }, [errors]);

  const onSubmit = (data: any) => {
    const checklistData = data.checklist.map((c: any) => {
      const { buttonLabel, ...rest } = c;
      return { ...rest };
    })
    localStorage.setItem('cardFormData', JSON.stringify({ checklist: checklistData }));
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
      <FormProvider {...methods}>

        <div className="mx-10 w-[100%]">
          <FormSummary
            playing={playing}
            setPlaying={setPlaying}
            audioRef={audioRef}
            cardTitle={card?.checklist?.title}
            title={card?.checklist?.title}
            description={``}
          />
          <Text className='text-lg'>
            <b>Document Classification</b>: please indicate the status of your documents using the dropdowns below. <b>If you indicate that you “need to gather” or “needs to be prepared”, we recommend requesting them from your advisor or getting professional support from our marketplace as soon as possible as document prep can take weeks and delay your sale.</b>
          </Text>
          <div className='flex flex-col gap-2 my-4'>

            <Text className='text-md'>
              <b className='text-blue-500 tracking-wider'>Readily accessible?</b>:  select “Yes” if are able to locate and upload a digital version of the document at any time
            </Text>
            <Text className='text-md'>
              <b className='text-blue-500 tracking-wider'>Needs adjustment or edits?</b>: select “Yes” if the document and its contents need to be adjusted or edited before sharing with a potential buyer. This may be because it was not prepared by a professional, it contains personal/non-business items (e.g., personal expenses, information), or needs comments to help an external buyer understand the document.
            </Text>
            <Text className='text-md'>
              <b className='text-blue-500 tracking-wider'>Do you want professional support to prepare it?</b>: if you have not had it professionally prepared, believe it needs significant adjustments, or you would want a second opinion, select “Yes”.
            </Text>
          </div>
          <form
            id={`rhf-${step.toString()}`}
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mr-10 w-full grid grid-cols-3 items-center justify-center @5xl:col-span-7 "
          >
            <div {...methods.register('checklist')} className='col-span-full'>

              <table className='col-span-full min-w-full bg-white border border-gray-200 mb-[100px] shadow-md '>

                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Document(s)</th>
                    <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Period covered</th>

                    <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Readily Accessible?</th>

                    <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Need adjustment or edits?</th>
                    <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Do you want professional support to prepare it?</th>
                    <th className="px-2 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">Hire a Professional</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    documentsArray.map((doc, index) =>
                      <Document key={index} doc={doc} index={index} />
                    )
                  }
                </tbody>
              </table>
            </div>

          </form>
        </div>


      </FormProvider>
    </div>
  );
}
