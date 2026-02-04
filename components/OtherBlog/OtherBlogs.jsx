'use client';

import { Container, Flex, Grid } from '@mantine/core';
import PopularCategories from '../PopularCategories/PopularCategories';
import PopularBlog from '../PopularPost/PopularBlog';
import RecentBlog from '../RecentPost/RecentBlog';

const OtherBlogs = () => {
  return (
    <Container size={1500} className="!mt-[24px]">
      <Grid gutter={2}>
        <Grid.Col span={{ base: 12, md: 8 }} className="!p-0">
          <RecentBlog />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }} className="!p-0 !pt-[24px]">
          <Flex
            direction={{ base: 'column', sm: 'row', md: 'column' }}
            gap={'sm'}
          >
            <PopularBlog />
            <PopularCategories />
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default OtherBlogs;
