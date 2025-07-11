import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input, Switch, Button, FieldError, Checkbox } from 'rizzui';
import Advisor from './advisor';
import { PiMinusCircleFill, PiPlusCircleFill } from "react-icons/pi";


export default function Advisory({ className }: { className?: string }) {
  const {
    register,
    control,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'advisors', // this refers to the advisors array in defaultValues
  });





  const handleAddField = () => {
    append({ position: '', name: '', companyName: '', email: '', phoneNumber: '' },);
    //

  };


  const handleRemoveField = (indexToRemove: number) => {
    remove(indexToRemove);
  };


  return (
    <FormGroup
      title="Advisory Team"
      description="A list of advisors who will support the sale of the company."
      className={cn(className)}
    >

      <div>
        Please provide the names and contact details for advisors who will assist with selling the company
      </div>
      <div {...register('advisors')} className='col-span-full'>

        <table className='col-span-full min-w-full bg-white border border-gray-200 mb-[300px]'>

          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Advisor</th>
              <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Name</th>

              <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Company name</th>

              <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Email</th>
              <th className="px-2 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Phone #</th>
            </tr>
          </thead>

          <tbody>


            {fields.map((advisor, index) => (
              <>
                <Advisor
                  key={index}
                  advisor={advisor}
                  index={index}

                />
                <td colSpan={5} className="text-right px-2">

                  <Button rounded='lg' variant='flat' color="danger" onClick={() => handleRemoveField(index)}><PiMinusCircleFill className='h-6 w-6' />        </Button>
                </td>
              </>
            ))}

          </tbody>
          <td colSpan={5} className="text-right py-3 px-2">
            <Button rounded='lg' color="primary" onClick={handleAddField}><PiPlusCircleFill className='h-6 w-6' />        </Button>
          </td>

        </table>



      </div>


    </FormGroup>
  );
}

