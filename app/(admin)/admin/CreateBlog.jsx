'use client';

import {
  Button,
  Center,
  FileInput,
  Group,
  SimpleGrid,
  TextInput,
  Textarea,
  rem,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useForm } from '@mantine/form';
import { IconFileCv } from '@tabler/icons-react';
import { useState } from 'react';

const CreateBlog = () => {
  const form = useForm({
    initialValues: {
      title: '',
      category: '',
      phoneNumber: '',
      subject: '',
      content: '',
    },
    validate: {
      title: (value) => value.trim().length < 2,
      category: (value) => value.trim().length < 2,
      content: (value) => value.trim().length === 0,
    },
  });

  const icon = (
    <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );
  const [value, setValue] = useState(null);

  return (
    <form onSubmit={form.onSubmit(() => {})} className="!w-full">
      <SimpleGrid cols={{ base: 1, sm: 3 }} mt="xl">
        <TextInput
          placeholder="Blog Title"
          radius={'lg'}
          {...form.getInputProps('title')}
          classNames={{
            input: '!h-[50px]',
          }}
        />
        <TextInput
          placeholder="Blog category"
          radius={'lg'}
          {...form.getInputProps('category')}
          classNames={{
            input: '!h-[50px]',
          }}
        />
        <FileInput
          leftSection={icon}
          placeholder="Blog Image"
          radius={'lg'}
          classNames={{
            input: '!h-[50px]',
          }}
          clearable
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
        <DateInput
          radius={'lg'}
          value={value}
          onChange={setValue}
          placeholder="Select Publish Date"
          classNames={{
            input: '!h-[50px]',
          }}
          clearable
        />
        <TextInput
          placeholder="Author name"
          radius={'lg'}
          {...form.getInputProps('authorName')}
          classNames={{
            input: '!h-[50px]',
          }}
        />
        <FileInput
          leftSection={icon}
          placeholder="Author Image"
          radius={'lg'}
          classNames={{
            input: '!h-[50px]',
          }}
          clearable
        />
      </SimpleGrid>

      <Textarea
        mt="md"
        placeholder="Blog Content"
        minRows={5}
        radius={'lg'}
        {...form.getInputProps('content')}
        classNames={{
          input: '!h-[350px] !p-6',
        }}
      />

      <Group justify="center" mt="xl">
        <Center>
          <Button variant="gradient" size={'xl'} type="submit">
            Create New Blog
          </Button>
        </Center>
      </Group>
    </form>
  );
};

export default CreateBlog;

// {
//     category: { type: String, required: true, trim: true },
//     title: { type: String, required: true, trim: true },

//     content: { type: String, required: true },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     blogPicUrl: { type: String, default: '' },
//     likesCount: { type: Number, default: 0 },
//     comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
//   },
