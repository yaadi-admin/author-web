import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import { modernProductsGrid } from '@/data/shop-products';
import ProductModernCard from '@/components/cards/product-modern-card';
import shuffle from 'lodash/shuffle';
import hasSearchedParams from '@/utils/has-searched-params';

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
        'rounded-lg border border-gray-300 p-5 @3xl:p-7 ',
        className
      )}
    >
      <Title style={{marginBottom: '2.5%'}} as="h3" className="text-base font-semibold sm:text-lg">
        {title}
      </Title>
      <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
        {filteredData
          ?.slice(0, 3)
          ?.map((product: {
            id: string;
            name: string;
            minPrice: number;
            maxPrice: number;
            description: string;
            image: string;
          }, index: any) => (
            <ProductModernCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}