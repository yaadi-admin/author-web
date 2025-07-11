'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip } from 'rizzui';
import cn from '@/utils/class-names';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import ChatSolidIcon from '@/components/icons/chat-solid';
import ParcelMapIcon from '@/components/icons/parcel-map';
import DeletePopover from '@/app/shared/delete-popover';
import UserAvatarIcon from '@/components/icons/user-avatar';
import { Actions } from './actions';

function scoreColorClassName(score: number): string {
  if (score > 79) {
    return "text-green-700"; // Darker green for high scores
  } else if (score > 59) {
    return "text-yellow-500"; // Yellow for medium scores
  } else {
    return "text-red-500"; // Red for low scores
  }
}


type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
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
}: Columns) => [
    {
      title: (
        <HeaderCell
          title="Match Score"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'overall_match_score'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('overall_match_score'),
      dataIndex: 'overall_match_score',
      key: 'overall_match_score',
      width: 220,
      render: (overall_match_score: any) => {
        const score = Number(overall_match_score).toFixed(0);
        return (
            <div className="flex items-center">
            <div
              className={cn(
              "w-16 h-12 flex items-center justify-center rounded-full text-lg font-bold",
              Number(score) > 79
                ? "bg-green-100 text-green-700"
                : Number(score) > 59
                ? "bg-yellow-100 text-yellow-500"
                : "bg-red-100 text-red-500"
              )}
            >
              {!isNaN(Number(score)) ? Number(score).toFixed(0) : 'N/A'}%
            </div>
            </div>
        );
      },
    },
    {
      title: <HeaderCell title="Investor" />,
      onHeaderCell: () => onHeaderCellClick('investor.name'),
      dataIndex: 'investor',
      key: 'investor.data',
      width: 250,
      render: (investor: any) => (
        <AvatarCard src={investor.data.profilePicture} name={investor.data.firstName + ' ' + investor.data.lastName} description={investor.data.email} />
      ),
    },
    {
      title: <HeaderCell title="Range" />,
      dataIndex: 'investor_profile',
      key: 'investor_profile.investment_amount_range',
      width: 250,
      render: (investor_profile: any) => (
        <Text className="whitespace-nowrap font-medium font-semibold">
          {investor_profile.investment_amount_range}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="Match Criteria" />,
      dataIndex: 'matching_analysis',
      key: 'matching_analysis[5].criteria',
      width: 300,
      render: (matching_analysis: any) => (
        <Text className="line-clamp-2 text-sm text-gray-600 font-semibold">
          {matching_analysis[5].criteria}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="Industry" />,
      dataIndex: 'business_profile',
      key: 'business_profile.industry',
      width: 300,
      render: (business_profile: any) => (
        <Text className="whitespace-nowrap font-semibold">
          {business_profile.industry}
        </Text>
      ),
    },
    {
      title: (
        <HeaderCell title={<span className="whitespace-nowrap">Match Date</span>} />
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 500,
      render: (createdAt: any) => {
        // Assuming createdAt is a Firestore Timestamp; convert to Date.
        const dateObj = createdAt?.seconds ? new Date(createdAt.seconds * 1000) : new Date(createdAt);
        return <DateCell date={dateObj} />;
      },
    },
    {
      title: (
        <HeaderCell title={<span className="whitespace-nowrap">Actions</span>} />
      ),
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (_: string, row: any) => (
        <Actions row={row} onDeleteItem={onDeleteItem} />
      ),
    },
  ];
