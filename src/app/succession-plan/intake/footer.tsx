'use client';

import { PiArrowUpLight } from 'react-icons/pi';
import { Button } from 'rizzui';
import cn from '@/utils/class-names';

import { useMultiStep } from './use-multi-step';


export default function Footer() {
  const { step, gotoPrevStep, } = useMultiStep();

  const back = (
    step > 1 && step && (
      <Button
        rounded="pill"
        variant="flat"
        color='primary'
        onClick={gotoPrevStep}
        className="gap-1 w-auto"
      // size='lg'
      >
        <PiArrowUpLight className="-rotate-90" />
        Back
      </Button>
    )
  )

  const next = (
    <div className='ml-auto flex gap-2'>
      <Button
        rounded="pill"
        variant={step < 1 ? 'flat' : 'solid'}
        type="submit"
        form={`${step?.toString()}`}
        color="primary"
        // size='lg'
        className="ml-auto w-auto gap-1"
      >
        Next
        <PiArrowUpLight className="rotate-90" />
      </Button>
    </div>
  )
  return (

    <footer
      className={cn(
        'flex ml-auto fixed bottom-0 left-0 right-0 flex items-center justify-between gap-3 px-4 py-5 lg:px-8 4xl:px-10',
      )}
      style={{ width: 'calc(100% - 200px)' }}
    >
      {back}
      {step === 1 ? next : null}
    </footer>
  );
}
