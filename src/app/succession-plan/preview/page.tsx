import { metaObject } from '@/config/site.config';



import Root from "./preview"

export const metadata = {
  ...metaObject('Preview'),
};


export default function PaymentPage() {

  return (
    <div className='bg-white'
    >
      <Root />

    </div>
  );
}
