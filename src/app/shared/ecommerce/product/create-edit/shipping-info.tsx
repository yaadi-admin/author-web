'use client';

import { JSXElementConstructor, Key, ReactElement, ReactNode, useCallback } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input, Switch, Button, FieldError, Checkbox } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import {
  locationShipping,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
import { industries, industriesMapping, provinces } from '@/data/forms/form-utils';
import TrashIcon from '@/components/icons/trash';
import { PiPlusBold } from 'react-icons/pi';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export default function ShippingInfo({ className }: { className?: string }) {
  const {
    control,
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const { industry, subCategory = [] } = watch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'locationShipping',
  });

  const addCustomField = useCallback(
    () => append([...locationShipping]),
    [append]
  );


  return (
    <FormGroup
      title=""
      description=""
      className={cn(className)}
    >

      <Input
        label="Primary City of Business"
        placeholder="Primary City of Business"
        className="flex-grow"
        {...register(`cob`)}
        error={errors.cob?.message as string}
      />

      <Controller
        name="province"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={provinces}
            value={value}
            onChange={onChange}
            label="Province"
            error={errors?.province?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Input
        label="Which neighborhood is your business in (e.g., Queen West)? If do not want to disclose, re-enter the City’s name."
        placeholder="Queen West"
        className="col-span-full"
        {...register(`neighborhood`)}
        error={errors?.neighborhood?.message as string}
      />

      <Controller
        name="industry"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={industries.map((industry) => ({ label: industry, value: industry }))}
            value={value}
            onChange={(val: { label: string, value: string }) => {
              console.log(val);
              if (val.value !== value) {
                onChange(val.value);
                setValue('subCategory', [])
              }
            }}
            className='col-span-full'
            label="Select Category"
            error={errors?.industry?.message as string}
          />
        )}
      />

      <Controller
        name="subCategory"
        control={control}
        // @ts-ignore
        render={({ field: { onChange, value } }) => {
          const handleChange = (item: string) => {
            const subCategoryArr = [...subCategory];
            const index = subCategoryArr.indexOf(item);
            if (index === -1) {
              subCategoryArr.push(item);
            } else {
              subCategoryArr.splice(index, 1);
            }
            onChange(subCategoryArr);
          };
          const subCategories = industriesMapping[industry] || []
          if (subCategories.length === 0) return null;
          return (
            <div className='col-span-full'>
              <span className='rizzui-input-label block text-sm font-medium col-span-full'>
                Select Subcategories
              </span>
              {errors?.subCategory?.message && (
                // @ts-ignore
                <FieldError size="md" error={(errors?.subCategory?.message) || ''} />
              )}
              {subCategories.map((item) => (<Controller
                key={item}
                name={item} // Use item name as the control name
                control={control}
                render={() => (
                  <Checkbox
                    className='m-2'
                    name={item}
                    variant="outline"
                    label={item}
                    value={subCategory.includes(item)}
                    checked={subCategory.includes(item)}
                    onChange={() => handleChange(item)}
                  />
                )}
              />))}
            </div>
          )
        }}
      />

      <Input
        label="Website"
        type="text"
        // prefix={'https://'}
        placeholder="wwww.yourwebsite.com"
        className="flex-grow"
        {...register(`website`)}
      />

      {/* <Controller
        name="freeShipping"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Switch
            label="Free Shipping"
            className="col-span-full"
            value={value}
            checked={value}
            onChange={onChange}
          />
        )}
      /> */}

      {/* <Input
        label="Shipping Price"
        placeholder="150.00"
        {...register('shippingPrice')}
        error={errors.shippingPrice?.message as string}
        prefix={'$'}
        type="number"
      /> */}
      {/* <Controller
        name="locationBasedShipping"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Switch
            label="Location Based Shipping"
            className="col-span-full"
            value={value}
            checked={value}
            onChange={onChange}
          />
        )}
      /> */}

      {/* {fields.map((item, index) => (
        <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
          <Input
            label="Location Name"
            placeholder="location name"
            className="flex-grow"
            {...register(`locationShipping.${index}.name`)}
          />
          <Input
            label="Shipping Charge"
            placeholder="150.00"
            className="flex-grow"
            {...register(`locationShipping.${index}.value`)}
          />
          {fields.length > 1 && (
            <ActionIcon
              onClick={() => remove(index)}
              variant="flat"
              className="mt-7 shrink-0"
            >
              <TrashIcon className="h-4 w-4" />
            </ActionIcon>
          )}
        </div>
      ))} */}
      {/* <Button
        onClick={addCustomField}
        variant="outline"
        className="col-span-full ml-auto w-auto"
      >
        <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} /> Add Item
      </Button> */}
    </FormGroup>
  );
}
