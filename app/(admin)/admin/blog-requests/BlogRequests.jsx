'use client';

import { getAllRequests } from '@/api/blogRequests.mjs';
import { useApproveRequest, useRejectRequest, useDeleteRequest, useClearAllRequests } from '@/hooks/mutations';
import BlogGridSkeleton from '@/components/Skeletons/BlogGridSkeleton';
import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Space,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { modals } from '@mantine/modals';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const statusColors = { pending: 'yellow', approved: 'green', rejected: 'red' };

const BlogRequests = () => {
  const router = useRouter();
  const [rejectNote, setRejectNote] = useState({});

  const { data: requests, isLoading } = useQuery({
    queryKey: ['allRequests'],
    queryFn: getAllRequests,
  });

  // Use optimistic mutation hooks
  const { mutate: approve } = useApproveRequest();
  const { mutate: reject } = useRejectRequest();
  const { mutate: deleteMutate } = useDeleteRequest();
  const { mutate: clearAll } = useClearAllRequests();

  if (isLoading) {
    return <BlogGridSkeleton count={4} cols={{ base: 1, md: 2 }} />;
  }

  return (
    <div>
      <Group justify="space-between" className="!mb-4">
        <Text component={Title} variant="gradient" className="!text-lg">
          Blog Requests
        </Text>
        {requests && requests.length > 0 && (
          <Button
            color="red"
            variant="light"
            size="xs"
            onClick={() =>
              modals.openConfirmModal({
                title: 'Clear All Requests',
                children: 'Are you sure you want to delete all blog requests? This action cannot be undone.',
                labels: { confirm: 'Clear All', cancel: 'Cancel' },
                confirmProps: { color: 'red' },
                onConfirm: () => clearAll(),
              })
            }
          >
            Clear All
          </Button>
        )}
      </Group>

      {!requests || requests.length === 0 ? (
        <Text c="dimmed">No blog requests</Text>
      ) : (
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          {requests.map((req) => (
            <Card
              key={req._id}
              withBorder
              padding="lg"
              radius="md"
              style={{ opacity: req._isOptimistic ? 0.7 : 1 }}
            >
              <Group justify="space-between" mb="sm">
                <Badge color={statusColors[req.status]} variant="filled">
                  {req.status}
                </Badge>
                <Text fz="xs" c="dimmed">
                  {dayjs(req.createdAt).format('D MMM YYYY')}
                </Text>
              </Group>
              <Text fw={600} size="lg" lineClamp={2}>
                {req.title}
              </Text>
              <Text fz="sm" c="dimmed">
                By: {req.authorName} | Category: {req.category}
              </Text>
              <Text fz="sm" c="dimmed">
                Submitted by: {req.submittedBy?.name} ({req.submittedBy?.email})
              </Text>
              <Text fz="sm" mt="xs" lineClamp={3}>
                {req.content}
              </Text>

              {req.status === 'pending' && (
                <>
                  <Space h="sm" />
                  <Textarea
                    placeholder="Admin note (optional, for rejection)"
                    value={rejectNote[req._id] || ''}
                    onChange={(e) =>
                      setRejectNote((prev) => ({
                        ...prev,
                        [req._id]: e.target.value,
                      }))
                    }
                    minRows={2}
                  />
                  <Group mt="md">
                    <Button
                      color="green"
                      size="sm"
                      onClick={() => approve(req._id)}
                    >
                      Approve
                    </Button>
                    <Button
                      color="cyan"
                      size="sm"
                      onClick={() => router.push(`/admin/edit-request/${req._id}`)}
                    >
                      Edit &amp; Approve
                    </Button>
                    <Button
                      color="red"
                      size="sm"
                      onClick={() =>
                        reject({
                          id: req._id,
                          adminNote: rejectNote[req._id] || '',
                        })
                      }
                    >
                      Reject
                    </Button>
                    <Button
                      color="gray"
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        modals.openConfirmModal({
                          title: 'Delete Request',
                          children: 'Are you sure you want to delete this request? This action cannot be undone.',
                          labels: { confirm: 'Delete', cancel: 'Cancel' },
                          confirmProps: { color: 'red' },
                          onConfirm: () => deleteMutate(req._id),
                        })
                      }
                    >
                      Delete
                    </Button>
                  </Group>
                </>
              )}
            </Card>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default BlogRequests;
