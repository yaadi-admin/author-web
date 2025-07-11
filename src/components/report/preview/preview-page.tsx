import React from 'react'
import PreviewWrapper from './preview';
import { useSearchParams } from 'next/navigation';

function PreviewPage() {
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = React.useState(true);
  return (
    <PreviewWrapper
      isLoading={isLoading}
      setLoading={setLoading}
      clientId={searchParams.get('clientId')} />
  )
}

export default PreviewPage