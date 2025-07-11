import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import SignUpForm from './sign-up-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Sign Up'),
};

export default function SignUp() {
  return (
    <AuthWrapperOne
      title={
        <>
          Start your journey by creating an account - {' '}
          <span className="relative inline-block">
            SIGN UP!
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36" />
          </span>
        </>
      }
      description="Sign up to gain access to Narro’s AI-powered platform, our curated network of professional services providers, and the marketplace of ready-to-buy businesses."
      bannerTitle="The easiest way to plan for tomorrow"
      bannerDescription="Every business needs to plan for its future, with Narro’s SuccessionBuilder – it’s never been easier."
      isSocialLoginActive={true}
      pageImage={
        <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <Image
            src={
              'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/image%2022.png?alt=media&token=fd20b463-fe55-4b14-893c-5d879103bf98'
            }
            alt="Sign Up Thumbnail"
            // width={500}
            // height={500}
            fill
            priority
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
      }
    >
      <SignUpForm />
    </AuthWrapperOne>
  );
}