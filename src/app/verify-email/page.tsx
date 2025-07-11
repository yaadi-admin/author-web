import { metaObject } from '@/config/site.config';
import React from 'react';
import VerifyEmail from './VerifyEmail';
import Loader from '@/components/ui/loader';
export const metadata = {
  ...metaObject('Verify Email'),
};

export default function VerifyEmailPage() {
  return (
    <React.Suspense fallback={<Loader />}>
      <VerifyEmail />
    </React.Suspense>
  );
}
