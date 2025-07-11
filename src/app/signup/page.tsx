import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import SignUpForm from './sign-up-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import { metaObject } from '@/config/site.config';
import AuthWrapperFour from '../shared/auth-layout/auth-wrapper-four';

export const metadata = {
  ...metaObject('Sign Up'),
};

export default function SignUp() {
  return (
    <AuthWrapperFour
      title={
        <>
          Start your journey by creating an account - {' '}
          <span className="relative inline-block">
            SIGN UP!
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36" />
          </span>
        </>
      }
     isSocialLoginActive={true}
    >
      <SignUpForm />
    </AuthWrapperFour>
  );
}
