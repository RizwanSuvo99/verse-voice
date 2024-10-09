'use client';

import allBlogs from '@/data/allBlogs';
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
import Link from 'next/link';
import SingleBlog from './SingleBlog';

const FeaturedBlog = () => {
  const featuredBlogs = allBlogs.filter((item) => item.isFeatured);

  return (
    <Container size={1350} className="!mt-[100px] !px-6 !py-4">
      <Center>
        <Text component={Title} variant="gradient" className="!my-4 !text-6xl">
          Featured Blogs
        </Text>
      </Center>
      <Center>
        <Text className="!mb-12 !text-2xl">
          Featured and highly rated articles
        </Text>
      </Center>
      <Grid grow gutter="xl">
        {featuredBlogs.map((blog, i) => (
          <Grid.Col
            span={{ base: 12, sm: 6, md: i === 0 || i === 1 ? 6 : 4 }}
            key={i}
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
