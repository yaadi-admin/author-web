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

const jurisdiction = [
  { value: 'AB', label: 'AB' },
  { value: 'BC', label: 'BC' },
  { value: 'MB', label: 'MB' },
  { value: 'NB', label: 'NB' },
  { value: 'NL', label: 'NL' },
  { value: 'NS', label: 'NS' },
  { value: 'ON', label: 'ON' },
  { value: 'PEI', label: 'PEI' },
  { value: 'PQ', label: 'PQ' },
  { value: 'SK', label: 'SK' },
  { value: 'NT', label: 'NT' },
  { value: 'NU', label: 'NU' },
  { value: 'YK', label: 'YK' },
  { value: 'Federal', label: 'Federal' }
];


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
        label="Company Legal Name"
        placeholder="Company Legal Name"
        {...register('companyName')}
        className="col-span-full"
        error={errors.companyName?.message as string}
      />

      <Input
        label="Company Does Business As"
        placeholder="Company Does Business As"
        {...register('dba')}
        className="col-span-full"
        error={errors.dba?.message as string}
      />


      <Controller
        name="legalStructure"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{
              value: 'sole proprietorship',
              label: 'sole proprietorship',
            },
            {
              value: 'partnership',
              label: 'partnership',
            },
            {
              value: 'corporation',
              label: 'corporation',
            },
            {
              value: 'LLC',
              label: 'LLC',
            },
            ]}
            value={value}
            onChange={onChange}
            label="What’s your business’ legal structure?"
            error={errors?.legalStructure?.message as string}
            getOptionValue={(option) => option.value}
          />
        )}
      />

      <Controller
        name="jurisdiction"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={jurisdiction}
            value={value}
            onChange={onChange}
            label="Which jurisdiction are you registered in?"
            error={errors?.jurisdiction?.message as string}
            getOptionValue={(option) => option.value}
          />
        )}
      />

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
        placeholder="www.yourwebsite.com"
        className="flex-grow"
        {...register(`website`)}
      />

    </FormGroup>
  );
}
