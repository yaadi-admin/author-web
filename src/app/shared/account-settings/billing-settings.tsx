'use client';

import { useState, useEffect } from 'react';
import { Button, Title, Text, RadioGroup, AdvancedRadio } from 'rizzui';
import cn from '@/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
import {
  PiCheckCircleFill,
  PiDownloadSimpleBold,
  PiFire,
  PiLightning,
  PiPlusBold,
  PiStackSimple,
} from 'react-icons/pi';
import BillingHistoryTable from '@/app/shared/account-settings/billing-history/table';
import AddBillingCardModalView from '@/app/shared/account-settings/modal/add-billing-card';
import MasterCardIcon from '@/components/icons/mastercard';
import VisaIcon from '@/components/icons/visa';
import ApplePayIcon from '@/components/icons/apple-pay';
import { billingHistoryData } from '@/data/billing-history';
import { exportToCSV } from '@/utils/export-to-csv';
import firebase from '@/config/firebase.config';
import { currentSession } from '@/config/session';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  onSnapshot,
  Unsubscribe,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import toast from 'react-hot-toast';

const businessPlanOptions = [
  {
    icon: <PiStackSimple className="h-4 w-4 text-gray-900" />,
    title: 'Basic Growth',
    duration: 90,
    months: 3,
    cost: 59.97,
    description:
      'Includes up to 3 months subscription, and access to all basic AI features.',
    value: 'basic',
  },
  {
    icon: <PiFire className="h-4 w-4 text-gray-900" />,
    title: 'Business Growth',
    duration: 180,
    months: 6,
    cost: 99.97,
    description:
      'Includes up to 6 months subscription, and access to all AI features.',
    value: 'premium',
  },
  {
    icon: <PiLightning className="h-4 w-4 text-gray-900" />,
    title: 'Enterprise Growth',
    duration: 365,
    months: 12,
    cost: 299.97,
    description:
      'Includes up to 12 months subscription, unlimited individual data and access to all AI features.',
    value: 'enterprise',
  },
];

const investorPlanOptions = [
  {
    icon: <PiStackSimple className="h-4 w-4 text-gray-900" />,
    title: 'Narro Basic',
    duration: 90,
    description:
      'Includes up to 10 users, and access to all basic features.',
    value: 'basic',
  },
  {
    icon: <PiFire className="h-4 w-4 text-gray-900" />,
    title: 'Premium plan $20/month',
    duration: 180,
    description:
      'Includes up to 20 users, 40GB individual data and access to all features.',
    value: 'premium',
  },
  {
    icon: <PiLightning className="h-4 w-4 text-gray-900" />,
    title: 'Enterprise plan $40/month',
    duration: 365,
    description:
      'Unlimited users, unlimited individual data and access to all features.',
    value: 'enterprise',
  },
];

const cardsOptions = [
  {
    icon: <MasterCardIcon className="" />,
    title: 'Mastercard ending in 2321',
    last4: '2321',
    expiry: '06/24',
    default: true,
    value: 'mastercard',
  },
  {
    icon: <VisaIcon className="" />,
    title: 'Visa ending in 22021',
    last4: '22021',
    expiry: '06/23',
    default: false,
    value: 'visa',
  },
  {
    icon: <ApplePayIcon className="dark:invert" />,
    title: 'ApplePay ending in 2029',
    last4: '22021',
    expiry: '06/24',
    default: false,
    value: 'applepay',
  },
];

export default function BillingSettingsView() {
  const currentUser = currentSession() as any;
  const [subscriptionPlan, setSubscriptionPlan] = useState("No Plan") as any;

  async function fetchSubscriptionPlan(plan: any) {
    try {
      setSubscriptionPlan(plan);
    } catch (error) {
      console.error('Error fetching subscription plan:', error);
    }
  }

  function handleExportData() {
    exportToCSV(
      billingHistoryData,
      'Title,Amount,Date,Status,Shared',
      'billing_history'
    );
  }

  return (
    <>
      <HorizontalFormBlockWrapper
        childrenWrapperClassName="gap-0 @lg:gap-0"
        title="Account Plans"
        titleClassName="text-xl font-semibold"
        description="Plans offer a diverse workflow. Pick a plan that best fits your service requirements"
      />
      <HorizontalFormBlockWrapper
        title="Current Plan"
        description={`You are currently on ${subscriptionPlan}`}
        descriptionClassName="max-w-md"
        childrenWrapperClassName="@3xl:grid-cols-1 max-w-5xl w-full"
      >
        <div>
          <CurrentPlans setSubscriptionPlan={fetchSubscriptionPlan} />
        </div>
      </HorizontalFormBlockWrapper>
      {/* <HorizontalFormBlockWrapper
        title="Card Details"
        description="Update your billing details and address."
        descriptionClassName="max-w-md"
        childrenWrapperClassName="@3xl:grid-cols-1 max-w-5xl w-full"
      >
        <CardDetails />
      </HorizontalFormBlockWrapper> */}
      <div className="mt-8 xl:mt-10">
        <div className="mb-5 flex items-center justify-between">
          <Title as="h5" className="text-[17px] font-semibold">
            Payment History
          </Title>
          <Button onClick={() => handleExportData()}>
            <PiDownloadSimpleBold className="me-2 h-4 w-4" />
            Download
          </Button>
        </div>
        <BillingHistoryTable data={billingHistoryData} />
      </div>
    </>
  );
}

