'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { currentSession } from '@/config/session';
import { Avatar, Text, Empty } from 'rizzui';
import cn from '@/utils/class-names';
import AvatarCard from '@/components/ui/avatar-card';

export default function ChatBody({ className, messages }: { className?: string, messages?: any }) {
  const currentUser = currentSession() as any;
  const lastMessageRef = useRef(null) as any;

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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

  if (!messages || messages.length < 1) {
    return (
      <div
        className={cn(
          '!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center',
          className
        )}
      >
        <Empty
          text="No conversations started"
          textClassName="mt-4 text-base text-gray-500"
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      {messages.map((message: any, index: number) => {
        const isSender = message?.from === currentUser?.id;

        return (
          <div
            ref={index === messages.length - 1 ? lastMessageRef : null}
            key={message.id}
            className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}
          >
            {!isSender && (
              <AvatarCard src={message.user.profilePictureURL} name={''} className="mr-2" />
            )}
            <div
              className={`max-w-xs p-3 rounded-lg ${isSender ? 'bg-green-200 text-black' : 'bg-gray-200 text-black'}`}
              style={{
                marginLeft: isSender ? '30%' : '0%',
                marginRight: isSender ? '0%' : '30%',
              }}
            >
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold">
                  {message?.firstName} {message?.lastName}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(message?.createdAt)}
                </div>
              </div>
              <Text className="mt-1">{message?.message}</Text>
            </div>
            {isSender && (
              <AvatarCard src={message.user.profilePictureURL} name={''} className="ml-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}
