'use client';

import { useModal } from "@/app/shared/modal-views/use-modal";
import AvatarCard from "@/components/ui/avatar-card";
import { chats } from "@/config/ref/chats";
import { useEffect, useRef, useState } from "react";
import { PiXBold } from "react-icons/pi";
import { AiOutlineSend } from "react-icons/ai";
import { ActionIcon, Title, Text, Textarea, Button } from "rizzui";

export default function SendMessage({ user }: any) {
  const messagesModal = useModal();
  const textAreaRef = useRef(null);
  const { sendMessage } = chats() as any;

  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const handleSend = async () => {
    setIsSending(true);
    await sendMessage(message, user);
    setIsSending(false);
    messagesModal.closeModal()
  };



  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7" >
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Send a Message
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => messagesModal.closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <div className='flex mb-6 flex-col'>
        <Text className='mb-4'>
          To:
        </Text>
        <AvatarCard
          src={user.profilePictureURL}
          name={`${user?.firstName} ${user?.lastName}`}
          description={user?.phone}
        />

      </div>

      <Textarea
        label="Message"
        ref={textAreaRef}
        onChange={(e) => setMessage(e.target.value)}
        className='col-span-full'
        autoFocus
        placeholder=""
      />

      <div className="flex items-center justify-end gap-4 mt-10">

        <Button
          variant="outline"
          //  disabled={!isFinished}
          // className="w-full @xl:w-auto"
          //  onClick={onPublish}
          onClick={() => messagesModal.closeModal()}
        >
          Close
        </Button>
        <Button
          variant="solid"
          isLoading={isSending}
          disabled={!message.length || isSending}
          onClick={() => handleSend()}
        >
          <AiOutlineSend className='h-5 w-5 mr-2' />
          Send
        </Button>

      </div>

    </div >
  )
}