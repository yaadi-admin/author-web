'use client';

import { RefObject, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Popover, Title, Badge, Checkbox, Text, Empty } from 'rizzui';
import Link from 'next/link';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import { PiCheck } from 'react-icons/pi';
import BrushSolidIcon from '@/components/icons/brush-solid';
import { notifications } from '@/config/ref/notifications';

dayjs.extend(relativeTime);

function NotificationsList({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const notification = notifications() as any;
  const formatDate = (createdAt: any) => {
    if (!createdAt) {
      return ''; // Return an empty string if createdAt is null or undefined
    }

    const date = new Date(createdAt * 1000);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const timeZoneOffset = date.getTimezoneOffset() / 60; // Convert minutes to hours
    const timeZone = timeZoneOffset < 0 ? "+" : "-"; // Determine if timezone is ahead or behind UTC
    const timeZoneHours = Math.abs(timeZoneOffset);

    return `${month} ${day} @ ${hours}:${minutes}`;
  }

  const isEmpty = notifications.length === 0;

  const allMessagesSeen = notification.map(
    (notif: { seen: boolean }) => notif.seen
  ).every((val: boolean) => val === true)

  return (
    <div className="4xs:w-[270px] xs:w-[320px] text-left sm:w-[360px] 2xl:w-[420px] rtl:text-right">
      <div className="mb-3 flex items-center justify-between ps-6">
        <Title as="h5" fontWeight="semibold">
          Notifications
        </Title>
        {!allMessagesSeen || !isEmpty &&
          <Checkbox
            size="sm"
            label="Mark all as read"
            labelWeight="normal"
            labelClassName="text-sm"
          />
        }
        {isEmpty &&
          <Text>No Notifications</Text>
        }
      </div>
      <SimpleBar className="max-h-[420px]">
        <div className="grid cursor-pointer grid-cols-1 gap-1 ps-4">
          {notification?.map((item: any) => (
            <div
              key={item?.title + item?.id}
              className="group grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-2 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded bg-gray-100/70 p-1 dark:bg-gray-50/50 [&>svg]:h-auto [&>svg]:w-5">
                <BrushSolidIcon />
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                <div className="w-full">
                  <Text className="mb-0.5 w-11/12 truncate text-sm font-semibold text-gray-900 dark:text-gray-700">
                    {item?.title}
                  </Text>
                  <Text className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                    {formatDate(item?.createdAt)}
                  </Text>
                </div>
                <div className="ms-auto flex-shrink-0">
                  {!(item?.seen) ? (
                    <Badge
                      renderAsDot
                      size="lg"
                      color="primary"
                      className="scale-90"
                    />
                  ) : (
                    <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                      <PiCheck className="h-auto w-[9px]" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SimpleBar>
      {/* <Link
        href={'#.'}
        onClick={() => setIsOpen(false)}
        className="-me-6 block px-6 pb-0.5 pt-3 text-center hover:underline"
      >
        View All Activity
      </Link> */}
    </div>
  );
}

export default function NotificationDropdown({
  children,
}: {
  children: JSX.Element & { ref?: RefObject<any> };
}) {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
    >
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content className="z-[9999] px-0 pb-4 pe-6 pt-5 dark:bg-gray-100 [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex">
        <NotificationsList setIsOpen={setIsOpen} />
      </Popover.Content>
    </Popover>
  );
}
