'use client';

import { useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { PiArrowUpLight, PiCheck } from 'react-icons/pi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Text, Button, Popover, Title, Tooltip } from 'rizzui';
import cn from '@/utils/class-names';

import { currentSession } from '@/config/session';
import { routes } from '@/config/routes';
import Loader from '@/components/ui/loader';

interface FooterProps {
  formId?: number;
  className?: string;
  isLoading?: boolean;
  isButtonLoading?: boolean;
  onNext: () => void;
}


export default function Footer({ isLoading, isButtonLoading, className, onNext }: FooterProps) {
  const pathname = usePathname();
  const allLoading = isLoading || isButtonLoading;
  return (

    <footer
      className={cn(
        'flex ml-auto fixed bottom-0 left-0 right-0 flex items-center justify-between gap-3 px-4 py-5 lg:px-8 4xl:px-10',
        className
      )}
      style={{ width: 'calc(100% - 200px)' }}
    >
      {/* <Button
          rounded="pill"
          variant="flat"
          // isLoading={isLoading || isButtonLoading}
          disabled={allLoading}
          color='primary'
          onClick={gotoPrevStep}
          className="gap-1"
        >
          {isLoading ?
            <Loader />
            :
            <PiArrowUpLight className="-rotate-90" />
          }
          Back
        </Button> */}
      <div className='ml-auto flex gap-2'>


        <Button

          disabled={isLoading || isButtonLoading}
          rounded="pill"
          variant='solid'
          onClick={() => onNext()}
          color="primary"
          className="ml-auto gap-1"
        >
          {`Next`}

          {isLoading ?
            <Loader />
            :
            null
            // <PiCheck />
          }
        </Button>
      </div>
    </footer>
  );
}
