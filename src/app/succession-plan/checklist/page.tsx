import { metaObject } from '@/config/site.config';
import Checklist from './checklist';
import PageHeader from '@/app/shared/page-header';
import Sidebar from '../sidebar';
import Footer from './footer';
export const metadata = {
  ...metaObject('Checklist'),
};

export default function ChecklistPage() {
  return (
    <div className='bg-white'
    >
      <div className='flex'>
        <Sidebar step={3} />
        <div className='w-full p-6 pr-12'>

          <Checklist />
          <Footer />
        </div >
      </div>

    </div>
  );
} 
