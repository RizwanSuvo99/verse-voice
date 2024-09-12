import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

const Register = () => {
  return (
    <Container size={420} my={40}>
      <Title ta="center">Create new account!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do have an account ?{' '}
        <Anchor size="sm" component="button">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Name" placeholder="Your name" required />
        <TextInput label="Email" placeholder="you@gmail.com" required mt="md" />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm Your password"
          required
          mt="md"
        />

        <Button fullWidth mt="xl">
          Register Now
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
