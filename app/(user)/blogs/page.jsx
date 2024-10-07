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
        className="!text-5xl !leading-[60px]"
      >
        All Blogs
      </Text>
      <Text className="!mb-6 !mt-2 !text-[18px]">All the latest blogs</Text>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>{items}</SimpleGrid>
      <Space h={'xl'} />
      <Pagination total={data.length} value={activePage} onChange={setPage} />
    </Container>
  );
};

export default Blogs;
