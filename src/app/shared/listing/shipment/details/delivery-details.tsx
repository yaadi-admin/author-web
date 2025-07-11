'use client';

import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';
import { Avatar, Text, Title } from 'rizzui';
import { FaStar, FaMoneyBillWave, FaNetworkWired, FaIndustry, FaMedal, FaPiggyBank, FaTools } from 'react-icons/fa';
import { MdMiscellaneousServices } from 'react-icons/md';


const optionIcons = {
  "Value for money": <FaMoneyBillWave className='h-8 w-8' />,
  "Broad network": <FaNetworkWired className='h-8 w-8' />,
  "Full service": <MdMiscellaneousServices className='h-8 w-8' />,
  "Industry specialized": <FaIndustry className='h-8 w-8' />,
  "Best in class": <FaMedal className='h-8 w-8' />,
  "Budget friendly": <FaPiggyBank className='h-8 w-8' />,
  "Bespoke solutions": <FaTools className='h-8 w-8' />,
  "High quality": <FaStar className='h-8 w-8' /> // New high-quality option
};

interface DeliveryDetailsProps {
  className?: string;
  products?: {
    sellingProposition1?: keyof typeof optionIcons;
    sellingProposition2?: keyof typeof optionIcons;
    sellingProposition3?: keyof typeof optionIcons;
  };
}

const data = [
  {
    id: 1,
    date: new Date('2023-08-23T10:18:34.191Z'),
    deliveredBy: {
      name: 'Estelle Hansen MD',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.png`,
    },
    receivedBy: {
      name: 'Sherry Kulas DVM',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.png`,
    },
    receiversSignature: 'Shelia Schmeler PhD',
  },
];

export const getColumns = () => [
  // {
  //   title: <span className="ms-6 block whitespace-nowrap"> </span>,
  //   dataIndex: 'sellingProposition1',
  //   key: 'sellingProposition1',
  //   width: 300,
  //   render: (sellingProposition1: string) => (
  //     <div className="flex items-center">
  //       <Avatar name={sellingProposition1 ? sellingProposition1.slice(0, 1) : 'N'} src={sellingProposition1 ? sellingProposition1.slice(0, 1) : 'N'} size="sm" />
  //       <div className="ml-3 rtl:ml-0 rtl:mr-3">
  //       <Text className="mb-1 font-medium text-gray-700">
  //           {sellingProposition1 ? sellingProposition1 : 'Large Network'}
  //       </Text>
  //     </div>
  //     </div>
  //   ),
  // },
  // {
  //   title: <span className="block whitespace-nowrap"> </span>,
  //   dataIndex: 'sellingProposition2',
  //   key: 'sellingProposition2',
  //   width: 300,
  //   render: (sellingProposition2: string) => (
  //     <div className="flex items-center">
  //       {/* TODO:: Add Narro logo for Avatar component */}
  //       <Avatar name={sellingProposition2 ? sellingProposition2.slice(0, 1) : 'Q'} src={sellingProposition2 ? sellingProposition2.slice(0, 1) : 'Q'} size="sm" />
  //       <div className="ml-3 rtl:ml-0 rtl:mr-3">
  //         <Title as="h6" className="mb-0.5 !text-sm font-medium">
  //           {sellingProposition2 ? sellingProposition2 : 'Top-quality'}
  //         </Title>
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   title: <span className="block whitespace-nowrap"> </span>,
  //   dataIndex: 'sellingProposition3',
  //   key: 'sellingProposition3',
  //   width: 300,
  //   render: (sellingProposition3: string) => (
  //     <div className="flex items-center">
  //       <Avatar name={sellingProposition3 ? sellingProposition3.slice(0, 1) : 'S'} src={sellingProposition3 ? sellingProposition3.slice(0, 1) : 'S'} size="sm" />
  //       <div className="ml-3 rtl:ml-0 rtl:mr-3">
  //         <Title as="h6" className="mb-0.5 !text-sm font-medium">
  //           {sellingProposition3 ? sellingProposition3 : 'Full Service'}
  //         </Title>
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   title: (
  //     <span className="block whitespace-nowrap">Auth Signature</span>
  //   ),
  //   dataIndex: 'receiversSignature',
  //   key: 'receiversSignature',
  //   width: 300,
  //   render: (receiversSignature: string) => (
  //     <Image src={signature} alt="clients signature" />
  //   ),
  // },
];


export default function ProviderDetails({ className, products }: DeliveryDetailsProps) {
  return (

    <div className="@container shadow-lg rounded-lg p-8 w-[90%] mx-auto">
      <div className='w-full mb-8'>
        <h1>What makes us unique</h1>
      </div>
      <div className='flex justify-around 4xs:flex-col md:flex-row 4xs:gap-2'>
        <div className='md:w-1/3 4xs:w-full'>
          <div className="flex items-center">
            {products?.sellingProposition1 && optionIcons[products.sellingProposition1]}
            {/* <Avatar name={products?.sellingProposition1 ? products?.sellingProposition1.slice(0, 1) : 'N'} src={products?.sellingProposition1 ? products?.sellingProposition1.slice(0, 1) : 'N'} size="sm" /> */}
            <div className="ml-3 rtl:ml-0 rtl:mr-3">
              <Text className="mb-1 font-medium text-gray-700">
                {products?.sellingProposition1 ? products?.sellingProposition1 : 'Large Network'}
              </Text>
            </div>
          </div>
        </div>


        <div className='md:w-1/3 4xs:w-full'>
          <div className="flex items-center">
            {/* TODO:: Add Narro logo for Avatar component */}
            {products?.sellingProposition2 && optionIcons[products.sellingProposition2]}
            {/* <Avatar name={products?.sellingProposition2 ? products?.sellingProposition2.slice(0, 1) : 'Q'} src={products?.sellingProposition2 ? products?.sellingProposition2.slice(0, 1) : 'Q'} size="sm" /> */}
            <div className="ml-3 rtl:ml-0 rtl:mr-3">
              <Title as="h6" className="mb-0.5 !text-sm font-medium">
                {products?.sellingProposition2 ? products?.sellingProposition2 : 'Top-quality'}
              </Title>
            </div>
          </div>
        </div>

        <div className='md:w-1/3 4xs:w-full'>
          <div className="flex items-center">
            {products?.sellingProposition3 && optionIcons[products.sellingProposition3]}

            {/* <Avatar name={products?.sellingProposition3 ? products?.sellingProposition3.slice(0, 1) : 'S'} src={products?.sellingProposition3 ? products?.sellingProposition3.slice(0, 1) : 'S'} size="sm" /> */}
            <div className="ml-3 rtl:ml-0 rtl:mr-3">
              <Title as="h6" className="mb-0.5 !text-sm font-medium">
                {products?.sellingProposition3 ? products?.sellingProposition3 : 'Full Service'}
              </Title>
            </div>
          </div>
        </div>



      </div>
    </div>

  );
}
