'use client';
import { registerUser } from '@/api/register.mjs';
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { readLocalStorageValue, useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Register = () => {
  const router = useRouter();
  const currentToken = readLocalStorageValue({ key: 'token' });
  const currentLoggedIn = readLocalStorageValue({ key: 'isLoggedIn' });

  useEffect(() => {
    if (currentToken && currentLoggedIn) {
      router.replace('/');
    }
  }, [currentToken, currentLoggedIn, router]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      name: (value) =>
        value.trim().length < 4
          ? 'Name should be at least 4 characters long'
          : null,
      email: (value) =>
        /^\S+@\S+$/.test(value.trim()) ? null : 'Invalid email',
      password: (value) =>
        value.length < 8
          ? 'Password should be at least 8 characters long'
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const { mutate, data } = useMutation({
    mutationFn: registerUser,
  });

  const handleSubmit = (values) => {
    const { name, email, password, confirmPassword } = values;
    if (password === confirmPassword) {
      mutate({ name, email, password });
    }
    form.reset();
  };

  const [, setToken] = useLocalStorage({
    key: 'token',
    defaultValue: null,
  });
  const [, setIsLoggedIn] = useLocalStorage({
    key: 'isLoggedIn',
    defaultValue: false,
  });

  useEffect(() => {
    if (data?.status === 'success') {
      setToken(data.data?.accessToken || data.accessToken);
      setIsLoggedIn(true);
      notifications.show({
        title: 'Account created successfully',
        color: 'green',
      });
      router.push('/');
    }
    if (data?.status === 'fail') {
      notifications.show({
        title: 'Already have an account or failed',
        color: 'red',
      });
      setIsLoggedIn(false);
      setToken(null);
    }
  }, [data?.status]);

  return (
    <Container size={420} my={40}>
      <Title ta="center">Create new account!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
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

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" className="glass-card">
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

          <Button fullWidth mt="xl" type="submit" variant="gradient">
            Register Now
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
