import { ThreadEvents } from "../../types";

import { checkVoice } from '@/config/bots';
import Loading from '@/components/ui/loader';
import { useState } from "react";
import { MdOutlineReplay } from "react-icons/md";
import Tooltip from "@/components/ui/tooltip";
import { Button, Text } from "rizzui";
import { BsChat, BsKeyboard } from "react-icons/bs";
import User from "../../ui/user";
import { PiStopLight } from "react-icons/pi";


interface CallFooterProps {
  handleStopRecording: () => Promise<void>;
  audioRecorder: any;
  botAudioRecorder: any;
  sending: boolean;
  isUserSpeaking: 'no' | 'yes' | 'done';
  initialPromptStatus: ThreadEvents | '';
  promptStatus: ThreadEvents | '';
  isLoading: boolean;
  onRecord: () => void;
  show: boolean;
  onStopRecording: () => void;
  assistantId: string,
  isFullScreen: boolean;
  isPlaying: boolean;
  setFullScreen: (value: boolean) => void;
  isTyping: boolean;
  setIsTyping: (value: boolean) => void;
}


function CallFooter(props: CallFooterProps) {
  const {
    handleStopRecording,
    audioRecorder,
    botAudioRecorder,
    sending,
    isUserSpeaking,
    isPlaying,
    onStopRecording,
    initialPromptStatus,
    promptStatus,
    isLoading,
    onRecord,
    assistantId,
    show,
    isTyping,
    setIsTyping,
    setFullScreen,
    isFullScreen,
    show: isChatVisible,  // renamed for clarity
  } = props;
  const [message, setMessage] = useState('');
  const [replaying, setReplaying] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage('');
    }
  };
  const toggleInput = () => {
    setIsTyping(false);  // Temporarily set isTyping to false
    setFullScreen(true); // Set isFullScreen to true (if needed)

    // Reset isTyping to true after a small delay to trigger focus effect
    setTimeout(() => {
      setIsTyping(true); // Set isTyping back to true to trigger focus
    }, 0);
  };

  const onStartPlaying = (e: any) => {
    e.preventDefault();
    setReplaying(true);
    const voice = checkVoice(assistantId);

    const storedMessage = localStorage.getItem('currentMessage');
    botAudioRecorder.handleAudioStream(storedMessage, () => {
      setReplaying(false);
    }, voice)
  }


  // bg-[#f3fbff]
  return (
    <div className="flex round-bl-xl justify-center items-center relative ml-[12px] w-full h-auto">
      <div className={`flex relative ${show ? 'items-baseline' : ''}`}>
        <div className="absolute top-[-248px] left-[4px]">
          {/* Replay Button */}
          {/* <Tooltip title="" body="Replay" width={"w-[90px]"}> */}
          {isPlaying ? null :
            <button
              type="button"
              disabled={isPlaying}
              onClick={onStartPlaying}
              className={`h-12 w-12 rounded-full cursor-pointer `}
            >
              {replaying ? <Loading /> :
                <MdOutlineReplay className={`h-8 w-8 z-50 ${isPlaying ? 'text-[#EBEBE4]' : ''}`} />
              }
            </button>
          }
          {/* </Tooltip> */}
        </div>

        {/* Left Side - Keyboard Button */}
        <Tooltip title="" body="Chat/Keyboard" width={"w-[100px]"}>
          {isFullScreen === false ? <Button
            variant="flat"
            onClick={toggleInput}
            className={`h-14 w-14 rounded-full ${(isFullScreen) ? 'bg-secondary' : 'bg-secondary-dark '} shadow-md`}
          >
            <BsChat className="h-8 w-8 z-50" />
          </Button> : <Button
            variant="flat"
            disabled={isFullScreen}
            onClick={toggleInput}
            className={`h-14 w-14 rounded-full ${(isFullScreen) ? 'bg-secondary' : 'bg-secondary-dark '} shadow-md`}
          >
            <BsChat className="h-8 w-8 z-50" />
          </Button>}
        </Tooltip>

        {/* Center - Mic */}
        <div className="mt-10 flex flex-col items-center gap-4 max-h-[150px] h-[150px]">
          <User
            isRecording={audioRecorder.isRecording}
            onStopRecording={handleStopRecording}
            showMicPulse={
              !botAudioRecorder.isPlaying &&
              !audioRecorder.isRecording &&
              !sending &&
              isUserSpeaking === 'no' &&
              (initialPromptStatus === ThreadEvents.THREAD_MESSAGE_COMPLETED ||
                promptStatus === ThreadEvents.THREAD_MESSAGE_COMPLETED)
            }
            frequencyData={audioRecorder.frequencyData}
            isLoading={isLoading}
            onRecord={onRecord}
            isTyping={isTyping}
          />
        </div>

        {/* Right Side - Stop Button */}
        <Tooltip title="" body="Stop" width={"w-[50px]"}>
          <Button
            color="danger"
            variant="flat"
            onClick={onStopRecording}
            disabled={!isPlaying}
            className={`h-14 w-14 rounded-full shadow-md mb-2`}
          >
            <PiStopLight className="h-8 w-8 z-50" />
          </Button>
        </Tooltip>
      </div>

    </div>
  );
}

export default CallFooter;