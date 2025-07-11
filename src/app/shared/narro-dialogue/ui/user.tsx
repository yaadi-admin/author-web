import React, { useEffect } from 'react';
import { PiMicrophoneLight, PiStopLight } from 'react-icons/pi';
import { Button } from 'rizzui';
import { currentSession } from '@/config/session';
import { useSearchParams } from 'next/navigation';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { modalAtom } from '../../modal-views/use-modal';

interface UserProps {
    showMicPulse: boolean;
    isLoading: boolean;
    isRecording: boolean;
    frequencyData: any;
    isRequestingStream: boolean;
    isTyping: any;
    onRecord: () => void;
    onStopRecording: () => Promise<void>;
}

const User: React.FC<UserProps> = ({
    showMicPulse,
    isLoading,
    isRecording,
    onStopRecording,
    isTyping,
    frequencyData,
    isRequestingStream,
    onRecord,
}) => {
    const searchParams = useSearchParams();

    const state = useAtomValue(modalAtom);

    useEffect(() => {
        if (isTyping) return; // Skip adding the listener if isTyping is true

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                if (state.isOpen) {

                } else {
                    event.preventDefault(); // Prevent scrolling or default space behavior

                    if (isRecording) {
                        onStopRecording();
                    } else if (!isLoading) {
                        onRecord();
                    }
                }
            }
        };

        // Add event listener for keydown
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isRecording, isLoading, onRecord, isTyping, onStopRecording, state]);

    return (
        <div className={`flex flex-col gap-2 `}>
            {isRecording ? (
                <div className='flex flex-col items-center gap-2 relative mb-4'>
                    <Button
                        color='danger'
                        variant='outline'
                        disabled={isRequestingStream}
                        onClick={onStopRecording}
                        className='z-50 h-20 w-20 rounded-full bg-white hover:bg-white-600 shadow-2xl'
                    >
                        <PiStopLight className="h-16 w-16 z-50" />
                    </Button>
                    <p className={`font-secondary text-center mt-2 text-gray-400`}>Click or press space to stop</p>
                </div>
            ) : (
                !isLoading && (
                    <div className='flex flex-col items-center gap-2 relative mb-4'>
                        {showMicPulse && (
                            <Button
                                variant='solid'
                                className='z-0 h-14 w-14 rounded-full bg-red absolute animate-ping opacity-100 mt-[12px]'
                            ></Button>
                        )}
                        <Button
                            onClick={() => onRecord()}
                            variant='solid'
                            disabled={isRequestingStream}
                            className={`z-50 h-20 w-20 rounded-full  bg-red hover:bg-red-600  shadow-2xl`}
                        >
                            <PiMicrophoneLight className={`h-16 w-16  text-white z-50`} />
                        </Button>
                        <p className={`font-secondary text-center mt-2 text-gray-400`}>Click or press space to reply</p>
                    </div>
                )
            )}
        </div>
    );
};

export default User;
