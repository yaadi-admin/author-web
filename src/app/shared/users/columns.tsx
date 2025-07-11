'use client';

import { HeaderCell } from '@/components/ui/table';
import { Checkbox, Tooltip, ActionIcon, Badge } from 'rizzui';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import { PriorityType, StatusType } from '@/data/tickets-data';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';

type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
};

const colors = {
  Low: 'success',
  Medium: 'warning',
  High: 'danger',
};

const statusColors = {
  'In Progress': 'info',
  Completed: 'success',
  Open: 'secondary',
  Closed: 'danger',
};

export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
    // {
    //   // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    //   title: <HeaderCell title="ID" className="opacity-0" />,
    //   dataIndex: 'checked',
    //   key: 'checked',
    //   width: 28,
    //   render: () => (
    //     <div className="inline-flex w-7 justify-end lg:w-9">
    //       <Checkbox variant="flat" aria-label="Id" className="cursor-pointer" />
    //     </div>
    //   ),
    // },

    {
      title: (
        <HeaderCell
          title="User"
        // sortable
        // ascending={
        //   sortConfig?.direction === 'asc' && sortConfig?.key === 'user'
        // }
        />
      ),
      onHeaderCell: () => onHeaderCellClick(''),
      dataIndex: '',
      key: '',
      width: 100,
      render: (props: { firstName: string, lastName: string, profilePictureURL: string }) => {
        return (
          <AvatarCard src={props?.profilePictureURL} name={`${props?.firstName} ${props?.lastName}`} />

        )
      },
    },

    {
      title: (
        <HeaderCell
          title="Username"
        // sortable
        // ascending={
        //   sortConfig?.direction === 'asc' && sortConfig?.key === 'user'
        // }
        />
      ),
      width: 100,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: (
        <HeaderCell
          title="First Name"
        />
      ),
      width: 100,
      dataIndex: 'firstName',
      key: 'firstName',
    },

    {
      title: (
        <HeaderCell
          title="Last Name"
        />
      ),
      width: 100,
      dataIndex: 'lastName',
      key: 'lastName',
    },


    {
      title: (
        <HeaderCell
          title="Role"
        // sortable
        // ascending={
        //   sortConfig?.direction === 'asc' && sortConfig?.key === 'user'
        // }
        />
      ),
      dataIndex: 'role',
      key: 'role',
      width: 100,
    },
    // {
    //   title: (
    //     <HeaderCell
    //       title="Assigned To"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'assignedTo'
    //       }
    //     />
    //   ),
    //   onHeaderCell: () => onHeaderCellClick('agent'),
    //   dataIndex: 'agent',
    //   key: 'agent',
    //   width: 400,
    //   // render: ({ name, avatar }: { name: string; avatar: string }) => (
    //   //   <AvatarCard src={avatar} name={name} />
    //   // ),
    // },

    {
      title: (
        <HeaderCell
          title="Last Signin"
        />
      ),
      width: 100,
      onHeaderCell: () => onHeaderCellClick('lastSignIn'),
      dataIndex: 'lastSignIn',
      key: 'lastSignIn',
      render: (value: Date) => {
        // const nextDate = new Date(value.seconds * 1000);
        return <DateCell date={new Date(value)} />
      },
    },
    {
      title: (
        <HeaderCell
          title="Date Registered"
        />
      ),
      onHeaderCell: () => onHeaderCellClick('createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      render: (value: string) => {
        return <DateCell date={new Date(value)} />
      },
    },
    {
      title: (
        <HeaderCell
          title="Actions"
        />
      ),
      dataIndex: '',
      key: '',
      width: 100,
      render: (value: string) => {
        return null
        // return <DateCell date={new Date(value)} />
      },
    },


    // {
    //   title: (
    //     <HeaderCell
    //       title="Due Date"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'dueDate'
    //       }
    //     />
    //   ),
    //   onHeaderCell: () => onHeaderCellClick('dueDate'),
    //   dataIndex: 'dueDate',
    //   key: 'dueDate',
    //   width: 250,
    //   render: (value: Date) => <DateCell date={value} />,
    // },
    // {
    //   title: (
    //     <HeaderCell
    //       title="Priority"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'priority'
    //       }
    //     />
    //   ),
    //   onHeaderCell: () => onHeaderCellClick('priority'),
    //   dataIndex: 'priority',
    //   key: 'priority',
    //   width: 200,
    //   render: (priority: PriorityType) => {
    //     return (
    //       <div className="flex items-center gap-2">
    //         <Badge renderAsDot color={colors[priority] as any} />
    //         <span>{priority}</span>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: (
    //     <HeaderCell
    //       title="Status"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
    //       }
    //     />
    //   ),
    //   onHeaderCell: () => onHeaderCellClick('status'),
    //   dataIndex: 'status',
    //   key: 'status',
    //   width: 200,
    //   render: (status: StatusType) => {
    //     return (
    //       <Badge
    //         variant="outline"
    //         className="w-[90px] font-medium"
    //         color={statusColors[status] as any}
    //       >
    //         {status}
    //       </Badge>
    //     );
    //   },
    // },
    // {
    //   title: <HeaderCell title="Actions" className="opacity-0" />,
    //   dataIndex: 'action',
    //   key: 'action',
    //   width: 120,
    //   render: (_: string, row: any) => (
    //     <div className="flex items-center justify-end gap-3 pe-4">
    //       <Tooltip size="sm" content={'Edit Ticket'} placement="top">
    //         <ActionIcon size="sm" variant="outline" aria-label={'Edit Ticket'}>
    //           <PencilIcon className="h-4 w-4" />
    //         </ActionIcon>
    //       </Tooltip>
    //       <Tooltip size="sm" content={'View Ticket'} placement="top">
    //         <ActionIcon size="sm" variant="outline" aria-label={'View Ticket'}>
    //           <EyeIcon className="h-4 w-4" />
    //         </ActionIcon>
    //       </Tooltip>
    //       <DeletePopover
    //         title={`Delete Ticket!`}
    //         description={`Are you sure you want to delete this Ticket?`}
    //         onDelete={() => onDeleteItem(row.id)}
    //       />
    //     </div>
    //   ),
    // },
  ];
