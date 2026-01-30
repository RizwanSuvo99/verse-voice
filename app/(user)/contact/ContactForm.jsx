'use client';
import { submitContact } from '@/api/contact.mjs';
import {
  Button,
  Center,
  Group,
  SimpleGrid,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

const ContactForm = () => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Name is required' : null),
      email: (value) => (!/^\S+@\S+$/.test(value) ? 'Invalid email' : null),
      subject: (value) =>
        value.trim().length === 0 ? 'Subject is required' : null,
      message: (value) =>
        value.trim().length === 0 ? 'Message is required' : null,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      notifications.show({
        title: 'Message sent successfully!',
        color: 'green',
      });
      form.reset();
    },
    onError: () => {
      notifications.show({
        title: 'Failed to send message',
        color: 'red',
      });
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => mutate(values))}
      className="!w-full"
    >
      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <TextInput
          placeholder="Your name"
          name="name"
          radius={'lg'}
          variant="filled"
          {...form.getInputProps('name')}
          classNames={{
            input: '!h-[60px] md:!h-[70px] !p-4 md:!p-6',
          }}
        />
        <TextInput
          placeholder="Your email"
          name="email"
          radius={'lg'}
          variant="filled"
          {...form.getInputProps('email')}
          classNames={{
            input: '!h-[60px] md:!h-[70px] !p-4 md:!p-6',
          }}
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
        <TextInput
          placeholder="Phone Number"
          name="phone"
          radius={'lg'}
          variant="filled"
          {...form.getInputProps('phone')}
          classNames={{
            input: '!h-[60px] md:!h-[70px] !p-4 md:!p-6',
          }}
        />
        <TextInput
          placeholder="Subject"
          name="subject"
          radius={'lg'}
          variant="filled"
          {...form.getInputProps('subject')}
          classNames={{
            input: '!h-[60px] md:!h-[70px] !p-4 md:!p-6',
          }}
        />
      </SimpleGrid>

      <Textarea
        mt="md"
        placeholder="Your message"
        minRows={5}
        radius={'lg'}
        name="message"
        variant="filled"
        {...form.getInputProps('message')}
        classNames={{
          input: '!h-[300px] md:!h-[350px] !p-4 md:!p-6',
        }}
      />

      <Group justify="center" mt="xl">
        <Center>
          <Button variant="gradient" size={'xl'} type="submit" loading={isPending}>
            Send Message
          </Button>
        </Center>
      </Group>
    </form>
  );
};

export default ContactForm;
