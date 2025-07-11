'use client'
import { useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';

interface AdvisorProps {
  advisor: any,
  index: number,
  readOnly?: boolean,
}
export default function Advisor(props: AdvisorProps) {
  const { advisor, index, readOnly = false } = props;
  const {
    register,
  } = useFormContext();



  const positions = [
    'Accountant',
    'Lawyer',
    'Commercial Realtor',
    'Banker',
    'Insurance Broker'
  ];

  const getIconSrc = (position: string): string => {
    switch (position.toLowerCase()) {
      case 'accountant':
        return 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/cim-builder%2Faccounting.png?alt=media&token=9056ecfb-dba3-42f5-96b1-c0a19f110102';
      case 'lawyer':
        return 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/cim-builder%2Fjustice-scale.png?alt=media&token=612bc337-aed7-4f84-b770-db4b002dace5';
      case 'banker':
        return 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/cim-builder%2Fbank.png?alt=media&token=d3add476-91bc-4703-8a35-0cfa73f67d63';
      case 'commercial realtor':
        return 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/cim-builder%2Fagreement.png?alt=media&token=2db9a3b6-00d5-4c85-82ee-3f8bce169b64';
      case 'insurance broker':
        return 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/cim-builder%2Finsurance.png?alt=media&token=10bc0e17-d9df-43c6-ae80-5d36822935d5';
      default:
        return 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/cim-builder%2Fsuitcase.png?alt=media&token=41656d45-885a-4e9b-8828-5d3f876ef587';
    }
  };

  if (readOnly) {
    return (
      <div className="card p-4 mb-4 border rounded-2xl shadow-sm">
        <div className="mb-2 flex row justify-between">
          <b className="block text-lg">{advisor.position}</b>
          <img src={getIconSrc(advisor.position)} alt="icon" className="w-8 h-8 ml-2" />
        </div>
        <div className="mb-2">
          <span className="block text-md">{advisor.name}</span>
        </div>
        <div className="mb-2">
          <span className="block text-md">{advisor.companyName}</span>
        </div>
        <div className="mb-2">
          <span className="block text-md">{advisor.email}</span>
        </div>
        <div className="mb-2">
          <span className="block text-md">{advisor.phoneNumber}</span>
        </div>
      </div>
    )
  }
  return (
    <div className="card p-4 mb-4 border rounded shadow-sm">
      <div className="mb-2">
        <Input
          type="text"
          placeholder={`Name of ${advisor.position}`}
          className=""
          {...register(`advisors.${index}.position`)}
        />
      </div>
      <div className="mb-2">
        <Input
          type="text"
          placeholder={`Name of ${advisor.position}`}
          className=""
          {...register(`advisors.${index}.name`)}
        />
      </div>
      <div className="mb-2">
        <Input
          type="text"
          placeholder="Company name"
          className=""
          {...register(`advisors.${index}.companyName`)}
        />
      </div>
      <div className="mb-2">
        <Input
          type="text"
          placeholder="Email"
          className=""
          {...register(`advisors.${index}.email`)}
        />
      </div>
      <div className="mb-2">
        <Input
          type="text"
          placeholder="Phone #"
          className=""
          {...register(`advisors.${index}.phoneNumber`)}
        />
      </div>
    </div>
  )
}