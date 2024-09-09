'use client';
import { Button, TextInput, useMantineTheme } from '@mantine/core';

const Subscribe = () => {
  const theme = useMantineTheme();
  return (
    <TextInput
      className="!mt-6"
      radius="xl"
      size="lg"
      placeholder="Type your email address"
      w={500}
      rightSectionWidth={120}
      rightSection={
        <Button color={theme.primaryColor} variant="filled" radius="xl">
          Subscribe
        </Button>
      }
    />
  );
};

export default Subscribe;
