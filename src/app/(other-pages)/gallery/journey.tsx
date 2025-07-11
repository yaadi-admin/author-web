/* eslint-disable @next/next/no-img-element */
'use client';

import ArrowShape from '@/components/shape/arrow';
import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

// Define the types for the props
interface InfoCardProps {
  index: number;
  title: string;
  description: string;
  image: string; // Add image prop
  extraInfo: string; // Additional text to show on hover
  isHovered: boolean;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

// Data for the content cards
const contentData = [
  {
    title: "Exploration & Matching",
    description: "Browse a curated marketplace of businesses seeking investment.",
    image: "https://img.icons8.com/plasticine/400/online-store.png",
    extraInfo: "Use AI-driven matching to connect with opportunities that align with your investment goals."
  },
  {
    icon: 'spacer',
  },
  {
    title: "Due Diligence & Insights",
    description: "Access detailed business profiles, financials, and market data.",
    image: "https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/400/external-Growth-business-smashingstocks-isometric-smashing-stocks-7.png",
    extraInfo: "Leverage platform tools for AI-driven analysis, risk assessment, and direct engagement with business owners."
  },
  {
    icon: 'spacer',
  },
  {
    title: "Negotiation & Safe Transactions",
    description: "Negotiate terms through integrated communication tools, finalize agreements with digital contracts",
    image: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/400/external-contract-job-search-flaticons-lineal-color-flat-icons-3.png",
    extraInfo: "and execute transactions securely within the platform."
  },
  {
    icon: 'spacer',
  },
  {
    title: "Ownership & Growth Monitoring",
    description: "Track your investments, receive performance updates, and leverage platform analytics",
    image: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/400/external-identity-traditional-marketing-flaticons-lineal-color-flat-icons.png",
    extraInfo: "to optimize returns or explore exit strategies when ready."
  },
];

// InfoCard Component with TypeScript props
const InfoCard = ({
  index,
  title,
  description,
  image,
  extraInfo,
  isHovered,
  onMouseEnter,
  onMouseLeave
}: InfoCardProps) => (
  <div
    className={`relative w-full md:w-92 bg-white p-4 md:p-6 mb-4 mx-4 rounded-lg shadow-md text-center transition-all duration-500 ease-in-out ${isHovered ? 'scale-105' : ''}`}
    onMouseEnter={() => onMouseEnter(index)}
    onMouseLeave={onMouseLeave}
    onClick={() => onMouseEnter(index)}
  >
    {/* Content Container */}
    <div className="relative transition-opacity duration-300 ease-in-out opacity-100 ">
      <h3 className="text-xl font-medium mb-2 text-gray-600">
        {title}
      </h3>
      <p className="mb-2 text-gray-500 text-medium ">
        {description}
      </p>
      <IoIosArrowDown className={`mt-6 mx-auto h-6 w-6 ${!isHovered ? 'opacity-100 max-h-60 mt-4' : 'opacity-0 max-h-0'}`} />
    </div>

    {/* Image that appears on hover */}
    <div
      className={`transition-all duration-500 ease-in-out ${isHovered ? 'opacity-100 max-h-60 mt-4' : 'opacity-0 max-h-0'}`}
      style={{ overflow: 'hidden' }}
    >
      <img
        src={image}
        alt={title}
        className="w-full object-cover rounded-lg mb-2"
      />
    </div>

    {/* Additional info that appears on hover */}
    <div
      className={`transition-all duration-500 ease-in-out ${isHovered ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
      style={{ overflow: 'hidden' }}
    >
      <p>{extraInfo}</p>

    </div>
  </div>
);

// Journey Component
const Journey = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    if (index === hoveredIndex) {
      setHoveredIndex(null)
    } else {
      setHoveredIndex(index);
    }
  }

  const handleMouseLeave = () => setHoveredIndex(null);

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(to bottom,rgb(255, 255, 255) 50%, rgb(1, 139, 102) 90%)', // Diagonal split background
      }}
      className="grow items-center 4xs:pt-10 sm:pt-16 md:pt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 mt-20">
        <div className="w-full text-left">
          <div className="w-[218px] text-[#0a0a19] text-[13px] font-medium font-['Plus Jakarta Sans'] uppercase leading-[18px] tracking-wide mb-4">
            We Span the End-to-End Journey
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row md:justify-between items-start mb-20">
          <div className="w-full md:w-[607px]
          text-[#0a0a19]
          4xs:text-[38px]
          md:text-[57px]
          font-bold font-['Plus Jakarta Sans']
          4xs:leading-[43px]
          md:leading-[61.90px]
          mb-4 md:mb-0 text-left">
            End-to-End Journey
          </div>
        </div>

        <div className='4xs:flex-row 4xs:flex md:flex md:flex-col'>

          <div className="4xs:flex-col md:w-[100%] md:mx-auto md:flex md:flex-row
justify-center p-1 md:p-8 pt-8 mb-1 text-center">

            {/* Cards */}
            {contentData.map((item, index) => {
              if (item?.icon) {
                return <div key={index} className='4xs:hidden md:flex m-0 -mt-8 -mr-8'>
                  <ArrowShape className="h-12 w-50 z-10" />
                </div>;
              }
              return (
                <div key={index} className="4xs:w-full">
                  <InfoCard
                    index={index}
                    title={item.title || ''}
                    description={item.description || ''}
                    image={item.image || ''}
                    extraInfo={item.extraInfo || ''}
                    isHovered={hoveredIndex === index}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
