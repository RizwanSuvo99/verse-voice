'use client';

import {
  Button,
  Center,
  Container,
  Grid,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import SingleBlog from './SingleBlog';

const FeaturedBlog = () => {
  const featuredBlogs = [
    {
      imgUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img.png',
      title: 'Facts About Business That Will Help You Success',
      category: 'Design',
      authorName: 'Roney',
      authorAvatar:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author.png',
      publishDate: '28 June 2023',
      timeRead: '35 mins read',
    },
    {
      imgUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img2.png',
      title: 'Helpful Tips for Working from Home as a Freelancer',
      category: 'Design',
      authorName: 'Harry',
      authorAvatar:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author2.png',
      publishDate: '27 June 2023',
      timeRead: '7 mins read',
    },
    {
      imgUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img3.png',
      title: '10 Easy Ways to Be Environmentally Conscious At Home',
      category: 'Design',
      authorName: 'Steven',
      authorAvatar:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author3.png',
      publishDate: '15 May 2023',
      timeRead: '8 mins read',
    },
    {
      imgUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img4.png',
      title: 'How to Give Your Space a Parisian-Inspired Makeover',
      category: 'Travel',
      authorName: 'Rose',
      authorAvatar:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author4.png',
      publishDate: '12 May 2023',
      timeRead: '12 mins read',
    },
    {
      imgUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img5.png',
      title: 'The 60 Things To Do About Building A Plan',
      category: 'Travel',
      authorName: 'Joseph',
      authorAvatar:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author5.png',
      publishDate: '25 April 2023',
      timeRead: '5 mins read',
    },
  ];
  return (
    <Container size={1350} className="!mt-[100px] !px-0 !py-4">
      <Center>
        <Text component={Title} variant="gradient" className="!my-4 !text-6xl">
          Featured Blogs
        </Text>
      </Center>
      <Center>
        <Text className="!mb-12 !text-2xl">
          Featured and highly rated articles
        </Text>
      </Center>
      <Grid grow gutter="xl">
        {featuredBlogs.map((blog, i) => (
          <Grid.Col span={i === 0 || i === 1 ? 6 : 4} key={i}>
            <SingleBlog blog={blog} />
          </Grid.Col>
        ))}
      </Grid>
      <Space h={'xl'} />
      <Center>
        <Button
          variant="gradient"
          rightSection={<IconArrowRight size={25} />}
          size={'xl'}
        >
          Show more posts
        </Button>
      </Center>
    </Container>
  );
};

export default FeaturedBlog;
