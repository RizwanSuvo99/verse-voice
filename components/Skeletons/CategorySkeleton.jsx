'use client';
import { Group, Skeleton } from '@mantine/core';

const CategorySkeleton = ({ count = 6 }) => (
  <Group gap="sm">
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton
        key={i}
        height={36}
        width={120 + Math.random() * 60}
        radius="lg"
      />
    ))}
  </Group>
);

export default CategorySkeleton;
