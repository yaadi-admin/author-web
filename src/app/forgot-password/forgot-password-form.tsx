'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Button, Input, Text } from 'rizzui';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import {
  forgetPasswordSchema,
  ForgetPasswordSchema,
} from '@/utils/validators/forget-password.schema';
import firebase from '@/config/firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';

const initialValues = { email: '' };

function sanitizeEmail(email: string) {
  return email.trim().replace(/[<>'"]/g, '');
}

export default function ForgetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<ForgetPasswordSchema> = (data) => {
    const sanitized = sanitizeEmail(data.email);
    sendPasswordResetEmail(firebase.auth, sanitized)
      .then(() => {
        toast.success(
          <Text>
            Reset link sent to: <Text as="b">{sanitized}</Text>
          </Text>
        );
      })
      .catch(() => {
        toast.error(<Text>An error occurred. Please try again.</Text>);
      })
      .finally(() => {
        setReset(initialValues);
      });
  };

  return (
    <>
      <Form<ForgetPasswordSchema>
        validationSchema={forgetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{ defaultValues: initialValues, mode: 'onChange' }}
      >
        {({ register, formState: { errors, isValid } }) => (
          <div className="space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              disabled={!isValid}
            >
              Reset Password
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t want to reset?{' '}
        <Link
          href={routes.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
