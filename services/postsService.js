/**
 * Service for managing blog posts
 * Uses localStorage for persistence in this demo
 */

import allBlogs from '@/data/allBlogs';

// Default key for storing posts in localStorage
const POSTS_STORAGE_KEY = 'blog_posts';

// Get all posts from localStorage or use default data
export const getPosts = () => {
  if (typeof window === 'undefined') {
    return allBlogs;
  }
  
  try {
    const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
    // If posts exist in localStorage, return them, otherwise return default posts
    return storedPosts ? JSON.parse(storedPosts) : allBlogs;
  } catch (error) {
    console.error('Error getting posts:', error);
    return allBlogs;
  }
};

// Save all posts to localStorage
export const savePosts = (posts) => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
    return true;
  } catch (error) {
    console.error('Error saving posts:', error);
    return false;
  }
};

// Get a single post by ID
export const getPostById = (id) => {
  const posts = getPosts();
  return posts.find(post => post.id === id) || null;
};

// Add a new post
export const addPost = (post) => {
  const posts = getPosts();
  
  // Generate a new ID (highest ID + 1)
  const newId = Math.max(0, ...posts.map(p => p.id)) + 1;
  
  // Add current date if not provided
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const newPost = {
    ...post,
    id: newId,
    publishDate: post.publishDate || currentDate,
    timeRead: post.timeRead || `${Math.ceil(post.description.length / 600)} mins read`,
    isFeatured: post.isFeatured || false,
    isPopular: post.isPopular || false,
  };
  
  const updatedPosts = [...posts, newPost];
  const success = savePosts(updatedPosts);
  
  return success ? newPost : null;
};

// Update an existing post
export const updatePost = (id, updatedPost) => {
  const posts = getPosts();
  const index = posts.findIndex(post => post.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedPosts = [...posts];
  updatedPosts[index] = { ...updatedPosts[index], ...updatedPost };
  
  const success = savePosts(updatedPosts);
  return success ? updatedPosts[index] : null;
};

// Delete a post
export const deletePost = (id) => {
  const posts = getPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  
  if (filteredPosts.length === posts.length) {
    // No post was removed
    return false;
  }
  
  return savePosts(filteredPosts);
};

// Get posts by category
export const getPostsByCategory = (category) => {
  const posts = getPosts();
  return category ? posts.filter(post => post.category === category) : posts;
};

// Search posts by title or content
export const searchPosts = (query) => {
  if (!query) return getPosts();
  
  const posts = getPosts();
  const lowercaseQuery = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) || 
    post.description.toLowerCase().includes(lowercaseQuery)
  );
};

// Get featured posts
export const getFeaturedPosts = () => {
  const posts = getPosts();
  return posts.filter(post => post.isFeatured);
};

// Get popular posts
export const getPopularPosts = () => {
  const posts = getPosts();
  return posts.filter(post => post.isPopular);
};

// Toggle post status (featured, popular)
export const togglePostStatus = (id, statusKey) => {
  const post = getPostById(id);
  
  if (!post) {
    return null;
  }
  
  const updatedPost = { 
    ...post, 
    [statusKey]: !post[statusKey] 
  };
  
  return updatePost(id, updatedPost);
}; 