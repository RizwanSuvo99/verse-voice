'use client';

import { getMyBlogs } from '@/api/blogs.mjs';
import RequireAuth from '@/components/RequireAuth';
import SingleBlog from '@/app/(user)/blogs/SingleBlog';
import { Center, Container, Loader, SimpleGrid, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

const MyBlogs = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['myBlogs'],
    queryFn: getMyBlogs,
  });

  if (isLoading) {
    return (
      <Container size={1350} className="!px-6 !py-4 !pt-[50px]">
        <Center py="xl">
          <Loader />
        </Center>
      </Container>
    );
  }

  return (
    <RequireAuth>
      <Container size={1350} className="!px-6 !py-4 !pt-[50px]">
        <Text
          component={Title}
          variant="gradient"
          className="!mb-6 !text-center !text-[40px] !leading-[60px] md:!text-[50px] lg:!text-5xl"
        >
          My Blogs
        </Text>
        {!blogs || blogs.length === 0 ? (
          <Center py="xl">
            <Text c="dimmed" size="lg">
              No published blogs yet. Your approved blog requests will appear here!
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
