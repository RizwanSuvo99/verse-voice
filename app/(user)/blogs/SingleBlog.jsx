'use client';
import FavoriteButton from '@/components/FavoriteButton';
import { stripHtml } from '@/utils/stripHtml';
import { OptimizedImage, OptimizedAvatar } from '@/components/ui';
import {
  Badge,
  Button,
  Card,
  Flex,
  Group,
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
      <Flex direction="column" className="!gap-2">
        <div style={{ height: '200px', position: 'relative', borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
          <OptimizedImage
            src={blogPicUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div>
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
              <OptimizedAvatar src={createdBy?.avatar} name={createdBy?.name} preset="sm" />
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
