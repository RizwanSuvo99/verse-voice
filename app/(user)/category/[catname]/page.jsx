'use client';

import { getBlogsByCategory } from '@/api/blogs.mjs';
import { Badge, Container, Flex, Loader, Center, Space, Text, Title } from '@mantine/core';
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
      <Container size={1300} className="!pt-[50px]">
        <Center py="xl">
          <Loader />
        </Center>
      </Container>
    );
  }

  return (
    <Container size={1300} className="!pt-[50px]">
      <Flex gap={'sm'}>
        <Text
          component={Title}
          variant="gradient"
          className="!text-center !text-[40px] !leading-[60px] md:!text-[50px] lg:!text-5xl"
        >
          {categoryName}
        </Text>
        <Badge>{`${blogs?.length || 0} article${blogs?.length !== 1 ? 's' : ''}`}</Badge>
      </Flex>
      <Space h={'xl'} />
      <CategoryPageInner foundBlogs={blogs || []} />
    </Container>
  );
};

export default Category;
