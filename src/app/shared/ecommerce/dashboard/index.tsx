'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import WelcomeBanner from '@/components/banners/welcome';
import StatCards from '@/app/shared/ecommerce/dashboard/stat-cards';
import ProfitWidget from '@/app/shared/ecommerce/dashboard/profit-widget';
import SalesReport from '@/app/shared/ecommerce/dashboard/sales-report';
import BestSellers from '@/app/shared/ecommerce/dashboard/best-sellers';
import RepeatCustomerRate from '@/app/shared/ecommerce/dashboard/repeat-customer-rate';
import UserLocation from '@/app/shared/ecommerce/dashboard/user-location';
import PromotionalSales from '@/app/shared/ecommerce/dashboard/promotional-sales';
import RecentOrder from '@/app/shared/ecommerce/dashboard/recent-order';
import StockReport from '@/app/shared/ecommerce/dashboard/stock-report';
import AppointmentTodo from '@/app/shared/appointment/dashboard/appointment-todo';
import UpcomingAppointmentTable from '@/app/shared/appointment/dashboard/upcoming-appointment-table';
import AppointmentDiseases from '@/app/shared/appointment/dashboard/appointment-diseases';
import PatientAppointment from '@/app/shared/appointment/dashboard/patient-appointment';
import AppointmentStats from '@/app/shared/appointment/dashboard/appointment-stats';
import { PiSkipForwardBold } from 'react-icons/pi';
import welcomeImg from '@public/shop-illustration.png';
import RecentFiles from '@/app/shared/file/dashboard/recent-files';
import QuickAccess from '@/app/shared/file/dashboard/quick-access';
import ActivityReport from '@/app/shared/file/dashboard/activity-report';
import Members from '@/app/shared/file/dashboard/members';
import FileListTable from '@/app/shared/file/dashboard/file-list/table';
import UpgradeStorage from '@/app/shared/file/dashboard/upgrade-storage';
import RecentActivities from '@/app/shared/file/dashboard/recent-activities';
import HandWaveIcon from '@/components/icons/hand-wave';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, setDoc, addDoc, query, collection, getDocs, where, serverTimestamp } from "firebase/firestore";
import { currentSession } from '@/config/session';
import ChatList from '../../chat/inbox/message-list';
import ChatInboxTabs from '../../chat/inbox/inbox-tabs';
import { useRouter } from 'next/navigation';
import { qualibuy } from '@/config/seller/qualibuy';

interface DataFieldsType {
  id: string;
  data: any;
  // Define properties here
}

export default function EcommerceDashboard() {
  const currentUser = currentSession() as any;
  const qualiBuy = qualibuy('data') as any;
  const currentDate = new Date();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selected, setSelected] = useState({}) as any;
  const [recentUpdates, setRecentUpdates] = useState('') as any;
  const [progress, setProgress] = useState([]) as any;
  const [recentProgress, setRecentProgress] = useState({}) as any;
  const [selectedChannel, setSelectedChannel] = useState('') as any;
  const { push } = useRouter();


  return (
    <div className="@container">
      <ProfitWidget />

      <div style={{ marginTop: 10 }} className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">

        {/* Seller Span */}
        {currentUser?.isIntake && <AppointmentTodo className="col-span-full @[59rem]:col-span-12 @[90rem]:col-span-12" />}

      </div>

      {(currentUser?.isIntake || currentUser?.isQualibuy) && <div style={{ marginTop: 20 }} className="grid grid-cols-12 gap-6 @container @[59rem]:gap-7">
        {(qualiBuy?.length > 0 || currentUser?.isQualibuy) && <UpcomingAppointmentTable className="col-span-full" />}

        {currentUser?.isAnalytics && <PatientAppointment className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-7 @[90rem]:col-start-auto @[90rem]:row-start-auto" />}
        {currentUser?.isAnalytics && <AppointmentDiseases className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-5" />}
      </div>}

    </div>
  );
}
