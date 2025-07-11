'use client'
import React from 'react'
import { Stepper } from 'rizzui';
import { CiUser, CiCreditCard1 } from "react-icons/ci";
import { AiOutlineFileText } from "react-icons/ai";
import { HiOutlineSparkles } from "react-icons/hi2";
import { MdOutlineChecklist } from "react-icons/md";
import { PiCheck, PiFiles, PiPlant } from "react-icons/pi";
import { currentSuccessionPlan } from '@/config/succession-plan/succession-plan-user';


function Sidebar({ step }: { step: number }) {
  const { currentUser } = currentSuccessionPlan() as any;

  return (
    <div className='w-[240px] h-screen p-5' style={{ borderRight: '0.5px solid #CECECE' }}>
      <Stepper direction="vertical" currentIndex={step}>
        {/* <Stepper.Step title="User Registration" size="sm"
          icon={<CiUser className="h-5 w-5" />}
        /> */}
        {currentUser?.onBoarding?.payment ? null :
          <Stepper.Step title="Payment Processing"
            icon={<CiCreditCard1 className="h-5 w-5" />}
            size="sm" />
        }
        {currentUser?.onBoarding?.intake ? null :
          <Stepper.Step title="Complete Intake Form" size="sm"
            icon={<AiOutlineFileText className="h-5 w-5" />} />
        }
        {currentUser?.onBoarding?.dialogue ? null :
          <Stepper.Step title="Planning with Jen" size="sm"
            // description={<div className="my-5"><Stepper
            //   dot
            //   direction="vertical" currentIndex={0}>
            //   <Stepper.Step title="Getting started"
            //     className="min-h-[20px]"
            //     icon={<PiPlant className="h-5 w-5" />}
            //     size="sm" />

            //   <Stepper.Step title="Mindset"
            //     className="min-h-[20px]"
            //     icon={<PiPlant className="h-5 w-5" />}
            //     size="sm" />

            //   <Stepper.Step title="Deal Terms"
            //     className="min-h-[20px]"
            //     icon={<PiPlant className="h-5 w-5" />}
            //     size="sm" />

            //   <Stepper.Step title="Transition Plan"
            //     className="min-h-[20px]"
            //     icon={<PiPlant className="h-5 w-5" />}
            //     size="sm" />
            //   <Stepper.Step title="HR & Company Culture"
            //     className="min-h-[20px]"
            //     icon={<PiPlant className="h-5 w-5" />}
            //     size="sm" />

            //   <Stepper.Step title="Workplace Culture"
            //     className="min-h-[20px]"
            //     icon={<PiPlant className="h-5 w-5" />}
            //     size="sm" />

            //   <Stepper.Step title="Legal "
            //     className="min-h-[20px]"
            //     icon={<PiPlant className="h-5 w-5" />}
            //     size="sm" />



            // </Stepper></div>}
            icon={<HiOutlineSparkles className="h-5 w-5" />}

          />
        }
        {currentUser?.onBoarding?.checklist ? null :
          <Stepper.Step title="Final Checklist" size="sm"
            icon={<MdOutlineChecklist className="h-5 w-5" />}
          />
        }
        <Stepper.Step title="Succession Plan Overview" size="md"
          icon={<PiFiles className="h-5 w-5" />} />
        <Stepper.Step title="Congratulations" size="md"
          icon={<PiCheck className="h-5 w-5" />} />

      </Stepper>

    </div>
  )
}

export default Sidebar;