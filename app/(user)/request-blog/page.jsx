'use client';

import { submitBlogRequest } from '@/api/blogRequests.mjs';
import { getSettings } from '@/api/siteSettings.mjs';
import RequireAuth from '@/components/RequireAuth';
import {
  Button,
  Center,
  Container,
  FileInput,
  Group,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core';
import RichTextEditor from '@/components/Editor/RichTextEditor';
import { useForm } from '@mantine/form';
import { toast } from 'sonner';
import { IconFileCv } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const RequestBlog = () => {
  const [blogImage, setBlogImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);

  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  const categoryOptions = (settings?.categories || []).map((cat) => cat.name);

  const form = useForm({
    initialValues: {
      title: '',
      category: '',
      authorName: '',
      authorDetails: '',
      content: '',
    },
    validate: {
      title: (value) => (value.trim().length < 2 ? 'Title is required' : null),
      category: (value) =>
        !value || value.trim().length < 2 ? 'Please select a category' : null,
      authorName: (value) =>
        value.trim().length < 2 ? 'Author name is required' : null,
      content: (value) =>
        value.trim().length === 0 ? 'Content is required' : null,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: submitBlogRequest,
    onSuccess: () => {
      toast.success('Blog request submitted!', {
        description: 'Your request will be reviewed by an admin.',
      });
      form.reset();
      setBlogImage(null);
      setAuthorImage(null);
    },
    onError: () => {
      toast.error('Failed to submit request');
    },
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('category', values.category);
    formData.append('authorName', values.authorName);
    formData.append('authorDetails', values.authorDetails);
    formData.append('content', values.content);
    if (blogImage) formData.append('blogImage', blogImage);
    if (authorImage) formData.append('authorImage', authorImage);
    mutate(formData);
  };

  const icon = (
    <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  return (
    <RequireAuth>
      <Container size={900} className="!pt-[24px]">
        <Text
          component={Title}
          variant="gradient"
          className="!mb-4 !text-center !text-[24px]"
        >
          Request a Blog
        </Text>
        <Text className="!mb-6 !text-center" c="dimmed" size="sm">
          Submit your writing for review. Once approved by an admin, it will be
          published on the site.
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)} className="!w-full">
          <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
            <TextInput
              placeholder="Blog Title"
              {...form.getInputProps('title')}
            />
            <Select
              placeholder="Select a Category"
              data={categoryOptions}
              searchable
              {...form.getInputProps('category')}
            />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
            <TextInput
              placeholder="Author Name"
              {...form.getInputProps('authorName')}
            />
            <TextInput
              placeholder="Author Details (e.g. Roll: 1234)"
              {...form.getInputProps('authorDetails')}
            />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
            <FileInput
              leftSection={icon}
              placeholder="Blog Image"
              clearable
              value={blogImage}
              onChange={setBlogImage}
            />
            <FileInput
              leftSection={icon}
              placeholder="Author Image"
              clearable
              value={authorImage}
              onChange={setAuthorImage}
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
              <Button
                variant="gradient"
                size={'md'}
                type="submit"
                loading={isPending}
                className="glow-btn"
              >
                Submit Request
              </Button>
            </Center>
          </Group>
        </form>
      </Container>
    </RequireAuth>
  );
};

export default RequestBlog;
