'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Loader, Text, Input } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@/components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';
import { currentSession } from '@/config/session';
import { useEffect, useState } from 'react';
import ProfileFooter from '@/components/profile-footer';
import { doc, onSnapshot, setDoc, addDoc, collection, query, where, serverTimestamp, updateDoc } from "firebase/firestore";
import firebase from '@/config/firebase.config';
import Image from 'next/image';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

export default function PersonalInfoView() {
  const currentUser = currentSession() as any;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (currentUser)
      setFirstName(currentUser?.firstName);
    setLastName(currentUser?.lastName);
    setEmail(currentUser?.email);
    setRole(currentUser?.role);
    setProfilePicture(currentUser?.profilePictureURL);
  }, [currentUser?.id])

  useEffect(() => {
    const interval = setInterval(() => {
      const downloadURL = localStorage.getItem('profilePhoto');
      if (downloadURL) {
        setProfilePicture(downloadURL);
        localStorage.removeItem('profilePhoto');
        clearInterval(interval); // Stop checking once URL is found
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);


  const onSubmit = async (data: any) => {

    // console.log(data);
    const modifiedFields = {} as any;
    if (currentUser?.firstName !== firstName) {
      modifiedFields.firstName = firstName;
    }

    if (currentUser?.lastName !== lastName) {
      modifiedFields.lastName = lastName;
    }

    if (currentUser?.profilePictureURL !== profilePicture) {
      modifiedFields.profilePictureURL = profilePicture;
    }

    try {
      const docRef = doc(collection(firebase.firestore, "users"), currentUser?.id);
      await updateDoc(docRef, modifiedFields);
      toast.success(`Profile successfully updated`);
    }
    catch (e) {
      toast.error(`Error Updating Profile`);
      console.log(`Error Updating Profile`);
    }

  };

  return (
    <Form<PersonalInfoFormTypes>
      // validationSchema={personalInfoFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        // defaultValues,
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {
        return (
          <>
            <FormGroup
              title="Personal Info"
              description="Update your photo and personal details here"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Name"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  {...register('first_name')}
                  placeholder={firstName ? firstName : 'First Name'}
                  value={firstName}
                  error={errors.first_name?.message}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="flex-grow"
                />
                <Input
                  {...register('last_name')}
                  placeholder={lastName}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={errors.last_name?.message}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup
                title="Email Address"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <p style={{ fontSize: 10 }} className="text-gray-500 -mb-8">(Read Only)</p>
                <div className="col-span-full border rounded-lg p-2">
                  <Text className="col-span-full">{email}</Text>
                </div>
              </FormGroup>

              <FormGroup
                title="Your Photo"
                description="This will be displayed on your profile."
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <div className="flex gap-6 @container @3xl:col-span-2">
                  <div className="">
                  <AvatarUpload
                    name="avatar"
                    setValue={setValue}
                    getValues={getValues}
                    error={errors?.avatar?.message as string}
                  />
                  </div>
                  <div className="">
                  <Image
                  src={profilePicture}
                  alt='Profile Picture'
                  width={100}
                  height={100}
                  className="rounded-full"
                  style={ {
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  />
                  </div>
                </div>
              </FormGroup>

              {/* <FormGroup
                title="Role"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="role"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      dropdownClassName="!z-10"
                      inPortal={false}
                      placeholder="Select Role"
                      options={roles}
                      onChange={onChange}
                      value={role}
                      className="col-span-full"
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        roles?.find((r) => r.value === selected)?.label ?? ''
                      }
                      error={errors?.role?.message as string}
                    />
                  )}
                />
              </FormGroup> */}

              {/* <FormGroup
                title="Country"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="country"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      dropdownClassName="!z-10"
                      inPortal={false}
                      placeholder="Canada"
                      options={countries}
                      onChange={onChange}
                      className="col-span-full"
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        countries?.find((con) => con.value === selected)
                          ?.label ?? ''
                      }
                      error={errors?.country?.message as string}
                    />
                  )}
                />
              </FormGroup> */}

              {/* <FormGroup
                title="Timezone"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="timezone"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      dropdownClassName="!z-10"
                      inPortal={false}
                      prefix={<PiClock className="h-6 w-6 text-gray-500" />}
                      placeholder="Select Timezone"
                      options={timezones}
                      onChange={onChange}
                      value={value}
                      className="col-span-full"
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        timezones?.find((tmz) => tmz.value === selected)
                          ?.label ?? ''
                      }
                      error={errors?.timezone?.message as string}
                    />
                  )}
                />
              </FormGroup> */}

              {/* <FormGroup
                title="Bio"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value } }) => (
                    <QuillEditor
                      value={value}
                      onChange={onChange}
                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                  )}
                />
              </FormGroup> */}

              {/* <FormGroup
                title="Portfolio Projects"
                description="Share a few snippets of your work"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <div className="mb-5 @3xl:col-span-2">
                  <UploadZone
                    name="portfolios"
                    getValues={getValues}
                    setValue={setValue}
                    error={errors?.portfolios?.message as string}
                  />
                </div>
              </FormGroup> */}
            </div>

            <ProfileFooter
              // isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Update"
            />
          </>
        );
      }}
    </Form>
  );
}
