import {
  AspectRatio,
  Avatar,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  Space,
  Text,
} from '@mantine/core';
import { chunk } from 'lodash';
import Link from 'next/link';

const BlogDetails = ({ splitDescription, imgUrl, title }) => {
  const data = chunk(splitDescription, 5);
  console.log(data);
  let lastText = data.map((textArr, i) => {
    if (!(i !== 0 || i !== 1 || i !== 2 || i !== 3 || i !== 4)) {
      return textArr?.join('.') + '.';
    }
  });

  lastText = lastText.join('');

  const singleBlogData = {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img2.png',
    title: 'Helpful Tips for Working from Home as a Freelancer',
    category: 'Design',
    authorName: 'Harry',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author2.png',
    publishDate: '27 June 2023',
    timeRead: '7 mins read',
  };
  return (
    <>
      <Text className="!text-[18px]">{data[0].join('.') + '.'}</Text>
      <Space h={'md'} />
      <AspectRatio ratio={1}>
        <Image src={imgUrl} height={500} alt="Norway" radius="md" />
      </AspectRatio>
      <Space h={'md'} />
      <Text className="!text-[18px]">{data[1]?.join('.') + '.'}</Text>
      <Space h={'md'} />
      <Text className="!text-[18px]">{data[2]?.join('.') + '.'}</Text>
      <Space h={'md'} />
      <Text className="!text-[18px]">{data[3]?.join('.') + '.'}</Text>
      <Space h={'md'} />
      <Text className="!text-[18px]">{data[4]?.join('.')}</Text>
      <Space h={'md'} />
      <Text className="!text-[18px]">{lastText}</Text>
      <Space h={'xl'} />
      <Divider size={'md'} />
      <Space h={'xl'} />
      <Text className="!text-3xl">1 Comment on {`"${title}":`}</Text>
      <Space h={'xl'} />
      <Flex justify={'space-between'} align={'center'}>
        <Group>
          <Avatar
            radius={'xl'}
            size={'lg'}
            src={singleBlogData.authorAvatar}
            alt="author-img"
          />
          <div>
            <Text fw={500} className="!text-[16px]">
              {singleBlogData.authorName}
            </Text>
            <Text fw={400} className="!text-xs">
              {singleBlogData.publishDate}
            </Text>
          </div>
        </Group>
        <Card>
          <Text>
            Thirty there & time wear across days, make inside on these you.
          </Text>
        </Card>
      </Flex>
      <Space h={'md'} />
      <Flex justify={'space-between'} align={'center'}>
        <Group>
          <Avatar
            radius={'xl'}
            size={'lg'}
            src={singleBlogData.authorAvatar}
            alt="author-img"
          />
          <div>
            <Text fw={500} className="!text-[16px]">
              {singleBlogData.authorName}
            </Text>
            <Text fw={400} className="!text-xs">
              {singleBlogData.publishDate}
            </Text>
          </div>
        </Group>
        <Card>
          <Text>
            Thirty there & time wear across days, make inside on these you.
          </Text>
        </Card>
      </Flex>
      <Space h={'xl'} />
      <Divider size={'sm'} />
      <Space h={'xl'} />
      <Text fw={500} className="!text-3xl">
        {' '}
        Leave a comment
      </Text>
      <Space h={'sm'} />
      <Text>
        You must be{' '}
        <Text component={Link} href={'/login'} className="!text-blue-500">
          logged in
        </Text>{' '}
        to post a comment.
      </Text>
    </>
  );
};

export default BlogDetails;
