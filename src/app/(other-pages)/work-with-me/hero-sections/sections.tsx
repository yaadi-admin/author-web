'use client';

import React, { useMemo, useState, useEffect } from "react";
import firebase from "@/config/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from 'react-hot-toast';
import { getDocs } from "firebase/firestore";
import { FaApplePay, FaCcMastercard, FaCcStripe, FaCcVisa, FaCheck, FaGooglePay } from 'react-icons/fa';
import { FaCircleCheck, FaPhoneFlip } from "react-icons/fa6";
import { FaCircleArrowRight } from 'react-icons/fa6';
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { CateringOptions } from '@/app/(other-pages)/products/cateringOptions';
import { Modal } from 'rizzui';
import axios from "axios";
import { Resend } from 'resend';
import { services, Service, getFeaturedServices } from '@/app/(other-pages)/products/services';

// const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const transitionClasses = 'transition-opacity transition-transform duration-300 ease-in-out';
const containerClasses = `relative ${transitionClasses} w-full`;


export function HeroBanner({ active }: any) {
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
      <div className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={bannerServices[currentSlide]?.image || 'https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D'}
            alt={bannerServices[currentSlide]?.name || 'Car Detailing'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {bannerServices[currentSlide]?.name || 'Professional Mobile Detailing'}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8">
              {bannerServices[currentSlide]?.description || 'Experience the best in mobile car detailing services'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => push('/products')}
                className="bg-green-800/95 text-white px-8 py-3 rounded-full font-medium hover:bg-green-800/95/90 transition-colors"
              >
                View All Services
              </button>
              <button
                onClick={() => window.location.href = 'tel:+16477063728'}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-colors"
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {bannerServices.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroOne({ active, }: any) {
  const { push } = useRouter();

  return (
    <div id="hero-one" className={`${containerClasses} ${active ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10'} h-screen`}>
      <div className="flex flex-col lg:flex-row items-center h-full overflow-hidden">
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12 lg:h-full relative z-10">
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm -z-10"></div>
          
          <div className="inline-block border border-green-800/95 text-green-800/95 px-4 py-2 rounded-full text-sm font-medium mb-8">
            Premium Mobile Detailing
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-black leading-tight">
            <span className="block font-light">Make Your Event</span>
            <span className="block text-green-800/95 mt-2">Unforgettable</span>
          </h1>
          
          <p className="text-base sm:text-lg text-gray-700 mt-6 mb-8 leading-relaxed max-w-xl">
            At Mystery Mobile Detailing, we offer premium mobile detailing services for your next event with reliable delivery and professional setup to create lasting memories.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              className="bg-black hover:bg-green-800/95 text-white font-medium rounded-full px-8 py-4 min-h-[56px] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
              onClick={() => push(routes.products)}
            >
              <span>Book Now</span> 
              <FaCircleArrowRight className="ml-2 w-4 h-4" />
            </button>
            
            <button 
              className="bg-transparent border border-black text-black font-medium rounded-full px-8 py-4 min-h-[56px] transition-all duration-300 hover:bg-black/5"
            >
              View Selection
            </button>
          </div>
          
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center">
              <FaCircleCheck className="text-green-800/95 mr-2" />
              <span className="text-gray-700">Reliable Delivery</span>
            </div>
            <div className="flex items-center">
              <FaCircleCheck className="text-green-800/95 mr-2" />
              <span className="text-gray-700">Professional Setup</span>
            </div>
            <div className="flex items-center">
              <FaCircleCheck className="text-green-800/95 mr-2" />
              <span className="text-gray-700">Safety Certified</span>
            </div>
          </div>
        </div>
        
        <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"></div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/megabounceent.firebasestorage.app/o/IMG_D6CA0691CC11-1.jpeg?alt=media&token=36448eea-2ed6-44d5-9064-4845bf8f5825"
            alt="High-quality mobile detailing for events"
            className="object-cover w-full h-full"
          />
          
          <div className="absolute bottom-10 right-10 max-w-xs bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/50 z-20">
            <p className="font-bold text-xl text-black">All-Inclusive Service</p>
            <p className="text-sm text-gray-700 mt-1">Delivery, setup, and pick-up included</p>
            <div className="flex items-center mt-3">
              <span className="font-bold text-2xl text-green-800/95 mr-2">From $99</span>
              <span className="border border-black text-black text-xs px-2 py-1 rounded-full">
                Best Value
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroPanel({ active }: any) {
  const { push } = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [activePanel, setActivePanel] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Service | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  
  const featuredServices = getFeaturedServices();
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handlePanelInteraction = (index: number) => {
    setActivePanel(index);
  };
  
  const handlePanelLeave = () => {
    setActivePanel(null);
  };
  
  const handlePanelClick = (service: Service, index: number) => {
    setSelectedProduct(service);
    setShowPopup(true);
  };
  
  // Booking form component (popup)
  const ProductPopup = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      address: '',
      vehicleType: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      additionalServices: {
        petHairRemoval: false,
        headlightCleaning: false,
        engineDetail: false,
        ceramicCoating: false
      },
      specialInstructions: '',
      productId: selectedProduct?.id
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.date) newErrors.date = 'Date is required';
      if (!formData.time) newErrors.time = 'Time is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
      if (!formData.vehicleMake) newErrors.vehicleMake = 'Vehicle make is required';
      if (!formData.vehicleModel) newErrors.vehicleModel = 'Vehicle model is required';
      if (!formData.vehicleYear) newErrors.vehicleYear = 'Vehicle year is required';
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      // Clear error when field is modified
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    };

    const handleAdditionalServiceChange = (service: string) => {
      setFormData(prev => ({
        ...prev,
        additionalServices: {
          ...prev.additionalServices,
          [service]: !prev.additionalServices[service as keyof typeof prev.additionalServices]
        }
      }));
    };

    const handleSubmit = async () => {
      if (!validateForm()) {
        toast.error('Please fill in all required fields');
        return;
      }

      try {
        const bookingData = {
          ...formData,
          totalPrice: calculateTotal(),
          timestamp: serverTimestamp(),
          status: 'pending'
        };

        // const response = await resend.emails.send({
        //   from: 'Mystery Mobile Detailing <dabconsultingfirm.com>',
        //   to: 'yaadiltd@gmail.com',
        //   subject: 'Booking Request',
        //   html: `<p>Congrats on sending your <strong>first email</strong>!</p>`,
        // });

        toast.success('Booking request submitted successfully!');
        setShowPopup(false);
      } catch (error) {
        console.error('Error submitting booking:', error);
        toast.error('Failed to submit booking. Please try again.');
      }
    };

    const calculateTotal = () => {
      let total = selectedProduct?.price || 0;
      
      if (formData.additionalServices.petHairRemoval) total += 50;
      if (formData.additionalServices.headlightCleaning) total += 50;
      if (formData.additionalServices.engineDetail) total += 45;
      if (formData.additionalServices.ceramicCoating) total += 275;
      
      return total;
    };
    
    return (
      <Modal
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        size="xl"
        className="[&_.rizzui-modal-content]:p-0"
      >
        <div className="flex flex-col h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Book {selectedProduct?.name}</h2>
            <button 
              onClick={() => setShowPopup(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex">
              {/* Product Details */}
              <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
                <div className="relative h-64 mb-6 rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={selectedProduct?.image} 
                    alt={selectedProduct?.name} 
                    className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct?.name}</h3>
                <p className="text-green-800/95 font-bold text-lg mb-4">{selectedProduct?.priceDisplay}</p>

                <p className="text-gray-700 text-sm mb-4">{selectedProduct?.description}</p>
                
                {selectedProduct?.features && (
                  <div className="space-y-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-medium mb-2">Service Includes:</h4>
                    <ul className="space-y-1">
                      {selectedProduct.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <FaCircleCheck className="text-green-800/95 mr-2 w-4 h-4" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Booking Form */}
              <div className="w-1/2 p-6 overflow-y-auto">
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Your Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                        errors.name ? 'border-red-500' : 'border-black/10'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Email*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.email ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Phone*</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.phone ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Vehicle Type*</label>
                      <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.vehicleType ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      >
                        <option value="">Select Vehicle Type</option>
                        <option value="car">Car</option>
                        <option value="suv">SUV</option>
                        <option value="truck">Truck</option>
                        <option value="van">Van</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.vehicleType && <p className="text-red-500 text-sm mt-1">{errors.vehicleType}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Vehicle Make*</label>
                      <input
                        type="text"
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.vehicleMake ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.vehicleMake && <p className="text-red-500 text-sm mt-1">{errors.vehicleMake}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Vehicle Model*</label>
                      <input
                        type="text"
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.vehicleModel ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.vehicleModel && <p className="text-red-500 text-sm mt-1">{errors.vehicleModel}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Vehicle Year*</label>
                      <input
                        type="text"
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.vehicleYear ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.vehicleYear && <p className="text-red-500 text-sm mt-1">{errors.vehicleYear}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Service Date*</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.date ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Preferred Time*</label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.time ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Service Address*</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                        errors.address ? 'border-red-500' : 'border-black/10'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-3">Additional Services</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.additionalServices.petHairRemoval}
                          onChange={() => handleAdditionalServiceChange('petHairRemoval')}
                          className="w-4 h-4 text-green-800/95 border-gray-300 rounded focus:ring-green-800/95"
                        />
                        <span className="text-gray-700">Pet Hair Removal (+$50)</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.additionalServices.headlightCleaning}
                          onChange={() => handleAdditionalServiceChange('headlightCleaning')}
                          className="w-4 h-4 text-green-800/95 border-gray-300 rounded focus:ring-green-800/95"
                        />
                        <span className="text-gray-700">Headlight Cleaning (+$50)</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.additionalServices.engineDetail}
                          onChange={() => handleAdditionalServiceChange('engineDetail')}
                          className="w-4 h-4 text-green-800/95 border-gray-300 rounded focus:ring-green-800/95"
                        />
                        <span className="text-gray-700">Engine Detail (+$45)</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.additionalServices.ceramicCoating}
                          onChange={() => handleAdditionalServiceChange('ceramicCoating')}
                          className="w-4 h-4 text-green-800/95 border-gray-300 rounded focus:ring-green-800/95"
                        />
                        <span className="text-gray-700">Ceramic Coating (+$275)</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Special Instructions</label>
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300 resize-none"
                      placeholder="Any specific requirements or concerns..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-green-800/95 text-white font-medium py-3 rounded-full transition-all duration-300 mt-4"
                  >
                    Submit Booking Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div 
      id="hero-panel" 
      className={`${containerClasses} ${active ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10'} 
                 xs:h-screen overflow-hidden`}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-black/5 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-black/5 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-black/5 opacity-10 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-black/5 opacity-10 blur-3xl animate-float-delayed"></div>
      </div>
      
      {/* Title header - Fixed positioning to prevent overlap */}
      <div className="absolute top-0 left-0 w-full p-4 xs:p-5 sm:p-8 md:p-10 z-40 pointer-events-none">
        <div className="max-w-12xl mx-auto">
          <span className="inline-block border border-black/10 text-black px-3 py-1 text-xs rounded-full mb-2 md:mb-3 backdrop-blur-sm bg-white/30">
            Premium Selection
          </span>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-black tracking-wide">
            <span className="font-medium">Discover</span> our premium selection of
            <span className="text-green-800/95 font-medium"> detailing services</span>
          </h2>
          <p className="mt-2 md:mt-3 text-sm xs:text-base text-gray-700 max-w-lg backdrop-blur-sm bg-white/30 inline-block p-2 rounded-lg">
            Click on any category below to explore our high-quality detailing services
          </p>
        </div>
      </div>
      
      {/* Mobile panels (vertical stack) - Increased top margin to prevent overlap */}
      <div className="md:hidden flex flex-col h-full mt-36 xs:mt-40 sm:mt-44 gap-3 px-3 xs:px-4 pb-5 overflow-y-auto">
        {featuredServices.map((service, index) => (
          <div 
            key={service.id}
            className={`relative transition-all duration-500 ease-in-out overflow-hidden rounded-xl shadow-lg
                       ${activePanel === index 
                          ? 'flex-[5] min-h-[220px] xs:min-h-[260px]' 
                          : 'flex-[1] min-h-[80px] xs:min-h-[90px]'}`}
            onClick={() => handlePanelInteraction(index)}
          >
            {/* Background image with enhanced overlay */}
            <div className="absolute inset-0 w-full h-full">
              <div className={`absolute inset-0 bg-gradient-to-t 
                              ${activePanel === index 
                                ? 'from-black/80 via-black/40 to-black/10' 
                                : 'from-black/70 to-black/40'} 
                              z-10 transition-opacity duration-500`}></div>
              <img 
                src={service.image}
                alt={service.name}
                className={`w-full h-full object-cover transition-all duration-700
                          ${activePanel === index ? 'scale-110' : 'scale-100 brightness-90'}`}
              />
            </div>
            
            {/* Title visible at all times (when panel is collapsed) */}
            <div className={`absolute inset-0 p-4 z-20 flex 
                           ${activePanel === index 
                              ? 'opacity-0' 
                              : 'items-center justify-center opacity-100'}`}>
              <h3 className="text-white font-bold text-xl xs:text-2xl text-center">
                {service.name}
              </h3>
            </div>
            
            {/* Expanded content when panel is active - Better positioning */}
            <div className={`absolute inset-0 p-5 xs:p-6 z-20 flex flex-col justify-end transition-all duration-500
                           ${activePanel === index ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <div>
                <span className="inline-block border border-white/30 text-white/90 px-3 py-1 text-xs rounded-full mb-2 xs:mb-3">
                  {service.description}
                </span>
                <h3 className="text-white font-bold text-2xl xs:text-3xl mb-2">
                  {service.name}
                </h3>
                <p className="text-white/80 text-sm xs:text-base max-w-md mb-4">
                  {service.description}
                </p>
                <button 
                  className="group bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full px-5 py-2 flex items-center hover:bg-white/30 transition-all duration-300"
                  onClick={() => handlePanelClick(service, index)}
                >
                  <span>Explore Options</span>
                  <FaCircleArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
            
            {/* Elegant active indicator */}
            <div className={`absolute inset-x-0 bottom-0 h-1 bg-green-800/95/70 transform transition-all duration-500
                            ${activePanel === index ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
          </div>
        ))}
      </div>
      
      {/* Desktop panels (horizontal) - Adjusted for better spacing and visibility */}
      <div className="hidden md:flex h-[calc(100%-140px)] mt-44 lg:mt-48">
        {featuredServices.map((service, index) => (
          <div 
            key={service.id}
            className={`relative transition-all duration-700 ease-in-out overflow-hidden cursor-pointer
                       ${activePanel === index ? 'flex-[7]' : activePanel !== null ? 'flex-[0.7]' : 'flex-1'}`}
            onMouseEnter={() => handlePanelInteraction(index)}
            onMouseLeave={handlePanelLeave}
            onClick={() => handlePanelClick(service, index)}
          >
            {/* Background image with enhanced overlay */}
            <div className="absolute inset-0 w-full h-full">
              <div className={`absolute inset-0 bg-gradient-to-t 
                              ${activePanel === index 
                                ? 'from-black/80 via-black/40 to-transparent' 
                                : 'from-black/70 to-black/20'} 
                              z-10 transition-opacity duration-500`}></div>
              <img 
                src={service.image}
                alt={service.name}
                className={`w-full h-full object-cover transition-all duration-700
                          ${activePanel === index ? 'scale-110 filter-none' : 'scale-100 brightness-[0.85] filter blur-[0.5px]'}`}
              />
            </div>
            
            {/* Vertical title displayed when panel is not active but another panel is active */}
            <div className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 transition-all duration-500 whitespace-nowrap
                           ${activePanel === index ? 'opacity-0' : activePanel !== null ? 'opacity-100' : 'opacity-0'}`}>
              <h3 className="text-white font-bold text-2xl transform -rotate-90">
                {service.name}
              </h3>
            </div>
            
            {/* Title at bottom when in default state (no hover/active panel) */}
            <div className={`absolute bottom-0 left-0 right-0 p-8 z-20 transition-all duration-500 mb-12
                           ${activePanel === null ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-center">
                <h3 className="text-white font-bold text-xl mb-1">
                  {service.name}
                </h3>
                <div className="h-0.5 w-10 bg-green-800/95/50 mx-auto"></div>
              </div>
            </div>
            
            {/* Hover/active state - expanded content with proper positioning */}
            <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 transition-all duration-500 mb-8
                           ${activePanel === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="max-w-lg">
                <span className="inline-block border border-white/30 text-white/90 px-3 py-1 text-xs rounded-full mb-3 backdrop-blur-sm">
                  {service.description}
                </span>
                <h3 className="text-white font-bold text-3xl lg:text-4xl mb-2">
                  {service.name}
                </h3>
                <p className="text-white/80 text-base max-w-md mb-4">
                  {service.description}
                </p>
                <div className="mb-4">
                  <button className="group relative overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full px-5 py-2 flex items-center hover:bg-white/30 transition-all duration-300">
                    <span className="relative z-10">Explore Options</span>
                    <FaCircleArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 relative z-10" />
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-500"></span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Enhanced active indicator */}
            <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-800/95/50 via-green-800/95 to-green-800/95/50 transform transition-all duration-500
                            ${activePanel === index ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
          </div>
        ))}
      </div>
      
      {/* Add the booking modal */}
      {showPopup && selectedProduct && <ProductPopup />}
      
      {/* Animations */}
      <style>{`
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          from { transform: translateY(0px); }
          to { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

export function HeroTwo({ active }: any) {
  const { push } = useRouter();
  
  // Filter states
  const [filteredProducts, setFilteredProducts] = useState<Service[]>(services);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    vehicleType: 'all',
  });
  
  // Selected product for popup
  const [selectedProduct, setSelectedProduct] = useState<Service | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  
  // Apply filters when they change
  useEffect(() => {
    let result = services;
    
    if (filters.category !== 'all') {
      result = result.filter(product => product.category === filters.category);
    }
    
    if (filters.vehicleType !== 'all') {
      result = result.filter(product => {
        const name = product.name.toLowerCase();
        if (filters.vehicleType === 'car') return name.includes('car');
        if (filters.vehicleType === 'suv') return name.includes('suv');
        if (filters.vehicleType === 'specialty') return name.includes('boat') || name.includes('rv') || name.includes('truck') || name.includes('machinery');
        return true;
      });
    }
    
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'under150':
          result = result.filter(product => product?.price && product.price < 150);
          break;
        case '150to300':
          result = result.filter(product => product?.price && product.price >= 150 && product.price <= 300);
          break;
        case '300to500':
          result = result.filter(product => product?.price && product.price >= 300 && product.price <= 500);
          break;
        case 'over500':
          result = result.filter(product => product?.price && product.price > 500);
          break;
      }
    }
    
    setFilteredProducts(result);
  }, [filters]);
  
  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  // Handle booking button click
  const handleBookNow = (product: any) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };
  
  // Booking form component (popup)
  const ProductPopup = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      address: '',
      vehicleType: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      additionalServices: {
        petHairRemoval: false,
        headlightCleaning: false,
        engineDetail: false,
        ceramicCoating: false
      },
      specialInstructions: '',
      productId: selectedProduct?.id
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.date) newErrors.date = 'Date is required';
      if (!formData.time) newErrors.time = 'Time is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
      if (!formData.vehicleMake) newErrors.vehicleMake = 'Vehicle make is required';
      if (!formData.vehicleModel) newErrors.vehicleModel = 'Vehicle model is required';
      if (!formData.vehicleYear) newErrors.vehicleYear = 'Vehicle year is required';
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      // Clear error when field is modified
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    };

    const handleAdditionalServiceChange = (service: string) => {
      setFormData(prev => ({
        ...prev,
        additionalServices: {
          ...prev.additionalServices,
          [service]: !prev.additionalServices[service as keyof typeof prev.additionalServices]
        }
      }));
    };

    const handleSubmit = async () => {
      if (!validateForm()) {
        toast.error('Please fill in all required fields');
        return;
      }

      try {
        const bookingData = {
          ...formData,
          totalPrice: calculateTotal(),
          timestamp: serverTimestamp(),
          status: 'pending'
        };

        // const response = await resend.emails.send({
        //   from: 'Mystery Mobile Detailing <dabconsultingfirm.com>',
        //   to: 'yaadiltd@gmail.com',
        //   subject: 'Booking Request',
        //   html: `<p>Congrats on sending your <strong>first email</strong>!</p>`,
        // });

        toast.success('Booking request submitted successfully!');
        setShowPopup(false);
      } catch (error) {
        console.error('Error submitting booking:', error);
        toast.error('Failed to submit booking. Please try again.');
      }
    };

    const calculateTotal = () => {
      let total = selectedProduct?.price || 0;
      
      if (formData.additionalServices.petHairRemoval) total += 50;
      if (formData.additionalServices.headlightCleaning) total += 50;
      if (formData.additionalServices.engineDetail) total += 45;
      if (formData.additionalServices.ceramicCoating) total += 275;
      
      return total;
    };
    
    return (
      <Modal
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        size="xl"
        className="[&_.rizzui-modal-content]:p-0"
      >
        <div className="flex flex-col h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Book {selectedProduct?.name}</h2>
            <button 
              onClick={() => setShowPopup(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex">
              {/* Product Details */}
              <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
                <div className="relative h-64 mb-6 rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={selectedProduct?.image} 
                    alt={selectedProduct?.name} 
                    className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct?.name}</h3>
                <p className="text-green-800/95 font-bold text-lg mb-4">{selectedProduct?.priceDisplay}</p>

                <p className="text-gray-700 text-sm mb-4">{selectedProduct?.description}</p>
                
                {selectedProduct?.features && (
                  <div className="space-y-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-medium mb-2">Service Includes:</h4>
                    <ul className="space-y-1">
                      {selectedProduct.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <FaCircleCheck className="text-green-800/95 mr-2 w-4 h-4" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Booking Form */}
              <div className="w-1/2 p-6 overflow-y-auto">
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Your Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                        errors.name ? 'border-red-500' : 'border-black/10'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Email*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.email ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Phone*</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.phone ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Vehicle Type*</label>
                      <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.vehicleType ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      >
                        <option value="">Select Vehicle Type</option>
                        <option value="car">Car</option>
                        <option value="suv">SUV</option>
                        <option value="truck">Truck</option>
                        <option value="van">Van</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.vehicleType && <p className="text-red-500 text-sm mt-1">{errors.vehicleType}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Vehicle Make*</label>
                      <input
                        type="text"
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.vehicleMake ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.vehicleMake && <p className="text-red-500 text-sm mt-1">{errors.vehicleMake}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Vehicle Model*</label>
                      <input
                        type="text"
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.vehicleModel ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.vehicleModel && <p className="text-red-500 text-sm mt-1">{errors.vehicleModel}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Vehicle Year*</label>
                      <input
                        type="text"
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.vehicleYear ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.vehicleYear && <p className="text-red-500 text-sm mt-1">{errors.vehicleYear}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Service Date*</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.date ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Preferred Time*</label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                          errors.time ? 'border-red-500' : 'border-black/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                      />
                      {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Service Address*</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${
                        errors.address ? 'border-red-500' : 'border-black/10'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300`}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-3">Additional Services</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.additionalServices.petHairRemoval}
                          onChange={() => handleAdditionalServiceChange('petHairRemoval')}
                          className="w-4 h-4 text-green-800/95 border-gray-300 rounded focus:ring-green-800/95"
                        />
                        <span className="text-gray-700">Pet Hair Removal (+$50)</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.additionalServices.headlightCleaning}
                          onChange={() => handleAdditionalServiceChange('headlightCleaning')}
                          className="w-4 h-4 text-green-800/95 border-gray-300 rounded focus:ring-green-800/95"
                        />
                        <span className="text-gray-700">Headlight Cleaning (+$50)</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.additionalServices.engineDetail}
                          onChange={() => handleAdditionalServiceChange('engineDetail')}
                          className="w-4 h-4 text-green-800/95 border-gray-300 rounded focus:ring-green-800/95"
                        />
                        <span className="text-gray-700">Engine Detail (+$45)</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.additionalServices.ceramicCoating}
                          onChange={() => handleAdditionalServiceChange('ceramicCoating')}
                          className="w-4 h-4 text-green-800/95 border-gray-300 rounded focus:ring-green-800/95"
                        />
                        <span className="text-gray-700">Ceramic Coating (+$275)</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Special Instructions</label>
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300 resize-none"
                      placeholder="Any specific requirements or concerns..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-green-800/95 text-white font-medium py-3 rounded-full transition-all duration-300 mt-4"
                  >
                    Submit Booking Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div id="hero-two" className={`${containerClasses} ${active ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10'}`}>
      <div className="mx-auto max-w-12xl px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <span className="inline-block border border-green-800/95/30 text-green-800/95 px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm bg-white/30">
              Professional Mobile Detailing
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-black leading-tight">
              Our <span className="font-medium text-green-800/95">Services</span>
            </h2>
            <p className="text-gray-700 mt-2">Find the perfect detailing package for your vehicle.</p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <button 
              onClick={() => window.location.href = 'tel:+16477063728'}
              className="group relative overflow-hidden border border-black/10 text-black font-medium rounded-full px-6 py-3 transition-all duration-300 hover:shadow-lg"
            >
              <span className="relative z-10 flex items-center">
                Schedule a Service
                <FaCircleArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-black transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-12 border border-black/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Service Type</label>
              <select 
                className="block w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="all">All Services</option>
                <option value="basic">Basic Detailing</option>
                <option value="interior">Interior Detailing</option>
                <option value="premium">Premium Detailing</option>
                <option value="maintenance">Maintenance</option>
                <option value="protection">Protection</option>
                <option value="express">Express Service</option>
                <option value="specialty">Specialty Services</option>
                <option value="add-on">Add-ons</option>
                <option value="business">Business Services</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-2">Vehicle Type</label>
              <select 
                className="block w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300"
                value={filters.vehicleType}
                onChange={(e) => handleFilterChange('vehicleType', e.target.value)}
              >
                <option value="all">All Vehicles</option>
                <option value="car">Cars</option>
                <option value="suv">SUVs</option>
                <option value="specialty">Boats, RVs & Trucks</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-2">Price Range</label>
              <select 
                className="block w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/95/50 focus:border-green-800/95 transition-all duration-300"
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="under150">Under $150</option>
                <option value="150to300">$150 - $300</option>
                <option value="300to500">$300 - $500</option>
                <option value="over500">Over $500</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="group relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-black/10"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={product?.image || 'https://firebasestorage.googleapis.com/v0/b/mystery-mobile-detailing.firebasestorage.app/o/MMD_Logo.png?alt=media&token=376e9d77-6082-40c2-8785-39832e99f409'} 
                    alt={product.name} 
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute top-3 right-3 border border-white/30 bg-white/80 backdrop-blur-sm text-black text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                    Mobile Service
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl text-black mb-2 group-hover:text-black transition-colors duration-300">{product.name}</h3>
                  <p className="text-gray-700 text-sm mb-4">{product.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-800/95">{product.priceDisplay}</span>
                    <button 
                      onClick={() => handleBookNow(product)}
                      className="group relative overflow-hidden bg-transparent border border-black/10 text-black font-medium rounded-full px-4 py-2 transition-all duration-300 hover:text-white"
                    >
                      <span className="relative z-10 flex items-center">
                        Book Now
                        <FaCircleArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 w-full h-full -translate-x-full group-hover:translate-x-0 bg-black transition-transform duration-300"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-xl text-gray-700">No matching services found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
        
        {/* Customer Support */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 text-center border border-black/10">
          <h3 className="text-2xl font-bold text-black mb-4">Need help choosing a service?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Our team is here to help you select the perfect detailing package for your vehicle. Contact us for personalized recommendations.
          </p>
          <button onClick={() => window.location.href = 'tel:+16477063728'} className="group relative overflow-hidden bg-black text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg">
            <span className="relative z-10 flex items-center justify-center">
              <FaPhoneFlip className="mr-2 w-4 h-4 transition-transform group-hover:rotate-12" />
              Call Us: (647) 706-3728
            </span>
            <span className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-green-800/95 transition-transform duration-500"></span>
          </button>
        </div>
      </div>
      
      {/* Popup */}
      {showPopup && selectedProduct && <ProductPopup />}
      
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
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
