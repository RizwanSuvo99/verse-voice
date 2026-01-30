'use client';

import { getFeaturedBlogs } from '@/api/blogs.mjs';
import {
  Button,
  Center,
  Container,
  Grid,
  Loader,
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
      <Container size={1350} className="!mt-[40px] !px-6 !py-4">
        <Center py="xl">
          <Loader />
        </Center>
      </Container>
    );
  }

  if (!featuredBlogs || featuredBlogs.length === 0) return null;

  return (
    <Container
      size={1350}
      className="!mt-[40px] !px-6 !py-4 md:!mt-[70px] lg:!mt-[100px]"
    >
      <Center>
        <Text
          component={Title}
          variant="gradient"
          className="!my-2 !text-center !text-[40px] md:!text-[50px] lg:!text-5xl"
        >
          Featured Blogs
        </Text>
      </Center>
      <Center>
        <Text className="!mb-12 !text-center !text-[16px] md:!text-[20px] lg:!text-2xl">
          Featured and highly rated articles
        </Text>
      </Center>
      <Grid grow gutter="xl">
        {featuredBlogs.map((blog, i) => (
          <Grid.Col
            span={{ base: 12, sm: 6, md: i === 0 || i === 1 ? 6 : 4 }}
            key={blog._id}
          >
            <SingleBlog blog={blog} />
          </Grid.Col>
        ))}
      </Grid>
      <Space h={'xl'} />
      <Center>
        <Button
          variant="gradient"
          rightSection={<IconArrowRight size={25} />}
          size={'xl'}
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
