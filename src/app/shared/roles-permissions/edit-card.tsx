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
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
    ssr: false,
    loading: () => <SelectLoader />,
});

// main category form component for create and update category
export default function EditSellerSpanCard() {
    const { closeModal } = useModal();
    const [cardID, setCardID] = useState(null) as any;
    const [card, setCard] = useState({}) as any;
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
    const [isPackages, setIsPackages] = useState(false);

    // Card Fields


    // Section 1
    const [title, setTitle] = useState(card?.title || null);
    const [description, setDescription] = useState(card?.section1?.description || null);
    const [details, setDetails] = useState(card?.details || null);
    const [audioOne, setAudioOne] = useState(card?.section1?.audio || null);
    const [referenced, setReferenced] = useState(card?.section1?.referenced || null);
    const [responsible, setResponsible] = useState(card?.section1?.responsible || null);


    // Section 2
    const [audioTwo, setAudioTwo] = useState(card?.section2?.audio || null);
    const [descriptionTwo, setDescriptionTwo] = useState(card?.section2?.description || null);
    const [titleTwo, setTitleTwo] = useState(card?.section2?.title || null);
    const [videoURL, setVideoURL] = useState(card?.section2?.videoURL || null);

    // Section 3
    const [audioThree, setAudioThree] = useState(card?.section3?.audio || null);
    const [titleThree, setTitleThree] = useState(card?.section3?.title || null);
    const [descriptionThree, setDescriptionThree] = useState(card?.section3?.description || null);
    const [documentURL, setDocumentURL] = useState(card?.section3.url || null);


    // Section4
    const [audioFour, setAudioFour] = useState(card?.section4?.audio || null);
    const [titleFour, setTitleFour] = useState(card?.section4?.title || null);
    const [descriptionFour, setDescriptionFour] = useState(card?.section4?.description || null);

    // Section 5
    const [audioFive, setAudioFive] = useState(card?.section5?.audio || null);
    const [descriptionFive, setDescriptionFive] = useState(card?.section5?.description || null);
    const [titleFive, setTitleFive] = useState(card?.section5?.title || null);
    const [inputField, setInputField] = useState(card?.section5?.inputsOne || null);
    const [inputFieldTwo, setInputFieldTwo] = useState(card?.section5?.inputsTwo || null);
    const [inputFieldThree, setInputFieldThree] = useState(card?.section5?.inputsThree || null);
    const [inputFieldFour, setInputFieldFour] = useState(card?.section5?.inputsFour || null);
    const [inputFieldFive, setInputFieldFive] = useState(card?.section5?.inputsFive || null);

    // Section 6
    const [audioSix, setAudioSix] = useState(card?.section6?.audio || null);
    const [congratulations, setCongratulations] = useState(card?.section6?.congratulations || null);
    const [nutrition, setNutrition] = useState(card?.section6?.nutrition || null);



    const [required, setRequired] = useState(card?.required || null);
    const [feedback, setFeedback] = useState(card?.feedback || null);
    const [tag, setTag] = useState(card?.tag || null);
    const [order, setOrder] = useState(card?.order || null);
    const [files, setFiles] = useState(card?.files || null);
    const [videos, setVideos] = useState(card?.videos || null);
    const [attachments, setAttachments] = useState(card?.attachment || null);
    const [assistant, setAssistant] = useState(card?.isAssistant || null);
    const [packages, setPackages] = useState(card?.isPackages || null);
    const [status, setStatus] = useState(card?.status || null);



    useEffect(() => {
        if (typeof window !== 'undefined') {
            const url = window.location.pathname;
            setCardID(url.split("/").pop());
        }
    }, []);


    useEffect(() => {
        fetchCardData();
    }, [cardID]);

    const fetchCardData = async () => {
        try {
            const q = query(collection(firebase.firestore, "sellerspan_collection"), where("id", "==", cardID));
            const querySnapshot = await getDocs(q);
            const dataFields = [] as any;
            querySnapshot.forEach((doc) => {
                dataFields.push({ ...doc.data() });
            });
            setCard(dataFields[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display error message, retry logic)t5
        }
    };

    const updateCard = async () => {

        const section1 = {
            title: title,
            description: description,
            audio: audioOne,
            referenced: referenced,
            responsible: responsible,
        };

        const section2 = {
            audio: audioTwo,
            description: descriptionTwo,
            title: titleTwo,
            videoURL: videoURL,
        };
        const section3 = {
            audio: audioThree,
            title: titleThree,
            description: descriptionThree,
            url: documentURL,
        };

        const section4 = {
            audio: audioFour,
            title: titleFour,
            description: descriptionFour,
        };

        const section5 = {
            audio: audioFive,
            title: titleFive,
            description: descriptionFive,
            inputsOne: inputField,
            inputsTwo: inputFieldTwo,
            inputsThree: inputFieldThree,
            inputsFour: inputFieldFour,
            inputsFive: inputFieldFive,
        };

        const section6 = {
            audio: audioSix,
            congratulations: congratulations,
            nutrition: nutrition,
        };

        const cardData = {
            id: card?.id,
            title: title,
            tag: tag,
            details: details,
            order: card?.order,
            createdAt: card?.createdAt,
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
            const docRef = doc(collection(firebase.firestore, "sellerspan_collection"), card?.id);
            await updateDoc(docRef, cardData);
            toast.success("SellerSpan Card Updated", { position: "bottom-center" });
            closeModal();
        } catch (e) {
            console.log(e);
        }

    }




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
                type: "text",
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
        updateCard();
    };


    const handArrayChange = (event: any, index: number, array: any, setArray: any, field: any) => {
        const newValue = event.target.value;
        const updatedInputFields = [...array];
        updatedInputFields[index][field] = newValue;
        setArray(updatedInputFields);
    }

    const handArrayTypeChange = (event: any, index: number, array: any, setArray: any, field: any) => {
        const newValue = event === 'text' ? 'file' : 'text';
        const updatedInputFields = [...array];
        updatedInputFields[index][field] = newValue;
        setArray(updatedInputFields);
    }

    const handleObjectChange = (event: any, field: string, object: any, setObject: any) => {
        const newValue = event.target.value;
        const updatedObject = { ...object };
        updatedObject[field] = newValue;
        setObject(updatedObject);
    }

    const handStandardArrayChange = (event: any, index: number, array: any, setArray: any) => {
        const newValue = event.target.value;
        const updatedInputFields = [...array];
        updatedInputFields[index] = newValue;
        setArray(updatedInputFields);
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
                                Edit {title}
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
                                        value={title}
                                        placeholder="Title"
                                        onChange={(e) => setTitle(e.target?.value)}
                                    />
                                </div>
                                <div className="w-full h-4 rounded-full">
                                    <Input
                                        label="Details"
                                        value={details}
                                        placeholder="Details"
                                        onChange={(e) => setDetails(e.target?.value)}
                                    />
                                </div>

                            </div>

                            <div className="mt-12 pt-4 pb-12 items-center gap-4">
                                <div className="w-full h-4 rounded-full">
                                    <Textarea
                                        label="Description"
                                        value={description}
                                        placeholder="Description"
                                        onChange={(e) => setDescription(e.target?.value)}
                                    />
                                </div>

                            </div>

                            <div className="mt-12 pt-12 items-center gap-4">
                                <div className="w-full h-4 rounded-full">
                                    <Input
                                        label="Audio"
                                        placeholder="URL"
                                        value={audioOne}
                                        onChange={(e) => setAudioOne(e.target?.value)}
                                    />
                                </div>

                            </div>


                            {/* ************************************************************************************************************************** */}
                            {/* Referenced */}
                            {/* ************************************************************************************************************************** */}

                            <Title as="h6" style={{ fontWeight: 'bold' }} className='pt-12 mt-12 text-gray-700'>Where&apos;s this Referenced?</Title>

                            {/* Referenced Section */}
                            {referenced?.map((item: any, index: number) => (<div key={index} className="grid grid-cols-1 mt-2 items-center gap-4">
                                <div className="w-full h-4 mt-12 rounded-full">
                                    <Input
                                        label="Referenced"
                                        placeholder="Referenced"
                                        value={item}
                                        onChange={(e) => handStandardArrayChange(e, index, referenced, setReferenced)}
                                    />
                                </div>
                            </div>))}


                            {/* ************************************************************************************************************************** */}
                            {/* Responsible */}
                            {/* ************************************************************************************************************************** */}

                            <Title as="h6" style={{ fontWeight: 'bold' }} className='pt-12 mt-12 text-gray-700'>Who&apos;s Responsible?</Title>

                            {/* Responsible Section */}
                            {responsible?.map((item: any, index: number) => (<div key={index} className="grid grid-cols-1 mt-2 items-center gap-4">
                                <div className="w-full h-4 mt-12 rounded-full">
                                    <Input
                                        label="Responsible"
                                        placeholder="Responsible"
                                        value={item}
                                        onChange={(e) => handStandardArrayChange(e, index, responsible, setResponsible)}
                                    />
                                </div>
                            </div>))}


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
                                        value={titleTwo}
                                        onChange={(e) => setTitleTwo(e.target?.value)}
                                    />
                                </div>
                                <div className="w-full h-4 rounded-full">
                                    <Input
                                        label="Video URL"
                                        value={videoURL}
                                        placeholder="Video URL"
                                        onChange={(e) => setVideoURL(e.target?.value)}
                                    />
                                </div>

                            </div>
                            <div className="mt-12 pt-4 pb-12 items-center gap-4">
                                <div className="w-full h-4 rounded-full">
                                    <Textarea
                                        label="Description"
                                        placeholder="Description"
                                        value={descriptionTwo}
                                        onChange={(e) => setDescriptionTwo(e.target?.value)}
                                    />
                                </div>

                            </div>

                            <div className="mt-12 pt-12 items-center gap-4">
                                <div className="w-full h-4 rounded-full">
                                    <Input
                                        label="Audio"
                                        placeholder="URL"
                                        value={audioTwo}
                                        onChange={(e) => setAudioTwo(e.target?.value)}
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
                                        value={titleThree}
                                        onChange={(e) => setTitleThree(e.target?.value)}
                                    />
                                </div>
                                <div className="w-full h-4 rounded-full">
                                    <Input
                                        label="Document URL"
                                        placeholder="Document URL"
                                        value={documentURL}
                                        onChange={(e) => setDocumentURL(e.target?.value)}
                                    />
                                </div>

                            </div>
                            <div className="mt-12 pt-4 pb-12 items-center gap-4">
                                <div className="w-full h-4 rounded-full">
                                    <Textarea
                                        label="Description"
                                        placeholder="Description"
                                        value={descriptionThree}
                                        onChange={(e) => setDescriptionThree(e.target?.value)}
                                    />
                                </div>

                            </div>

                            <div className="mt-12 pt-12 items-center gap-4">
                                <div className="w-full h-4 rounded-full">
                                    <Input
                                        label="Audio"
                                        placeholder="URL"
                                        value={audioThree}
                                        onChange={(e) => setAudioThree(e.target?.value)}
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
                                        value={titleFour}
                                        onChange={(e) => setTitleFour(e.target?.value)}
                                    />
                                </div>
                                <div className="w-full h-4 rounded-full">
                                    <Input
                                        label="Audio"
                                        placeholder="URL"
                                        value={audioFour}
                                        onChange={(e) => setAudioFour(e.target?.value)}
                                    />
                                </div>

                            </div>
                            <div className="mt-12 pt-4 pb-12 items-center gap-4">
                                <div className="w-full h-4 rounded-full">
                                    <Textarea
                                        label="Description"
                                        placeholder="Description"
                                        value={descriptionFour}
                                        onChange={(e) => setDescriptionFour(e.target?.value)}
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
                                        value={titleFive}
                                        onChange={(e) => setTitleFive(e.target?.value)}
                                    />
                                </div>
                                <div className="w-full h-4 rounded-full">
                                    <Input
                                        label="Audio"
                                        placeholder="URL"
                                        value={audioFive}
                                        onChange={(e) => setAudioFive(e.target?.value)}
                                    />
                                </div>

                            </div>
                            <div className="mt-12 pt-4 pb-12 items-center gap-4">
                                <div className="w-full h-4 rounded-full">
                                    <Textarea
                                        label="Description"
                                        placeholder="Description"
                                        value={descriptionFive}
                                        onChange={(e) => setDescriptionFive(e.target?.value)}
                                    />
                                </div>

                            </div>



                            {/* ************************************************************************************************************************** */}
                            {/* Input Fields */}
                            {/* ************************************************************************************************************************** */}

                            {inputField?.length > 0 && <div className="flex mt-12 pt-12 items-center gap-4">
                                {inputField?.map((item: any, index: number) => (<div key={index} className="w-1/2 h-40 rounded-full">
                                    <Input
                                        label="Label"
                                        placeholder="Label"
                                        value={item?.label}
                                        onChange={(e) => handArrayChange(e, index, inputField, setInputField, 'label')}
                                    />
                                    <Input
                                        label="File Type"
                                        placeholder="text or file"
                                        value={item?.type}
                                        onChange={(e) => handArrayChange(e, index, inputField, setInputField, 'type')}
                                    />
                                </div>))}
                            </div>}


                            {/* Input Section #2 */}

                            {inputFieldTwo?.length > 0 && <div className="flex mt-12 pt-2 items-center gap-4">
                                {inputFieldTwo?.map((item: any, index: number) => (<div key={index} className="w-1/2 h-40 rounded-full">
                                    <Input
                                        label="Label"
                                        placeholder="Label"
                                        value={item?.label}
                                        onChange={(e) => handArrayChange(e, index, inputFieldTwo, setInputFieldTwo, 'label')}
                                    />
                                    <Input
                                        label="File Type"
                                        placeholder="text or file"
                                        value={item?.type}
                                        onChange={(e) => handArrayChange(e, index, inputFieldTwo, setInputFieldTwo, 'type')}
                                    />
                                </div>))}
                            </div>}


                            {/* Input Section #3 */}
                            {inputFieldThree?.length > 0 && <div className="flex mt-12 pt-2 items-center gap-4">
                                {inputFieldThree?.map((item: any, index: number) => (<div key={index} className="w-1/2 h-40 rounded-full">
                                    <Input
                                        label="Label"
                                        placeholder="Label"
                                        value={item?.label}
                                        onChange={(e) => handArrayChange(e, index, inputFieldThree, setInputFieldThree, 'label')}
                                    />
                                    <Input
                                        label="File Type"
                                        placeholder="text or file"
                                        value={item?.type}
                                        onChange={(e) => handArrayChange(e, index, inputFieldThree, setInputFieldThree, 'type')}
                                    />
                                </div>))}
                            </div>}

                            {/* Input Section #4 */}
                            {inputFieldFour?.length > 0 && <div className="flex mt-12 pt-2 items-center gap-4">
                                {inputFieldFour?.map((item: any, index: number) => (<div key={index} className="w-1/2 h-40 rounded-full">
                                    <Input
                                        label="Label"
                                        placeholder="Label"
                                        value={item?.label}
                                        onChange={(e) => handArrayChange(e, index, inputFieldFour, setInputFieldFour, 'label')}
                                    />
                                    <Input
                                        label="File Type"
                                        placeholder="text or file"
                                        value={item?.type}
                                        onChange={(e) => handArrayChange(e, index, inputFieldFour, setInputFieldFour, 'type')}
                                    />
                                </div>))}
                            </div>}

                            {/* Input Section #5 */}
                            {inputFieldFive?.length > 0 && <div className="flex mt-12 pt-2 items-center gap-4">
                                {inputFieldFive?.map((item: any, index: number) => (<div key={index} className="w-1/2 h-40 rounded-full">
                                    <Input
                                        label="Label"
                                        placeholder="Label"
                                        value={item?.label}
                                        onChange={(e) => handArrayChange(e, index, inputFieldFive, setInputFieldFive, 'label')}
                                    />
                                    <Input
                                        label="File Type"
                                        placeholder="text or file"
                                        value={item?.type}
                                        onChange={(e) => handArrayChange(e, index, inputFieldFive, setInputFieldFive, 'type')}
                                    />
                                </div>))}
                            </div>}

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
                                        value={audioSix}
                                        onChange={(e) => setAudioSix(e.target.value)}
                                    />
                                </div>

                            </div>
                            <div className="mt-12 pt-4 pb-12 items-center gap-4">
                                <div className="w-full h-4 rounded-full">
                                    <Input
                                        label="Congratulations Message"
                                        placeholder="Congratulations"
                                        value={congratulations}
                                        onChange={(e) => setCongratulations(e.target.value)}
                                    />
                                </div>

                            </div>

                            {/* ************************************************************************************************************************** */}
                            {/*  */}
                            {/* ************************************************************************************************************************** */}

                            <Title as="h6" style={{ fontWeight: 'bold', marginTop: '7%' }} className='mt-2 text-gray-700'>Nutrition Labels</Title>

                            {nutrition?.length > 0 && <div className="flex mt-6 items-center gap-4">

                                {nutrition?.map((item: any, index: number) => (<div key={index} className="w-full">
                                    <div className="w-full h-4 rounded-full">
                                        <Input
                                            label="Label"
                                            placeholder="Value"
                                            value={item.label}
                                        />
                                    </div>
                                    <div className="w-full h-4 mt-12 pt-4 rounded-full">
                                        <Input
                                            label="Value"
                                            type='number'
                                            placeholder="Value"
                                            value={item.value}
                                            onChange={(e) => handArrayChange(e, index, nutrition, setNutrition, 'value')}
                                        />
                                    </div>
                                </div>))}
                            </div>}


                            {/* ************************************************************************************************************************** */}
                            {/*  */}
                            {/* ************************************************************************************************************************** */}

                            <div className="grid grid-cols-5 mt-6 gap-4">

                                {/* Assistant section */}
                                <div className='mt-12 pt-4 items-center gap-4 w-full'>
                                    <Switch
                                        checked={assistant}
                                        label={`Ai Assistant`}
                                        onChange={() => setAssistant(!assistant)}
                                    />
                                </div>

                                {/* Attachment section */}
                                <div className='mt-12 pt-4 items-center gap-4 w-full'>
                                    <Switch
                                        checked={attachments}
                                        label={`Attachments`}
                                        onChange={() => setAttachments(!attachments)}
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
                                        checked={packages}
                                        label={`Packages`}
                                        onChange={() => setPackages(!packages)}
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
                                Update Card
                            </Button>
                        </div>
                    </>
                );
            }}
        </Form>
    );
}
