'use client';
import FavoriteButton from '@/components/FavoriteButton';
import { stripHtml } from '@/utils/stripHtml';
import {
  AspectRatio,
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Space,
  Text,
} from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';

const SingleBlog = ({ blog }) => {
  const {
    _id,
    blogPicUrl,
    title,
    content,
    category,
    createdBy,
    publishDate,
    timeRead,
  } = blog;

  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Flex direction="column" className="!min-h-[380px] !gap-2">
        <div className="!flex-1">
          <AspectRatio ratio={1}>
            <Image src={blogPicUrl} height={200} alt="Blog Image" radius="md" />
          </AspectRatio>
        </div>
        <div className="!flex-1">
          <Group justify="space-between">
            <Badge>{category}</Badge>
            <Group className="!gap-2">
              <FavoriteButton blogId={_id} size={16} />
              <IconClock size={14} />
              <Text fw={400} size="xs">
                {timeRead || '3 mins read'}
              </Text>
            </Group>
          </Group>
          <Space h={'xs'} />
          <Text fw={500} className="!text-[16px]" lineClamp={2}>
            {title}
          </Text>
          <Text fw={400} className="!mt-2 !text-xs" c="dimmed" lineClamp={3}>
            {stripHtml(content)}
          </Text>
          <Group justify="space-between" mt="xs" mb="xs">
            <Group className="!items-center">
              <Avatar src={createdBy?.avatar} alt="author-img" size="sm" />
              <div>
                <Text className="!text-sm !font-medium">{createdBy?.name}</Text>
                <Text fw={400} size="xs" c="dimmed">
                  {publishDate ? dayjs(publishDate).format('D MMM YYYY') : ''}
                </Text>
              </div>
            </Group>
            <Button
              variant="subtle"
              color="cyan"
              component={Link}
              href={`/blogs/${_id}`}
              size="compact-sm"
            >
              Read More
            </Button>
          </Group>
        </div>
      </Flex>
    </Card>
  );
};

export default SingleBlog;