export function CurrentPlans({ setSubscriptionPlan }: { setSubscriptionPlan: (arg0: string) => void }) {
  const [currentPlan, setCurrentPlan] = useState('No Plan');
  const [selectedPlan, setSelectedPlan] = useState('');
  const currentUser = currentSession() as any;

  useEffect(() => {
    async function fetchSubscriptionPlan() {
      try {
        const docRef = doc(firebase.firestore, 'subscription_plans', currentUser.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (data.subscription && new Date(data.expirationDate.toDate()) > new Date()) {
              setCurrentPlan(data.plan);
              setSubscriptionPlan('Narro™ ' + data.plan);
              setSelectedPlan(data.plan);
            } else {
              setCurrentPlan('No Plan');
              setSubscriptionPlan('No Plan');
              setSelectedPlan('');
            }
          } else {
            console.log('No subscription plan available.');
            setCurrentPlan('No Plan');
            setSubscriptionPlan('No Plan');
            setSelectedPlan('');
          }
        });
        return unsubscribe;
      } catch (error) {
        console.error('Error fetching subscription plan:', error);
      }
    }

    fetchSubscriptionPlan();
  }, [currentUser.id, setSubscriptionPlan]);

  async function handleUpdatePlan(plan: any) {
    const planDetails = {
      plan: plan?.value,
      cost: plan?.cost,
      subscription: true,
      status: 'active',
      userID: currentUser?.id,
      user: currentUser,
      role: currentUser?.role,
      name: currentUser?.firstName + ' ' + currentUser?.lastName,
      email: currentUser?.email,
      address: currentUser?.address || '',
      phone: currentUser?.phone,
      avatar: currentUser?.profilePictureURL,
      description: plan.description,
      expirationDate: Timestamp.fromDate(new Date(new Date().setMonth(new Date().getMonth() + plan?.months))),
      startDate: Timestamp.fromDate(new Date()),
      duration: plan.duration,
      paymentMethod: {
        last4: '2321',
        date: serverTimestamp(),
      },
    };
    console.log('Updating subscription plan:', planDetails);

    try {
      const docRef = doc(firebase.firestore, 'subscription_plans', currentUser.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, planDetails);
      } else {
        await setDoc(docRef, planDetails);
      }
      console.log('Subscription plan updated successfully.');
      toast.success('Subscription plan updated successfully.', { position: 'bottom-center' });
    } catch (error) {
      console.error('Error updating subscription plan:', error);
      toast.error('Error updating subscription plan.', { position: 'bottom-center' });
    }
  }

  return (
    <RadioGroup
      value={selectedPlan}
      setValue={setSelectedPlan}
      className="flex flex-col gap-5"
    >
      {(currentUser?.role === 'seller' ? businessPlanOptions : investorPlanOptions).map((plan, index) => (
        <AdvancedRadio
          key={`plan-${index}`}
          name="current_plans"
          value={plan.value}
          onChange={() => setSelectedPlan(plan.value)}
          checked={plan.value === selectedPlan}
          className="flex flex-col rounded-xl text-sm hover:cursor-pointer hover:border-primary"
          inputClassName="[&:checked~span_div>.icon]:block [&~span]:rounded-xl [&:checked~span]:ring-offset-0 [&~span:hover]:border-primary [&:checked~.rizzui-advanced-checkbox]:border-primary [&:checked~.rizzui-advanced-checkbox]:ring-primary [&:checked~.rizzui-advanced-checkbox]:ring-1"
        >
          <div className="flex items-center justify-between gap-3 px-1.5 py-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
              {plan.icon}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <Title
                  as="h6"
                  className="mb-1 text-sm font-medium text-gray-900"
                >
                  {plan.title}
                </Title>
                <PiCheckCircleFill className="icon hidden h-6 w-6 flex-shrink-0 text-primary" />
              </div>
              <Text className="text-gray-500">{plan.description}</Text>
            </div>
            {selectedPlan !== currentPlan && plan.value !== currentPlan && (
              <Button
              onClick={() => handleUpdatePlan(plan)}
              >
              <span className="text-sm font-medium">
                {currentPlan === 'No Plan' ? 'Select Plan' : plan.duration > ((currentUser?.role === 'seller' ? businessPlanOptions : investorPlanOptions).find(p => p.value === currentPlan)?.duration || 0) ? 'Upgrade Plan' : 'Downgrade Plan'}
              </span>
              </Button>
            )}
          </div>
        </AdvancedRadio>
      ))}
    </RadioGroup>
  );
}

