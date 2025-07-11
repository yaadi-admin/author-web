'use client'
import React from 'react'
import { useCurrentSession } from '@/config/succession-session';
import Preview from '@/components/report/preview/preview';
import Sidebar from '../sidebar';
import Footer from './footer';

function PreviewRoot() {
  const [isLoading, setLoading] = React.useState(false);
  const { session: currentUser, getUser } = useCurrentSession() as any;
  return (
    <div className='flex'>
      <Sidebar step={4} />
      <div className='w-full p-6'>
        <Preview isLoading={isLoading} setLoading={setLoading} clientId={currentUser.id} />
        <Footer isLoading={isLoading} />
      </div >
    </div>
  )
}

export default PreviewRoot