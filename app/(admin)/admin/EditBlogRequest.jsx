'use client';

import { updateBlogRequest, approveRequest } from '@/api/blogRequests.mjs';
import { getSettings } from '@/api/siteSettings.mjs';
import {
  Button,
  Group,
  Select,
  SimpleGrid,
  Text,
  TextInput,
} from '@mantine/core';
import RichTextEditor from '@/components/Editor/RichTextEditor';
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const EditBlogRequest = ({ request, setActiveView }) => {
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
      setActiveView('Blog Requests');
    },
    onError: () => {
      toast.error('Failed to approve request');
    },
  });

  const handleSaveAndApprove = (values) => {
    updateMutate(
      { id: request._id, data: values },
      {
        onSuccess: () => {
          approveMutate(request._id);
        },
        onError: () => {
          toast.error('Failed to update request');
        },
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
          setActiveView('Blog Requests');
        },
        onError: () => {
          toast.error('Failed to update request');
        },
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
          onClick={() => setActiveView('Blog Requests')}
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
