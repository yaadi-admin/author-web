import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, getDoc, query, where, orderBy } from 'firebase/firestore';
import firebase from '../lib/firebase';

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

// Firestore collection reference
const blogsCollection = collection(firebase.firestore, 'blogs');

// Cache for blog posts to improve performance
let blogPostsCache: BlogPost[] = [];
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to check if cache is valid
const isCacheValid = (): boolean => {
  return Date.now() - lastFetchTime < CACHE_DURATION;
};


export const categories = [
  "All",
  "Healing",
  "Purpose",
  "Courage",
  "Relationships",
  "Authenticity"
];

// Firestore functions for managing blog posts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    if (isCacheValid() && blogPostsCache.length > 0) {
      return blogPostsCache;
    }

    const q = query(blogsCollection, orderBy('publishDate', 'desc'));
    const querySnapshot = await getDocs(q);
    const posts: BlogPost[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        ...data
      } as BlogPost);
    });
    
    blogPostsCache = posts;
    lastFetchTime = Date.now();
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return blogPostsCache; // Return cached data if available
  }
};

export const getBlogPostById = async (id: string): Promise<BlogPost | undefined> => {
  try {
    const docRef = doc(firebase.firestore, 'blogs', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as BlogPost;
    }
    return undefined;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return undefined;
  }
};

export const getFeaturedPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(blogsCollection, where('featured', '==', true), orderBy('publishDate', 'desc'));
    const querySnapshot = await getDocs(q);
    const posts: BlogPost[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        ...data
      } as BlogPost);
    });
    
    return posts;
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
};

export const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    if (category === "All") {
      return await getAllBlogPosts();
    }
    
    const q = query(blogsCollection, where('category', '==', category), orderBy('publishDate', 'desc'));
    const querySnapshot = await getDocs(q);
    const posts: BlogPost[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        ...data
      } as BlogPost);
    });
    
    return posts;
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
};

// Admin functions for managing blog posts
export const addBlogPost = async (newPost: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
  try {
    const docRef = await addDoc(blogsCollection, newPost);
    const createdPost = {
      id: docRef.id,
      ...newPost
    };
    
    // Update cache
    blogPostsCache = [createdPost, ...blogPostsCache];
    
    return createdPost;
  } catch (error) {
    console.error('Error adding blog post:', error);
    throw error;
  }
};

export const updateBlogPost = async (updatedPost: BlogPost): Promise<BlogPost> => {
  try {
    const docRef = doc(firebase.firestore, 'blogs', updatedPost.id);
    const { id, ...updateData } = updatedPost;
    
    await updateDoc(docRef, updateData);
    
    // Update cache
    const index = blogPostsCache.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      blogPostsCache[index] = updatedPost;
    }
    
    return updatedPost;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

export const deleteBlogPost = async (postId: string): Promise<void> => {
  try {
    const docRef = doc(firebase.firestore, 'blogs', postId);
    await deleteDoc(docRef);
    
    // Update cache
    blogPostsCache = blogPostsCache.filter(post => post.id !== postId);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

// Legacy exports for backward compatibility - these now return async data
export const blogPosts = getAllBlogPosts();

// For real-time updates in the admin interface
export const setBlogPosts = (posts: BlogPost[]): void => {
  blogPostsCache = posts;
  lastFetchTime = Date.now();
}; 