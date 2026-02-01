import { memo } from 'react';
import { Divider, Flex, Text } from '@mantine/core';
import { OptimizedAvatar } from '@/components/ui';

const LastComment = memo(({ blog, divider }) => {
  const { title, publishDate, authorAvatar } = blog;

  return (
    <>
      <Flex align={'center'} className="!gap-4">
        <div>
          <OptimizedAvatar src={authorAvatar} name={title} preset="lg" />
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

LastComment.displayName = 'LastComment';

export default LastComment;
