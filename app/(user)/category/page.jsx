'use client';

import allBlogs from '@/data/allBlogs';
import {
  Badge,
  Container,
  Flex,
  Pagination,
  SimpleGrid,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { IconChevronRight, IconHomeFilled } from '@tabler/icons-react';
import { chunk } from 'lodash';
import { useState } from 'react';
import SingleBlog from './SingleBlog';

const Category = () => {
  const data = chunk(allBlogs, 6);

  const [activePage, setPage] = useState(1);
  const items = data[activePage - 1].map((blog, i) => (
    <SingleBlog key={i} blog={blog} />
  ));

  return (
    <Container size={1300} className="!pt-[50px]">
      <Flex gap={'sm'}>
        <Text
          component={Title}
          variant="gradient"
          className="!text-5xl !leading-[60px]"
        >
          Design
        </Text>
        <Badge>{`${allBlogs.length} article`}</Badge>
      </Flex>
      <Flex align={'center'} justify={'space-between'}>
        <Text className="!mb-6 !mt-2 !text-[18px]">All the latest blogs</Text>
        <Flex gap={'sm'}>
          <IconHomeFilled color={'#0ea5ea'} />
          <Text>Home</Text>
          <IconChevronRight />
          <Text>Blogs</Text>
          <IconChevronRight />
          <Text>Design</Text>
        </Flex>
      </Flex>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>{items}</SimpleGrid>
      <Space h={'xl'} />
      <Pagination total={data.length} value={activePage} onChange={setPage} />
    </Container>
  );
};

export default Category;
