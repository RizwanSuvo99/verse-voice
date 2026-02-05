'use client';
import { Container } from '@mantine/core';
import { useState } from 'react';
import SendOtp from './SendOtp';
import UpdatePassword from './UpdatePassword';
import VerifyOtp from './VerifyOtp';

const ForgetPassword = () => {
  const [otpVerificationObj, setOtpVerificationObj] = useState({
    email: '',
    otp: '',
  });
  const [mode, setMode] = useState('sendOtp');
  const handleChangeMode = (appliedMode) => {
    setMode(appliedMode);
  };

  return (
    <Container size={1500} className="!pt-[24px]">
      {mode === 'sendOtp' && (
        <SendOtp
          handleChangeMode={handleChangeMode}
          setOtpVerificationObj={setOtpVerificationObj}
        />
      )}
      {mode === 'verifyOtp' && (
        <VerifyOtp
          handleChangeMode={handleChangeMode}
          setOtpVerificationObj={setOtpVerificationObj}
          otpVerificationObj={otpVerificationObj}
        />
      )}
      {mode === 'updatePassword' && (
        <UpdatePassword
          handleChangeMode={handleChangeMode}
          otpVerificationObj={otpVerificationObj}
        />
      )}
    </Container>
  );
};

export default ForgetPassword;
