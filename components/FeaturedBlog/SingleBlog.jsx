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
import { motion } from 'framer-motion';
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
    <motion.div
      whileHover="hover" // Trigger the animation on hover
    >
      <Card shadow="sm" radius="md" withBorder className="!h-full">
        <AspectRatio ratio={4 / 3}>
          <motion.div
            variants={{
              hover: { scale: 1.05 }, // Smoothly scale the image slightly larger on hover
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }} // Smooth and slow transition
            style={{ borderRadius: '0.75rem', overflow: 'hidden' }}
          >
            <Image
              src={imgUrl}
              height={300}
              alt={title}
              radius="md"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Image stays 100% width and height
            />
          </motion.div>
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
              <Text className="!text-md !font-bold">{authorName}</Text>
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
    </motion.div>
  );
};

export default SingleBlog;
