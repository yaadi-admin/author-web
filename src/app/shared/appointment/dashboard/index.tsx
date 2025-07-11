'use client';

import AppointmentStats from '@/app/shared/appointment/dashboard/appointment-stats';
import UpcomingAppointmentTable from '@/app/shared/appointment/dashboard/upcoming-appointment-table';
import AppointmentDiseases from '@/app/shared/appointment/dashboard/appointment-diseases';
import Department from '@/app/shared/appointment/dashboard/department';
import TotalAppointment from '@/app/shared/appointment/dashboard/total-appointment';
import Patients from '@/app/shared/appointment/dashboard/patients';
import PatientAppointment from '@/app/shared/appointment/dashboard/patient-appointment';
import ScheduleList from '@/app/shared/appointment/dashboard/schedule-list';
import AppointmentTodo from '@/app/shared/appointment/dashboard/appointment-todo';
// import ParticipantsList from '@/app/(hydrogen)/widgets/cards/participants-list';
import { Button, Title } from 'rizzui';
import cn from '@/utils/class-names';
import AddTeamMemberModalView from '../../account-settings/modal/add-team-member';
import { PiPlusBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';

function SectionBlock({
  title,
  titleClassName,
  children,
  className,
  openModal,
}: React.PropsWithChildren<{
  title?: string;
  titleClassName?: string;
  className?: string;
  openModal?: any;
}>) {
  return (


    <section className={className}>
      {/* <header className="mb-2.5 lg:mb-3">
        <Button
          className=""
          type="button"
          onClick={() =>
            openModal({
              view: <AddTeamMemberModalView />,
            })
          }
        >
          <PiPlusBold className="me-1.5 h-4 w-4" />
          Add Member
        </Button>
      </header> */}

      {children}
    </section>
  );
}

export default function AppointmentDashboard() {

  const { openModal } = useModal();
  return (
    <div className="grid grid-cols-1 gap-6 @container 3xl:gap-8">
      <SectionBlock openModal={openModal} title={''}>

        <div className="grid col-span-full">
          {/* <ParticipantsList /> */}
        </div>
      </SectionBlock>
    </div>
  );
}
