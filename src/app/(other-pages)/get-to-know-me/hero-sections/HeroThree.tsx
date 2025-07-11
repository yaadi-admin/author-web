'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCircleArrowRight, FaCircleCheck, FaPhoneFlip } from 'react-icons/fa6';
import { Modal } from 'rizzui';
import toast from 'react-hot-toast';
import { serverTimestamp } from "firebase/firestore";
import { Service, services } from '@/app/(other-pages)/products/services';

const transitionClasses = 'transition-opacity transition-transform duration-300 ease-in-out';
const containerClasses = `relative ${transitionClasses} w-full`;

export function HeroThree({ active }: { active: boolean }) {
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
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateForm()) {
        toast.error('Please fill in all required fields');
        return;
      }

      setIsSubmitting(true);

      try {
        const totalPrice = calculateTotal();
        const bookingData = {
          ...formData,
          totalPrice,
          timestamp: serverTimestamp(),
          status: 'pending',
          serviceName: selectedProduct?.name,
          servicePrice: selectedProduct?.price
        };

        // Send email using API route
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formData: bookingData,
            selectedProduct,
            totalPrice
          }),
        });

        if (!emailResponse.ok) {
          const errorData = await emailResponse.json().catch(() => ({})) as { message?: string };
          throw new Error(errorData.message || 'Failed to send email');
        }
        
        toast.success('Booking request submitted successfully!');
        setShowPopup(false);
      } catch (error) {
        console.error('Error submitting booking:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to submit booking. Please try again.');
      } finally {
        setIsSubmitting(false);
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
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    disabled={isSubmitting}
                    className={`w-full bg-black hover:bg-green-800/95 text-white font-medium py-3 rounded-full transition-all duration-300 mt-4 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Booking Request'
                    )}
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
    <div id="hero-three" className={`${containerClasses} ${active ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10'}`}>
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