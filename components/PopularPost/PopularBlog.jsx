'use client';

import { getPopularBlogs } from '@/api/blogs.mjs';
import { Card, Container, Divider, Grid, Loader, Center, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import PopularSingleBlog from './PopularSingleBlog';

const PopularBlog = () => {
  const { data: popularBlogs, isLoading } = useQuery({
    queryKey: ['popularBlogs'],
    queryFn: getPopularBlogs,
  });

  if (isLoading) {
    return (
      <Container size={1350} className="!mt-[10px]">
        <Center py="xl">
          <Loader size="sm" />
        </Center>
      </Container>
    );
  }

  if (!popularBlogs || popularBlogs.length === 0) return null;

  return (
    <Container size={1350} className="!mt-[10px]">
      <Card shadow="sm" padding="md" radius="md" withBorder className="!h-full glass-card">
        <Text component={Title} variant="gradient" className="!text-2xl">
          Popular Blogs
        </Text>
        <Divider size="xl" mt={'5px'} mb={'1.5rem'} className="!w-[50%]" />
        <Grid grow className="!gap-8">
          {popularBlogs.map((blog, i) => (
            <Grid.Col span={12} key={blog._id}>
              <PopularSingleBlog
                blog={blog}
                divider={i === popularBlogs.length - 1 ? false : true}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Card>
    </Container>
  );
};

export default PopularBlog;
