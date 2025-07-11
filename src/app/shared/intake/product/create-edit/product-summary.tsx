
import { Controller, useFormContext } from 'react-hook-form';
import { Input, FieldError } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import UploadLogo from '@/app/shared/upload-logo';
import ImageUpload from '@/app/shared/image-upload';
import dynamic from 'next/dynamic';
import Image from 'next/image';
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
import {
  PiFile,
  PiFileCsv,
  PiFileDoc,
  PiFilePdf,
  PiFileXls,
  PiFileZip,
} from 'react-icons/pi'

const fileType = {
  'csv': <PiFileCsv className="h-full w-full" />,
  'plain': <PiFile className="h-full w-full" />,
  'pdf': <PiFilePdf className="h-full w-full" />,
  'xml': <PiFileXls className="h-full w-full" />,
  'zip': <PiFileZip className="h-full w-full" />,
  'gzip': <PiFileZip className="h-full w-full" />,
  'msword': <PiFileDoc className="h-full w-full" />,
} as { [key: string]: React.ReactElement };


export default function ProductSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  console.log(errors);
  return (
    <FormGroup
      title="Summary"
      description="Tell us who you are and how we can reach you."
      className={cn(className)}
    >
      <Controller
        name="representative"
        control={control}
        render={({ field }) => (
          <div className='flex flex-col'>
            <Select
              ref={field.ref}
              dropdownClassName="z-[9999]"
              options={[{
                value: 'Yes',
                label: 'Yes',
              },
              {
                value: 'No',
                label: 'No',
              }]}
              value={field.value}
              onChange={(val) => {
                field.onChange(val)
                trigger('representative')
              }}
              error={errors?.representative?.message as string}
              label="Are you an authorized representative for the business?"
              getOptionValue={(option: { value: any; }) => option.value}
            />
            {errors?.representative?.message !== 'This field is required' && (
              // @ts-ignore
              <FieldError size="md" error={(errors?.representative?.message) || ''} />
            )}
          </div>
        )}
      />
      <Controller
        name="primary"
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
            label="Are you the business primary contact?"
            error={errors?.primary?.message as string}
            getOptionValue={(option: { value: any; }) => option.value}
          />
        )}
      />
      {/* <Input
        label="First Name"
        placeholder="First Name"
        {...register('firstName')}
        error={errors.firstName?.message as string}
      /> */}

      {/* <Input
        label="Last Name"
        placeholder="Last Name"
        {...register('lastName')}
        error={errors.lastName?.message as string}
      /> */}

      <Input
        label="Job Title"
        placeholder="Job Title"
        {...register('title')}
        error={errors.title?.message as string}
      />

      <Input
        label="Designation"
        placeholder="(e.g., CPA, CA)"
        {...register('designation')}
        error={errors.designation?.message as string}
      />

      {/* <Input
        label="Email"
        placeholder="Email"
        {...register('email')}
        error={errors.email?.message as string}
      /> */}

      <Input
        label="Phone #"
        placeholder="Phone Number"
        {...register('contact')}
        error={errors.contact?.message as string}
      />

      <Input
        label="LinkedIn Profile"
        placeholder="Profile URL"
        className='col-span-full'
        {...register('linkedin')}
        error={errors.linkedin?.message as string}
      />
      <Input
        label="Company Legal Name"
        placeholder="Legal name"
        {...register('companyLegalName')}
        className='col-span-full'
        error={errors.companyLegalName?.message as string}
      />
      <Input
        label="Does Business As"
        placeholder="Company Does Business As (Optional)"
        {...register('dba')}
        className="col-span-full"
        error={errors.dba?.message as string}
      />


      <div className='col-span-full'>

        <div className='flex flex-col gap-2'>
          <strong className='' style={{ fontSize: 18 }}>Enhance your Profile</strong>
          <p>Add personality and make your profile stand out by adding your logo and profile pic</p>
          <div className='grid grid-cols-3 mt-6'>
            <Controller
              name="logo"
              control={control}
              render={({ field: { onChange, value } }) => {
                const fileName = (value ?? '').split('/').pop().split('?')[0];
                return (
                  <div className=''>
                    {value &&
                      <div className='mb-1'>
                        <Image
                          src={value}
                          width={50}
                          height={50}
                          alt={'profile-pic'}
                          className="dark:invert"
                        />
                        <p className='pb-2'>{fileName}</p>
                      </div>
                    }
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
                    {value &&
                      <div className='mb-1'>
                        <Image
                          src={value}
                          width={50}
                          height={50}
                          alt={'profile-pic'}
                          className="dark:invert"
                        />
                        <p className='pb-2'>{fileName}</p>
                      </div>
                    }
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
                  </div>
                )
              }}
            />
          </div>



        </div>


      </div>

      <div className='col-span-full'>
        <strong className='' style={{ fontSize: 18 }}>Upload Client Intake Form</strong>
        <p className='my-2 mb-6'>
          Add the form you want to transmit to a user before taking them on as a client with the click of a button on your Client Dashboard.
        </p>

        <Controller
          name="intakeForm"
          control={control}
          render={({ field: { onChange, value } }) => {
            const fileName = (value ?? '').split('/').pop().split('?')[0];
            const type = ((value ?? '').split('.').pop() ?? '').toLowerCase().split('?')[0];

            return (
              <div className=''>
                {value &&
                  <div className='4xs:mt-2 md:mt-6 mb-3 flex flex-col'>
                    <div className='h-10 w-10'>{type && fileType[type]} </div>
                    <p className='pt-2'>{fileName}</p>
                  </div>
                }
                <UploadLogo label='Upload Client Intake Form' modalView={
                  <ImageUpload
                    multiple={false}
                    onImageUploaded={(url, cb) => {
                      onChange(url);
                      cb();
                    }}
                    accept='all'

                    label='Upload Client Intake Form'
                    isCompanyLogo={false}
                  />
                }
                />
                {errors?.intakeForm?.message && (
                  // @ts-ignore
                  <FieldError size="md" error={(errors?.intakeForm?.message) || ''} />
                )}

              </div>
            )
          }}
        />
      </div>




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

