import FormSkeleton from '@/components/Skeletons/FormSkeleton';
import { Skeleton, Stack } from '@mantine/core';

export default function Loading() {
  return (
    <Stack>
      <Skeleton height={28} width={180} radius="md" />
      <FormSkeleton fields={6} />
    </Stack>
  );
}
