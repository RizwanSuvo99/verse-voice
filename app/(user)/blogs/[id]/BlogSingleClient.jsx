'use client';

// import LastCommentBlog from '@/components/LastCommentBlog/LastCommentBlog';
import {
    Avatar,
    Badge,
    Container,
    Flex,
    Group,
    Space,
    Text,
    Title,
} from '@mantine/core';

import { getPostById } from '@/services/postsService';
import { useEffect, useState } from 'react';
import BlogPageInner from './BlogPageInner';

export default function BlogSingleClient({ params }) {
  const { id } = params;
  const [singleBlogData, setSingleBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the post by ID from postsService which reads from localStorage
    const post = getPostById(parseInt(id, 10));
    setSingleBlogData(post);
    setLoading(false);
  }, [id]);

  if (loading || !singleBlogData) {
    return (
      <Container size={1350} className="!mt-[50px] !px-6">
        <Text>Loading...</Text>
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
        {singleBlogData.title}
      </Text>
      <Badge>{singleBlogData.category}</Badge>
      <Space h={'md'} />
      <Flex justify={'space-between'} align={'center'}>
        <Group>
          <Avatar
            radius={'xs'}
            size={'xl'}
            src={singleBlogData.authorAvatar}
            alt="author-img"
          />
          <div>
            <Text fw={600} className="!text-xl">
              {singleBlogData.authorName}
            </Text>
            <Text fw={400} className="!text-md">
              {singleBlogData.publishDate}
            </Text>
            <Text fw={400} className="!text-md">
              {singleBlogData.authorDetails}
            </Text>
          </div>
        </Group>
        {/*         <Flex direction={'column'}>
          <div
            className="!flex !h-[50px] !w-[50px] !cursor-pointer !items-center !justify-center"
            style={{ border: '2px solid #1971c2', borderRadius: '10px' }}
            onClick={() => setLike(!like)}
          >
            {like ? (
              <IconHeartFilled className="!text-3xl !text-[#1971c2]" />
            ) : (
              <IconHeart />
            )}
          </div>
          <Space h={'sm'} />
          <Text fw={400} className="!text-sm">
            {singleBlogData.timeRead}
          </Text>
        </Flex> */}
      </Flex>
      <Space h={'md'} />
      <BlogPageInner singleBlogData={singleBlogData} />
    </Container>
  );
} 