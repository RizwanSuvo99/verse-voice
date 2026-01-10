'use client';

import { getSubscribers } from '@/api/newsletter.mjs';
import { useDeleteSubscriber } from '@/hooks/mutations';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import { ActionIcon, Table, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useQuery } from '@tanstack/react-query';
import { IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';

const NewsletterSubs = () => {
  const { data: subscribers, isLoading } = useQuery({
    queryKey: ['subscribers'],
    queryFn: getSubscribers,
  });

  const { mutate: deleteSubscriber } = useDeleteSubscriber();

  if (isLoading) {
    return <TableSkeleton rows={5} columns={3} />;
  }

  return (
    <div>
      <Text component={Title} variant="gradient" className="!mb-4 !text-lg">
        Newsletter Subscribers
      </Text>

      {!subscribers || subscribers.length === 0 ? (
        <Text c="dimmed">No subscribers yet</Text>
      ) : (
        <Table.ScrollContainer minWidth={500}>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Subscribed At</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {subscribers.map((sub) => (
                <Table.Tr key={sub._id}>
                  <Table.Td>{sub.name}</Table.Td>
                  <Table.Td>{sub.email}</Table.Td>
                  <Table.Td>
                    {dayjs(sub.subscribedAt).format('D MMM YYYY')}
                  </Table.Td>
                  <Table.Td>
                    <ActionIcon
                      color="red"
                      variant="subtle"
                      onClick={() =>
                        modals.openConfirmModal({
                          title: 'Delete Subscriber',
                          children: `Are you sure you want to remove ${sub.name} (${sub.email}) from the newsletter?`,
                          labels: { confirm: 'Delete', cancel: 'Cancel' },
                          confirmProps: { color: 'red' },
                          onConfirm: () => deleteSubscriber(sub._id),
                        })
                      }
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      )}
    </div>
  );
};

export default NewsletterSubs;
