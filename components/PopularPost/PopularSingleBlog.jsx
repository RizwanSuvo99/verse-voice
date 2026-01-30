import { AspectRatio, Divider, Flex, Image, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PopularSingleBlog = ({ blog, divider }) => {
  const { _id, blogPicUrl, title, publishDate, createdBy } = blog;

  return (
    <Link href={`/blogs/${_id}`} className="!no-underline">
      <Flex className="!max-h-[100px] !cursor-pointer !gap-4">
        <div className="!flex-1" style={{ overflow: 'hidden' }}>
          <AspectRatio ratio={1}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={blogPicUrl} height={100} alt={title} radius="md" />
            </motion.div>
          </AspectRatio>
        </div>
        <div className="!flex-1">
          <Text fw={500} className="!text-md !mb-2" lineClamp={3}>
            {title}
          </Text>
          <div>
            <Text fw={400} className="!text-sm">
              {createdBy?.name}
            </Text>
            <Text fw={400} className="!text-sm">
              {publishDate ? dayjs(publishDate).format('D MMM YYYY') : ''}
            </Text>
          </div>
        </div>
      </Flex>
      {divider && <Divider mt="md" />}
    </Link>
  );
};

export default PopularSingleBlog;
