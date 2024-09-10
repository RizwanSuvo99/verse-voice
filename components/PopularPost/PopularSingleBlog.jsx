import { AspectRatio, Divider, Flex, Image, Text } from '@mantine/core';

const PopularSingleBlog = ({ blog, divider }) => {
  const { imgUrl, title, publishDate } = blog;

  return (
    <>
      <Flex className="!gap-4">
        <div className="!flex-1">
          <AspectRatio ratio={1}>
            <Image src={imgUrl} height={100} alt="Norway" radius="md" />
          </AspectRatio>
        </div>
        <div className="!flex-1">
          <Text fw={500} className="!text-md" lineClamp={3}>
            {title}
          </Text>

          <Text fw={400} className="!text-sm">
            {publishDate}
          </Text>
        </div>
      </Flex>
      {divider && <Divider mt="md" />}
    </>
  );
};

export default PopularSingleBlog;
