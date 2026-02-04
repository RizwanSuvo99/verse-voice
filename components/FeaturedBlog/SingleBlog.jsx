import FavoriteButton from '@/components/FavoriteButton';
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
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SingleBlog = ({ blog }) => {
  const { _id, blogPicUrl, title, category, createdBy, publishDate, timeRead } =
    blog;

  return (
    <motion.div whileHover="hover">
      <Card shadow="sm" radius="md" withBorder className="glass-card !h-full">
        <AspectRatio ratio={4 / 3}>
          <motion.div
            variants={{
              hover: { scale: 1.03 },
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ borderRadius: '0.5rem', overflow: 'hidden' }}
          >
            <Image
              src={blogPicUrl}
              height={300}
              alt={title}
              radius="md"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        </AspectRatio>

        <Space h={'sm'} />
        <Group justify="space-between">
          <Badge>{category}</Badge>
          <Group className="!gap-2">
            <FavoriteButton blogId={_id} size={16} />
            <IconClock size={16} />
            <Text size="sm">{timeRead || '3 mins read'}</Text>
          </Group>
        </Group>

        <Space h={'xs'} />
        <Text fw={500} className="!text-lg" lineClamp={2}>
          {title}
        </Text>

        <Group justify="space-between" mt="xs" mb="xs">
          <Group className="!items-center">
            <Avatar src={createdBy?.avatar} alt="author-img" size="sm" />
            <div>
              <Text className="!text-sm !font-medium">{createdBy?.name}</Text>
              <Text size="xs" c="dimmed">
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
      </Card>
    </motion.div>
  );
};

export default SingleBlog;
