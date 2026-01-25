import { memo } from 'react';
import { Avatar, Divider, Flex, Text } from '@mantine/core';

const LastComment = memo(({ blog, divider }) => {
  const { title, publishDate, authorAvatar } = blog;

  return (
    <>
      <Flex align={'center'} className="!gap-4">
        <div>
          <Avatar src={authorAvatar} alt="author-img" size={'lg'} />
        </div>
        <div>
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
});

export default LastComment;
