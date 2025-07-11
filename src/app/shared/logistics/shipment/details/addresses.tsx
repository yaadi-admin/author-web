/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import { Text, Title } from 'rizzui';
import cn from '@/utils/class-names';
import { GiStrong } from 'react-icons/gi';
import { GrErase, GrGrow } from 'react-icons/gr';
import { SiCoinmarketcap } from 'react-icons/si';
import { PiUsersFour, PiStorefrontLight, PiChartBar, PiChartScatter } from 'react-icons/pi';
import { Pie, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, PointElement, LinearScale, Title as ChartTitle } from 'chart.js';
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebase from '@/config/firebase.config';

ChartJS.register(ArcElement, Tooltip, Legend, PointElement, LinearScale, ChartTitle);

interface AddressesProps {
  className?: string;
  product: any;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '15px',
};

const defaultCenter = {
  lat: 43.65107,
  lng: -79.347015,
};

const defaultRegionCoordinates = [
  { lat: 43.65107, lng: -79.347015 },
  { lat: 43.65107, lng: -79.337015 },
  { lat: 43.64107, lng: -79.337015 },
  { lat: 43.64107, lng: -79.347015 },
];

async function getCoordinates(address: string): Promise<{ lat: number; lng: number } | null> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
  );
  const data = (await response.json()) as { status: string; results: { geometry: { location: { lat: number; lng: number } } }[] };
  if (data.status === 'OK') {
    const location = data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  }
  return null;
}

async function fetchRiskReturnData() {
  try {
    const querySnapshot = await getDocs(collection(firebase.firestore, 'riskreturn_collection'));
    const data = querySnapshot.docs.map(doc => doc.data());
    return data;
  } catch (error) {
    console.error('Error fetching risk-return data:', error);
    return null;
  }
}

export default function Addresses({ className, product }: AddressesProps) {
  if (!product) {
    return (
      <div className="flex justify-center items-center h-full">
        <Text className="text-red-500">Error loading product details. Please try again later.</Text>
      </div>
    );
  }

  return (
    <div className='mb-12 pb-10 mt-6'>
      <div className={cn('grid gap-6 @2xl:grid-cols-4 @3xl:gap-10 mb-6', className)}>
        <StrengthsCard title="Strengths" userInfo={product} />
        <OpportunitiesCard title="Growth Opportunities" userInfo={product} />
        <MarketProfile title="Customer & Market Profile" userInfo={product} />
        <InvestmentReason title="Investment Reason" userInfo={product} />
      </div>

      <div className={cn('grid gap-6 @2xl:grid-cols-2 @3xl:gap-10 mb-6', className)}>
        <CustomerFeedback title="Location Profile" userInfo={product} />
        <GeographicalRegionMap title="Geographical Region" userInfo={product} />
      </div>

      <div className={cn('grid gap-6 @2xl:grid-cols-2 @3xl:gap-10 mb-6', className)}>
        <RiskReturnScatterPlot title="Risk vs. Return Scatter" />
        <SectorAllocation title="Sector Allocation Chart" userInfo={product} />
      </div>

    </div>
  );
}

function StrengthsCard({
  title,
  className,
  userInfo,
}: {
  title: string;
  className?: string;
  userInfo?: any;
}) {
  return (
    <div className={cn('p-5 @3xl:p-7 bg-white shadow-md border-b border-gray-400 border-1 rounded-lg', className)}>
      <Title as="h3" className="text-base font-semibold sm:text-lg flex gap-2 items-center">
        <GiStrong size={50} />
        {title}
      </Title>
      <ul className="mt-4 grid gap-3 @3xl:mt-5">
        {userInfo?.businessStrengths ? (
          userInfo.businessStrengths.map((item: any, index: number) => (
            <li key={index} className="flex items-center gap-1">
              <span className="font-semibold text-gray-900">• </span>
              <span>{item}</span>
            </li>
          ))
        ) : (
          <Text className="text-red-500">No strengths available.</Text>
        )}
      </ul>
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
    <div className={cn('p-5 @3xl:p-7 bg-white shadow-md border-b border-gray-400 border-1 rounded-lg', className)}>
      <Title as="h3" className="text-base font-semibold sm:text-lg flex gap-2 items-center">
        <GrGrow size={50} />
        {title}
      </Title>
      <ul className="mt-4 grid gap-3 @3xl:mt-5">
        {userInfo?.growthOpportunities ? (
          userInfo.growthOpportunities.map((item: any, index: number) => (
            <li key={index} className="flex items-center gap-1">
              <span className="font-semibold text-gray-900">• </span>
              <span>{item}</span>
            </li>
          ))
        ) : (
          <Text className="text-red-500">No growth opportunities available.</Text>
        )}
      </ul>
    </div>
  );
}

function MarketProfile({
  title,
  className,
  userInfo,
}: {
  title: string;
  className?: string;
  userInfo?: any;
}) {
  return (
    <div className={cn('p-5 @3xl:p-7 bg-white shadow-md border-b border-gray-400 border-1 rounded-lg', className)}>
      <Title as="h3" className="text-base font-semibold sm:text-lg flex gap-2 items-center">
        <PiUsersFour size={50} />
        {title}
      </Title>
      <ul className="mt-4 grid gap-3 @3xl:mt-5">
        {userInfo?.customerProfile ? (
          <li className="flex items-center gap-1">
            <span>{userInfo.customerProfile}</span>
          </li>
        ) : (
          <Text className="text-red-500">No customer profile available.</Text>
        )}
      </ul>
    </div>
  );
}

