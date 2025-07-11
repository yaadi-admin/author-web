'use client';

import cn from '@/utils/class-names';
import Image from 'next/image';

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
    <div className='@container'>
      <div className="card-container rounded-lg p-5 @3xl:p-7">
        <div className="flex flex-col md:flex-row gap-2 justify-around">
          <figure className="relative">
            <Image
              quality={100}
              width={325}
              height={325}
              alt={`image`}
              className="object-contain 4xs:w-40 h-auto md:w-auto"
              src={listing?.logo}
            />
          </figure>
          <div
            className={cn(
              'rounded-lg px-5',
              className
            )}
          >
            <span className="font-bold text-gray-900 text-3xl">Areas of expertise</span>

            <ul className="grid gap-3 @3xl:mt-5 h-48 overflow-y-auto">
              {(listing?.expertise)?.length > 0 ?
                (listing?.expertise)?.map((expertise: any, index: number) =>
                (expertise.value && <li key={index} className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900">• </span>
                  <span>{expertise?.field}</span>
                </li>)
                ) : <li className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900">• </span>
                  <span>Financial statement preparation and analysis</span>
                </li>
              }
            </ul>
          </div>
          <div className={cn('rounded-lg px-5', className)}>
            <span className="font-bold text-gray-900 text-3xl">Additional Information</span>
            <ul className="grid mt-4 gap-3">
              <li className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">Category: </span>
                <span className="text-gray-900">{listing?.category}</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">Years in Business: </span>
                <span>{listing?.yearInBusiness}</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">Number of Professionals: </span>
                <span>{listing?.employeeCount}</span>
              </li>
              <li className="flex text-gray-900 font-semibold items-center gap-1">
                <span>{listing?.cib ? listing?.cib : listing?.cob},</span>
                <span className="">{listing?.province}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>


    </div>
  );
}
