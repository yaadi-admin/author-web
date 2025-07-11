'use client';

import React from "react";
import { FaStar, FaGlobe, FaUsers, FaHeart } from 'react-icons/fa';

export function HeroExperience({ active }: { active: boolean }) {
  // Experience metrics data for author
  const experienceMetrics = [
    {
      number: '12+',
      label: 'Years of Ministry',
      icon: FaStar
    },
    {
      number: '4',
      label: 'Continents Reached',
      icon: FaGlobe
    },
    {
      number: '1,500+',
      label: 'Lives Transformed',
      icon: FaUsers
    },
    {
      number: '100%',
      label: 'Faith-Driven',
      icon: FaHeart
    }
  ];

  return (
    <div id="hero-experience" className={`relative w-full ${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      {/* Experience Strip */}
      <div className="relative h-[400px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/dfee8cfc-38ba-4989-a2dc-4db6237f6343_removalai_preview.png?alt=media&token=2595d0d3-fc66-481d-9840-2e9a49090e57"
            alt="SueLyn Empowered Living Background"
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                My Journey of Impact
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Over a decade of dedicated ministry, speaking, and writing to help others find their divine purpose.
              </p>
            </div>
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {experienceMetrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <div 
                    key={index}
                    className="flex flex-col items-center justify-center text-center p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="mb-4">
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
    </div>
  );
} 