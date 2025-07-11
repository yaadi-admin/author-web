import { assistantImg, assistantName } from '@/config/bots';
import Image from 'next/image';
import React from 'react';
import { PiStopLight } from 'react-icons/pi';
import { Button } from 'rizzui';
import Frequency from './frequency';

interface AssistantProps {
    currentAgent: any,
    botAudioRecorder: any,
}


const Aigent: React.FC<AssistantProps> = ({ currentAgent, botAudioRecorder }) => {
    return (
        <div className='w-[240px] flex flex-col pb-4 box-shadow bg-white pr-12 border-r rounded gap-5'>
            <div className='flex items-center justify-center m-auto relative'>

                <div className='absolute w-[120px] h-[120px] border rounded-full'>
                    <Image
                        //@ts-ignore
                        src={assistantImg[currentAgent?.id] || 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/jen.jpeg?alt=media&token=a69ffbaf-7314-463f-ab4c-4598830dfa36'}
                        width={100}
                        height={100}
                        alt="assistant-image"
                        className="w-full h-full object-contain rounded-full"
                    />
                </div>
            </div>
            <div className={` flex flex-col items-center gap-2`}>
                <h2>{
                    //@ts-ignore
                    assistantName[currentAgent?.id]
                }</h2>
                <div className='h-32 flex flex-row'>
                    <Frequency frequencyData={botAudioRecorder.frequencyData} bgColor='bg-[#246B94]' />
                </div>

                {botAudioRecorder.isPlaying &&
                    <div className='flex flex-col items-center gap-2'>
                        <Button color='danger'
                            // disabled={}
                            variant='outline' onClick={botAudioRecorder.handleStopPlaying} className='z-50 h-20 w-20 rounded-full  bg-white hover:bg-white-600 shadow-2xl'>
                            <PiStopLight className="h-16 w-16" />
                        </Button>
                        <div>Click to stop</div>
                    </div>
                }

            </div>
        </div>
    );
};

export default Aigent;