import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { z } from "zod";
import firebase from "../lib/firebase";

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
  galleryImages?: string[];
}

const blogsCollection = collection(firebase.firestore, "blogs");

const blogPostSchema = z.object({
  title: z.string().default(""),
  excerpt: z.string().default(""),
  content: z.string().default(""),
  author: z.string().default(""),
  authorImage: z.string().default(""),
  publishDate: z.string().default(""),
  readTime: z.string().default(""),
  category: z.string().default("Healing"),
  tags: z.array(z.string()).catch([]),
  featuredImage: z.string().default(""),
  featured: z.boolean().catch(false),
  galleryImages: z.array(z.string()).catch([]),
});

let blogPostsCache: BlogPost[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

const isCacheValid = (): boolean => Date.now() - lastFetchTime < CACHE_DURATION;

const sortBlogPosts = (posts: BlogPost[]): BlogPost[] =>
  [...posts].sort(
    (left, right) =>
      new Date(right.publishDate).getTime() - new Date(left.publishDate).getTime(),
  );

const sanitizeId = (value?: string): string => {
  if (!value) return "";
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
};

const normalizeBlogPost = (documentId: string, data: unknown): BlogPost | null => {
  const parsed = blogPostSchema.safeParse(data);
  if (!parsed.success) {
    console.warn(`Skipping invalid blog post document: ${documentId}`, parsed.error.flatten());
    return null;
  }

  return {
    id: documentId,
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    author: parsed.data.author,
    authorImage: parsed.data.authorImage,
    publishDate: parsed.data.publishDate,
    readTime: parsed.data.readTime,
    category: parsed.data.category,
    tags: parsed.data.tags,
    featuredImage: parsed.data.featuredImage,
    featured: parsed.data.featured,
    galleryImages: parsed.data.galleryImages,
  };
};

export const categories = [
  "All",
  "Healing",
  "Purpose",
  "Courage",
  "Relationships",
  "Authenticity",
];

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    if (isCacheValid() && blogPostsCache.length > 0) {
      return blogPostsCache;
    }

    const querySnapshot = await getDocs(query(blogsCollection, orderBy("publishDate", "desc")));
    const posts: BlogPost[] = [];

    querySnapshot.forEach((document) => {
      const post = normalizeBlogPost(document.id, document.data());
      if (post) {
        posts.push(post);
      }
    });

    blogPostsCache = sortBlogPosts(posts);
    lastFetchTime = Date.now();
    return blogPostsCache;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return blogPostsCache;
  }
};

export const getBlogPostById = async (id: string): Promise<BlogPost | undefined> => {
  try {
    const docSnap = await getDoc(doc(firebase.firestore, "blogs", id));

    if (!docSnap.exists()) {
      return undefined;
    }

    return normalizeBlogPost(docSnap.id, docSnap.data()) ?? undefined;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return undefined;
  }
};

export const getFeaturedPosts = async (): Promise<BlogPost[]> => {
  try {
    const querySnapshot = await getDocs(
      query(blogsCollection, where("featured", "==", true), orderBy("publishDate", "desc")),
    );
    const posts: BlogPost[] = [];

    querySnapshot.forEach((document) => {
      const post = normalizeBlogPost(document.id, document.data());
      if (post) {
        posts.push(post);
      }
    });

    return sortBlogPosts(posts);
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return (await getAllBlogPosts()).filter((post) => post.featured);
  }
};

export const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    if (category === "All") {
      return await getAllBlogPosts();
    }

    const querySnapshot = await getDocs(
      query(blogsCollection, where("category", "==", category), orderBy("publishDate", "desc")),
    );
    const posts: BlogPost[] = [];

    querySnapshot.forEach((document) => {
      const post = normalizeBlogPost(document.id, document.data());
      if (post) {
        posts.push(post);
      }
    });

    return sortBlogPosts(posts);
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return (await getAllBlogPosts()).filter((post) => post.category === category);
  }
};

export const addBlogPost = async (
  newPost: Omit<BlogPost, "id"> & { id?: string },
): Promise<BlogPost> => {
  try {
    const preferredId = sanitizeId(newPost.id);
    const docRef = preferredId
      ? doc(firebase.firestore, "blogs", preferredId)
      : doc(blogsCollection);

    if (preferredId) {
      const existing = await getDoc(docRef);
      if (existing.exists()) {
        throw new Error(
          "A blog post with this URL already exists. Please choose another title or ID.",
        );
      }
    }

    const payload: BlogPost = {
      ...newPost,
      id: docRef.id,
      galleryImages: newPost.galleryImages || [],
    };

    await setDoc(docRef, payload);

    blogPostsCache = sortBlogPosts([
      ...blogPostsCache.filter((post) => post.id !== payload.id),
      payload,
    ]);
    lastFetchTime = Date.now();

    return payload;
  } catch (error) {
    console.error("Error adding blog post:", error);
    throw error;
  }
};

export const updateBlogPost = async (updatedPost: BlogPost): Promise<BlogPost> => {
  try {
    const docRef = doc(firebase.firestore, "blogs", updatedPost.id);
    const { id, ...updateData } = updatedPost;
    await setDoc(
      docRef,
      { ...updateData, id, galleryImages: updateData.galleryImages || [] },
      { merge: true },
    );

    const index = blogPostsCache.findIndex((post) => post.id === updatedPost.id);
    if (index !== -1) {
      blogPostsCache[index] = updatedPost;
      blogPostsCache = sortBlogPosts(blogPostsCache);
    }
    lastFetchTime = Date.now();

    return updatedPost;
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
};

export const deleteBlogPost = async (postId: string): Promise<void> => {
  try {
    await deleteDoc(doc(firebase.firestore, "blogs", postId));

    blogPostsCache = blogPostsCache.filter((post) => post.id !== postId);
    lastFetchTime = Date.now();
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
};
