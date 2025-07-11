'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from '@tsparticles/slim';
import { FaCircleArrowUp, FaPhoneFlip, FaBars, FaXmark } from 'react-icons/fa6';
import FooterWelcome from './welcome/footer';

const ignoreBackButtonRoutes = [routes.accessDenied, routes.notFound];

export default function OtherPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const { push } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTopButton(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setIsMobileMenuOpen(false);
    // Set the current active page based on pathname
    const path = pathName.split('/').pop() || 'welcome';
    setSelectedPage(path);
  }, [pathName]);

  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (pathName.includes('Broker')) {
    return <>{children}</>;
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height plus some padding
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleNavClick = (page: string, event: React.MouseEvent) => {
    event.preventDefault();
    const newHash = `#${page}`;
    window.history.replaceState(null, '', newHash);
    setSelectedPage(page);
    setIsMobileMenuOpen(false);
    scrollToSection(page);
  };

  const particlesLoaded = async (container: any): Promise<void> => {
    console.log("Particles loaded:", container);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isActive = (path: string) => {
    return pathName === path || selectedPage === path.split('/').pop();
  };

  return (
    <>
      
      {/* Header - Redesigned */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
          ${isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
            : 'bg-white/90 backdrop-blur-sm py-5'}`}
      >
        <div className="max-w-10xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={routes.welcome} className="flex items-center h-10 w-32 md:h-12 md:w-36 lg:w-44 transition-all duration-300">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/c1c37cae-76b6-4394-b816-154828b2ca30_removalai_preview.png?alt=media&token=e49e3d07-bdf1-47e1-82c9-ce02e75bb4f3"
                alt="Suelyn Empowered Living"
                width={150}
                height={150}
                style={{ objectFit: 'contain' }}
                className="transition-transform duration-300 rounded-full hover:scale-105 object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {[
                { name: 'Home', path: routes.welcome },
                { name: 'Get to Know Me', path: routes.products },
                { name: 'Author', path: routes.aboutUs },
                { name: 'Work With Me', path: routes.gallery },
                { name: 'Events', path: routes.aboutUs },
                { name: 'Blog', path: routes.aboutUs },
                { name: 'Foundation', path: routes.aboutUs },
                { name: 'Contact', path: routes.aboutUs },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative
                    ${isActive(item.path) 
                      ? 'text-green-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-800 after:transition-all after:duration-300' 
                      : 'text-gray-700 hover:text-green-800 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-green-800 hover:after:transition-all hover:after:duration-300'}`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-green-800 focus:outline-none transition-colors duration-300"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                    <FaXmark className="h-6 w-6" />
                  ) : (
                    <FaBars className="h-6 w-6" />
                  )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-200">
            {[
              { name: 'Home', path: routes.welcome },
              { name: 'Get to Know Me', path: routes.products },
              { name: 'Author', path: routes.aboutUs },
              { name: 'Work With Me', path: routes.gallery },
              { name: 'Events', path: routes.aboutUs },
              { name: 'Blog', path: routes.aboutUs },
              { name: 'Foundation', path: routes.aboutUs },
              { name: 'Contact', path: routes.aboutUs },
            ].map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`block px-4 py-3 text-base font-medium transition-colors duration-300
                  ${isActive(item.path) 
                    ? 'text-green-800 bg-green-50' 
                    : 'text-gray-700 hover:text-green-800 hover:bg-green-50'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            <a
              href="tel:+16477063728"
              className="flex items-center justify-center text-gray-700 rounded-md px-4 py-3 mt-4 
                hover:bg-green-800 hover:text-white transition-all duration-300 group"
            >
              <span className="text-base font-medium">Contact Us</span>
              <FaPhoneFlip className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </header>

      <main className="pt-20 md:pt-24 lg:pt-28 mx-[1%]"> {/* Added margin on both sides */}
        {children}
      </main>

      {/* Scroll to top button - enhanced */}
      {showScrollTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-black text-black p-3 rounded-full 
            hover:bg-black/90 transition-all duration-300 z-40 hover:scale-110 focus:outline-none 
            focus:ring-2 focus:ring-black focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <FaCircleArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
}