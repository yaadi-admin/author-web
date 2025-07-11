import ProductModernCard from '@/components/cards/product-modern-card';
import cn from '@/utils/class-names';
import hasSearchedParams from '@/utils/has-searched-params';
import shuffle from 'lodash/shuffle';
import React from 'react';
import { Title } from 'rizzui';

type UserInfoType = {
  name: string;
  address: string;
  email: string;
  country: string;
  phone: string;
  city: string;
};

interface AddressesProps {
  className?: string;
  product?: any;
  packages?: any;
}

let countPerPage = 12;

export default function ProviderPackages({ className, product, packages }: AddressesProps) {
  const filteredData = hasSearchedParams()
    ? shuffle(packages)
    : packages;
  return (
    <div className={cn('@container', className)}>
      <AddressCard title="Current Packages" filteredData={filteredData} />
      {/* <AddressCardSectionTwo title="Opportunities" userInfo={product} /> */}
    </div>
  );
}

function AddressCard({
  title,
  className,
  filteredData,
}: {
  title: string;
  className?: string;
  filteredData?: any;
}) {

  return (
    <div
      className={cn(
        'rounded-lg shadow-lg p-8 w-[90%] mx-auto',
        className
      )}
    >
      <Title style={{ marginBottom: '2.5%' }} as="h1" className="text-3xl font-bold">
        {title}
      </Title>
      <div className="grid-cols-3 grid gap-6">
        {filteredData?.map((product: any, index: any) => (
          <React.Fragment key={product.id}>
            <ProductModernCard product={product} />
            {index % 3 === 2 && index !== filteredData.length - 1 && (
              <div style={{ width: '100%', height: '1px', gridColumn: '1 / -1' }}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>



  );
}