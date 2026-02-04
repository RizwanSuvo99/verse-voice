'use client';

import { getFeaturedBlogs } from '@/api/blogs.mjs';
import BlogGridSkeleton from '@/components/Skeletons/BlogGridSkeleton';
import {
  Button,
  Center,
  Container,
  Grid,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import SingleBlog from './SingleBlog';

const FeaturedBlog = () => {
  const { data: featuredBlogs, isLoading } = useQuery({
    queryKey: ['featuredBlogs'],
    queryFn: getFeaturedBlogs,
  });

  if (isLoading) {
    return (
      <Container size={1500} className="!mt-[24px] !px-6 !py-4">
        <BlogGridSkeleton count={4} cols={{ base: 1, sm: 2, md: 2 }} />
      </Container>
    );
  }

  if (!featuredBlogs || featuredBlogs.length === 0) return null;

  return (
    <Container
      size={1500}
      className="!mt-[16px] !py-2 md:!mt-[24px] lg:!mt-[32px]"
    >
      <Center>
        <Text
          component={Title}
          variant="gradient"
          className="!my-2 !text-center !text-[24px] md:!text-[28px] lg:!text-[32px]"
        >
          Featured Blogs
        </Text>
      </Center>
      <Center>
        <Text
          c="dimmed"
          className="!mb-3 !text-center !text-[13px] md:!text-[14px]"
        >
          Featured and highly rated articles
        </Text>
      </Center>
      <Grid grow gutter="md">
        {featuredBlogs.map((blog, i) => (
          <Grid.Col
            span={{ base: 12, sm: 6, md: i === 0 || i === 1 ? 6 : 4 }}
            key={blog._id}
          >
            <SingleBlog blog={blog} />
          </Grid.Col>
        ))}
      </Grid>
      <Space h={'md'} />
      <Center>
        <Button
          variant="gradient"
          className="glow-btn"
          rightSection={<IconArrowRight size={18} />}
          size={'md'}
          component={Link}
          href={'/blogs'}
        >
          Show more posts
        </Button>
      </Center>
    </Container>
  );
};

export default FeaturedBlog;
