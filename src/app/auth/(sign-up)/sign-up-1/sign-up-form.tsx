'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SubmitHandler, Controller, useFormContext } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Password, Checkbox, Button, Input, Text } from 'rizzui';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/utils/validators/signup.schema';
import firebase from '@/config/firebase.config';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import axios from 'axios';
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import toast from 'react-hot-toast';
import { currentSession } from '@/config/session';
import { useAtomValue, useAtom } from 'jotai';
import SelectLoader from '@/components/loader/select-loader';
import dynamic from 'next/dynamic';
import { Thread } from "openai/resources/beta/threads/threads";
import { sellerSpanCollection } from '@/config/ref/sellerSpanCollections';
import { controls } from '@/config/ref/controls';
import { BASE_URL } from '@/config/bots';

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
  emailVerified: '',
  password: '',
  confirmPassword: '',
};

export default function SignUpForm() {
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const controlData = controls() as any;
  const [waitingList, setWaitingList] = useState(false);
  const [terms, setTerms] = useState(false);
  const [newsLetter, setNewsLetter] = useState(false);
  const sellerspan_collection = sellerSpanCollection() as any;
  // State
  const [creating, setCreating] = useState(false);
  const [roles, setRoles] = useState([]) as any;
  const [audioBuffer, setAudioBuffer] = useState(null) as any;

  useEffect(() => {
    const role = [] as any;
    if (controlData[0]?.signupRoles) {
      for (let i = 0; i <= (controlData[0]?.signupRoles)?.length; i++) {
        if (controlData[0]?.signupRoles[i]?.status === true) {
          role.push(controlData[0]?.signupRoles[i])
        }
      }
    }
    setRoles(role);
  }, [controlData[0]])

  const handleThreadCreate = async (data: any) => {
    setLoading(true);
    setCreating(true);
    const Threads = [] as any;
    try {
      const response = await axios.post(`${BASE_URL}/api/threads`)
      const response2 = await axios.post(`${BASE_URL}/api/threads`)
      const response3 = await axios.post(`${BASE_URL}/api/threads`)
      const response4 = await axios.post(`${BASE_URL}/api/threads`)
      Threads.push(response?.data?.thread.id);
      Threads.push(response2?.data?.thread.id);
      Threads.push(response3?.data?.thread.id);
      Threads.push(response4?.data?.thread.id);
    } catch (error) {
      console.error(error);
      // toast.error("Failed to create thread", { position: "bottom-center" });
    } finally {
      if (Threads.length > 2) {
        createUser(data, Threads);
      }
      setCreating(false);
    }
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


  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    fetchVoice(`Welcome back, winston. Click this button to pickup where you left off!`);
    handleThreadCreate(data);
  };


  const createUser = (userData: any, Threads: any) => {
    setLoading(true);
    try {
      createUserWithEmailAndPassword(firebase.auth, userData?.email, userData?.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const rand = Math.floor(Math.random() * (2000000 - 100 + 1)) + 100;
          // const storageRef = ref(firebase.storage, `documents/${`audio_` + rand}.mp3`);
          // uploadBytes(storageRef, audioBuffer).then((snapshot) => {
          //   getDownloadURL(storageRef).then((downloadURL) => {
          const userObject = {
            createdAt: user.metadata.creationTime,
            lastSignIn: user.metadata.lastSignInTime,
            emailVerified: user.emailVerified,
            phone: "+1",
            id: user.uid,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            email: userData?.email,
            profilePictureURL: "https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/icons8-circled-user-male-skin-type-3-80.png?alt=media&token=2d8caf0c-191b-4399-83cb-4eea25d76efd",
            role: userData?.role,
            isAgreed: terms,
            audioURL: '',
            subscribedToNewsletter: newsLetter,
            thread: Threads,
          };
          try {
            setDoc(doc(firebase.firestore, "users", user?.uid), userObject).then(() => {
              if (userData?.role == 'seller') {
                setDoc(doc(firebase.firestore, "sellerspan", user?.uid), {
                  id: user?.uid,
                  createdAt: serverTimestamp(),
                  progress: 0,
                }).then(() => {
                  console.log(`${userData?.firstName}, sellerSpan created!`);
                });
                // updateData(user);
              }
              emailVerification(user);
              // logOut();
              console.log(`Welcome ${userData?.firstName}, account registered!`);
            });
          } catch (e) {
            toast.error("Error creating account", {
              position: "bottom-center",
            });
            console.error("Error creating account: ", e);
          }
          //   });
          // });

        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage + ' ' + errorCode);
        });
    }
    catch (error) {
      setLoading(false);
      console.error('');
    }
    finally {
      setLoading(false);
      setWaitingList(true);
    }
  }

  const updateData = async (user: any) => {
    try {
      const sellerSpanCollectionQuery = collection(firebase.firestore, "sellerspan_collection");
      const sellerSpanCollectionSnapshot = await getDocs(sellerSpanCollectionQuery);

      sellerSpanCollectionSnapshot.forEach(async (docSnapshot) => {
        try {
          const docRef = doc(firebase.firestore, "sellerspan", user?.uid, "cards", `${docSnapshot.data()?.id}`);
          await setDoc(docRef, docSnapshot.data());
          console.log(`Document ${docSnapshot.id} updated successfully.`);
        } catch (error) {
          console.error(`Error updating document ${docSnapshot.id}:`, error);
        }
      });

      console.log("All documents updated successfully.");
    } catch (error) {
      console.error('Error updating documents:', error);
    }
  };

  const emailVerification = (user: any) => {
    sendEmailVerification(user)
      .then(() => {
        toast.success("Registration Successfully", {
          position: "bottom-center",
        });
      })
      .catch((error) => {
        console.log("An error occurred while sending verification email: ", error);
      });
  }


  const fetchVoice = async (message: any) => {
    if (!message) return;
    try {
      axios
        .get<{ speak: any }>(
          `/api/voice/speak?message=${message}`
        )
        .then(async (response) => {
          let speakValue = response.data.speak as any;
          const buffer = Buffer.from(speakValue, 'base64');
          setAudioBuffer(buffer);
          console.log(`${buffer}`);
        });
    } catch (error) {
      console.log("error", error);
    } finally {

    }
  };


  return (
    <>
      {waitingList && <div><Text style={{ fontWeight: '700' }} className="mt-6 text-center text-bold leading-loose text-gray-900 lg:mt-8 lg:text-start">
        Registration successful!<br /> A verification email has been sent to your email. Please check your email to verify your account.
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
      </div>}
      {!waitingList && <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors }, control }) => (
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
                  />
                )}
              />
            </div>
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
                      href="https://drive.google.com/file/d/1DLOhQ5a_dd0e29rIHCDtdGYiRdu2k4Ug/view"
                      className="font-medium text-blue transition-colors hover:underline"
                      target="_blank"

                    >
                      Terms
                    </Link>{' '}
                    &{' '}
                    <Link
                      href="https://drive.google.com/file/d/1QshORCTcNJ066Htuvxe7MRzPs1pmtYlB/view"
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
                  <div className='flex flex-col'>
                    Yes! I want to receive Narro newsletters, offers, and event invitations
                    <Text className='text-xs'>(Note: You can change your mind and click &quot;unsubscribe&quot; in our e-mail footer at any time. See our        <Link
                      href="https://drive.google.com/file/d/1QshORCTcNJ066Htuvxe7MRzPs1pmtYlB/view"
                      className="text-xs font-medium text-blue transition-colors hover:underline"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>)</Text>
                  </div>
                }
              />
            </div>
            {controlData[0]?.isSignUp && <Button disabled={loading ? loading : (terms ? false : true)} size="lg" type="submit" className="col-span-2 mt-2">
              <span>Register</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>}
          </div>
        )}
      </Form>}
      {!waitingList && <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Already have an account?{' '}
        <Link
          href={routes.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Login
        </Link>
      </Text>}
    </>
  );
}
