'use client';

import { getCategories } from '@/services/categoriesService';
import {
    Button,
    Card,
    Container,
    Divider,
    Flex,
    Text,
    Title,
} from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // Get categories from the service which reads from localStorage
    const allCategories = getCategories();
    setCategories(allCategories);
  }, []);

  return (
    <Container size={1350} className="!m-0">
      <Card shadow="sm" radius="md" withBorder className="!h-full">
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
              href={`/category/${category.slug}`}
              size="xl"
              variant="outline"
              style={{ borderColor: category.color, color: category.color }}
            >
              {category.name}
            </Button>
          ))}
        </Flex>
      </Card>
    </Container>
  );
};
export default PopularCategories;
