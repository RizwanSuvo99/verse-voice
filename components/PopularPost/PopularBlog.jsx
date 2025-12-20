'use client';

import { usePopularBlogs } from '@/hooks/queries';
import BlogGridSkeleton from '@/components/Skeletons/BlogGridSkeleton';
import { Card, Container, Divider, Grid, Text, Title } from '@mantine/core';
import PopularSingleBlog from './PopularSingleBlog';

const PopularBlog = () => {
  const { data: popularBlogs, isLoading } = usePopularBlogs();

  if (isLoading) {
    return (
      <Container size={1500} className="!mt-[8px]">
        <BlogGridSkeleton count={3} cols={{ base: 1 }} />
      </Container>
    );
  }

  if (!popularBlogs || popularBlogs.length === 0) return null;

  return (
    <Container size={1500} className="!mt-[8px]">
      <Card shadow="sm" padding="md" radius="md" withBorder className="!h-full">
        <Text component={Title} variant="gradient" className="!text-lg">
          Popular Blogs
        </Text>
        <Divider size="xl" mt={'4px'} mb={'1rem'} className="!w-[50%]" />
        <Grid grow className="!gap-4">
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
