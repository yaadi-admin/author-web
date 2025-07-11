'use client';

import { Badge } from 'rizzui';

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

export default function InvoiceDetails({ product }: { product?: any }) {
  return (
    <div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-3 @3xl:p-8 @5xl:grid-cols-4">
      {/* <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
        <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
          <span className="font-semibold text-gray-900">Building SF:</span>
          <span className="text-base text-gray-900">
            4,000 sq.ft
          </span>
        </li>
        <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
          <span className="font-semibold text-gray-900">Building SF:</span>
          <span className="text-base text-gray-900">
            4,000 sq.ft
          </span>
          <Badge color="primary" rounded="md">
            Approved
          </Badge>
        </li>
      </ul> */}
      {data(product).map((item, index) => (
        <ul key={index} className="mt-3 grid gap-6 @5xl:mt-0">
          {Object.entries(item).map(([key, value]) => (
            <li key={key} className="flex items-center gap-3">
              <span className="font-semibold text-gray-900">{key}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
