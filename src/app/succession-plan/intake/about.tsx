import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});
export default function About({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();


  return (
    <FormGroup
      title="About You"
      description="Information about the representative preparing the succession plan"
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

    </FormGroup>
  );
}