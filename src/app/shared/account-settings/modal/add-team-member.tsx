'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Input, Text, Title, Button, Select } from 'rizzui';
import { Form } from '@/components/ui/form';
import {
  AddTeamMemberInput,
  addTeamMemberSchema,
} from '@/utils/validators/team-member.schema';
import { currentSession } from '@/config/session';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, query, collection, getDocs, where, setDoc, serverTimestamp, orderBy, updateDoc } from "firebase/firestore";
import { members } from '@/data/members-data';

const role = [
  {
    label: 'Product Designer',
    value: 'product_designer',
  },
  {
    label: 'Software Engineer',
    value: 'software_engineer',
  },
];

const countries = [
  {
    label: 'United States',
    value: 'usa',
  },
  {
    label: 'Bangladesh',
    value: 'bd',
  },
];

const teams = [
  {
    label: 'Lawyer',
    value: 'Lawyer',
  },
  {
    label: 'Real Estate Broker',
    value: 'Real Estate Broker',
  },
  {
    label: 'Accountant',
    value: 'Accountant',
  },
  {
    label: 'Tax/Estate Planner',
    value: 'Tax/Estate Planner',
  },
];

export default function AddTeamMemberModalView() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const currentUser = currentSession() as any;

  const thumbnails = members.map(member => member.thumbnail);

  // Function to return thumbnail URL based on input string
  const getThumbnailUrl = (team: any) => {
    switch (team) {
      case 'CEO (Chief Executive Officer)':
        return thumbnails[0]; // Assuming CEO corresponds to the first member in the list
      case 'CFO (Chief Financial Officer)':
        return thumbnails[1]; // Assuming CFO corresponds to the second member in the list
      case 'COO (Chief Operating Officer)':
        return thumbnails[2]; // Assuming COO corresponds to the third member in the list
      case 'CTO (Chief Technology Officer)':
        return thumbnails[3]; // Assuming CTO corresponds to the fourth member in the list
      case 'CMO (Chief Marketing Officer)':
        return thumbnails[4]; // Assuming CMO corresponds to the fifth member in the list
      case 'Lawyer':
        return thumbnails[5]; // Assuming Lawyer corresponds to the sixth member in the list
      case 'HR Manager':
        return thumbnails[6]; // Assuming HR Manager corresponds to the seventh member in the list
      case 'Sales Manager':
        return thumbnails[7]; // Assuming Sales Manager corresponds to the eighth member in the list
      case 'Accountant':
        return thumbnails[8]; // Assuming Accountant corresponds to the ninth member in the list
      case 'Administrative Assistant':
        return thumbnails[9]; // Assuming Administrative Assistant corresponds to the tenth member in the list
      case 'Business Analyst':
        return thumbnails[10]; // Assuming Business Analyst corresponds to the eleventh member in the list
      case 'Customer Service Representative':
        return thumbnails[11]; // Assuming Customer Service Representative corresponds to the twelfth member in the list
      case 'Marketing Specialist':
        return thumbnails[12]; // Assuming Marketing Specialist corresponds to the thirteenth member in the list
      case 'Operations Manager':
        return thumbnails[13]; // Assuming Operations Manager corresponds to the fourteenth member in the list
      default:
        return null; // Return null if no matching thumbnail found
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const docRef = doc(collection(firebase.firestore, "team"));
    const teamObject = {
      id: docRef.id,
      userID: currentUser?.id,
      user: currentUser,
      teamID: currentUser?.sellerID,
      createdAt: serverTimestamp(),
      firstName: data?.first_name,
      lastName: data?.last_name,
      email: data?.email,
      status: false,
      phone: data?.phone,
      team: data?.team,
      photo: getThumbnailUrl(data?.team),
    };
    try {
      await setDoc(docRef, teamObject);
    }
    catch (error) {
      console.error(error);
      toast.error("Error adding member", { position: "bottom-center" });
    }
    finally {
      toast.success("Member added", { position: "bottom-center" });
      closeModal();
      setLoading(false);
    }


    toast.success(
      <Text as="b" className="font-semibold">
        Team member successfully added!
      </Text>
    );
  };

  return (
    <div className="m-auto p-6">
      <Title as="h3" className="mb-6 text-lg">
        Add New Member
      </Title>
      <Form<AddTeamMemberInput>
        // validationSchema={addTeamMemberSchema}
        resetValues={reset}
        onSubmit={onSubmit}
      >
        {({ register, control, formState: { errors } }) => (
          <>
            <MemberForm control={control} register={register} errors={errors} />
            <div className="mt-8 flex justify-end gap-3">
              <Button
                className="w-auto"
                variant="outline"
                onClick={() => closeModal()}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading} className="w-auto">
                Add Member
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

export function MemberForm({ register, control, errors }: any) {
  return (
    <div className="flex flex-col gap-4 text-gray-700">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center">
        <Input
          type="text"
          label="First Name"
          placeholder="John"
          labelClassName="text-sm font-medium text-gray-900"
          {...register('first_name')}
          error={errors?.first_name?.message}
          className="flex-grow"
        />
        <Input
          type="text"
          label="Last Name"
          placeholder="Doe"
          labelClassName="text-sm font-medium text-gray-900"
          {...register('last_name')}
          error={errors?.last_name?.message}
          className="flex-grow"
        />
      </div>
      <Input
        type="email"
        label="Email"
        labelClassName="text-sm font-medium text-gray-900"
        placeholder="john@doe.io"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        type="number"
        label="Phone"
        labelClassName="text-sm font-medium text-gray-900"
        placeholder="+123456789"
        {...register('phone')}
        error={errors.phone?.message}
      />
      {/* <Controller
        control={control}
        name="role"
        render={({ field: { value, onChange } }) => (
          <Select
            label="Role"
            inPortal={false}
            labelClassName="text-sm font-medium text-gray-900"
            // @ts-ignore
            placeholder={role[0].name}
            options={role}
            onChange={onChange}
            value={value}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              role?.find((r) => r.value === selected)?.label ?? ''
            }
            error={errors?.role?.message as string}
          />
        )}
      /> */}
      {/* <Controller
        control={control}
        name="country"
        render={({ field: { onChange, value } }) => (
          <Select
            label="Country"
            inPortal={false}
            labelClassName="text-sm font-medium text-gray-900"
            // @ts-ignore
            placeholder={countries[0].name}
            options={countries}
            onChange={onChange}
            value={value}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              countries?.find((con) => con.value === selected)?.label ?? ''
            }
            error={errors?.country?.message as string}
          />
        )}
      /> */}
      <Controller
        control={control}
        name="team"
        render={({ field: { value, onChange } }) => (
          <Select
            label="Assigned to"
            labelClassName="text-sm font-medium text-gray-900"
            placeholder="Select a team"
            inPortal={false}
            options={teams}
            onChange={onChange}
            value={value}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              teams?.find((t) => t.value === selected)?.label ?? ''
            }
            error={errors?.teams?.message as string}
          />
        )}
      />
    </div>
  );
}
