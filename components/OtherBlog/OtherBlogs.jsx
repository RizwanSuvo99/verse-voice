'use client';

import { Container, Flex, Grid } from '@mantine/core';
// import LastCommentBlog from '../LastCommentBlog/LastCommentBlog';
import PopularCategories from '../PopularCategories/PopularCategories';
import PopularBlog from '../PopularPost/PopularBlog';
import RecentBlog from '../RecentPost/RecentBlog';

const OtherBlogs = () => {
  return (
    <Container size={1350} className="!mt-[50px]">
      <Grid gutter={2}>
        <Grid.Col span={{ base: 12, md: 8 }} className="!p-0">
          <RecentBlog />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }} className="!p-0 !pt-[100px]">
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
    </Container>
  );
};

export default OtherBlogs;
