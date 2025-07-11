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

export default function IndustryDetails({
  className,
  listing,
}: {
  className?: string;
  listing?: any;
}) {
  if (!listing.industries) return null;
  if (listing.industries.length === 0) return null;
  return (
    <div className='@container'>
      <div
        className={cn(
          'rounded-lg border border-gray-300 p-5 @3xl:p-7 mt-4',
          className
        )}
      >
        <span className="font-bold text-gray-900">Industry Expertise</span>
        <ul className="mt-4 grid gap-3 @3xl:mt-5">
          {(listing?.industries)?.map((industries: any, index: number) =>
          (industries.value && <li key={index} className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">• </span>
            <span>{industries?.field}</span>
          </li>)
          )}
        </ul>
      </div>
    </div>
  );
}
