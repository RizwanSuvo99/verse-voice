/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { updatePassword } from '@/api/updatePassword.mjs';
import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const UpdatePassword = ({ otpVerificationObj }) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      password: '',
      confirmPassword: '',
    },

    validate: {
      password: (value) =>
        value.length < 8
          ? 'Password should be at least 8 characters long'
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const { mutate, data } = useMutation({
    mutationFn: updatePassword,
  });

  // Form submit handler
  const handleSubmit = (values) => {
    mutate({
      ...otpVerificationObj,
      password: values?.password,
    });
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
        title: 'Password changed successfully',
      });
      redirect('/');
    }
    if (data?.status === 'fail') {
      notifications.show({
        title: 'Password updating failed',
      });
      setIsLoggedIn(false);
      setToken(null);
    }
  }, [data?.status]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group justify="center" className="!flex-col">
        <TextInput
          placeholder="Enter New Password"
          radius={'xl'}
          classNames={{
            input: '!h-[40px] !p-4 !min-w-[400px] !max-w-[400px]',
          }}
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <TextInput
          placeholder="Confirm New Password"
          radius={'xl'}
          classNames={{
            input: '!h-[40px] !p-4 !min-w-[400px] !max-w-[400px]',
          }}
          key={form.key('confirmPassword')}
          mt="md"
          {...form.getInputProps('confirmPassword')}
        />
        <Button type="submit">Update Your Password</Button>
      </Group>
    </form>
  );
};

export default UpdatePassword;
