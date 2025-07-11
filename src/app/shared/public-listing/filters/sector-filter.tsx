'use client';

import { useEffect, useState } from 'react';
import { CheckboxGroup, Checkbox, Button } from 'rizzui';
import { useMedia } from '@/hooks/use-media';
import {
  InitialStateType,
  sectorTypes,
} from '@/app/shared/explore-listing/filters/filter-utils';

export default function SectorFilter({
  state,
  applyFilter,
  setOpen,
}: {
  state: InitialStateType;
  applyFilter: (query: string, value: any) => void;
  setOpen?: any;
}) {
  const isWide = useMedia('(min-width: 1537px)', false);
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    if (typeof state.primary_sector === 'string')
      setValues(state.primary_sector.split(','));
  }, [state.primary_sector]);

  useEffect(() => {
    if (!isWide && values.length) applyFilter('primary_sector', values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, isWide]);

  return (
    <>
      <CheckboxGroup
        values={values}
        setValues={setValues}
        className="flex flex-col space-y-4"
      >
        {sectorTypes?.map((item: any) => {
          return (
            <Checkbox
              key={`${item.name}-key-${item.id}`}
              label={
                <div className="flex items-center justify-between text-gray-800">
                  {item.name}
                </div>
              }
              labelClassName="w-full"
              name={'primary_sector'}
              value={item.value}
            />
          );
        })}
      </CheckboxGroup>
      {isWide && (
        <Button
          onClick={() => {
            setOpen(false);
            applyFilter('primary_sector', values);
          }}
          className="mt-5 w-full rounded-md dark:bg-gray-50 dark:text-white"
        >
          Apply
        </Button>
      )}
    </>
  );
}
