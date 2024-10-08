import {
  AspectRatio,
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Space,
  Text,
} from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import NextImage from 'next/image';
import Link from 'next/link';

const SingleBlog = ({ blog }) => {
  const {
    id,
    imgUrl,
    title,
    category,
    authorName,
    authorAvatar,
    publishDate,
    timeRead,
  } = blog;

  return (
    <Card shadow="sm" padding="xl" radius="xl" withBorder className="!h-full">
      <AspectRatio ratio={4 / 3}>
        <Image
          component={NextImage}
          src={imgUrl}
          height={350}
          alt="Norway"
          radius="xl"
        />
      </AspectRatio>
      <Space h={'xl'} />
      <Group justify="space-between">
        <Badge>{category}</Badge>
        <Group className="!gap-2">
          <IconClock size={18} />
          <Text>{timeRead}</Text>
        </Group>
      </Group>
      <Space h={'lg'} />
      <Text fw={500} className="!text-2xl" lineClamp={2}>
        {title}
      </Text>
      <Group justify="space-between" mt="md" mb="xs">
        <Group className="!items-center">
          <Avatar src={authorAvatar} alt="author-img" />
          <div>
            <Text className="!text-xl !font-bold">{authorName}</Text>
            <Text className="!text-sm">{publishDate}</Text>
          </div>
        </Group>
        <Button variant="transparent">
          <Link href={`/blogs/${id}`} className="!no-underline">
            Read More
          </Link>
        </Button>
      </Group>
    </Card>
  );
};

export default SingleBlog;
