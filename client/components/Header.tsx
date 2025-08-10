import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SlideOutNav from './SlideOutNav';

interface HeaderProps {
  whiteText?: boolean;
}

export default function Header({ whiteText = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
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
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : ''
    }`}>
      <div className={`container mx-auto px-4 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}>
        <div className="flex items-center justify-between">
          {/* Left side - Social icons */}
          <div className="flex items-center gap-4">
            <a href="#" className={`${textColor} ${hoverColor} transition-colors`}>
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.23 5.924a8.212 8.212 0 0 1-2.357.646 4.115 4.115 0 0 0 1.804-2.27 8.221 8.221 0 0 1-2.606.996A4.103 4.103 0 0 0 16.616 3c-2.27 0-4.103 1.834-4.103 4.103 0 .322.036.635.106.935a11.645 11.645 0 0 1-8.457-4.287 4.096 4.096 0 0 0-.556 2.063c0 1.424.724 2.679 1.825 3.415a4.066 4.066 0 0 1-1.859-.514v.052c0 1.988 1.414 3.647 3.292 4.023a4.109 4.109 0 0 1-1.853.07c.522 1.63 2.038 2.816 3.833 2.85A8.236 8.236 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531A8.35 8.35 0 0 0 22.23 5.924z"/>
                </svg>
              </div>
            </a>
            <a href="#" className={`${textColor} ${hoverColor} transition-colors`}>
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </div>
            </a>
          </div>

          {/* Right side - Dark mode toggle and slide-out navigation */}
          <div className="flex items-center gap-4">
            <button className={`${textColor} ${hoverColor} transition-colors`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.0968 13.2358C22.9797 13.2089 22.858 13.2081 22.7405 13.2336C22.623 13.259 22.5125 13.3099 22.4169 13.3828C21.6423 14.0474 20.755 14.5679 19.7969 14.9198C18.8516 15.2785 17.8479 15.4586 16.8368 15.4508C15.6984 15.4502 14.5713 15.2249 13.5201 14.788C12.4688 14.3511 11.514 13.711 10.7105 12.9045C9.90697 12.0981 9.27049 11.141 8.83744 10.0881C8.40439 9.03524 8.18337 7.90729 8.18693 6.76885C8.19186 5.79539 8.35045 4.82882 8.6569 3.90485C8.97175 2.97884 9.45289 2.11807 10.0768 1.36485C10.1999 1.20722 10.2564 1.00759 10.2339 0.808841C10.2115 0.610087 10.112 0.428055 9.95682 0.301844C9.8615 0.228383 9.75105 0.177002 9.63346 0.151408C9.51587 0.125814 9.39412 0.126651 9.27689 0.153849C6.80075 0.839538 4.61438 2.31104 3.04691 4.34684C1.32505 6.59903 0.477555 9.39885 0.661413 12.2279C0.845271 15.0569 2.04803 17.7235 4.04691 19.7338C5.51127 21.2003 7.34082 22.2488 9.34635 22.7709C11.3519 23.2929 13.4605 23.2697 15.454 22.7034C17.4475 22.1372 19.2535 21.0486 20.6851 19.5502C22.1167 18.0518 23.122 16.1981 23.5968 14.1809C23.6336 14.0863 23.6496 13.985 23.6437 13.8838C23.6378 13.7825 23.6102 13.6837 23.5628 13.5941C23.5154 13.5045 23.4492 13.4261 23.3688 13.3643C23.2884 13.3024 23.1957 13.2586 23.0968 13.2358ZM18.5968 19.4078C16.6537 20.9221 14.2257 21.677 11.7665 21.5314C9.30732 21.3858 6.98523 20.3496 5.23441 18.6165C3.48359 16.8835 2.42379 14.5721 2.25309 12.1146C2.08238 9.65697 2.81252 7.22132 4.30692 5.26284C5.21424 4.08324 6.36765 3.11547 7.68693 2.42684C7.54693 2.75384 7.39689 3.07785 7.27689 3.43285C6.89708 4.5137 6.70755 5.65224 6.71683 6.79785C6.71328 8.1336 6.97313 9.45695 7.48148 10.6922C7.98983 11.9274 8.73677 13.0504 9.67948 13.9967C10.6222 14.943 11.7422 15.6942 12.9755 16.2073C14.2088 16.7204 15.5311 16.9853 16.8669 16.9868C18.0583 16.9946 19.241 16.7845 20.3568 16.3668C20.7382 16.2288 21.112 16.0709 21.4768 15.8938C20.7754 17.2552 19.7939 18.4527 18.5968 19.4078Z"/>
              </svg>
            </button>
            <SlideOutNav whiteText={whiteText} isScrolled={isScrolled} />
          </div>
        </div>
      </div>
    </header>
  );
}
