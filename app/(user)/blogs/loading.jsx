import BlogGridSkeleton from '@/components/Skeletons/BlogGridSkeleton';
import { Container, Skeleton, Space, Stack } from '@mantine/core';

export default function Loading() {
  return (
    <Container size={1500} className="!pt-[24px]">
      <Stack align="center" mb="md">
        <Skeleton height={28} width={120} radius="md" />
        <Skeleton height={14} width={180} radius="sm" />
      </Stack>
      <BlogGridSkeleton count={6} />
      <Space h="md" />
      <Skeleton height={36} width={200} radius="md" mx="auto" />
    </Container>
  );
}
