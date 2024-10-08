import { AspectRatio, Image, Space, Text } from '@mantine/core';

const BlogDetails = ({ singleBlogData }) => {
  const data = singleBlogData.description.trim().split('\n\n');

  return (
    <>
      <AspectRatio ratio={1}>
        <Image
          src={singleBlogData.imgUrl}
          height={500}
          alt="Norway"
          radius="md"
        />
      </AspectRatio>
      <Space h={'md'} />

      {data.map((item) => {
        return (
          <>
            <Text className="!text-[18px]">{item}</Text>
            <Space h={'md'} />
          </>
        );
      })}
      {/*  <Space h={'xl'} />
            <Text className="!text-3xl">
        1 Comment on {`"${singleBlogData.title}":`}
      </Text>
      <Space h={'xl'} />
      <Flex justify={'space-between'} align={'center'}>
        <Group>
          <Avatar
            radius={'xl'}
            size={'lg'}
            src={singleBlogData.authorAvatar}
            alt="author-img"
          />
          <div>
            <Text fw={500} className="!text-[16px]">
              {singleBlogData.authorName}
            </Text>
            <Text fw={400} className="!text-xs">
              {singleBlogData.publishDate}
            </Text>
          </div>
        </Group>
        <Card>
          <Text>
            Thirty there & time wear across days, make inside on these you.
          </Text>
        </Card>
      </Flex>
      <Space h={'md'} />
      <Flex justify={'space-between'} align={'center'}>
        <Group>
          <Avatar
            radius={'xl'}
            size={'lg'}
            src={singleBlogData.authorAvatar}
            alt="author-img"
          />
          <div>
            <Text fw={500} className="!text-[16px]">
              {singleBlogData.authorName}
            </Text>
            <Text fw={400} className="!text-xs">
              {singleBlogData.publishDate}
            </Text>
          </div>
        </Group>
        <Card>
          <Text>
            Thirty there & time wear across days, make inside on these you.
          </Text>
        </Card>
      </Flex>
      <Space h={'xl'} />
      <Divider size={'sm'} />
      <Space h={'xl'} />
      <Text fw={500} className="!text-3xl">
        {' '}
        Leave a comment
      </Text>
      <Space h={'sm'} />
      <Text>
        You must be{' '}
        <Text component={Link} href={'/login'} className="!text-blue-500">
          logged in
        </Text>{' '}
        to post a comment.
      </Text> */}
    </>
  );
};

export default BlogDetails;
