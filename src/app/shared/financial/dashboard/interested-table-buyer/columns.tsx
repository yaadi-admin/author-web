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
                    "w-16 h-12 flex items-center justify-center rounded-lg text-lg font-bold",
                    Number(score) > 79
                      ? "text-green-800"
                      : Number(score) > 59
                        ? "text-yellow-700"
                        : "text-red-700"
                  )}
                >
                  {!isNaN(Number(score)) ? Number(score).toFixed(0) : 'N/A'}%
                </div>
              </div>
            );
          },
        },
        {
          title: <HeaderCell title="Business" />,
          onHeaderCell: () => onHeaderCellClick('business.data'),
          dataIndex: 'business',
          key: 'business.data',
          width: 300,
          render: (business: any) => (
            <AvatarCard src={business.data.file1} name={business.data.companyName} description={`${business.data.city}, ${business.data.country}`} />
          ),
        },
        {
          title: <HeaderCell title="Financing Goal" />,
          dataIndex: 'business_profile',
          key: 'business_profile.financing_required',
          width: 260,
          render: (business_profile: any) => (
            <Text className="whitespace-nowrap font-semibold" >
              {business_profile.financing_required}
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
          width: 250,
          render: (business_profile: any) => (
            <Text className="whitespace-nowrap font-semibold">
              {business_profile.industry}
            </Text>
          ),
        },
        {
          title: (
            <HeaderCell
              title="Growth Probability"
              sortable
              ascending={
                sortConfig?.direction === 'asc' && sortConfig?.key === 'business.growthProbability'
              }
            />
          ),
          onHeaderCell: () => onHeaderCellClick('business.growthProbability'),
          dataIndex: 'business',
          key: 'business',
          width: 220,
          render: (business: any) => {
            const score = Number(business.growthPotentialScore).toFixed(0);
            return (
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-16 h-12 flex items-center justify-center rounded-full text-lg font-bold",
                    Number(score) > 79
                      ? "text-green-800"
                      : Number(score) > 59
                        ? "text-yellow-700"
                        : "text-red-700"
                  )}
                >
                  {!isNaN(Number(score)) ? Number(score).toFixed(0) : 'N/A'}%
                </div>
              </div>
            );
          },
        },
        {
          title: <HeaderCell title="Stage" />,
          dataIndex: 'business_profile',
          key: 'business_profile.stage',
          width: 200,
          render: (business_profile: any) => (
            <Text className="whitespace-nowrap font-semibold" >
              {business_profile.stage}
            </Text>
          ),
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
