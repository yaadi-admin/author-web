'use client';

import React from "react";
import { useRouter } from "next/navigation";

const transitionClasses = 'transition-opacity transition-transform duration-300 ease-in-out';
const containerClasses = `relative ${transitionClasses} w-full`;

export function HeroBanner({ active }: { active: boolean }) {
  const { push } = useRouter();
  
  return (
    <div id="hero-banner" className={`${containerClasses} ${active ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full overflow-hidden rounded-lg">
        {/* Left Grid - Image */}
        <div className="relative h-full">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/dfee8cfc-38ba-4989-a2dc-4db6237f6343_removalai_preview.png?alt=media&token=2595d0d3-fc66-481d-9840-2e9a49090e57"
            alt="SueLyn Empowered Living"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>
        
        {/* Right Grid - Content */}
        <div className="relative h-full flex flex-col justify-center px-12 py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-xl space-y-8">
            {/* Header Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Faith. Healing. Identity. Purpose.
              </h1>
            </div>
            
            {/* Intro Text */}
            <div className="space-y-4">
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                SueLyn Empowered Living is where faith meets personal transformation. Led by Suzanna Griffiths, this space is designed to help men and women heal from emotional wounds, align with God's Word, and walk in their divine purpose - boldly and whole.
              </p>
            </div>
            
            {/* Brand Story Video Placeholder */}
            <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  {/* <p className="text-sm text-gray-600 font-medium">Brand Story Video</p> */}
                  <p className="text-xs text-gray-500">Introducing SueLyn Empowered Living</p>
                </div>
              </div>
            </div>
            
            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => push('/work-with-me')}
                className="bg-green-600 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Work with Suzanna
              </button>
              <button
                onClick={() => push('/get-to-know-me')}
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-full text-base font-semibold hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Explore the Journey
              </button>
              <button
                onClick={() => push('/appointment')}
                className="bg-gray-800 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl"
              >
                Book a Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 