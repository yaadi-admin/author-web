'use client';

import { useState, useRef, useEffect } from 'react';
import { Title, Badge, Empty, Avatar } from 'rizzui';
import cn from '@/utils/class-names';
import { useHover } from '@/hooks/use-hover';
import {
  MessageType,
} from '@/data/support-inbox';
import SimpleBar from '@/components/ui/simplebar';
import { currentSession } from '@/config/session';
import { chats } from '@/config/ref/chats';
import ChatDetails from './message-details';
import { PiEnvelopeBold, PiEnvelopeOpen } from 'react-icons/pi';

const sortOptions = {
  asc: 'asc',
  desc: 'desc',
} as const;

const options = [
  {
    value: sortOptions.asc,
    label: 'Oldest',
  },
  {
    value: sortOptions.desc,
    label: 'Newest',
  },
];

const sortByDate = (items: MessageType[], order: SortByType) => {
  return items.slice().sort((a, b) => {
    const dateA = new Date(a.date).valueOf();
    const dateB = new Date(b.date).valueOf();

    if (order === 'asc') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
};

interface InboxListProps {
  className?: string;
  selectedChannel?: string;
  setSelectedChannel?: (channel: string) => void;
}
type SortByType = keyof typeof sortOptions;

interface ChatInboxProps {
  userId?: string
}

export default function ChatInbox(props: ChatInboxProps) {
  const { userId } = props;
  const { messages: messageRef, specificMessages } = chats(userId) as any;
  const [selectedChannel, setSelectedChannel] = useState('') as any;

  const messagesDb = userId ? specificMessages : messageRef;
  useEffect(() => {
    if (messagesDb) {
      setSelectedChannel(messagesDb?.[0]?.channel || '');
    }
  }, [messagesDb])

  const currentMessage = messagesDb.find((message: { channel: string; }) => message.channel === selectedChannel);;
  return (
    <div className="@container mt-[-40px]">
      <div className="mt-5 items-start @container @2xl:mt-9 @4xl:grid @4xl:grid-cols-12 @4xl:gap-7 @[1550px]:grid-cols-11">

        <div className='@xs:col-span-12 @4xl:col-span-4 @[1550px]:col-span-3'>
          <div className={cn('sticky')}>
            <div className="overflow-hidden rounded-lg border border-muted">
              <SimpleBar className="max-h-[calc(100dvh-356px)] md:max-h-[calc(100dvh-311px)] lg:max-h-[calc(100dvh-240px)] xl:max-h-[calc(100dvh-230px)] 2xl:max-h-[calc(100dvh-240px)] 3xl:max-h-[calc(100dvh-270px)]">
                {messagesDb?.map((message: any) => (
                  <MessageItem
                    selectedChannel={selectedChannel}
                    setSelectedChannel={setSelectedChannel}
                    key={message.id}
                    message={message}
                  />
                ))}
              </SimpleBar>
            </div>
          </div>
        </div>

        {selectedChannel ? <ChatDetails
          className='col-span-8'
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          message={currentMessage}
        /> : <div className='relative pt-6 lg:rounded-lg lg:border lg:border-muted lg:px-4 lg:py-7 xl:px-5 xl:py-5 2xl:pb-7 2xl:pt-6 col-span-8'>
          <div className='flex flex-row justify-center'>
            <div className='p-4 2xl:p-5'>
              <Empty
                text="Select message"
                textClassName="mt-4 text-base text-gray-500"
              />
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}

interface MessageItemProps {
  message?: any;
  className?: string;
  selectedChannel?: any;
  setSelectedChannel: (id: string) => void;
}

export function MessageItem({ className, message, setSelectedChannel, selectedChannel }: MessageItemProps) {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const currentUser = currentSession() as any;
  const isActive = message.id === selectedChannel;
  const handleItemChange = (itemId: string) => {
    setSelectedChannel(itemId);
  };

  const formatDate = (createdAt: any) => {
    if (!createdAt) {
      return ''; // Return an empty string if createdAt is null or undefined
    }

    const date = new Date(createdAt * 1000);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${month} ${day} at ${hours}:${minutesStr} ${ampm}`;
  }

  return (
    <div
      id={message?.id}
      ref={hoverRef}
      onClick={() => handleItemChange(message.id)}
      className={cn(
        className,
        'flex cursor-pointer border-t border-muted p-5',
        isActive && 'border-t-3 border-t-primary dark:bg-gray-100/70 bg-gray-100 '
      )}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <Title as="h4" className="flex items-center gap-2">
          <Avatar 
            src={currentUser?.id === message?.userID ? message?.toUser?.profilePictureURL : message?.profilePictureURL} 
            size="sm"
            name={currentUser?.id === message?.userID ? `${message?.toUser?.firstName} ${message?.toUser?.lastName}` : `${message?.firstName} ${message?.lastName}`}
          />
          <span className="text-sm font-semibold dark:text-gray-700">
            {currentUser?.id === message?.userID ? message?.toUser?.firstName : message?.firstName} {currentUser?.id === message?.userID ? message?.toUser?.lastName : message?.lastName}
          </span>
          {message.status === 'unread' ? (
            <PiEnvelopeBold className="ml-2 text-blue-500" />
          ) : (
            <PiEnvelopeOpen className="ml-2 text-gray-500" />
          )}
        </Title>
        <span className="text-xs text-gray-500">
          {formatDate(message?.date)}
        </span>
      </div>
    </div>
  );
}