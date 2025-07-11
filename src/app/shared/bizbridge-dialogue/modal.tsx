'use client';
import React from 'react';;
import { useModal } from "@/app/shared/modal-views/use-modal";
import { Title, ActionIcon, Button } from 'rizzui'
import { PiXBold } from 'react-icons/pi';
import SimpleBar from '@/components/ui/simplebar';
import axios from 'axios';
import { BASE_URL } from '@/config/bots';
export default function TranscriptModal(props: any) {
  const { intake, name, calendly } = props;
  const { closeModal } = useModal();
  const [messages, setMessages] = React.useState([]);


  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7 h-[700px] ">
      <div className="mb-7 flex items-center justify-between z-[9999px]">
        <Title as="h4" className="font-semibold ">
          Book a Meeting with {name}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <div className="mb-10 h-[600px] ">
        <iframe src={calendly} width="100%" height="100%" />
        {/* <Button onClick={() => window.open('https://calendly.com/berjesty/60min')}>Book a meeting</Button> */}
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          variant="solid"

          onClick={() => closeModal()}
        >
          Close
        </Button>

      </div>

    </div >
  );
}
