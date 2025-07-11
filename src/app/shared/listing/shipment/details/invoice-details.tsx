'use client';

import firebase from '@/config/firebase.config';
import { currentSession } from '@/config/session';
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PiMessengerLogoBold } from 'react-icons/pi';
import { Button } from 'rizzui';



export default function MoreDetails({ product, request }: { product?: any; request?: any; }) {
  const { push } = useRouter();
  const currentUser = currentSession() as any;
  const [providerUser, setProviderUser] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, [product]);

  const fetchUserData = async () => {
    try {
      const q = query(collection(firebase.firestore, "users"), where("id", "==", product?.userID));
      const querySnapshot = await getDocs(q);
      const dataFields = querySnapshot.docs.map(doc => doc.data());
      setProviderUser(dataFields[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch user data');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">{error}</div>;
  }

  return (
    <div className="mx-8   bg-white ">
      <div className="flex flex-col py-8">
        <h1 className='mb-8 px-8'>Managed by</h1>

        <div className="w-full mb-4 flex px-8">
          <Image
            quality={100}
            width={300}
            height={300}
            alt="provider_photo"
            className="object-contain"
            src={providerUser?.profilePictureURL}
          />
        </div>

        <div className="w-full rounded-lg  px-8">
          <h1 className="font-semibold text-xl text-gray-900">
            {providerUser?.firstName} {providerUser?.lastName} {providerUser?.designation ? `, ${providerUser?.designation}` : ''}
          </h1>
          {providerUser?.title && <div className="font-medium text-lg text-gray-700">{providerUser?.title}</div>}
          <span className="font-medium text-lg text-gray-700">{product?.dba}</span>
          {currentUser?.id !== product?.userID && (
            <Button onClick={request} className="mt-4 w-full md:w-auto flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              <PiMessengerLogoBold className="h-4 w-4" />
              Request Services
            </Button>
          )}
        </div>
      </div>
    </div >
  );
}