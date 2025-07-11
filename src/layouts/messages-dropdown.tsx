'use client';

import Link from 'next/link';
import { RefObject, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Title, Text, Popover, Avatar, Badge } from 'rizzui';
import cn from '@/utils/class-names';
import { routes } from '@/config/routes';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import { PiCheck } from 'react-icons/pi';
import { messagesData } from '@/data/messages';
import { useRouter } from 'next/navigation';
import { currentSession } from '@/config/session';
import { chats } from '@/config/ref/chats';
import { messages } from '@/config/ref/messages';

dayjs.extend(relativeTime);

function MessagesList({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { push } = useRouter();
  const currentUser = currentSession() as any;
  const { messages: chat } = chats() as any;
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
  return (
    <div className="4xs:w-[270px] xs:w-[320px] text-left sm:w-[360px] 2xl:w-[420px] rtl:text-right">
      <div className="mb-2 flex items-center justify-between ps-6">
        <Title as="h5" fontWeight="semibold">
          Messages
        </Title>
        {chat?.length > 0 ? <Link
          href={routes.chat.inbox}
          onClick={() => setIsOpen(false)}
          className="hover:underline"
        >
          View all
        </Link> : <Text>No Messages</Text>}
      </div>
      <SimpleBar className="max-h-[406px]">
        <div className="grid grid-cols-1 ps-4">
          {chat?.map((item?: any) => (
            <div
              onClick={() => push(routes.chat.inbox)}
              key={item.title + item.id}
              className="group grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-2.5 rounded-md px-2 py-2.5 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
            >
              <div className={cn('relative', item?.toUser?.user?.profilePictureURL !== undefined && 'me-1')}>
                <Avatar
                  src={item?.user?.profilePictureURL}
                  name={item?.user?.firstName}
                  className={cn(
                    item?.toUser?.user?.profilePictureURL !== undefined &&
                    'relative -end-1 -top-0.5 !h-9 !w-9'
                  )}
                />
                {item?.toUser?.profilePictureURL && (
                  <Avatar
                    src={item?.toUser?.user?.profilePictureURL}
                    name={item?.toUser?.user?.firstName}
                    className="absolute -bottom-1 end-1.5 !h-9 !w-9 border-2 border-gray-0 dark:border-gray-100"
                  />
                )}
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                <div className="w-full">
                  <Text className="mb-0.5 w-11/12 truncate text-sm font-semibold text-gray-900 dark:text-gray-700">
                    {item?.from !== currentUser?.id ? (item?.user?.firstName + ' ' + item?.user?.lastName) : (item?.toUser?.user?.firstName + ' ' + item?.toUser?.user?.lastName)}
                  </Text>
                  <div className="flex">
                    <Text className="w-10/12 truncate pe-7 text-xs text-gray-500">
                      {item?.summary}
                    </Text>
                    <Text className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                      {formatDate(item?.createdAt)}
                    </Text>
                  </div>
                </div>
                <div className="ms-auto flex-shrink-0">
                  {item?.markedAsRead ? (
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
    </div>
  );
}

export default function MessagesDropdown({
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
      <Popover.Content className="z-[9999] pb-6 pe-6 ps-0 pt-5 dark:bg-gray-100 [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex">
        <MessagesList setIsOpen={setIsOpen} />
      </Popover.Content>
    </Popover>
  );
}
