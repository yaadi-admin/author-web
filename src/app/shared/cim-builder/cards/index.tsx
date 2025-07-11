'use client';

import WidgetCard from '@/components/cards/widget-card';
import { cimCollection } from '@/config/ref/cimBuilderCollection';
import { useRouter, useSearchParams } from 'next/navigation';
import { PiCheckBold } from 'react-icons/pi';
import { AdvancedCheckbox } from 'rizzui';
import SimpleBar from 'simplebar-react';
import firebase from '@/config/firebase.config';
import Form from '../form/index';
import Congratulations from '../congratulations/index';
import { query, collection, getDocs, orderBy, doc, updateDoc } from "firebase/firestore";
import Dialog from '../dialogue/index';
import Preview from '../preview/index';
import { cim } from '@/config/seller/cim';


function Cards() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const step = searchParams.get('step');
  const listingId = searchParams.get('listingId');
  const { findCurrentStep, data } = cim(`${listingId}`);

  //  const {data} = cim(`${listingId}`);

  //  console.log("Data: ",data)

  const onNext = (nextStep: string) => {
    router.push(`?listingId=${listingId}&id=${id}&step=${nextStep}`);
  };


  const updateStatus = async () => {
    try {

      const docRef = doc(collection(firebase.firestore, "cim"), `${listingId}`);

      const subDocRef = doc(collection(docRef, "cards"), `${id}`);

      await updateDoc(subDocRef, { status: true });


    } catch (e) {
      console.log(e);

    }


  };


  const onDone = () => {
    if (id === 'nq3pIXcNJaBhDSSlRJeP') {
      router.push(`/cim-builder/cim?listingId=${listingId}`);
    } else {
      router.push(`/seller/cimplified`);
    }
    updateStatus();
  };

  const onNextCard = () => {
    const orders = data.filter((t: any) => !t.disabled).map((t: any) => ({ order: t.order, ...t }))
    const currentOrder = orders.findIndex((t: any) => t.id === id)
    const nextCard = orders[currentOrder + 1];
    let nextStep = 'form';
    if (nextCard?.section1?.isShown === true) {
      nextStep = 'form';
    } else if (nextCard?.section2.isShown === true) {
      nextStep = 'dialogue';
    } else if (nextCard?.section3.isShown === true) {
      nextStep = 'preview'
    }
    router.push(`?listingId=${listingId}&id=${nextCard.id}&step=${nextStep}`);
    updateStatus();
  };

  const handleSelected = (item: any) => {
    const step = findCurrentStep(`${item.id}`)
    router.push(`?listingId=${listingId}&id=${item.id}&step=${step}`);
  };


  const hideSidebar = ['dialogue', 'summary', 'congratulations', 'report'];
  const isHidden = hideSidebar.includes(`${step}`);
  const formClassName = isHidden ? 'w-full' : 'w-[80%]';

  // return <Summary />;

  return (
    <div className='h-full flex col-span-full gap-10'>
      {!isHidden &&
        <div className='w-1/4 '>
          <WidgetCard
            title={`Cimplified - A CIM Builder`}
            titleClassName="text-gray-800 sm:text-lg font-inter"
            headerClassName="items-center"
            className={'overflow-hidden bg-gray-50 @container'}
          >
            <div className="mt-7 mb-7 h-full"
              style={{ height: '100vh', overflowY: 'scroll' }}
            >
              <SimpleBar className="mb-12 relative -mx-3 -my-2 h-full w-[calc(100%+24px)]">
                <div className="relative mb-12 before:absolute before:start-9 before:top-3 before:z-0 before:h-[calc(100%-24px)] before:w-1 before:translate-x-0.5 before:bg-gray-200">
                  {(data)?.map((item: any, index: number) => {
                    if (item.disabled) return null;
                    return (
                      <AdvancedCheckbox
                        name="currency"
                        value="pound"
                        onClick={() => handleSelected(item)}
                        disabled={item?.disabled}
                        key={item?.id}
                        checked={item?.status}
                        className="relative z-10 mt-0.5 px-3 py-1.5"
                        inputClassName="[&:checked~.rizzui-advanced-checkbox]:ring-muted [&:checked~.rizzui-advanced-checkbox>span>svg]:opacity-100 [&:checked~.rizzui-advanced-checkbox>span]:border-[#2B7F75]  [&:checked~.rizzui-advanced-checkbox>div>div>strong]:text-gray-500 [&:checked~.rizzui-advanced-checkbox>div>div>strong+span]:line-through"
                        contentClassName="flex w-full bg-gray-0 dark:bg-gray-50 items-center @md:px-5 px-4 py-4 rounded-lg shadow hover:shadow-md transition-shadow border-0 @md:gap-5 gap-4"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#D9B34E]">
                          <PiCheckBold className="fill-[#2B7F75] opacity-0" />
                        </span>
                        <div className="block">
                          <div className="text-gray-600">
                            <strong className="font-semibold text-gray-900">
                              {item.title}
                            </strong>{' '}
                          </div>
                        </div>
                      </AdvancedCheckbox>
                    )
                  })}
                </div>

              </SimpleBar>
            </div>
          </WidgetCard>
        </div>
      }
      <div className={formClassName}>
        {step === 'form' && <Form
          id={`${id}`}
          listingId={`${listingId}`}
          onNext={onNext}
        />}
        {step === 'dialogue' && <Dialog id={`${id}`} onNext={onNext} />}
        {step === 'summary' && <Preview id={`${id}`} listingId={`${listingId}`} onNext={onNext} />}
        {step === 'congratulations' && <Congratulations onNext={onNextCard} onDone={onDone} />}

      </div>
    </div>
  )
}

export default Cards