'use client';

import { useBlogs } from '@/hooks/queries';
import BlogGridSkeleton from '@/components/Skeletons/BlogGridSkeleton';
import {
  Container,
  Pagination,
  SimpleGrid,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import SingleBlog from './SingleBlog';

const Blogs = () => {
  const [activePage, setPage] = useState(1);

  const { data, isLoading } = useBlogs({ page: activePage, limit: 6 });

  if (isLoading) {
    return (
      <Container size={1500} className="!pt-[24px]">
        <BlogGridSkeleton count={6} />
      </Container>
    );
  }

  return (
    <Container size={1500} className="!pt-[24px]">
      <Text
        component={Title}
        variant="gradient"
        className="!text-center !text-[24px] !leading-[36px] md:!text-[28px]"
      >
        All Blogs
      </Text>
      <Text
        c="dimmed"
        className="!mb-4 !mt-1 !text-center !text-[13px] md:!text-[14px]"
      >
        All the latest blogs
      </Text>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
        {data?.blogs?.map((blog) => (
          <SingleBlog blog={blog} key={blog._id} />
        ))}
      </SimpleGrid>
      <Space h={'md'} />
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
