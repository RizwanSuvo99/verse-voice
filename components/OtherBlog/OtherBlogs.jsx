'use client';

import { Container, Grid, Space } from '@mantine/core';
import LastCommentBlog from '../LastCommentBlog/LastCommentBlog';
import PopularCategories from '../PopularCategories/PopularCategories';
import PopularBlog from '../PopularPost/PopularBlog';
import RecentBlog from '../RecentPost/RecentBlog';

const OtherBlogs = () => {
  return (
    <Container size={1350} className="!mt-[50px]">
      <Grid gutter={2}>
        <Grid.Col span={8} className="!p-0">
          <RecentBlog />
        </Grid.Col>
        <Grid.Col span={4} className="!p-0">
          <PopularBlog />
          <Space h={'xl'} />
          <LastCommentBlog />
          <Space h={'xl'} />
          <PopularCategories />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default OtherBlogs;
