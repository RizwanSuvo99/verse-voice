'use client';
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
import Link from 'next/link';

const SingleBlog = ({ blog }) => {
  const {
    id,
    imgUrl,
    title,
    description,
    category,
    authorName,
    authorAvatar,
    publishDate,
    timeRead,
  } = blog;
  // const theme = useMantineTheme();
  // const [like, setLike] = useState(false);

  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Flex direction="column" className="!min-h-[550px] !gap-4">
        <div className="!flex-1">
          <AspectRatio ratio={1}>
            <Image src={imgUrl} height={250} alt="Blog Image" radius="md" />
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

            {/* Read More Button with Gradient Border */}
            <Button
              variant="outline" // Use outline variant for a bordered button
              style={{
                backgroundColor: 'transparent', // Transparent background
                border: '2px solid transparent', // Initial transparent border
                borderImage: 'linear-gradient(45deg, #0ea5ea, #0bd1d1) 1', // Gradient border
                color: '#0ea5ea', // Text color to match gradient
                borderRadius: '5px', // Optional: round corners
              }}
            >
              <Link href={`/blogs/${id}`} className="!no-underline">
                Read More
              </Link>
            </Button>
          </Group>
        </div>

        {/*         <Group justify="space-between">
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
        </Group> */}
      </Flex>
    </Card>
  );
};

export default SingleBlog;
