'use client';

import PopularCategories from '@/components/PopularCategories/PopularCategories';
import PopularBlog from '@/components/PopularPost/PopularBlog';
import { Flex, Grid } from '@mantine/core';
import BlogDetails from './BlogDetails';

const BlogPageInner = ({ singleBlogData }) => {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <BlogDetails singleBlogData={singleBlogData} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Flex
          direction={{ base: 'column', sm: 'row', md: 'column' }}
          gap={'sm'}
        >
          <PopularBlog />
          {/* <LastCommentBlog /> */}
          <PopularCategories />
        </Flex>
      </Grid.Col>
    </Grid>
  );
};

export default BlogPageInner;
