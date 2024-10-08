import { AspectRatio, Divider, Flex, Image, Text } from '@mantine/core';
import Link from 'next/link';

const PopularSingleBlog = ({ blog, divider }) => {
  const { id, imgUrl, title, publishDate, authorName } = blog;

  return (
    <Link href={`/blogs/${id}`} className="!no-underline">
      <Flex className="!cursor-pointer !gap-4">
        <div className="!flex-1">
          <AspectRatio ratio={1}>
            <Image src={imgUrl} height={100} alt="Norway" radius="md" />
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
