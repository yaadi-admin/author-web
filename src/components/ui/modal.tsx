'use client';

import React, { ReactNode } from 'react';
import {
  PiXBold,
} from 'react-icons/pi';
import { ActionIcon, Title, Button } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
export default function Modal({
  title = 'Modal Title',
  btnLabel = 'OK',
  btnIcon,
  btnProps = {},
  onSubmit = () => { },
  content
}: {
  title?: string;
  btnLabel?: string;
  btnIcon?: ReactNode;
  btnProps?: any,
  content: ReactNode;
  onSubmit?: () => void,
}) {
  const { closeModal } = useModal();

  const handleSubmit = () => {
    onSubmit();
    closeModal()
  };

  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          {title}
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon>
      </div>
      {content}
      <div>

        <div className="mt-4 flex justify-end gap-3">
          <Button className="" onClick={handleSubmit} {...btnProps}>
            {btnIcon}
            {btnLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}


