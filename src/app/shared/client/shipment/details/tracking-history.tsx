'use client';

import Image from 'next/image';
import { Text, Badge } from 'rizzui';
import cn from '@/utils/class-names';
import { formatDate } from '@/utils/format-date';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';

const statusColors = {
  Accepted: 'info',
  'In Transit': 'secondary',
  'Out For Delivery': 'primary',
  Delivered: 'success',
};

export default function MediaTable({
  className,
  listing,
}: {
  className?: string;
  listing?: any;
}) {
  return (
    <div className='@container w-full'>
      <div className="items-center gap-2">

        <div className="">
          <div className="">
            <div className="flex 4xs:flex-col md:flex-row items-center gap-2">
              <div className='flex w-2/3 h-full'>
                <Image
                  quality={100}
                  width={325}
                  height={325}
                  alt={`image`}
                  className="object-contain rounded-lg h-auto w-full"
                  src={listing?.user?.profilePictureURL}
                />
              </div>
              <div className='flex flex-col w-full gap-2 h-full'>
                <div
                  style={{ height: 180 }}
                  className={cn(
                    'rounded-lg border border-gray-300 pl-5 @3xl:pl-7 w-full',
                    className
                  )}
                >
                  <ul className="mt-4 grid gap-3 @3xl:mt-5">
                    <li className="flex items-center gap-1">
                      <span className="font-semibold text-gray-900">{listing?.firstName} {listing?.lastName} ({listing?.role})</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span>Business: {listing?.company}</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span>Title: {listing?.title}</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span>City: {listing?.city}</span>
                    </li>
                  </ul>

                </div>

                <div
                  style={{ height: 180 }}
                  className={cn(
                    'rounded-lg border border-gray-300 pl-5 @3xl:pl-7 w-full',
                    className
                  )}
                >
                  <ul className="mt-4 grid gap-3 @3xl:mt-5">
                    <li className="flex items-center gap-1">
                      <span className="font-bold text-gray-900">Services Requested</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span>Package Interested: {listing?.packageName}</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span>General Enquiry: {listing?.general ? 'Yes' : 'No'}</span>
                    </li>
                  </ul>

                </div>
              </div>

            </div>
          </div>




          <div style={{ marginTop: '2.5%' }} className="flex 4xs:flex-col md:flex-row items-center gap-2">

            <div
              style={{ height: 200 }}
              className={cn(
                'rounded-lg border border-gray-300 pl-5 @3xl:pl-7 md:w-1/2 4xs:w-full',
                className
              )}
            >
              <ul className="mt-4 grid gap-3 @3xl:mt-5">
                <li className="flex items-center gap-1">
                  <span className="font-bold text-gray-900">Contact Information</span>
                </li>
                <li className="flex items-center gap-1">
                  <span>{listing?.email}</span>
                </li>
                <li className="flex items-center gap-1">
                  <span>Phone #: {listing?.phone}</span>
                </li>
              </ul>

            </div>




            <div
              style={{ height: 200 }}
              className={cn(
                'rounded-lg border border-gray-300 pl-5 @3xl:pl-7 md:w-1/2 4xs:w-full',
                className
              )}
            >

              <ul className="mt-4 grid gap-3 @3xl:mt-5">
                <li className="flex items-center gap-1">
                  <span className="font-bold text-gray-900">Other Information</span>
                </li>
                <li className="flex items-center gap-1">
                  <span>Website: {listing?.website}</span>
                </li>
                <li className="flex items-center gap-1">
                  <span>LinkedIn: {listing?.linkedin}</span>
                </li>
                <li className="flex items-center gap-1">
                  <span>{listing?.role === 'buyer' ? 'Interested ' : ''}Industry: {listing?.industry}</span>
                </li>
              </ul>

            </div>

          </div>


        </div>

      </div >

    </div >
  );
}
