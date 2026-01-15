'use client';
import {
  sendRegistrationOtp,
  verifyRegistrationOtp,
  resendRegistrationOtp,
} from '@/api/register.mjs';
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  PinInput,
  Text,
  TextInput,
  Title,
  Group,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { readLocalStorageValue, useLocalStorage } from '@mantine/hooks';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Register = () => {
  const router = useRouter();
  const currentToken = readLocalStorageValue({ key: 'token' });
  const currentLoggedIn = readLocalStorageValue({ key: 'isLoggedIn' });

  const [step, setStep] = useState('form'); // 'form' | 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (currentToken && currentLoggedIn) {
      router.replace('/');
    }
  }, [currentToken, currentLoggedIn, router]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

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

  const { mutate: sendOtp, isPending: isSendingOtp } = useMutation({
    mutationFn: sendRegistrationOtp,
    onSuccess: (data) => {
      if (data.status === 'success') {
        toast.success('OTP sent to your email');
        setStep('otp');
        setCountdown(60);
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    },
    onError: () => {
      toast.error('Failed to send OTP');
    },
  });

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: verifyRegistrationOtp,
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: resendRegistrationOtp,
    onSuccess: (data) => {
      if (data.status === 'success') {
        toast.success('New OTP sent to your email');
        setCountdown(60);
        setOtp('');
      } else {
        toast.error(data.message || 'Failed to resend OTP');
      }
    },
  });

  const [, setToken] = useLocalStorage({
    key: 'token',
    defaultValue: null,
  });
  const [, setIsLoggedIn] = useLocalStorage({
    key: 'isLoggedIn',
    defaultValue: false,
  });

  const handleSubmitForm = (values) => {
    const { name, email, password, confirmPassword } = values;
    if (password === confirmPassword) {
      setEmail(email);
      sendOtp({ name, email, password });
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit OTP');
      return;
    }

    verifyOtp(
      { email, otp },
      {
        onSuccess: (data) => {
          if (data.status === 'success') {
            setToken(data.data?.accessToken);
            setIsLoggedIn(true);
            toast.success('Account created successfully!');
            router.push('/');
          } else {
            toast.error(data.message || 'Invalid OTP');
          }
        },
        onError: () => {
          toast.error('Failed to verify OTP');
        },
      }
    );
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;
    resendOtp(email);
  };

  const handleBackToForm = () => {
    setStep('form');
    setOtp('');
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" order={2}>
        {step === 'form' ? 'Create new account!' : 'Verify your email'}
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {step === 'form' ? (
          <>
            Already have an account?{' '}
            <Button
              size="compact-sm"
              component={Link}
              href={'/login'}
              variant="transparent"
              className="!p-0"
            >
              Login
            </Button>
          </>
        ) : (
          <>We sent a 6-digit code to <Text span fw={500}>{email}</Text></>
        )}
      </Text>

      <Paper withBorder shadow="md" p={20} mt={24} radius="md">
        {step === 'form' ? (
          <form onSubmit={form.onSubmit(handleSubmitForm)}>
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
            <Button
              fullWidth
              mt="xl"
              type="submit"
              variant="gradient"
              className="glow-btn"
              loading={isSendingOtp}
            >
              Continue
            </Button>
          </form>
        ) : (
          <Stack>
            <Text size="sm" ta="center" c="dimmed">
              Enter the OTP sent to your email
            </Text>

            <Group justify="center" mt="md">
              <PinInput
                length={6}
                value={otp}
                onChange={setOtp}
                type="number"
                size="lg"
                oneTimeCode
              />
            </Group>

            <Button
              fullWidth
              mt="lg"
              variant="gradient"
              className="glow-btn"
              onClick={handleVerifyOtp}
              loading={isVerifying}
              disabled={otp.length !== 6}
            >
              Verify & Create Account
            </Button>

            <Group justify="center" gap="xs">
              <Text size="sm" c="dimmed">
                Didn't receive the code?
              </Text>
              <Button
                variant="subtle"
                size="compact-sm"
                onClick={handleResendOtp}
                loading={isResending}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
              </Button>
            </Group>

            <Button
              variant="subtle"
              size="sm"
              onClick={handleBackToForm}
              mt="sm"
            >
              ← Back to registration
            </Button>
          </Stack>
        )}
      </Paper>
    </Container>
  );
};

export default Register;
