'use client';
import Link from 'next/link';
import Image from 'next/image';
import { routes } from '@/config/routes';
import { Title, Text, Button } from 'rizzui';
import cn from '@/utils/class-names';
import WishlistButton from '@/components/wishlist-button';
import { generateSlug } from '@/utils/generate-slug';
import ColorSwatch from '@/utils/color-swatch';
// import { Product } from '@/types';
import { toCurrency } from '@/utils/to-currency';
import { useState } from 'react';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, setDoc, addDoc, query, collection, updateDoc, getDocs, where, serverTimestamp } from "firebase/firestore";
import { currentSession } from '@/config/session';
import toast from 'react-hot-toast';
import { PiBagDuotone } from 'react-icons/pi';
interface ProductProps {
  product: Product;
  className?: string;
}

type Product = {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  description: string;
  image: string;
};

export default function ProductModernCard({
  product,
  className,
}: ProductProps) {
  const {
    id,
    name,
    minPrice,
    maxPrice,
    description,
    image,
  } = product;
  const [isExpanded, setIsExpanded] = useState(false);
  const [requested, setRequested] = useState(false);
  const [requestedPackage, setRequestedPackage] = useState({}) as any;
  const currentUser = currentSession() as any;

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
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
      packages: [item],
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

  return (
    <div className={cn(className)}>
      <div className="pt-3">
        <Image
          src={product?.image}
          quality={100}
          width={200}
          height={100}
          alt="package_image"
          className="object-contain w-full"
        />
        <Link href={'#.'}>
          <Title
            as="h6"
            className="mb-1 truncate font-semibold transition-colors hover:text-primary"
          >
            {name}
          </Title>
        </Link>

        {isExpanded ? (
          <>
          <Text className="mt-1">{description}</Text>
          <p onClick={toggleExpansion} style={{color: 'rebeccapurple'}}>Show Less</p>
          </>
        ) : (
          <>
          <Text as="p" className="truncate cursor-pointer" onClick={toggleExpansion}>
              {description}
            </Text>
              <p onClick={toggleExpansion} style={{ color: 'blue'}}>Show More</p>
            </>
        )}

        <div className="mt-2 flex items-center font-semibold text-gray-900">
          {toCurrency(Number(minPrice))} - {toCurrency(Number(maxPrice))}
        </div>
        <Button disabled={requested && requestedPackage?.id === product?.id} onClick={() => request(product)} className="w-full mt-4 gap-2 @lg:w-auto" >
          <PiBagDuotone className="h-4 w-4" />
          {requested && requestedPackage?.id === product?.id ? 'Service Request Sent' : 'Request Service'}
        </Button>
      </div>
    </div>
  );
}
