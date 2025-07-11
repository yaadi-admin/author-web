'use client';

import React, { useState } from "react";
import { FaCircleArrowRight, FaCircleCheck, FaPhoneFlip, FaCar, FaWrench, FaShieldHalved, FaStar } from 'react-icons/fa6';
import { Modal } from 'rizzui';
import toast from 'react-hot-toast';
import { serverTimestamp } from "firebase/firestore";
import { Service, services } from '@/app/(other-pages)/products/services';

const transitionClasses = 'transition-opacity transition-transform duration-300 ease-in-out';
const containerClasses = `relative ${transitionClasses} w-full`;

export function HeroExperience({ active }: { active: boolean }) {
  // Selected product for popup
  const [selectedProduct, setSelectedProduct] = useState<Service | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  
  // Handle booking button click
  const handleBookNow = (product: any) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  // Experience metrics data
  const experienceMetrics = [
    {
      number: '12+',
      label: 'Years of Experience',
      icon: FaStar
    },
    {
      number: '4',
      label: 'Continents',
      icon: FaCar
    },
    {
      number: '1,500+',
      label: 'Events',
      icon: FaWrench
    },
    {
      number: '100%',
      label: 'Satisfaction',
      icon: FaShieldHalved
    }
  ];

  return (
    <div id="hero-two" className={`${containerClasses} ${active ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10'}`}>
      {/* Experience Strip */}
      <div className="relative h-[300px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/dfee8cfc-38ba-4989-a2dc-4db6237f6343_removalai_preview.png?alt=media&token=2595d0d3-fc66-481d-9840-2e9a49090e57"
            alt="Mystery Mobile Detailing Background"
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 4 Grid Items */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {experienceMetrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <div 
                    key={index}
                    className="flex flex-col items-center justify-center text-center p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="mb-3">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {metric.number}
                    </div>
                    <div className="text-sm md:text-base text-white/90 font-medium">
                      {metric.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 