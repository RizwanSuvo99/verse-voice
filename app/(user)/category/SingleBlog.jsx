'use client';
import {
  ActionIcon,
  AspectRatio,
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Image,
  rem,
  Space,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconClock, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useState } from 'react';

const SingleBlog = ({ blog }) => {
  const {
    imgUrl,
    title,
    description,
    category,
    authorName,
    authorAvatar,
    publishDate,
    timeRead,
  } = blog;
  const theme = useMantineTheme();
  const [like, setLike] = useState(false);

  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Flex direction="column" className="!min-h-[550px] !gap-4">
        <div className="!flex-1">
          <AspectRatio ratio={1}>
            <Image src={imgUrl} height={250} alt="Norway" radius="md" />
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
          <Space h={'sm'} />
          <Text fw={500} className="!text-[20px]" lineClamp={2}>
            {title}
          </Text>
          <Text fw={400} className="!mt-3 !text-[12px]" lineClamp={4}>
            {description}
          </Text>
          <Group justify="space-between" mt="md">
            <Group className="!items-center">
              <Avatar src={authorAvatar} alt="author-img" />
              <div>
                <Text className="!font-500 !text-sm">{authorName}</Text>
                <Text fw={400} className="!text-[12px]">
                  {publishDate}
                </Text>
              </div>
            </Group>
            <Button variant="transparent">Read More</Button>
          </Group>
        </div>

        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            733 people liked this
          </Text>
          <Group gap={0}>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => setLike(!like)}
            >
              {like ? (
                <IconHeartFilled
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              ) : (
                <IconHeart
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              )}
            </ActionIcon>
          </Group>
        </Group>
      </Flex>
    </Card>
  );
};

export default SingleBlog;
