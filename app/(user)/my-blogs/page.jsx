'use client';

import { getMyBlogs } from '@/api/blogs.mjs';
import RequireAuth from '@/components/RequireAuth';
import SingleBlog from '@/app/(user)/blogs/SingleBlog';
import BlogGridSkeleton from '@/components/Skeletons/BlogGridSkeleton';
import { Center, Container, SimpleGrid, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

const MyBlogs = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['myBlogs'],
    queryFn: getMyBlogs,
  });

  if (isLoading) {
    return (
      <Container size={1500} className="!py-4 !pt-[24px]">
        <BlogGridSkeleton count={4} cols={{ base: 1, sm: 2 }} />
      </Container>
    );
  }

  return (
    <RequireAuth>
      <Container size={1500} className="!py-4 !pt-[24px]">
        <Text
          component={Title}
          variant="gradient"
          className="!mb-4 !text-center !text-[24px] !leading-[36px] md:!text-[28px]"
        >
          My Blogs
        </Text>
        {!blogs || blogs.length === 0 ? (
          <Center py="xl">
            <Text c="dimmed" size="sm">
              No published blogs yet. Your approved blog requests will appear
              here!
            </Text>
          </Center>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {blogs.map((blog) => (
              <SingleBlog key={blog._id} blog={blog} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </RequireAuth>
  );
};

export default MyBlogs;
