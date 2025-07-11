import SignInForm from './sign-in-form';
import AuthWrapperThree from '@/app/shared/auth-layout/auth-wrapper-three';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('The Narro'),
};

export default function SignIn() {
  return (
    <AuthWrapperThree
      title={
        <>
          <span className="bg-gradient-to-r from-[#136A8A] to-[#267871] bg-clip-text text-transparent">
            Welcome Back!
          </span>{' '}
          Sign In
        </>
      }
      isSignIn
      isSocialLoginActive={false}
    >
      <SignInForm />
    </AuthWrapperThree>
  );
}
