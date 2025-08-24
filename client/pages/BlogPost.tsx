import Header from '../components/Header';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostById, blogPosts, type BlogPost } from '../data/blog';
import { useState, useEffect } from 'react';
import Footer from './footer';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (id) {
      const foundPost = getBlogPostById(id);
      setPost(foundPost || null);
      
      // Get related posts (same category, excluding current post)
      if (foundPost) {
        const related = blogPosts
          .filter(p => p.id !== id && p.category === foundPost.category)
          .slice(0, 3);
        setRelatedPosts(related);
      }
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = (platform: string) => {
    if (!post) return;
    
    const url = window.location.href;
    const title = post.title;
    const text = post.excerpt;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (!post) {
    return (
      <div className="bg-gradient-to-r from-[#F1E6DB] via-[#E0B2F1] to-[#FFE4EE] min-h-screen">
        <Header whiteText={true} />
        <div className="flex items-center justify-center min-h-[60vh] pt-24">
          <div className="text-center">
            <h1 className="font-playfair text-4xl font-bold text-black mb-4">Post Not Found</h1>
            <p className="font-helvetica text-black/70 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="bg-[#F84988] text-white px-6 py-3 rounded-lg hover:bg-[#e03a7a] transition-colors font-helvetica">
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              backgroundImage: `url(${post.featuredImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.5}px)`,
              willChange: 'transform'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 text-white">
          <div className="max-w-4xl mx-auto">
            <span className="bg-[#F84988] text-white px-4 py-2 rounded-full text-sm font-helvetica font-semibold mb-6 inline-block">
              {post.category}
            </span>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              {post.title}
            </h1>
            <p className="font-helvetica text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-center gap-6">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-helvetica font-semibold">{post.author}</p>
                <p className="font-helvetica text-sm text-white/70">{formatDate(post.publishDate)} • {post.readTime}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Article Meta */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-black/10">
              <div className="flex items-center gap-4">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-helvetica font-semibold text-black">{post.author}</p>
                  <p className="font-helvetica text-sm text-black/70">{formatDate(post.publishDate)} • {post.readTime}</p>
                </div>
              </div>
              
              {/* Social Share Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-[#F84988] text-white rounded-full hover:bg-[#e03a7a] transition-colors"
                  title="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.23 5.924a8.212 8.212 0 0 1-2.357.646 4.115 4.115 0 0 0 1.804-2.27 8.221 8.221 0 0 1-2.606.996A4.103 4.103 0 0 0 16.616 3c-2.27 0-4.103 1.834-4.103 4.103 0 .322.036.635.106.935a11.645 11.645 0 0 1-8.457-4.287 4.096 4.096 0 0 0-.556 2.063c0 1.424.724 2.679 1.825 3.415a4.066 4.066 0 0 1-1.859-.514v.052c0 1.988 1.414 3.647 3.292 4.023a4.109 4.109 0 0 1-1.853.07c.522 1.63 2.038 2.816 3.833 2.85A8.236 8.236 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531A8.35 8.35 0 0 0 22.23 5.924z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-[#F84988] text-white rounded-full hover:bg-[#e03a7a] transition-colors"
                  title="Share on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 bg-[#F84988] text-white rounded-full hover:bg-[#e03a7a] transition-colors"
                  title="Share on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="p-2 bg-[#F84988] text-white rounded-full hover:bg-[#e03a7a] transition-colors"
                  title="Share via Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <div 
                className="font-helvetica text-lg leading-relaxed text-black [&>p]:mb-6 [&>p]:leading-relaxed [&>p]:text-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-black/10">
              <h3 className="font-playfair text-xl font-bold text-black mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-[#F84988]/10 text-[#F84988] px-3 py-1 rounded-full text-sm font-helvetica">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#F1E6DB]">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8">
              <div className="flex items-start gap-6">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-black mb-4">About {post.author}</h3>
                  <p className="font-helvetica text-black/70 leading-relaxed mb-4">
                    Suzanna Griffiths is a bold storyteller, certified leader, and faith-fueled mentor who has turned trials into testimonies. 
                    Through heartbreak, setbacks, and deep soul work, she discovered that pain doesn't disqualify you — it positions you.
                  </p>
                  <p className="font-helvetica text-black/70 leading-relaxed">
                    Now, she's made it her mission to remind women that their story is not over. You can be restored. You can realign. 
                    You can be reborn - again and again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-b from-[#F1E6DB] to-[#F1E6DB]">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-black leading-none mb-8">
                RELATED POSTS
              </h2>
              <p className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight max-w-4xl mx-auto">
                "Continue your journey of healing and growth."
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="group cursor-pointer">
                  <Link to={`/blog/${relatedPost.id}`} className="block">
                    <div className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                      <div className="relative">
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#F84988] text-white px-3 py-1 rounded-full text-sm font-helvetica font-semibold">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-playfair text-lg font-bold text-black mb-3 group-hover:text-[#F84988] transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="font-helvetica text-sm text-black/70 leading-relaxed mb-4 line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-black/50">
                          <span>{formatDate(relatedPost.publishDate)}</span>
                          <span>•</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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