export function CardDetails() {
  const [paymentMethod, setPaymentMethod] = useState('mastercard');
  const { openModal } = useModal();
  const currentUser = currentSession() as any;

  useEffect(() => {
    async function fetchPaymentMethod() {
      try {
        const q = query(
          collection(firebase.firestore, 'payment_methods'),
          where('ownerId', '==', currentUser.id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
        });
      } catch (error) {
        console.error('Error fetching payment method:', error);
      }
    }

    fetchPaymentMethod();
  }, [currentUser.id]);

  async function storeCardDetails(cardDetails: any) {
    try {
      const cardId = `card_${currentUser.id}`;
      const cardData = {
        card: cardDetails,
        addressCity: '',
        addressCountry: '',
        addressLine1: '',
        addressLine2: '',
        addressState: '',
        addressZip: '',
        brand: '',
        cardId: '',
        country: '',
        expMonth: 4,
        expYear: 2027,
        funding: 'prepaid',
        isApplePayCard: false,
        last4: '',
        name: '',
        ownerId: currentUser.id,
      };

      await setDoc(doc(firebase.firestore, 'payment_methods', cardId), cardData);
      console.log('Card details stored successfully.');
    } catch (error) {
      console.error('Error storing card details:', error);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {cardsOptions.map((cards, index) => (
          <AdvancedRadio
            key={`cards-${index}`}
            name="card_details"
            onChange={() => setPaymentMethod(cards.value)}
            defaultChecked={cards.value === paymentMethod}
            value={cards.value}
            className="flex gap-3 rounded-xl border border-muted text-sm hover:cursor-pointer hover:border-primary [&_.rizzui-advanced-checkbox]:flex [&_.rizzui-advanced-checkbox]:gap-3 [&_.rizzui-advanced-checkbox]:border-0 [&_.rizzui-advanced-checkbox]:px-5 [&_.rizzui-advanced-checkbox]:py-5 [&_.rizzui-advanced-checkbox]:ring-0"
            inputClassName="[&:checked~span_div>.icon]:block [&~span]:pt-4 [&~span]:w-full [&~span]:rounded-xl [&:checked~span]:ring-offset-0 [&~span:hover]:border-primary [&:checked~.rizzui-advanced-checkbox]:border-primary [&:checked~.rizzui-advanced-checkbox]:ring-primary [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~.rizzui-advanced-checkbox]:w-full"
          >
            <div className="mb-2 flex h-8 w-12 shrink-0 items-center justify-center rounded-md border border-gray-100 px-2 py-1.5">
              {cards.icon}
            </div>
            <div className="block">
              <Title as="h6" className="mb-1 text-sm font-medium">
                {cards.title}
              </Title>
              <Text as="p">
                Expiry in <span className="font-medium">{cards.expiry}</span>
              </Text>
              <div className="mt-2 flex gap-3">
                <Button
                  variant="text"
                  className={cn(
                    'h-auto p-0',
                    cards.default && 'bg-transparent text-gray-500'
                  )}
                  disabled={cards.default}
                >
                  Set as Default
                </Button>
                <Button
                  variant="text"
                  className={cn('h-auto p-0 text-gray-900')}
                >
                  Edit
                </Button>
              </div>
            </div>
            {cards.value === paymentMethod ? (
              <PiCheckCircleFill className="icon ms-auto h-6 w-6 flex-shrink-0 text-primary" />
            ) : (
              <div className="relative ms-auto flex h-6 w-6 items-center justify-center rounded-full border border-muted"></div>
            )}
          </AdvancedRadio>
        ))}
      </div>

      <div>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() =>
            openModal({
              view: <AddBillingCardModalView />,
            })
          }
        >
          <PiPlusBold className="me-2 h-4 w-4" />
          <span>Add new card</span>
        </Button>
      </div>
    </div>
  );
}
