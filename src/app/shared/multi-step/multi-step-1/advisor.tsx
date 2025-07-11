'use client'
import React from 'react';
import { Input, Checkbox, Button, Select } from 'rizzui';
import { Controller, useFormContext } from 'react-hook-form';

interface AdvisorProps {
  advisor: any,
  index: number,
  readOnly?: boolean,
}
export default function Advisor(props: AdvisorProps) {
  const { advisor, index, readOnly = false } = props;
  const {
    register,
    setValue,
    formState,
    control,
  } = useFormContext();

  const positions = [
    'Accountant',
    'Lawyer',
    'Commercial Realtor',
    'Banker',
    'Insurance Broker'
  ];

  if (readOnly) {
    return (
      <tr className=''>
        <td className="px-6 py-3">
          <b className=''>{positions[index]}</b>
        </td>
        <td className="px-2 py-3">
          {advisor.name}
        </td>
        <td className="px-2 py-3">
          {advisor.companyName}
        </td>
        <td className="px-2 py-3">
          {advisor.email}
        </td>
        <td className="px-2 py-3">
          {advisor.phoneNumber}
        </td>
      </tr>
    )
  }
  console.log(formState);
  const options = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    (advisor.position === 'Lawyer' ? { value: 'Unsure', label: 'Unsure' } : null),
  ].filter(Boolean);

  return (
    <div className='mb-5 flex w-full gap-10 '>
      <tr className='w-[200px]'>
        <td className="px-6 pt-3">
          {advisor.position === 'Accountant/Bookkeeper'
            ?
            <h4 className=''>Who is your <br /> accountant/<br />bookkeeper?</h4>
            :
            <h4 className='break-word'>{advisor.label}</h4>

          }
        </td>
      </tr>
      <div className='px-10 grid-cols-2 grid w-[80%] mx-auto'>

        <td className="px-2 pt-3">
          <input type="hidden" {...register(`advisors.${index}.position`)} value={advisor.position} />
          <Input size="lg" type="text" placeholder={`${advisor.position} Name`} label={`${advisor.position} Name`} className=""
            {...register(`advisors.${index}.name`)}
          />
        </td>

        <td className="px-2 py-3">
          <Input size="lg" type="text" placeholder={`${advisor.position} E-mail`} label={`${advisor.position} E-mail`} className=""
            {...register(`advisors.${index}.email`)} />
        </td>
        <td className="px-2 py-3">

          <Input size="lg" type="text" placeholder={`${advisor.position} Phone #`} label={`${advisor.position} Phone #`} className=""
            {...register(`advisors.${index}.phoneNumber`)} />
        </td>
        <td className="px-2 py-3">
          <Controller
            name={`advisors.${index}.canContact`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                size="lg"
                dropdownClassName="z-[9999]"
                options={[
                  { value: 'Yes', label: 'Yes' },
                  { value: 'No', label: 'No' },
                ]}
                value={value}
                onChange={(val: any) => onChange(val.value)}
                label="Permission to contact?"
              />
            )}
          />
        </td>
        <td className="px-2 py-3">
          <Input size="lg" type="text" placeholder={`${advisor.position} Firm/Company Name`} label={`${advisor.position} Firm/Company Name`} className=""
            {...register(`advisors.${index}.companyName`)} />
        </td>

      </div>
      <div className='w-[20%] my-auto mr-5'>

        <p className='mb-5'>{`Don't have ${['A', 'E', 'I', 'O', 'U'].includes(advisor.position.charAt(0)) ? 'an' : 'a'} ${advisor.position} ${advisor.position === 'Lawyer' ? 'with M&A experience' : ''}?`} </p>
        <Button className="m-auto" size="lg" onClick={() => window.open(`${window.location.origin}/search/provider`, '_blank')}>{advisor.action}</Button>
      </div>
    </div>
  )
}

{/* <td className="px-2 py-3">

          <Controller
            name={`advisors.${index}.details`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                dropdownClassName="z-[9999]"
                options={options}
                value={value}
                onChange={(val: any) => onChange(val.value)}
                label={advisor.details}
              />
            )}
          />
        </td> */}