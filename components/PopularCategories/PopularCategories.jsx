'use client';

import { getSettings } from '@/api/siteSettings.mjs';
import CategorySkeleton from '@/components/Skeletons/CategorySkeleton';
import {
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Text,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

const PopularCategories = () => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  const categories = settings?.categories?.map((c) => c.name) || [];

  if (isLoading) {
    return (
      <Container size={1500} className="!m-0">
        <CategorySkeleton count={6} />
      </Container>
    );
  }

  return (
    <Container size={1500} className="!m-0">
      <Card shadow="sm" radius="md" withBorder className="!h-full">
        <Text component={Title} variant="gradient" className="!text-lg">
          Categories
        </Text>
        <Divider size="xl" mt={'4px'} mb={'1rem'} className="!w-[70%]" />
        <Flex
          wrap={'wrap'}
          gap={'sm'}
          direction={{ base: 'column', sm: 'row' }}
        >
          {categories?.map((category, i) => (
            <Button
              key={i}
              component={Link}
              href={`/category/${category.toLowerCase()}`}
              size="sm"
              variant="outline"
            >
              {category}
            </Button>
          ))}
        </Flex>
      </Card>
    </Container>
  );
};

export default PopularCategories;
