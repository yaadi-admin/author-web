import SignIn from '@/app/signin/page';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import { metaObject } from '@/config/site.config';
import firebase from '@/config/firebase.config';

export const metadata = {
  ...metaObject('Login'),
};

export default function Sign() {

  return (
   <SignIn sp={true}  />
  );
}
