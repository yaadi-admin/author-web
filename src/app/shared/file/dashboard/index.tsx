'use client';

import { useState } from 'react';
import StorageReport from '@/app/shared/file/dashboard/storage-report';
import FileStats from '@/app/shared/file/dashboard/file-stats';
import StorageSummary from '@/app/shared/file/dashboard/storage-summary';
import RecentFiles from '@/app/shared/file/dashboard/recent-files';
import QuickAccess from '@/app/shared/file/dashboard/quick-access';
import ActivityReport from '@/app/shared/file/dashboard/activity-report';
import Members from '@/app/shared/file/dashboard/members';
import FileListTable from '@/app/shared/file/dashboard/file-list/table';
import UpgradeStorage from '@/app/shared/file/dashboard/upgrade-storage';
import RecentActivities from '@/app/shared/file/dashboard/recent-activities';
import MessageDetails from '@/app/shared/support/inbox/message-details';
import CashInBank from '@/app/shared/financial/dashboard/cash-in-bank';
import BudgetStatus from '@/app/shared/financial/dashboard/budget-status';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import toast from 'react-hot-toast';
import cn from '@/utils/class-names';
import { PiListNumbersBold, PiFilesBold, PiMessengerLogoBold, PiDownloadSimpleLight } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button, Badge, Text } from 'rizzui';
import Link from 'next/link';
import PageHeader from '@/app/shared/page-header';
import HourGlassIcon from '@/components/icons/hour-glass';
import WeighingScale from '@/components/icons/weighing-scale';
import MonthlySalesGrowth from '../../executive/monthly-sales-growth';
import Forecast from '../../executive/forecast';
import StatsCards from '../../executive/stats-cards';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const pageHeader = {
  // title: data?.title,
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      href: routes.file?.dashboard,
      name: 'CIS',
    },
  ],
};

