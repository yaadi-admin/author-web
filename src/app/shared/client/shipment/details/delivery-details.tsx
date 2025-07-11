'use client';

import Image from 'next/image';
import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';
import { Title, Text, Avatar } from 'rizzui';
import cn from '@/utils/class-names';
import { formatDate } from '@/utils/format-date';
import signature from '@public/client-signature.svg';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';

interface DeliveryDetailsProps {
  className?: string;
  products?: any;
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
  {
    title: <span className="ms-6 block whitespace-nowrap"> </span>,
    dataIndex: 'date',
    key: 'date',
    width: 300,
    render: (date: Date) => (
      <div className="flex items-center">
        <Avatar name={'N'} src={'N'} size="sm" />
        <div className="ml-3 rtl:ml-0 rtl:mr-3">
        <Text className="mb-1 font-medium text-gray-700">
          {/* {formatDate(date, 'MMMM D, YYYY')} */}
          Large Network
        </Text>
      </div>
      </div>
    ),
  },
  {
    title: <span className="block whitespace-nowrap"> </span>,
    dataIndex: 'deliveredBy',
    key: 'deliveredBy',
    width: 300,
    render: ({ name, avatar }: { name: string; avatar: string }) => (
      <div className="flex items-center">
        {/* TODO:: Add Narro logo for Avatar component */}
        <Avatar name={'Q'} src={'Q'} size="sm" />
        <div className="ml-3 rtl:ml-0 rtl:mr-3">
          <Title as="h6" className="mb-0.5 !text-sm font-medium">
            Top-quality
          </Title>
        </div>
      </div>
    ),
  },
  {
    title: <span className="block whitespace-nowrap"> </span>,
    dataIndex: 'receivedBy',
    key: 'receivedBy',
    width: 300,
    render: ({ name, avatar }: { name: string; avatar: string }) => (
      <div className="flex items-center">
        <Avatar name={'S'} src={'S'} size="sm" />
        <div className="ml-3 rtl:ml-0 rtl:mr-3">
          <Title as="h6" className="mb-0.5 !text-sm font-medium">
            Full Service
          </Title>
        </div>
      </div>
    ),
  },
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
    <BasicTableWidget
      title="What makes us unique"
      className={cn('pb-0 lg:pb-0 [&_.rc-table-row:last-child_td]:border-b-0')}
      data={data}
      getColumns={getColumns}
      noGutter
      enableSearch={false}
      scroll={{
        x: 900,
      }}
    />
  );
}
