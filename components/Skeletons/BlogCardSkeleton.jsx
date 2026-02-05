'use client';
import { Card, Flex, Group, Skeleton, Space } from '@mantine/core';

const BlogCardSkeleton = () => (
  <Card shadow="sm" padding="sm" radius="md" withBorder className="glass-card">
    <Flex direction="column" className="!min-h-[380px] !gap-3">
      <div className="!flex-1">
        <Skeleton height={200} radius="md" />
      </div>
      <div className="!flex-1">
        <Group justify="space-between">
          <Skeleton height={20} width={80} radius="xl" />
          <Skeleton height={16} width={100} radius="xl" />
        </Group>
        <Space h="lg" />
        <Skeleton height={24} radius="sm" />
        <Space h="xs" />
        <Skeleton height={24} width="80%" radius="sm" />
        <Space h="sm" />
        <Skeleton height={14} radius="sm" />
        <Skeleton height={14} width="90%" radius="sm" mt={4} />
        <Skeleton height={14} width="70%" radius="sm" mt={4} />
        <Group justify="space-between" mt="md">
          <Group>
            <Skeleton height={38} circle />
            <div>
              <Skeleton height={14} width={80} radius="sm" />
              <Skeleton height={12} width={100} radius="sm" mt={4} />
            </div>
          </Group>
          <Skeleton height={36} width={100} radius="sm" />
        </Group>
      </div>
    </Flex>
  </Card>
);

export default BlogCardSkeleton;
