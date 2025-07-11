'use client';

import { useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { PiArrowUpLight, PiCheck } from 'react-icons/pi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'rizzui';
import cn from '@/utils/class-names';
import {
  formDataAtom,
  initialFormData,
  stepperAtomOne,
  useStepperOne,
  stepOneTotalSteps,
} from '@/app/shared/multi-step/multi-step-1';
import { currentSession } from '@/config/session';
import { routes } from '@/config/routes';

interface FooterProps {
  formId?: number;
  className?: string;
  isLoading?: boolean;
}

function ButtonLabel(formId?: number) {
  const totalSteps = useAtomValue(stepOneTotalSteps);

  if (formId === totalSteps - 1) {
    return (
      <>
        Done <PiCheck />
      </>
    );
  }
  if (formId === 7) {
    return 'Back to Home';
  }
  return (
    <>
      Next <PiArrowUpLight className="rotate-90" />
    </>
  );
}

export default function Footer({ isLoading, className }: FooterProps) {
  const totalSteps = useAtomValue(stepOneTotalSteps);

  const { push } = useRouter();
  const pathname = usePathname();
  const currentUser = currentSession() as any;
  // const searchParams = useSearchParams();
  const setFormData = useSetAtom(formDataAtom);
  const { step, gotoPrevStep, resetStepper } = useStepperOne();
  const resetLocation = useResetAtom(stepperAtomOne);

  useEffect(() => {
    resetLocation();
    setFormData(initialFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function buttonAttr() {
    // if (step === totalSteps - 1) {
    //   // localStorage.removeItem('currentCard');
    //   // localStorage.removeItem('cardData');
    //   if (currentUser?.role === 'admin') {
    //     return {
    //       onClick: () => { push(routes.adminSellerSpan); resetStepper(); },
    //     };
    //   } else {
    //     return {
    //       onClick: () => { push(routes.eCommerce.dashboard); resetStepper(); },
    //     };
    //   }

    // }
    return { form: `rhf-${step?.toString()}` };
  }

  return (
    <footer
      className={cn(
        'fixed bottom-0 left-0 right-0 flex items-center justify-between gap-3 px-4 py-5 lg:px-8 4xl:px-10',
        className
      )}
    >
      {step > 0 && step < totalSteps && (
        <Button
          rounded="pill"
          variant="outline"
          isLoading={isLoading}
          disabled={isLoading}
          color='primary'
          onClick={gotoPrevStep}
          className="gap-1  bg-white"
        >
          <PiArrowUpLight className="-rotate-90" />
          Back
        </Button>
      )}
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        rounded="pill"
        {...buttonAttr()}
        type={'submit'}
        variant='solid'
        color="primary"
        className="ml-auto gap-1"
      >
        {ButtonLabel(step)}
      </Button>
    </footer>
  );
}
