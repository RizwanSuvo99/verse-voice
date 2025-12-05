'use client';

import { Container, Skeleton, Space, Stack } from '@mantine/core';

const PageSkeleton = () => (
  <Container size={1500} py="xl">
    <Stack align="center" mb="xl">
      <Skeleton height={32} width={200} radius="md" />
      <Skeleton height={16} width={300} radius="sm" />
    </Stack>
    <Space h="md" />
    <Skeleton height={300} radius="lg" />
    <Space h="md" />
    <Skeleton height={200} radius="lg" />
  </Container>
);

export default PageSkeleton;
