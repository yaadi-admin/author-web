'use client';

import Image from 'next/image';
import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';
import { Title, Text, Avatar } from 'rizzui';
import cn from '@/utils/class-names';
import { formatDate } from '@/utils/format-date';
import signature from '@public/client-signature.svg';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';

interface DeliveryDetailsProps {
  className?: string;
  product?: any;
}


export default function DeliveryDetails({ className, product }: DeliveryDetailsProps) {
  return (
    <>
      <div
        className={cn(
          'rounded-lg border border-gray-300 p-5 @3xl:p-7 ',
          className
        )}
      >
        <div className="flex items-center gap-2">
          {product?.tags ? (product?.tags)?.map((item: any, index: number) => (
            <figure key={index} className="relative">
              <Image
                quality={100}
                width={100}
                height={100}
                alt={`image`}
                className="object-contain"
                src={item?.photo}
              />
            </figure>
          )) :
            <>
              <figure className="relative">
                <Image
                  quality={100}
                  width={100}
                  height={100}
                  alt={`image`}
                  className="object-contain"
                  src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/SS%20Journey%20Completed.png?alt=media&token=697d9a81-483c-43c2-80e2-8f50bfba511a'}
                />
              </figure>
              <figure className="relative">
                <Image
                  quality={100}
                  width={100}
                  height={100}
                  alt={`image`}
                  className="object-contain"
                  src={"https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/3rdpartyval.png?alt=media&token=f8979967-5703-45f0-93e3-894913666a43"}
                />
              </figure>
            </>
          }

        </div>
      </div>
    </>
  );
}
