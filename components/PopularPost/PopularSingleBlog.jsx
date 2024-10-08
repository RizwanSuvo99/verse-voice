import { AspectRatio, Divider, Flex, Image, Text } from '@mantine/core';

const PopularSingleBlog = ({ blog, divider }) => {
  const { imgUrl, title, publishDate, authorName } = blog;

  return (
    <>
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
    </>
  );
};

export default PopularSingleBlog;
