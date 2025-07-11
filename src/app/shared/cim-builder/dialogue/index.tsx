import React from 'react'
import MultiStepSeller from '@/app/shared/cim-dialogue/multi-step';
import { cimCollection } from '@/config/ref/cimBuilderCollection';
import Loader from '@/components/ui/loader';

function Dialogue({ id, onNext }: any) {
  const { data } = cimCollection();
  const specificData = data.find((d: any) => d.id === id);

  if (!specificData) return <Loader />;
  return (
    <MultiStepSeller template={specificData} onNext={onNext} />
  )
}

export default Dialogue