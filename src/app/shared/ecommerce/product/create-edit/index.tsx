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
} from '@/app/shared/ecommerce/product/create-edit/intake-form-nav';
import ProductSummary from '@/app/shared/ecommerce/product/create-edit/product-summary';
import { defaultValues } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import ProductMedia from '@/app/shared/ecommerce/product/create-edit/product-media';
import PricingInventory from '@/app/shared/ecommerce/product/create-edit/pricing-inventory';
import ProductIdentifiers from '@/app/shared/ecommerce/product/create-edit/product-identifiers';
import ShippingInfo from '@/app/shared/ecommerce/product/create-edit/shipping-info';
import ProductSeo from '@/app/shared/ecommerce/product/create-edit/product-seo';
import DeliveryEvent from '@/app/shared/ecommerce/product/create-edit/delivery-event';
import ProductVariants from '@/app/shared/ecommerce/product/create-edit/product-variants';
import ProductTaxonomies from '@/app/shared/ecommerce/product/create-edit/product-tags';
import FormFooter from '@/components/form-footer';
import {
  SellerIntakeInput,
  sellerIntakeSchema,
} from '@/utils/validators/seller-intake.schema';
import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import MessageDetails from '@/app/shared/support/inbox/message-details';
import { currentSession } from '@/config/session';
import SellerFormFooter from '@/components/seller-form-footer';

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
  // [formParts.media]: ProductMedia,
  // [formParts.pricingInventory]: PricingInventory,
  // [formParts.productIdentifiers]: ProductIdentifiers,
  [formParts.shipping]: ShippingInfo,
  [formParts.seo]: ProductSeo,
  // [formParts.deliveryEvent]: DeliveryEvent,
  // [formParts.variantOptions]: ProductVariants,
  // [formParts.tagsAndCategory]: ProductTaxonomies,
};

interface IndexProps {
  slug?: string;
  className?: string;
  product?: any;
}

export default function CreateSellerIntakeWrapper(props: IndexProps) {
  const methods = useForm<SellerIntakeInput>({
    resolver: zodResolver(sellerIntakeSchema),
    // defaultValues: defaultValues(product),

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
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const [hasFirstName, setHasFirstName] = useState(false);
  const formContext = useFormContext();


  const { push } = useRouter();
  const currentUser = currentSession() as any;


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const firstNameParam = searchParams.get('firstName');

    // Check if firstNameParam exists and has a value
    if (firstNameParam !== null && firstNameParam !== '') {
      setHasFirstName(true);
      push(routes?.eCommerce?.dashboard)

    } else {
      setHasFirstName(false);
    }
  }, []);

  const onSubmit = async (data: FieldValues | any) => {
    setLoading(true);

    // console.log(data)

    try {
      const docRef = doc(collection(firebase.firestore, "intakes"));
      const listingRef = doc(collection(firebase.firestore, "listings"));
      const userRef = doc(collection(firebase.firestore, "users"), currentUser?.id);
      const intakeObject = {
        createdAt: serverTimestamp(),
        id: docRef?.id,
        userID: currentUser?.id,
        user: currentUser,
        listingID: listingRef?.id,
        logo: data?.logo,
        profilePictureURL: data?.profilePictureURL || 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/icons8-circled-user-male-skin-type-3-80.png?alt=media&token=2d8caf0c-191b-4399-83cb-4eea25d76efd',
        chemicalAndPharmaceuticalProducts: data?.["Chemical and Pharmaceutical Products"] || null,
        foodAndBeverageProduction: data?.["Food and Beverage Production"] || null,
        machineryAndEquipment: data?.["Machinery and Equipment"] || null,
        metalAndWoodProducts: data?.["Metal and Wood Products"] || null,
        textilesAndApparel: data?.["Textiles and Apparel"] || null,
        administrativeReadiness: data?.administrativeReadiness || null,
        annualCashflow: data?.annualCashflow || null,
        annualRevenue: data?.annualRevenue || null,
        cob: data?.cob || null,
        companyName: data?.companyName || null,
        contact: data?.contact || null,
        dba: data?.dba || null,
        dealHorizon: data?.dealHorizon || null,
        dealSupport: data?.dealSupport || null,
        email: data?.email || null,
        exitReason: data?.exitReason || null,
        financialSupport: data?.financialSupport || null,
        firstName: data?.firstName || null,
        franchise: data?.franchise || null,
        hasAccountant: data?.hasAccountant || null,
        industry: data?.industry || null,
        intendedBuyer: data?.intendedBuyer || null,
        isFormVerified: data?.isFormVerified || null,
        jurisdiction: data?.jurisdiction || null,
        lastName: data?.lastName || null,
        lawyer: data?.lawyer || null,
        legalRepresentative: data?.legalRepresentative || null,
        legalStructure: data?.legalStructure || null,
        legalSupport: data?.legalSupport || null,
        locationShipping: data?.locationShipping || [],
        marketingSupport: data?.marketingSupport || null,
        neighborhood: data?.neighborhood || null,
        otherKeyDecisionMakers: data?.otherKeyDecisionMakers || null,
        planningSupport: data?.planningSupport || null,
        province: data?.province || null,
        subCategory: data?.subCategory || null,
        typeOfSale: data?.typeOfSale || null,
        valuationReadiness: data?.valuationReadiness || null,
        valuationSupport: data?.valuationSupport || null,
        website: data?.website || null,
        yearEstablished: data?.yearEstablished || null
      };
      await setDoc(docRef, intakeObject);
      await updateDoc(userRef, {
        isIntake: true,
        listingID: listingRef?.id,
        profilePictureURL: data?.profilePictureURL || 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/icons8-circled-user-male-skin-type-3-80.png?alt=media&token=2d8caf0c-191b-4399-83cb-4eea25d76efd',
      });
      console.log('Intake form submitted');
    }
    catch (error) {
      console.log('Error', error);
    }
    finally {
      setLoading(false);
      toast.success(
        <Text as="b">Intake assessment successfully submitted</Text>
      );
      push(routes?.eCommerce?.dashboard)
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
