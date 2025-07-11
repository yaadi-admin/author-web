'use client';

import { Button, Title, ActionIcon } from 'rizzui';
import SimpleBar from '@/components/ui/simplebar';
import StatusField from '@/components/controlled-table/status-field';

import { PiXBold, PiTimer, PiCalendarCheck } from 'react-icons/pi';


interface FilterDrawerViewProps {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (nextFilter: object) => void;
  handleReset: () => void;
  onClose: () => void;
}
export default function FilterDrawerView(props: FilterDrawerViewProps) {

  const { isFiltered, filters, updateFilter, handleReset, onClose } = props;


  const closeDrawer = () => {
    onClose();
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-white px-5 py-3.5 dark:bg-gray-50">
      <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-4 pb-4">
        <Title as="h5" className="font-semibold">
          More Filters
        </Title>
        <ActionIcon
          size="sm"
          rounded="full"
          variant="text"
          onClick={() => closeDrawer()}
        >
          <PiXBold className="h-4 w-4" />
        </ActionIcon>
      </div>

      <SimpleBar className="h-full">

        <StatusField
          dropdownClassName="!z-10"
          className="mb-4"
          optionClassName="h-9"
          selectClassName="h-[40px] pl-5 pr-3.5 min-w-[150px]"
          // @ts-ignore
          options={statusOptions}
          placeholder='Filter by Status'
          value={filters['status']}
          onChange={(value: string) => {
            updateFilter({ status: value });
          }}
          displayValue={(value: string) => <div className='flex'>{value ? statusIcon[value] : null}{value}</div>}
          getOptionValue={(option: { value: any }) => option.value}
        />

        <StatusField
          dropdownClassName="p-1.5 !z-10"
          className="ms-auto rounded-full @[60rem]:flex"
          optionClassName="h-9"
          selectClassName="h-[40px] pl-5 pr-3.5 min-w-[150px] rounded-full"
          placeholder="Sort by"
          options={percentageOptions}
          value={filters['sortBy']}
          onChange={(value: string) => {
            updateFilter({ sortBy: value });
          }}
          getOptionValue={(option: { value: any }) => option.value}
          displayValue={(value: string) => (percentageOptions || []).find(percentage => percentage.value === value)?.label ?? ''}
          placement="bottom-start"
          inPortal={false}
        />

      </SimpleBar >

      <div className="sticky bottom-0 flex items-center justify-center gap-3 bg-white pb-3 pt-5 dark:bg-gray-50">
        {isFiltered ? (
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              handleReset();
              closeDrawer();
            }}
            className="flex-shrink-0"
          >
            Reset All
          </Button>
        ) : null}
        <Button size="lg" className="w-full" onClick={() => closeDrawer()}>
          Show results
        </Button>
      </div>
    </div >
  );
}



const statusOptions = [
  {
    value: 'Scheduled',
    label: <div className='flex gap-2'><PiCalendarCheck className="me-1.5 h-[17px] w-[17px]" />Scheduled</div>,
  },
  {
    value: 'Waiting',
    label: <div className='flex gap-2'><PiTimer className="me-1.5 h-[17px] w-[17px]" />Waiting</div>,
  },
];

const statusIcon: { [key: string]: React.ReactElement } = {
  'Waiting': <PiTimer className="me-1.5 h-[17px] w-[17px]" />,
  'Scheduled': <PiCalendarCheck className="me-1.5 h-[17px] w-[17px]" />
}

export const percentageOptions = [
  {
    id: 1,
    label: 'Score: Highest',
    value: 'score-highest',
  },
  {
    id: 2,
    label: 'Score: Lowest',
    value: 'score-lowest',
  },
  {
    id: 4,
    label: 'Newest',
    value: 'newest',
  },
  {
    id: 5,
    label: 'Oldest',
    value: 'oldest',
  },
];