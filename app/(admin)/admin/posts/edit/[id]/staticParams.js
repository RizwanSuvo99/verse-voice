import allBlogs from '@/data/allBlogs';

// For static export, we need to pre-generate all possible paths
export async function generateStaticParams() {
  // Return all possible post IDs from our data source
  return allBlogs.map(post => ({
    id: post.id.toString(),
  }));
} 