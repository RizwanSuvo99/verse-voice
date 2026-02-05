'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRequestById } from '@/api/blogRequests.mjs';
import AdminLayout from '../../AdminLayout';
import EditBlogRequest from './EditBlogRequest';
import { Center, Loader, Text } from '@mantine/core';

export default function EditRequestPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: request, isLoading, error } = useQuery({
    queryKey: ['blogRequest', id],
    queryFn: () => getRequestById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <Center h={400}>
          <Loader size="lg" />
        </Center>
      </AdminLayout>
    );
  }

  if (error || !request) {
    return (
      <AdminLayout>
        <Center h={400}>
          <Text c="dimmed">Request not found</Text>
        </Center>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <EditBlogRequest request={request} />
    </AdminLayout>
  );
}
