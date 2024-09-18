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
  const popularCategories = [
    'Animal',
    'Business',
    'Culture',
    'Fashion',
    'Food',
    'Interior',
    'Lifestyle',
    'Nature',
  ];
  return (
    <Container size={1350}>
      <Card shadow="sm" padding="md" radius="md" withBorder className="!h-full">
        <Text component={Title} variant="gradient" className="!text-2xl">
          Popular Categories
        </Text>
        <Divider size="xl" mt={'5px'} mb={'1.5rem'} className="!w-[70%]" />
        <Flex wrap={'wrap'} gap={'md'}>
          {popularCategories?.map((category, i) => (
            <Button
              key={i}
              component={Link}
              href={`/category/${category}`}
              size="xl"
              variant="outline"
              className="!w-[47%]"
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