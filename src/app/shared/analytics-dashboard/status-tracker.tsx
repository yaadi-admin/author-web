'use client';

import { useState, useEffect } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { Progressbar, Button } from 'rizzui';
import cn from '@/utils/class-names';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import SendMessage from '@/components/ui/containers/SendMessage';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { collection, doc, getDoc } from 'firebase/firestore';
import firebase from '@/config/firebase.config';

const handleOpenMessenger = (user: any, hello: any) => {
  hello.openModal({
    customSize: '600px',
    view: <SendMessage user={user} />,
  });
};

const calculateProgress = (listingObject: any) => {
  if (!listingObject) {
    return { percentage: 0, message: 'No listing data available.' };
  }

  if (listingObject.status === 'pending') {
    return { percentage: 0, message: 'Listing is pending approval.' };
  } else if (listingObject.status === 'in-progress') {
    if (listingObject.isSellerCompleted && !listingObject.isBrokerCompleted) {
      return { percentage: 70, message: 'Business owner has completed their part. Awaiting broker review.' };
    } else if (listingObject.isSellerCompleted && listingObject.isBrokerCompleted) {
      return { percentage: 100, message: 'Listing is fully completed.' };
    } else {
      return { percentage: 50, message: 'Listing is in progress.' };
    }
  } else if (listingObject.status === 'active') {
    return { percentage: 100, message: 'Listing is active.' };
  } else if (listingObject.isSellerCompleted && listingObject.staffHeadCount && (!listingObject.growthOpportunities || !listingObject.swotOutput)) {
    return { percentage: 47, message: 'Business story needs to be completed.' };
  } else {
    return { percentage: 0, message: 'Unknown status.' };
  }
};

const handleButtonClick = (status: string, push: any, modal?: any, data?: any) => {
  if (status === 'pending') {
    push(routes.seller.create);
  } else if (status === 'in-progress') {
    handleOpenMessenger(data, modal);
  } else if (status === 'active') {
    alert('Listing is active.');
  } else if (status === 'businessStory') {
    push(routes.seller.dialogue);
  } else {
    alert('Unknown status.');
  }
};

type ButtonProps = {
  text: string;
  variant: 'solid' | 'flat' | 'outline' | 'text';
  icon?: JSX.Element;
  onClick: () => void;
};

const getButtonProps = (listingObject: any, push: any, modal?: any, data?: any): ButtonProps => {
  if (!listingObject) {
    return {
      text: 'No Data',
      variant: 'flat',
      onClick: () => alert('No listing data available.'),
    };
  }

  if (listingObject.status === 'pending' && (!listingObject.isSellerCompleted || !listingObject.staffHeadCount)) {
    return {
      text: 'Continue',
      variant: 'solid',
      icon: <FaArrowRight />,
      onClick: () => handleButtonClick('pending', push),
    };
  } else if (listingObject.status === 'in-progress') {
    return {
      text: 'Message Broker',
      variant: 'solid',
      onClick: () => handleButtonClick('in-progress', push, modal, data),
    };
  } else if (listingObject.status === 'active') {
    return {
      text: 'Listing Active',
      variant: 'solid',
      onClick: () => handleButtonClick('active', push),
    };
  } else if (listingObject.isSellerCompleted && listingObject.staffHeadCount && (!listingObject.growthOpportunities || !listingObject.swotOutput)) {
    return {
      text: 'Complete Business Story',
      variant: 'solid',
      onClick: () => handleButtonClick('businessStory', push),
    };
  } else {
    return {
      text: 'Unknown Status',
      variant: 'flat',
      onClick: () => handleButtonClick('unknown', push),
    };
  }
};

export default function StatusTracker({ className, currentUser, listingObject }: { className?: string, currentUser: any, listingObject: any }) {
  const [progressData, setProgressData] = useState({ percentage: 0, message: '' });
  const [hasError, setHasError] = useState(false);
  const [broker, setBroker] = useState<any>();
  const { push } = useRouter();
  const hello = useModal();

  useEffect(() => {
    try {
      const progress = calculateProgress(listingObject);
      setProgressData(progress);
    } catch (error) {
      console.error('Error calculating progress:', error);
      setProgressData({ percentage: 0, message: 'Error loading listing data.' });
      setHasError(true);
    }
  }, [listingObject]);

  useEffect(() => {
    const fetchBrokerData = async () => {
      try {
        const brokerRef = doc(collection(firebase.firestore, "users"), "UjOrNoEjcLTCxnprG1lqSn5EW622");
        const brokerData = (await getDoc(brokerRef)).data();
        setBroker(brokerData);
      } catch (error) {
        console.error('Error fetching broker data:', error);
      }
    };

    fetchBrokerData();
  }, []);

  const buttonProps = getButtonProps(listingObject, push, hello, broker);

  return (
    <WidgetCard
      title="Listing Progress"
      description={'Track the progress of your listing from pending to active status.'}
      titleClassName="font-normal text-gray-500 text-normal sm:text-medium 2xl:text-normal font-secondary"
      descriptionClassName="text-sm font-normal text-gray-900 mt-1.5 font-primary 2xl:text-normal"
      className={className}
    >
      <div className="mt-5">
        {hasError ? (
          <p className="text-base text-red-500">Error loading listing data. Please try again later.</p>
        ) : progressData.percentage === 0 && progressData.message === 'No listing data available.' ? (
          <p className="text-base text-gray-500">Once started, your progress will show here.</p>
        ) : (
          <>
            <p className="text-base">{progressData.percentage}% completed</p>
            <Progressbar
              value={progressData.percentage}
              rounded="md"
              color="primary"
              aria-label={'Progress bar'}
              className="mt-2 h-5"
            />
            <p className="mt-4">
              Status: <span className="font-semibold text-gray-900">{progressData.message}</span>
            </p>
          </>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <Button variant={buttonProps.variant} onClick={buttonProps.onClick}>
          {buttonProps.icon}
          {buttonProps.text}
        </Button>
      </div>
    </WidgetCard>
  );
}
