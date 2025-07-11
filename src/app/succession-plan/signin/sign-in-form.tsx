'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import firebase from '@/config/firebase.config';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, updateDoc } from "firebase/firestore";
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { controls } from '@/config/ref/controls';

const initialValues: LoginSchema = {
  email: '',
  password: '',
  rememberMe: true,
};

export default function SignInForm() {
  //TODO: why we need to reset it here
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const control = controls() as any;

  const onSubmit = (data: { email: string; password: string; }) => {
    login(data.email, data.password);
  };

  const logOut = async () => {
    try {
      await signOut(firebase?.auth); // Sign the user out

      console.log('User signed out');
      // You can also clear any client-side user data or redirect to a different page here
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle the error as needed, e.g., show a notification to the user
    }
  };

  const login = (email: string, password: string) => {
    setLoading(true);
    try {
      signInWithEmailAndPassword(firebase.auth, email, password)
        .then((user) => {
          if (user) {
            const userDocRef = doc(firebase.firestore, "users", user?.user?.uid) as any;
            const unsubscribeSnapshot = onSnapshot(userDocRef, (snapshot: { exists: () => any; data: () => any; }) => {
              if (!snapshot.exists()) {
                // Handle if the user document doesn't exist (create it, if needed)
              } else {
                // Check to see if the user role is approved for login
                if (
                  ((snapshot.data()?.role === control[0]?.approved[0]
                    || snapshot.data()?.role === control[0]?.approved[1]
                    || snapshot.data()?.role === control[0]?.approved[2]
                    || snapshot.data()?.role === control[0]?.approved[3]
                    || snapshot.data()?.role === control[0]?.approved[4]
                    || snapshot.data()?.role === control[0]?.approved[5]
                    || snapshot.data()?.role === control[0]?.approved[6]
                  )
                    && snapshot.data()?.role !== undefined
                    && snapshot.data()?.role !== null
                    && snapshot.data()?.role !== "") || snapshot.data()?.isDemo === true) {
                  if (user?.user?.emailVerified === true || snapshot.data()?.emailVerified === true || snapshot.data()?.role === 'client') {
                    if (!localStorage?.getItem('usrdt')) {
                      toast.success("Logged in Successfully", {
                        position: "bottom-center",
                      });
                    }
                    localStorage.setItem('usrdt', JSON.stringify(snapshot.data()));


                    const onboarding = snapshot.data()?.onBoarding;
                    console.log(onboarding)
                    push('/succession-client')
                    if (onboarding?.checklist) {
                     
                    // } else if (onboarding?.dialogue) {
                    //   push('/succession-plan/checklist')
                    // } else if (onboarding?.intake) {
                    //   push('/succession-plan/dialogue');
                    // } else if (onboarding?.payment) {
                    //   push('/succession-plan/intake')
                    // } else {
                    //   push('/succession-plan/payment')
                    }
                    // if (snapshot.data()?.role === "seller") {
                    //   push(routes.eCommerce.dashboard);
                    // }
                    // if (snapshot.data()?.role === "buyer") {
                    //   push(routes.buyer?.dashboard);
                    // }
                    // if (snapshot.data()?.role === "provider") {
                    //   push(routes?.provider?.dashboard);
                    // }
                    // if (snapshot.data()?.role === "representative") {
                    //   push(routes?.searchAndFilter?.flight);
                    // }
                    // if (snapshot.data()?.role === "admin") {
                    //   push(routes?.rolesPermissions);
                    // }
                  } else {
                    logOut();
                    toast.error("Please verify your email", {
                      position: "bottom-center",
                    });
                  }
                } else {
                  logOut();
                  toast.error("You are not authorized to login", {
                    position: "bottom-center",
                  });
                }
              }
            });
            return () => {
              unsubscribeSnapshot();
            };
          }
        })
        .catch((error) => {
          toast.error("Error login in", {
            position: "bottom-center",
          });
          const errorCode = error.code;
          // showLoginErrorToast(errorCode);
        });

    }
    catch (e) {
      console.log(e);
      setLoading(false);
      toast.error("Error login in, please try again", {
        position: "bottom-center",
      });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={'/succession-plan/forgot-password'}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forgot Password?
              </Link>
            </div>
            {control[0]?.isLogin && <Button className="w-full" type="submit" size="lg" disabled={loading}>
              <span>Login</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>}
          </div>
        )}
      </Form>
      {control[0]?.isSignUp && <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={'/succession-plan/signup'}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text>}
    </>
  );
}
