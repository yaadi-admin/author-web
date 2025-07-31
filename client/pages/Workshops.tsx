import Header from '../components/Header';

export default function Workshops() {
  return (
    <div className="bg-gradient-to-r from-[#F1E6DB] via-[#E0B2F1] to-[#FFE4EE]">
      <Header />
      
      {/* Hero Section with Central Portrait */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/7cf07593ce043b7a08e4f1ca3e188ae94e312d73?width=3838" 
            alt="Workshops Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F1E6DB]/30 via-[#E0B2F1]/20 to-[#FFE4EE]/10"></div>
        </div>

        {/* Central Portrait */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-8">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/9ef2ef4ab7707f0aa3dc051ca846715a652746d4?width=1206" 
              alt="Suzanna Griffiths"
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white shadow-lg"
            />
            
            {/* Small portrait photos around the main image */}
            <div className="absolute -top-4 -left-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/3bcb43c2d08f89a125bec53b49f9f6707b3f05df?width=941" 
                alt="Portrait 1"
                className="w-16 h-16 object-cover rounded-full border-2 border-white"
              />
            </div>
            <div className="absolute -top-4 -right-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/cb8827ce947c674e0b468cb798d4e8d61410fc29?width=383" 
                alt="Portrait 2"
                className="w-16 h-16 object-cover rounded-full border-2 border-white"
              />
            </div>
            <div className="absolute -bottom-4 -left-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/40d6bfce6b71d50c24fdb15e3287730608df80de?width=383" 
                alt="Portrait 3"
                className="w-16 h-16 object-cover rounded-full border-2 border-white"
              />
            </div>
            <div className="absolute -bottom-4 -right-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/1179b95de6107e5b5b214d0f2ee7366adaac0a3d?width=586" 
                alt="Portrait 4"
                className="w-16 h-16 object-cover rounded-full border-2 border-white"
              />
            </div>
          </div>

          {/* Curved Background with Text */}
          <div className="relative bg-[#F84988] rounded-t-[100px] px-12 py-16 text-center text-white max-w-2xl">
            <h1 className="font-playfair text-3xl md:text-4xl font-normal mb-2">
              My Upcoming
            </h1>
            <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
              Workshops
            </h2>
            <p className="font-montserrat text-lg md:text-xl leading-relaxed">
              Join transformative sessions designed to help you heal, grow, and step into your divine purpose. 
              Each workshop combines faith-based principles with practical tools for your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Workshops Listings Section */}
      <section className="py-24 px-4 bg-[#F1E6DB]">
        <div className="container mx-auto">
          <h2 className="font-playfair text-6xl md:text-7xl font-normal text-gray-700 text-center mb-16">
            Workshops
          </h2>
          
          <div className="space-y-16 max-w-4xl mx-auto">
            {/* Workshop 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/9ef2ef4ab7707f0aa3dc051ca846715a652746d4?width=1206" 
                  alt="Workshop 1"
                  className="w-24 h-24 object-cover rounded-full border-2 border-[#F84988]"
                />
              </div>
              <div className="flex-1">
                <div className="text-[#F84988] font-montserrat text-lg font-semibold mb-2">
                  October 10th, 2025
                </div>
                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  The Event Title Here
                </h3>
                <p className="font-montserrat text-lg text-gray-600 leading-relaxed mb-6">
                  A transformative workshop focused on healing past wounds and discovering your divine purpose. 
                  Join us for an intimate session of growth and empowerment.
                </p>
                <button className="bg-[#F84988] text-white px-6 py-3 rounded-lg hover:bg-[#e03a7a] transition-colors font-montserrat text-sm flex items-center gap-2">
                  See More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Workshop 2 - Coming Soon */}
            <div className="flex flex-col md:flex-row gap-8 items-start relative">
              <div className="flex-shrink-0">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/3bcb43c2d08f89a125bec53b49f9f6707b3f05df?width=941" 
                  alt="Workshop 2"
                  className="w-24 h-24 object-cover rounded-full border-2 border-[#F84988]"
                />
              </div>
              <div className="flex-1">
                <div className="text-[#F84988] font-montserrat text-lg font-semibold mb-2">
                  November 15th, 2025
                </div>
                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  This Event is Coming Soon
                </h3>
                <p className="font-montserrat text-lg text-gray-600 leading-relaxed mb-6">
                  An exciting new workshop focused on building resilience and overcoming life's challenges. 
                  Details coming soon - stay tuned for more information.
                </p>
                <button className="bg-[#F84988] text-white px-6 py-3 rounded-lg hover:bg-[#e03a7a] transition-colors font-montserrat text-sm flex items-center gap-2">
                  See More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Coming Soon Badge */}
              <div className="absolute -top-4 -right-4 bg-[#F84988] text-white px-4 py-2 rounded-full font-montserrat text-sm font-bold flex items-center gap-2 shadow-lg">
                <span>★</span>
                COMING SOON
                <span>★</span>
              </div>
            </div>

            {/* Workshop 3 - Coming Soon */}
            <div className="flex flex-col md:flex-row gap-8 items-start relative">
              <div className="flex-shrink-0">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/cb8827ce947c674e0b468cb798d4e8d61410fc29?width=383" 
                  alt="Workshop 3"
                  className="w-24 h-24 object-cover rounded-full border-2 border-[#F84988]"
                />
              </div>
              <div className="flex-1">
                <div className="text-[#F84988] font-montserrat text-lg font-semibold mb-2">
                  December 5th, 2025
                </div>
                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Another Amazing Workshop
                </h3>
                <p className="font-montserrat text-lg text-gray-600 leading-relaxed mb-6">
                  A special end-of-year workshop designed to help you reflect, reset, and prepare for the new year ahead. 
                  Join us for this powerful session of transformation.
                </p>
                <button className="bg-[#F84988] text-white px-6 py-3 rounded-lg hover:bg-[#e03a7a] transition-colors font-montserrat text-sm flex items-center gap-2">
                  See More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Coming Soon Badge */}
              <div className="absolute -top-4 -right-4 bg-[#F84988] text-white px-4 py-2 rounded-full font-montserrat text-sm font-bold flex items-center gap-2 shadow-lg">
                <span>★</span>
                COMING SOON
                <span>★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empowered Living Quote Section */}
      <section className="py-24 px-4 bg-gray-800 relative overflow-hidden">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="font-playfair text-8xl md:text-[200px] font-bold text-gray-600 whitespace-nowrap">
            Empowered Living Empow
          </span>
        </div>
        
        <div className="relative z-10 container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/9ef2ef4ab7707f0aa3dc051ca846715a652746d4?width=1206" 
              alt="Suzanna Griffiths"
              className="w-20 h-20 object-cover rounded-full mx-auto mb-8 border-4 border-white"
            />
            <h3 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              GROW, OVERCOME
            </h3>
            <p className="font-montserrat text-xl md:text-2xl text-white leading-relaxed mb-8 max-w-3xl mx-auto">
              This space is designed to help you heal from past wounds, discover your divine purpose, 
              and walk boldly in your calling. Every workshop is crafted with love and intention.
            </p>
            <p className="font-playfair text-2xl text-white font-semibold">
              - Suzanna Griffiths
            </p>
            
            {/* Navigation Arrows */}
            <div className="flex justify-center items-center gap-8 mt-12">
              <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Book Suzanna Section */}
      <section className="py-24 px-4 bg-[#F1E6DB] relative">
        {/* Curved Background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#F1E6DB] rounded-t-[100px]"></div>
        
        <div className="container mx-auto">
          <h2 className="font-playfair text-6xl md:text-7xl font-normal text-gray-700 text-center mb-16">
            Book Suzanna
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <p className="font-montserrat text-xl md:text-2xl text-gray-700 leading-relaxed">
                Ready to take the next step in your healing journey? Book a private session with Suzanna 
                for personalized guidance and support tailored to your specific needs and goals.
              </p>
              <p className="font-montserrat text-xl md:text-2xl text-gray-700 leading-relaxed">
                Whether you're seeking clarity on your purpose, working through past trauma, or ready to 
                step into your next season, Suzanna is here to walk alongside you.
              </p>
              <button className="bg-[#F84988] text-white px-8 py-4 rounded-lg hover:bg-[#e03a7a] transition-colors font-montserrat text-lg flex items-center gap-2">
                Get in touch
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="flex gap-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/f23911c57b35c55b16a3da69d3df3ad19cbde001?width=1240" 
                alt="Suzanna on couch"
                className="w-64 h-80 object-cover rounded-lg"
              />
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/3bcb43c2d08f89a125bec53b49f9f6707b3f05df?width=941" 
                alt="Suzanna portrait"
                className="w-32 h-32 object-cover rounded-full border-4 border-white self-end"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-24 px-4 bg-[#F84988]">
        <div className="container mx-auto text-center">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-8">
            GROW, OVERCOME, and get BACK UP
          </h2>
          <p className="font-montserrat text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto">
            Stay connected and receive updates about upcoming workshops, healing resources, and empowering content 
            delivered straight to your inbox.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="First Name"
              className="flex-1 bg-transparent border-b-2 border-white text-white placeholder-white/70 px-4 py-3 text-lg focus:outline-none focus:border-white"
            />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 bg-transparent border-b-2 border-white text-white placeholder-white/70 px-4 py-3 text-lg focus:outline-none focus:border-white"
            />
            <button className="bg-white text-[#F84988] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-montserrat text-lg font-semibold whitespace-nowrap">
              JOIN THE FUN
            </button>
          </div>
        </div>
      </section>

      {/* Photo Gallery/Footer Section */}
      <section className="py-16 px-4 bg-[#FFE4EE]">
        <div className="container mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-700 mb-12">
            GROW, OVERCOME, and get BACK UP
          </h2>
          
          {/* Photo Gallery */}
          <div className="flex justify-center gap-4 mb-16 overflow-x-auto">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <img
                key={index}
                src="https://api.builder.io/api/v1/image/assets/TEMP/9ef2ef4ab7707f0aa3dc051ca846715a652746d4?width=1206"
                alt={`Gallery ${index + 1}`}
                className="w-24 h-24 object-cover rounded-full border-2 border-[#F84988] flex-shrink-0"
              />
            ))}
          </div>
          
          {/* Footer */}
          <footer className="border-t border-gray-300 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Social Links */}
              <div className="flex gap-6">
                <a href="#" className="text-gray-600 hover:text-[#F84988] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#F84988] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#F84988] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#F84988] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right">
                <p className="font-montserrat text-sm text-gray-600">
                  © 2025 SueLyn Empowered Living. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
