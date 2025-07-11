'use client';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WebsiteMetrics from '@/app/shared/analytics-dashboard/website-metrics/table-widget';
import AccountRetention from '@/app/shared/analytics-dashboard/account-retention';
import Acquisition from '@/app/shared/analytics-dashboard/acquisition';
import ConversionRates from '@/app/shared/analytics-dashboard/conversion-rates';
import DeviceSessions from '@/app/shared/analytics-dashboard/device-sessions';
import GoalAccomplished from '@/app/shared/analytics-dashboard/goal-accomplished';
import StatCards from '@/app/shared/analytics-dashboard/stat-cards';
import TopTrafficSource from '@/app/shared/analytics-dashboard/top-traffic-source';
import UserMetrics from '@/app/shared/analytics-dashboard/user-metrics';
import PageMetrics from '@/app/shared/analytics-dashboard/page-metric/table-widget';
import UpcomingAppointmentTable from '@/app/shared/appointment/dashboard/upcoming-appointment-table';
import { Text } from 'rizzui';
import { currentSession } from '@/config/session';
import Image from 'next/image';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import { Button, Title } from 'rizzui';
import { useListings } from '@/config/seller/useListings';
import { listings } from '@/config/buyer/listings';


export default function AnalyticsDashboard() {
  const currentUser = currentSession() as any;
  const currentListings = listings(currentUser?.id) as any;
  const { push } = useRouter();
  const [isEnabled, setIsEnabled] = useState(false); // State to control the disabled state

  useEffect(() => {
      handleStatus();
    }, [currentListings, currentUser?.id]);

  const handleStatus = async () => {
    if (!currentUser?.isIntake || currentListings.length === 0 || currentListings[0]?.status !== "active") {
      setIsEnabled(false);
      console.log('isEnabled', isEnabled);
    } else {
      setIsEnabled(true);
    }
  };

  return (
    <>
    {<div className="@container">
        <div style={{ marginTop: 20 }} className="grid grid-cols-12  gap-6 @container @[59rem]:gap-7">
          <UpcomingAppointmentTable className="col-span-full" />
      </div>
        <Text className='text-xs text-center w-full p-4 m-auto'>
          Disclaimer: Narro makes no guarantee, warranty or representation about the Investors on our site. It is your responsibility to independently confirm the claims made by individuals and companies listed here.
        </Text>
    </div>}

    </>
  );
}
