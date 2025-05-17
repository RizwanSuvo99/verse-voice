'use client';

import { getCategories, getCategoryBySlug } from '@/services/categoriesService';
import { getPosts, getPostsByCategory, savePosts } from '@/services/postsService';
import {
    Breadcrumbs,
    Container,
    Divider,
    Flex,
    Text,
    Title,
} from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CategoryPageInner from './CategoryPageInner';

export default function CategoryPageClient({ params }) {
  const { catname } = params;
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load category and its posts
    const loadCategoryData = () => {
      try {
        // Get category by slug
        let foundCategory = getCategoryBySlug(catname);
        
        // If not found directly, try to find a similar category
        if (!foundCategory) {
          const allCategories = getCategories();
          
          // Try to find a close match (case insensitive)
          foundCategory = allCategories.find(cat => 
            cat.slug.toLowerCase() === catname.toLowerCase() ||
            cat.name.toLowerCase() === catname.toLowerCase() ||
            cat.slug.toLowerCase().replace(/-/g, '') === catname.toLowerCase().replace(/-/g, '')
          );
          
          // Still not found? Try removing "s" at the end for singular/plural differences
          if (!foundCategory) {
            const singularCatname = catname.endsWith('s') ? catname.slice(0, -1) : catname;
            const pluralCatname = catname.endsWith('s') ? catname : catname + 's';
            
            foundCategory = allCategories.find(cat => 
              cat.slug.toLowerCase() === singularCatname.toLowerCase() ||
              cat.slug.toLowerCase() === pluralCatname.toLowerCase()
            );
          }
        }
        
        if (foundCategory) {
          setCategory(foundCategory);
          // Get posts for this category name (handle both the current category name and any old names)
          const foundPosts = getPostsByCategory(foundCategory.name);
          
          // If we found very few posts, check if there are orphaned posts with similar category names
          if (foundPosts.length < 3) {
            console.log(`Found only ${foundPosts.length} posts for category "${foundCategory.name}", checking for orphaned posts...`);
            const allPosts = getPosts();
            const candidatePosts = allPosts.filter(post => 
              post.category && 
              post.category.toLowerCase() === foundCategory.name.toLowerCase()
            );
            
            if (candidatePosts.length > foundPosts.length) {
              console.log(`Found ${candidatePosts.length} posts with case-insensitive match. Will update them.`);
              // Update these posts to use the correct category name
              const updatedPosts = allPosts.map(post => {
                if (post.category && post.category.toLowerCase() === foundCategory.name.toLowerCase() && 
                    post.category !== foundCategory.name) {
                  return { ...post, category: foundCategory.name };
                }
                return post;
              });
              
              savePosts(updatedPosts);
              // Get fresh posts after update
              const freshPosts = getPostsByCategory(foundCategory.name);
              setPosts(freshPosts);
            } else {
              setPosts(foundPosts);
            }
          } else {
            setPosts(foundPosts);
          }
        } else {
          setError(`Category "${catname}" not found`);
        }
      } catch (err) {
        console.error('Error loading category data:', err);
        setError('Failed to load category data');
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [catname]);

  const items = [
    { title: 'Home', href: '/' },
    { title: 'Category', href: '#' },
    { title: category?.name || catname || 'Loading...', href: '#' },
  ];

  return (
    <Container size={1350} className="!px-6 !py-4">
      <Breadcrumbs>
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="!text-decoration-none !text-blue-500"
          >
            {item.title}
          </Link>
        ))}
      </Breadcrumbs>

      <Flex my={40} justify={'center'} align={'center'} direction={'column'}>
        <Title>{category?.name || catname}</Title>
        <Divider size="md" className="!w-[50%]" />
      </Flex>

      {loading ? (
        <Text ta="center">Loading posts...</Text>
      ) : error ? (
        <Text ta="center" color="red">{error}</Text>
      ) : posts.length === 0 ? (
        <Text ta="center">No posts found in this category.</Text>
      ) : (
        <CategoryPageInner foundBlogs={posts} />
      )}
    </Container>
  );
} 