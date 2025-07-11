'use client';

import React from 'react';
import { Text, Loader } from 'rizzui';
import Helper from '@/components/ui/Helper';
import cn from '@/utils/class-names';
import {
  PiBankBold,
  PiBrain,
  PiDiamondBold,
  PiFolderBold,
  PiHouseBold,
  PiKeyBold,
  PiStackSimple,
  PiUsersBold,
  PiVisorThin,
} from 'react-icons/pi';
import { useAnalytics } from '@/hooks/use-analytics';

interface AddressesProps {
  className?: string;
  product: any;
  assessment: any;
}

export default function FinancialDetails({ className, product, assessment }: AddressesProps) {
  if (!product) {
    return (
      <div className="flex justify-center items-center h-full">
        <Text className="text-red-500">
          Error loading financial details. Please try again later.
        </Text>
      </div>
    );
  }

  return (
    <>
      <div className={cn('4xs:flex-col 4xs:grid-cols-1 lg:flex lg:flex-row lg:grid-cols-2 gap-2', className)}>
        <AddressCardSectionTwo
          title="Opportunities"
          userInfo={product}
          id={product.id}
          assessment={assessment}
        />
        <AddressCard
          title="Strengths"
          className="grid gap-1 shadow-lg shadow-black-500/50"
          userInfo={product}
        />
      </div>
      <div className={cn('4xs:flex-col 4xs:grid-cols-1 lg:flex lg:flex-row lg:grid-cols-2 gap-2', className)}>
        {/* New section for Market Data */}
        <MarketDataSection marketData={assessment?.marketData} />
      </div>
    </>
  );
}

function commafyNumber(numberStr: string) {
  const nextString = numberStr || '';
  return parseFloat(nextString.replace(/[^\d.-]/g, '')).toLocaleString('en-US');
}

// Modified InfoListItem: icon is optional.
function InfoListItem({
  condition,
  Icon,
  title,
  caption,
  description,
}: {
  condition: boolean;
  Icon?: React.ElementType;
  title: string;
  caption?: string;
  description: string;
}) {
  if (!condition) return null;
  return (
    <li className="flex items-center gap-2">
      {Icon && <Icon size={30} />}
      <div className="flex flex-col">
        <div className="flex">
          {!Icon && <span className="font-semibold text-gray-900">{title}</span>}
          {Icon && <span className="font-semibold text-gray-900 ml-4">{title}</span>}
          {caption && (
            <span className="font-normal text-gray-700 ml-2" style={{ fontSize: 13 }}>
              {caption}
            </span>
          )}
        </div>
        <span className="font-normal text-gray-900 ml-12" style={{ fontSize: 13 }}>
          {description}
        </span>
      </div>
    </li>
  );
}

// New component to render a group of assessment items.
function AssessmentGroup({
  groupTitle,
  data,
  fields,
}: {
  groupTitle: string;
  data: any;
  fields: { [label: string]: string };
}) {
  if (!data) return null;
  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">{groupTitle}</h4>
      <ul className="ml-4 space-y-1 text-sm">
        {Object.entries(fields).map(([label, key]) => (
          <InfoListItem
            key={key}
            Icon={PiKeyBold}
            condition={data[key] != null}
            title={label}
            description={data[key]}
          />
        ))}
      </ul>
    </div>
  );
}