function CustomerFeedback({
  title,
  className,
  userInfo,
}: {
  title: string;
  className?: string;
  userInfo?: any;
}) {
  return (
    <div className={cn('p-5 @3xl:p-7 bg-white shadow-md border-b border-gray-400 border-1 rounded-lg', className)}>
      <Title as="h3" className="text-base font-semibold sm:text-lg flex gap-2 items-center">
        <PiStorefrontLight size={50} />
        {title}
      </Title>
      <div className="mt-4 grid gap-3 @3xl:mt-5">
        {userInfo?.locationProfile ? (
          <span>{userInfo.locationProfile}</span>
        ) : (
          <Text className="text-red-500">No location profile available.</Text>
        )}
      </div>
    </div>
  );
}

function InvestmentReason({
  title,
  className,
  userInfo,
}: {
  title: string;
  className?: string;
  userInfo?: any;
}) {
  return (
    <div className={cn('p-5 @3xl:p-7 bg-white shadow-md border-b border-gray-400 border-1 rounded-lg', className)}>
      <Title as="h3" className="text-base font-semibold sm:text-lg flex gap-2 items-center">
        <GrErase size={50} />
        {title}
      </Title>
      <div className="mt-4 grid gap-3 @3xl:mt-5">
        {userInfo?.exitReason ? (
          <span>{userInfo.exitReason}</span>
        ) : (
          <Text className="text-gray-700">The business is seeking investment to expand operations and increase market share.</Text>
        )}
      </div>
    </div>
  );
}

function SectorAllocation({
  title,
  className,
  userInfo,
}: {
  title: string;
  className?: string;
  userInfo?: any;
}) {
  const dummyData = {
    labels: ['Mining', 'Oil', 'Renewable Energy', 'Technology', 'Healthcare', 'Finance'],
    datasets: [
      {
        label: 'Sector Allocation',
        data: [20, 15, 25, 10, 20, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const data = userInfo?.sectorData || dummyData;

  return (
    <div className={cn('p-5 @3xl:p-7 bg-white shadow-md border-b border-gray-400 border-1 rounded-lg', className)}>
      <Title as="h3" className="text-base font-semibold sm:text-lg flex gap-2 items-center">
        <PiChartBar size={50} />
        {title}
      </Title>
      <div className="mt-4 grid gap-3 @3xl:mt-5">
        {userInfo?.category ? (
          <Pie data={data} />
        ) : (
          <Text className="text-red-500">No sector allocation data available.</Text>
        )}
      </div>
    </div>
  );
}

function GeographicalRegionMap({
  title,
  className,
  userInfo,
}: {
  title: string;
  className?: string;
  userInfo?: any;
}) {
  const [regionCoordinates, setRegionCoordinates] = useState(defaultRegionCoordinates);
  const [center, setCenter] = useState(defaultCenter);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const address = `${userInfo.streetName}, ${userInfo.city}, ${userInfo.country}`;
      const coordinates = await getCoordinates(address);
      if (coordinates) {
        const newRegionCoordinates = [
          { lat: coordinates.lat + 0.005, lng: coordinates.lng - 0.005 },
          { lat: coordinates.lat + 0.005, lng: coordinates.lng + 0.005 },
          { lat: coordinates.lat - 0.005, lng: coordinates.lng + 0.005 },
          { lat: coordinates.lat - 0.005, lng: coordinates.lng - 0.005 },
        ];
        setRegionCoordinates(newRegionCoordinates);
        setCenter(coordinates);
      }
    };

    fetchCoordinates();
  }, [userInfo]);

  return (
    <div className={cn('p-5 @3xl:p-7 bg-white shadow-md border-b border-gray-400 border-1 rounded-lg', className)}>
      <Title as="h3" className="text-base font-semibold sm:text-lg flex gap-2 items-center">
        <PiChartScatter size={50} />
        {title}
      </Title>
      <div className="mt-4 grid gap-3 @3xl:mt-5">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            options={{
              mapTypeControl: false,
              fullscreenControl: false,
              streetViewControl: false,
            }}
          >
            <Polygon
              paths={regionCoordinates}
              options={{
                fillColor: 'green',
                fillOpacity: 0.4,
                strokeColor: 'green',
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

function RiskReturnScatterPlot({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchRiskReturnData();
      if (fetchedData) {
        setData(fetchedData);
      } else {
        setData([
          { x: 5, y: 10, label: 'Deal 1' },
          { x: 15, y: 20, label: 'Deal 2' },
          { x: 25, y: 30, label: 'Deal 3' },
          { x: 35, y: 40, label: 'Deal 4' },
        ]);
      }
    };

    fetchData();
  }, []);

  const scatterData = {
    datasets: [
      {
        label: 'Risk vs. Return',
        data: data || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        title: {
          display: true,
          text: 'Risk Level',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Expected Return',
        },
      },
    },
  };

  return (
    <div className={cn('p-5 @3xl:p-7 bg-white shadow-md border-b border-gray-400 border-1 rounded-lg', className)}>
      <Title as="h3" className="text-base font-semibold sm:text-lg flex gap-2 items-center">
        <PiChartScatter size={50} />
        {title}
      </Title>
      <div className="mt-4 grid gap-3 @3xl:mt-5">
        <Scatter data={scatterData} options={options} />
      </div>
    </div>
  );
}