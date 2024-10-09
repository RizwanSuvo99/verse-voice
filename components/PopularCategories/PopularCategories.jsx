import allBlogs from '@/data/allBlogs';
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

const PopularCategories = () => {
  const popularCategories = [...new Set(allBlogs.map((item) => item.category))];

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
          {popularCategories?.map((category, i) => (
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
