'use client';
import { SimpleGrid } from '@mantine/core';
import BlogCardSkeleton from './BlogCardSkeleton';

const BlogGridSkeleton = ({ count = 6, cols = { base: 1, xs: 2, md: 3 } }) => (
  <SimpleGrid cols={cols}>
    {Array.from({ length: count }).map((_, i) => (
      <BlogCardSkeleton key={i} />
    ))}
  </SimpleGrid>
);

export default BlogGridSkeleton;
