import { metaObject } from '@/config/site.config';
import Intake from './Intake';
import PageHeader from '@/app/shared/page-header';
import Sidebar from '../sidebar';
import MultiStep from './multi-step';
export const metadata = {
  ...metaObject('Intake Form'),
};

export default function IntakeForm(props: any) {
  return (
    <div className='bg-white '
    >
      <div className='flex'>
        <Sidebar step={1} />
        <div className='w-full p-6 pr-12'>

          <MultiStep params={props.searchParams} />
        </div >
      </div>

    </div>
  );
} 
