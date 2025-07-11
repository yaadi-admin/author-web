'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { services } from '@/app/(other-pages)/products/services';

const transitionClasses = 'transition-opacity transition-transform duration-300 ease-in-out';
const containerClasses = `relative ${transitionClasses} w-full`;

export function HeroBanner({ active }: { active: boolean }) {
  const { push } = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get featured services for the banner
  const bannerServices = services.filter(service => 
    service.category === 'basic' || 
    service.category === 'interior' || 
    service.category === 'premium'
  ).slice(0, 3);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerServices.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerServices.length) % bannerServices.length);
  };
  
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div id="hero-banner" className={`${containerClasses} ${active ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10'}`}>
      <div className="relative h-[500px] overflow-hidden rounded-lg">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={bannerServices[currentSlide]?.image || 'https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D'}
            alt={bannerServices[currentSlide]?.name || 'Car Detailing'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-12 ml-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {bannerServices[currentSlide]?.name || 'Professional Mobile Detailing'}
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-xl">
              {bannerServices[currentSlide]?.description || 'Experience the best in mobile car detailing services'}
            </p>
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => push('/products')}
                className="bg-green-800/95 text-white px-8 py-3 rounded-full text-base font-medium hover:bg-green-800/95/90 transition-colors"
              >
                View All Services
              </button>
              <button
                onClick={() => window.location.href = 'tel:+16477063728'}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full text-base font-medium hover:bg-white/20 transition-colors"
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {bannerServices.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 