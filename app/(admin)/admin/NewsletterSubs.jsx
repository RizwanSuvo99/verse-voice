'use client';

import { getSubscribers } from '@/api/newsletter.mjs';
import {
  Center,
  Loader,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

const NewsletterSubs = () => {
  const { data: subscribers, isLoading } = useQuery({
    queryKey: ['subscribers'],
    queryFn: getSubscribers,
  });

  if (isLoading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  return (
    <div>
      <Text component={Title} variant="gradient" className="!mb-6 !text-2xl">
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
