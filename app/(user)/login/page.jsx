/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const Login = () => {
  // Initialize the form with validation
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    // Add validation rules
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

  // Form submit handler
  const handleSubmit = (values) => {
    mutate({ ...values });
    form.reset();
  };

  const [token, setToken] = useLocalStorage({
    key: 'token',
    defaultValue: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage({
    key: 'isLoggedIn',
    defaultValue: false,
  });

  useEffect(() => {
    if (data?.status === 'success') {
      setToken(data.accessToken);
      setIsLoggedIn(true);
      notifications.show({
        title: 'Login Successful',
      });
      redirect('/');
    }
    if (data?.status === 'fail') {
      notifications.show({
        title: 'Invalid password or user doesnot exist',
      });
    }
  }, [data?.status]);

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            key={form.key('email')}
            {...form.getInputProps('email')} // Apply form validation
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            key={form.key('password')}
            {...form.getInputProps('password')} // Apply form validation
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
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
