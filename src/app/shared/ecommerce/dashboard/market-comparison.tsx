'use client';

import { useState, useEffect } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { DatePicker } from '@/components/ui/datepicker';
import { Badge, Text } from 'rizzui';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';

const initialData = [
  {
    month: 'Jan',
    currentPrice: 2000,
    otherPrice: 2100,
    currentConversionRate: 2.5,
    otherConversionRate: 2.7,
    currentTimeToSale: 30,
    otherTimeToSale: 28,
  },
  {
    month: 'Feb',
    currentPrice: 2200,
    otherPrice: 2300,
    currentConversionRate: 3.0,
    otherConversionRate: 3.2,
    currentTimeToSale: 28,
    otherTimeToSale: 26,
  },
  {
    month: 'Mar',
    currentPrice: 2500,
    otherPrice: 2600,
    currentConversionRate: 3.5,
    otherConversionRate: 3.7,
    currentTimeToSale: 25,
    otherTimeToSale: 23,
  },
  {
    month: 'Apr',
    currentPrice: 2400,
    otherPrice: 2500,
    currentConversionRate: 3.2,
    otherConversionRate: 3.4,
    currentTimeToSale: 27,
    otherTimeToSale: 25,
  },
  {
    month: 'May',
    currentPrice: 2600,
    otherPrice: 2700,
    currentConversionRate: 3.8,
    otherConversionRate: 4.0,
    currentTimeToSale: 24,
    otherTimeToSale: 22,
  },
  {
    month: 'Jun',
    currentPrice: 2700,
    otherPrice: 2800,
    currentConversionRate: 4.0,
    otherConversionRate: 4.2,
    currentTimeToSale: 22,
    otherTimeToSale: 20,
  },
  {
    month: 'Jul',
    currentPrice: 2800,
    otherPrice: 2900,
    currentConversionRate: 4.2,
    otherConversionRate: 4.4,
    currentTimeToSale: 20,
    otherTimeToSale: 18,
  },
  {
    month: 'Aug',
    currentPrice: 2900,
    otherPrice: 3000,
    currentConversionRate: 4.5,
    otherConversionRate: 4.7,
    currentTimeToSale: 18,
    otherTimeToSale: 16,
  },
  {
    month: 'Sep',
    currentPrice: 3000,
    otherPrice: 3100,
    currentConversionRate: 4.8,
    otherConversionRate: 5.0,
    currentTimeToSale: 16,
    otherTimeToSale: 14,
  },
  {
    month: 'Oct',
    currentPrice: 3100,
    otherPrice: 3200,
    currentConversionRate: 5.0,
    otherConversionRate: 5.2,
    currentTimeToSale: 14,
    otherTimeToSale: 12,
  },
  {
    month: 'Nov',
    currentPrice: 3200,
    otherPrice: 3300,
    currentConversionRate: 5.2,
    otherConversionRate: 5.4,
    currentTimeToSale: 12,
    otherTimeToSale: 10,
  },
  {
    month: 'Dec',
    currentPrice: 3300,
    otherPrice: 3400,
    currentConversionRate: 5.5,
    otherConversionRate: 5.7,
    currentTimeToSale: 10,
    otherTimeToSale: 8,
  },
];

const fetchData = async () => {
  // Placeholder for fetching data from Firebase or other sources
  // Replace this with actual fetch logic
  return initialData;
};

export default function MarketBenchmarking({
  className,
}: {
  className?: string;
}) {
  const [data, setData] = useState(initialData);
  const isTablet = useMedia('(max-width: 820px)', false);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);

  const [startDate, setStartDate] = useState<Date | null>(null);
  return (
    <WidgetCard
      title={'Market Benchmark & Insights'}
      description={
        <>
          <Badge renderAsDot className=" ms-1 bg-[#10b981]" /> Current Listing
          <Text as="span" className="hidden xs:inline-flex">
            (USD)
          </Text>
          <Badge renderAsDot className="me-1 ms-4 bg-[#0470f2]" /> Other Listings{' '}
          <Text as="span" className="hidden xs:inline-flex">
            (USD)
          </Text>
        </>
      }
      descriptionClassName="text-gray-500 mt-1.5"
      action={
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          dateFormat="yyyy"
          placeholderText="2025"
          showYearPicker
          inputProps={{ variant: 'text', inputClassName: 'p-0 px-1 h-auto' }}
          popperPlacement="bottom-end"
          className="w-[100px]"
        />
      }
      className={className}
    >
      <SimpleBar>
        <div className="h-[480px] w-full pt-9">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '700px' })}
          >
            <AreaChart
              data={data}
              margin={{
                left: -16,
              }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <defs>
                <linearGradient id="currentPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffdadf" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="otherPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dbeafe" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3872FA" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="currentConversionRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffedd5" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="otherConversionRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dbeafe" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3872FA" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="currentTimeToSale" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffedd5" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="otherTimeToSale" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dbeafe" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3872FA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className=" "
              />
              <YAxis axisLine={false} tickLine={false} className=" " />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="natural"
                dataKey="currentPrice"
                stroke="#10b981"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#currentPrice)"
              />
              <Area
                type="natural"
                dataKey="otherPrice"
                stroke="#3872FA"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#otherPrice)"
              />
              <Area
                type="natural"
                dataKey="currentConversionRate"
                stroke="#f97316"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#currentConversionRate)"
              />
              <Area
                type="natural"
                dataKey="otherConversionRate"
                stroke="#3872FA"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#otherConversionRate)"
              />
              <Area
                type="natural"
                dataKey="currentTimeToSale"
                stroke="#f97316"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#currentTimeToSale)"
              />
              <Area
                type="natural"
                dataKey="otherTimeToSale"
                stroke="#3872FA"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#otherTimeToSale)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}
