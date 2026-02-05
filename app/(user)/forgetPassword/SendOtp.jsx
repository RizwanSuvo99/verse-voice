/* eslint-disable react-hooks/exhaustive-deps */
import { validUser } from '@/api/validUser.mjs';
import FormSkeleton from '@/components/Skeletons/FormSkeleton';
import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { toast } from 'sonner';
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
      toast('Email is not valid or not registered');
    }
  }, [data?.status]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {isPending ? (
        <FormSkeleton fields={1} />
      ) : (
        <Group justify="center" className="!flex-col">
          <TextInput
            placeholder="Please enter your email"
            className="!min-w-[400px] !max-w-[400px]"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <Button type="submit" variant="gradient" size="sm">
            Sent OTP
          </Button>
        </Group>
      )}
    </form>
  );
};

export default SendOtp;
