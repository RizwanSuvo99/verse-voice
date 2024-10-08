import {
  AspectRatio,
  Avatar,
  Badge,
  Button,
  Flex,
  Group,
  Image,
  Space,
  Text,
} from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import NextImage from 'next/image';
import Link from 'next/link';

const RecentSingleBlog = ({ blog }) => {
  const {
    id,
    imgUrl,
    title,
    description,
    category,
    authorName,
    authorAvatar,
    publishDate,
    timeRead,
  } = blog;
  return (
    <Flex className="!min-h-[280px] !gap-4">
      <div className="!flex-1">
        <AspectRatio ratio={1}>
          <Image
            component={NextImage}
            src={imgUrl}
            height={270}
            alt="Norway"
            radius="md"
          />
        </AspectRatio>
      </div>
      <div className="!flex-1">
        <Group justify="space-between">
          <Badge>{category}</Badge>
          <Group className="!gap-2">
            <IconClock size={15} />
            <Text fw={400} className="!text-sm">
              {timeRead}
            </Text>
          </Group>
        </Group>
        <Space h={'lg'} />
        <Text fw={500} className="!text-[24px]" lineClamp={2}>
          {title}
        </Text>
        <Text fw={400} className="!mt-3 !text-sm" lineClamp={4}>
          {description}
        </Text>
        <Group justify="space-between" mt="md" mb="xs">
          <Group className="!items-center">
            <Avatar src={authorAvatar} alt="author-img" />
            <div>
              <Text className="!text-md !font-500">{authorName}</Text>
              <Text fw={400} className="!text-sm">
                {publishDate}
              </Text>
            </div>
          </Group>
          <Button variant="transparent">
            <Link href={`/blogs/${id}`} className="!no-underline">
              Read More
            </Link>
          </Button>
        </Group>
      </div>
    </Flex>
  );
};

export default RecentSingleBlog;
