'use client';

import { getPosts } from '@/services/postsService';
import { Container, Grid, Pagination, Space, Text, Title } from '@mantine/core';
import { chunk } from 'lodash';
import { useEffect, useState } from 'react';
import RecentSingleBlog from './RecentSingleBlog';

const RecentBlog = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    // Get posts from the postsService which reads from localStorage
    const allBlogs = getPosts();
    
    // Sort by date (newest first)
    const sortedBlogs = allBlogs.slice().sort((a, b) => {
      const dateA = new Date(a.publishDate);
      const dateB = new Date(b.publishDate);
      return dateB - dateA;
    });
    
    setRecentBlogs(sortedBlogs);
  }, []);
  
  // Only proceed if blogs are loaded
  const data = recentBlogs.length > 0 ? chunk(recentBlogs, 5) : [[]];
  
  const items = data[activePage - 1]?.map((blog, i) => (
    <Grid.Col span={12} key={i}>
      <RecentSingleBlog blog={blog} />
    </Grid.Col>
  )) || [];

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
        {items}
      </Grid>
      <Space h={'md'} />
      <Pagination total={data.length} value={activePage} onChange={setPage} />
    </Container>
  );
};

export default RecentBlog;
