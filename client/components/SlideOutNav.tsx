import { useState } from 'react';
import { Link } from 'react-router-dom';

interface SlideOutNavProps {
  whiteText?: boolean;
  isScrolled?: boolean;
}

export default function SlideOutNav({ whiteText = false, isScrolled = false }: SlideOutNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  // When scrolled, always use black text for contrast against white background
  // When not scrolled, use the prop value (whiteText)
  const textColor = isScrolled ? 'text-black' : (whiteText ? 'text-white' : 'text-black');
  const hoverColor = isScrolled ? 'hover:text-suelyn-pink' : (whiteText ? 'hover:text-white/80' : 'hover:text-suelyn-pink');

  return (
    <>
      {/* Menu Button */}
      <button 
        onClick={toggleNav}
        className={`${textColor} ${hoverColor} transition-colors z-50 relative ${
          isScrolled ? 'bg-white px-4 py-2 rounded-md shadow-md' : ''
        }`}
        aria-label="Toggle navigation menu"
      >
        {isScrolled ? (
          // Show "MENU" with arrow when scrolled
          <div className="items-center gap-2">
            <span className="text-sm font-medium">MENU</span>
            <svg width="44" height="16" viewBox="0 0 48 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="8" x2="44" y2="8" />
              <polyline points="36,2 44,8 36,14" />
            </svg>
          </div>
        ) : (
          // Show hamburger icon when not scrolled
          <div className="w-7 h-7 flex flex-col justify-center gap-1">
            <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </div>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={closeNav}
        ></div>
      )}

      {/* Slide-out Navigation */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[85%] sm:max-w-[60%] md:max-w-[40%] lg:max-w-[25%] xl:max-w-[15%] z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Background Image with Blur */}
        <div className="absolute inset-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/7cf07593ce043b7a08e4f1ca3e188ae94e312d73?width=3838"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-xl"></div>
        </div>
        
        <div className="relative flex flex-col h-full p-4 sm:p-6 md:p-8">
          {/* Close button */}
          <div className="flex justify-end mb-4 sm:mb-6 md:mb-8">
            <button 
              onClick={closeNav}
              className="text-white hover:text-suelyn-pink transition-colors"
              aria-label="Close navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-3 sm:space-y-4 md:space-y-6">
              <li>
                <Link 
                  to="/" 
                  onClick={closeNav}
                  className="font-helvetica text-lg sm:text-xl md:text-2xl font-bold text-white hover:text-suelyn-pink transition-colors block py-1 sm:py-2"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={closeNav}
                  className="font-helvetica text-lg sm:text-xl md:text-2xl font-bold text-white hover:text-suelyn-pink transition-colors block py-1 sm:py-2"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/author" 
                  onClick={closeNav}
                  className="font-helvetica text-lg sm:text-xl md:text-2xl font-bold text-white hover:text-suelyn-pink transition-colors block py-1 sm:py-2"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  onClick={closeNav}
                  className="font-helvetica text-lg sm:text-xl md:text-2xl font-bold text-white hover:text-suelyn-pink transition-colors block py-1 sm:py-2"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/workshops" 
                  onClick={closeNav}
                  className="font-helvetica text-lg sm:text-xl md:text-2xl font-bold text-white hover:text-suelyn-pink transition-colors block py-1 sm:py-2"
                >
                  Engagements
                </Link>
              </li>
              <li>
                <Link 
                  to="/foundation" 
                  onClick={closeNav}
                  className="font-helvetica text-lg sm:text-xl md:text-2xl font-bold text-white hover:text-suelyn-pink transition-colors block py-1 sm:py-2"
                >
                  Foundation
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex gap-3 sm:gap-4 justify-center pt-4 sm:pt-6 md:pt-8 border-t border-white/20">
            {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/suzanna-griffiths/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${textColor} ${hoverColor} transition-colors ${
                    isScrolled ? 'bg-white p-2 rounded-md shadow-md' : ''
                  }`}
                  aria-label="LinkedIn"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/>
                    </svg>
                  </div>
                </a>
                {/* Instagram */}
                <a
                  href="http://www.instagram.com/suelyn.empoweredliving"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${textColor} ${hoverColor} transition-colors ${
                    isScrolled ? 'bg-white p-2 rounded-md shadow-md' : ''
                  }`}
                  aria-label="Instagram"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                </a>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/suzanna.johnson.75"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${textColor} ${hoverColor} transition-colors ${
                    isScrolled ? 'bg-white p-2 rounded-md shadow-md' : ''
                  }`}
                  aria-label="Facebook"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
                    </svg>
                  </div>
                </a>
          </div>
        </div>
      </div>
    </>
  );
} 