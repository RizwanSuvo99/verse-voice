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
import { toast } from 'sonner';
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

  useEffect(() => {
    if (hydrated) {
      try {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
        const loggedIn = JSON.parse(
          localStorage.getItem('isLoggedIn') || 'false',
        );
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
      toast.success('Login Successful');

      if (data.data.user?.admin) {
        window.location.href = '/admin';
      } else {
        router.push('/');
      }
    }
    if (data?.status === 'fail') {
      toast.error(data.message || 'Invalid password or user does not exist');
    }
  }, [data?.status]);

  return (
    <Container size={420} my={40}>
      <Title ta="center" order={2}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component={Link} href="/register">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={20} mt={24} radius="md">
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
          <Group justify="space-between" mt="md">
            <Checkbox
              label="Remember me"
              key={form.key('rememberMe')}
              {...form.getInputProps('rememberMe', { type: 'checkbox' })}
            />
            <Button
              component={Link}
              size="compact-sm"
              href={'/forgetPassword'}
              variant="transparent"
              className="!underline"
            >
              Forgot password?
            </Button>
          </Group>
          <Button fullWidth mt="xl" type="submit" variant="gradient" className="glow-btn">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
