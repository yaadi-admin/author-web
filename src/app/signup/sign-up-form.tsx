'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SubmitHandler, Controller, useFormContext } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Password, Checkbox, Button, Input, Text, Radio } from 'rizzui';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/utils/validators/signup.schema';
import firebase from '@/config/firebase.config';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import axios from 'axios';
import {
  doc,
  onSnapshot,
  query,
  collection,
  getDocs,
  where,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, getStorage } from 'firebase/storage';
import toast from 'react-hot-toast';
import { currentSession } from '@/config/session';
import { useAtomValue, useAtom } from 'jotai';
import SelectLoader from '@/components/loader/select-loader';
import dynamic from 'next/dynamic';
import { sellerSpanCollection } from '@/config/ref/sellerSpanCollections';
import { controls } from '@/config/ref/controls';
import { BASE_URL } from '@/config/bots';
import { createStripeCustomer } from '@/config/strp_routes';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  createdAt: '',
  lastSignIn: '',
  type: 'Business',
  emailVerified: '',
  password: '',
  confirmPassword: '',
};

function sanitizeString(str: string) {
  return str.trim().replace(/[<>]/g, '');
}

function sanitizeData(data: any) {
  return {
    ...data,
    firstName: sanitizeString(data.firstName),
    lastName: sanitizeString(data.lastName),
    email: sanitizeString(data.email),
    password: sanitizeString(data.password),
    confirmPassword: sanitizeString(data.confirmPassword),
  };
}

