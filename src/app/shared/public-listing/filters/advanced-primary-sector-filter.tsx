import { useEffect, useState } from 'react';
import { Select } from 'rizzui';
import {
  InitialStateType,
  advancedPrimarySectorOptions,
} from '@/app/shared/explore-listing/filters/filter-utils';

export default function AdvancedPrimarySector({
  state,
  applyFilter,
}: {
  state: InitialStateType;
  applyFilter: (query: string, value: any) => void;
}) {
  const [selected, setSelected] = useState('Retail');

  useEffect(() => {
    if (state.advanced_primary_sector) setSelected(state.advanced_primary_sector);
  }, [state.advanced_primary_sector]);

  return (
    <Select
      dropdownClassName="!z-[1]"
      selectClassName="w-full"
      label="Primary Sector"
      labelClassName="text-start text-sm 2xl:text-base font-semibold text-gray-900 mb-5 font-primary"
      placeholder="No min"
      options={advancedPrimarySectorOptions}
      value={selected}
      onChange={(value: string) => {
        setSelected(value);
        applyFilter('advanced_primary_sector', value);
      }}
      getOptionValue={(option) => option.value}
      displayValue={(selected) =>
        advancedPrimarySectorOptions?.find((ps) => ps.value === selected)?.label ?? ''
      }
      inPortal={false}
    />
  );
}
