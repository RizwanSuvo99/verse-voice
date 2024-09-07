'use client';
import { Button, TextInput, useMantineTheme } from '@mantine/core';

const Subscribe = () => {
  const theme = useMantineTheme();
  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder="Type your email address"
      w={500}
      rightSectionWidth={110}
      rightSection={
        <Button color={theme.primaryColor} variant="filled" radius="xl">
          Subscribe
        </Button>
      }
    />
  );
};

export default Subscribe;
