'use client';

import PopularCategories from '@/components/PopularCategories/PopularCategories';
import PopularBlog from '@/components/PopularPost/PopularBlog';
import { Flex, Grid } from '@mantine/core';
import BlogDetails from './BlogDetails';

const BlogPageInner = ({ blog, currentUser }) => {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <BlogDetails blog={blog} currentUser={currentUser} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Flex
          direction={{ base: 'column', sm: 'row', md: 'column' }}
          gap={'sm'}
        >
          <PopularBlog />
          <PopularCategories />
        </Flex>
      </Grid.Col>
    </Grid>
  );
};

export default BlogPageInner;
