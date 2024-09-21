'use client';
import {
  Button,
  Center,
  Group,
  SimpleGrid,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';

const ContactForm = () => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <form onSubmit={form.onSubmit(() => {})} className="!w-full">
      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <TextInput
          placeholder="Your name"
          name="name"
          radius={'lg'}
          variant="filled"
          {...form.getInputProps('name')}
          classNames={{
            input: '!h-[70px] !p-6',
          }}
        />
        <TextInput
          placeholder="Your email"
          name="email"
          radius={'lg'}
          variant="filled"
          {...form.getInputProps('email')}
          classNames={{
            input: '!h-[70px] !p-6',
          }}
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
        <TextInput
          placeholder="Phone Number"
          name="phoneNumber"
          radius={'lg'}
          variant="filled"
          {...form.getInputProps('phoneNumber')}
          classNames={{
            input: '!h-[70px] !p-6',
          }}
        />
        <TextInput
          placeholder="Subject"
          name="subject"
          radius={'lg'}
          variant="filled"
          {...form.getInputProps('subject')}
          classNames={{
            input: '!h-[70px] !p-6',
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
          input: '!h-[350px] !p-6',
        }}
      />

      <Group justify="center" mt="xl">
        <Center>
          <Button variant="gradient" size={'xl'} type="submit">
            Send Message
          </Button>
        </Center>
      </Group>
    </form>
  );
};

export default ContactForm;
