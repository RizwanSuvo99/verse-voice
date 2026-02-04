'use client';

import { getBlogs } from '@/api/blogs.mjs';
import BlogGridSkeleton from '@/components/Skeletons/BlogGridSkeleton';
import { Container, Grid, Pagination, Space, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import RecentSingleBlog from './RecentSingleBlog';

const RecentBlog = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['recentBlogs', page],
    queryFn: () =>
      getBlogs({ page, limit: 5, sort: 'publishDate', order: 'desc' }),
  });

  if (isLoading) {
    return (
      <Container size={1500}>
        <BlogGridSkeleton count={3} cols={{ base: 1 }} />
      </Container>
    );
  }

  return (
    <Container size={1500}>
      <Text
        component={Title}
        variant="gradient"
        className="!text-[24px] !leading-[36px] md:!text-[28px]"
      >
        Recent Blogs
      </Text>
      <Text c="dimmed" className="!mb-4 !mt-1 !text-[13px] md:!text-[14px]">
        Don&apos;t miss the latest trends
      </Text>
      <Grid grow gutter="md">
        {data?.blogs?.map((blog) => (
          <Grid.Col span={12} key={blog._id}>
            <RecentSingleBlog blog={blog} />
          </Grid.Col>
        ))}
      </Grid>
      <Space h={'md'} />
      <Pagination
        total={data?.totalPages || 1}
        value={page}
        onChange={setPage}
        className="glass-pagination"
      />
    </Container>
  );
};

export default RecentBlog;
