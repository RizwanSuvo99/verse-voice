'use client';
import { validUser } from '@/api/validUser.mjs';
import { Button, Stack, TextInput, Title, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import Link from 'next/link';

const SendOtp = ({ handleChangeMode, setOtpVerificationObj }) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value.trim()) ? null : 'Enter a valid email address',
    },
  });

  const { mutate, data, isPending } = useMutation({
    mutationFn: validUser,
  });

  const handleSubmit = (values) => {
    mutate(values?.email);
    setOtpVerificationObj((prev) => ({
      ...prev,
      email: values?.email,
    }));
  };

  useEffect(() => {
    if (data?.status === 'success') {
      toast.success('OTP sent to your email');
      handleChangeMode('verifyOtp');
    }
    if (data?.status === 'fail') {
      toast.error('Email is not registered');
    }
  }, [data?.status]);

  return (
    <Stack align="center" gap="md" maw={400} mx="auto">
      <Title order={2} ta="center">
        Reset Password
      </Title>
      <Text size="sm" c="dimmed" ta="center">
        Enter your email address and we&apos;ll send you an OTP to reset your password.
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: '100%' }}>
        <Stack gap="md">
          <TextInput
            placeholder="Enter your email"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <Button
            type="submit"
            variant="gradient"
            loading={isPending}
            className="glow-btn"
          >
            Send OTP
          </Button>
        </Stack>
      </form>

      <Text size="sm" c="dimmed">
        Remember your password?{' '}
        <Text component={Link} href="/login" c="cyan" span>
          Login
        </Text>
      </Text>
    </Stack>
  );
};

export default SendOtp;
