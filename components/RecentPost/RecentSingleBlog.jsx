import { memo } from 'react';
import FavoriteButton from '@/components/FavoriteButton';
import { stripHtml } from '@/utils/stripHtml';
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
import dayjs from 'dayjs';
import Link from 'next/link';

const RecentSingleBlog = memo(({ blog }) => {
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
    <Flex
      className="!min-h-[220px] !gap-3"
      direction={{ base: 'column', sm: 'row' }}
    >
      <div className="!flex-1">
        <AspectRatio ratio={1}>
          <Image src={blogPicUrl} height={200} alt="Blog Image" radius="md" />
        </AspectRatio>
      </div>
      <div className="!flex-1">
        <Group justify="space-between">
          <Badge>{category}</Badge>
          <Group className="!gap-2">
            <FavoriteButton blogId={_id} size={14} />
            <IconClock size={14} />
            <Text fw={400} size="xs">
              {timeRead || '3 mins read'}
            </Text>
          </Group>
        </Group>
        <Space h={'xs'} />
        <Text fw={500} className="!text-[18px]" lineClamp={2}>
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
  );
});

RecentSingleBlog.displayName = 'RecentSingleBlog';

export default RecentSingleBlog;
