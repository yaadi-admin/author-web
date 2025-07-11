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
  // {
  //   title: <span className="ms-6 block">Amount</span>,
  //   dataIndex: 'amount',
  //   key: 'amount',
  //   width: 100,
  //   render: (amount: number) => <span className="ms-6 block">{amount}</span>,
  // },
  {
    dataIndex: 'description',
    key: 'description',
    width: 300,
    render: (description: string) => <p>{description}</p>,
  },
  // {
  //   title: <span className="block">Weight</span>,
  //   dataIndex: 'weight',
  //   key: 'weight',
  //   width: 200,
  //   render: (weight: string) => <p>{weight}</p>,
  // },
  // {
  //   title: <span className="block">Dimensions</span>,
  //   dataIndex: 'weight',
  //   key: 'weight',
  //   width: 200,
  //   render: (weight: string) => <p>{weight}</p>,
  // },
  // {
  //   title: <span className="block">Actual Value</span>,
  //   dataIndex: 'actualValue',
  //   key: 'actualValue',
  //   align: 'right',
  //   width: 150,
  //   render: (actualValue: number) => <p>{toCurrency(actualValue)}</p>,
  // },
  // {
  //   title: <span className="block">Discounted Value</span>,
  //   dataIndex: 'discountedValue',
  //   key: 'discountedValue',
  //   align: 'right',
  //   width: 200,
  //   render: (discountedValue: number) => <p>{toCurrency(discountedValue)}</p>,
  // },
  // {
  //   title: <span className="block">Tax</span>,
  //   dataIndex: 'tax',
  //   key: 'tax',
  //   align: 'right',
  //   width: 100,
  //   render: (tax: number) => <p>{toCurrency(tax)}</p>,
  // },
  // {
  //   title: <span className="me-6 block">Total</span>,
  //   dataIndex: 'total',
  //   key: 'total',
  //   align: 'right',
  //   width: 150,
  //   render: (total: number) => <p className="me-6">{toCurrency(total)}</p>,
  // },
];

export default function ExpertiseDetails({ className, product }: DeliveryDetailsProps) {

  const [data, setData] = useState([
    {
      description: product?.description,
    },
  ]);

  useEffect(() => {
    if (product) {
      const value = [];
      // value.push(...{description: product?.description});
      // console.log('product', product);
      setData([{description: product?.description}]);
    }
  }, [product]);

  return (
    <>
    <BasicTableWidget
      title="About Us"
      className={cn('pb-0 lg:pb-0 [&_.rc-table-row:last-child_td]:border-b-0')}
      data={data}
      getColumns={getColumns}
      noGutter
      enableSearch={false}
      scroll={{
        x: 900,
      }}
    />
    </>
  );
}
