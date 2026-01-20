import { verifyOtp } from '@/api/verifyOtp.mjs';
import { validUser } from '@/api/validUser.mjs';
import { Button, Group, PinInput, Text, Stack } from '@mantine/core';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const VerifyOtp = ({
  handleChangeMode,
  setOtpVerificationObj,
  otpVerificationObj,
}) => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const { mutate, data, isPending } = useMutation({
    mutationFn: verifyOtp,
  });

  const { mutate: resendMutate, isPending: isResending } = useMutation({
    mutationFn: validUser,
    onSuccess: (data) => {
      if (data?.status === 'success') {
        toast.success('New OTP sent to your email');
        setCountdown(60);
        setOtp('');
      } else {
        toast.error('Failed to resend OTP');
      }
    },
  });

  const handleSubmit = () => {
    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit OTP');
      return;
    }
    mutate(`${otpVerificationObj.email}/${otp}`);
    setOtpVerificationObj((prev) => ({
      ...prev,
      otp: otp,
    }));
  };

  const handleResend = () => {
    if (countdown > 0) return;
    resendMutate(otpVerificationObj.email);
  };

  useEffect(() => {
    if (data?.status === 'success') {
      handleChangeMode('updatePassword');
    }
    if (data?.status === 'fail') {
      toast.error('Invalid or expired OTP');
    }
  }, [data?.status]);

  return (
    <Stack align="center" gap="md">
      <Text size="sm" c="dimmed">
        Enter the 6-digit code sent to <Text span fw={500}>{otpVerificationObj.email}</Text>
      </Text>

      <PinInput
        inputMode="numeric"
        length={6}
        size="lg"
        value={otp}
        onChange={setOtp}
        oneTimeCode
      />

      <Button
        onClick={handleSubmit}
        variant="gradient"
        size="sm"
        loading={isPending}
        disabled={otp.length !== 6}
        className="glow-btn"
      >
        Verify OTP
      </Button>

      <Group gap="xs">
        <Text size="sm" c="dimmed">
          Didn't receive the code?
        </Text>
        <Button
          variant="subtle"
          size="compact-sm"
          onClick={handleResend}
          loading={isResending}
          disabled={countdown > 0}
        >
          {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
        </Button>
      </Group>

      <Button
        variant="subtle"
        size="sm"
        onClick={() => handleChangeMode('sendOtp')}
      >
        ← Change email
      </Button>
    </Stack>
  );
};

export default VerifyOtp;
