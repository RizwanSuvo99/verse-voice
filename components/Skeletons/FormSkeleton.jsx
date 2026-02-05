'use client';
import { SimpleGrid, Skeleton, Space } from '@mantine/core';

const FormSkeleton = ({ fields = 6 }) => {
  const rows = Math.ceil(fields / 2);
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} mt={i === 0 ? 'xl' : 'md'}>
            <Skeleton height={44} radius="lg" />
            {i * 2 + 1 < fields && <Skeleton height={44} radius="lg" />}
          </SimpleGrid>
        </div>
      ))}
      <Space h="md" />
      <Skeleton height={250} radius="lg" />
    </div>
  );
};

export default FormSkeleton;
