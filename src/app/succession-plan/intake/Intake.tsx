'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useFormContext, FieldValues } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import { doc, onSnapshot, setDoc, addDoc, collection, query, where, serverTimestamp, updateDoc } from "firebase/firestore";
import firebase from '@/config/firebase.config';
import FormNav, {
  formParts,
} from './form-nav';
import About from './about';
import AboutYou from './about-you';
import CompanyProfile from './company-profile';
import Advisory from './advisory-team';
import StepTwo from './introduction/step-2'

import {
  SuccessionInput,
  successionIntakeSchema,
} from '@/utils/validators/succession-intake.schema';
import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useRouter } from 'next/navigation';

import SellerFormFooter from '@/components/seller-form-footer';
import { currentSuccessionPlan } from '@/config/succession-plan/succession-plan-user';
import { useModal } from '@/app/shared/modal-views/use-modal';

const MAP_STEP_TO_COMPONENT = {
  [formParts['about-you']]: About,
  [formParts['about-you-v2']]: AboutYou,
  [formParts.companyProfile]: CompanyProfile,
  [formParts['advisory-team']]: Advisory
};

interface IndexProps {
  slug?: string;
  className?: string;
  product?: any;
  params?: any
}

export default function CreateSellerIntakeWrapper(props: IndexProps) {
  const methods = useForm<SuccessionInput>({
    resolver: zodResolver(successionIntakeSchema),
    defaultValues: {
      otherOwners: [],
      advisors: [
        { position: 'Accountant', name: '', companyName: '', email: '', phoneNumber: '' },
        { position: 'Lawyer', name: '', companyName: '', email: '', phoneNumber: '' },
        { position: 'Commercial Realtor', name: '', companyName: '', email: '', phoneNumber: '' },
        { position: 'Banker', name: '', companyName: '', email: '', phoneNumber: '' },
        { position: 'Insurance Broker', name: '', companyName: '', email: '', phoneNumber: '' },
      ],
      organizationalChart: [{ name: '', position: '' }, { name: '', position: '' }, { name: '', position: '' }],
    },

  });
  return (
    <FormProvider {...methods}>
      <CreateEditProduct {...props} />
    </FormProvider>
  )
}

export function CreateEditProduct({
  slug,
  product,
  className,
  params,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const formContext = useFormContext();
  const { push } = useRouter();
  const { currentUser, updateUser } = currentSuccessionPlan() as any;

  const { openModal } = useModal();

  useEffect(() => {
    openModal({
      customSize: '80%',
      view: <StepTwo />,
    })
  }, [])

  const onSubmit = async (data: FieldValues | any) => {


    function generateMarkdownTable(orgChart: [{ name: string, position: string }]) {
      const filteredOrgChart = orgChart.filter(({ name, position }: { name: string, position: string }) => name && position);
      if (!Array.isArray(filteredOrgChart) || filteredOrgChart.length === 0) {
        return 'No data available';
      }

      let markdown = '| Name | Position |\n';
      markdown += '|------|----------|\n';

      filteredOrgChart.forEach(({ name, position }) => {
        markdown += `| ${name} | ${position} |\n`;
      });

      return markdown;
    }

    function generateMarkdownTableAdvisors(advisors: any) {
      const filteredOrgChart = advisors;
      if (!Array.isArray(filteredOrgChart) || filteredOrgChart.length === 0) {
        return 'No data available';
      }

      let markdown = '| Position | Name | Company name | Email | Phone # \n';
      markdown += '|------|----------|\n';

      filteredOrgChart.forEach((val: any) => {
        const { position, name, companyName, email, phoneNumber } = val;
        markdown += `| ${position} | ${name} | ${companyName} | ${email} | ${phoneNumber} \n`;
      });

      return markdown;
    }


    const orgChart = generateMarkdownTable(data?.organizationalChart || []);
    const advisorsChart = generateMarkdownTableAdvisors(data?.advisors || []);
    try {
      const docRef = doc(collection(firebase.firestore, "succession_plan"), currentUser?.id);
      const userRef = doc(collection(firebase.firestore, "users"), currentUser?.id);
      const intakeObject = {
        createdAt: serverTimestamp(),
        id: docRef?.id,
        userID: currentUser?.id,
        user: currentUser,

        legalRepresentative: data?.legalRepresentative || null,
        firstName: data?.firstName || null,
        lastName: data?.lastName || null,
        email: data?.email || null,
        contact: data?.contact || null,

        companyName: data?.companyName || null,
        dba: data?.dba || null,
        legalStructure: data?.legalStructure || null,
        jurisdiction: data?.jurisdiction || null,
        province: data?.province || null,

        industry: data?.industry || null,
        subCategory: data?.subCategory || [],
        website: data?.website || null,

        registrationNumber: data?.registrationNumber || null,
        yearIncorporated: data?.yearIncorporated || null,
        profilePicture: data?.profilePicture || null,
        currentOwner: data?.currentOwner || null,
        isOtherOwnersInvolved: data?.isOtherOwnersInvolved || null,

        exitBusinessMonths: data?.exitBusinessMonths || null,
        logo: data?.logo || null,
        organizationalChart: orgChart,
        advisors: data?.advisors || [],
        advisorsChart: advisorsChart || null,
        otherOwners: data?.otherOwners || [],
        status: 'in-progress'
      };
      await updateDoc(docRef, intakeObject);
      await updateDoc(userRef, {
        isIntake: true,
        ...(data?.profilePicture ? { profilePictureURL: data?.profilePicture } : {})
        ,
      });
      console.log('Intake form submitted');
      updateUser({ intake: true })
      push('/succession-plan/dialogue')

    }
    catch (error) {
      console.log('Error', error);
    }
    finally {
      setLoading(false);
      toast.success(
        <Text as="b">Intake assessment successfully submitted</Text>
      );
      // push(routes?.eCommerce?.dashboard)
    }

  };

  return (
    <div className="@container">

      <FormNav
        className={cn(
          layout === LAYOUT_OPTIONS.BERYLLIUM && 'z-[999] 2xl:top-[72px]'
        )}
      />
      {/* <FormProvider {...methods}> */}
      <form
        onSubmit={formContext?.handleSubmit(onSubmit)}
        className={cn(
          'relative z-[19] [&_label.block>span]:font-medium',
          className
        )}
      >
        <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
          {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (

            <Element
              key={key}
              name={formParts[key as keyof typeof formParts]}
            >
              {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
            </Element>
          ))}
        </div>

        <SellerFormFooter
          isLoading={isLoading}
          submitBtnText={'Submit'}
        />
      </form>
      {/* </FormProvider> */}
    </div>
  );
}
