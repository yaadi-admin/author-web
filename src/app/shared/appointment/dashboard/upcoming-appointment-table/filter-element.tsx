'use client';

import { useState } from 'react';
import StatusField from '@/components/controlled-table/status-field';
import { Button, Input } from 'rizzui';
import dynamic from 'next/dynamic';

const Drawer = dynamic(() => import('rizzui').then((module) => module.Drawer), {
  ssr: false,
});

import { PiSliders, PiTimer, PiTrashDuotone, PiCalendarCheck, PiMagnifyingGlassBold } from 'react-icons/pi';

const FilterDrawerView = dynamic(
  () => import('./filter-drawer-view'),
  { ssr: false }
);

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (nextFilter: object) => void;
  handleReset: () => void;
};
export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
}: FilterElementProps) {

  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div className="flex w-full flex-row">
      <div>
        <Input
          type="search"
          placeholder="Search by name"
          value={filters['name']}
          onClear={() => {
            updateFilter({ name: '' });
          }}
          onChange={(e) => {
            updateFilter({ name: e.target.value });
          }}
          inputClassName="h-[40px] rounded-full"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          className="pr-3.5 "
        />
      </div>
      <div className='4xs:hidden md:flex'>
        <StatusField
          dropdownClassName="!z-10"
          className=""
          optionClassName="h-9"
          selectClassName="h-[40px] pl-5 pr-3.5 min-w-[150px] rounded-full"
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
      </div>
      <div className='ml-auto flex items-center 4xs:hidden md:flex'>
        {isFiltered ? (
          <Button
            size="md"
            onClick={() => {
              handleReset();
            }}
            className="ml-auto mr-4 h-[40px] bg-gray-200/70 rounded-full"
            variant="flat"
          >
            <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
          </Button>
        ) : null}

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
      </div>

      <div className='ml-auto md:hidden'>
        <Button
          type="button"
          className="flex-shrink-0"
          onClick={() => setOpenDrawer(true)}
        >
          <PiSliders className="me-2 h-4 w-4 rotate-90" />
          Filters
        </Button>
      </div>

      <Drawer
        isOpen={openDrawer ?? false}
        onClose={() => setOpenDrawer(false)}
        overlayClassName="dark:bg-opacity-20 dark:backdrop-blur-md"
        containerClassName="dark:bg-gray-100"
        className="z-[9999]"
        customSize="40%"
      >
        <FilterDrawerView
          isFiltered={isFiltered}
          filters={filters}
          updateFilter={updateFilter}
          handleReset={handleReset}
          onClose={() => setOpenDrawer(false)}
        />
      </Drawer>
    </div>
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