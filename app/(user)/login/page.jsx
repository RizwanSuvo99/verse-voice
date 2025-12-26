'use client';

import { loginUser } from '@/api/login.mjs';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Redirect if already logged in (only after hydration)
  useEffect(() => {
    if (hydrated) {
      try {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
        const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
        if (token && loggedIn) {
          router.replace('/');
        }
      } catch {
        // ignore parse errors
      }
    }
  }, [hydrated, router]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value.trim()) ? null : 'Invalid email',
      password: (value) =>
        value.length < 6
          ? 'Password should be at least 6 characters long'
          : null,
    },
  });

  const { mutate, data } = useMutation({
    mutationFn: loginUser,
  });

  const handleSubmit = (values) => {
    mutate({ ...values });
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
      setToken(data.data.accessToken);
      setIsLoggedIn(true);
      notifications.show({
        title: 'Login Successful',
        color: 'green',
      });

      // Use window.location for admin redirect since /admin is a
      // different root layout - router.push() doesn't work reliably
      // for cross-layout navigation in Next.js
      if (data.data.user?.admin) {
        window.location.href = '/admin';
      } else {
        router.push('/');
      }
    }
    if (data?.status === 'fail') {
      notifications.show({
        title: 'Invalid password or user does not exist',
        color: 'red',
      });
    }
  }, [data?.status]);

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component={Link} href="/register">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" className="glass-card">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              label="Remember me"
              key={form.key('rememberMe')}
              {...form.getInputProps('rememberMe', { type: 'checkbox' })}
            />
            <Button
              component={Link}
              size="sm"
              href={'/forgetPassword'}
              variant="transparent"
              className="!underline"
            >
              Forgot password?
            </Button>
          </Group>
          <Button fullWidth mt="xl" type="submit" variant="gradient">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
