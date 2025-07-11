import { Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import { GiFactory, GiMoneyStack } from 'react-icons/gi';
import { GrBusinessService, GrGrow } from 'react-icons/gr';
import Helper from '@/components/ui/Helper';

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
    product: any;
}

function commafyNumber(numberStr: string) {
    const nextString = numberStr || '';
    return parseFloat(nextString.replace(/[^\d.-]/g, '')).toLocaleString('en-US');
}

export default function MoreListingDetails({ className, product }: AddressesProps) {
    if (!product) {
        return (
            <div className="flex justify-center items-center h-full">
                <Text className="text-red-500">Error loading product details. Please try again later.</Text>
            </div>
        );
    }

    return (
        <div className={cn('grid gap-6 @2xl:grid-cols-3 @3xl:gap-10 -mt-20', className)}>
            <AddressCardSectionTwo title="Operations" userInfo={product} />
            <OpportunitiesCard title="Real Estate" userInfo={product} />
            <TransitionSupport title="Investment Support" userInfo={product} />
        </div>
    );
}

function AddressCardSectionTwo({
    title,
    className,
    userInfo,
}: {
    title: string;
    className?: string;
    userInfo?: any;
}) {
    return (
        <div className={cn('p-5 @3xl:p-7 bg-white shadow-md rounded-lg', className)}>
            <Title as="h3" className="text-base font-semibold sm:text-lg flex gap-2 items-center">
                <GiFactory size={50} />
                {title}
            </Title>
            <ul className="mt-4 grid gap-3 @3xl:mt-5">
                <li className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Number of staff members</Helper>
                    <span className="font-semibold text-gray-900">Staff Headcount:</span>
                    </div>
                    <span>{userInfo?.staffHeadCount}</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Monthly rent or property taxes</Helper>
                    <span className="font-semibold text-gray-900">Rent/Prop Taxes:</span>
                    </div>
                    <span>${commafyNumber(userInfo?.monthlyRentOrPropertyTax)}</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Furniture, Fixtures, and Equipment</Helper>
                    <span className="font-semibold text-gray-900">FF&E:</span>
                    </div>
                    <span>${commafyNumber(userInfo?.ffe || '')}</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Value of inventory</Helper>
                    <span className="font-semibold text-gray-900">Inventory:</span>
                    </div>
                    <span>${commafyNumber(userInfo?.inventoryValue || '')}</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Year the business was established</Helper>
                    <span className="font-semibold text-gray-900">Year Est:</span>
                    </div>
                    <span>{userInfo?.yearEstablished}</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Operating hours of the business</Helper>
                    <span className="font-semibold text-gray-900">Operating Hours:</span>
                    </div>
                    <span>{userInfo?.operatingHours}</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Is the business a franchise?</Helper>
                    <span className="font-semibold text-gray-900">Franchise:</span>
                    </div>
                    <span>{userInfo?.isFranchise}</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Are legal documents ready?</Helper>
                    <span className="font-semibold text-gray-900">Admin Ready:</span>
                    </div>
                    <span>{userInfo?.hasLegalDocumentsReady}</span>
                </li>
            </ul>
        </div>
    );
}

function TransitionSupport({
    title,
    className,
    userInfo,
}: {
    title: string;
    className?: string;
    userInfo?: any;
}) {
    return (
        <div className={cn('p-5 @3xl:p-7 bg-white shadow-md rounded-lg', className)}>
            <Title as="h3" className="text-base font-semibold sm:text-lg flex gap-2 items-center">
                <GiMoneyStack size={50} />
                {title}
            </Title>
            <span className="mt-4">{userInfo?.transitionSupport}</span>
        </div>
    );
}

function OpportunitiesCard({
    title,
    className,
    userInfo,
}: {
    title: string;
    className?: string;
    userInfo?: any;
}) {
    return (
        <div className={cn('p-5 @3xl:p-7 bg-white shadow-md rounded-lg', className)}>
            <Title as="h3" className="text-base font-semibold sm:text-lg flex gap-2 items-center">
                <GrBusinessService size={50} />
                {title}
            </Title>
            <ul className="mt-4 grid gap-3 @3xl:mt-5">
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Total area of the property</Helper>
                    <span className="font-semibold text-gray-900">Total Area:</span>
                    </div>
                    <span>{userInfo?.totalArea} sq ft</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Office or apartment area</Helper>
                    <span className="font-semibold text-gray-900">Office/Apt Area:</span>
                    </div>
                    <span>{userInfo?.officeAptArea}</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Retail area of the property</Helper>
                    <span className="font-semibold text-gray-900">Retail Area:</span>
                    </div>
                    <span>{userInfo?.retailArea}</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Industrial area of the property</Helper>
                    <span className="font-semibold text-gray-900">Industrial Area:</span>
                    </div>
                    <span>{userInfo?.industrialArea} sq ft</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Zoning of the property</Helper>
                    <span className="font-semibold text-gray-900">Zoning:</span>
                    </div>
                    <span>{userInfo?.zoning}</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Air conditioning availability</Helper>
                    <span className="font-semibold text-gray-900">A/C:</span>
                    </div>
                    <span>{userInfo?.ac}</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Utilities available</Helper>
                    <span className="font-semibold text-gray-900">Utilities:</span>
                    </div>
                    <span>{userInfo?.utilities}</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Chattels included</Helper>
                    <span className="font-semibold text-gray-900">Chattels:</span>
                    </div>
                    <span>Yes</span>
                </li>
                <li className="flex items-center justify-between  gap-1">
                    <div className="flex items-center gap-1">
                    <Helper width="40">Area influences that drive customers to the business</Helper>
                    <span className="font-semibold text-gray-900">Area Infl:</span>
                    </div>
                    <span>{userInfo?.areaInfl}</span>
                </li>
            </ul>
        </div>
    );
}
