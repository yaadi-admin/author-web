import { useFormContext, Controller } from 'react-hook-form';
import { Input, Checkbox, Title, FieldError } from 'rizzui';
import cn from '@/utils/class-names';
import React from 'react';
import FormGroup from '@/app/shared/form-group';
import { typeOfSale, dealHorizon } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import UploadLogo from '@/app/shared/upload-logo';
import ImageUpload from '@/app/shared/image-upload';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import SelectLoader from '@/components/loader/select-loader';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export default function ProductSeo({ className }: { className?: string }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const exitReason = [
    { value: 'Retirement', label: 'Retirement' },
    { value: 'pursuing new opportunity', label: 'Pursuing new opportunity' },
    { value: 'relocation', label: 'Relocation' },
    { value: 'personal (e.g., illness, divorce, etc.)', label: 'Personal (e.g., illness, divorce, etc.)' },
    { value: 'other', label: 'Other' },
  ];


  const handleChange = (value: string, onChange: (val: string) => void) => {
    const rawValue = value.replace(/,/g, ''); // Remove commas for raw value
    // @ts-ignore
    if (!isNaN(rawValue)) {
      onChange(rawValue);
    }
  };

  const formatNumber = (num: string) => {
    return num.toString().replace(/^[+-]?\d+/, function (int) {
      return int.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    });
  };

  return (
    <FormGroup
      title="Company Profile"
      description="Detailed information about the company to help us understand its history and current situation so we can align our services to you. If you don’t know the answer, put ”N/A”"
      className={cn(className)}
    >
      <Input
        label="Year Established"
        placeholder="Year est."
        {...register('yearEstablished')}
        error={errors.yearEstablished?.message as string}
      />
      <Controller
        name="annualRevenue"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Annual Revenue"
            placeholder="Input your prior year’s revenue ($CAD)"
            value={value ? formatNumber(value) : ''}
            onChange={(e) => handleChange(e.target.value, onChange)}
            error={errors.annualRevenue?.message as string}
          />
        )}
      />

      <Controller
        name="annualCashflow"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Annual Cashflow"
            placeholder="Input your prior year’s cash flow ($CAD)"
            value={value ? formatNumber(value) : ''}
            onChange={(e) => handleChange(e.target.value, onChange)}
            error={errors.annualCashflow?.message as string}
          />
        )}
      />
      {/* <Input
        label="Annual Cashflow"
        placeholder="Input your prior year’s cash flow ($CAD)"
        {...register('annualCashflow')}
        error={errors.annualCashflow?.message as string}
      /> */}

      <Controller
        name="hasAccountant"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            value={value}
            onChange={onChange}
            label="Do you have a bookkeeper or accountant?"
            error={errors?.hasAccountant?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="administrativeReadiness"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' },
            { value: 'I have owned less than 5 years', label: 'I have owned less than 5 years' }]}
            value={value}
            onChange={onChange}
            label="Have you prepared/filed tax returns in the last 5 years?"
            error={errors?.administrativeReadiness?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="franchise"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            value={value}
            onChange={onChange}
            label="Is your business a franchise?"
            error={errors?.franchise?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="typeOfSale"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={typeOfSale}
            value={value}
            onChange={onChange}
            label="Type of Sale"
            error={errors?.typeOfSale?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="intendedBuyer"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' },
            { value: 'I am not sure', label: 'I am not sure' }]}
            value={value}
            onChange={onChange}
            label="Are you looking for an external buyer?"
            error={errors?.intendedBuyer?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="exitReason"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={exitReason}
            value={value}
            onChange={onChange}
            label="Exit Reason"
            error={errors?.exitReason?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="valuationReadiness"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            value={value}
            onChange={onChange}
            label="Have you obtained a valuation in the past year?"
            error={errors?.valuationReadiness?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="lawyer"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            className="col-span-full"
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            value={value}
            onChange={onChange}
            label="Do you have a lawyer?"
            error={errors?.lawyer?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <div className="w-full">
        <Title style={{ fontSize: 18 }}>Support Requested</Title>
        <p style={{ fontSize: 14, width: '100%' }}>Please provide us with information on the type and timing of the support you’re looking for. If you’re not sure or circumstances change, you can request additional support along your journey.</p>
        <p className='pt-2' style={{ fontSize: 14, width: '100%' }}>Select all that apply</p>
      </div>

      <Controller
        name="planningSupport"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, I want exit planning support"
            className="col-span-full"
          />
        )}
      />

      <Controller
        name="valuationSupport"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, I want valuation support"
            className="col-span-full"
          />
        )}
      />

      <Controller
        name="financialSupport"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, I want support in getting administratively ready (financial, legal documents. Etc.)"
            className="col-span-full"
          />
        )}
      />

      <Controller
        name="marketingSupport"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, I want support in marketing my business for sale and finding my buyer"
            className="col-span-full"
          />
        )}
      />

      <Controller
        name="dealSupport"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, I want support in how to structure my deal and negotiate"
            className="col-span-full"
          />
        )}
      />

      <Controller
        name="legalSupport"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Yes, I want support in legal administration
"
            className="col-span-full"
          />
        )}
      />

      <Controller
        name="otherKeyDecisionMakers"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
            value={value}
            onChange={onChange}
            label="Are there other owners in the business that need to be involved in the exit process? (I.e., owns >10% of the business)"
            error={errors?.otherKeyDecisionMakers?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />

      <Controller
        name="dealHorizon"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            options={dealHorizon}
            value={value}
            onChange={onChange}
            label="Within how many months would you be prepared to exit the business?"
            error={errors?.dealHorizon?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />


      <div className="w-full">
        <Title style={{ fontSize: 18 }}>Logo and Profile Photo</Title>
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
          name="profilePictureURL"
          control={control}
          render={({ field: { onChange, value } }) => {
            const fileName = (value ?? '').split('/').pop().split('?')[0];
            return (
              <div className=''>
                <UploadLogo label='Upload Profile Photo' modalView={
                  <ImageUpload
                    multiple={false}
                    accept='img'
                    onImageUploaded={(url, cb) => {
                      onChange(url);
                      cb();
                    }}
                    label='Upload Profile Photo'
                    isCompanyLogo={false}
                  />
                }
                />
                {errors?.profilePictureURL?.message && (
                  // @ts-ignore
                  <FieldError size="md" error={(errors?.profilePictureURL?.message) || ''} />
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


    </FormGroup>
  );
}

