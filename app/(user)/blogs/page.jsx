'use client';

import { getBlogs } from '@/api/blogs.mjs';
import {
  Container,
  Loader,
  Center,
  Pagination,
  SimpleGrid,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import SingleBlog from './SingleBlog';

const Blogs = () => {
  const [activePage, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['blogs', activePage],
    queryFn: () => getBlogs({ page: activePage, limit: 6 }),
  });

  if (isLoading) {
    return (
      <Container size={1300} className="!pt-[50px]">
        <Center py="xl">
          <Loader />
        </Center>
      </Container>
    );
  }

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
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
        {data?.blogs?.map((blog) => (
          <SingleBlog blog={blog} key={blog._id} />
        ))}
      </SimpleGrid>
      <Space h={'xl'} />
      <Pagination
        total={data?.totalPages || 1}
        value={activePage}
        onChange={setPage}
        className="glass-pagination"
      />
    </Container>
  );
};

export default Blogs;
