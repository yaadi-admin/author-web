'use client';

import { useState, useEffect } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import WidgetCard from '@/components/cards/widget-card';
import { Progressbar } from 'rizzui';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import { CustomTooltip } from '@/components/charts/custom-tooltip';

const initialData = [
  {
    month: 'January',
    inquiry: 10,
    negotiation: 7,
    dueDiligence: 5,
    closing: 3,
    pending: 5,
  },
  {
    month: 'February',
    inquiry: 8,
    negotiation: 6,
    dueDiligence: 4,
    closing: 2,
    pending: 3,
  },
  {
    month: 'March',
    inquiry: 12,
    negotiation: 9,
    dueDiligence: 7,
    closing: 5,
    pending: 6,
  },
  {
    month: 'April',
    inquiry: 15,
    negotiation: 10,
    dueDiligence: 8,
    closing: 6,
    pending: 7,
  },
  {
    month: 'May',
    inquiry: 18,
    negotiation: 12,
    dueDiligence: 10,
    closing: 8,
    pending: 9,
  },
  {
    month: 'June',
    inquiry: 10,
    negotiation: 7,
    dueDiligence: 5,
    closing: 3,
    pending: 3,
  },
  {
    month: 'July',
    inquiry: 10,
    negotiation: 7,
    dueDiligence: 5,
    closing: 3,
    pending: 3,
  },
  {
    month: 'August',
    inquiry: 12,
    negotiation: 9,
    dueDiligence: 7,
    closing: 5,
    pending: 6,
  },
  {
    month: 'September',
    inquiry: 15,
    negotiation: 10,
    dueDiligence: 8,
    closing: 6,
    pending: 7,
  },
  {
    month: 'October',
    inquiry: 18,
    negotiation: 12,
    dueDiligence: 10,
    closing: 8,
    pending: 9,
  },
  {
    month: 'November',
    inquiry: 10,
    negotiation: 7,
    dueDiligence: 5,
    closing: 3,
    pending: 3,
  },
  {
    month: 'December',
    inquiry: 10,
    negotiation: 7,
    dueDiligence: 5,
    closing: 3,
    pending: 3,
  },
];

const fetchData = async () => {
  // Placeholder for fetching data from Firebase or other sources
  // Replace this with actual fetch logic
  return initialData;
};

export default function DealPipelineStatusTracker({ className }: { className?: string }) {
  const [data, setData] = useState(initialData);
  const isTablet = useMedia('(max-width: 800px)', false);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);

  return (
    <WidgetCard
      title="Deal Pipeline & Tracker"
      description={'A visual flowchart or timeline showing the status of each investor engagement—from initial inquiry to due diligence, negotiation, and closing.'}
      titleClassName="font-normal text-gray-500 text-normal sm:text-medium 2xl:text-normal font-secondary"
      descriptionClassName="text-sm font-normal text-gray-900 mt-1.5 font-primary 2xl:text-normal"
      className={className}
    >
      <div className="mt-5">
        <p className="text-base">65.7% converted to deal closure</p>
        <Progressbar
          value={65.5}
          rounded="md"
          color="primary"
          aria-label={'Progress bar'}
          className="mt-2 h-5"
        />
        <p className="mt-4">
          Pending Deals:{' '}
          <span className="font-semibold text-gray-900">8</span>
        </p>
      </div>
      <div className="mt-5">
        <p>Deals pending since:</p>
        <SimpleBar className="mt-4 h-40">
          <div className="h-40 w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
              {...(isTablet && { minWidth: '700px' })}
            >
              <AreaChart
                data={data}
                margin={{
                  left: -30,
                }}
                className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
              >
                <defs>
                  <linearGradient id="inquiry" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34D399" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="negotiation" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="dueDiligence" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="closing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  className=" "
                />
                <YAxis tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="inquiry"
                  stroke="#34D399"
                  strokeWidth={2}
                  fill="url(#inquiry)"
                />
                <Area
                  type="monotone"
                  dataKey="negotiation"
                  stroke="#60A5FA"
                  strokeWidth={2}
                  fill="url(#negotiation)"
                />
                <Area
                  type="monotone"
                  dataKey="dueDiligence"
                  stroke="#FBBF24"
                  strokeWidth={2}
                  fill="url(#dueDiligence)"
                />
                <Area
                  type="monotone"
                  dataKey="closing"
                  stroke="#EF4444"
                  strokeWidth={2}
                  fill="url(#closing)"
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stroke="#eab308"
                  strokeWidth={2}
                  fill="url(#pending)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SimpleBar>
      </div>
    </WidgetCard>
  );
}
