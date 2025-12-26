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
  Textarea,
  Title,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
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
      notifications.show({
        title: 'Blog request submitted!',
        message: 'Your request will be reviewed by an admin.',
        color: 'green',
      });
      form.reset();
      setBlogImage(null);
      setAuthorImage(null);
    },
    onError: () => {
      notifications.show({
        title: 'Failed to submit request',
        color: 'red',
      });
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
    <Container size={900} className="!pt-[50px]">
      <Text
        component={Title}
        variant="gradient"
        className="!mb-6 !text-center !text-[40px]"
      >
        Request a Blog
      </Text>
      <Text className="!mb-8 !text-center" c="dimmed">
        Submit your writing for review. Once approved by an admin, it will be
        published on the site.
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)} className="!w-full">
        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <TextInput
            placeholder="Blog Title"
            radius={'lg'}
            {...form.getInputProps('title')}
            classNames={{ input: '!h-[50px]' }}
          />
          <Select
            placeholder="Select a Category"
            radius={'lg'}
            data={categoryOptions}
            searchable
            {...form.getInputProps('category')}
            classNames={{ input: '!h-[50px]' }}
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
          <TextInput
            placeholder="Author Name"
            radius={'lg'}
            {...form.getInputProps('authorName')}
            classNames={{ input: '!h-[50px]' }}
          />
          <TextInput
            placeholder="Author Details (e.g. Roll: 1234)"
            radius={'lg'}
            {...form.getInputProps('authorDetails')}
            classNames={{ input: '!h-[50px]' }}
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
          <FileInput
            leftSection={icon}
            placeholder="Blog Image"
            radius={'lg'}
            classNames={{ input: '!h-[50px]' }}
            clearable
            value={blogImage}
            onChange={setBlogImage}
          />
          <FileInput
            leftSection={icon}
            placeholder="Author Image"
            radius={'lg'}
            classNames={{ input: '!h-[50px]' }}
            clearable
            value={authorImage}
            onChange={setAuthorImage}
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

        <Group justify="center" mt="xl">
          <Center>
            <Button
              variant="gradient"
              size={'xl'}
              type="submit"
              loading={isPending}
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
