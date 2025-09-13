import Header from '../components/Header';
import { useState, useMemo, useEffect } from 'react';
import { blogPosts, categories, BlogPost } from '../data/blog';
import Footer from './footer';

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
              backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0235.jpg?alt=media&token=a5612b0e-c68f-428f-8179-e9f4fdeee5ff)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%',
              // transform: `translateY(${scrollY * 0.5}px)`,
              // willChange: 'transform'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

      </section>


      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 mt-[1%]">
        <div className="relative z-10 text-center px-4 text-black">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center">
              <h1 className="font-charm text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[150px] 2xl:text-[250px] font-bold text-black leading-none mb-2 md:mb-4">
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
      <Footer />
    </div>
  );
}
