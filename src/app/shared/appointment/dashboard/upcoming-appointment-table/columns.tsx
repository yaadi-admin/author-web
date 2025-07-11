'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select, Input } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import AvatarCard from '@/components/ui/avatar-card';
import DeletePopover from '@/app/shared/delete-popover';
import DateCell from '@/components/ui/date-cell';
import { Type } from '@/data/appointment-data';
import { useState } from 'react';
import { PiCheckCircleBold, PiClockBold } from 'react-icons/pi';


const statusOptions = [
  { label: 'Waiting', value: 'Waiting' },
  { label: 'Scheduled', value: 'Scheduled' },
];

const scoreCalculator = (user: any) => {
  var score = 0;
  if (user.industry === 'retail') {
    score += 20;
  }
  if (user.emailVerified === true) {
    score += 20;
  }
  if (user.value >= 100000) {
    if (user.value >= 200000) {
      score += 30;
    }
    score += 20;
  }
  if (user.status === 'scheduled') {
    score += 20;
  }
  if (user.status === 'waiting') {
    score += 5;
  }
  if (user?.culture === 'match'){
    score += 5;
  }
  return score;
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  handleSelected: (row: any) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  handleSelectAll,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  data,
  checkedItems,
  onChecked,
  handleSelected,
}: Columns) => [
    // {
    //   title: (
    //     <div className="ps-3.5">
    //       <Checkbox
    //         title={'Select All'}
    //         onChange={handleSelectAll}
    //         checked={checkedItems.length === data.length}
    //         className="cursor-pointer"
    //       />
    //     </div>
    //   ),
    //   dataIndex: 'checked',
    //   key: 'checked',
    //   width: 30,
    //   render: (_: any, row: any) => (
    //     <div className="inline-flex ps-3.5">
    //       <Checkbox
    //         aria-label={'ID'}
    //         className="cursor-pointer"
    //         checked={checkedItems.includes(row.id)}
    //         {...(onChecked && { onChange: () => onChecked(row.id) })}
    //       />
    //     </div>
    //   ),
    // },
    {
      title: (
        <HeaderCell
          title="Match Score"
          sortable
          ascending={
            sortConfig?.direction === 'desc' && sortConfig?.key === 'userScore'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('userScore'),
      dataIndex: 'user',
      key: 'userScore',
      width: 25,
      render: (user: any) => (scoreCalculator(user) >= 60 ? <Text style={{ color: 'green' }}>{scoreCalculator(user)}%</Text> : <Text style={{ color: 'red' }}>{scoreCalculator(user)}%</Text>),
    },
    // {
    //   title: (
    //     <HeaderCell title={<span className="whitespace-nowrap">Date</span>} />
    //   ),
    //   dataIndex: 'date',
    //   key: 'date',
    //   width: 250,
    //   render: (createdDate: Date) => <DateCell date={createdDate} />,
    // },
    {
      title: <HeaderCell title="Details" />,
      onHeaderCell: () => onHeaderCellClick('doctor.name'),
      dataIndex: 'user',
      key: 'user',
      width: 30,
      render: (user: { firstName: string; lastName: string; email: string; profilePictureURL: string; }) => (
        <AvatarCard
          src={user?.profilePictureURL}
          name={user?.firstName + ' ' + user?.lastName}
          description={user?.email}
        />
      ),
    },
    {
      title: <HeaderCell title="CIS Status" />,
      onHeaderCell: () => onHeaderCellClick('name'),
      dataIndex: 'user',
      key: 'name',
      width: 25,
      render: (user: { firstName: string; lastName: string; email: string }) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            Not Sent
          </Text>
        </div>
      ),
    },

    // {
    //   title: (
    //     <HeaderCell
    //       title={<span className="whitespace-nowrap">Industry</span>}
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'industry'
    //       }
    //     />
    //   ),
    //   dataIndex: 'industry',
    //   key: 'industry',
    //   width: 100,
    //   onHeaderCell: () => onHeaderCellClick('industry'),
    //   render: (industry: string) => (
    //     <Text className="whitespace-nowrap font-medium text-gray-900">
    //       {industry}
    //     </Text>
    //   ),
    // },
    // {
    //   title: <HeaderCell title="Duration" />,
    //   dataIndex: 'duration',
    //   key: 'duration',
    //   width: 150,
    //   render: (duration: string) => (
    //     <span className="whitespace-nowrap font-semibold">{duration}</span>
    //   ),
    // },
    // {
    //   title: (
    //     <HeaderCell
    //       title="Payment"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'amount'
    //       }
    //     />
    //   ),
    //   dataIndex: 'amount',
    //   key: 'amount',
    //   onHeaderCell: () => onHeaderCellClick('amount'),
    //   width: 180,
    //   render: (amount: number) => (
    //     <span className="whitespace-nowrap font-semibold">${amount}</span>
    //   ),
    // },
    {
      title: (
        <HeaderCell
          title="Meeting Request"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
          }
        />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 25,
      onHeaderCell: () => onHeaderCellClick('status'),
      render: (status: string) => {
        return <StatusSelect selectItem={status} />;
      },
    },

    {
      // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 10,
      render: (_: string, row: any) => (
        <div className="flex items-center justify-end gap-3 pe-3">
          {/* <Tooltip
          size="sm"
          content={'Edit Appointment'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'Edit Appointment'}
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip> */}
          <Tooltip
            size="sm"
            content={'View'}
            placement="top"
            color="invert"
          >
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              onClick={() => handleSelected(row)}
              aria-label={'View Appointment'}
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>
          {/* <DeletePopover
          title={`Delete the appointment`}
          description={`Are you sure you want to delete this #{row.id} appointment?`}
          onDelete={() => onDeleteItem(row.id)}
        /> */}
          {/* <QualiBuyUserSelect selectItem={openDrawer} /> */}
        </div>
      ),
    },
  ];

function StatusSelect({ selectItem }: { selectItem?: string }) {
  const selectItemValue = statusOptions.find(
    (option) => option.label === selectItem
  );
  const [value, setValue] = useState(selectItemValue);
  return (
    <Select
      dropdownClassName="!z-10"
      inPortal={false}
      placeholder="Select Role"
      options={statusOptions}
      value={value}
      onChange={setValue}
      displayValue={(option: { value: any }) =>
        renderOptionDisplayValue(option.value as string)
      }
    />
  );
}

function renderOptionDisplayValue(value: string) {
  switch (value) {
    case 'Scheduled':
      return (
        <div className="flex items-center">
          <PiClockBold className="shrink-0 fill-green-dark text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <PiCheckCircleBold className="shrink-0 fill-orange text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
  }
}


