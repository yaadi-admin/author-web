'use client';

import { useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { PiArrowUpLight, PiCheck } from 'react-icons/pi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'rizzui';
import cn from '@/utils/class-names';

interface FooterProps {
  formId?: number;
  className?: string;
  isLoading?: boolean;
}



export default function Footer({ isLoading, className }: FooterProps) {

  const { push } = useRouter();

  return (
    <footer
      className={cn(
        'fixed bottom-0 left-0 right-0 flex items-center justify-between gap-3 px-4 py-5 lg:px-8 4xl:px-10',
        className
      )}
    >

      <Button
        isLoading={isLoading}
        disabled={isLoading}
        rounded="pill"
        onClick={() => push('/succession-plan/preview')}
        variant='solid'
        color="primary"
        className="ml-auto gap-1"
        form="rhf-checklist"
      >
        Back
      </Button>
    </footer>
  );
}
