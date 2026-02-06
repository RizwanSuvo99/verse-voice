'use client';

import { updateBlogRequest, approveRequest } from '@/api/blogRequests.mjs';
import { getSettings } from '@/api/siteSettings.mjs';
import {
  Button,
  Group,
  Select,
  SimpleGrid,
  Skeleton,
  Text,
  TextInput,
} from '@mantine/core';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(
  () => import('@/components/Editor/RichTextEditor'),
  {
    ssr: false,
    loading: () => <Skeleton height={300} />,
  }
);
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const EditBlogRequest = ({ request }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  const categoryOptions = (settings?.categories || []).map((c) => c.name);

  const form = useForm({
    initialValues: {
      title: request?.title || '',
      content: request?.content || '',
      category: request?.category || '',
      timeRead: request?.timeRead || '',
    },
    validate: {
      title: (value) => (value.trim().length < 2 ? 'Title required' : null),
      content: (value) =>
        value.trim().length === 0 ? 'Content required' : null,
      category: (value) =>
        !value || value.trim().length < 2 ? 'Category required' : null,
    },
  });

  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: updateBlogRequest,
  });

  const { mutate: approveMutate, isPending: isApproving } = useMutation({
    mutationFn: approveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allRequests'] });
      toast.success('Request updated and approved! Blog published.');
      router.push('/admin/blog-requests');
    },
    onError: () => {},
  });

  const handleSaveAndApprove = (values) => {
    updateMutate(
      { id: request._id, data: values },
      {
        onSuccess: () => {
          approveMutate(request._id);
        },
        onError: () => {},
      },
    );
  };

  const handleSaveOnly = (values) => {
    updateMutate(
      { id: request._id, data: values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['allRequests'] });
          toast.success('Request updated');
          router.push('/admin/blog-requests');
        },
        onError: () => {},
      },
    );
  };

  return (
    <form className="!w-full">
      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <TextInput
          label="Blog Title"
          placeholder="Blog Title"
          {...form.getInputProps('title')}
        />
        <Select
          label="Category"
          placeholder="Select category"
          data={categoryOptions}
          searchable
          {...form.getInputProps('category')}
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
        <TextInput
          label="Time Read"
          placeholder="e.g. 5 mins read"
          {...form.getInputProps('timeRead')}
        />
      </SimpleGrid>

      <div style={{ marginTop: 'var(--mantine-spacing-md)' }}>
        <Text fw={500} fz="sm" mb={4}>
          Blog Content
        </Text>
        <RichTextEditor
          content={form.values.content}
          onChange={(html) => form.setFieldValue('content', html)}
          placeholder="Blog Content"
        />
        {form.errors.content && (
          <Text c="red" fz="sm" mt={4}>
            {form.errors.content}
          </Text>
        )}
      </div>

      <Group justify="center" mt="xl" gap="md">
        <Button
          variant="default"
          size="md"
          onClick={() => router.push('/admin/blog-requests')}
        >
          Cancel
        </Button>
        <Button
          variant="filled"
          size="md"
          loading={isUpdating}
          onClick={() => form.onSubmit(handleSaveOnly)()}
        >
          Save Changes
        </Button>
        <Button
          variant="gradient"
          size="md"
          loading={isUpdating || isApproving}
          onClick={() => form.onSubmit(handleSaveAndApprove)()}
        >
          Save &amp; Approve
        </Button>
      </Group>
    </form>
  );
};

export default EditBlogRequest;
