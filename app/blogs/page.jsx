'use client';

import { Container, Pagination } from '@mantine/core';
import { chunk } from 'lodash';
import { useState } from 'react';

const data = chunk(
  Array(30)
    .fill(0)
    .map((_, index) => ({ id: index })),
  5,
);

const Blogs = () => {
  const [activePage, setPage] = useState(1);
  const items = data[activePage - 1].map((item) => (
    <div key={item.id}>id: {item.id}</div>
  ));

  console.log(items);
  return (
    <Container size={1350} className="!px-0 !py-4 !pt-[100px]">
      {items}
      <Pagination total={data.length} value={activePage} onChange={setPage} />
    </Container>
  );
};

export default Blogs;
