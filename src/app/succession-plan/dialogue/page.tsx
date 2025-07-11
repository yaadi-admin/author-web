import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import MultiStep from './multi-step';
import Sidebar from '../sidebar';


export const metadata = {
  ...metaObject('Dialogue'),
};

export default function Dialog() {
  return (
    <div className='bg-white h-screen'>
      <div className='flex'>
        <Sidebar step={2} />
        <div className='w-full pl-2 pr-6'>
          <MultiStep />
        </div >
      </div>

    </div >
  );
} 
