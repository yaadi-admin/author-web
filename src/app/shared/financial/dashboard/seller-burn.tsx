'use client';

import { useState, useEffect } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import DropdownAction from '@/components/charts/dropdown-action';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import SimpleBar from '@/components/ui/simplebar';
import { useMedia } from '@/hooks/use-media';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { Bar, XAxis, Tooltip, ComposedChart, ResponsiveContainer } from 'recharts';
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
];

function Description({ className, insight, burnTotal }: { className?: string; insight: string; burnTotal: number }) {
  return (
    <div className={cn('mt-1 space-y-3', className)}>
      <Title as="h2" className="font-semibold text-white">
        ${burnTotal.toLocaleString()}
      </Title>
      <p className="text-gray-300 dark:text-gray-600">
        {insight || 'The rate at which your company spends its cash reserves, calculated by subtracting the current cash balance from the previous month(s) cash balance'}
      </p>
    </div>
  );
}

export default function Burn({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 820px)', false);
  const [data, setData] = useState<{ id: string; insight: string; amount?: number; label?: string }[]>([]);
  const [insight, setInsight] = useState('');
  const [burnTotal, setBurnTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState('Daily');

  const fetchBurnRateData = async () => {
    try {
      const querySnapshot = await getDocs(collection(firebase.firestore, 'burnrate_collection'));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        insight: doc.data().insight || '',
        amount: doc.data().amount,
        label: doc.data().label,
      }));
      setData(fetchedData);
      setInsight(fetchedData[0]?.insight || '');
      const totalBurn = fetchedData.reduce((total, item) => total + (item.amount || 0), 0);
      setBurnTotal(totalBurn);
      setIsLoading(false);
    } catch (error: any) {
      console.error('Error fetching burn rate data:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBurnRateData();
  }, []);

  function handleChange(viewType: string) {
    setViewType(viewType);
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Burn"
      titleClassName="text-white dark:text-gray-400 mt-[6px] font-normal sm:text-sm font-secondary"
      className={cn(
        'flex h-full flex-col @container [background:linear-gradient(29deg,#0E1012_12.96%,#6C4F3E_94.88%)]',
        className
      )}
      action={
        <DropdownAction
          prefixIconClassName="text-white"
          selectClassName="hover:text-white dark:hover:text-white"
          className="rounded-md border border-white  text-white hover:text-white dark:border-white/0"
          options={viewOptions}
          dropdownClassName="z-[9999]"
          onChange={handleChange}
        />
      }
    >
      <div className="flex h-full flex-col justify-between">
        <Description insight={insight} burnTotal={burnTotal} />
        <SimpleBar>
          <div className="h-[20rem] w-full pt-9  @lg:pt-8">
            {isLoading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error loading data. Please try again later.</p>
            ) : (
              <ResponsiveContainer
                width="100%"
                height="100%"
                {...(isTablet && { minWidth: '500px' })}
              >
                <ComposedChart
                  data={data.length ? data : [{ label: 'No Data', amount: 0 }]}
                  margin={{
                    left: 0,
                    top: 27,
                  }}
                  className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-300 dark:[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.xAxis]:translate-y-2 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-label-list]:-translate-y-1 [&_path.recharts-rectangle]:!stroke-none"
                >
                  <XAxis dataKey="label" axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Bar
                    dataKey="amount"
                    fill="#F88B11"
                    barSize={36}
                    stroke="#FF7A2F"
                    label={{ position: 'top', fill: '#DFDFDF', fontSize: 12 }}
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
