import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SlideOutNav from './SlideOutNav';

interface HeaderProps {
  whiteText?: boolean;
}

export default function Header({ whiteText = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // When scrolled, always use black text for contrast against white background
  // When not scrolled, use the prop value (whiteText)
  const textColor = isScrolled ? 'text-black' : (whiteText ? 'text-white' : 'text-black');
  const hoverColor = isScrolled ? 'hover:text-suelyn-pink' : (whiteText ? 'hover:text-white/80' : 'hover:text-suelyn-pink');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-transparent' : ''
    }`}>
      <div className={`container mx-auto px-4 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}>
        <div className="flex items-center justify-between">
          {/* Left side - Back icon if not on homepage, otherwise social icons */}
          <div className="flex items-center gap-4">
            {!isHomePage ? (
              <Link to="/" className={`${textColor} ${hoverColor} transition-colors flex items-center gap-2 ${
                isScrolled ? 'bg-white px-3 py-2 rounded-md shadow-md' : ''
              }`}>
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 19-7-7 7-7"/>
                    <path d="M19 12H5"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">Home</span>
              </Link>
            ) : (
              <>
                {/* LinkedIn */}
                {/* <a
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
                </a> */}
                {/* Instagram */}
                {/* <a
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
                </a> */}
                {/* Facebook */}
                {/* <a
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
                </a> */}
              </>
            )}
          </div>

          {/* Right side - Dark mode toggle and slide-out navigation */}
          <div className="flex items-center gap-4">
            {/* <button className={`${textColor} ${hoverColor} transition-colors`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.0968 13.2358C22.9797 13.2089 22.858 13.2081 22.7405 13.2336C22.623 13.259 22.5125 13.3099 22.4169 13.3828C21.6423 14.0474 20.755 14.5679 19.7969 14.9198C18.8516 15.2785 17.8479 15.4586 16.8368 15.4508C15.6984 15.4502 14.5713 15.2249 13.5201 14.788C12.4688 14.3511 11.514 13.711 10.7105 12.9045C9.90697 12.0981 9.27049 11.141 8.83744 10.0881C8.40439 9.03524 8.18337 7.90729 8.18693 6.76885C8.19186 5.79539 8.35045 4.82882 8.6569 3.90485C8.97175 2.97884 9.45289 2.11807 10.0768 1.36485C10.1999 1.20722 10.2564 1.00759 10.2339 0.808841C10.2115 0.610087 10.112 0.428055 9.95682 0.301844C9.8615 0.228383 9.75105 0.177002 9.63346 0.151408C9.51587 0.125814 9.39412 0.126651 9.27689 0.153849C6.80075 0.839538 4.61438 2.31104 3.04691 4.34684C1.32505 6.59903 0.477555 9.39885 0.661413 12.2279C0.845271 15.0569 2.04803 17.7235 4.04691 19.7338C5.51127 21.2003 7.34082 22.2488 9.34635 22.7709C11.3519 23.2929 13.4605 23.2697 15.454 22.7034C17.4475 22.1372 19.2535 21.0486 20.6851 19.5502C22.1167 18.0518 23.122 16.1981 23.5968 14.1809C23.6336 14.0863 23.6496 13.985 23.6437 13.8838C23.6378 13.7825 23.6102 13.6837 23.5628 13.5941C23.5154 13.5045 23.4492 13.4261 23.3688 13.3643C23.2884 13.3024 23.1957 13.2586 23.0968 13.2358ZM18.5968 19.4078C16.6537 20.9221 14.2257 21.677 11.7665 21.5314C9.30732 21.3858 6.98523 20.3496 5.23441 18.6165C3.48359 16.8835 2.42379 14.5721 2.25309 12.1146C2.08238 9.65697 2.81252 7.22132 4.30692 5.26284C5.21424 4.08324 6.36765 3.11547 7.68693 2.42684C7.54693 2.75384 7.39689 3.07785 7.27689 3.43285C6.89708 4.5137 6.70755 5.65224 6.71683 6.79785C6.71328 8.1336 6.97313 9.45695 7.48148 10.6922C7.98983 11.9274 8.73677 13.0504 9.67948 13.9967C10.6222 14.943 11.7422 15.6942 12.9755 16.2073C14.2088 16.7204 15.5311 16.9853 16.8669 16.9868C18.0583 16.9946 19.241 16.7845 20.3568 16.3668C20.7382 16.2288 21.112 16.0709 21.4768 15.8938C20.7754 17.2552 19.7939 18.4527 18.5968 19.4078Z"/>
              </svg>
            </button> */}
            <SlideOutNav whiteText={whiteText} isScrolled={isScrolled} />
          </div>
        </div>
      </div>
    </header>
  );
}
