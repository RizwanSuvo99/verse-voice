'use client';

import { createBlog } from '@/api/adminBlogs.mjs';
import { getSettings } from '@/api/siteSettings.mjs';
import {
  Button,
  Center,
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

const CreateBlog = () => {
  const queryClient = useQueryClient();
  const [blogImage, setBlogImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const [publishDate, setPublishDate] = useState(null);

  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  const categoryOptions = (settings?.categories || []).map((c) => c.name);

  const form = useForm({
    initialValues: {
      title: '',
      category: '',
      content: '',
      authorName: '',
      authorDetails: '',
      timeRead: '',
      isFeatured: false,
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
    mutationFn: createBlog,
    onSuccess: () => {
      toast.success('Blog created!');
      form.reset();
      setBlogImage(null);
      setAuthorImage(null);
      setPublishDate(null);
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['featuredBlogs'] });
      queryClient.invalidateQueries({ queryKey: ['popularBlogs'] });
    },
    onError: () => {
      toast.error('Failed to create blog');
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
    mutate(formData);
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
          placeholder="Blog Image"
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
          placeholder="Author Image"
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

      <Group justify="center" mt="xl">
        <Center>
          <Button variant="gradient" className="glow-btn" size="md" type="submit" loading={isPending}>
            Create New Blog
          </Button>
        </Center>
      </Group>
    </form>
  );
};

export default CreateBlog;
