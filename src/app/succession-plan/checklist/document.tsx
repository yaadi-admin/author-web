'use client'
import { useFormContext } from 'react-hook-form';
import { FaCheck } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import { Button, Checkbox, Input, Text, Tooltip } from 'rizzui';


interface DocumentProps {
  document: any,
  index: number,
  readOnly?: boolean,
  primaryColor?: string
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

export default function Document(props: DocumentProps) {
  const { document, index, readOnly = false, primaryColor } = props;
  console.log(document)
  const {
    register,
    setValue,
  } = useFormContext();

  if (readOnly) {
    return (
      <tr className=''>
        <td className="px-6 py-3 flex items-center">
          {document.document}
        </td>
        <td className="px-2 py-3">
          {document.isAlreadyPrepared ? <FaCheck className='h-5 w-5' style={{ color: `${primaryColor}` }} /> : '-'}
        </td>

        <td className="px-2 py-3">
          {document.isEasyToAccess ? <FaCheck className='h-5 w-5' style={{ color: `${primaryColor}` }} /> : '-'}
        </td>
        <td className="px-2 py-3">
          {document.NotAvailable
            ? <FaCheck className='h-5 w-5' style={{ color: `${primaryColor}` }} /> : '-'}
        </td>
        <td className="px-2 py-3">
          {document.details ? document.details : '-'}
        </td>
      </tr>
    )
  }
  return (
    <tr className=''>
      <td className="px-6 py-3 flex items-center">
        <b className=''>{document.title}</b>
        <Tooltip size="lg" content={<CustomContent title={document.info} />}>
          <Button variant="text" className='ml-auto'>
            <FcInfo className='h-7 w-7' />
          </Button>
        </Tooltip>
      </td>
      <td className="px-2 py-3">
        <Checkbox
          {...register(`documents.${document.title}.isAlreadyPrepared`)}
          onChange={(e) => setValue(`documents.${document.title}.isAlreadyPrepared`, e.target.checked)}
        />
      </td>
      <td className="px-2 py-3">
        <Checkbox className=""
          {...register(`documents.${document.title}.isEasyToAccess`)}
          onChange={(e) => setValue(`documents.${document.title}.isEasyToAccess`, e.target.checked)}
        />
      </td>
      <td className="px-2 py-3">
        <Checkbox className=""
          {...register(`documents.${document.title}.NotAvailable`)} onChange={(e) => setValue(`documents.${document.title}.NotAvailable`, e.target.checked)} />
      </td>

      <td className="px-2 py-3">
        <Input type="text" placeholder="Enter details here" className=""
          {...register(`documents.${document.title}.details`)}
          onChange={(e) => setValue(`documents.${document.title}.details`, e.target.value)}
        />
      </td>
    </tr>
  )
}