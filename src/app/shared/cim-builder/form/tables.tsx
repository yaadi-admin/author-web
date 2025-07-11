import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button, Input, FieldError, Checkbox } from 'rizzui';
export default function Tables(props: any) {
  const { field, control, register } = props;


  const { fields, append, remove } = useFieldArray({
    control,
    name: field.key,
  });
  return (
    <table className="mt-5 min-w-full bg-white border border-gray-200 col-span-full">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b-2 border-gray-200">{field.column1Name}</th>
          <th className="px-4 py-2 border-b-2 border-gray-200">{field.column2Name}</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: field.numRows }).map((_, index) => (
          <tr key={index} className="text-xl">
            <td className="px-6 py-4 border-b border-gray-200">
              <Input
                // label="Custom Field Name"
                // placeholder="custom field name"
                className="flex-grow"
                {...register(`${field.key}.${index}.${field.column1Name}`)}
              />
            </td>
            <td className="px-6 py-4 border-b border-gray-200">
              <Input
                //label="Custom Field Name"
                //placeholder="custom field name"
                className="flex-grow"
                {...register(`${field.key}.${index}.${field.column2Name}`)}
              />

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
