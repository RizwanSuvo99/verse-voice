import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import { Skeleton, Stack } from '@mantine/core';

export default function Loading() {
  return (
    <Stack>
      <Skeleton height={28} width={180} radius="md" />
      <TableSkeleton rows={8} columns={5} />
    </Stack>
  );
}
