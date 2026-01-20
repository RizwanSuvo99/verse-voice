'use client';

import { updateBlog } from '@/api/adminBlogs.mjs';
import { getSettings } from '@/api/siteSettings.mjs';
import {
  Button,
  Center,
  FileInput,
  Group,
  Select,
  SimpleGrid,
  TextInput,
  Textarea,
  rem,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconFileCv } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const EditBlog = ({ blog, setActiveView }) => {
  const queryClient = useQueryClient();
  const [blogImage, setBlogImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const [publishDate, setPublishDate] = useState(
    blog?.publishDate ? new Date(blog.publishDate) : null
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
      notifications.show({ title: 'Blog updated!', color: 'green' });
      queryClient.invalidateQueries({ queryKey: ['adminBlogs'] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['featuredBlogs'] });
      queryClient.invalidateQueries({ queryKey: ['popularBlogs'] });
      setActiveView('All Blogs');
    },
    onError: () => {
      notifications.show({ title: 'Failed to update blog', color: 'red' });
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
      <SimpleGrid cols={{ base: 1, sm: 3 }} mt="xl">
        <TextInput
          placeholder="Blog Title"
          radius={'lg'}
          {...form.getInputProps('title')}
          classNames={{ input: '!h-[50px]' }}
        />
        <Select
          placeholder="Select category"
          radius={'lg'}
          data={categoryOptions}
          searchable
          {...form.getInputProps('category')}
          classNames={{ input: '!h-[50px]' }}
        />
        <FileInput
          leftSection={icon}
          placeholder="Blog Image (leave empty to keep current)"
          radius={'lg'}
          classNames={{ input: '!h-[50px]' }}
          clearable
          value={blogImage}
          onChange={setBlogImage}
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
        <DateInput
          radius={'lg'}
          value={publishDate}
          onChange={setPublishDate}
          placeholder="Select Publish Date"
          classNames={{ input: '!h-[50px]' }}
          clearable
        />
        <TextInput
          placeholder="Author name"
          radius={'lg'}
          {...form.getInputProps('authorName')}
          classNames={{ input: '!h-[50px]' }}
        />
        <FileInput
          leftSection={icon}
          placeholder="Author Image (leave empty to keep current)"
          radius={'lg'}
          classNames={{ input: '!h-[50px]' }}
          clearable
          value={authorImage}
          onChange={setAuthorImage}
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
        <TextInput
          placeholder="Author Details (e.g. Roll: 1234)"
          radius={'lg'}
          {...form.getInputProps('authorDetails')}
          classNames={{ input: '!h-[50px]' }}
        />
        <TextInput
          placeholder="Time Read (e.g. 5 mins read)"
          radius={'lg'}
          {...form.getInputProps('timeRead')}
          classNames={{ input: '!h-[50px]' }}
        />
        <Select
          placeholder="Featured?"
          radius={'lg'}
          data={['No', 'Yes']}
          value={form.values.isFeatured ? 'Yes' : 'No'}
          classNames={{ input: '!h-[50px]' }}
          onChange={(val) => form.setFieldValue('isFeatured', val === 'Yes')}
        />
      </SimpleGrid>

      <Textarea
        mt="md"
        placeholder="Blog Content"
        minRows={5}
        radius={'lg'}
        {...form.getInputProps('content')}
        classNames={{ input: '!h-[350px] !p-6' }}
      />

      <Group justify="center" mt="xl" gap="md">
        <Button variant="default" size={'xl'} onClick={() => setActiveView('All Blogs')}>
          Cancel
        </Button>
        <Button variant="gradient" size={'xl'} type="submit" loading={isPending}>
          Update Blog
        </Button>
      </Group>
    </form>
  );
};

export default EditBlog;
