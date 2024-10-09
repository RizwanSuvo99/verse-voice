'use client';

import allBlogs from '@/data/allBlogs';
import {
  Container,
  Pagination,
  SimpleGrid,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { chunk } from 'lodash';
import { useState } from 'react';
import SingleBlog from './SingleBlog';

const Blogs = () => {
  const data = chunk(allBlogs, 6);

  const [activePage, setPage] = useState(1);
  const items = data[activePage - 1].map((blog, i) => (
    <SingleBlog blog={blog} key={i} />
  ));

  return (
    <Container size={1300} className="!pt-[50px]">
      <Text
        component={Title}
        variant="gradient"
        className="!text-center !text-[40px] !leading-[60px] md:!text-[50px] lg:!text-5xl"
      >
        All Blogs
      </Text>
      <Text className="!mb-6 !mt-2 !text-center !text-[16px] md:!text-[20px] lg:!text-2xl">
        All the latest blogs
      </Text>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>{items}</SimpleGrid>
      <Space h={'xl'} />
      <Pagination total={data.length} value={activePage} onChange={setPage} />
    </Container>
  );
};

export default Blogs;
