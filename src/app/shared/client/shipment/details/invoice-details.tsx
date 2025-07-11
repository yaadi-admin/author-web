'use client';

import Image from 'next/image';
import { Badge, Button } from 'rizzui';
import { PiPrinterBold, PiDownloadSimpleBold, PiMessengerLogoBold } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

const data = (p: any) => [
  {
    'Building SF': '4,000 sq.ft',
    Facilities: 'Prime location with ample foot traffic',
    Employees: '10 (3 full-time, 7 part-time)',
  },
  {
    Franchise: 'Not a franchise',
    'Reason for Selling': 'Retirement',
    'Support & Training ': 'Transition assistance from the owner for up to 3 months post-sale.',
  },
  {
    'Seller Financing': 'Available',
    'Inventory': '$10,000 Included in sale price',
    'Competition': 'No nearby bookstore cafes, but 4 nearby coffee shops.',
  },
];

export default function MoreDetails({ product }: { product?: any }) {
  const { push } = useRouter();
  return (
    <div className="@container">
      <div className="flex">

        <div className="w-1/4">
          <figure className="relative">
            <Image
              // quality={100}
              height={100}
              width={100}
              alt={`image`}
              className="object-contain w-full"
              src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/Jeff%20Sarbanes%20-%20profile%20pic.png?alt=media&token=b40410db-7fdf-49ac-988e-6f9ac6800276'}
            />
          </figure>
        </div>

        {/* <div className="w-1/3" /> */}


          <div style={{marginLeft: '5%', width: 400, height: 200}}
            className='rounded-lg border border-gray-300 p-5 @3xl:p-7 '>
            {/* <Title as="h3" className="text-base font-semibold sm:text-lg">
        {title}
      </Title> */}
            <ul className="mt-4 grid gap-3 @3xl:mt-5">
              <li className="flex items-center gap-1">
              <span className="font-semibold text-gray-900">Jeff Sarbanes, CPA, CA</span>
              </li>
              <li className="flex items-center gap-1">
              <span className="font-semibold text-gray-900">Managing Partner, Sarbanes & Oxley LLP</span>
              </li>
            </ul>
          <Button style={{marginTop: '2.5%'}} variant="solid" className="w-full gap-2 @lg:w-auto">
            <PiMessengerLogoBold className="h-4 w-4" />
            Request Services
          </Button>
          </div>
        
        </div>
    </div>
  );
}
