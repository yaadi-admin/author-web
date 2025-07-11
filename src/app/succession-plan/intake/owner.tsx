'use client'
import React from 'react';
import { Button, Input } from 'rizzui';
import { useFormContext } from 'react-hook-form';
import { PiMinusCircleFill, PiPlusCircleFill } from "react-icons/pi";

interface OwnerProps {
  index: number,
  ownersSize: number,
  onAdd: () => void,
  onRemove: (index: number) => void,
}
export default function Owner(props: OwnerProps) {
  const { index, ownersSize, onAdd, onRemove } = props;

  const {
    register,
    formState,
  } = useFormContext();


  return (

    <tr className=''>
      <td className="px-2 py-3">
        <Input type="text" placeholder={`Name of Owner`} className=""
          {...register(`otherOwners.${index}.ownerName`)}

          //@ts-ignore
          error={formState.errors?.otherOwners?.[index]?.ownerName?.message as any}
        />
      </td>
      <td className="px-2 py-3">
        <Input type="text" placeholder="% Ownership" className=""
          {...register(`otherOwners.${index}.percentage`)
          }
          //@ts-ignore
          error={formState.errors?.otherOwners?.[index]?.percentage?.message as any}
        />
      </td>
      <td className=' px-2 py-3 flex gap-2'>


        {ownersSize !== 1 &&
          <Button rounded='lg' variant='flat' color="danger" onClick={() => onRemove(index)}><PiMinusCircleFill className='h-6 w-6' />        </Button>
        }
        {ownersSize - 1 === index &&

          <Button rounded='lg' color="primary" onClick={onAdd}><PiPlusCircleFill className='h-6 w-6' />        </Button>


        }
      </td>
    </tr>

  )
}