export default function SignUpForm() {
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const controlData = controls() as any;
  const [waitingList, setWaitingList] = useState(false);
  const [terms, setTerms] = useState(false);
  const [newsLetter, setNewsLetter] = useState(false);
  const sellerspan_collection = sellerSpanCollection() as any;
  const [creating, setCreating] = useState(false);
  const [roles, setRoles] = useState([]) as any;
  const [audioBuffer, setAudioBuffer] = useState(null) as any;

  useEffect(() => {
    const role = [] as any;
    if (controlData[0]?.signupRoles) {
      for (let i = 0; i <= controlData[0]?.signupRoles?.length; i++) {
        if (controlData[0]?.signupRoles[i]?.status === true) {
          role.push(controlData[0]?.signupRoles[i]);
        }
      }
    }
    setRoles(role);
  }, [controlData[0]]);

  const handleThreadCreate = async (data: any) => {
    setLoading(true);
    setCreating(true);
    const Threads = [] as any;
    try {
      const response = await axios.post(`${BASE_URL}/api/threads`);
      const response2 = await axios.post(`${BASE_URL}/api/threads`);
      const response3 = await axios.post(`${BASE_URL}/api/threads`);
      const response4 = await axios.post(`${BASE_URL}/api/threads`);
      Threads.push(response?.data?.thread.id);
      Threads.push(response2?.data?.thread.id);
      Threads.push(response3?.data?.thread.id);
      Threads.push(response4?.data?.thread.id);
    } catch (error) {
      console.error('Error creating thread.');
    } finally {
      if (Threads.length > 2) {
        createUser(data, Threads);
      }
      setCreating(false);
    }
  };

  const logOut = async () => {
    try {
      await signOut(firebase?.auth);
    } catch (error) {
      console.error('Error logging out.');
    }
  };

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    const sanitizedData = sanitizeData(data);
    handleThreadCreate(sanitizedData);
  };

  const createUser = async (userData: any, Threads: any) => {
    setLoading(true);
    try {
      createUserWithEmailAndPassword(
        firebase.auth,
        userData?.email,
        userData?.password
      )
        .then(async (userCredential) => {
          const user = userCredential.user;
          const stripeCustomer = await createStripeCustomer(userData?.email);
          const userObject = {
            createdAt: user.metadata.creationTime,
            lastSignIn: user.metadata.lastSignInTime,
            emailVerified: user.emailVerified,
            phone: '+1',
            id: user.uid,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            email: userData?.email,
            profilePictureURL:
              'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/icons8-circled-user-male-skin-type-3-80.png?alt=media&token=2d8caf0c-191b-4399-83cb-4eea25d76efd',
            role: userData?.role,
            type: userData?.type || 'Business',
            isAgreed: terms,
            audioURL: '',
            subscribedToNewsletter: newsLetter,
            thread: Threads,
            address: {
              city: '',
              country: '',
              postalCode: '',
              state: '',
              street: '',
              street2: '',
            },
            location: { latitude: 0, longitude: 0 },
            lite: true,
          };
          try {
            setDoc(doc(firebase.firestore, 'users', user?.uid), userObject).then(
              () => {
                if (userData?.role === 'seller') {
                  setDoc(doc(firebase.firestore, 'sellerspan', user?.uid), {
                    id: user?.uid,
                    createdAt: serverTimestamp(),
                    progress: 0,
                  });
                  setDoc(doc(firebase.firestore, 'seller_lite_span', user?.uid), {
                    id: user?.uid,
                    createdAt: serverTimestamp(),
                    progress: 0,
                  });
                }
                emailVerification(user, userData?.email);
              }
            );
          } catch (e) {
            toast.error('Error creating account.', { position: 'bottom-center' });
            console.error('Error creating user.');
          }
        })
        .catch(() => {
          setLoading(false);
          console.error('Error creating user.');
        });
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (user: any) => {
    try {
      const sellerSpanCollectionQuery = collection(
        firebase.firestore,
        'sellerspan_collection'
      );
      const sellerSpanCollectionSnapshot = await getDocs(
        sellerSpanCollectionQuery
      );
      sellerSpanCollectionSnapshot.forEach(async (docSnapshot) => {
        try {
          const docRef = doc(
            firebase.firestore,
            'sellerspan',
            user?.uid,
            'cards',
            `${docSnapshot.data()?.id}`
          );
          await setDoc(docRef, docSnapshot.data());
        } catch (error) {
          console.error('Error updating document.');
        }
      });
    } catch (error) {
      console.error('Error updating documents.');
    }
  };

  const emailVerification = (user: any, email: string) => {
    sendEmailVerification(user)
      .then(() => {
        toast.success('Registration Successfully', { position: 'bottom-center' });
        push(routes.verifyEmail(email));
      })
      .catch(() => {
        console.error('Error sending verification email.');
      });
  };

  const fetchVoice = async (message: any) => {
    if (!message) return;
    try {
      axios.get<{ speak: any }>(`/api/voice/speak?message=${message}`).then(
        async (response) => {
          const speakValue = response.data.speak;
          const buffer = Buffer.from(speakValue, 'base64');
          setAudioBuffer(buffer);
        }
      );
    } catch {
      console.error('Error fetching voice.');
    }
  };

  return (
    <>
      {waitingList && (
        <div>
          <Text
            style={{ fontWeight: '700' }}
            className="mt-6 text-center text-bold leading-loose text-gray-900 lg:mt-8 lg:text-start"
          >
            Registration successful!
            <br /> A verification email has been sent to your email. Please check
            your email to verify your account.
          </Text>
          <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
            Already verified your account?{' '}
            <Link
              href={routes.signIn}
              className="font-semibold text-gray-700 transition-colors hover:text-blue"
            >
              Login
            </Link>
          </Text>
        </div>
      )}
      {!waitingList && (
        <Form<SignUpSchema>
          validationSchema={signUpSchema}
          resetValues={reset}
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues: initialValues,
          }}
        >
          {({ register, formState: { errors }, control, watch }) => {
            const { role } = watch();
            return (
              <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
                <Input
                  type="text"
                  size="lg"
                  label="First Name"
                  placeholder="Enter your first name"
                  className="[&>label>span]:font-medium"
                  inputClassName="text-sm"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />
                <Input
                  type="text"
                  size="lg"
                  label="Last Name"
                  placeholder="Enter your last name"
                  className="[&>label>span]:font-medium"
                  inputClassName="text-sm"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                />
                <Input
                  type="email"
                  size="lg"
                  label="Email"
                  className="col-span-2 [&>label>span]:font-medium"
                  inputClassName="text-sm"
                  placeholder="Enter your email"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <div className="col-span-2 [&>label>span]:font-medium">
                  <Controller
                    name="role"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        dropdownClassName="z-[9999]"
                        options={roles}
                        value={value}
                        onChange={onChange}
                        label="I am a..."
                        error={errors?.role?.message as string}
                        getOptionValue={(option) => option.value}
                        getOptionDisplayValue={(option) => option.label}
                      />
                    )}
                  />
                </div>
                {role === 'broker' && (
                  <div className="col-span-full">
                    <label
                      className="rizzui-select-label block text-sm mb-1.5 font-medium"
                      id="headlessui-listbox-label-:r1:"
                    >
                      Type of Broker
                    </label>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <div
                          onBlur={onBlur}
                          className="flex col-span-full w-full gap-10 mt-3 py-2"
                        >
                          {['Business', 'Real Estate'].map((t) => (
                            <Radio
                              key={t}
                              value={t}
                              labelPlacement="right"
                              label={t}
                              checked={value === t}
                              onChange={() => onChange(t)}
                            />
                          ))}
                          {errors?.type && <span>{errors.type.message}</span>}
                        </div>
                      )}
                    />
                  </div>
                )}
                <Password
                  label="Password"
                  placeholder="Enter your password"
                  size="lg"
                  className="[&>label>span]:font-medium"
                  inputClassName="text-sm"
                  {...register('password')}
                  error={errors.password?.message}
                />
                <Password
                  label="Confirm Password"
                  placeholder="Enter confirm password"
                  size="lg"
                  className="[&>label>span]:font-medium"
                  inputClassName="text-sm"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                />
                <div className="col-span-2 flex items-start ">
                  <Checkbox
                    onChange={(e) => setTerms(e.target.checked)}
                    className="[&>label>span]:font-medium [&>label]:items-start"
                    label={
                      <>
                        By signing up you have agreed to our{' '}
                        <Link
                          href="#."
                          className="font-medium text-blue transition-colors hover:underline"
                          target="_blank"
                        >
                          Terms
                        </Link>{' '}
                        &{' '}
                        <Link
                          href="#."
                          className="font-medium text-blue transition-colors hover:underline"
                          target="_blank"
                        >
                          Privacy Policy
                        </Link>
                      </>
                    }
                  />
                </div>
                <div className="col-span-2 flex items-start ">
                  <Checkbox
                    onChange={(e) => setNewsLetter(e.target.checked)}
                    className="[&>label>span]:font-medium [&>label]:items-start"
                    label={
                      <div className="flex flex-col">
                        I want to receive Narro offers, and event invitations
                        <Text className="text-xs">
                          (You can change your mind and click &quot;unsubscribe&quot; in
                          our e-mail footer at any time. See our{' '}
                          <Link
                            href="#."
                            className="text-xs font-medium text-blue transition-colors hover:underline"
                            target="_blank"
                          >
                            Privacy Policy
                          </Link>
                          )
                        </Text>
                      </div>
                    }
                  />
                </div>
                {controlData[0]?.isSignUp && (
                  <Button
                    disabled={loading ? loading : !terms}
                    size="lg"
                    type="submit"
                    className="col-span-2 mt-2"
                  >
                    <span>Register</span>{' '}
                    <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
                  </Button>
                )}
              </div>
            );
          }}
        </Form>
      )}
      {!waitingList && (
        <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
          Already have an account?{' '}
          <Link
            href={routes.signIn}
            className="font-semibold text-gray-700 transition-colors hover:text-blue"
          >
            Login
          </Link>
        </Text>
      )}
    </>
  );
}
