'use client';

import { updateBlog } from '@/api/adminBlogs.mjs';
import { getSettings } from '@/api/siteSettings.mjs';
import {
  Button,
  FileInput,
  Group,
  Select,
  SimpleGrid,
  Skeleton,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(
  () => import('@/components/Editor/RichTextEditor'),
  {
    ssr: false,
    loading: () => <Skeleton height={300} />,
  }
);
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useForm } from '@mantine/form';
import { toast } from 'sonner';
import { IconFileCv } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const EditBlog = ({ blog, onSuccess }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [blogImage, setBlogImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const [publishDate, setPublishDate] = useState(
    blog?.publishDate ? new Date(blog.publishDate) : null,
  );

  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  const categoryOptions = (settings?.categories || []).map((c) => c.name);

  const form = useForm({
    initialValues: {
      title: blog?.title || '',
      category: blog?.category || '',
      content: blog?.content || '',
      authorName: blog?.createdBy?.name || '',
      authorDetails: blog?.authorDetails || '',
      timeRead: blog?.timeRead || '',
      isFeatured: blog?.isFeatured || false,
    },
    validate: {
      title: (value) => (value.trim().length < 2 ? 'Title required' : null),
      category: (value) =>
        !value || value.trim().length < 2 ? 'Category required' : null,
      content: (value) =>
        value.trim().length === 0 ? 'Content required' : null,
      authorName: (value) =>
        value.trim().length < 2 ? 'Author name required' : null,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      toast.success('Blog updated!');
      queryClient.invalidateQueries({ queryKey: ['adminBlogs'] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['featuredBlogs'] });
      queryClient.invalidateQueries({ queryKey: ['popularBlogs'] });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error('Failed to update blog');
    },
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('category', values.category);
    formData.append('content', values.content);
    formData.append('name', values.authorName);
    formData.append('authorDetails', values.authorDetails);
    formData.append('timeRead', values.timeRead || '3 mins read');
    formData.append('isFeatured', values.isFeatured);
    if (publishDate) formData.append('publishDate', publishDate.toISOString());
    if (blogImage) formData.append('blogImage', blogImage);
    if (authorImage) formData.append('authorImage', authorImage);
    mutate({ id: blog._id, data: formData });
  };

  const icon = (
    <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="!w-full">
      <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
        <TextInput placeholder="Blog Title" {...form.getInputProps('title')} />
        <Select
          placeholder="Select category"
          data={categoryOptions}
          searchable
          {...form.getInputProps('category')}
        />
        <FileInput
          leftSection={icon}
          placeholder="Blog Image (leave empty to keep current)"
          clearable
          value={blogImage}
          onChange={setBlogImage}
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
        <DateInput
          value={publishDate}
          onChange={setPublishDate}
          placeholder="Select Publish Date"
          clearable
        />
        <TextInput
          placeholder="Author name"
          {...form.getInputProps('authorName')}
        />
        <FileInput
          leftSection={icon}
          placeholder="Author Image (leave empty to keep current)"
          clearable
          value={authorImage}
          onChange={setAuthorImage}
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
        <TextInput
          placeholder="Author Details (e.g. Roll: 1234)"
          {...form.getInputProps('authorDetails')}
        />
        <TextInput
          placeholder="Time Read (e.g. 5 mins read)"
          {...form.getInputProps('timeRead')}
        />
        <Select
          placeholder="Featured?"
          data={['No', 'Yes']}
          value={form.values.isFeatured ? 'Yes' : 'No'}
          onChange={(val) => form.setFieldValue('isFeatured', val === 'Yes')}
        />
      </SimpleGrid>

      <div style={{ marginTop: 'var(--mantine-spacing-md)' }}>
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
          onClick={() => router.push('/admin/all-blogs')}
        >
          Cancel
        </Button>
        <Button variant="gradient" className="glow-btn" size="md" type="submit" loading={isPending}>
          Update Blog
        </Button>
      </Group>
    </form>
  );
};

export default EditBlog;
