import React from 'react'
import { CiClock2 } from 'react-icons/ci'


interface MessageHeaderProps {

}

function MessageHeader(props: MessageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-muted pb-5 3xl:flex-row 3xl:items-center mb-8">
      <div style={{ justifyContent: "space-between" }} className="flex flex-col items-start justify-between gap-3 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
        <div className="mt-8 ml-2 flex w-full items-center ">
          <p className="text-lg font-bold mr-2" >Conversation History</p>
          {/* {estimatedTime &&
            <>
              <CiClock2 className="h-5 w-5 mr-2" />
              <div>
                This dialogue will take approximately <b>{estimatedTime}</b> minutes to complete.
              </div>
            </>
          } */}
        </div>
      </div>
    </header>
  )
}

export default MessageHeader