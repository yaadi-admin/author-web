'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { routes } from '@/config/routes';
import { Button, Text } from 'rizzui';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, setDoc, addDoc, query, collection, getDocs, where, serverTimestamp } from "firebase/firestore";
import { currentSession } from '@/config/session';
import { useRouter } from 'next/navigation';
import { qualibuy } from '@/config/seller/qualibuy';
import ReactMarkdown from 'react-markdown';
import { BASE_URL } from '@/config/bots';

import ImageUpload from '@/app/shared/image-upload';
import dynamic from 'next/dynamic';
import UploadLogo from '../../upload-logo';
import axios from 'axios';
import UploadFile from '../../upload-file';
import ImageNewDoc from '../../image-new-document';
const FileUpload = dynamic(() => import('@/app/shared/file-upload'), {
  ssr: false,
});
interface DataFieldsType {
  id: string;
  data: any;
  // Define properties here
}

export default function DialogueSix() {
  const currentUser = currentSession() as any;
  const qualiBuy = qualibuy('data') as any;
  const [report, setReport] = useState(``) as any;
  const [file, setFile] = useState('');
  const currentDate = new Date();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selected, setSelected] = useState({}) as any;
  const [recentUpdates, setRecentUpdates] = useState('') as any;
  const [progress, setProgress] = useState([]) as any;
  const [recentProgress, setRecentProgress] = useState({}) as any;
  const [selectedChannel, setSelectedChannel] = useState('') as any;
  const [message, setMessage] = useState('');
  const [dianaMessage, setDianaMessage] = useState('');
  const { push } = useRouter();

  // console.log(formContext.formState);
  useEffect(() => {
    const interval = setInterval(() => {
      const downloadURL = localStorage.getItem('newFileURL');
      if (downloadURL) {
        setFile(downloadURL);
        console.log(downloadURL);
        localStorage.removeItem('newFileURL');
        clearInterval(interval); // Stop checking once URL is found
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const sendRequest = async () => {
    const response = await axios.get<{ data: any }>(
      `${BASE_URL}/api/test/vision?fileId=${file}&message=${message}&dianaMessage=${dianaMessage}`,
    );
    console.log(response.data.data);
    setReport(response?.data.data);
  }

  return (
    <>
      <div className="@container">


        <div className='h-full justify-center items-center'>

          <div className='mb-4'>
            <p>File Id</p>
            <input className='mb-4 w-1/2' type='text' placeholder='Enter file id' value={file} onChange={(e) => setFile(e.target.value)} />
            <input className='mb-4 w-1/2' type='text' placeholder='Enter Finn Prompt' value={message} onChange={(e) => setMessage(e.target.value)} />
            <input className='mb-4 w-1/2' type='text' placeholder='Enter Diana Prompt' value={dianaMessage} onChange={(e) => setDianaMessage(e.target.value)} />
          </div>

          <div className='mb-4'>
            {/* <UploadFile modalView={<ImageNewDoc />} /> */}

            {/* <input className='mb-4 w-2/3' type='text' placeholder='Enter file id' value={file} onChange={(e) => setFile(e.target.value)} />
          <input className='mb-4 w-2/3' type='text' placeholder='Enter Finn Prompt' value={message} onChange={(e) => setMessage(e.target.value)} />
          <input className='mb-4 w-2/3' type='text' placeholder='Enter Diana Prompt' value={dianaMessage} onChange={(e) => setDianaMessage(e.target.value)} /> */}
          </div>

          <Button className='mb-4' onClick={sendRequest}>Fetch Data</Button>

          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full h-300 border border-black p-4 overflow-auto shadow-lg rounded-md bg-white">
              <h4 className='mb-4 text-lg font-semibold'>Report</h4>
              <ReactMarkdown>{report}</ReactMarkdown>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
