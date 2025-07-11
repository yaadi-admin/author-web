'use client';

import { useState, useEffect } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';
import TrendingUpIcon from '@/components/icons/trending-up';
import { collection, getDocs } from 'firebase/firestore';
import firebase from '@/config/firebase.config'; // Ensure you have the correct path to your Firebase config

type Props = {
  className?: string;
};

const legend = [{ name: 'Income' }, { name: 'Outgoings' }];
const COLORS = ['#00766B', '#89BAB5'];
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

function CustomLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'mt-2 flex flex-wrap items-start gap-3 lg:gap-7',
        className
      )}
    >
      {legend.map((item, index) => (
        <div key={item.name} className="flex items-center gap-1.5">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: COLORS[index] }}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function CashFlow({ className }: Props) {
  const [data, setData] = useState<{ label: string; income: number; outgoing: number }[]>([]);
  const [cashflowTotal, setCashflowTotal] = useState(0);
  const [percentageGain, setPercentageGain] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState('Monthly');

  const fetchCashFlowData = async () => {
    try {
      const querySnapshot = await getDocs(collection(firebase.firestore, 'cashflow_collection'));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        label: doc.data().label,
        income: doc.data().income || 0,
        outgoing: doc.data().outgoing || 0,
      }));
      setData(fetchedData);
      const totalIncome = fetchedData.reduce((total, item) => total + item.income, 0);
      const totalOutgoing = fetchedData.reduce((total, item) => total + item.outgoing, 0);
      const totalCashflow = totalIncome - totalOutgoing;
      setCashflowTotal(totalCashflow);
      setPercentageGain(totalIncome > 0 ? ((totalIncome - totalOutgoing) / totalIncome) * 100 : 0);
      setIsLoading(false);
    } catch (error: any) {
      console.error('Error fetching cashflow data:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCashFlowData();
  }, []);

  function handleChange(viewType: string) {
    setViewType(viewType);
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Cash Flow"
      titleClassName="text-gray-700 font-normal sm:text-sm font-secondary"
      headerClassName="items-center"
      className={cn('flex h-full flex-col min-h-[28rem]', className)}
      action={
        <div className="flex gap-5">
          <CustomLegend className="hidden @[28rem]:inline-flex" />
          <DropdownAction
            onChange={handleChange}
            className="rounded-md border"
            options={viewOptions}
            dropdownClassName="z-[9999]"
          />
        </div>
      }
    >
      <div className="mb-3 mt-1 flex items-center gap-2 @[28rem]:mb-4">
        <Title as="h2" className="font-semibold">
          ${cashflowTotal.toLocaleString()}
        </Title>
        {cashflowTotal > 0 && (
          <span className="flex items-center gap-1 text-green-dark">
            <TrendingUpIcon className="h-auto w-5" />
            <span className="font-medium leading-none"> +{percentageGain.toFixed(2)}%</span>
          </span>
        )}
      </div>
      <CustomLegend className="-mt-0 mb-4 inline-flex @[28rem]:hidden" />
      <div className="w-full lg:mt-7 flex-grow">
        <SimpleBar>
          <div className="h-[24rem] w-full pt-6 @lg:pt-8">
            {isLoading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error loading data. Please try again later.</p>
            ) : data.length === 0 ? (
              <p className="text-center text-gray-500">Once your data is available, it will be reflected in the chart below.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%" minWidth={1450}>
                <ComposedChart
                  barGap={8}
                  data={data.length ? data : [{ label: 'No Data', income: 0, outgoing: 0 }]}
                  margin={{
                    left: -20,
                    top: 20,
                  }}
                  className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-bar]:translate-x-4 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 [&_.recharts-cartesian-axis.yAxis]:translate-x-2.5 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-xAxis.xAxis]:translate-x-[14px] [&_.recharts-xAxis.xAxis]:translate-y-2.5 [&_path.recharts-rectangle]:!stroke-none"
                >
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
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Bar
                    dataKey="income"
                    fill={COLORS[0]}
                    barSize={28}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    type="natural"
                    dataKey="outgoing"
                    fill={COLORS[1]}
                    barSize={28}
                    radius={[4, 4, 0, 0]}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </div>
        </SimpleBar>
      </div>
    </WidgetCard>
  );
}
