'use client';

import { useState, useEffect } from 'react';
import MetricCard from '@/components/cards/metric-card';
import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import { useAnalytics } from '@/hooks/use-analytics';

type AnalyticsData = {
  trafficData: { day: string; sale: number; cost: number }[];
  conventionRateData: { day: string; sale: number; cost: number }[];
  barData: { day: string; sale: number; cost: number }[];
  investorInteractionsData: { day: string; messages: number; downloads: number; feedback: number }[];
};

const initialData: AnalyticsData = {
  trafficData: [],
  conventionRateData: [],
  barData: [],
  investorInteractionsData: [],
};

const fetchData = async (userId: string) => {
  try {
    return {
      trafficData: [
        { day: 'Sunday', sale: 4000, cost: 2400 },
        { day: 'Monday', sale: 3000, cost: 1398 },
        { day: 'Tuesday', sale: 2000, cost: 9800 },
        { day: 'Wednesday', sale: 2780, cost: 3908 },
        { day: 'Thursday', sale: 1890, cost: 4800 },
        { day: 'Friday', sale: 2390, cost: 3800 },
        { day: 'Saturday', sale: 3490, cost: 4300 },
      ],
      conventionRateData: [
        { day: 'Sunday', sale: 2000, cost: 2400 },
        { day: 'Monday', sale: 3000, cost: 1398 },
        { day: 'Tuesday', sale: 2000, cost: 9800 },
        { day: 'Wednesday', sale: 2780, cost: 3908 },
        { day: 'Thursday', sale: 1890, cost: 4800 },
        { day: 'Friday', sale: 2390, cost: 3800 },
        { day: 'Saturday', sale: 3490, cost: 4300 },
      ],
      barData: [
        { day: 'Sunday', sale: 2000, cost: 2400 },
        { day: 'Monday', sale: 2800, cost: 1398 },
        { day: 'Tuesday', sale: 3500, cost: 9800 },
        { day: 'Wednesday', sale: 2780, cost: 3908 },
        { day: 'Thursday', sale: 1890, cost: 4800 },
        { day: 'Friday', sale: 2390, cost: 3800 },
        { day: 'Saturday', sale: 3490, cost: 4300 },
      ],
      investorInteractionsData: [
        { day: 'Sunday', messages: 50, downloads: 30, feedback: 20 },
        { day: 'Monday', messages: 60, downloads: 40, feedback: 25 },
        { day: 'Tuesday', messages: 70, downloads: 50, feedback: 30 },
        { day: 'Wednesday', messages: 80, downloads: 60, feedback: 35 },
        { day: 'Thursday', messages: 90, downloads: 70, feedback: 40 },
        { day: 'Friday', messages: 100, downloads: 80, feedback: 45 },
        { day: 'Saturday', messages: 110, downloads: 90, feedback: 50 },
      ],
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return initialData;
  }
};

export default function EngagementMetrics({ className, currentUser }: { className?: string; currentUser?: any }) {
  const [analyticsData, setAnalyticsData] = useState(initialData);
  const { getProductInterests, getProductView } = useAnalytics();
  const [interestCount, setInterestCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [engagementRate, setEngagementRate] = useState(0);

  useEffect(() => {
    async function fetchAnalyticsData() {
      if (currentUser?.id) {
        const data = await fetchData(currentUser.id);
        setAnalyticsData(data);
      }
    }

    async function getProdView() {
      try {
        const count = await getProductView(currentUser?.id);
        setViewCount(count);
      } catch (error) {
        console.error('Error fetching product views:', error);
        setViewCount(0);
      }
    }

    async function getProdInterest() {
      try {
        const count = await getProductInterests(currentUser?.id);
        setInterestCount(count);
      } catch (error) {
        console.error('Error fetching product interests:', error);
        setInterestCount(0);
      }
    }

    async function getEngagementRate() {
      try {
        const interest = await getProductInterests(currentUser?.id);
        const count = await getProductView(currentUser?.id);
        const rate = count ? (interest / count) * 100 : 0;
        setEngagementRate(rate);
      } catch (error) {
        console.error('Error fetching engagement rate:', error);
        setEngagementRate(0);
      }
    }

    if (currentUser?.id) {
      fetchAnalyticsData();
      getProdView();
      getProdInterest();
      getEngagementRate();
    }
  }, [currentUser?.id]);

  const analyticsStatData = [
    {
      id: '1',
      title: 'Matches',
      metric: viewCount ? viewCount : '0',
    },
    {
      id: '2',
      title: 'Inquiries',
      metric: interestCount ? interestCount : '0',
    },
    {
      id: '3',
      title: 'Match Rate',
      metric: engagementRate ? `${engagementRate.toFixed(2)}%` : '0%',
    },
    {
      id: '4',
      title: 'Interactions',
      metric: interestCount ? interestCount : '0',
    },
  ];

  return (
    <div className={cn('grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9', className)}>
      {analyticsStatData.map((stat) => (
        <MetricCard
          key={stat.title + stat.id}
          rounded="lg"
          className="@container @7xl:text-[15px]"
          title={stat.title}
          metric={stat.metric}
        />
      ))}
    </div>
  );
}
