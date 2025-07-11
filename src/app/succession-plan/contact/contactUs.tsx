'use client';

import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import { getWidgetColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
// import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import { Button, Input, Textarea } from 'rizzui';
import { currentSession } from '@/config/session';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, serverTimestamp, orderBy, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PiArrowRightBold } from 'react-icons/pi';


export default function ContactUs() {
  const currentUser = currentSession() as any;
  const [message, setMessage] = useState('');
  const [requested, setRequested] = useState(false);

  const sendRequest = async () => {
    const docRef = doc(collection(firebase.firestore, "support"));
    const supportObject = {
      id: docRef.id,
      userID: currentUser?.id,
      user: currentUser,
      message,
      createdAt: serverTimestamp(),
    };
    try {
      await setDoc(docRef, supportObject);
    }
    catch (error) {
      console.error(error);
      toast.error("Error sending message", { position: "bottom-center" });
    }
    finally {
      toast.success("Contact Message sent", { position: "bottom-center" });
      setRequested(true);
    }
  };

  return (
    <div>

      <div className=''>

        {/* {currentUser?.role === 'provider' && <div className=''>
          {!requested && <h4 className='text-center col-span-full pb-8 pt-4'>We&apos;d love to hear from you in how to make your
            experience better!</h4>}
          {requested && <h4 className='text-center col-span-full pb-8 pt-4'>Contact Message Sent</h4>}

          {requested && <Button className='flex mx-auto' onClick={() => setRequested(false)}>Send another request</Button>}
          {!requested && <p className='pt-4'>Need help with the platform? Report a bug? Have feedback? A Narro team member will be in touch within 24 hours.</p>}
        </div>} */}
        {<div className=''>
          {!requested && <h4 className='text-center col-span-full pb-8 pt-4'>We&apos;d love to hear how we can make your experience better!</h4>}
          {requested && <h4 className='text-center col-span-full pb-8 pt-4'>Contact Message Sent</h4>}
          {requested && <Button className='flex mx-auto' onClick={() => setRequested(false)}>Send another request</Button>}

          {!requested && <p className='pt-4'>Need help with the platform? Experiencing a bug? Have feedback? A Narro team member will be in touch within 24 hours!</p>}
        </div>}


        {!requested && <Textarea
          label={`Message`}
          className='pt-8'
          onChange={(e) => setMessage(e.target.value)}
          name='message'
        />}

        {message && !requested && <Button onClick={sendRequest} className="mt-4">
          <PiArrowRightBold className="me-1.5 h-[17px] w-[17px]" />
          Send
        </Button>}
      </div>

    </div>
  );

}
