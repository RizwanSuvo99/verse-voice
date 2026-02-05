'use client';

import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  Image,
  rem,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconHeartFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';
import classes from './ArticleCardFooter.module.css';

const FavouritesSingle = ({ favorite, onRemove }) => {
  const theme = useMantineTheme();
  const blog = favorite?.blog;

  if (!blog) return null;

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Link href={`/blogs/${blog._id}`}>
          <Image src={blog.blogPicUrl} alt={blog.title} height={180} />
        </Link>
      </Card.Section>

      <Badge w="fit-content" variant="light">
        {blog.category}
      </Badge>

      <Text fw={700} className={classes.title} mt="xs" lineClamp={2}>
        <Link href={`/blogs/${blog._id}`} className="!no-underline">
          {blog.title}
        </Link>
      </Text>

      <Group mt="md">
        <Avatar src={blog.createdBy?.avatar} radius="sm" size="sm" />
        <div>
          <Text fw={500} size="sm">
            {blog.createdBy?.name}
          </Text>
          <Text fz="xs" c="dimmed">
            {blog.publishDate
              ? dayjs(blog.publishDate).format('D MMM YYYY')
              : ''}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            {blog.likesCount || 0} likes
          </Text>
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray" onClick={onRemove}>
              <IconHeartFilled
                style={{ width: rem(18), height: rem(18) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default FavouritesSingle;
