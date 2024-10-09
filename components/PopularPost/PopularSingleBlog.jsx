import { AspectRatio, Divider, Flex, Image, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PopularSingleBlog = ({ blog, divider }) => {
  const { id, imgUrl, title, publishDate, authorName } = blog;

  return (
    <Link href={`/blogs/${id}`} className="!no-underline">
      <Flex className="!max-h-[100px] !cursor-pointer !gap-4">
        <div className="!flex-1" style={{ overflow: 'hidden' }}>
          <AspectRatio ratio={1}>
            <motion.div
              whileHover={{ scale: 1.05 }} // Scaling effect on hover
              transition={{ duration: 0.3 }} // Smooth transition
            >
              <Image src={imgUrl} height={100} alt="Norway" radius="md" />
            </motion.div>
          </AspectRatio>
        </div>
        <div className="!flex-1">
          <Text fw={500} className="!text-md !mb-2" lineClamp={3}>
            {title}
          </Text>
          <div>
            <Text fw={400} className="!text-sm">
              {authorName}
            </Text>
            <Text fw={400} className="!text-sm">
              {publishDate}
            </Text>
          </div>
        </div>
      </Flex>
      {divider && <Divider mt="md" />}
    </Link>
  );
};

export default PopularSingleBlog;
