import Header from '../components/Header';
import { useState, useMemo, useEffect } from 'react';
import { blogPosts, categories, BlogPost } from '../data/blog';

export default function Blog() {
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    let posts = selectedCategory === 'All' 
      ? blogPosts 
      : blogPosts.filter(post => post.category === selectedCategory);
    
    if (searchQuery) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return posts;
  }, [selectedCategory, searchQuery]);

  const featuredPosts = useMemo(() => {
    return blogPosts.filter(post => post.featured);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-gradient-to-r from-[#F1E6DB] via-[#E0B2F1] to-[#FFE4EE]">
      <Header whiteText={true} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Hero Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 w-full h-[120%] transform -translate-y-[10%]"
            style={{
              backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-07-20-15-57-01.jpg?alt=media&token=d42bae63-e21c-4399-af29-15dfffa22460)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.5}px)`,
              willChange: 'transform'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

      </section>


      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 mt-[-15%] sm:mt-[-12%] md:mt-[-15%] lg:mt-[-20%] xl:mt-[-15%]">
        <div className="relative z-10 text-center px-4 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center">
              <h1 className="font-charm text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[150px] 2xl:text-[250px] font-bold text-white leading-none mb-2 md:mb-4">
                Blog
              </h1>
            </div>
            <h2 className="font-league-spartan text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-5xl pt-2 font-normal text-black sm:ml-[-10%] md:ml-[-20%] lg:ml-[-30%] xl:ml-[-40%] 2xl:ml-[-60%] sm:mt-[-1%] md:mt-[-2%] lg:mt-[-3%] xl:mt-[-4%] 2xl:mt-[-6%]">
              Empowered Living
            </h2>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-t from-[#FFE4EE] via-[#FFE4EE] to-[#FFE4EE] h-[20vh] mt-[-20%] pb-[20%]"></section>

      {/* Featured Posts Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-black leading-none mb-8">
              FEATURED POSTS
            </h2>
            <p className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight max-w-4xl mx-auto">
              "Words that heal, inspire, and transform your journey to wholeness."
            </p>
          </div>

          {/* Featured Posts Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredPosts.map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <a href={`/blog/${post.id}`} className="block">
                  <div className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                    <div className="relative">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#F84988] text-white px-3 py-1 rounded-full text-sm font-helvetica font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={post.authorImage}
                          alt={post.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-helvetica text-sm text-black/70">{post.author}</p>
                          <p className="font-helvetica text-xs text-black/50">{formatDate(post.publishDate)} • {post.readTime}</p>
                        </div>
                      </div>
                      <h3 className="font-playfair text-xl md:text-2xl font-bold text-black mb-3 group-hover:text-[#F84988] transition-colors">
                        {post.title}
                      </h3>
                      <p className="font-helvetica text-black/70 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="bg-[#F84988]/10 text-[#F84988] px-2 py-1 rounded text-xs font-helvetica">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#F1E6DB]">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/50 backdrop-blur-sm border border-black/20 rounded-lg px-4 py-3 pl-10 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#F84988] focus:border-transparent"
                />
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-helvetica text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#F84988] text-white'
                      : 'bg-white/50 text-black hover:bg-white/70'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Posts Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#F1E6DB] to-[#F1E6DB]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-black leading-none mb-8">
              ALL POSTS
            </h2>
            <p className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight max-w-4xl mx-auto">
              {filteredPosts.length} articles found
            </p>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div key={post.id} className="group cursor-pointer">
                  <a href={`/blog/${post.id}`} className="block">
                    <div className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                      <div className="relative">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#F84988] text-white px-3 py-1 rounded-full text-sm font-helvetica font-semibold">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-helvetica text-xs text-black/70">{post.author}</p>
                            <p className="font-helvetica text-xs text-black/50">{formatDate(post.publishDate)} • {post.readTime}</p>
                          </div>
                        </div>
                        <h3 className="font-playfair text-lg md:text-xl font-bold text-black mb-3 group-hover:text-[#F84988] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="font-helvetica text-sm text-black/70 leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="bg-[#F84988]/10 text-[#F84988] px-2 py-1 rounded text-xs font-helvetica">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 text-black/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="font-playfair text-xl font-bold text-black mb-2">No articles found</h3>
                <p className="font-helvetica text-black/70">Try adjusting your search or filter criteria.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#F1E6DB] to-[#FFE4EE]">
        <div className="container mx-auto text-center">
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-black leading-none mb-8">
            STAY CONNECTED
          </h2>
          <p className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight max-w-4xl mx-auto mb-12">
            "Get the latest articles, healing resources, and empowering content delivered to your inbox."
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="First Name"
              className="flex-1 bg-white/50 backdrop-blur-sm border border-black/20 rounded-lg px-6 py-4 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#F84988]"
            />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 bg-white/50 backdrop-blur-sm border border-black/20 rounded-lg px-6 py-4 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#F84988]"
            />
            <button className="bg-[#F84988] text-white px-8 py-4 rounded-lg hover:bg-[#e03a7a] transition-colors font-helvetica text-lg font-semibold whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-16 bg-gradient-to-b from-[#F84988] to-[#FFAC24]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Social Links */}
            <div className="flex gap-6">
              <a href="#" className="text-black hover:text-suelyn-pink transition-colors">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.23 5.924a8.212 8.212 0 0 1-2.357.646 4.115 4.115 0 0 0 1.804-2.27 8.221 8.221 0 0 1-2.606.996A4.103 4.103 0 0 0 16.616 3c-2.27 0-4.103 1.834-4.103 4.103 0 .322.036.635.106.935a11.645 11.645 0 0 1-8.457-4.287 4.096 4.096 0 0 0-.556 2.063c0 1.424.724 2.679 1.825 3.415a4.066 4.066 0 0 1-1.859-.514v.052c0 1.988 1.414 3.647 3.292 4.023a4.109 4.109 0 0 1-1.853.07c.522 1.63 2.038 2.816 3.768 2.85A8.236 8.236 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531A8.35 8.35 0 0 0 22.23 5.924z" />
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

            {/* Copyright */}
            <div className="text-center">
              <p className="font-jost text-sm font-bold text-black uppercase tracking-wider">
                © 2025 <span className="text-suelyn-purple">SueLyn Empowered Living</span>. All rights reserved
              </p>
            </div>

            {/* Design Credit */}
            <div className="text-right">
              <p className="font-jost text-sm font-bold text-black uppercase tracking-wider">
                Designed by <span className="text-suelyn-purple">Narro: Web Services</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
