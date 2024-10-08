'use client';

import PopularCategories from '@/components/PopularCategories/PopularCategories';
import PopularBlog from '@/components/PopularPost/PopularBlog';
import { Grid, Space } from '@mantine/core';
import BlogDetails from './BlogDetails';

const BlogPageInner = ({ singleBlogData }) => {


  return (
    <Grid>
      <Grid.Col span={8}>
        <BlogDetails singleBlogData={singleBlogData} />
      </Grid.Col>
      <Grid.Col span={4}>
        <PopularBlog />
        <Space h={'xl'} />
        {/* <LastCommentBlog /> */}
        <Space h={'xl'} />
        <PopularCategories />
      </Grid.Col>
    </Grid>
  );
};

export default BlogPageInner;
