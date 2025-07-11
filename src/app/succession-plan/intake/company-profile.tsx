'use client';
import React from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { Input, Checkbox, Title, FieldError } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { typeOfSale, dealHorizon } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import UploadLogo from '@/app/shared/upload-logo';
import ImageUpload from '@/app/shared/image-upload';
import dynamic from 'next/dynamic';
import { industriesSuccessionPlan, industriesMapping, provinces } from '@/data/forms/form-utils';

import Image from 'next/image';
import SelectLoader from '@/components/loader/select-loader';
import Owner from './owner';
import Employee from './employee';
import Link from 'next/link';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export default function CompanyProfile({ className }: { className?: string }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const [otherOwners, setShowOtherOwners] = React.useState(false);



  const { fields, append, remove } = useFieldArray({
    control,
    name: 'otherOwners',
  });

  const { fields: orgChart, append: appendOrgChart, remove: removeOrgChart } = useFieldArray({
    control,
    name: 'organizationalChart',
  });


  const onAdd = () => {
    append({ name: '', percentage: '' });
  };

  const onRemove = (index: number) => {
    remove(index);
  };


  const onAddChart = () => {
    appendOrgChart({ name: '', position: '', placeholder: 'Position' });
  };

  const onRemoveChart = (index: number) => {
    removeOrgChart(index);
  };



  return (
    <FormGroup
      title="Company Profile"
      description="Key details of the business"
      className={cn(className)}
    >
      <Input
        label={<span>Business Registration Number (9-digit, <Link rel="noopener noreferrer" target="_blank" href="https://beta.canadasbusinessregistries.ca/search"><u className='text-underline text-blue-500'>lookup here</u></Link>)</span>}
        placeholder="eg. 796212802"
        {...register('registrationNumber')}
        error={errors.registrationNumber?.message as string}
      />
      <Input
        label="Year Incorporated"
        placeholder="Year the business was incorporated"
        {...register('yearIncorporated')}
        error={errors.yearIncorporated?.message as string}
      />


      <Input
        label="Who is the current owner of the Business?"
        placeholder="Current Owner of Business"
        {...register('currentOwner')}
        error={errors.currentOwner?.message as string}
      />


      <Controller
        name="isOtherOwnersInvolved"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            value={value}
            onChange={(val: any) => {
              onChange(val);
              if (val === 'yes') {
                setShowOtherOwners(true);
                if (fields.length === 0) {
                  onAdd();
                }
              }
              if (val === 'no') {

                setShowOtherOwners(false);
                onRemove(0);
              }
            }}
            label="Are there other owners in the business that need to be involved in the exit process? (I.e., owns > 10% of the business"
            error={errors?.isOtherOwnersInvolved?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />
      <div {...register('otherOwners')}>

        {otherOwners &&

          <table className=' bg-white border border-gray-200 border-rounded'>
            <thead>
              <tr>
                <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Name of Owner</th>
                <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">% Ownership</th>
                <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Action</th>

              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) =>
                <Owner
                  key={index}
                  index={index}
                  ownersSize={fields.length}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              )}
            </tbody>
          </table>

        }
      </div>

      <Controller
        name="exitBusinessMonths"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={dealHorizon}
            value={value}
            className="col-span-full"
            onChange={onChange}
            label="Within how many months would you be prepared to exit the business?"
            error={errors?.exitBusinessMonths?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <div className="cols-span-full">
        <Title style={{ fontSize: 18 }}>Logo and Profile Picture *</Title>
      </div>
      <div className='col-span-full flex gap-6'>

        <Controller
          name="logo"
          control={control}
          render={({ field: { onChange, value } }) => {
            const fileName = (value ?? '').split('/').pop().split('?')[0];
            return (
              <div className=''>
                <UploadLogo modalView={
                  <ImageUpload
                    multiple={false}
                    accept='img'
                    onImageUploaded={(url, cb) => {
                      onChange(url);
                      cb();
                    }}
                    label='Upload Logo'
                    isCompanyLogo={false}
                  />
                }
                />
                {errors?.logo?.message && (
                  // @ts-ignore
                  <FieldError size="md" error={(errors?.logo?.message) || ''} />
                )}
                {value &&
                  <div className='mt-1'>
                    <Image
                      src={value}
                      width={50}
                      height={50}
                      alt={'profile-pic'}
                      className="dark:invert"
                    />
                    <p className='pt-2'>{fileName}</p>
                  </div>
                }
              </div>
            )
          }}
        />

        <Controller
          name="profilePicture"
          control={control}
          render={({ field: { onChange, value } }) => {
            const fileName = (value ?? '').split('/').pop().split('?')[0];
            return (
              <div className=''>
                <UploadLogo label='Upload Profile Picture' modalView={
                  <ImageUpload
                    multiple={false}
                    accept='img'
                    onImageUploaded={(url, cb) => {
                      onChange(url);
                      cb();
                    }}
                    label='Upload Profile Picture'
                    isCompanyLogo={false}
                  />
                }
                />
                {errors?.profilePicture?.message && (
                  // @ts-ignore
                  <FieldError size="md" error={(errors?.profilePicture?.message) || ''} />
                )}
                {value &&
                  <div className='mt-1'>
                    <Image
                      src={value}
                      width={50}
                      height={50}
                      alt={'profile-pic'}
                      className="dark:invert"
                    />
                    <p className='pt-2'>{fileName}</p>
                  </div>
                }
              </div>
            )
          }}
        />

      </div>


      <div className="col-span-full mt-6">
        <Title style={{ fontSize: 18 }}>Your Leadership and Management Team</Title>
        <p className='mt-6'>Your plan will cover the current responsibilities and potential future successors for these roles. Include only leadership, management, or other critical roles to your business.</p>
      </div>

      <div {...register('organizationalChart')} className="col-span-full">

        <table className=' bg-white border border-gray-200 border-rounded w-full'>
          <thead>
            <tr>
              <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Name</th>
              <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Position/Title</th>
              <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Action</th>

            </tr>
          </thead>
          <tbody>
            {orgChart.map((field, index) =>
              <Employee
                key={index}
                field={field}
                index={index}
                employeeSize={orgChart.length}
                onAdd={onAddChart}
                onRemove={onRemoveChart}
              />
            )}
          </tbody>
        </table>

      </div>
      <div>      {errors?.organizationalMessage?.message && (
        // @ts-ignore
        <FieldError size="md" error={(errors?.organizationalMessage?.message) || ''} />
      )}
      </div>
    </FormGroup >
  );
}

