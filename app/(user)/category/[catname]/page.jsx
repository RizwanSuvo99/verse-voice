'use client';

import { getBlogsByCategory } from '@/api/blogs.mjs';
import BlogGridSkeleton from '@/components/Skeletons/BlogGridSkeleton';
import { Badge, Container, Flex, Space, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import CategoryPageInner from './CategoryPageInner';

const Category = () => {
  const { catname } = useParams();
  const categoryName = catname
    ? catname.charAt(0).toUpperCase() + catname.substring(1)
    : '';

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogsByCategory', catname],
    queryFn: () => getBlogsByCategory(catname),
    enabled: !!catname,
  });

  if (isLoading) {
    return (
      <Container size={1500} className="!pt-[24px]">
        <BlogGridSkeleton count={6} />
      </Container>
    );
  }

  return (
    <Container size={1500} className="!pt-[24px]">
      <Flex gap={'sm'}>
        <Text
          component={Title}
          variant="gradient"
          className="!text-center !text-[24px] !leading-[36px] md:!text-[28px]"
        >
          {categoryName}
        </Text>
        <Badge>{`${blogs?.length || 0} article${blogs?.length !== 1 ? 's' : ''}`}</Badge>
      </Flex>
      <Space h={'md'} />
      <CategoryPageInner foundBlogs={blogs || []} />
    </Container>
  );
};

export default Category;
