'use client';

import { Container, Grid } from '@mantine/core';
import PopularPost from '../PopularPost/PopularPost';
import RecentPost from '../RecentPost/RecentPost';

const OtherBlogs = () => {
  return (
    <Container size={1350} className="!px-0 py-4">
      <Grid>
        <Grid.Col span={8}>
          <RecentPost />
        </Grid.Col>
        <Grid.Col span={4}>
          <PopularPost />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default OtherBlogs;
