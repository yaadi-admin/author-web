'use client';

import React, { useEffect, useState } from 'react';
import { FaApplePay, FaCcMastercard, FaCcStripe, FaCcVisa, FaGooglePay } from 'react-icons/fa';
import { Button } from 'rizzui';

type FooterWelcomeProps = {
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: (type: number) => void;
};

export function FooterWelcome() {


  return (
    <footer className="border-t border-gray-200 bg-white pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
            Mystery Mobile Detailing
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
            Looking for the best mobile detailing for your next event? We've got you covered.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Methods Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Payment Methods
            </h3>
            <div className="flex space-x-4 items-center">
              <FaCcStripe className="text-purple-600 w-8 h-8" />
              <FaCcVisa className="text-blue-600 w-8 h-8" />
              <FaCcMastercard className="text-red-600 w-8 h-8" />
              <FaApplePay className="text-gray-800 w-8 h-8" />
              <FaGooglePay className="text-blue-500 w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-500">
              © 2025 Mega Bounce™. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-200">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterWelcome;
