'use client';
import { Grid, Skeleton, Space, Flex, Group } from '@mantine/core';

const BlogDetailSkeleton = () => (
  <div>
    <Skeleton height={36} width="70%" radius="sm" />
    <Space h="xs" />
    <Skeleton height={36} width="50%" radius="sm" />
    <Space h="md" />
    <Skeleton height={24} width={80} radius="xl" />
    <Space h="md" />
    <Flex justify="space-between" align="center">
      <Group>
        <Skeleton height={44} width={44} radius="xs" />
        <div>
          <Skeleton height={18} width={120} radius="sm" />
          <Skeleton height={14} width={100} radius="sm" mt={4} />
          <Skeleton height={14} width={140} radius="sm" mt={4} />
        </div>
      </Group>
    </Flex>
    <Space h="md" />
    <Grid>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Skeleton height={320} radius="md" />
        <Space h="md" />
        <Skeleton height={16} radius="sm" />
        <Skeleton height={16} radius="sm" mt={8} />
        <Skeleton height={16} width="90%" radius="sm" mt={8} />
        <Skeleton height={16} radius="sm" mt={8} />
        <Skeleton height={16} width="80%" radius="sm" mt={8} />
        <Space h="md" />
        <Skeleton height={16} radius="sm" />
        <Skeleton height={16} radius="sm" mt={8} />
        <Skeleton height={16} width="85%" radius="sm" mt={8} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Skeleton height={240} radius="md" />
        <Space h="md" />
        <Skeleton height={160} radius="md" />
      </Grid.Col>
    </Grid>
  </div>
);

export default BlogDetailSkeleton;
