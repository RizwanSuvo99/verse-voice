'use client';

// import LastCommentBlog from '@/components/LastCommentBlog/LastCommentBlog';
import PopularCategories from '@/components/PopularCategories/PopularCategories';
import PopularBlog from '@/components/PopularPost/PopularBlog';
import {
  Avatar,
  Container,
  Flex,
  Grid,
  Group,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

import { useState } from 'react';
import BlogDetails from './BlogDetails';

const BlogSingle = () => {
  const singleBlogData = {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img.png',
    title: 'Facts About Business That Will Help You Success',
    category: 'Design',
    authorName: 'Roney',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author.png',
    publishDate: '28 June 2023',
    timeRead: '35 mins read',
    description:
      'In the world of business, there are certain foundational facts that can drive success. Whether you’re a startup or an established enterprise, understanding these principles can make all the difference. The blog dives deep into the various strategies that successful entrepreneurs use to scale their business efficiently. From building a solid network to leveraging modern marketing tactics, this article provides actionable insights for anyone looking to grow their business. The importance of adaptability in an ever-changing market landscape is also discussed. Moreover, it highlights the need for a customer-centric approach to ensure longevity in your business operations. Read this blog to gain a competitive edge and propel your business toward success.In the world of business, there are certain foundational facts that can drive success. Whether you’re a startup or an established enterprise, understanding these principles can make all the difference. The blog dives deep into the various strategies that successful entrepreneurs use to scale their business efficiently. From building a solid network to leveraging modern marketing tactics, this article provides actionable insights for anyone looking to grow their business. The importance of adaptability in an ever-changing market landscape is also discussed. Moreover, it highlights the need for a customer-centric approach to ensure longevity in your business operations. Read this blog to gain a competitive edge and propel your business toward success.In the world of business, there are certain foundational facts that can drive success. Whether you’re a startup or an established enterprise, understanding these principles can make all the difference. The blog dives deep into the various strategies that successful entrepreneurs use to scale their business efficiently. From building a solid network to leveraging modern marketing tactics, this article provides actionable insights for anyone looking to grow their business. The importance of adaptability in an ever-changing market landscape is also discussed. Moreover, it highlights the need for a customer-centric approach to ensure longevity in your business operations.Freelancing can offer unparalleled freedom, but it also comes with its own unique set of challenges, particularly when working from home. This article outlines several tips for creating a productive home workspace that minimizes distractions and maximizes efficiency. Whether you’re just starting out or are a seasoned freelancer, these tips can help streamline your workflow. Topics covered include the importance of a structured schedule, maintaining work-life balance, and effective communication with clients. Additionally, the article offers advice on how to set boundaries to ensure uninterrupted work hours. Read on to learn how to improve your productivity and create a work environment that suits your freelance career',
  };

  const [like, setLike] = useState(false);

  const splitDescription = singleBlogData.description.split('.');
  // console.log(splitDescription)

  return (
    <Container size={1350} className="!mt-[50px] !p-0">
      <Text
        component={Title}
        variant="gradient"
        className="!my-4 !max-w-[75%] !text-5xl !leading-[60px]"
      >
        {singleBlogData.title}
      </Text>
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
          </div>
        </Group>
        <Flex direction={'column'}>
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
        </Flex>
      </Flex>
      <Space h={'md'} />
      <Grid>
        <Grid.Col span={8}>
          <BlogDetails
            splitDescription={splitDescription}
            imgUrl={singleBlogData.imgUrl}
            title={singleBlogData.title}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <PopularBlog />
          <Space h={'xl'} />
          {/* <LastCommentBlog /> */}
          <Space h={'xl'} />
          <PopularCategories />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default BlogSingle;
