'use client';

import { useCallback, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input, Switch, FieldError, Textarea } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import {
  provinces,
  industry,
  propositions,
  category,
  locationShipping,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
import TrashIcon from '@/components/icons/trash';
import { PiPlusBold } from 'react-icons/pi';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import UploadIntake from '@/app/shared/upload-intake';
import UploadLogo from '@/app/shared/upload-logo';
const FileUpload = dynamic(() => import('@/app/shared/file-upload'), {
  ssr: false,
});

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const categoriesData = [
  "Accounting/Bookkeeping",
  "CBV/Valuator",
  "Lawyer/Legal Services",
  "Tax, Financial, & Estate Planner",
  "M&A Advisor",
  "Marketing & Media Production",
  "Human Resources & Transition Planning",
  "Business Strategy & Operations Advisory",
  "Banking, Finance, and Insurance Provider",
  "Business Brokerage",
  "Real Estate Brokerage"
];

export default function ShippingInfo({ className }: { className?: string }) {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext();


  const { industries = [], categories = [] } = watch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'locationShipping',
  });

  const addCustomField = useCallback(
    () => append([...locationShipping]),
    [append]
  );

  const [logoField, setLogoField] = useState('');


  return (
    <FormGroup
      title="Provider Information"
      description="Tell us about your service and the size of your business."
      className={cn(className)}
    >

      {/* <Controller
        name="representative"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            }]}
            value={value}
            onChange={onChange}
            label="Representative"
            error={errors?.representative?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <div className="col-span-full flex gap-4 xl:gap-7">
        <Input
          label="First Name"
          placeholder="First Name"
          className="flex-grow"
          {...register(`representativeFirstName`)}
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          className="flex-grow"
          {...register(`representativeLastName`)}
        />
      </div>

      <div className="col-span-full flex gap-4 xl:gap-7">
        <Input
          label="Email"
          placeholder="Email"
          className="flex-grow"
          {...register(`representativeEmail`)}
        />
        <Input
          label="Contact"
          placeholder="Contact"
          className="flex-grow"
          {...register(`representativeContact`)}
        />
      </div>
      */}

      <Input
        label="Primary City of Business"
        placeholder="Primary City of Business"
        className="flex-grow"
        {...register(`cob`)}
        error={errors?.cob?.message as string}
      />

      {/* <Input
        label="Logo"
        placeholder="Logo"
        className="flex-grow"
        value={'logo url'}
        {...register(`logo`)}
      /> */}

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

      {/* <Controller
        name="category"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={industry}
            value={value}
            onChange={onChange}
            label="Service Category"
            error={errors?.category?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      /> */}

      <Input
        label="Website"
        placeholder="www.yourwebsite.com"
        className="flex-grow"
        {...register(`website`)}
        error={errors?.website?.message as string}
      />

      <Textarea
        label="Company Description"
        placeholder={`Describe your company's business history and offerings. You may choose to copy-paste this from your website's "About Us" page.`}
        className="col-span-full"
        {...register(`description`)}
        error={errors?.description?.message as string}
      />

      <Input
        label="Years in Business"
        placeholder="How many years has the company been established"
        className="flex-grow"
        {...register(`YIB`)}
        error={errors?.YIB?.message as string}

      />

      <Input
        label="Number of Employees"
        placeholder="Approximate number of employees"
        className="flex-grow"
        {...register(`employees`)}
        error={errors?.employees?.message as string}
      />

      <Controller
        name="Proposition1"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={propositions}
            value={value}
            onChange={onChange}
            label="Unique Selling Proposition #1"
            error={errors?.Proposition1?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="Proposition2"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={propositions}
            value={value}
            onChange={onChange}
            label="Unique Selling Proposition #2"
            error={errors?.Proposition2?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="Proposition3"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={propositions}
            className='col-span-full'
            value={value}
            onChange={onChange}
            label="Unique Selling Proposition #3"
            error={errors?.Proposition3?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={category}
            value={value}
            className='col-span-full'
            onChange={onChange}
            label="Primary Category"
            error={errors?.category?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />



      <strong className='col-span-full' style={{ fontSize: 18 }}>Secondary Categories</strong>

      <div className="col-span-full">

        <Controller
          name="categories"
          control={control}
          render={({ field: { onChange, value } }) => {
            const handleChange = (item: string) => {
              const categoriesArr = [...categories];
              const index = categoriesArr.indexOf(item);
              if (index === -1) {
                categoriesArr.push(item);
              } else {
                categoriesArr.splice(index, 1);
              }
              onChange(categoriesArr);
            };
            return (
              <div className="flex">
                {errors?.categories?.message && (
                  // @ts-ignore
                  <FieldError size="md" error={(errors?.categories?.message) || ''} />
                )}
                <div className='w-1/2'>
                  {categoriesData.slice(0, 5).map((item) => (
                    <Controller
                      key={item}
                      name={item.replace(/[\s&/]/g, "_").toLowerCase()} // Use item name as the control name
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          name={item.replace(/[\s&/]/g, "_").toLowerCase()} // Use item name as the control name
                          label={item}
                          value={categories.includes(item)}
                          checked={categories.includes(item)}
                          onChange={() => handleChange(item)}
                        />
                      )}
                    />
                  ))}
                </div>
                <div className='w-1/2'>
                  {categoriesData.slice(5, 11).map((item) => (
                    <Controller
                      key={item}
                      name={item.replace(/[\s&/]/g, "_").toLowerCase()} // Use item name as the control name
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          name={item.replace(/[\s&/]/g, "_").toLowerCase()} // Use item name as the control name
                          label={item}
                          value={categories.includes(item)}
                          checked={categories.includes(item)}
                          onChange={() => handleChange(item)}
                        />
                      )}
                    />
                  ))}
                </div>
              </div>)
          }}
        />

      </div>

      <strong className='col-span-full' style={{ fontSize: 18 }}>Industry Expertise</strong>

      <div className="col-span-full">

        <Controller
          name="industries"
          control={control}
          render={({ field: { onChange, value } }) => {
            const handleChange = (item: string) => {
              const industriesArr = [...industries];
              const index = industriesArr.indexOf(item);
              if (index === -1) {
                industriesArr.push(item);
              } else {
                industriesArr.splice(index, 1);
              }
              onChange(industriesArr);
            };
            return (
              <div className="flex">
                {errors?.industries?.message && (
                  // @ts-ignore
                  <FieldError size="md" error={(errors?.industries?.message) || ''} />
                )}
                <div className='w-1/2'>
                  {industry.slice(0, 7).map((item) => (
                    <Controller
                      key={item?.label}
                      name={(item?.label).toLowerCase()} // / Use item name as the control name
                      control={control}
                      render={({ }) => (
                        <Switch
                          name={item?.label}
                          label={item?.label}
                          value={industries.includes(item?.label)}
                          checked={industries.includes(item?.label)}
                          onChange={() => handleChange(item?.label)}
                        />
                      )}
                    />
                  ))}
                </div>
                <div className='w-1/2'>
                  {industry.slice(7, 13).map((item) => (
                    <Controller
                      key={item?.label}
                      name={(item?.label).toLowerCase()} // / Use item name as the control name
                      control={control}
                      render={({ }) => (
                        <Switch
                          name={item?.label}
                          label={item?.label}
                          value={industries.includes(item?.label)}
                          checked={industries.includes(item?.label)}
                          onChange={() => handleChange(item?.label)}
                        />
                      )}
                    />
                  ))}
                </div>
              </div>)
          }}
        />
      </div>

      {/* <div className="flex col-span-full">
        <div className='w-1/2'>
          {industry.slice(0, 7).map(item => (<Controller
            key={item?.label}
            name={(item?.label).toLowerCase()} // Use item name as the control name
            control={control}
            render={({ field: { value, onChange } }) => (
              <Switch
                name={item?.label}
                label={item?.label}
                // className="col-span-full"
                value={value}
                checked={value}
                onChange={onChange}
              />
            )}
          />
          ))}
        </div>

        <div className='w-1/2'>
          {industry.slice(7, 13).map(item => (<Controller
            key={item?.label}
            name={(item?.label).replace(/[\s&/]/g, "_").toLowerCase()} // Use item name as the control name
            control={control}
            render={({ field: { value, onChange } }) => (
              <Switch
                name={item?.label}
                label={item?.label}
                // className="col-span-full"
                value={value}
                checked={value}
                onChange={onChange}
              />
            )}
          />
          ))}
        </div>

      </div> */}

      <>
        {/* {categories.map(category => (
          <div key={category}>
            <strong>{category}:</strong><br />
            {categories.map(item => (
              <Controller
                key={item}
                name={item.replace(/[\s&/]/g, "_").toLowerCase()} // Use item name as the control name
                control={control}
                render={({ field }) => (
                  <div>
                    <input
                      type="checkbox"
                      id={item.replace(/[\s&/]/g, "_").toLowerCase()}
                      {...field}
                    />
                    <label htmlFor={item.replace(/[\s&/]/g, "_").toLowerCase()}>{item}</label>
                  </div>
                )}
              />
            ))}
          </div>
        ))} */}
      </>

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