import { useState } from 'react';
import { Link } from 'react-router-dom';

interface SlideOutNavProps {
  whiteText?: boolean;
}

export default function SlideOutNav({ whiteText = false }: SlideOutNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  const textColor = whiteText ? 'text-white' : 'text-black';
  const hoverColor = whiteText ? 'hover:text-white/80' : 'hover:text-suelyn-pink';

  return (
    <>
      {/* Hamburger Menu Button */}
      <button 
        onClick={toggleNav}
        className={`${textColor} ${hoverColor} transition-colors z-50 relative`}
        aria-label="Toggle navigation menu"
      >
        <div className="w-7 h-7 flex flex-col justify-center gap-1">
          <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={closeNav}
        ></div>
      )}

      {/* Slide-out Navigation */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[15%] bg-gradient-to-b from-[#F1E6DB] via-[#E0B2F1] to-[#FFE4EE] z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8">
          {/* Close button */}
          <div className="flex justify-end mb-8">
            <button 
              onClick={closeNav}
              className="text-black hover:text-suelyn-pink transition-colors"
              aria-label="Close navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-6">
              <li>
                <Link 
                  to="/" 
                  onClick={closeNav}
                  className="font-montserrat text-2xl font-bold text-black hover:text-suelyn-pink transition-colors block py-2"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={closeNav}
                  className="font-montserrat text-2xl font-bold text-black hover:text-suelyn-pink transition-colors block py-2"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/author" 
                  onClick={closeNav}
                  className="font-montserrat text-2xl font-bold text-black hover:text-suelyn-pink transition-colors block py-2"
                >
                  Author
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  onClick={closeNav}
                  className="font-montserrat text-2xl font-bold text-black hover:text-suelyn-pink transition-colors block py-2"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/workshops" 
                  onClick={closeNav}
                  className="font-montserrat text-2xl font-bold text-black hover:text-suelyn-pink transition-colors block py-2"
                >
                  Workshops
                </Link>
              </li>
              <li>
                <Link 
                  to="/foundation" 
                  onClick={closeNav}
                  className="font-montserrat text-2xl font-bold text-black hover:text-suelyn-pink transition-colors block py-2"
                >
                  Foundation
                </Link>
              </li>
            </ul>
          </nav>

          {/* Image Section */}
          <div className="mb-8">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/9ef2ef4ab7707f0aa3dc051ca846715a652746d4?width=1206"
              alt="Suzanna Griffiths"
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center pt-8 border-t border-black/20">
            <a href="#" className="text-black hover:text-suelyn-pink transition-colors">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.23 5.924a8.212 8.212 0 0 1-2.357.646 4.115 4.115 0 0 0 1.804-2.27 8.221 8.221 0 0 1-2.606.996A4.103 4.103 0 0 0 16.616 3c-2.27 0-4.103 1.834-4.103 4.103 0 .322.036.635.106.935a11.645 11.645 0 0 1-8.457-4.287 4.096 4.096 0 0 0-.556 2.063c0 1.424.724 2.679 1.825 3.415a4.066 4.066 0 0 1-1.859-.514v.052c0 1.988 1.414 3.647 3.292 4.023a4.109 4.109 0 0 1-1.853.07c.522 1.63 2.038 2.816 3.833 2.85A8.236 8.236 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531A8.35 8.35 0 0 0 22.23 5.924z" />
                </svg>
              </div>
            </a>
            <a href="#" className="text-black hover:text-suelyn-pink transition-colors">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </div>
            </a>
            <a href="#" className="text-black hover:text-suelyn-pink transition-colors">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 