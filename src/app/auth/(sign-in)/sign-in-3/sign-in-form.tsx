'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Input, Text, Button, Password, Switch } from 'rizzui';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { controls } from '@/config/ref/controls';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebase from '@/config/firebase.config';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { doc, onSnapshot } from "firebase/firestore";
import { useState } from 'react';

const initialValues: LoginSchema = {
  email: 'admin@admin.com',
  password: 'admin',
  rememberMe: true,
};

export default function SignInForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [loading, setLoading] = useState(false);
  const {push} = useRouter();
  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    login(data?.email, data?.password);
  };


  const login = (email: string, password: string) => {
    setLoading(true);

    signInWithEmailAndPassword(firebase.auth, email, password)
      .then((user) => {
        if (user) {
          const userDocRef = doc(firebase.firestore, "users", user?.user?.uid) as any;
          const unsubscribeSnapshot = onSnapshot(userDocRef, (snapshot: { exists: () => any; data: () => any; }) => {
            if (!snapshot.exists()) {
              // Handle if the user document doesn't exist (create it, if needed)
            } else {
              // Check to see if the user role is approved for login
                localStorage.setItem('usrdt', JSON.stringify(snapshot.data()));
                
                if (snapshot.data()?.role === "admin") {
                  toast.success("Logged in Successfully", {
                    position: "bottom-center",
                  });
                  push(routes.rolesPermissions);
                  setLoading(false);
                } else {
                  push('/');
                }
              }
          });
          return () => {
            unsubscribeSnapshot();
          };
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error signing in!", {
          position: "bottom-center",
        });
        setLoading(false);
        const errorCode = error.code;
        // showLoginErrorToast(errorCode);
      });
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          // defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            {/* <div className="flex items-center justify-between lg:pb-2">
              <Switch label="Remember Me" {...register('rememberMe')} />
              <Link
                href={routes.auth.forgotPassword3}
                className="h-auto p-0 text-sm font-semibold text-gray-600 underline transition-colors hover:text-primary hover:no-underline"
              >
                Forget Password?
              </Link>
            </div> */}

            {!loading && <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              Sign In
            </Button>}
          </div>
        )}
      </Form>
      {/* <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp3}
          className="font-semibold text-gray-700 transition-colors hover:text-gray-1000"
        >
          Sign Up
        </Link>
      </Text> */}
    </>
  );
}
