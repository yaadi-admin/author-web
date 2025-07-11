'use client';

import { useState, useEffect, SyntheticEvent } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useFormContext, FieldValue, FieldValues } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import { doc, onSnapshot, setDoc, addDoc, collection, query, where, serverTimestamp } from "firebase/firestore";
import firebase from '@/config/firebase.config';
import FormNav, {
  formParts,
} from './form-nav';

import FormFooter from '@/components/form-footer';
import {
  ProviderIntakeInput,
  providerIntakeSchema,
} from '@/utils/validators/provider-intake.schema';
import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { currentSession } from '@/config/session';
import ProductSummary from './product-summary';
import ShippingInfo from './shipping-info';
import ProductSeo from './product-seo';



const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
  [formParts.business]: ShippingInfo,
  [formParts.areaOfExpertise]: ProductSeo,
};

interface IndexProps {
  slug?: string;
  className?: string;
  product?: ProviderIntakeInput;
}

export default function CreateIntakeWrapper(props: IndexProps) {
  const methods = useForm<ProviderIntakeInput>({
    resolver: zodResolver(providerIntakeSchema),
    defaultValues: {
      representative: '',
      primary: '',
      // firstName: '',
      // lastName: '',
      title: '',
      designation: '',
      // email: '',
      contact: '',
      linkedin: '',
      companyLegalName: '',
      dba: '',
      cob: '',
      province: '',
      website: '',
      description: '',
      YIB: '',
      employees: '',
      Proposition1: '',
      Proposition2: '',
      Proposition3: '',
      category: '',
      categories: [],
      industries: [],
      expertise: [],
      logo: '',
      profilePictureURL: '',
      intakeForm: '',
      isFormVerified: false,
    },
  });
  return (
    <FormProvider {...methods}>
      <CreateIntake {...props} />
    </FormProvider>
  )
}

function CreateIntake({
  slug,
  product,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);

  const { push } = useRouter();
  const currentUser = currentSession() as any;
  const [logo, setLogo] = useState('');
  const [intakeForm, setIntakeForm] = useState('');
  const [profile, setProfile] = useState('');
  const [isFiles, setIsFiles] = useState(false);

  const formContext = useFormContext();
  console.log(formContext);
  useEffect(() => {
    const interval = setInterval(() => {
      const downloadURL = localStorage.getItem('companyURL');
      if (downloadURL) {
        setLogo(downloadURL);
        localStorage.removeItem('companyURL');
        clearInterval(interval); // Stop checking once URL is found
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const downloadURL = localStorage.getItem('companyIntake');
      if (downloadURL) {
        setIntakeForm(downloadURL);
        localStorage.removeItem('companyIntake');
        clearInterval(interval); // Stop checking once URL is found
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const downloadURL = localStorage.getItem('profilePhoto');
      if (downloadURL) {
        setProfile(downloadURL);
        localStorage.removeItem('profilePhoto');
        clearInterval(interval); // Stop checking once URL is found
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);


  useEffect(() => {
    if (logo && intakeForm && profile) {
      setIsFiles(true);
    }
  }, [logo, intakeForm, profile]);

  const onSubmit = async (data: ProviderIntakeInput | FieldValues) => {

    setLoading(true);
    try {
      const docRef = doc(collection(firebase.firestore, "providers"));
      const intakeRef = doc(collection(firebase.firestore, "intakes"));
      const formData = {


        createdAt: serverTimestamp(),
        id: docRef?.id,
        userID: currentUser?.id,
        user: currentUser,
        representative: data.representative,
        primaryContact: data.primary,
        firstName: currentUser?.firstName || '',
        lastName: currentUser?.lastName || '',
        title: data.title,
        designation: data?.designation,
        email: currentUser?.email,
        contact: data.contact,
        linkedIn: data?.linkedin,
        dba: data?.dba,

        cob: data.cob,
        province: data.province,
        website: data?.website,
        description: data.description,
        yearInBusiness: data.YIB,
        employeeCount: data.employees,
        sellingProposition1: data.Proposition1,
        sellingProposition2: data?.Proposition2,
        sellingProposition3: data?.Proposition3,
        category: data?.category,

        intake: data?.intakeForm,
        logo: data?.logo,
        profilePictureURL: data?.profilePictureURL,

      }

      const legacyFormatExpertise = (data.expertise || []).map((exp: string) => ({ field: exp, value: true }))
      const legacyFormatCategories = (data.categories || []).map((exp: string) => ({ field: exp, value: true }))
      const legacyFormatIndustries = (data.industries || []).map((exp: string) => ({ field: exp, value: true }))


      const intakeFormDataStored = {
        ...formData,
        categories: legacyFormatCategories,
        industries: legacyFormatIndustries,
        expertise: legacyFormatExpertise,
        type: 'provider',
      };
      console.log(intakeFormDataStored);

      // const checkedBoxes = [] as any;
      // const checkedBoxes2 = [] as any;
      // const checkedIndustries = [] as any;

      // for (let i = 20; i <= 30; i++) {
      //   const field = data?.target[i]?.labels[0]?.outerText;
      //   const value = data?.target[i].checked;
      //   checkedBoxes.push({ field, value });
      // }

      // for (let i = 31; i <= 41; i++) {
      //   const field = data?.target[i]?.labels[0]?.outerText;
      //   const value = data?.target[i].checked;
      //   checkedIndustries.push({ field, value });
      // }

      // for (let i = 42; i <= 96; i++) {
      //   const field = data?.target[i]?.labels[0]?.outerText;
      //   const value = data?.target[i].checked;
      //   checkedBoxes2.push({ field, value });
      // }



      await setDoc(intakeRef, intakeFormDataStored);
      toast.success(
        <Text as="b">Intake assessment successfully submitted</Text>
      );
      setLoading(false);
      push(routes?.provider.dashboard);
    }
    catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="@container">
      <div className="flex">

        <div className="w-full">
          <FormNav
            className={cn(
              layout === LAYOUT_OPTIONS.BERYLLIUM && 'z-[999] 2xl:top-[72px]'
            )}
          />
          <form
            onSubmit={formContext.handleSubmit(onSubmit)}
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

            <FormFooter
              isLoading={isLoading}
              isFiles={isFiles}
              logo={logo}
              intake={intakeForm}
              profile={profile}
              submitBtnText={'Submit'}
            />
          </form>
        </div>

      </div>
    </div>
  );
}
