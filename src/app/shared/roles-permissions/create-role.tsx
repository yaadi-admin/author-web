'use client';

import { useEffect, useState } from 'react';
import { PiChecksBold, PiFilesBold, PiXBold } from 'react-icons/pi';
import { RgbaColorPicker } from 'react-colorful';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, Tooltip, ActionIcon, Title, Switch, Textarea } from 'rizzui';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import {
  CreateRoleInput,
  createRoleSchema,
} from '@/utils/validators/create-role.schema';
import { CreateCardInput } from '@/utils/validators/create-card.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { doc, onSnapshot, setDoc, addDoc, query, collection, updateDoc, getDocs, where, serverTimestamp } from "firebase/firestore";
import firebase from '@/config/firebase.config';
import { currentSession } from '@/config/session';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { Value } from 'react-quill';
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

// main category form component for create and update category
export default function CreateRole() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();
  const currentUser = currentSession() as any;
  const [showInput1, setShowInput1] = useState(false);
  const [showInput2, setShowInput2] = useState(false);
  const [showInput3, setShowInput3] = useState(false);
  const [showInput4, setShowInput4] = useState(false);
  const [showInput5, setShowInput5] = useState(false);

  //Booleans
  const [isVideos, setIsVideos] = useState(false);
  const [isAttachment, setIsAttachment] = useState(false);
  const [isAssistant, setIsAssistant] = useState(false);
  const [required, setRequired] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [isPackages, setIsPackages] = useState(false);

  const [spanCounter, setSpanCounter] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentUser?.id]);

  const fetchData = async () => {
    try {
      const q = query(collection(firebase.firestore, "sellerspan_collection"));
      const querySnapshot = await getDocs(q);
      const dataFields = querySnapshot.docs.map(doc => doc.data());
      setSpanCounter(dataFields?.length);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    }
  };

  const pushObjectIfValueExists = (fieldName: string, data: any, array: any) => {
    // Check if the field has a value
    if (data[fieldName]) {
      // Construct the object
      const newObj = {
        label: data[fieldName],
        placeholder: data[fieldName],
        type: data[fieldName + 'Type'] ? data[fieldName + 'Type'] : "text",
        value: ""
      };
      // Push the object to the array
      array.push(newObj);
    }
  };

  const pushVideosObjectIfValueExists = (fieldName: string, count: string, data: any, array: any) => {
    // Check if the field has a value
    if (data[fieldName]) {
      // Construct the object
      const newObj = {
        videoTitle: data[fieldName],
        videoURL: data['videoURL' + count],
        videoDetails: data[`videoDescription` + count],
        videoPoster: ""
      };
      // Push the object to the array
      array.push(newObj);
    }
  };

  const pushFileObjectIfValueExists = (fieldName: string, data: any, array: any) => {
    // Check if the field has a value
    if (data[fieldName]) {
      // Construct the object
      const newObj = {
        fileURL: data['fileURL'],
        fileName: data[fieldName],
      };
      // Push the object to the array
      array.push(newObj);
    }
  };

  const pushRefObjectIfValueExists = (fieldName: string, data: any, array: any) => {
    // Check if the field has a value
    if (data[fieldName]) {
      // Construct the object
      const newObj = data[fieldName];
      // Push the object to the array
      array.push(newObj);
    }
  };

  const removeSpaceAndCapitalize = (text: any) => {
    const words = text.split(' '); // Split the text into an array of words
    let result = words[0].toLowerCase(); // Convert the first word to lowercase
    // Capitalize the first letter of each subsequent word
    for (let i = 1; i < words.length; i++) {
      result += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return result;
  }

  const onSubmit = async (data: any) => {

    const inputsOne = [] as any;
    const inputsTwo = [] as any;
    const inputsThree = [] as any;
    const inputsFour = [] as any;
    const inputsFive = [] as any;
    const referenced = [] as any;
    const responsible = [] as any;
    const videos = [] as any;
    const files = [] as any;


    const value = { value: data?.perceivedValue, label: "Perceived Value" };
    const risk = { value: data?.riskValue, label: "Decrease Risk" };
    const opportunity = { value: data?.opportunityValue, label: "Opportunity" };
    const trust = { value: data?.trustValue, label: "Building Trust" };

    // Input field sections
    pushObjectIfValueExists("inputFields1", data, inputsOne);
    pushObjectIfValueExists("inputFields2", data, inputsOne);
    pushObjectIfValueExists("inputFields3", data, inputsOne);
    pushObjectIfValueExists("inputFields4", data, inputsOne);

    pushObjectIfValueExists("inputFields5", data, inputsTwo);
    pushObjectIfValueExists("inputFields6", data, inputsTwo);
    pushObjectIfValueExists("inputFields7", data, inputsTwo);
    pushObjectIfValueExists("inputFields8", data, inputsTwo);

    pushObjectIfValueExists("inputFields9", data, inputsThree);
    pushObjectIfValueExists("inputFields10", data, inputsThree);
    pushObjectIfValueExists("inputFields11", data, inputsThree);
    pushObjectIfValueExists("inputFields12", data, inputsThree);

    pushObjectIfValueExists("inputFields13", data, inputsFour);
    pushObjectIfValueExists("inputFields14", data, inputsFour);
    pushObjectIfValueExists("inputFields15", data, inputsFour);
    pushObjectIfValueExists("inputFields16", data, inputsFour);

    pushObjectIfValueExists("inputFields17", data, inputsFive);
    pushObjectIfValueExists("inputFields18", data, inputsFive);
    pushObjectIfValueExists("inputFields19", data, inputsFour);
    pushObjectIfValueExists("inputFields20", data, inputsFive);

    // Referenced Sections
    pushRefObjectIfValueExists("referenced1", data, referenced);
    pushRefObjectIfValueExists("referenced2", data, referenced);
    pushRefObjectIfValueExists("referenced3", data, referenced);

    // Responsible Section
    pushRefObjectIfValueExists("responsible1", data, responsible);
    pushRefObjectIfValueExists("responsible2", data, responsible);
    pushRefObjectIfValueExists("responsible3", data, responsible);

    // Videos Section
    pushVideosObjectIfValueExists("videoTitle1", '1', data, videos);
    pushVideosObjectIfValueExists("videoTitle2", "2", data, videos);
    pushVideosObjectIfValueExists("videoTitle3", "3", data, videos);

    // Files Section
    pushFileObjectIfValueExists("fileTitle", data, files);

    // Fields
    const title = data?.title;
    const details = data?.details;
    const description = data?.description;
    const tag = removeSpaceAndCapitalize(data?.title);

    const section1 = {
      title: data?.title,
      description: data?.description,
      audio: data?.audioOneURL,
      referenced: referenced,
      responsible: responsible,
    };


    const section2 = {
      audio: data?.audioTwoURL,
      description: data?.sectionTwoDescription,
      title: data?.titleTwo,
      videoURL: data?.videoURL,
    };

    const section3 = {
      title: data?.sectionThreeTitle,
      url: data?.documentURL,
      audio: data?.audioThreeURL,
    };

    const section4 = {
      audio: data?.audioFourURL,
      title: data?.sectionFourTitle,
      description: data?.sectionFourDescription,
    };

    const section5 = {
      audio: data?.audioFiveURL,
      title: data?.sectionFiveTitle,
      description: data?.sectionFiveDescription,
      inputsOne: inputsOne,
      inputsTwo: inputsTwo,
      inputsThree: inputsThree,
      inputsFour: inputsFour,
      inputsFive: inputsFive,
    }

    const section6 = {
      audio: data?.audioSixURL,
      congratulations: data?.congratulations,
      nutrition: [value, risk, opportunity, trust],
    }



    handleCard(title, tag, details, required, feedback, isPackages, isAttachment, isAssistant,
      section1, section2, section3, section4, section5, section6);

  };

  const handleCopyToClipboard = (rgba: string) => {
    copyToClipboard(rgba);

    setIsCopied(() => true);
    setTimeout(() => {
      setIsCopied(() => false);
    }, 3000); // 3 seconds
  };

  const handleCard = async (title: any, tag: any, details: any,
    required: any, feedback: any, packages: any, attachments: any, assistant: any,
    section1: any, section2: any, section3: any, section4: any, section5: any, section6: any,
  ) => {

    const docRef = doc(collection(firebase.firestore, "sellerspan_collection"));
    const card = {
      id: docRef.id,
      title: title,
      tag: tag,
      details: details,
      order: spanCounter + 1,
      createdAt: serverTimestamp(),
      section1: section1,
      section2: section2,
      section3: section3,
      section4: section4,
      section5: section5,
      section6: section6,
      required: required,
      status: false,
      attachment: attachments,
      isAssistant: assistant,
      feedback: feedback,
      isPackages: packages,
    };


    try {
      await setDoc(docRef, card);
      closeModal();
      toast.success("SellerSpan Card Added", { position: "bottom-center" });

    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add SellerSpan® Card
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <div style={{ height: "100%" }} className="overflow-auto h-200">

              {/* ************************************************************************************************************************** */}
              {/* Section 1 */}
              {/* ************************************************************************************************************************** */}

              <Title as="h6" className="font-semibold">
                Section One
              </Title>
              <Title as="h6" style={{ fontWeight: '400' }} className='pt-2 text-gray-700'>- First Screen, showcase card title, description who is responsible for this card, where is this card used </Title>

              <div className="flex mt-4 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Title"
                    placeholder="Title"
                    {...register('title')}
                  />
                </div>
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Details"
                    placeholder="Details"
                    {...register('details')}
                  />
                </div>

              </div>

              <div className="mt-12 pt-4 pb-12 items-center gap-4">
                <div className="w-full h-4 rounded-full">
                  <Textarea
                    label="Description"
                    placeholder="Description"
                    {...register('description')}
                  />
                </div>

              </div>

              <div className="mt-12 pt-12 items-center gap-4">
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Audio"
                    placeholder="URL"
                    {...register('audioOneURL')}
                  />
                </div>

              </div>


              {/* ************************************************************************************************************************** */}
              {/* Referenced */}
              {/* ************************************************************************************************************************** */}

              <Title as="h6" style={{ fontWeight: 'bold' }} className='pt-12 mt-12 text-gray-700'>Where&apos;s this Referenced?</Title>

              {/* Referenced Section */}
              {<div className="flex mt-2 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Referenced"
                    placeholder="Referenced"
                    {...register('referenced1')}
                  />
                </div>

                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Referenced"
                    placeholder="Referenced"
                    {...register('referenced2')}
                  />
                </div>
              </div>}


              {<div className="flex mt-12 pt-4 items-center gap-4">
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Referenced"
                    placeholder="Referenced"
                    {...register('referenced3')}
                  />
                </div>

              </div>}


              {/* ************************************************************************************************************************** */}
              {/* Responsible */}
              {/* ************************************************************************************************************************** */}

              <Title as="h6" style={{ fontWeight: 'bold' }} className='pt-12 mt-12 text-gray-700'>Who&apos;s Responsible?</Title>

              {/* Responsible Section */}
              {<div className="flex mt-2 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Responsible"
                    placeholder="Responsible"
                    {...register('responsible1')}
                  />
                </div>

                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Responsible"
                    placeholder="Responsible"
                    {...register('responsible2')}
                  />
                </div>
              </div>}


              {<div className="flex mt-12 pt-4 items-center gap-4">
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Responsible"
                    placeholder="Responsible"
                    {...register('responsible3')}
                  />
                </div>

              </div>}


              {/* ************************************************************************************************************************** */}
              {/* Section 2 */}
              {/* ************************************************************************************************************************** */}

              <Title as="h6" className="mt-12 pt-6 font-semibold">
                Section Two
              </Title>
              <Title as="h6" style={{ fontWeight: '400' }} className='pt-2 text-gray-700'>- Second Screen, showcase section title, description. Add video URL for this section and audio URL </Title>

              <div className="flex mt-4 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Title"
                    placeholder="Title"
                    {...register('titleTwo')}
                  />
                </div>
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Video URL"
                    placeholder="Video URL"
                    {...register('videoURL')}
                  />
                </div>

              </div>
              <div className="mt-12 pt-4 pb-12 items-center gap-4">
                <div className="w-full h-4 rounded-full">
                  <Textarea
                    label="Description"
                    placeholder="Description"
                    {...register('sectionTwoDescription')}
                  />
                </div>

              </div>

              <div className="mt-12 pt-12 items-center gap-4">
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Audio"
                    placeholder="URL"
                    {...register('audioTwoURL')}
                  />
                </div>

              </div>


              {/* ************************************************************************************************************************** */}
              {/* Section 3 */}
              {/* ************************************************************************************************************************** */}

              <Title as="h6" className="mt-12 pt-12 font-semibold">
                Section Three
              </Title>
              <Title as="h6" style={{ fontWeight: '400' }} className='pt-2 text-gray-700'>- Third Screen, showcase section title, description. Add Document URL for this section and audio URL </Title>

              <div className="flex mt-4 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Title"
                    placeholder="Title"
                    {...register('sectionThreeTitle')}
                  />
                </div>
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Document URL"
                    placeholder="Document URL"
                    {...register('documentURL')}
                  />
                </div>

              </div>
              <div className="mt-12 pt-4 pb-12 items-center gap-4">
                <div className="w-full h-4 rounded-full">
                  <Textarea
                    label="Description"
                    placeholder="Description"
                    {...register('sectionThreeDescription')}
                  />
                </div>

              </div>

              <div className="mt-12 pt-12 items-center gap-4">
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Audio"
                    placeholder="URL"
                    {...register('audioThreeURL')}
                  />
                </div>

              </div>

              {/* ************************************************************************************************************************** */}
              {/* Section 4 */}
              {/* ************************************************************************************************************************** */}

              <Title as="h6" className="mt-12 pt-12 font-semibold">
                Section Four
              </Title>
              <Title as="h6" style={{ fontWeight: '400' }} className='pt-2 text-gray-700'>- Fourth Screen, showcase section title, description and audio URL </Title>

              <div className="flex mt-4 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Title"
                    placeholder="Title"
                    {...register('sectionFourTitle')}
                  />
                </div>
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Audio"
                    placeholder="URL"
                    {...register('audioFourURL')}
                  />
                </div>

              </div>
              <div className="mt-12 pt-4 pb-12 items-center gap-4">
                <div className="w-full h-4 rounded-full">
                  <Textarea
                    label="Description"
                    placeholder="Description"
                    {...register('sectionFourDescription')}
                  />
                </div>

              </div>

              {/* ************************************************************************************************************************** */}
              {/* Section 5 */}
              {/* ************************************************************************************************************************** */}

              <Title as="h6" className="mt-12 pt-12 font-semibold">
                Section Five
              </Title>
              <Title as="h6" style={{ fontWeight: '400' }} className='pt-2 text-gray-700'>- Fifth Screen, showcase section title, description. Add inputs for this section and audio URL </Title>

              <div className="flex mt-4 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Title"
                    placeholder="Title"
                    {...register('sectionFiveTitle')}
                  />
                </div>
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Audio"
                    placeholder="URL"
                    {...register('audioFiveURL')}
                  />
                </div>

              </div>
              <div className="mt-12 pt-4 pb-12 items-center gap-4">
                <div className="w-full h-4 rounded-full">
                  <Textarea
                    label="Description"
                    placeholder="Description"
                    {...register('sectionFiveDescription')}
                  />
                </div>

              </div>



              {/* ************************************************************************************************************************** */}
              {/* Input Fields */}
              {/* ************************************************************************************************************************** */}

              <div style={{ marginTop: '7%' }} className='mt-12 pt-8 flex items-center gap-4 w-full'>
                <Switch
                  checked={showInput1}
                  label={`Enable Input Field One`}
                  onChange={() => setShowInput1(!showInput1)}
                />
              </div>

              {showInput1 && <div className="flex mt-2 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Section Title"
                    placeholder="Title"
                    {...register('inputOneTitle')}
                  />
                </div>

                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Section Subtitle"
                    placeholder="Subtitle"
                    {...register('inputOneSubTitle')}
                  />
                </div>
              </div>}

              {showInput1 && <div className="flex mt-12 pt-2 items-center gap-4">
                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields1')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields1Type')}
                  />
                </div>

                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields2')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields2Type')}
                  />
                </div>
              </div>}

              {showInput1 && <div className="flex pt-2 items-center gap-4">
                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields3')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields3Type')}
                  />
                </div>

                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields4')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields4Type')}
                  />
                </div>
              </div>}

              {showInput1 && <div className="flex pt-2 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Button Title"
                    placeholder="Title"
                    {...register('buttonTitle1')}
                  />
                </div>

                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="OnClick"
                    placeholder="function"
                    {...register('buttonClick1')}
                  />
                </div>
              </div>
              }

              {/* Input Section #2 */}

              <div className={`${showInput2 ? 'flex mt-12 pt-4 items-center gap-4 w-full' : 'flex mt-12 items-center gap-4 w-full'}`}>
                <Switch
                  checked={showInput2}
                  label={`Enable Input Field Two`}
                  style={{ marginLeft: '80%' }}
                  onChange={() => setShowInput2(!showInput2)}
                />
              </div>
              {showInput2 && <div className="flex mt-2 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Section Title"
                    placeholder="Title"
                    {...register('inputTwoTitle')}
                  />
                </div>

                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Section Subtitle"
                    placeholder="Subtitle"
                    {...register('inputTwoSubTitle')}
                  />
                </div>
              </div>}
              {showInput2 && <div className="flex mt-12 pt-2 items-center gap-4">
                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields5')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields5Type')}
                  />
                </div>

                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields6')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields6Type')}
                  />
                </div>
              </div>}

              {showInput2 && <div className="flex pt-2 items-center gap-4">
                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields7')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields7Type')}
                  />
                </div>

                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields8')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields8Type')}
                  />
                </div>
              </div>}

              {showInput2 && <div className="flex pt-2 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Button Title"
                    placeholder="Title"
                    {...register('buttonTitle2')}
                  />
                </div>

                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="OnClick"
                    placeholder="function"
                    {...register('buttonClick2')}
                  />
                </div>
              </div>
              }

              {/* Input Section #3 */}
              <div className={`${showInput3 ? 'flex mt-12 pt-4 items-center gap-4 w-full' : 'flex mt-12 items-center gap-4 w-full'}`}>
                <Switch
                  checked={showInput3}
                  label={`Enable Input Fields Three`}
                  style={{ marginLeft: '80%' }}
                  onChange={() => setShowInput3(!showInput3)}
                />
              </div>
              {showInput3 && <div className="flex mt-2 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Section Title"
                    placeholder="Title"
                    {...register('inputThreeTitle')}
                  />
                </div>

                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Section Subtitle"
                    placeholder="Subtitle"
                    {...register('inputThreeSubTitle')}
                  />
                </div>
              </div>}
              {showInput3 && <div className="flex mt-12 pt-2 items-center gap-4">
                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields9')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields9Type')}
                  />
                </div>

                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields10')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields10Type')}
                  />
                </div>
              </div>}

              {showInput3 && <div className="flex pt-2 items-center gap-4">
                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields11')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields11Type')}
                  />
                </div>

                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields12')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields12Type')}
                  />
                </div>
              </div>}

              {showInput3 && <div className="flex pt-2 items-center gap-4">
                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Button Title"
                    placeholder="Title"
                    {...register('buttonTitle3')}
                  />
                </div>

                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="OnClick"
                    placeholder="function"
                    {...register('buttonClick3')}
                  />
                </div>
              </div>
              }

              {/* Input Section #4 */}
              <div className={`${showInput4 ? 'flex mt-12 pt-4 items-center gap-4 w-full' : 'flex mt-12 items-center gap-4 w-full'}`}>
                <Switch
                  checked={showInput4}
                  label={`Enable Input Field Four`}
                  style={{ marginLeft: '80%' }}
                  onChange={() => setShowInput4(!showInput4)}
                />
              </div>
              {showInput4 && <div className="flex mt-2 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Section Title"
                    placeholder="Title"
                    {...register('inputFourTitle')}
                  />
                </div>

                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Section Subtitle"
                    placeholder="Subtitle"
                    {...register('inputFourSubTitle')}
                  />
                </div>
              </div>}
              {showInput4 && <div className="flex mt-12 pt-2 items-center gap-4">
                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields13')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields13Type')}
                  />
                </div>

                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields14')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields14Type')}
                  />
                </div>
              </div>}

              {showInput4 && <div className="flex pt-2 items-center gap-4">
                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields15')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields15Type')}
                  />
                </div>

                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields16')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields16Type')}
                  />
                </div>
              </div>}

              {showInput4 && <div className="flex pt-2 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Button Title"
                    placeholder="Title"
                    {...register('buttonTitle4')}
                  />
                </div>

                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="OnClick"
                    placeholder="function"
                    {...register('buttonClick4')}
                  />
                </div>
              </div>
              }

              {/* Input Section #5 */}
              <div className={`${showInput5 ? 'flex mt-12 pt-4 items-center gap-4 w-full' : 'flex mt-12 items-center gap-4 w-full'}`}>
                <Switch
                  checked={showInput5}
                  label={`Enable Input Field Five`}
                  style={{ marginLeft: '80%' }}
                  onChange={() => setShowInput5(!showInput5)}
                />
              </div>
              {showInput5 && <div className="flex mt-2 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Section Title"
                    placeholder="Title"
                    {...register('inputFiveTitle')}
                  />
                </div>

                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Section Subtitle"
                    placeholder="Subtitle"
                    {...register('inputFiveSubTitle')}
                  />
                </div>
              </div>}
              {showInput5 && <div className="flex mt-12 pt-2 items-center gap-4">
                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields17')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields17Type')}
                  />
                </div>

                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields18')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields18Type')}
                  />
                </div>
              </div>}

              {showInput5 && <div className="flex pt-2 items-center gap-4">
                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields19')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields19Type')}
                  />
                </div>

                <div className="w-1/2 h-40 rounded-full">
                  <Input
                    label="Label"
                    placeholder="Label"
                    {...register('inputFields20')}
                  />
                  <Input
                    label="File Type"
                    placeholder="text or file"
                    {...register('inputFields20Type')}
                  />
                </div>
              </div>}

              {showInput5 && <div className="flex pt-2 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Button Title"
                    placeholder="Title"
                    {...register('buttonTitle5')}
                  />
                </div>

                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="OnClick"
                    placeholder="function"
                    {...register('buttonClick5')}
                  />
                </div>
              </div>
              }

              {/* ************************************************************************************************************************** */}
              {/* End of inputs section */}
              {/* ************************************************************************************************************************** */}





              {/* ************************************************************************************************************************** */}
              {/* Section 6 */}
              {/* ************************************************************************************************************************** */}

              <Title as="h6" className="mt-12 pt-12 font-semibold">
                Section Six
              </Title>
              <Title as="h6" style={{ fontWeight: '400' }} className='pt-2 text-gray-700'>- Last Screen, showcase congratulations message. Add nutrition label values, audio URL </Title>

              <div className="flex mt-4 items-center gap-4">
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Audio"
                    placeholder="URL"
                    {...register('audioSixURL')}
                  />
                </div>

              </div>
              <div className="mt-12 pt-4 pb-12 items-center gap-4">
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Congratulations Message"
                    placeholder="Congratulations"
                    {...register('congratulations')}
                  />
                </div>

              </div>

              {/* ************************************************************************************************************************** */}
              {/*  */}
              {/* ************************************************************************************************************************** */}

              <Title as="h6" style={{ fontWeight: 'bold', marginTop: '7%' }} className='mt-2 text-gray-700'>Nutrition Labels</Title>

              <div className="flex mt-6 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Title"
                    placeholder="Value"
                    value="Perceived Value"
                  />
                </div>
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Value"
                    type='number'
                    placeholder="Value"
                    {...register('perceivedValue')}
                  />
                </div>

              </div>

              <div className="flex mt-12 pt-6 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Title"
                    placeholder="Title"
                    value="Decrease Risk"
                  />
                </div>
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Value"
                    placeholder="Value"
                    type='number'
                    {...register('riskValue')}
                  />
                </div>

              </div>

              <div className="flex mt-12 pt-6 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Title"
                    placeholder="Title"
                    value="Building Trust"
                  />
                </div>
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Value"
                    placeholder="Value"
                    type='number'
                    {...register('trustValue')}
                  />
                </div>

              </div>

              <div className="flex mt-12 pt-6 items-center gap-4">
                <div className="w-1/2 h-4 rounded-full">
                  <Input
                    label="Title"
                    placeholder="Title"
                    value="Opportunity"
                  />
                </div>
                <div className="w-full h-4 rounded-full">
                  <Input
                    label="Value"
                    placeholder="Value"
                    type='number'
                    {...register('opportunityValue')}
                  />
                </div>

              </div>



              {/* ************************************************************************************************************************** */}
              {/*  */}
              {/* ************************************************************************************************************************** */}

              <div className="grid grid-cols-5 gap-4">

                {/* Assistant section */}
                <div className='mt-12 pt-4 items-center gap-4 w-full'>
                  <Switch
                    checked={isAssistant}
                    label={`Ai Assistant`}
                    onChange={() => setIsAssistant(!isAssistant)}
                  />
                </div>

                {/* Attachment section */}
                <div className='mt-12 pt-4 items-center gap-4 w-full'>
                  <Switch
                    checked={isAttachment}
                    label={`Attachments`}
                    onChange={() => setIsAttachment(!isAttachment)}
                  />
                </div>

                {/* Required section */}
                <div className='mt-12 pt-4 items-center gap-4 w-full'>
                  <Switch
                    checked={required}
                    label={`Required`}
                    onChange={() => setRequired(!required)}
                  />
                </div>

                {/* Packages section */}
                <div className='mt-12 pt-4 items-center gap-4 w-full'>
                  <Switch
                    checked={isPackages}
                    label={`Packages`}
                    onChange={() => setIsPackages(!isPackages)}
                  />
                </div>

                {/* Feedback section */}
                <div className='mt-12 pt-4 items-center gap-4 w-full'>
                  <Switch
                    checked={feedback}
                    label={`Feedback`}
                    onChange={() => setFeedback(!feedback)}
                  />
                </div>

              </div>

            </div>


            <div style={{ marginTop: '10%' }} className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={closeModal}
                className="w-full @xl:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
              >
                Create Card
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
