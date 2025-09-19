export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage: string;
  featured: boolean;
}

// This will store the blog posts in memory for demo purposes
// In a real application, this would be managed by a backend/database
let blogPostsData: BlogPost[] = [
  {
    id: "healing-from-past-wounds",
    title: "Healing From Past Wounds: A Journey to Wholeness",
    excerpt: "Discover how to transform your pain into purpose and find healing in the midst of brokenness. This is your invitation to begin the journey of restoration.",
    content: `
      <p class="mb-6">Life has a way of leaving us with scars that run deeper than the surface. Whether it's the pain of betrayal, the weight of abandonment, or the echoes of words that cut like knives, these wounds have a way of shaping who we become.</p>
      
      <p class="mb-6">But here's the truth I've discovered through my own journey: your pain doesn't have to be your prison. In fact, it can become your pathway to purpose.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">The First Step: Acknowledging the Pain</h2>
      
      <p class="mb-6">Healing begins with honesty. We must be willing to look at our wounds with courage, not shame. Too often, we try to bury our pain beneath busyness, achievements, or even spiritual platitudes. But healing requires us to sit with our brokenness and acknowledge its presence.</p>
      
      <p class="mb-6">When I first began my healing journey, I was terrified of what I might find if I truly looked at my pain. What if I discovered I was too broken to be fixed? What if the wounds ran too deep?</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Finding Your Voice in the Silence</h2>
      
      <p class="mb-6">One of the most powerful steps in healing is learning to speak your truth. For so long, many of us have been silenced—by others, by circumstances, or by our own fear. But your voice matters. Your story matters.</p>
      
      <p class="mb-6">Start small. Write in a journal. Speak to a trusted friend. Pray honest prayers. Let your voice be heard, even if it's just by you at first.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">The Power of Reframing</h2>
      
      <p class="mb-6">Here's what I've learned: your past doesn't define you, but it does refine you. Every trial, every heartbreak, every disappointment has the potential to make you stronger, wiser, and more compassionate.</p>
      
      <p class="mb-6">Instead of asking "Why did this happen to me?" try asking "What can I learn from this?" and "How can I use this experience to help others?"</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Building a Foundation of Truth</h2>
      
      <p class="mb-6">Healing requires a solid foundation. For me, that foundation is built on God's truth about who I am. When the lies of the enemy try to tell me I'm not enough, I remind myself of what God says about me.</p>
      
      <p class="mb-6">You are loved. You are chosen. You are enough. You are worthy of healing and wholeness.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">The Journey Continues</h2>
      
      <p class="mb-6">Healing is not a destination; it's a journey. Some days will be easier than others. Some wounds may take longer to heal than others. But every step forward is progress.</p>
      
      <p class="mb-6">Remember, you don't have to do this alone. God is with you every step of the way, and there are people who want to walk alongside you in your healing journey.</p>
      
      <p class="mb-6">Your healing is holy. Your voice is needed. Your purpose is still alive.</p>
      
      <p class="italic text-lg mt-8">With love and hope,<br>Suzanna</p>
    `,
    author: "Suzanna Griffiths",
    authorImage: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0178.jpg?alt=media&token=41ee0dfd-8d7f-447d-964d-27939d20834a",
    publishDate: "2025-01-15",
    readTime: "8 min read",
    category: "Healing",
    tags: ["healing", "purpose", "transformation", "faith"],
    featuredImage: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0178.jpg?alt=media&token=41ee0dfd-8d7f-447d-964d-27939d20834a",
    featured: true
  },
  {
    id: "finding-your-divine-purpose",
    title: "Finding Your Divine Purpose: Beyond the World's Definition",
    excerpt: "Your purpose isn't found in titles, achievements, or what others think you should be. It's discovered in the quiet moments of surrender and the bold steps of faith.",
    content: `
      <p class="mb-6">For years, I chased after what I thought was my purpose. I pursued degrees, climbed corporate ladders, and tried to fit into molds that were never meant for me. I was searching for my purpose in all the wrong places.</p>
      
      <p class="mb-6">It wasn't until I stopped striving and started surrendering that I began to understand what true purpose looks like.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">The World's Definition vs. God's Design</h2>
      
      <p class="mb-6">The world tells us that purpose is found in success, wealth, recognition, and achievement. But God's definition of purpose is so much deeper and more meaningful.</p>
      
      <p class="mb-6">Your purpose is not about what you do, but about who you become. It's about the impact you have on others, the love you share, and the light you bring into dark places.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Listening to the Still, Small Voice</h2>
      
      <p class="mb-6">Finding your purpose begins with learning to hear God's voice above all the noise. In the quiet moments of prayer, meditation, and reflection, God speaks to our hearts about the unique calling He has placed on our lives.</p>
      
      <p class="mb-6">For me, this meant spending time in solitude, journaling my thoughts and feelings, and being open to the ways God was leading me.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Your Pain Points Your Purpose</h2>
      
      <p class="mb-6">Often, your purpose is hidden in your pain. The very things that have hurt you the most can become the foundation of your calling to help others.</p>
      
      <p class="mb-6">My own experiences with heartbreak, betrayal, and feeling lost became the catalyst for my ministry of helping others heal and find their way back to wholeness.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Walking in Faith, Not Fear</h2>
      
      <p class="mb-6">Purpose requires faith. It means stepping into the unknown, trusting that God will provide what you need when you need it.</p>
      
      <p class="mb-6">When I first felt called to write and speak about healing, I was terrified. Who was I to think I could help others? But God doesn't call the qualified; He qualifies the called.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Your Purpose is Alive and Growing</h2>
      
      <p class="mb-6">Your purpose is not static; it evolves and grows as you do. What God calls you to today may look different from what He calls you to tomorrow.</p>
      
      <p class="mb-6">Stay open to the ways God wants to use you. Be willing to step into new seasons and new opportunities as they arise.</p>
      
      <p class="mb-6">Remember, your purpose is not about perfection. It's about faithfulness, obedience, and love.</p>
      
      <p class="italic text-lg mt-8">With purpose and passion,<br>Suzanna</p>
    `,
    author: "Suzanna Griffiths",
    authorImage: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0178.jpg?alt=media&token=41ee0dfd-8d7f-447d-964d-27939d20834a",
    publishDate: "2025-01-10",
    readTime: "6 min read",
    category: "Purpose",
    tags: ["purpose", "faith", "calling", "transformation"],
    featuredImage: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-12%20at%2011.15.23.jpeg?alt=media&token=dda25c8d-55da-4ba9-aa4d-2dd531d5ad04",
    featured: true
  },
  {
    id: "overcoming-fear-and-doubt",
    title: "Overcoming Fear and Doubt: Stepping Into Your Boldest Self",
    excerpt: "Fear and doubt are not signs of weakness—they're invitations to grow stronger. Learn how to face them head-on and emerge victorious.",
    content: `
      <p class="mb-6">Fear has a way of paralyzing us, keeping us stuck in places we've outgrown and preventing us from stepping into the fullness of who we're called to be.</p>
      
      <p class="mb-6">But here's what I've learned: fear is not your enemy. It's your teacher.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Understanding the Root of Fear</h2>
      
      <p class="mb-6">Fear often stems from past experiences, limiting beliefs, or the unknown. We fear rejection, failure, judgment, and the possibility that we might not be enough.</p>
      
      <p class="mb-6">But fear is also a sign that you're on the right track. If you're not afraid, you're probably not growing.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">The Power of "What If"</h2>
      
      <p class="mb-6">Instead of asking "What if I fail?" try asking "What if I succeed?" "What if this is exactly what I'm supposed to do?" "What if my story helps someone else?"</p>
      
      <p class="mb-6">The questions we ask ourselves shape our reality. Choose questions that empower you rather than limit you.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Taking Action Despite Fear</h2>
      
      <p class="mb-6">Courage is not the absence of fear; it's taking action despite fear. Every time you step out in faith, you're building your courage muscle.</p>
      
      <p class="mb-6">Start small. Take one step today that scares you. Then take another step tomorrow. Before you know it, you'll be walking boldly in your purpose.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Surrounding Yourself with Support</h2>
      
      <p class="mb-6">You don't have to face your fears alone. Surround yourself with people who believe in you, encourage you, and remind you of your strength.</p>
      
      <p class="mb-6">Find a mentor, join a community, or connect with others who are on similar journeys. We're stronger together.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Trusting the Process</h2>
      
      <p class="mb-6">Growth takes time. Be patient with yourself as you work through your fears and doubts. Every step forward is progress.</p>
      
      <p class="mb-6">Remember, you are stronger than you think, braver than you believe, and more capable than you know.</p>
      
      <p class="italic text-lg mt-8">With courage and love,<br>Suzanna</p>
    `,
    author: "Suzanna Griffiths",
    authorImage: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0178.jpg?alt=media&token=41ee0dfd-8d7f-447d-964d-27939d20834a",
    publishDate: "2025-01-05",
    readTime: "5 min read",
    category: "Courage",
    tags: ["courage", "fear", "growth", "faith"],
    featuredImage: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0178.jpg?alt=media&token=41ee0dfd-8d7f-447d-964d-27939d20834a",
    featured: false
  },
  {
    id: "building-resilient-relationships",
    title: "Building Resilient Relationships: Love, Trust, and Growth",
    excerpt: "Healthy relationships require work, but they're worth it. Learn how to build connections that withstand life's storms and grow stronger over time.",
    content: `
      <p class="mb-6">Relationships are the foundation of our lives. They shape us, challenge us, and help us grow into the people we're meant to become.</p>
      
      <p class="mb-6">But building healthy, resilient relationships takes intentionality, vulnerability, and a commitment to growth.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">The Foundation of Trust</h2>
      
      <p class="mb-6">Trust is the cornerstone of any healthy relationship. It's built through consistent actions, honest communication, and a commitment to keeping your word.</p>
      
      <p class="mb-6">Trust takes time to build but can be broken in an instant. Choose your words and actions carefully.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Communication: The Bridge to Understanding</h2>
      
      <p class="mb-6">Healthy communication is about more than just talking. It's about listening, understanding, and being willing to see things from another person's perspective.</p>
      
      <p class="mb-6">Practice active listening. Ask questions. Share your feelings honestly but kindly. Remember, it's not about winning arguments; it's about understanding each other.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Boundaries: Love with Limits</h2>
      
      <p class="mb-6">Love doesn't mean saying yes to everything. Healthy relationships require healthy boundaries.</p>
      
      <p class="mb-6">Boundaries protect your heart, your time, and your energy. They're not walls; they're guidelines for how you want to be treated.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Growth Together</h2>
      
      <p class="mb-6">The best relationships are those where both people are committed to growth—individually and together.</p>
      
      <p class="mb-6">Support each other's dreams, celebrate each other's victories, and encourage each other during difficult times.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Forgiveness and Grace</h2>
      
      <p class="mb-6">No relationship is perfect. There will be misunderstandings, hurt feelings, and mistakes. The key is forgiveness and grace.</p>
      
      <p class="mb-6">Be quick to apologize and quick to forgive. Remember that we're all works in progress.</p>
      
      <p class="italic text-lg mt-8">With love and wisdom,<br>Suzanna</p>
    `,
    author: "Suzanna Griffiths",
    authorImage: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0178.jpg?alt=media&token=41ee0dfd-8d7f-447d-964d-27939d20834a",
    publishDate: "2024-12-28",
    readTime: "7 min read",
    category: "Relationships",
    tags: ["relationships", "love", "communication", "growth"],
    featuredImage: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0178.jpg?alt=media&token=41ee0dfd-8d7f-447d-964d-27939d20834a",
    featured: false
  },
  {
    id: "embracing-your-authentic-self",
    title: "Embracing Your Authentic Self: The Power of Being You",
    excerpt: "Stop trying to be who others want you to be. Your authentic self is your greatest gift to the world.",
    content: `
      <p class="mb-6">For years, I tried to be everything to everyone. I wore different masks for different people, hoping that if I could just be what they wanted me to be, I would finally be accepted and loved.</p>
      
      <p class="mb-6">But that approach left me exhausted, empty, and disconnected from who I really was.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">The Cost of Hiding</h2>
      
      <p class="mb-6">When we hide our true selves, we rob the world of our unique gifts, perspectives, and contributions. We also rob ourselves of the joy and fulfillment that comes from living authentically.</p>
      
      <p class="mb-6">The truth is, you were created to be you. No one else can be you, and you can't be anyone else.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Discovering Your True Self</h2>
      
      <p class="mb-6">Authenticity begins with self-discovery. Take time to explore your values, passions, strengths, and weaknesses.</p>
      
      <p class="mb-6">What brings you joy? What makes you feel alive? What are you passionate about? These are clues to your authentic self.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">The Courage to Be Different</h2>
      
      <p class="mb-6">Being authentic means being willing to be different. It means standing out, not fitting in. It requires courage and confidence.</p>
      
      <p class="mb-6">Remember, the people who matter will love you for who you are, not for who you pretend to be.</p>
      
      <h2 class="text-2xl font-playfair font-bold mb-4 mt-8">Living Your Truth</h2>
      
      <p class="mb-6">Authenticity is not about being perfect. It's about being real. It's about showing up as your true self, flaws and all.</p>
      
      <p class="mb-6">When you live authentically, you give others permission to do the same. Your courage becomes their courage.</p>
      
      <p class="italic text-lg mt-8">With authenticity and love,<br>Suzanna</p>
    `,
    author: "Suzanna Griffiths",
    authorImage: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0178.jpg?alt=media&token=41ee0dfd-8d7f-447d-964d-27939d20834a",
    publishDate: "2024-12-20",
    readTime: "6 min read",
    category: "Authenticity",
    tags: ["authenticity", "self-love", "courage", "identity"],
    featuredImage: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0178.jpg?alt=media&token=41ee0dfd-8d7f-447d-964d-27939d20834a",
    featured: false
  }
];

export const blogPosts: BlogPost[] = blogPostsData;

export const categories = [
  "All",
  "Healing",
  "Purpose",
  "Courage",
  "Relationships",
  "Authenticity"
];

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === "All") return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

// Admin functions for managing blog posts
export const addBlogPost = (newPost: BlogPost): void => {
  blogPostsData.unshift(newPost); // Add to beginning of array
};

export const updateBlogPost = (updatedPost: BlogPost): void => {
  const index = blogPostsData.findIndex(post => post.id === updatedPost.id);
  if (index !== -1) {
    blogPostsData[index] = updatedPost;
  }
};

export const deleteBlogPost = (postId: string): void => {
  const index = blogPostsData.findIndex(post => post.id === postId);
  if (index !== -1) {
    blogPostsData.splice(index, 1);
  }
};

export const getAllBlogPosts = (): BlogPost[] => {
  return [...blogPostsData];
};

// For real-time updates in the admin interface
export const setBlogPosts = (posts: BlogPost[]): void => {
  blogPostsData.length = 0; // Clear array
  blogPostsData.push(...posts); // Add new posts
}; 