import LandingPage from './(landing)'
import Base from './base';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Succession Plan'),
};

export default function SignIn() {

  return (
    <LandingPage />
  );
}
