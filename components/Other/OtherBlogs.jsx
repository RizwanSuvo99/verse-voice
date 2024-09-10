'use client';

import { Container, Grid } from '@mantine/core';
import PopularPost from '../PopularPost/PopularBlog';
import RecentBlog from '../RecentPost/RecentBlog';

const OtherBlogs = () => {
  return (
    <Container size={1350} className="!mt-[50px]">
      <Grid gutter={2}>
        <Grid.Col span={8} className="!p-0">
          <RecentBlog />
        </Grid.Col>
        <Grid.Col span={4} className="!p-0">
          <PopularPost />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default OtherBlogs;
