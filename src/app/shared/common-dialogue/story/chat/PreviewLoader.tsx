import React, { useState, useEffect } from 'react';
import { Text } from 'rizzui';
import Loader from '@/components/ui/loader';
import { controls } from '@/config/ref/controls';

const useAutoIncrementingIndex = (length: number, interval: number, isLoading: boolean) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isLoading) {
      if (index < length - 1) {
        const timer = setTimeout(() => {
          setIndex(index + 1);
        }, interval);

        // Cleanup the timer
        return () => clearTimeout(timer);
      }
    }
  }, [index, isLoading, length, interval]);

  return index;
};


const PreviewLoader = ({ isLoading }: { isLoading: boolean }) => {
  const controlsAdmin = controls()[1] as any;
  const processMessages = [
    "Preparing your data...",
    "Removing filler words...",
    "Constructing your story...",
    "Finalizing the details..."
  ];

  const companyTriviaLength = controlsAdmin?.quotes.length || 0;

  const currentIndex = useAutoIncrementingIndex(processMessages.length, 12000, isLoading);
  const companyTriviaIndex = useAutoIncrementingIndex(companyTriviaLength, 6000, isLoading);

  const randomTrivia = controlsAdmin?.quotes[companyTriviaIndex];

  const LoadingComp = (
    <div className='col-span-full mt-40 bg-transparent'>
      <div className='w-1/2 flex flex-col gap-10 items-center mx-auto'>
        <h1>{processMessages[currentIndex]}</h1>
        <Loader />
        <div className='mt-10 flex flex-col gap-5'>
          <Text className='font-bold'>Words of Wisdom</Text>
          <h2>{randomTrivia?.label}</h2>
          <Text className='ml-auto'> - {randomTrivia?.by}</Text>
        </div>
      </div>
    </div>
  );

  return isLoading ? LoadingComp : null

};

export default PreviewLoader;
