'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import HourGlassIcon from '@/components/icons/hour-glass';
import WeighingScale from '@/components/icons/weighing-scale';

const initialData = [
  { name: 'Tech Industry', value: 40, color: '#3872FA' },
  { name: 'Healthcare', value: 30, color: '#eab308' },
  { name: 'Finance', value: 20, color: '#10b981' },
  { name: 'Real Estate', value: 10, color: '#FF5733' },
];

const fetchData = async () => {
  // Placeholder for fetching data from Firebase or other sources
  // Replace this with actual fetch logic
  return initialData;
};

export default function InvestorProfileAnalytics({ className }: { className?: string }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);

  return (
    <div className={cn('flex flex-col gap-5 border-0 p-0 lg:p-0', className)}>
      <div className="grid items-start rounded-lg border border-muted p-5 @xl:grid-cols-2 lg:p-7">
        <Title
          as="h3"
          className="col-span-full mb-8 text-base font-semibold sm:text-lg"
        >
          Investor Profile Analytics
        </Title>
        <div className="mb-6 w-full @3xl:w-40 @4xl:mb-0">
          <div className="mx-auto h-44 w-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart className="[&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  strokeWidth={2}
                  paddingAngle={8}
                  innerRadius={40}
                  cornerRadius={6}
                  dataKey="value"
                >
                  {data.map((item, index) => (
                    <Cell key={index} fill={item.color} stroke={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-center font-semibold text-gray-800">
            Investor Demographics
          </p>
        </div>
        <div className="">
          {data.map((item, index) => (
            <div
              key={index}
              className="mb-4 flex items-center justify-between border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-start">
                <span
                  className="me-2 h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <Title as="h5" className=" text-sm font-medium">
                  {item.name}
                </Title>
              </div>
              <Text as="span">{item.value}%</Text>
            </div>
          ))}
          <div className="mb-4 flex items-center justify-between border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0">
            <div className="flex items-center justify-start">
              <span
                className="me-2 h-2 w-2 rounded-full"
                style={{ backgroundColor: 'red' }}
              />
              <Title as="h5" className=" text-sm font-medium">
                Total Investors:
              </Title>
            </div>
            <Text as="span">100</Text>
          </div>
        </div>
      </div>
      <div className="grid gap-5 rounded-lg border border-muted p-4 @2xl:grid-cols-2 @2xl:p-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-12 w-12 items-center justify-center">
            <HourGlassIcon className="h-8 w-8" />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">Avg. Investment Size</p>
            <p>$1M - $5M</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex h-12 w-12 items-center justify-center">
            <WeighingScale className="h-8 w-8" />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">Geographical Focus</p>
            <p>North America</p>
          </div>
        </div>
      </div>
    </div>
  );
}
