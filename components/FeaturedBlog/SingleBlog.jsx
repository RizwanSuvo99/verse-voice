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

const gradientButtonStyles = {
  background: 'linear-gradient(45deg, #0ea5ea, #0bd1d1)',
  backgroundSize: '200% 100%',
  backgroundPosition: '100% 0',
  transition: 'background-position 0.4s ease',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const hoverStyles = {
  backgroundPosition: '0 0',
};

const SingleBlog = ({ blog }) => {
  const {
    _id,
    blogPicUrl,
    title,
    category,
    createdBy,
    publishDate,
    timeRead,
  } = blog;

  return (
    <motion.div whileHover="hover">
      <Card shadow="sm" radius="md" withBorder className="!h-full glass-card">
        <AspectRatio ratio={4 / 3}>
          <motion.div
            variants={{
              hover: { scale: 1.05 },
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ borderRadius: '0.75rem', overflow: 'hidden' }}
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

        <Space h={'xl'} />
        <Group justify="space-between">
          <Badge>{category}</Badge>
          <Group className="!gap-2">
            <FavoriteButton blogId={_id} size={18} />
            <IconClock size={18} />
            <Text>{timeRead || '3 mins read'}</Text>
          </Group>
        </Group>

        <Space h={'lg'} />
        <Text fw={500} className="!text-2xl" lineClamp={2}>
          {title}
        </Text>

        <Group justify="space-between" mt="md" mb="xs">
          <Group className="!items-center">
            <Avatar src={createdBy?.avatar} alt="author-img" />
            <div>
              <Text className="!text-md !font-bold">{createdBy?.name}</Text>
              <Text className="!text-sm">
                {publishDate ? dayjs(publishDate).format('D MMM YYYY') : ''}
              </Text>
            </div>
          </Group>

          <Button
            variant="transparent"
            style={gradientButtonStyles}
            onMouseOver={(e) => {
              Object.assign(e.currentTarget.style, hoverStyles);
            }}
            onMouseOut={(e) => {
              Object.assign(e.currentTarget.style, gradientButtonStyles);
            }}
          >
            <Link href={`/blogs/${_id}`} className="!text-white !no-underline">
              Read More
            </Link>
          </Button>
        </Group>
      </Card>
    </motion.div>
  );
};

export default SingleBlog;
