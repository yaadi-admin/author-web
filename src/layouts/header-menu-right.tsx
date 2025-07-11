'use client';
import { Badge, ActionIcon } from 'rizzui';
import MessagesDropdown from '@/layouts/messages-dropdown';
import NotificationDropdown from '@/layouts/notification-dropdown';
import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/components/settings/settings-button';
import RingBellSolidIcon from '@/components/icons/ring-bell-solid';
import ChatSolidIcon from '@/components/icons/chat-solid';
import { notifications } from '@/config/ref/notifications';
import { messages } from '@/config/ref/messages';
import { useEffect, useState } from 'react';
import { chats } from '@/config/ref/chats';

export default function HeaderMenuRight() {
  const notification = notifications() as any;
  const { messages: message } = chats() as any;
  const [isNotification, setIsNotification] = useState(false);
  const [isMessages, setIsMessages] = useState(false)

  useEffect(() => {
    let unSeen = 0;
    if (notification?.length > 0) {
      for (let i = 0; i <= notification?.length; i++) {
        if (!notification[i]?.seen) {
          unSeen += 1;
        }
        else {
          return;
        }
      }
    }
    if (unSeen > 0) {
      setIsNotification(true);
    }
  }, [notification]);

  useEffect(() => {
    let unRead = 0;
    if (message?.length > 0) {
      for (let i = 0; i <= message?.length; i++) {
        if (!message[i]?.markedAsRead) {
          unRead += 1;
        }
        else {
          return;
        }
      }
    }
    if (unRead > 0) {
      setIsMessages(true);
    }
  }, [message]);

  return (
    <div className="ms-auto grid shrink-0 grid-cols-2 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      {/* <MessagesDropdown>
        <ActionIcon
          aria-label="Messages"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md md:h-9 md:w-9 dark:bg-gray-100"
        >
          <ChatSolidIcon className="h-[18px] w-auto" />
          {isMessages && <Badge
            renderAsDot
            color="success"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />}
        </ActionIcon>
      </MessagesDropdown> */}
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md md:h-9 md:w-9 dark:bg-gray-100"
        >
          <RingBellSolidIcon className="h-[18px] w-auto" />
          {isNotification && <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />}
        </ActionIcon>
      </NotificationDropdown>
      {/* <SettingsButton /> */}
      <ProfileMenu />
    </div>
  );
}
