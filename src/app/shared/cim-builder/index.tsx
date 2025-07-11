'use client';
import { Suspense } from 'react';
import Cards from './cards';

export default function CIMPage() {

  return (
    <Suspense>
      <div className='bg-white h-full'>
        <Cards />
      </div>
    </Suspense>
  );
}