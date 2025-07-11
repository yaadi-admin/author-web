'use client';

import cn from '@/utils/class-names';
import { toCurrency } from '@/utils/to-currency';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { useEffect, useState } from 'react';

interface DeliveryDetailsProps {
  className?: string;
  product: any;
}

export const getColumns = () => [
  {
    dataIndex: 'description',
    key: 'description',
    width: 300,
    render: (description: string) => <p>{description}</p>,
  },
];

export default function ShippingDetails({ className, product }: DeliveryDetailsProps) {
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setData(product);
    } else {
      setError('Error loading product details. Please try again later.');
    }
  }, [product]);

  return (
    <div className={cn('w-full', className)}>
      <div className='p-4'>
        <h4 className='mb-6 mt-4' style={{ borderBottomWidth: 0 }}>About the business</h4>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>{data?.aboutTheBusiness}</p>
        )}
      </div>
    </div>
  );
}
