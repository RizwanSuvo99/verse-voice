/**
 * Service for managing blog categories
 * Uses localStorage for persistence in this demo
 */

import { getPosts, savePosts } from './postsService';

// Default key for storing categories in localStorage
const CATEGORIES_STORAGE_KEY = 'blog_categories';

// Extract unique categories from all blog posts
const extractCategoriesFromPosts = () => {
  const posts = getPosts();
  const categoryMap = new Map();

  posts.forEach(post => {
    if (post.category) {
      const catName = post.category;
      if (!categoryMap.has(catName)) {
        // Get a sample image from the first post in this category
        const categoryImg = post.categoryImg || '';
        // Count posts in this category
        const postCount = posts.filter(p => p.category === catName).length;
        
        categoryMap.set(catName, {
          id: Date.now() + Math.floor(Math.random() * 1000),
          name: catName,
          slug: catName.toLowerCase().replace(/\s+/g, '-'),
          color: getRandomColor(),
          posts: postCount,
          image: categoryImg
        });
      }
    }
  });

  return Array.from(categoryMap.values());
};

// Helper function to generate a random color
const getRandomColor = () => {
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#F39C12', '#8E44AD', 
    '#1ABC9C', '#E74C3C', '#3498DB', '#9B59B6', '#2ECC71', 
    '#D35400', '#F1C40F', '#C0392B', '#2980B9', '#E67E22', 
    '#27AE60', '#F0E68C', '#DA70D6'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Get all categories from localStorage or extract from posts
export const getCategories = () => {
  if (typeof window === 'undefined') {
    return extractCategoriesFromPosts();
  }
  
  try {
    const storedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    
    // If categories exist in localStorage, return them
    if (storedCategories) {
      return JSON.parse(storedCategories);
    }
    
    // Otherwise extract them from posts and save
    const categories = extractCategoriesFromPosts();
    saveCategories(categories);
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    return extractCategoriesFromPosts();
  }
};

// Save all categories to localStorage
export const saveCategories = (categories) => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    return true;
  } catch (error) {
    console.error('Error saving categories:', error);
    return false;
  }
};

// Get a single category by ID
export const getCategoryById = (id) => {
  const categories = getCategories();
  return categories.find(category => category.id === id) || null;
};

// Get a single category by slug
export const getCategoryBySlug = (slug) => {
  const categories = getCategories();
  return categories.find(category => category.slug === slug) || null;
};

// Add a new category
export const addCategory = (category) => {
  const categories = getCategories();
  
  // Check if category with the same name already exists
  if (categories.some(c => c.name.toLowerCase() === category.name.toLowerCase())) {
    return null; // Category already exists
  }
  
  const newCategory = {
    ...category,
    id: Date.now(),
    posts: 0, // New category has no posts yet
    slug: category.slug || category.name.toLowerCase().replace(/\s+/g, '-'),
    image: category.image || '/assets/category-default.jpg' // Ensure image property exists
  };
  
  const updatedCategories = [...categories, newCategory];
  const success = saveCategories(updatedCategories);
  
  return success ? newCategory : null;
};

// Update an existing category
export const updateCategory = (id, updatedCategory) => {
  const categories = getCategories();
  const index = categories.findIndex(category => category.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const oldCategory = categories[index];
  
  // Ensure image is preserved if not being updated
  if (!updatedCategory.image && oldCategory.image) {
    updatedCategory.image = oldCategory.image;
  }
  
  const updatedCategories = [...categories];
  updatedCategories[index] = { ...oldCategory, ...updatedCategory };
  
  // If name changed, update all posts with the old category name
  if (oldCategory.name !== updatedCategories[index].name) {
    updatePostCategories(oldCategory.name, updatedCategories[index].name);
  }
  
  // Save the updated categories
  const success = saveCategories(updatedCategories);
  
  return success ? updatedCategories[index] : null;
};

// Update the category name in all posts
const updatePostCategories = (oldName, newName) => {
  if (oldName === newName) return false;
  
  console.log(`Updating posts from category "${oldName}" to "${newName}"`);
  
  const posts = getPosts();
  let updatedCount = 0;
  
  // Update category in all posts
  const updatedPosts = posts.map(post => {
    if (post.category === oldName) {
      updatedCount++;
      console.log(`Updating post "${post.title}" (ID: ${post.id}) from category "${oldName}" to "${newName}"`);
      return { ...post, category: newName };
    }
    return post;
  });
  
  // Save the updated posts
  if (updatedCount > 0) {
    console.log(`Updated ${updatedCount} posts from category "${oldName}" to "${newName}"`);
    savePosts(updatedPosts);
    return true;
  } else {
    console.log(`No posts found in category "${oldName}" to update`);
    return false;
  }
};

// Delete a category
export const deleteCategory = (id) => {
  const categories = getCategories();
  const categoryToDelete = categories.find(category => category.id === id);
  
  if (!categoryToDelete) {
    return false;
  }
  
  const filteredCategories = categories.filter(category => category.id !== id);
  
  if (filteredCategories.length === categories.length) {
    // No category was removed
    return false;
  }
  
  return saveCategories(filteredCategories);
};

// Update categories with post counts
export const refreshCategoryCounts = () => {
  const categories = getCategories();
  const posts = getPosts();
  
  // Create a map of category name to count
  const countMap = {};
  posts.forEach(post => {
    if (post.category) {
      countMap[post.category] = (countMap[post.category] || 0) + 1;
    }
  });
  
  // Update counts in categories
  const updatedCategories = categories.map(category => ({
    ...category,
    posts: countMap[category.name] || 0
  }));
  
  saveCategories(updatedCategories);
  return updatedCategories;
};

// Debug function to log current categories and posts
export const debugCategoryPosts = () => {
  const categories = getCategories();
  const posts = getPosts();
  
  console.log("=== Current Categories ===");
  categories.forEach(cat => {
    console.log(`Category: "${cat.name}" (slug: ${cat.slug})`);
    console.log(`Image: ${cat.image || 'None'}`);
    
    // Count posts in this category
    const categoryPosts = posts.filter(post => post.category === cat.name);
    console.log(`Found ${categoryPosts.length} posts in this category`);
    
    // List the posts
    if (categoryPosts.length > 0) {
      console.log("Posts:");
      categoryPosts.forEach(post => {
        console.log(`- ID: ${post.id}, Title: "${post.title}", Category: "${post.category}"`);
      });
    }
    console.log("---");
  });
  
  // Check for posts with categories that don't exist in the categories list
  const categoryNames = categories.map(cat => cat.name);
  const orphanedPosts = posts.filter(post => post.category && !categoryNames.includes(post.category));
  
  if (orphanedPosts.length > 0) {
    console.log("=== Posts with Missing Categories ===");
    orphanedPosts.forEach(post => {
      console.log(`- ID: ${post.id}, Title: "${post.title}", Category: "${post.category}" (missing)`);
    });
  }
};

// File to Base64 conversion utility for image handling
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}; 