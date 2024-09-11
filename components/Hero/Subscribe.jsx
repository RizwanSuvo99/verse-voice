import { Button, TextInput } from '@mantine/core';

const Subscribe = () => {
  return (
    <TextInput
      className="!mt-6"
      radius="xl"
      size="lg"
      placeholder="Type your email address"
      w={500}
      rightSectionWidth={120}
      rightSection={
        <Button variant="filled" radius="xl">
          Subscribe
        </Button>
      }
    />
  );
};

export default Subscribe;
