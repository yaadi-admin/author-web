
import { metaObject } from '@/config/site.config';
import dynamic from 'next/dynamic'

const MultiStepDynamic = dynamic(() => import('./index'), {
  ssr: false,
})

export const metadata = {
  ...metaObject('Story'),
};



export default function StoryPage() {
  return (
    <>
      <MultiStepDynamic />
    </>
  );
}
