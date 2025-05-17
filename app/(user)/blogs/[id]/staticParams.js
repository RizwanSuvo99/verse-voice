import allBlogs from '@/data/allBlogs';

// For static export, we need to pre-generate all possible paths
export async function generateStaticParams() {
  // For static generation, use all blog IDs
  return allBlogs.map((blog) => ({
    id: blog.id.toString(),
  }));
} 