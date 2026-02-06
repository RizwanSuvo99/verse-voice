'use client';

import { getAllContacts } from '@/api/contact.mjs';
import { useMarkContactRead, useDeleteContact } from '@/hooks/mutations';
import BlogGridSkeleton from '@/components/Skeletons/BlogGridSkeleton';
import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { modals } from '@mantine/modals';
import dayjs from 'dayjs';

const ContactMessages = () => {
  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: getAllContacts,
  });

  // Use optimistic mutation hooks
  const { mutate: markRead } = useMarkContactRead();
  const { mutate: deleteMutate } = useDeleteContact();

  if (isLoading) {
    return <BlogGridSkeleton count={4} cols={{ base: 1, md: 2 }} />;
  }

  return (
    <div>
      <Text component={Title} variant="gradient" className="!mb-4 !text-lg">
        Contact Messages
      </Text>

      {!contacts || contacts.length === 0 ? (
        <Text c="dimmed">No messages</Text>
      ) : (
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          {contacts.map((msg) => (
            <Card key={msg._id} withBorder padding="lg" radius="md">
              <Group justify="space-between" mb="sm">
                <Badge color={msg.isRead ? 'green' : 'yellow'} variant="filled">
                  {msg.isRead ? 'Read' : 'Unread'}
                </Badge>
                <Text fz="xs" c="dimmed">
                  {dayjs(msg.createdAt).format('D MMM YYYY HH:mm')}
                </Text>
              </Group>
              <Text fw={600}>{msg.subject}</Text>
              <Text fz="sm" c="dimmed">
                From: {msg.name} ({msg.email})
                {msg.phone && ` | Phone: ${msg.phone}`}
              </Text>
              <Space h="sm" />
              <Text fz="sm">{msg.message}</Text>
              <Group mt="md" gap="xs">
                {!msg.isRead && (
                  <Button
                    size="xs"
                    variant="light"
                    onClick={() => markRead(msg._id)}
                  >
                    Mark as Read
                  </Button>
                )}
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() =>
                    modals.openConfirmModal({
                      title: 'Delete Message',
                      children: 'Are you sure you want to delete this message? This action cannot be undone.',
                      labels: { confirm: 'Delete', cancel: 'Cancel' },
                      confirmProps: { color: 'red' },
                      onConfirm: () => deleteMutate(msg._id),
                    })
                  }
                >
                  Delete
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default ContactMessages;
