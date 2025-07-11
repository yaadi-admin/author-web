'use client'
import React from 'react';
import { Button, Input } from 'rizzui';
import { useFormContext } from 'react-hook-form';
import { PiMinusCircleFill, PiPlusCircleFill } from "react-icons/pi";

interface EmployeeProps {
  index: number,
  employeeSize: number,
  onAdd: () => void,
  field: any,
  onRemove: (index: number) => void,
}
export default function Employee(props: EmployeeProps) {
  const { field, index, employeeSize, onAdd, onRemove } = props;

  const {
    register,
    formState,
  } = useFormContext();


  return (

    <tr className=''>
      <td className="px-2 py-3">
        <Input type="text" placeholder={`Name`} className=""
          {...register(`organizationalChart.${index}.name`)}
          // @ts-ignore
          error={formState.errors?.organizationalChart?.[index]?.name?.message as any} />
      </td>
      <td className="px-2 py-3">
        <Input type="text" placeholder={`Position`} className=""
          {...register(`organizationalChart.${index}.position`)}
          // @ts-ignore
          error={formState.errors?.organizationalChart?.[index]?.position?.message as any}
        />
      </td>
      <td className=' px-2 py-3 flex gap-2'>
        {employeeSize !== 1 &&
          <Button rounded='lg' variant='flat' color="danger" onClick={() => onRemove(index)}><PiMinusCircleFill className='h-6 w-6' />        </Button>
        }
        {employeeSize - 1 === index &&

          <Button rounded='lg' color="primary" onClick={onAdd}><PiPlusCircleFill className='h-6 w-6' />        </Button>
        }
      </td>
    </tr>

  )
}