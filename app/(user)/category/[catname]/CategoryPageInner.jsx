'use client';

import { Pagination, SimpleGrid, Space } from '@mantine/core';
import { chunk } from 'lodash';
import { useState } from 'react';
import SingleBlog from './SingleBlog';

const CategoryPageInner = ({ foundBlogs }) => {
  const data = chunk(foundBlogs, 6);

  const [activePage, setPage] = useState(1);
  const items = data[activePage - 1].map((blog, i) => (
    <SingleBlog key={i} blog={blog} />
  ));

  return (
    <>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>{items}</SimpleGrid>
      <Space h={'xl'} />
      <Pagination total={data.length} value={activePage} onChange={setPage} />
    </>
  );
};

export default CategoryPageInner;
