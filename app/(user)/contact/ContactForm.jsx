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
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';

const ContactForm = ({ contactEmail }) => {
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (values) => {
    setLoading(true);
    
    // In a real application, this would be an API call to send the email
    // For now, we'll just simulate success after a delay
    setTimeout(() => {
      console.log('Sending to:', contactEmail || 'info@classroomwriters.com');
      console.log('Form values:', values);
      
      notifications.show({
        title: 'Message sent',
        message: 'Thanks for reaching out! We will get back to you soon.',
        color: 'green',
        icon: <IconCheck />,
      });
      
      form.reset();
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="!w-full">
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
          name="phoneNumber"
          radius={'lg'}
          variant="filled"
          {...form.getInputProps('phoneNumber')}
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
          <Button variant="gradient" size={'xl'} type="submit" loading={loading}>
            Send Message
          </Button>
        </Center>
      </Group>
    </form>
  );
};

export default ContactForm;
