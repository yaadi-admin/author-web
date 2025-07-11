'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { FaPlay, FaArrowRight, FaCalendarAlt, FaUser } from 'react-icons/fa';

export function HeroBanner({ active }: { active: boolean }) {
  const { push } = useRouter();
  
  return (
    <div id="hero-banner" className={`relative w-full ${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <div className="min-h-full h-[900px] flex items-center mt-[0%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full w-full">
          {/* Left Side - Image */}
          <div className="relative h-full min-h-[300px] lg:min-h-[300px] flex items-center">
            <div className="relative w-full h-full">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/dfee8cfc-38ba-4989-a2dc-4db6237f6343_removalai_preview.png?alt=media&token=2595d0d3-fc66-481d-9840-2e9a49090e57"
                alt="SueLyn Empowered Living"
                className="w-full h-full object-contain rounded-tr-[3rem] rounded-br-[3rem]"
              />
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 rounded-tr-[3rem] rounded-br-[3rem]"></div>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className="relative flex flex-col justify-center px-2 py-12 lg:px-16 bg-white">
            <div className="max-w-xl space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                  Faith. Healing. Identity. Purpose.
                </h1>
                <div className="w-20 h-1.5 bg-green-600 rounded-full shadow-sm"></div>
              </div>
              
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium">
                  SueLyn Empowered Living is where faith meets personal transformation. Led by Suzanna Griffiths, this space is designed to help men and women heal from emotional wounds, align with God's Word, and walk in their divine purpose - boldly and whole.
                </p>
              </div>
              
              {/* Video Placeholder */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden aspect-video shadow-lg border border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto hover:bg-green-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105">
                      <FaPlay className="w-8 h-8 text-white ml-1" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-base text-gray-800 font-semibold">Watch Our Story</p>
                      <p className="text-sm text-gray-600">Discover the journey of transformation</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Call-to-Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <button
                  onClick={() => push('/work-with-me')}
                  className="group relative flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-green-700 text-white px-6 py-6 rounded-2xl text-sm font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.03] border-0 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <FaUser className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-base">Work with Suzanna</div>
                      <div className="text-xs text-green-100 mt-1">Personal Guidance</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => push('/get-to-know-me')}
                  className="group relative flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50 text-green-600 border-2 border-green-600 px-6 py-6 rounded-2xl text-sm font-semibold hover:from-green-50 hover:to-green-100 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.03] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 bg-green-600/10 rounded-full flex items-center justify-center">
                      <FaArrowRight className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-base">Explore the Journey</div>
                      <div className="text-xs text-green-700 mt-1">Discover More</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => push('/appointment')}
                  className="group relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6 py-6 rounded-2xl text-sm font-semibold hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.03] border-0 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <FaCalendarAlt className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-base">Book a Session</div>
                      <div className="text-xs text-gray-300 mt-1">Schedule Now</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 