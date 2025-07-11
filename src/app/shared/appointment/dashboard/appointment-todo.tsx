'use client';

import WidgetCard from '@/components/cards/widget-card';
import { AdvancedCheckbox, Button, Input, Badge, Title, Text } from 'rizzui';
import Image from 'next/image';
import cn from '@/utils/class-names';
import DropdownAction from '@/components/charts/dropdown-action';
import { PiArrowUpDuotone, PiBagDuotone, PiCalendarBlank, PiCheckBold, PiStopCircleDuotone, PiMicrophoneStageDuotone, PiArrowDownDuotone } from 'react-icons/pi';
import DateCell from '@/components/ui/date-cell';
import SimpleBar from 'simplebar-react';
import firebase from '@/config/firebase.config';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import MessageDetails from '@/app/shared/support/inbox/message-details';
import { currentSession } from '@/config/session';
import dynamic from 'next/dynamic';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { sellerSpan } from '@/config/seller/sellerSpan';
import { providerPackage } from '@/config/seller/packages';

const Drawer = dynamic(() => import('rizzui').then((module) => module.Drawer), {
  ssr: false,
});

type SellerSpanDrawerViewProps = {
  title: string;
  task: any,
  setOpenDrawer: any;
};

const COLORS = ['#2B7F75', '#FFD66B', '#64CCC5', '#176B87'];

const viewOptions = [
  {
    value: 'Planning',
    label: 'Planning',
  },
  // {
  //   value: 'Marketing',
  //   label: 'Marketing',
  // },
  // {
  //   value: 'Deal Closure',
  //   label: 'Deal Closure',
  // },
];



export default function AppointmentTodo({
  className,
  isFullScreen = false,
}: {
  className?: string,
  isFullScreen?: boolean
}) {
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  const currentUser = currentSession() as any;
  const { push } = useRouter() as any;
  const { data, addSellerSpanSubCollection, refresh } = sellerSpan() as any;
  const handleSelected = async (card: any) => {
    // console.log(card);
    if (card.isTemplate) {
      const newCard = await addSellerSpanSubCollection(card);
      refresh();
      push(routes.multiStep);

      localStorage.setItem('cardData', JSON.stringify(newCard));
    } else {
      localStorage.setItem('cardData', JSON.stringify(card));
      push(routes.multiStep);
    }
  }

  return (
    <WidgetCard
      title={`SellerSpan™ - Your Selling Journey`}
      titleClassName="text-gray-800 sm:text-lg font-secondary"
      headerClassName="items-center"
      className={cn('overflow-hidden bg-gray-50 @container', className)}
      action={
        <DropdownAction
          className="rounded-lg border"
          options={viewOptions}
          onChange={handleChange}
          dropdownClassName="z-[9999]"
          prefixIconClassName="hidden"
        />
      }
    >
      <div className="mt-7 mb-7" style={{
        ...(!isFullScreen ? { height: '22rem' } : { height: '100%' }),
      }}>
        <SimpleBar className="mb-12 relative -mx-3 -my-2 h-full w-[calc(100%+24px)]">
          <div className="relative mb-12 before:absolute before:start-9 before:top-3 before:z-0 before:h-[calc(100%-24px)] before:w-1 before:translate-x-0.5 before:bg-gray-200">
            {(data)?.map((item: any, index: number) => (
              <AdvancedCheckbox
                name="currency"
                value="pound"
                onClick={() => handleSelected(item)}
                disabled={item?.disabled}
                key={item?.id}
                checked={item?.status}
                className="relative z-10 mt-0.5 px-3 py-1.5"
                inputClassName="[&:checked~.rizzui-advanced-checkbox]:ring-muted [&:checked~.rizzui-advanced-checkbox>span>svg]:opacity-100 [&:checked~.rizzui-advanced-checkbox>span]:border-[#2B7F75] [&:checked~.rizzui-advanced-checkbox>div>div>strong]:line-through [&:checked~.rizzui-advanced-checkbox>div>div>strong]:text-gray-500 [&:checked~.rizzui-advanced-checkbox>div>div>strong+span]:line-through"
                contentClassName="flex w-full bg-gray-0 dark:bg-gray-50 items-center @md:px-5 px-4 py-4 rounded-lg shadow hover:shadow-md transition-shadow border-0 @md:gap-5 gap-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#D9B34E]">
                  <PiCheckBold className="fill-[#2B7F75] opacity-0" />
                </span>
                <div className="block">
                  <div className="text-gray-600">
                    <strong className="font-semibold text-gray-900">
                      {item.title}
                    </strong>{' '}
                    {/* <span>Assigned to: {item?.responsible}</span>{' '} */}

                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pt-4">
                    <span style={{ fontSize: 12 }} className="inline-block rounded-2xl font-medium text-black">
                      {item.details}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-3 pt-4">
                    {item?.section6?.nutrition ? (item?.section6?.nutrition)?.map((item: any, index: string) => (
                      <div key={index}
                        className="border rounded-lg p-1 flex inline-block flex-wrap items-center gap-1.5 pt-1.5">
                        <PiArrowUpDuotone className="shrink-0 text-base text-green" />
                        <span style={{ fontSize: 12 }} className="font-normal text-gray-500">
                          {item.label} {' '}
                          {(item?.value).slice(0, 1) === '' && <span style={{ fontSize: 12 }} className="font-normal text-green">{item?.value}</span>}
                          {(item?.value).slice(0, 1) !== '' && <span style={{ fontSize: 12 }} className="font-normal text-green">{item?.value}</span>}
                        </span>
                      </div>))
                      : null
                      // <div className="flex inline-block flex-wrap items-center gap-1.5 pt-1.5">
                      //   <PiArrowUpDuotone className="shrink-0 text-base text-green" />
                      //   <span style={{ fontSize: 12 }} className="font-normal text-gray-500">
                      //     {'Perceived Value'} {' '}
                      //     <span style={{ fontSize: 12 }} className="font-normal text-green">{'5'}</span>
                      //   </span>
                      // </div>
                    }
                  </div>
                </div>
              </AdvancedCheckbox>
            ))}
          </div>
          {isFullScreen ? null :
            <div className="fixed bottom-0 start-0 z-20 flex h-32 w-full items-end justify-center bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pb-6">
              <Button
                className="bg-gray-0 text-gray-800 shadow-md transition-shadow hover:bg-gray-0 hover:shadow dark:hover:bg-gray-0"
                rounded="lg"
                onClick={
                  () =>
                    push(routes.logistics.dashboard)
                }
              >
                View All
              </Button>
            </div>
          }
        </SimpleBar>
      </div>
    </WidgetCard>
  );
}
