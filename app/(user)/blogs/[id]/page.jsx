// import LastCommentBlog from '@/components/LastCommentBlog/LastCommentBlog';
import {
  Avatar,
  Container,
  Flex,
  Group,
  Space,
  Text,
  Title,
} from '@mantine/core';

import allBlogs from '@/data/allBlogs';
// import { useState } from 'react';
import BlogPageInner from './BlogPageInner';

const BlogSingle = ({ params }) => {
  const { id } = params;

  const singleBlogData = allBlogs.find((item) => item.id == id);

  // const [like, setLike] = useState(false);

  // console.log(splitDescription)

  return (
    <Container size={1350} className="!mt-[50px] !px-6">
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
};

export default BlogSingle;

export async function generateStaticParams() {
  const blogId = [...new Set(allBlogs.map((item) => item.id))];

  return blogId.map((id) => ({
    id: `${id}`,
  }));
}
