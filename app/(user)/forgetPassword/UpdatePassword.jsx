/* eslint-disable react-hooks/exhaustive-deps */
import { updatePassword } from '@/api/updatePassword.mjs';
import { Button, Group, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const UpdatePassword = ({ otpVerificationObj }) => {
  const router = useRouter();

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

  const { mutate, data, isPending } = useMutation({
    mutationFn: updatePassword,
  });

  // Form submit handler
  const handleSubmit = (values) => {
    mutate({
      ...otpVerificationObj,
      password: values?.password,
    });
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
      toast.success('Password changed successfully');
      router.push('/');
    }
    if (data?.status === 'fail') {
      toast.error(data.data || 'Password updating failed');
      setIsLoggedIn(false);
      setToken(null);
    }
  }, [data?.status]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group justify="center" className="!flex-col">
        <PasswordInput
          placeholder="Enter New Password"
          className="!min-w-[400px] !max-w-[400px]"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <PasswordInput
          placeholder="Confirm New Password"
          className="!min-w-[400px] !max-w-[400px]"
          key={form.key('confirmPassword')}
          mt="md"
          {...form.getInputProps('confirmPassword')}
        />
        <Button type="submit" variant="gradient" size="sm" loading={isPending}>
          Update Your Password
        </Button>
      </Group>
    </form>
  );
};

export default UpdatePassword;
