'use client';

import { Button, Title, ActionIcon } from 'rizzui';
import SimpleBar from '@/components/ui/simplebar';
import { useMedia } from '@/hooks/use-media';
import { useFilterControls } from '@/hooks/use-filter-control';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import MyFavoritesFilter from '@/app/shared/explore-listing/filters/my-favorites-filter';
import PriceFilter from '@/app/shared/explore-listing/filters/price-filter';
import AdvancedPrimarySector from '@/app/shared/explore-listing/filters/advanced-primary-sector-filter';
import {
  initialState,
  secondarySectorOptions,
} from '@/app/shared/explore-listing/filters/filter-utils';
import { PiXBold } from 'react-icons/pi';
import FilterWithSearch from '@/components/filter-with-search';
import hasSearchedParams from '@/utils/has-searched-params';

export default function FilterDrawerView() {
  const { state, reset, applyFilter, clearFilter } = useFilterControls<
    typeof initialState,
    any
  >(initialState);
  const isWide = useMedia('(min-width: 1537px)', false);
  const { closeDrawer } = useDrawer();

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

      <SimpleBar className="-mx-5 min-h-[calc(100%-10rem)]">
        <div className="space-y-9 px-5">
          {!isWide && (
            <>
              <div className="flex flex-col space-y-3">
                <Title as="h6" className="mb-2 font-medium">
                  Price
                </Title>
                <PriceFilter state={state} applyFilter={applyFilter} />
              </div>
              <div>
                <Title as="h6" className="mb-5 font-semibold">
                  My Favorites
                </Title>
                <MyFavoritesFilter state={state} applyFilter={applyFilter} />
              </div>
            </>
          )}

          <AdvancedPrimarySector state={state} applyFilter={applyFilter} />

          <FilterWithSearch
            title="Secondary Sector"
            name="secondary_sector"
            data={secondarySectorOptions(state.advanced_primary_sector)}
            state={state}
            applyFilter={applyFilter}
            clearFilter={clearFilter}
          />

        </div>
      </SimpleBar>

      <div className="sticky bottom-0 flex items-center justify-center gap-3 bg-white pb-3 pt-5 dark:bg-gray-50">
        {hasSearchedParams() ? (
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              reset();
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
    </div>
  );
}
