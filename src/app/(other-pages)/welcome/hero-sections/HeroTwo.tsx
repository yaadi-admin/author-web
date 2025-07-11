'use client';

import React, { useState } from "react";
import { FaCircleArrowRight, FaCircleCheck, FaPhoneFlip, FaCar, FaWrench, FaShieldHalved, FaStar } from 'react-icons/fa6';
import { Modal } from 'rizzui';
import toast from 'react-hot-toast';
import { serverTimestamp } from "firebase/firestore";
import { Service, services } from '@/app/(other-pages)/products/services';

const transitionClasses = 'transition-opacity transition-transform duration-300 ease-in-out';
const containerClasses = `relative ${transitionClasses} w-full`;

export function HeroTwo({ active }: { active: boolean }) {
  // Selected product for popup
  const [selectedProduct, setSelectedProduct] = useState<Service | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  
  // Handle booking button click
  const handleBookNow = (product: any) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  // Corner content data
  const cornerContent = [
    {
      position: 'top-left',
      icon: FaCar,
      title: 'Premium Detailing',
      description: 'Professional-grade services for all vehicle types with attention to every detail',
      color: 'from-blue-500 to-blue-600'
    },
    {
      position: 'top-right',
      icon: FaWrench,
      title: 'Expert Service',
      description: 'Certified technicians with years of experience in automotive care',
      color: 'from-green-500 to-green-600'
    },
    {
      position: 'bottom-left',
      icon: FaShieldHalved,
      title: 'Quality Guarantee',
      description: '100% satisfaction guaranteed with our premium protection services',
      color: 'from-purple-500 to-purple-600'
    },
    {
      position: 'bottom-right',
      icon: FaStar,
      title: 'Mobile Convenience',
      description: 'We come to you - professional detailing at your location',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Corner Content Component
  const CornerContent = ({ content }: { content: typeof cornerContent[0] }) => {
    const IconComponent = content.icon;
    
    const positionClasses = {
      'top-left': 'top-0 left-0 transform -translate-x-1/2 -translate-y-1/2',
      'top-right': 'top-0 right-0 transform translate-x-1/2 -translate-y-1/2',
      'bottom-left': 'bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2',
      'bottom-right': 'bottom-0 right-0 transform translate-x-1/2 translate-y-1/2'
    };

    return (
      <div className={`absolute ${positionClasses[content.position as keyof typeof positionClasses]} w-64 z-10`}>
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 hover:scale-105">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${content.color} text-white mb-4 shadow-lg`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{content.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{content.description}</p>
        </div>
      </div>
    );
  };

  // Booking form component (popup) - keeping the existing popup logic
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

          <div className="flex-1 overflow-hidden">
            <div className="h-full flex">
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
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        {/* Centered Header */}
        <div className="text-center mb-32">
          <h2 className="text-3xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-wide mb-6">
            <span className="font-bold">I Serve You With</span>
          </h2>
        </div>
        
        {/* Main Content with Circular Image and Corner Text */}
        <div className="relative flex justify-center items-center min-h-[300px] mb-16">
          {/* Central Circular Image */}
          <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl border-8 border-white/20 backdrop-blur-sm">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/dfee8cfc-38ba-4989-a2dc-4db6237f6343_removalai_preview.png?alt=media&token=2595d0d3-fc66-481d-9840-2e9a49090e57"
              alt="Mystery Mobile Detailing"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
            
          </div>
          
          {/* Corner Content */}
          {cornerContent.map((content, index) => (
            <CornerContent key={index} content={content} />
          ))}
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