'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  PiBed,
  PiCaretDownBold,
  PiCurrencyDollar,
  PiHouse,
  PiMapPin,
  PiSignpost,
  PiSliders,
  PiTrashDuotone,
} from 'react-icons/pi';
import { LiaIndustrySolid } from "react-icons/lia";
import { Popover, Button, Title, Switch } from 'rizzui';
import cn from '@/utils/class-names';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { useFilterControls } from '@/hooks/use-filter-control';
import { useSearchParams } from 'next/navigation';
import Autocomplete from '@/components/google-map/autocomplete';
import PriceFilter from '@/app/shared/explore-listing/filters/price-filter';
import SectorFilter from '@/app/shared/explore-listing/filters/sector-filter';
import MyFavoritesFilter from '@/app/shared/explore-listing/filters/my-favorites-filter';
import { initialState } from '@/app/shared/explore-listing/filters/filter-utils';
const FilterDrawerView = dynamic(
  () => import('@/app/shared/explore-listing/filters/drawer-view'),
  { ssr: false }
);

export default function ListingFilters({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const [hasQueryParams, setHasQueryParams] = useState(false);
  const { openDrawer, closeDrawer } = useDrawer();
  const { state, applyFilter, reset } = useFilterControls<
    typeof initialState,
    any
  >(initialState);

  const handlePlaceSelect = (place: any) => {
    applyFilter('search', place.address);
  };

  useEffect(() => {
    const items = [];
    searchParams.forEach((item) => items.push(item));
    setHasQueryParams(Boolean(items.length));
  }, [searchParams]);

  return (
    <div className={cn('flex items-center justify-between gap-3 ', className)}>
      <div className="relative flex flex-grow items-center gap-3">
        <div className="relative w-full xs:max-w-[298px]">
          <Autocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
            onPlaceSelect={handlePlaceSelect}
            spinnerClassName="hidden"
            hideMap
            inputProps={{
              prefix: <PiMapPin className="h-5 w-5" />,
              placeholder: 'City, Neighborhood, Address',
              inputClassName:
                'dark:[&_input::placeholder]:!text-gray-600 [&_input]:pe-3 [&_input]:ps-10',
              prefixClassName: 'absolute start-3',
              className: '[&_label>div]:p-0',
              clearable: false,
            }}
            mapClassName="rounded-lg"
          />
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Popover placement="bottom-end" shadow="sm">
            <Popover.Trigger>
              <Button type="button" variant="outline">
                <PiCurrencyDollar className="me-1 text-lg text-gray-900" />
                Price
                <PiCaretDownBold className="ms-2 h-4 w-4" />
              </Button>
            </Popover.Trigger>
            <Popover.Content className="!z-0 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100 ">
              {({ setOpen }) => (
                <PopoverContent
                  title="Price"
                  className="w-[350px]"
                  setOpen={setOpen}
                >
                  <PriceFilter
                    state={state}
                    applyFilter={applyFilter}
                    setOpen={setOpen}
                  />
                </PopoverContent>
              )}
            </Popover.Content>
          </Popover>

          <Popover placement="bottom-end" shadow="sm">
            <Popover.Trigger>
              <Button type="button" variant="outline">
                <LiaIndustrySolid className="me-2 text-lg text-gray-900" />
                Sector
                <PiCaretDownBold className="ms-2 h-4 w-4" />
              </Button>
            </Popover.Trigger>
            <Popover.Content className="!z-0 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
              {({ setOpen }) => (
                <PopoverContent
                  title="Sector"
                  className="w-[276px]"
                  setOpen={setOpen}
                >
                  <SectorFilter
                    state={state}
                    applyFilter={applyFilter}
                    setOpen={setOpen}
                  />
                </PopoverContent>
              )}
            </Popover.Content>
          </Popover>

          <MyFavoritesFilter
            state={state}
            applyFilter={applyFilter}
          />


          {hasQueryParams && (
            <Button
              type="button"
              variant="flat"
              onClick={() => {
                closeDrawer();
                reset();
              }}
            >
              <PiTrashDuotone className="me-2 h-5 w-5" />
              Clear
            </Button>
          )}
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

export function PopoverContent({
  title,
  children,
  className,
}: React.PropsWithChildren<{
  title: string;
  className?: string;
  setOpen: (value: boolean) => void;
}>) {
  return (
    <div className={cn('w-44', className)}>
      <div className="p-4 pt-3.5">
        <Title
          as="h4"
          className="mb-5 text-start text-sm font-semibold capitalize text-gray-600"
        >
          {title}
        </Title>
        {children}
      </div>
    </div>
  );
}
