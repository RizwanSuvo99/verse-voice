'use client';
import FavoriteButton from '@/components/FavoriteButton';
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
    <Card shadow="sm" padding="sm" radius="md" withBorder className="glass-card">
      <Flex direction="column" className="!min-h-[570px] !gap-4">
        <div className="!flex-1">
          <AspectRatio ratio={1}>
            <Image src={blogPicUrl} height={270} alt="Blog Image" radius="md" />
          </AspectRatio>
        </div>
        <div className="!flex-1">
          <Group justify="space-between">
            <Badge>{category}</Badge>
            <Group className="!gap-2">
              <FavoriteButton blogId={_id} size={18} />
              <IconClock size={15} />
              <Text fw={400} className="!text-sm">
                {timeRead || '3 mins read'}
              </Text>
            </Group>
          </Group>
          <Space h={'lg'} />
          <Text fw={500} className="!text-[24px]" lineClamp={2}>
            {title}
          </Text>
          <Text fw={400} className="!mt-3 !text-sm" lineClamp={4}>
            {content}
          </Text>
          <Group justify="space-between" mt="md" mb="xs">
            <Group className="!items-center">
              <Avatar src={createdBy?.avatar} alt="author-img" />
              <div>
                <Text className="!text-md !font-500">{createdBy?.name}</Text>
                <Text fw={400} className="!text-sm">
                  {publishDate ? dayjs(publishDate).format('D MMM YYYY') : ''}
                </Text>
              </div>
            </Group>
            <Button
              variant="outline"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid transparent',
                borderImage: 'linear-gradient(45deg, #0ea5ea, #0bd1d1) 1',
                color: '#0ea5ea',
                borderRadius: '5px',
              }}
            >
              <Link href={`/blogs/${_id}`} className="!no-underline">
                Read More
              </Link>
            </Button>
          </Group>
        </div>
      </Flex>
    </Card>
  );
};

export default SingleBlog;
