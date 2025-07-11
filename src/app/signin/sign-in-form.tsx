'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import firebase from '@/config/firebase.config';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { controls } from '@/config/ref/controls';

const initialValues: LoginSchema = {
  email: '',
  password: '',
  rememberMe: true,
};

export default function SignInForm() {
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const control = controls() as any;

  const onSubmit = (data: { email: string; password: string; }) => {
    const sanitizedEmail = data.email.trim();
    const sanitizedPassword = data.password.trim();
    login(sanitizedEmail, sanitizedPassword);
  };

  const logOut = async () => {
    try {
      await signOut(firebase?.auth);
    } catch (error) {
      toast.error("Error logging out", {
        position: "bottom-center",
      });
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
                logOut();
                toast.error("User document does not exist", {
                  position: "bottom-center",
                });
              } else {
                const userData = snapshot.data();
                const userRole = userData?.role;
                const emailVerified = user?.user?.emailVerified || userData?.emailVerified;

                if (control[0]?.approved.includes(userRole)) {
                  if (emailVerified || userRole === 'seller' || userRole === 'client') {
                    localStorage.setItem('usrdt', JSON.stringify(userData));
                    toast.success("Logged in Successfully", {
                      position: "bottom-center",
                    });
                    navigateUser(userRole, userData);
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
        .catch(() => {
          toast.error("Error logging in", {
            position: "bottom-center",
          });
        });
    } catch (e) {
      setLoading(false);
      toast.error("Error logging in, please try again", {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const navigateUser = (role: string, userData: any) => {
    if (role === "admin") {
      push(routes?.rolesPermissions);
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
        {({ register, formState: { errors, isValid } }) => (
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
                href={routes.forgotPassword}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forgot Password?
              </Link>
            </div>
            {control[0]?.isLogin && <Button className="w-full" type="submit" size="lg" disabled={loading || !isValid}>
              <span>Login</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>}
          </div>
        )}
      </Form>
    </>
  );
}
