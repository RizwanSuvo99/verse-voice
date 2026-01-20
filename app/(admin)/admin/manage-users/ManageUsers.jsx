'use client';

import { getAllUsers } from '@/api/adminUsers.mjs';
import { useDeleteUser, useToggleBan } from '@/hooks/mutations';
import { OptimizedAvatar } from '@/components/ui';
import {
  ActionIcon,
  Badge,
  Group,
  Pagination,
  rem,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconBan, IconSearch, IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';

const ManageUsers = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading } = useQuery({
    queryKey: ['adminUsers', page, debouncedSearch],
    queryFn: () => getAllUsers({ page, search: debouncedSearch }),
    placeholderData: (prev) => prev,
  });

  const queryParams = { page, search: debouncedSearch };

  const { mutate: toggleBan } = useToggleBan(queryParams);
  const { mutate: deleteMutate } = useDeleteUser(queryParams);

  if (isLoading) {
    return <TableSkeleton rows={5} columns={6} />;
  }

  const users = data?.users || [];

  const rows = users.map((user) => (
    <Table.Tr key={user._id}>
      <Table.Td>
        <Group gap="sm">
          <OptimizedAvatar size={40} src={user.avatar} name={user.name} />
          <Text fz="sm" fw={500}>
            {user.name}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{user.email}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{dayjs(user.createdAt).format('D MMM YYYY')}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={user.isBanned ? 'red' : 'green'} variant="light">
          {user.isBanned ? 'Banned' : 'Active'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon
            variant="subtle"
            color={user.isBanned ? 'green' : 'orange'}
            onClick={() => toggleBan(user._id)}
            title={user.isBanned ? 'Unban user' : 'Ban user'}
          >
            <IconBan style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() =>
              modals.openConfirmModal({
                title: 'Delete User',
                children:
                  'Are you sure you want to delete this user? This will also remove their blogs and comments. This action cannot be undone.',
                labels: { confirm: 'Delete', cancel: 'Cancel' },
                confirmProps: { color: 'red' },
                onConfirm: () => deleteMutate(user._id),
              })
            }
          >
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Group mb="sm" justify="space-between">
        <Text fw={500} c="dimmed">
          {data?.total || 0} user{data?.total !== 1 ? 's' : ''} total
        </Text>
      </Group>
      <Group mb="md">
        <TextInput
          placeholder="Search by name or email..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
      </Group>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Joined</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Text ta="center" c="dimmed" py="md">
                    No users found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {(data?.totalPages || 0) > 1 && (
        <Pagination
          className="glass-pagination"
          total={data.totalPages}
          value={page}
          onChange={setPage}
          mt="md"
        />
      )}
    </>
  );
};

export default ManageUsers;
