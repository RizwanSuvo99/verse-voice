'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getBlogById } from '@/api/blogs.mjs';
import AdminLayout from '../../AdminLayout';
import EditBlog from './EditBlog';
import { Center, Loader, Text } from '@mantine/core';

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlogById(id),
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

  if (error || !blog) {
    return (
      <AdminLayout>
        <Center h={400}>
          <Text c="dimmed">Blog not found</Text>
        </Center>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <EditBlog blog={blog} onSuccess={() => router.push('/admin/all-blogs')} />
    </AdminLayout>
  );
}
