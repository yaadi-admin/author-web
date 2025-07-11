import React from 'react';

import { ThreadEvents } from "../../types"
import { currentSession } from '@/config/session';
import { useSearchParams } from 'next/navigation';
import Frequency from '../../pulseImage';

interface mainProps {
  audioRecorder: any,
  isChatShown: boolean,
  botAudioRecorder: any
  isUserSpeaking: 'no' | 'yes' | 'done',
  promptStatus: ThreadEvents | '',
  assistantImg: any,
  assistantId: any
  setShow: any,

  isRequestingStream: boolean,
  show: boolean,
  isFullScreen: boolean,
  setFullScreen: any
  isProcessingSpeech: boolean,
  user?: { firstName: string }
  setProcessingSpeech: any,
  isTyping: any,
  emotion: 'happiness' | 'retrieving' | 'surprise' | 'neutral' | 'sadness',
}


const Call = React.memo(function Main(props: mainProps) {
  const {
    isUserSpeaking,
    audioRecorder,
    user,
    botAudioRecorder,
    emotion,
    isChatShown,
    isTyping,
    isRequestingStream,
    promptStatus,
    assistantImg,
    isProcessingSpeech,
    setProcessingSpeech,

    isFullScreen,
    setFullScreen,
    assistantId,
    show,
    setShow,

  } = props;

  const currentUser = currentSession() as any;

  const searchParams = useSearchParams();


  return (
    <div className='flex flex-col items-center justify-center mt-12 relative' style={{
    }}>
      {/* {isFullScreen ? null : <AiFillMessage className={`h-8 w-8 cursor-pointer absolute right-[10%] z-10 top-0 `} onClick={() => setFullScreen(true)} />} */}
      <div className="relative flex items-center justify-center mx-auto  ">

        {

          isUserSpeaking === 'yes' ?
            <Frequency
              frequencyData={audioRecorder.frequencyData}
              isUser
              isUserSpeaking={isUserSpeaking}
              assistantId={assistantId}
              isProcessingSpeech={isProcessingSpeech}
              intials={`${user ? user?.firstName?.[0] : currentUser?.firstName?.[0]}${currentUser?.lastName?.[0] || ''}`}
            />
            :
            <Frequency
              frequencyData={botAudioRecorder.frequencyData}
              assistantId={assistantId}
              imageSrc={assistantImg[assistantId]}
              isRequestingStream={isRequestingStream}
              emotion={emotion}
            />
        }



      </div>
      {/* {botThinking && <p>Processing ...</p>} */}
      {/* {!isChatShown && storedMessage &&
        <div
          className="mt-4 justify-center w-[600px] mb-4 h-[42px] bg-white py-2 border-1 bg-transparent px-8 rounded-md z-[9999] overflow-auto	"
          dangerouslySetInnerHTML={{ __html: html }}
        >
        </div>
      } */}
    </div >
  )
})

export default Call;