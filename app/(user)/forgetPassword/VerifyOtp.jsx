import { verifyOtp } from '@/api/verifyOtp.mjs';
import { Button, Group, PinInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

const VerifyOtp = ({
  handleChangeMode,
  setOtpVerificationObj,
  otpVerificationObj,
}) => {
  let otpCode = '';
  // Form submit handler
  const handleOtpChange = (values) => {
    otpCode = values;
  };

  const { mutate, data } = useMutation({
    mutationFn: verifyOtp,
  });

  const handleSubmit = () => {
    mutate(`${otpVerificationObj.email}/${otpCode}`);
    setOtpVerificationObj((prev) => {
      return {
        ...prev,
        otp: otpCode,
      };
    });
  };

  useEffect(() => {
    if (data?.status === 'success') {
      handleChangeMode('updatePassword');
    }
    if (data?.status === 'fail') {
      notifications.show({
        title: 'Otp is not valid',
      });
    }
  }, [data?.status]);

  return (
    <form>
      <Group justify="center" className="!flex-col">
        <PinInput
          inputMode="numeric"
          length={6}
          size="md"
          onChange={handleOtpChange}
        />
        <Button onClick={handleSubmit}>Verify Otp</Button>
      </Group>
    </form>
  );
};

export default VerifyOtp;
