'use client';

import { getAllContacts, markAsRead } from '@/api/contact.mjs';
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
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

const ContactMessages = () => {
  const queryClient = useQueryClient();

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: getAllContacts,
  });

  const { mutate: markRead } = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Marked as read');
    },
  });

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
              {!msg.isRead && (
                <Button
                  mt="md"
                  size="xs"
                  variant="light"
                  onClick={() => markRead(msg._id)}
                >
                  Mark as Read
                </Button>
              )}
            </Card>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default ContactMessages;
