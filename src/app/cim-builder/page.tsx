import Root from '@/app/shared/cim-builder/index';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('CIM Builder'),
};

export default function CIMBuilderPage() {

  return (
    <div className='bg-white h-full'>
      <div className='flex flex-grow h-full'>
        <div className='h-full w-full p-6 pr-12'>
          <Root />
        </div >
      </div>
    </div>
  );
}
