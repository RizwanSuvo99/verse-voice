'use client';

import { useAuth } from '@/hooks/useAuth';
import { Alert, Button, Container, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconLogin } from '@tabler/icons-react';
import { useState } from 'react';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await login(values);
      if (!result.success) {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        Admin Login
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Enter your credentials to access the admin panel
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="md">
            {error}
          </Alert>
        )}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput 
            label="Email" 
            placeholder="your@email.com" 
            required 
            {...form.getInputProps('email')} 
          />
          <PasswordInput 
            label="Password" 
            placeholder="Your password" 
            required 
            mt="md" 
            {...form.getInputProps('password')} 
          />
          <Button 
            fullWidth 
            mt="xl" 
            type="submit" 
            loading={loading}
            leftSection={<IconLogin size={18} />}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
} 