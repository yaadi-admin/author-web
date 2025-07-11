'use client';

import InboxTabs from '@/app/shared/support/inbox/inbox-tabs';
import MessageList from '@/app/shared/support/inbox/message-list';
import ChatList from '../../chat/inbox/message-list';
import ChatInboxTabs from '../../chat/inbox/inbox-tabs';
import { useState } from 'react';

export default function SupportInbox() {
  const [selectedChannel, setSelectedChannel] = useState('');
  return (
    <div className="@container">
      <div className="mt-5 items-start @container @2xl:mt-9 @4xl:grid @4xl:grid-cols-12 @4xl:gap-7 @[1550px]:grid-cols-11">
        <ChatList selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} className="@xs:col-span-12 @4xl:col-span-4 @[1550px]:col-span-3" />
        <ChatInboxTabs selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} className="hidden @4xl:col-span-8 @4xl:block @[1550px]:col-span-8" />
      </div>
    </div>
  );
}
