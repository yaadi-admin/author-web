import React from 'react'
import {
  Button,
  ActionIcon,
  Title,
} from "rizzui";
import { VscClose } from "react-icons/vsc";


interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  title: string,
}
function ModalBody(props: ModalProps) {
  const { onClose, title, onConfirm, children } = props;
  return (
    <div className="m-auto px-7 pt-6 pb-8">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4">{title}</Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => onClose()}
        >
          <VscClose className="h-auto w-6" />
        </ActionIcon>
      </div>
      <div className="">
        {children}
      </div>
      <div className="flex items-center justify-end gap-4 w-full mt-8 mr-6">

        <Button variant="solid" onClick={() => onConfirm()}>
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default ModalBody