export default function FileDashboard() {
  const { push } = useRouter();
  const [selected, setSelected] = useState('summary');
  const handleSelected = (value: string) => {
    if (value === 'summary') setSelected('summary');
    if (value === 'cim') setSelected('cim');
    if (value === 'scorecard') setSelected('scorecard');
  };

  // const { push } = useRouter();

  const handleScheduleCall = () => {
    toast.success("Successfully Scheduled Call", {
      position: "bottom-center",
    });
    // push(routes.file.dashboard);
  }

  return (
    <div className="@container">
      <PageHeader title={'Confidential Investment Story'} breadcrumb={[]} />
      <div className="flex">
        <div style={{ marginTop: '-3%', marginBottom: '5%' }} className="w-2/3 mt-6 flex items-center @2xl:mt-0">
          <Button style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, height: selected === "summary" ? 50 : 40 }} onClick={() => handleSelected("summary")} className="w-full @lg:w-auto" variant={selected === "summary" ? "solid" : "outline"}>
            {/* <PiFilesBold className="h-4 w-4" /> */}
            Summary
          </Button>
          <Button style={{ borderRadius: 0, height: selected === "cim" ? 50 : 40 }} onClick={() => handleSelected("cim")} className="w-full @lg:w-auto" variant={selected === "cim" ? "solid" : "outline"}>
            {/* <PiMessengerLogoBold className="h-4 w-4" /> */}
            CIM
          </Button>
          <Button style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0, height: selected === "scorecard" ? 50 : 40 }} onClick={() => handleSelected("scorecard")} className="w-full gap-2 @lg:w-auto" variant={selected === "scorecard" ? "solid" : "outline"}>
            {/* <PiListNumbersBold className="h-4 w-4" /> */}
            Scorecard
          </Button>
        </div>

        <div style={{ marginTop: '-3%', marginBottom: '5%' }} className="w-1/3 mt-6 flex gap-3 items-center @2xl:mt-0">
          <Button style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, height: 50 }} onClick={() => push(routes.searchAndFilter.provider)} className="w-full @lg:w-auto" variant={"outline"}>
            Hire M&A Advisor
          </Button>
          <Button style={{ borderRadius: 0, height: 40 }} onClick={handleScheduleCall} className="w-full @lg:w-auto" variant={"solid"}>
            Schedule Call
          </Button>
        </div>
      </div>

      <div className="flex">
        <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="w-2/3 overflow-auto h-screen">


          {/* Summary Section */}
          {selected === "summary" && <div className="space-y-2.5">
            <video width="100%" height="315" poster='https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/CIS%20Trailer%20Summary%20Page.png?alt=media&token=63cb7688-be0a-470f-9d08-5a99e7d0a0c6' controls={true}>
              <source src="https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/FOR%20SALE!%20Toronto%20Bookstore%20Cafe.mp4?alt=media&token=f021461f-d977-4893-993c-bc66408cced9" type="video/mp4" />
              Your browser does not support the video.
            </video>

            <div className="grid gap-5 rounded-lg border border-muted p-4 @2xl:p-6">
              <div className="flex items-center gap-2.5">
                <div>
                  <p style={{ marginTop: '5%', marginBottom: '5%', fontWeight: 'bold', fontSize: 20 }} className="text-base font-semibold text-gray-900 space-y-2.5">Deal Readiness</p>
                  <p style={{ marginBottom: '5%', }}>• Recast Financials for SDE:
                    <Badge
                      variant="flat"
                      color="success"
                      rounded="md"
                      className="mb-3 md:mb-2"
                    >
                      Yes
                    </Badge>
                  </p>
                  <p style={{ marginBottom: '5%', }}>• 5 Years Tax Filings Submitted:
                    <Badge
                      variant="flat"
                      color="success"
                      rounded="md"
                      className="mb-3 md:mb-2"
                    >
                      Yes
                    </Badge>
                  </p>
                  <p style={{ marginBottom: '5%', }}>• Transition Plan Uploaded: <Badge
                    variant="flat"
                    color="success"
                    rounded="md"
                    className="mb-3 md:mb-2"
                  >
                    Yes
                  </Badge>
                  </p>
                  <p style={{ marginBottom: '5%', }}>• SOPs Documented: <Badge
                    variant="flat"
                    color="success"
                    rounded="md"
                    className="mb-3 md:mb-2"
                  >
                    Yes
                  </Badge>
                  </p>
                  <p>• Management Team Ready: <Badge
                    variant="flat"
                    color="success"
                    rounded="md"
                    className="mb-3 md:mb-2"
                  >
                    Yes
                  </Badge>
                  </p>
                </div>
              </div>
            </div>

            <p style={{ marginTop: '5%', marginBottom: '5%', fontWeight: 'bold', fontSize: 20 }} className="text-base font-semibold text-gray-900 space-y-7.5">What&apos;s Exciting about Nook Cafe & Book Store</p>

            <div className="grid gap-5 rounded-lg border border-muted p-4 @2xl:p-6">
              <div className="flex items-center gap-2.5">
                <div>
                  <p style={{ marginBottom: '5%', }} className="text-base font-semibold text-gray-900 space-y-2.5">Strengths</p>
                  <p style={{ marginBottom: '2.5%', }}>• Prime location with ample parking.</p>
                  <p style={{ marginBottom: '2.5%', }}>• Strong, loyal customer base, membership
                    program with 4,000 members.</p>
                  <p style={{ marginBottom: '2.5%', }}>• Consistent growth in sales year-over-year.</p>
                  <p style={{ marginBottom: '2.5%', }}>• Established supply chain relationships for both
                    books and café items.</p>
                  <p style={{ marginBottom: '2.5%', }}>• Fully trained staff, willing to stay post-sale.</p>
                  <p style={{ marginBottom: '2.5%', }}>• Excellent online reviews and active social media
                    presence.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 rounded-lg border border-muted p-4 @2xl:p-6">
              <div className="flex items-center gap-2.5">
                <div>
                  <p style={{ marginBottom: '5%', }} className="text-base font-semibold text-gray-900 space-y-2.5">Opportunities</p>
                  <p style={{ marginBottom: '2.5%', }}>• Expansion of café menu to increase sales.</p>
                  <p style={{ marginBottom: '2.5%', }}>• Implementation of online sales platform for books.</p>
                  <p style={{ marginBottom: '2.5%', }}>• Hosting more in-store events and workshops.</p>
                  <p style={{ marginBottom: '2.5%', }}>• Collaboration with local businesses for joint
                    promotions.</p>
                </div>
              </div>
            </div>

          </div>}


          {/* CIM Section */}
          {selected === "cim" && <div className="space-y-2.5">
            <p style={{ marginTop: '5%', marginBottom: '5%', fontWeight: 'bold', fontSize: 20 }} className="text-base font-semibold text-gray-900 space-y-7.5">Confidential Investment Memo</p>
            <div>
              <embed src="https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/CIM%20-%20The%20Nook%20Bookstore-Cafe.pdf?alt=media&token=25c5cebb-9e91-4d5f-853b-89de2ff99556" type="application/pdf" width="100%" height="400" />
            </div>
            <div style={{ marginTop: '5%', marginBottom: '5%', }} className="flex">
              <div className="w-2/3">
                <Button className="w-full gap-2 @lg:w-auto" variant={"solid"}>
                  <PiDownloadSimpleLight className="h-4 w-4" />
                  Download Financial (.xlsx)
                </Button>
              </div>

              <div className="w-1/3">

                <Button className="w-full gap-2 @lg:w-auto" variant={"solid"}>
                  <PiDownloadSimpleLight className="h-4 w-4" />
                  Download C.I.M
                </Button>
              </div>
            </div>

            <p style={{ marginTop: '5%', marginBottom: '5%', fontWeight: 'bold', fontSize: 20 }} className="text-base font-semibold text-gray-900 space-y-7.5">Company Walkthrough</p>

            <video width="100%" height="315" poster='https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/The%20Nook%20Walkthrough%20(1).png?alt=media&token=58621135-db80-461c-9c80-c5d99ebd38db' controls={true}>
              <source src="https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/Introducing%20QualiBuy!.mp4?alt=media&token=a4b3d646-43e3-4158-9738-50a8d781707b" type="video/mp4" />
              Your browser does not support the video.
            </video>

            <div style={{ marginTop: '5%', marginBottom: '5%', }}>
              <p style={{ marginTop: '5%', marginBottom: '5%', fontWeight: 'bold', fontSize: 20 }} className="text-base font-semibold text-gray-900 space-y-7.5">What Customers Say</p>
              <Image src="https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/Screen%20Shot%202024-02-27%20at%206.52.30%20PM.png?alt=media&token=f3c5b3b4-0258-421b-a52c-049092428a39" alt="Cafe Bookstore Youtube Thumbnail" width={'600'} height={'500'} />
              {/* <RecentActivities /> */}
            </div>
          </div>}



          {/* Scorecard Section */}
          {selected === "scorecard" && <div className="space-y-2.5">
            {/* <MonthlySalesGrowth /> */}
            <StatsCards />
            <Forecast />
          </div>}
        </div>

        <div style={{ marginTop: '0%' }} className="sticky top-0 ml-10 right-0 z-10 -mb-8 flex items-center justify-end gap-4 bg-white px-4 py-4 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50">
          <div style={{ marginTop: '-45%' }}>
            <MessageDetails />
          </div>
        </div>
      </div>
      <Text className='text-xs text-center w-full p-4 m-auto mt-4'>
        The information in this listing has been provided by the business seller or representative stated above. Narro has not independently verified any of the information about the business, and assumes no responsibility for its accuracy or completeness.
        <br />
        <br />
        The Confidential Investment Story and its contents, including the Confidential Investment Memo is confidential and private information provided by the Seller to you upon successful completion of Qualibuy and is not meant to be distributed to any other parties. In accordance with the NDA you&apos;ve signed, kindly do not disclose this information with other parties. If you are not the intended recipient of this Confidential Investment Story please contact us immediately at info@thenarro.com
        <br />
        <br />
        Read Narro&amp;s
        <Link
          href="https://drive.google.com/file/d/1DLOhQ5a_dd0e29rIHCDtdGYiRdu2k4Ug/view"
          passHref
          target="_blank"
        >
          <span className="mx-1 cursor-pointer text-blue hover:underline">
            Terms of Use
          </span>
        </Link>
        before responding to any listing.
      </Text>
    </div>
  );
}
