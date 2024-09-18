'use client';
import {
  Button,
  Container,
  Group,
  PinInput,
  Text,
  TextInput,
} from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';

const ForgetPassword = () => {
  const [mode, setMode] = useState('sendOtp');

  const handleChangeMode = (appliedMode) => {
    setMode(appliedMode);
  };
  return (
    <Container size={1350} className="!pt-[50px]">
      {mode === 'sendOtp' && (
        <Group justify="center" className="!flex-col">
          <TextInput
            placeholder="Please enter your Email"
            name="name"
            radius={'xl'}
            classNames={{
              input: '!h-[40px] !p-4 !min-w-[400px] !max-w-[400px]',
            }}
          />
          <Button onClick={() => handleChangeMode('verifyOtp')}>
            Sent OTP
          </Button>
        </Group>
      )}
      {mode === 'verifyOtp' && (
        <Group justify="center" className="!flex-col">
          <PinInput inputMode="numeric" length={6} size="md" />
          <Button onClick={() => handleChangeMode('updatePassword')}>
            Verify Otp
          </Button>
        </Group>
      )}
      {mode === 'updatePassword' && (
        <Group justify="center" className="!flex-col">
          <TextInput
            placeholder="Enter New Password"
            name="name"
            radius={'xl'}
            classNames={{
              input: '!h-[40px] !p-4 !min-w-[400px] !max-w-[400px]',
            }}
          />
          <TextInput
            placeholder="Confirm New Password"
            name="name"
            radius={'xl'}
            classNames={{
              input: '!h-[40px] !p-4 !min-w-[400px] !max-w-[400px]',
            }}
          />
          <Button onClick={() => handleChangeMode('passwordChanged')}>
            Update Your Password
          </Button>
        </Group>
      )}
      {mode === 'passwordChanged' && (
        <Group justify="center" className="!flex-col">
          <Text className="!text-center !text-3xl">
            Password Changed Successfully!
          </Text>
          <Button component={Link} href={'/login'}>
            Go to Login
          </Button>
        </Group>
      )}
    </Container>
  );
};

export default ForgetPassword;
