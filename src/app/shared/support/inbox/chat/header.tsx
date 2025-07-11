'use client';
import React from 'react'
import { Avatar, ActionIcon, Dropdown } from 'rizzui';
import {
  PiDotsThreeBold,
} from 'react-icons/pi';
import { Assistant } from './types';

interface HeaderProps {
  assistant: Assistant
  assistants: Assistant[]
  onChangeAssistant: (assistant: Assistant) => void
}

function header(props: HeaderProps) {

  const { assistant, assistants, onChangeAssistant } = props;
  console.log(assistant);
  return (
    <header className="flex flex-col gap-4 border-b border-muted pb-5 3xl:flex-row 3xl:items-center">
      <div style={{ justifyContent: "space-between" }} className="flex flex-col items-start justify-between gap-3 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
        <div className="flex w-full items-center gap-5">
          <Avatar
            name={assistant?.name ? assistant?.name : 'Assistant'}
            initials={'Ai'}
            src={assistant?.profilePicture}
            color="warning"
            className="!h-8 !w-8 font-medium text-white xl:!h-12 xl:!w-12	"
          />
          <h6 className="">{assistant?.name ? assistant?.name : "Assistant"}</h6>
        </div>
        <Dropdown>
          <Dropdown.Trigger>
            <ActionIcon
              rounded="full"
              variant="outline"
              className="h-auto w-auto p-1"
            >
              <PiDotsThreeBold className="h-auto w-6" />
            </ActionIcon>
          </Dropdown.Trigger>
          <Dropdown.Menu className="!z-0 w-100">
            {assistants.map((a) => (
              <Dropdown.Item key={a?.id}
                onClick={() => onChangeAssistant(a)}
              >
                <div className='flex gap-5 items-center'>
                  <Avatar
                    color="warning"
                    name={a?.name || ''}
                    src={a?.profilePicture}
                    className="!h-8 !w-8 font-medium text-white xl:!h-12 xl:!w-12	"
                  />
                  <span>{a?.name}</span>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>

        </Dropdown>

      </div>
    </header>
  )
}

export default header