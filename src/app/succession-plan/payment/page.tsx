import { metaObject } from '@/config/site.config';

import Payment from './Payment';
import Sidebar from '../sidebar';

export const metadata = {
  ...metaObject('Payment'),
};


export default function PaymentPage() {

  return (
    <div className='bg-white'
    >
      <div className='flex'>
        <Sidebar step={0} />
        <div className='w-full p-6'>
          <Payment />

        </div >
      </div>

    </div>
  );
}