function AddressCard({
  title,
  className,
  userInfo,
}: {
  title: string;
  className?: string;
  userInfo?: any;
}) {
  return (
    <div
      className={cn('rounded-lg border border-gray-300 p-4 4xs:w-full lg:w-2/5', className)}
      style={{ height: 420 }}
    >
      <div className="w-full">
        <ul className="mt-1 grid gap-4">
          <h4 className="-mb-3">Financial Summary</h4>
          <span className="border-b border-gray-400" />
          <li className="flex items-center gap-1">
            <Helper>
              Earnings Before Interest, Taxes, Depreciation, and Amortization
            </Helper>
            <span className="font-semibold text-gray-900">EBITDA:</span>
            <Text className="ml-auto text-sm text-gray-900">
              ${commafyNumber(userInfo?.ebitda)}
            </Text>
          </li>
          <li className="flex items-center gap-1">
            <Helper>
              A valuation metric used to compare the value of a company, including debt,
              to the company&apos;s cash earnings less non-cash expenses.
            </Helper>
            <span className="font-semibold text-gray-900">EBITDA Multiple:</span>
            <Text className="ml-auto text-sm text-gray-900">
              {Number(userInfo?.askingPrice / userInfo?.ebitda).toFixed(1)}x
            </Text>
          </li>
          <li className="flex items-center gap-1">
            <Helper>
              The total amount of money being transferred into and out of a business.
            </Helper>
            <span className="font-semibold text-gray-900">Cash Flow:</span>
            <Text className="ml-auto text-sm text-gray-900">
              ${commafyNumber(userInfo?.annualCashflow)}
            </Text>
          </li>
          <li className="flex items-center gap-1">
            <Helper>
              The total income generated by the sale of goods or services.
            </Helper>
            <span className="font-semibold text-gray-900">Revenue:</span>
            <Text className="ml-auto text-sm text-gray-900">
              ${commafyNumber(userInfo?.annualRevenue)}
            </Text>
          </li>
          <li className="flex items-center gap-1">
            <Helper>
              A valuation method comparing enterprise value to revenue.
            </Helper>
            <span className="font-semibold text-gray-900">Revenue Multiple:</span>
            <Text className="ml-auto text-sm text-gray-900">
              {Number(userInfo?.askingPrice / userInfo?.annualRevenue).toFixed(1)}x
            </Text>
          </li>
          <li className="flex items-center gap-1">
            <Helper>
              The total sales generated by the business over a specific period.
            </Helper>
            <span className="font-semibold text-gray-900">Run Rate Sales:</span>
            <Text className="ml-auto text-sm text-gray-900">
              ${userInfo?.runRateSales ? commafyNumber(userInfo?.runRateSales) : 0}
            </Text>
          </li>
          <li className="flex items-center gap-1">
            <Helper>
              The maximum percentage of the business that the seller is willing to sell.
            </Helper>
            <span className="font-semibold text-gray-900">Max Offer:</span>
            <Text className="ml-auto text-sm text-gray-900">
              {commafyNumber((Number(userInfo?.price?.sale / userInfo?.price?.original) * 100).toFixed(2))}%
            </Text>
          </li>
          <span className="border-b border-gray-400" />
          <li className="flex items-center gap-4">
            <Helper>
              The minimum investment required to gain a stake in the business.
            </Helper>
            <div className="grid gap-1">
              <span className="font-semibold text-gray-900">Minimum Investment:</span>
              <span style={{ fontSize: 11 }} className="font-normal -mt-2 text-gray-700">
                est. <span className="font-semibold text-gray-900">
                  {commafyNumber((Number(userInfo?.askingPrice / userInfo?.price?.original) * 100).toFixed(2))}%
                </span> of total{' '}
                <span className="font-semibold text-gray-900">
                  {commafyNumber((Number(userInfo?.price?.sale / userInfo?.price?.original) * 100).toFixed(2))}%
                </span> offered
              </span>
            </div>
            <Text className="ml-auto text-xl font-bold">
              ${commafyNumber(Number(userInfo?.askingPrice).toString())}
            </Text>
          </li>
          <span className="border-b border-gray-400" />
        </ul>
      </div>
    </div>
  );
}

