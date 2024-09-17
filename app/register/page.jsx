'use client';
import register from '@/api/register.mjs';
import {
  Button,
  Container,
  Notification,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

const Register = () => {
  // Initialize the form with validation rules
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      name: (value) =>
        value.length < 4
          ? 'Password should be at least 4 characters long'
          : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length < 6
          ? 'Password should be at least 6 characters long'
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const { mutate, isError, isSuccess, error } = useMutation({
    mutationFn: register,
  });

  // Form submit handler
  const handleSubmit = (values) => {
    const { name, email, password } = values;
    console.log('Form values:', values);
    mutate({ name, email, password });
    // form.reset();
  };

  {
    isSuccess && <Notification title="success">Login Successful</Notification>;
  }

  {
    isError && (
      <Notification color="red" title="Error">
        {error?.message}
      </Notification>
    );
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Create new account!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do have an account?{' '}
        <Button
          size="sm"
          component={Link}
          href={'/login'}
          variant="transparent"
          className="!p-0"
        >
          Login
        </Button>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Your name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="you@gmail.com"
            key={form.key('email')}
            mt="md"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            key={form.key('password')}
            mt="md"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Your password"
            key={form.key('confirmPassword')}
            mt="md"
            {...form.getInputProps('confirmPassword')}
          />

          <Button fullWidth mt="xl" type="submit">
            Register Now
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
