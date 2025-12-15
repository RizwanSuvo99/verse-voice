'use client';

import {
  getAllRequests,
  approveRequest,
  rejectRequest,
  deleteRequest,
} from '@/api/blogRequests.mjs';
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
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const statusColors = { pending: 'yellow', approved: 'green', rejected: 'red' };

const BlogRequests = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [rejectNote, setRejectNote] = useState({});

  const { data: requests, isLoading } = useQuery({
    queryKey: ['allRequests'],
    queryFn: getAllRequests,
  });

  const { mutate: approve } = useMutation({
    mutationFn: approveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allRequests'] });
      toast.success('Request approved & blog published!');
    },
  });

  const { mutate: reject } = useMutation({
    mutationFn: rejectRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allRequests'] });
      toast.error('Request rejected');
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allRequests'] });
      toast.info('Request deleted');
    },
  });

  if (isLoading) {
    return <BlogGridSkeleton count={4} cols={{ base: 1, md: 2 }} />;
  }

  return (
    <div>
      <Text component={Title} variant="gradient" className="!mb-4 !text-lg">
        Blog Requests
      </Text>

      {!requests || requests.length === 0 ? (
        <Text c="dimmed">No blog requests</Text>
      ) : (
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          {requests.map((req) => (
            <Card key={req._id} withBorder padding="lg" radius="md">
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
                      onClick={() => deleteMutate(req._id)}
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
