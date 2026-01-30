'use client';

import { getBlogs } from '@/api/blogs.mjs';
import { Container, Grid, Loader, Center, Pagination, Space, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import RecentSingleBlog from './RecentSingleBlog';

const RecentBlog = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['recentBlogs', page],
    queryFn: () => getBlogs({ page, limit: 5, sort: 'publishDate', order: 'desc' }),
  });

  if (isLoading) {
    return (
      <Container size={1350}>
        <Center py="xl">
          <Loader />
        </Center>
      </Container>
    );
  }

  return (
    <Container size={1350} className="">
      <Text
        component={Title}
        variant="gradient"
        className="!text-[40px] !leading-[60px] md:!text-[50px] lg:!text-5xl"
      >
        Recent Blogs
      </Text>
      <Text className="!mb-12 !mt-2 !text-[16px] md:!text-[20px] lg:!text-2xl">
        Don&apos;t miss the latest trends
      </Text>
      <Grid grow gutter="xl">
        {data?.blogs?.map((blog) => (
          <Grid.Col span={12} key={blog._id}>
            <RecentSingleBlog blog={blog} />
          </Grid.Col>
        ))}
      </Grid>
      <Space h={'md'} />
      <Pagination total={data?.totalPages || 1} value={page} onChange={setPage} className="glass-pagination" />
    </Container>
  );
};

export default RecentBlog;
