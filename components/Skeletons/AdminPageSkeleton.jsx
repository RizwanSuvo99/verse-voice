'use client';

import { AppShell, Skeleton, Space, Stack } from '@mantine/core';

const AdminPageSkeleton = () => (
  <AppShell
    header={{ height: 60 }}
    navbar={{ width: 260, breakpoint: 'sm' }}
    padding="md"
  >
    <AppShell.Header>
      <Skeleton height={60} radius={0} />
    </AppShell.Header>

    <AppShell.Navbar p="md">
      <Stack gap="xs">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} height={40} radius="md" />
        ))}
      </Stack>
    </AppShell.Navbar>

    <AppShell.Main>
      <Stack>
        <Skeleton height={28} width={200} radius="md" />
        <Space h="xs" />
        <Skeleton height={400} radius="lg" />
      </Stack>
    </AppShell.Main>
  </AppShell>
);

export default AdminPageSkeleton;
