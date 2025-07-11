'use client'
import React from 'react';
import { Input, Checkbox, Select, Text, Tooltip, Button } from 'rizzui';
import { useFormContext, Controller } from 'react-hook-form';
import { FcInfo } from "react-icons/fc";
import { FaCheck } from "react-icons/fa";


interface DocumentProps {
  doc: any,
  index: number,
  readOnly?: boolean,
}
export default function Document(props: DocumentProps) {
  const { doc, index, readOnly = false } = props;
  const {
    register,
    setValue,
    formState,
    control,
  } = useFormContext();


  return (
    <tr>
      <td className="px-2 py-3 w-[240px]">
        <p className='flex w-full'>

          <b className=''>{doc.name}</b>
          <Tooltip size="lg" content={<CustomContent title={doc.helperMessage} />}>
            <Button variant="text" className='ml-auto'>
              <FcInfo className='h-7 w-7' />
            </Button>
          </Tooltip>
        </p>

      </td>
      <td className="px-2 py-3 w-[200px]">
        <p>{doc.periodCovered}</p>
        <input type="hidden" {...register(`checklist.${index}.periodCovered`)} value={doc.periodCovered} />
      </td>
      <td className="px-2 py-3 w-[240px]">
        <Controller
          name={`checklist.${index}.readilyAccessible`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              dropdownClassName="z-[9999]"
              options={[
                { value: 'Yes', label: 'Yes' },
                { value: 'Need to gather', label: 'Need to gather' },
                { value: 'Needs to be prepared', label: 'Needs to be prepared' },
              ]}
              value={value}
              onChange={(val: any) => onChange(val.value)}
            // label="Readily Accessible?"
            />
          )}
        />
      </td>
      <td className="px-2 py-3">
        {doc.needsAdjustmentOrEdits === 'N/A' ? 'N/A' :
          <Controller
            name={`checklist.${index}.needsAdjustmentOrEdits`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                dropdownClassName="z-[9999]"
                options={[
                  { value: 'Yes', label: 'Yes' },
                  { value: 'No', label: 'No' },
                  { value: 'Unsure', label: 'Unsure' },
                ]}
                value={value}
                onChange={(val: any) => onChange(val.value)}
              // label="Needs adjustment or edits?"
              />
            )}
          />
        }
      </td>
      <td className="px-2 py-3 w-[200px]">
        {doc.professionalSupport === 'N/A' ? 'N/A' :
          <Controller
            name={`checklist.${index}.professionalSupport`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                dropdownClassName="z-[9999]"
                options={[
                  { value: 'Yes', label: 'Yes' },
                  { value: 'No', label: 'No' },
                ]}
                value={value}
                onChange={(val: any) => onChange(val.value)}
              // label="Do you want professional support to prepare it?"
              />
            )}
          />
        }
      </td>
      <td className="px-2 py-3 text-center">
        {doc?.buttonLabel ? <Button onClick={() => window.open(`${window.location.origin}/search/provider`)}>{doc.buttonLabel}</Button> : null}
      </td>
    </tr>
  )
}
function CustomContent({ title }: { title: string }) {
  return (
    <div className="w-80 text-start">

      <Text className="text-sm text-white-600">
        {title}
      </Text>
    </div>
  );
}