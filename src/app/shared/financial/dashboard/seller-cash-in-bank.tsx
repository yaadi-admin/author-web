'use client';

import { useState, useEffect } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Line,
} from 'recharts';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import TrendingUpIcon from '@/components/icons/trending-up';
import { collection, getDocs } from 'firebase/firestore';
import firebase from '@/config/firebase.config'; // Ensure you have the correct path to your Firebase config

const viewOptions = [
  {
    value: 'Daily',
    label: 'Daily',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
  {
    value: 'Yearly',
    label: 'Yearly',
  },
];

export default function CashInBank({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 800px)', false);
  const [data, setData] = useState<{ label: string; amount: number }[]>([]);
  const [cashInBankTotal, setCashInBankTotal] = useState(0);
  const [percentageGain, setPercentageGain] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState('Monthly');

  const fetchCashInBankData = async () => {
    try {
      const querySnapshot = await getDocs(collection(firebase.firestore, 'cashinbank_collection'));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        label: doc.data().label,
        amount: doc.data().amount || 0,
      }));
      setData(fetchedData);
      const totalCashInBank = fetchedData.reduce((total, item) => total + item.amount, 0);
      setCashInBankTotal(totalCashInBank);
      setPercentageGain(totalCashInBank > 0 ? ((totalCashInBank - totalCashInBank) / totalCashInBank) * 100 : 0);
      setIsLoading(false);
    } catch (error: any) {
      console.error('Error fetching cash in bank data:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCashInBankData();
  }, []);

  function handleChange(viewType: string) {
    setViewType(viewType);
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Cash in Bank"
      titleClassName="text-gray-700 font-normal sm:text-sm font-secondary"
      headerClassName="items-center"
      action={
        <DropdownAction
          className="rounded-md border"
          options={viewOptions}
          onChange={handleChange}
          dropdownClassName="z-[9999]"
        />
      }
      className={cn('min-h-[28rem]', className)}
    >
      <div className="mb-4 mt-1 flex items-center gap-2">
        <Title as="h2" className="font-semibold">
          ${cashInBankTotal.toLocaleString()}
        </Title>
        {cashInBankTotal > 0 && (
          <span className="flex items-center gap-1 text-green-dark">
            <TrendingUpIcon className="h-auto w-5" />
            <span className="font-medium leading-none"> +{percentageGain.toFixed(2)}%</span>
          </span>
        )}
      </div>
      <SimpleBar>
        <div className="h-[27.3rem] w-full pt-9 @lg:pt-8">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error loading data. Please try again later.</p>
          ) : data.length === 0 ? (
            <p className="text-center text-gray-500">Once your data is available, it will be reflected in the chart below.</p>
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
              {...(isTablet && { minWidth: '500px' })}
            >
              <ComposedChart
                data={data.length ? data : [{ label: 'No Data', amount: 0 }]}
                margin={{
                  left: -17,
                  top: 27,
                }}
                className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.xAxis]:translate-y-2 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_path.recharts-rectangle]:!stroke-none"
              >
                <defs>
                  <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3CBA92" stopOpacity={1} />
                    <stop offset="95%" stopColor="#0BA360" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeOpacity={0.435}
                  strokeDasharray="8 10"
                />
                <XAxis dataKey="label" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(label) => `$${label}k`}
                />
                <Tooltip
                  content={
                    <CustomTooltip className="[&_.chart-tooltip-item:last-child]:hidden" />
                  }
                  cursor={false}
                />
                <Bar
                  dataKey="amount"
                  fill="#3872FA"
                  barSize={36}
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  dataKey="amount"
                  className="-translate-y-3"
                  stroke="#CDDDFE"
                  strokeWidth={3}
                  activeDot={false}
                  dot={<CustomizedDot />}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

function CustomizedDot(props: any) {
  const { cx, cy } = props;
  return (
    <svg
      x={cx - 10}
      y={cy - 7}
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="7.03906"
        cy="7"
        r="5.5"
        fill="#3872FA"
        stroke="white"
        strokeWidth="3"
      />
    </svg>
  );
}
