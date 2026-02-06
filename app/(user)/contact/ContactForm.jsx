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
import { toast } from 'sonner';
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
      toast.success('Message sent successfully!');
      form.reset();
    },
    onError: () => {},
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
          variant="filled"
          {...form.getInputProps('name')}
        />
        <TextInput
          placeholder="Your email"
          name="email"
          variant="filled"
          {...form.getInputProps('email')}
        />
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
        <TextInput
          placeholder="Phone Number"
          name="phone"
          variant="filled"
          {...form.getInputProps('phone')}
        />
        <TextInput
          placeholder="Subject"
          name="subject"
          variant="filled"
          {...form.getInputProps('subject')}
        />
      </SimpleGrid>
      <Textarea
        mt="md"
        placeholder="Your message"
        minRows={4}
        name="message"
        variant="filled"
        {...form.getInputProps('message')}
      />
      <Group justify="center" mt="xl">
        <Center>
          <Button
            variant="gradient"
            size={'md'}
            type="submit"
            loading={isPending}
            className="glow-btn"
          >
            Send Message
          </Button>
        </Center>
      </Group>
    </form>
  );
};

export default ContactForm;
