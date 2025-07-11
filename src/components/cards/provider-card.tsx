import Image from 'next/image';
import { Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import Link from 'next/link';
import { PiStarFill } from 'react-icons/pi';
import WishlistButton from '@/components/wishlist-button';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

export function RatingsCount({
  rating,
  totalRatings,
}: {
  rating: number;
  totalRatings?: number;
}) {
  return (
    <Text
      as="span"
      className="inline-flex w-[100px] flex-shrink-0 items-center justify-end gap-1 text-sm text-gray-900"
    >
      <PiStarFill className="h-3.5 w-3.5 text-gray-900" />
      {rating}
      {totalRatings && ` (${totalRatings})`}
    </Text>
  );
}

interface Product {
  cib: string;
  cob: string;
  country: string;
  logo: string;
  id: string;
  dba: string;
  province: string;
  sellingProposition1: string;
  sellingProposition2: string;
  sellingProposition3: string;
  category: string;
  expertise: any;
}

type ListingCardProps = {
  product: Product;
  user?: any;
  className?: string;
  title?: React.ReactNode;
};

export default function ProviderCard({
  product,
  user,
  className,
  title = `${product?.dba}`,
}: ListingCardProps) {
  const { dba, logo, id, province, sellingProposition1, sellingProposition2, sellingProposition3, category, expertise, cib, cob } =
    product;

  const { push } = useRouter();

  return (
    <div className={cn(className)}>

      <div className="relative">
        <Link href={routes?.providers.listingDetails(id)}>
          <div className="relative mx-auto aspect-[91/75] w-full overflow-hidden rounded-lg">
            <Image
              src={logo}
              alt={title as string}
              fill
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw"
              className="h-full w-full object-contain"
            />
          </div>
        </Link>
        {/* <WishlistButton className="absolute end-3 top-3" /> */}
      </div>
      <div className="pt-3">
        <div className="mb-1 flex items-center justify-between">
          <Link href={routes?.providers.listingDetails(id)} className="max-w-[calc(100%-120px)] flex-grow">
            <Title
              as="h6"
              className="truncate font-semibold transition-colors hover:text-primary"
            >
              {title}
            </Title>
          </Link>
          {/* <RatingsCount rating={rating} totalRatings={ratingCount} /> */}
        </div>

        <Text as="p" className="mb-1 truncate">
          {cob ? cob : cib},{province}
        </Text>

        {/* <div className="mt-2 flex items-center font-semibold text-gray-900">
          {category}
        </div> */}

        <div className="flex items-center">
          <Text
            as="span"
            className="relative -inset-y-1/2 inline-block px-2 after:absolute after:-end-[1px] after:top-1/2 after:h-1 after:w-1 after:rounded-full after:bg-gray-500 first:ps-0 last:pe-0 last:after:hidden"
          >
            {sellingProposition1 ? sellingProposition1 : 'Broad Network'} • {sellingProposition2 ? sellingProposition2 : 'Budget Friendly'} • {sellingProposition3 ? sellingProposition3 : 'Best in Class'}
          </Text>
        </div>

      </div>
    </div>
  );
}