function AddressCardSectionTwo({
  title: _title,
  className,
  userInfo: _userInfo,
  id,
  assessment,
}: {
  title: string;
  className?: string;
  userInfo?: any;
  id: string;
  assessment?: any;
}) {
  const { getProductInterests, getProductView, getCategory } = useAnalytics();
  const [interestCount, setInterestCount] = React.useState(0);
  const [viewCount, setViewCount] = React.useState(0);

  function getBusinessStageIcon(stage: string) {
    switch (stage) {
      case 'Existence':
        return <PiFolderBold size={30} className="text-blue-500" />;
      case 'Survival':
        return <PiHouseBold size={30} className="text-green-500" />;
      case 'Success–Disengagement':
      case 'Success-Disengagement':
        return <PiBrain size={30} className="text-purple-500" />;
      case 'Success–Growth':
      case 'Success-Growth':
        return <PiStackSimple size={30} className="text-orange-500" />;
      case 'Take-Off':
        return <PiUsersBold size={30} className="text-red-500" />;
      case 'Resource Maturity':
        return <PiVisorThin size={30} className="text-teal-500" />;
      default:
        return null;
    }
  }

  React.useEffect(() => {
    async function getProdView() {
      try {
        const count = await getProductView(id);
        setViewCount(count);
      } catch (error) {
        console.error('Error fetching product views:', error);
      }
    }
    async function getProdInterest() {
      try {
        const count = await getProductInterests(id);
        setInterestCount(count);
      } catch (error) {
        console.error('Error fetching product interests:', error);
      }
    }
    if (id) {
      getProdView();
      getProdInterest();
    }
  }, [id, getProductView, getProductInterests]);
  

  return (
    <div className={cn('rounded-lg p-5 pt-3 4xs:w-full lg:w-3/5', className)}>
      <div className="rounded-lg border items-center pl-2 h-20 flex gap-4 mb-4">
        <div className="flex items-center gap-2 pl-2">
          <div>{getBusinessStageIcon(assessment?.businessStage)}</div>
          <div className="items-center">
            <Text className="font-medium text-center">Business Stage: </Text>
          </div>
          <Text className="text-xl font-medium text-center">
            {assessment?.businessStage}
          </Text>
        </div>
      </div>
      {/* Assessment Details Section */}
      {assessment && (
        <ul className="mt-4">
          {/* Group 2: Owner Factors */}
          <div className='pb-4'>
          <InfoListItem
            condition={true}
            Icon={PiUsersBold}
            title={"Owner Involvement:"}
            caption={assessment?.ownerFactors?.ownerInvolvement}
            description="High / Medium / Low"
          />
          </div>
          <div className='pb-4'>
          <InfoListItem
            condition={true}
            Icon={PiStackSimple}
            title={"Delegation Ability:"}
            caption={assessment?.ownerFactors?.delegationAbility}
            description="The capacity and willingness to delegate and manage a growing team."
          />
          </div>
          <div className='pb-4'>
          <InfoListItem
            condition={true}
            Icon={PiBrain}
            title={"Operational Competence:"}
            caption={assessment?.ownerFactors?.operationalCompetence}
            description="The owner’s ability to perform critical tasks (e.g., marketing, production, innovation)."
          />
          </div>
          <div className='pb-4'>
          <InfoListItem
            condition={true}
            Icon={PiVisorThin}
            title={"Strategic Vision:"}
            caption={assessment?.ownerFactors?.strategicVision}
            description="The owner’s aptitude for planning beyond the present and aligning the company’s strengths with future opportunities."
          />
          </div>
        </ul>
      )}
    </div>
  );
}


function MarketDataSection({ marketData }: { marketData: any }) {
  if (!marketData) return null;
  const cards = [
    {
      title: 'Industry Trends',
      value: marketData.industryTrends,
      Icon: PiDiamondBold,
    },
    {
      title: 'Regional Economic Indicators',
      value: marketData.regionalEconomicIndicators,
      Icon: PiHouseBold,
    },
    {
      title: 'Competitive Landscape',
      value: marketData.competitiveLandscape,
      Icon: PiFolderBold,
    },
  ];
  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-2">Market Data</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.title} className="border rounded-lg p-4 flex flex-col items-center shadow-sm">
            <card.Icon className="text-blue-500 mb-2" size={32} />
            <h5 className="font-bold mb-1">{card.title}</h5>
            <p className="text-sm text-gray-700 text-center">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SVGLoaderListing({ fileName }: { fileName: string }) {
  const SvgComponent = React.lazy(() => import(`../../../../../components/icons/${fileName}`));
  return (
    <React.Suspense fallback={<Loader variant="spinner" />}>
      <SvgComponent />
    </React.Suspense>
  );
}