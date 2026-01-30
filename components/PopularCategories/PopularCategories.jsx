'use client';

import { getSettings } from '@/api/siteSettings.mjs';
import {
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Loader,
  Center,
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
      <Container size={1350} className="!m-0">
        <Center py="xl">
          <Loader size="sm" />
        </Center>
      </Container>
    );
  }

  return (
    <Container size={1350} className="!m-0">
      <Card shadow="sm" radius="md" withBorder className="!h-full glass-card">
        <Text component={Title} variant="gradient" className="!text-2xl">
          Categories
        </Text>
        <Divider size="xl" mt={'5px'} mb={'1.5rem'} className="!w-[70%]" />
        <Flex
          wrap={'wrap'}
          gap={'md'}
          direction={{ base: 'column', sm: 'row' }}
        >
          {categories?.map((category, i) => (
            <Button
              key={i}
              component={Link}
              href={`/category/${category.toLowerCase()}`}
              size="xl"
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
