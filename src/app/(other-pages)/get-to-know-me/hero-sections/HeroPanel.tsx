'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCircleArrowRight, FaCircleCheck } from 'react-icons/fa6';
import { Modal } from 'rizzui';
import toast from 'react-hot-toast';
import { serverTimestamp } from "firebase/firestore";
import { Service, getFeaturedServices } from '@/app/(other-pages)/products/services';

const transitionClasses = 'transition-opacity transition-transform duration-300 ease-in-out';
const containerClasses = `relative ${transitionClasses} w-full`;

export function HeroPanel({ active }: { active: boolean }) {
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
        const totalPrice = calculateTotal();
        const bookingData = {
          ...formData,
          totalPrice,
          timestamp: serverTimestamp(),
          status: 'pending'
        };

        // Send email using API route
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formData,
            selectedProduct,
            totalPrice
          }),
        });

        if (!emailResponse.ok) {
          throw new Error('Failed to send email');
        }
        
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
      <div className="md:hidden flex flex-col h-full mt-36 xs:mt-40 sm:mt-44 gap-4 xs:gap-5 px-3 xs:px-4 pb-5 overflow-y-auto">
        {featuredServices.map((service, index) => (
          <div 
            key={service.id}
            className={`relative transition-all duration-500 ease-in-out overflow-hidden rounded-2xl shadow-lg
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
      <div className="hidden md:flex h-[calc(100%-140px)] mt-44 lg:mt-48 gap-4 px-4">
        {featuredServices.map((service, index) => (
          <div 
            key={service.id}
            className={`relative transition-all duration-700 ease-in-out overflow-hidden cursor-pointer rounded-2xl
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
                <div className="h-0.5 w-10 bg-green-800/95/50 mx-auto rounded-full"></div>
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
            <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-800/95/50 via-green-800/95 to-green-800/95/50 transform transition-all duration-500 rounded-full
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