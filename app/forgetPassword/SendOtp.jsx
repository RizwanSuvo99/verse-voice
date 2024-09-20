/* eslint-disable react-hooks/exhaustive-deps */
import { validUser } from '@/api/validUser.mjs';
import { Button, Center, Group, Loader, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

const SendOtp = ({ handleChangeMode, setOtpVerificationObj }) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },
    // Add validation rules
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value.trim()) ? null : 'Enter a valid email address',
    },
  });

  const { mutate, data, isPending } = useMutation({
    mutationFn: validUser,
  });

  // Form submit handler
  const handleSubmit = (values) => {
    mutate(values?.email);
    setOtpVerificationObj((prev) => {
      return {
        ...prev,
        email: values?.email,
      };
    });
    form.reset();
  };

  useEffect(() => {
    if (data?.status === 'success') {
      handleChangeMode('verifyOtp');
    }
    if (data?.status === 'fail') {
      notifications.show({
        title: 'Email is not valid or not registered',
      });
    }
  }, [data?.status]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {isPending ? (
        <Center>
          <Loader color="blue" />
        </Center>
      ) : (
        <Group justify="center" className="!flex-col">
          <TextInput
            placeholder="Please enter your email"
            radius={'xl'}
            classNames={{
              input: '!h-[40px] !p-4 !min-w-[400px] !max-w-[400px]',
            }}
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <Button type="submit">Sent OTP</Button>
        </Group>
      )}
    </form>
  );
};

export default SendOtp;
