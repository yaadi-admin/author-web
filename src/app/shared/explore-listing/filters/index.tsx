'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { PiSliders, PiTrashDuotone } from 'react-icons/pi';
import { Tooltip, Button, Title } from 'rizzui';
import cn from '@/utils/class-names';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { useFilterControls } from '@/hooks/use-filter-control';
import { useSearchParams } from 'next/navigation';
import { initialState } from '@/app/shared/explore-listing/filters/filter-utils';
import { BusinessStages } from './BusinessStages';
import { Legends } from './Legends';
const FilterDrawerView = dynamic(
  () => import('@/app/shared/explore-listing/filters/drawer-view'),
  { ssr: false }
);

export default function ListingFilters({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const [hasQueryParams, setHasQueryParams] = useState(false);
  const { openDrawer, closeDrawer } = useDrawer();
  const { state, applyFilter, reset } = useFilterControls<typeof initialState, any>(initialState);

  const handlePlaceSelect = (place: any) => {
    applyFilter('search', place.address);
  };

  useEffect(() => {
    const items: any[] = [];
    searchParams.forEach((item) => items.push(item));
    setHasQueryParams(Boolean(items.length));
  }, [searchParams]);

  return (
    <div className={cn('flex items-center justify-between gap-3 bg-white rounded-lg pr-2 pl-2', className)}>
      <div className="relative flex flex-grow">
        {/* Use a grid with 3 columns on large screens */}
        <div className="hidden items-center lg:grid grid-cols-2 gap-3 w-3/5">
          <div className="ml-2 items-center w-3/5 mb-4">
            <Title as="h4" className="text-gray-600 mt-3">
              Business Stages
            </Title>
            <p className="text-sm text-gray-500">
              Hover to view the business stages
              </p>
          </div>
          <div className="ml-2 items-center w-5/5 -ml-[6.5rem]">
            {/* <Title as="h4" className="text-gray-600 -mt-6">
              Business Stages
            </Title> */}
            <BusinessStages gap="gap-4" />
          </div>
          {/* <div className="flex flex-col items-center -mt-2">
            <Title as="h4" className="text-gray-600 mb-6">
              Legends
            </Title>
            <Legends gap="gap-4" />
          </div> */}
        </div>
      </div>
      <Button
        type="button"
        className="flex-shrink-0"
        onClick={() =>
          openDrawer({
            view: <FilterDrawerView />,
            placement: 'right',
          })
        }
      >
        <PiSliders className="me-2 h-4 w-4 rotate-90" />
        Filters
      </Button>
    </div>
  );
}
