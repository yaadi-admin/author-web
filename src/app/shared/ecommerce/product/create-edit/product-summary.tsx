import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import {
  categoryOption,
  typeOption,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function ProductSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

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

  return (
    <FormGroup
      title="About You"
      description="Information about you and the business you are looking to sell"
      className={cn(className)}
    >

      <Controller
        name="legalRepresentative"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            className="col-span-full"
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
            label="Are you the authorized representative of the business (i.e., able to make legal, financial, and strategic decisions on behalf of the business)?"
            error={errors?.legalRepresentative?.message as string}
            getOptionValue={(option) => option.value}
          />
        )}
      />

      <Input
        label="First Name"
        placeholder="Seller First Name"
        {...register('firstName')}
        error={errors.firstName?.message as string}
      />

      <Input
        label="Last Name"
        placeholder="Seller Last Name"
        {...register('lastName')}
        error={errors.lastName?.message as string}
      />

      <Input
        label="Email"
        placeholder="Email"
        {...register('email')}
        error={errors.email?.message as string}
      />

      <Input
        label="Phone #"
        placeholder="Contact"
        {...register('contact')}
        error={errors.contact?.message as string}
      />

      <Input
        label="Company Legal Name"
        placeholder="Company Legal Name"
        {...register('companyName')}
        className="col-span-full"
        error={errors.companyName?.message as string}
      />

      <Input
        label="Company Does Business As"
        placeholder="Company Does Business As (Optional)"
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








      {/* <Controller
        name="type"
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
            getOptionValue={(option) => option.value}
          />
        )}
      />

      <Controller
        name="categories"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={categoryOption}
            value={value}
            onChange={onChange}
            label="Categories"
            error={errors?.categories?.message as string}
            getOptionValue={(option) => option.value}
            inPortal={false}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Description"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      /> */}
    </FormGroup>
  );
}