import SignInForm from '@/app/signin/sign-in-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import { metaObject } from '@/config/site.config';
import firebase from '@/config/firebase.config';
import { any, boolean } from 'zod';
import AuthWrapperFour from '../shared/auth-layout/auth-wrapper-four';


export const metadata = {
  ...metaObject('Login'),
};

export default function SignIn(props: any) {

  const { sp } = props;

  return (
    <AuthWrapperFour
      title={
        <>
          <span className="relative inline-block">
            Welcome back!
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36" />
          </span>
          <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36" />
          <br /> Sign in to get started.
        </>
      }
      isSignIn
      isSocialLoginActive={true}
    >
      <SignInForm />
    </AuthWrapperFour>
  );
}
