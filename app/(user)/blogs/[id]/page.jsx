'use client';

import { getBlogById } from '@/api/blogs.mjs';
import {
  Avatar,
  Badge,
  Container,
  Flex,
  Group,
  Loader,
  Center,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import BlogPageInner from './BlogPageInner';

const BlogSingle = () => {
  const { id } = useParams();

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });

  if (isLoading || !blog) {
    return (
      <Container size={1350} className="!mt-[50px] !px-6">
        <Center py="xl">
          <Loader />
        </Center>
      </Container>
    );
  }

  return (
    <Container size={1350} className="!mt-[50px] !px-6">
      <Text
        component={Title}
        variant="gradient"
        className="!my-4 !text-[30px] md:!text-[50px] lg:!text-5xl"
      >
        {blog.title}
      </Text>
      <Badge>{blog.category}</Badge>
      <Space h={'md'} />
      <Flex justify={'space-between'} align={'center'}>
        <Group>
          <Avatar
            radius={'xs'}
            size={'xl'}
            src={blog.createdBy?.avatar}
            alt="author-img"
          />
          <div>
            <Text fw={600} className="!text-xl">
              {blog.createdBy?.name}
            </Text>
            <Text fw={400} className="!text-md">
              {blog.publishDate
                ? dayjs(blog.publishDate).format('D MMM YYYY')
                : ''}
            </Text>
            <Text fw={400} className="!text-md">
              {blog.authorDetails}
            </Text>
          </div>
        </Group>
      </Flex>
      <Space h={'md'} />
      <BlogPageInner blog={blog} />
      
    </Container>
  );
};

export default BlogSingle;
