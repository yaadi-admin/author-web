'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Title, Text, Tooltip } from 'rizzui';
import cn from '@/utils/class-names';
import Link from 'next/link';
import { PiStarFill } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { ACTIONS, useAnalytics } from '@/hooks/use-analytics';
import firebase from '@/config/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { MdLightbulb, MdRocketLaunch, MdTrendingUp, MdBusiness, MdOutlineDomain } from 'react-icons/md';

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
      className="inline-flex items-center gap-1 text-sm text-gray-900"
    >
      <PiStarFill className="h-3.5 w-3.5 text-yellow-500" />
      {rating}
      {totalRatings && ` (${totalRatings})`}
    </Text>
  );
}

interface Product {
  id: string;
  title: string;
  screenName?: string;
  thumbnail: string;
  file1?: string;
  tag?: string;
  rating?: number;
  ratingCount?: number;
  askingPrice: string;
  ebitda: string;
  annualCashflow?: string;
  aboutTheBusiness?: string;
  aboutTheCompany?: string;
  businessStrengths?: string[];
  city?: string;
  province?: string;
  streetNumber?: string;
  streetName?: string;
  yearEstablished?: string;
  rosettaOutput?: string;
  isTurnKey?: string;
  freeStanding?: string;
}

type ListingCardProps = {
  product: any;
  user?: any;
  className?: string;
  isPublic?: boolean;
  title?: React.ReactNode;
};

function commafyNumber(numberStr: string) {
  const nextString = numberStr || '';
  return parseFloat(nextString.replace(/[^\d.-]/g, '')).toLocaleString('en-US');
}

// Helper function to get styles based on assessment score
function getAssessmentStyles(score: number | null): React.CSSProperties {
  if (score === null || score === undefined) return {};
  if (score >= 80) {
    // High score: green shades from lighter (80) to darker (100)
    const intensity = (score - 80) / 20; // 0 to 1
    const backgroundColor = intensity < 0.5 ? '#5cb85c' : '#28a745';
    return {
      backgroundColor,
      boxShadow: '0 0 12px 3px rgba(40,167,69,0.8)',
    };
  } else if (score >= 60) {
    // Medium score: yellow shades from 60 (lighter) to 79 (richer)
    const intensity = (score - 60) / 19; // 0 to 1
    const backgroundColor = intensity < 0.5 ? '#ffd966' : '#ffc107';
    return {
      backgroundColor,
      boxShadow: '0 0 12px 3px rgba(255,193,7,0.8)',
    };
  } else {
    // Low score: red gradient from near 60 (lighter red) to low scores (darker red)
    const intensity = (60 - score) / 60; // 0 to 1
    const backgroundColor = intensity < 0.5 ? '#e74c3c' : '#dc3545';
    return {
      backgroundColor,
      boxShadow: '0 0 12px 3px rgba(220,53,69,0.8)',
    };
  }
}

// Converts the raw score into a descriptive category
function assessCategory(score: number | null): string {
  if (score === null || score === undefined) return '';
  if (score >= 80) {
    return 'High';
  } else if (score >= 60) {
    return 'Moderate';
  } else {
    return 'Low';
  }
}

