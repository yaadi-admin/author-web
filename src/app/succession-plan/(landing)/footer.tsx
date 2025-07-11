'use client';

import React from 'react';
import { Title, Text, Input } from 'rizzui';
import {
  PiFacebookLogoFill,
  PiLinkedinLogoFill,
  PiYoutubeLogoFill,
} from 'react-icons/pi';
import Image from 'next/image';
import Link from 'next/link';


// payment methods test
const paymentMethods = [
  {
    name: 'Paypal Pay Logo',
    src: '/payment-methods/PayPal.png',
  },

  {
    name: 'MasterCard Logo',
    src: '/payment-methods/Mastercard.png',
  },
  {
    name: 'Stripe Logo',
    src: '/payment-methods/Stripe.png',
  },
  {
    name: 'Amex Logo',
    src: '/payment-methods/Amex.png',
  },

  {
    name: 'Visa Logo',
    src: '/payment-methods/Visa.png',
  },
  {
    name: 'Google Pay Logo',
    src: '/payment-methods/GooglePay.png',
  },
  {
    name: 'Apple Pay Logo',
    src: '/payment-methods/ApplePay.png',
  },

]
function Footer() {
  return (
    <div
      className='flex flex-grow relative'
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '60px 8%',
        backgroundColor: '#000',
        color: '#fff',
      }}>
      <div
        className='4xs:flex-col 4xs:gap-10 md:flex-row'
        style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        {/* Left Side */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left Side */}
          <div style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.1)', // Subtle background for enhanced visibility
          }}>
            <Title as="h1" className="text-3xl font-bold mb-2" style={{ color: 'white' }}>
              Get in Touch
            </Title>
            <Title as="h1" className="text-3xl font-bold mb-2" style={{ color: 'white' }}>
              We are ready to help you begin your journey. Setup a call to get started.
            </Title>
            <Text className="text-lg mb-3" style={{ color: 'white' }}>Social network</Text>
            <div style={{ display: 'flex', fontSize: '20px' }}>
              <a href="https://www.facebook.com/thenarro.com/" target="_blank" rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(145deg, #3b5998, #8b9dc3)',
                  borderRadius: '50%',
                  padding: '8px',
                  margin: '4px',
                }}>
                <PiFacebookLogoFill style={{ color: 'white', width: '24px', height: '24px' }} />
              </a>
              <a href="https://www.linkedin.com/company/bizbridge-io/" target="_blank" rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(145deg, #0077b5, #00a0dc)',
                  borderRadius: '50%',
                  padding: '8px',
                  margin: '4px',
                }}>
                <PiLinkedinLogoFill style={{ color: 'white', width: '24px', height: '24px' }} />
              </a>
              <a href="https://www.youtube.com/channel/UCb7aBeSYuRmPKZRVdDQZqRA" target="_blank" rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(145deg, #c4302b, #ff0000)',
                  borderRadius: '50%',
                  padding: '8px',
                  margin: '4px',
                }}>
                <PiYoutubeLogoFill style={{ color: 'white', width: '24px', height: '24px' }} />
              </a>
            </div>
            {/* About Us section below social links */}
            <Title as="h2" className="text-2xl font-bold mt-6 mb-5" style={{ color: 'beige' }}>
              About Us
            </Title>
            <Text className="text-md" style={{ color: 'beige' }}>
              We use our expertise, people-centric design, and technology to build the bridge between small-to-medium business owners - current and new. Narro&apos;s AI-supported platform accelerates the speed, reduces the frictions, and heightens the experience of deal happiness.
            </Text>
            <div className='mt-5 -ml-2 grid grid-cols-4 md:w-[30%] 4xs:w-1/2'>
              {paymentMethods.map((paymentMethod) => (
                <Image
                  key={paymentMethod.name}
                  src={paymentMethod.src}
                  alt={paymentMethod.name}
                  height={60}
                  width={60}
                  objectFit="contain"
                  className="h-full"
                />
              ))}
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="contact-form bg-white rounded-md shadow-md p-8">
          <h2 className="text-center text-2xl font-bold mb-4">Start your Journey</h2>
          <p className="text-center text-gray-600 mb-8">
            Let us help you get started in the most important sale of your life.
          </p>
          <div className="flex flex-col mb-8">
            <input
              type="text"
              placeholder="Full name"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-md border border-gray-300 mt-2 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="p-3 rounded-md border border-gray-300 mt-2 focus:outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Message"
              className="p-3 rounded-md border border-gray-300 mt-2 h-24 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="w-full py-2 text-center text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none">
            Send a message
          </button>
        </div>
      </div>

      <div
        className='flex 4xs:flex-col md:flex-row md:items-center'
        style={{ borderTop: '1px solid #444', paddingTop: '20px', color: 'white' }}>
        <Link
          href="https://drive.google.com/file/d/1DLOhQ5a_dd0e29rIHCDtdGYiRdu2k4Ug/view"
          passHref
          target="_blank"
        >
          <Text className="mr-4 cursor-pointer hover:underline">
            Terms and Conditions
          </Text>
        </Link>

        <Link
          href="https://drive.google.com/file/d/1QshORCTcNJ066Htuvxe7MRzPs1pmtYlB/view"
          passHref
          target="_blank"
        >
          <Text className="cursor-pointer hover:underline ">
            Privacy Policy
          </Text>
        </Link>
        <Text className="md:ml-auto">© Narro 2024. All rights reserved</Text>
      </div>
    </div>
  );
}

export default Footer;