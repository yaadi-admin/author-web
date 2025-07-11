'use client';

import Loader from '@/components/ui/loader';
import cn from '@/utils/class-names';
import Dialogue from './dialogue';
import { NarroDialogueProps } from './types';


export function NarroDialogue(props: NarroDialogueProps) {
  const {
    id,
    aigent,
    prompt,
    title,
    info,
    estimatedTime,
    rightLabel,
    onThreadCreated,
    injectData,
    onBack,
    onSubmit,
    onStart,
    user,
    step,
    wisdomMessages,
    showFooter,
  } = props;


  if (!aigent) {
    return <div className='flex justify-center items-center'><Loader /></div>;
  }

  if (!prompt) {
    throw new Error("prompt is required");
  }

  return (
    <div
      key={id}
      className={cn(
        'flex  w-full '
      )}
    >
      <Dialogue
        wisdomMessages={wisdomMessages}
        aigent={aigent}
        prompt={prompt}
        info={info}
        title={title}
        estimatedTime={estimatedTime}
        onThreadCreated={onThreadCreated}
        injectData={injectData}
        onSubmit={onSubmit}
        onStart={onStart}
        step={step}
        rightLabel={rightLabel}
        user={user}
        onBack={onBack}
        showFooter={showFooter}
      />
    </div>
  );
}


export function replacePlaceholders(message: string, data: { [key: string]: any }) {
  return message.replace(/{{(.*?)}}/g, (match, key) => data[key] || '');
}