export default function ListingCard({
  product,
  user,
  isPublic,
  className,
  title = product?.title,
}: ListingCardProps) {
  const {
    id,
    screenName,
    thumbnail,
    file1,
    tag,
    rating = "",
    ratingCount = "",
    askingPrice,
    ebitda,
    annualCashflow,
    aboutTheBusiness,
    aboutTheCompany,
    businessStrengths,
    city,
    province,
    streetNumber,
    streetName,
    yearEstablished,
    rosettaOutput,
    isTurnKey,
    freeStanding,
  } = product;
  const { log } = useAnalytics();
  const { push } = useRouter();

  // Use file1 as the primary image if available
  const src = file1 ? file1 : thumbnail;
  const formattedEBITDA = ebitda ? `$${commafyNumber(ebitda)}` : '';
  const formattedAskingPrice = askingPrice ? `$${commafyNumber(askingPrice)}` : '';
  const formattedAnnualCashflow = annualCashflow ? `$${commafyNumber(annualCashflow)}` : '';
  const shortDescription =
    rosettaOutput || aboutTheBusiness || aboutTheCompany || 'No description provided';

  // State to hold assessment data.
  const [assessment, setAssessment] = useState<any>(null);

  // Fetch the assessment document for this listing
  async function fetchAssessmentDocument(listingId: string) {
    try {
      const docRef = doc(firebase.firestore, "business_assessment", listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.error(`No document found in 'business_assessment' with id ${listingId}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching business assessment document:", error);
      return null;
    }
  }

  useEffect(() => {
    if (product?.id) {
      fetchAssessmentDocument(product.id).then((data) => {
        setAssessment(data);
      });
    }
  }, [product?.id]);

  // Inside your ListingCard component, add the helper function:

  function getStageIcon(stage: string) {
      switch (stage) {
        case 'Existence':
          return <MdLightbulb size={30} className="text-blue-500" />;
        case 'Survival':
          return <MdRocketLaunch size={30} className="text-green-500" />;
        case 'Success–Disengagement':
        case 'Success-Disengagement':
          return <MdTrendingUp size={30} className="text-purple-500" />;
        case 'Success–Growth':
        case 'Success-Growth':
          return <MdTrendingUp size={30} className="text-orange-500" />;
        case 'Take-Off':
          return <MdBusiness size={30} className="text-red-500" />;
        case 'Resource Maturity':
          return <MdOutlineDomain size={30} className="text-teal-500" />;
        default:
          return null;
      }
    }

  // Add this helper function to get stage descriptions:
  function getStageDescription(stage: string): string {
    switch (stage) {
      case 'Existence':
        return 'The business is in its very early concept phase.';
      case 'Survival':
        return 'The business has launched and is working to gain traction.';
      case 'Success–Disengagement':
      case 'Success-Disengagement':
        return 'The business is expanding and increasing revenue.';
      case 'Success–Growth':
      case 'Success-Growth':
        return 'The business is well-established and sustaining growth.';
      case 'Take-Off':
        return 'The business is well-established and sustaining growth.';
      case 'Resource Maturity':
        return 'The business is mature with stable operations and market share.';
      default:
        return '';
    }
  }

  return (
    <div
      className={cn(
        'cursor-pointer rounded-lg border bg-white shadow-sm hover:shadow-lg transition duration-200',
        className
      )}
      onClick={() => {
        log(ACTIONS.MARKETPLACE.ITEM_CLICK, { productId: id });
        if (isPublic) {
          push(routes?.marketplace.item(id));
        } else {
          push(routes['business-marketplace'].item(id));
        }
      }}
    >
      {/* Image & Assessment Tag */}
      <div className="relative">
        <div className="relative w-full aspect-video overflow-hidden rounded-t-lg border-t border-r border-gray-800">
          <Image
            src={src || ''}
            alt={screenName || `${title}` || 'Listing'}
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
          {assessment && (
            <span
              className="absolute top-4 right-4 rounded-lg px-3 py-1 text-md font-bold text-white"
              style={getAssessmentStyles(assessment?.assessmentScore)}
            >
              {assessCategory(assessment?.assessmentScore)}
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        {/* Header: Title & Ratings */}
        <div className="flex items-center justify-between">
          <Title
            as="h6"
            className="truncate text-lg font-bold text-gray-700 hover:text-blue-600"
          >
            {title}
          </Title>
          {assessment?.businessStage && (
            <div className="flex items-center gap-1">
              <Tooltip
                content={`${getStageDescription(assessment.businessStage)}`}
                size="lg"
                placement="bottom"
                color="invert"
              >
                <span>{getStageIcon(assessment.businessStage)}</span>
              </Tooltip>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="text-xs font-semibold text-gray-500 mb-2">
          {city && `${city}, `}{province && province}
        </div>

        {/* Investment Details */}
        <div className="grid gap-1">
          <div className="flex justify-between text-gray-500">
            <span className="font-normal text-gray-700">Minimum Investment:</span>
            <span className="font-semibold text-gray-700 text-lg -mt-1">
              ${commafyNumber((Number(askingPrice)).toFixed(2))}
            </span>
          </div>
          <span style={{ fontSize: 11 }} className="font-normal -mt-2 text-gray-700">
            est.{' '}
            <span className="font-semibold text-gray-900">
              {commafyNumber((Number(askingPrice / product?.price?.original) * 100).toFixed(2))}%
            </span>{' '}
            of total{' '}
            <span className="font-semibold text-gray-900">
              {commafyNumber((Number(product?.price?.sale / product?.price?.original) * 100).toFixed(2))}%
            </span>{' '}
            offered
          </span>
        </div>
      </div>
    </div>
  );
}
