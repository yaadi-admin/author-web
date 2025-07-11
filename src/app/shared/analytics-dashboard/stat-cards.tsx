'use client';

import { useState, useEffect } from 'react';
import MetricCard from '@/components/cards/metric-card';
import cn from '@/utils/class-names';
import { useAnalytics } from '@/hooks/use-analytics';
// Import icons from an icon library
import { FaEye, FaEnvelope, FaChartLine, FaHandshake } from 'react-icons/fa';

const initialData = {
  trafficData: [],
  conventionRateData: [],
  barData: [],
  investorInteractionsData: [],
};

export default function LeadEngagementMetrics({ className, data = initialData }: { className?: string, data?: any }) {
  const [analyticsData, setAnalyticsData] = useState(data);
  const { getProductInterests, getProductView } = useAnalytics();
  const [interestCount, setInterestCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [engagementRate, setEngagementRate] = useState(0);

  useEffect(() => {
    async function getProdView() {
      try {
        const count = await getProductView(data?.id);
        setViewCount(count);
      } catch (error) {
        console.error('Error fetching product views:', error);
      }
    }
    async function getProdInterest() {
      try {
        const count = await getProductInterests(data?.id);
        setInterestCount(count);
      } catch (error) {
        console.error('Error fetching product interests:', error);
      }
    }
    async function getEngagementRate() {
      try {
        const interest = await getProductInterests(data?.id);
        const count = await getProductView(data?.id);
        const rate = (interest / count) * 100;
        setEngagementRate(rate);
      } catch (error) {
        console.error('Error fetching product interests:', error);
      }
    }
    if (data?.id) {
      getProdView();
      getProdInterest();
      getEngagementRate();
    }
  }, [data?.id, getProductView, getProductInterests]);

  // Map stat id to icons
  const iconMapping: Record<string, JSX.Element> = {
    '1': <FaEye className="text-xl mr-2" />, // Investor Views
    '2': <FaEnvelope className="text-xl mr-2" />, // Inquiries
    '3': <FaChartLine className="text-xl mr-2" />, // Engagement Rate
    '4': <FaHandshake className="text-xl mr-2" />, // Investor Interactions
  };

  const analyticsStatData = [
    {
      id: '1',
      title: 'Investor Views',
      metric: viewCount || 0,
    },
    {
      id: '2',
      title: 'Inquiries',
      metric: interestCount || 0,
    },
    {
      id: '3',
      title: 'Engagement Rate',
      metric: engagementRate || 0,
    },
    {
      id: '4',
      title: 'Investor Interactions',
      metric: interestCount || 0,
    },
  ];

  return (
    <div className={cn('grid grid-cols-2 gap-4', className)}>
      {analyticsStatData.map((stat) => (
        <MetricCard
          key={stat.id}
          metric={stat.id === '3' ? stat.metric.toFixed(2) : stat.metric}
          title={
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {iconMapping[stat.id]}
                <span className="text-base font-medium">{stat.title}</span>
              </div>
            </div>
          }
          rounded="lg"
          className="p-4"
        />
      ))}
    </div>
  );
}
