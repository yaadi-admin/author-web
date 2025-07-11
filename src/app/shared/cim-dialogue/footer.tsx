'use client';

import { useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { PiArrowUpLight, PiCheck } from 'react-icons/pi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Text, Button, Popover, Title, Tooltip } from 'rizzui';
import cn from '@/utils/class-names';
import {
  stepperAtomOne,
  useStepperOne,
  stepOneTotalSteps,
} from './multi-step';
import { currentSession } from '@/config/session';
import { routes } from '@/config/routes';
import Loader from '@/components/ui/loader';

interface FooterProps {
  formId?: number;
  className?: string;
  isLoading?: boolean;
  isButtonLoading?: boolean;
}


export default function Footer({ isLoading, isButtonLoading, className }: FooterProps) {
  const totalSteps = useAtomValue(stepOneTotalSteps);
  const { push } = useRouter();
  const pathname = usePathname();
  const currentUser = currentSession() as any;
  // const searchParams = useSearchParams();
  const { step, gotoPrevStep, resetStepper, gotoNextStep } = useStepperOne();
  const resetLocation = useResetAtom(stepperAtomOne);

  useEffect(() => {
    resetLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function buttonAttr() {
    return { form: `rhf-${step?.toString()}` };
  }

  const allLoading = isLoading || isButtonLoading;

  return (

    <footer
      className={cn(
        'flex ml-auto fixed bottom-0 left-0 right-0 flex items-center justify-between gap-3 px-4 py-5 lg:px-8 4xl:px-10',
        className
      )}
      style={{ width: 'calc(100% - 200px)' }}
    >
      {step > 0 && step && (
        <Button
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
        </Button>
      )}
      <div className='ml-auto flex gap-2'>
        {step === 0 &&
          <>
            <Tooltip content="Ensure you've answered all the questions before clicking 'Done'.">

              <Popover>
                <Popover.Trigger>
                  <Button

                    disabled={isLoading || isButtonLoading}
                    rounded="pill"

                    variant='solid'
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
                </Popover.Trigger>
                <Popover.Content>
                  {({ setOpen }) => (
                    <div className="w-56">
                      <Title as="h6">Confirmation</Title>
                      <Text>Are you sure you answered all the questions in this dialogue?</Text>
                      <div className="flex justify-end gap-3 mb-1">
                        <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
                          No
                        </Button>
                        <Button size="sm"
                          {...buttonAttr()}
                          onClick={() => setOpen(false)}
                          type={'submit'}
                        >
                          Yes
                        </Button>
                      </div>
                    </div>
                  )}
                </Popover.Content>
              </Popover>
            </Tooltip>
          </>
        }
        {/* {step !== totalSteps &&
          <Button
            disabled={allLoading}
            rounded="pill"
            variant={step > 0 ? 'flat' : 'solid'}
            type="submit"
            form={`rhf-${step?.toString()}-next`}
            color="primary"
            className="ml-auto gap-1"
          >
            Submit
            {isLoading ?
              <Loader />
              :
              <PiArrowUpLight className="rotate-90" />
            }
          </Button>
        } */}
      </div>
    </footer>
  );
}
