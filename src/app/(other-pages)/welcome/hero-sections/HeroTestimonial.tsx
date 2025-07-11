'use client';

import React, { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft, FaQuoteLeft, FaStar } from 'react-icons/fa';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Life Coach",
    content: "SueLyn Empowered Living completely transformed my perspective on healing and faith. Suzanna's guidance helped me break free from emotional wounds I'd carried for years. Her approach of combining faith with practical healing techniques is truly life-changing.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Owner",
    content: "I was struggling with finding my purpose and direction in life. Through SueLyn Empowered Living, I discovered how to align my goals with God's plan for me. The transformation has been incredible - I'm now living with confidence and clarity.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Teacher",
    content: "Suzanna's ministry has been a beacon of hope in my darkest moments. Her teachings on walking in divine purpose helped me overcome fear and step into the calling God has for my life. I'm forever grateful for this community.",
    rating: 5
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Pastor",
    content: "As a pastor, I've seen many people struggle with emotional healing. SueLyn Empowered Living provides a unique and effective approach that bridges faith and practical healing. Suzanna's ministry is making a real difference.",
    rating: 5
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Healthcare Worker",
    content: "Working in healthcare during challenging times left me emotionally drained. SueLyn Empowered Living helped me find restoration and strength through faith. I now approach my work with renewed purpose and compassion.",
    rating: 5
  },
  {
    id: 6,
    name: "Robert Williams",
    role: "Retired Military",
    content: "After years of service, I struggled with finding my identity in civilian life. This ministry helped me understand that my service continues through God's plan. I'm now mentoring other veterans with confidence and purpose.",
    rating: 5
  },
  {
    id: 7,
    name: "Jennifer Adams",
    role: "Single Mother",
    content: "Raising children alone was overwhelming until I found SueLyn Empowered Living. Suzanna's teachings on walking boldly in God's purpose gave me the strength to be the mother my children need. This ministry is a blessing.",
    rating: 5
  },
  {
    id: 8,
    name: "Thomas Martinez",
    role: "Student",
    content: "As a young person trying to find my way, this ministry has been invaluable. Learning to align my dreams with God's Word has given me direction and confidence. I'm excited about the future God has planned for me.",
    rating: 5
  }
];

export function HeroTestimonial({ active }: { active: boolean }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonialsPerSlide = 4;
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * testimonialsPerSlide;
    return testimonials.slice(startIndex, startIndex + testimonialsPerSlide);
  };

  return (
    <div id="hero-testimonial" className={`relative w-full ${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 bg-gray-50 py-20`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            RESULTS I'VE HELPED CREATE
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from real people whose lives have been transformed through faith, healing, and purpose.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 group"
          >
            <FaArrowLeft className="text-gray-600 group-hover:text-green-600 text-xl" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 group"
          >
            <FaArrowRight className="text-gray-600 group-hover:text-green-600 text-xl" />
          </button>

          {/* Testimonials Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
            {getCurrentTestimonials().map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <FaQuoteLeft className="text-green-600 text-2xl" />
                </div>

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-green-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Utility Classes */}
      <style>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
} 