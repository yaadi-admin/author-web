import { metaObject } from '@/config/site.config';

import Congratulations from './index';
import Sidebar from '../sidebar';
import Footer from './footer';


export const metadata = {
  ...metaObject('Preview'),
};


export default function PaymentPage() {

  return (
    <div className='bg-white'
    >
      <div className='flex'>
        <Sidebar step={5} />
        <div className='w-full p-6 flex items-center justify-center'>
          <Congratulations />
          <Footer />
        </div >
      </div>

    </div>
  );
}
