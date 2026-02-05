import { memo } from 'react';
import { AspectRatio, Divider, Flex, Image, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PopularSingleBlog = memo(({ blog, divider }) => {
  const { _id, blogPicUrl, title, publishDate, createdBy } = blog;

  return (
    <Link href={`/blogs/${_id}`} className="!no-underline">
      <Flex className="!max-h-[80px] !cursor-pointer !gap-3">
        <div className="!flex-1" style={{ overflow: 'hidden' }}>
          <AspectRatio ratio={1}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Image src={blogPicUrl} height={80} alt={title} radius="lg" />
            </motion.div>
          </AspectRatio>
        </div>
        <div className="!flex-1">
          <Text fw={500} size="sm" lineClamp={2}>
            {title}
          </Text>
          <div>
            <Text fw={400} size="xs" c="dimmed">
              {createdBy?.name}
            </Text>
            <Text fw={400} size="xs" c="dimmed">
              {publishDate ? dayjs(publishDate).format('D MMM YYYY') : ''}
            </Text>
          </div>
        </div>
      </Flex>
      {divider && <Divider mt="sm" />}
    </Link>
  );
});

PopularSingleBlog.displayName = 'PopularSingleBlog';

export default PopularSingleBlog;
