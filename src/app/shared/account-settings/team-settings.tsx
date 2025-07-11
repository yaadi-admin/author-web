'use client';

import Link from 'next/link';
import { Button, Title } from 'rizzui';
import LoggedInDevices from '@/app/shared/account-settings/logged-in-devices/table';
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
import GithubIcon from '@/components/icons/github';
import TeamsIcon from '@/components/icons/teams';
import FigmaIcon from '@/components/icons/figma';
import AddTeamMemberModalView from '@/app/shared/account-settings/modal/add-team-member';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { loggedInDeviceData } from '@/data/logged-in-device';
import { PiPlusBold } from 'react-icons/pi';
// import ParticipantsList from '@/app/(hydrogen)/widgets/cards/participants-list';

const currentActiveTeams = [
  {
    name: 'Lawyer',
    url: 'lawyer@gmail.com',
    icon: <GithubIcon className="h-6 w-6" />,
  },
  {
    name: 'Accountant',
    url: 'accountant@gmail.com',
    icon: <TeamsIcon className="h-6 w-6" />,
  },
  {
    name: 'Secretary',
    url: 'secretary@gmail.com',
    icon: <FigmaIcon className="h-6 w-6" />,
  },
];

export default function TeamSettingsView() {
  const { openModal } = useModal();
  return (
    <div className="@container">
      <HorizontalFormBlockWrapper
        childrenWrapperClassName="gap-0 @lg:gap-0"
        title="Teams"
        description="Manage your teams & user permissions."
        titleClassName="text-xl font-semibold"
      >
        <div className="col-span-2 flex justify-end gap-4">
          <Button
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
        </div>
      </HorizontalFormBlockWrapper>

      <HorizontalFormBlockWrapper
        className="pb-0 sm:pb-10"
        childrenWrapperClassName="gap-0 @lg:gap-0"
        title="Members"
        description="You’re currently on these teams."
      >
        <div className="grid col-span-full">
          {/* <ParticipantsList /> */}
        </div>
      </HorizontalFormBlockWrapper>

      {/* <HorizontalFormBlockWrapper
        childrenWrapperClassName="gap-0 @lg:gap-0"
        title="Where you’re logged in"
        description="We’ll alert you via olivia@untitledui.com if there is any unusual activity on your account."
        descriptionClassName="max-w-[352px]"
        className="border-0 pb-0"
      >
        <LoggedInDevices
          data={loggedInDeviceData}
          className="@xs:col-span-full"
        />
      </HorizontalFormBlockWrapper> */}
    </div>
  );
}
