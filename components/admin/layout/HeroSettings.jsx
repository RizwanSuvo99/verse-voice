'use client';

import { Card, Stack, Text, TextInput, Textarea, Title } from '@mantine/core';

export function HeroSettings({ form }) {
  return (
    <Card withBorder p="lg" radius="md" mb="md">
      <Title order={5} mb="md">Hero Section Settings</Title>
      <Stack gap="md">
        <TextInput
          label="Hero Title"
          placeholder="Main hero title text"
          {...form.getInputProps('heroTitle')}
        />
        
        <Textarea
          label="Hero Subtitle"
          placeholder="Hero subtitle or description text"
          minRows={3}
          {...form.getInputProps('heroSubtitle')}
        />

        <Card withBorder p="md" radius="md" bg="gray.0">
          <Text size="sm" c="dimmed" mb="xs">Preview:</Text>
          <Text fw={700} size="xl" mb="xs" c="blue">{form.values.heroTitle}</Text>
          <Text>{form.values.heroSubtitle}</Text>
        </Card>
      </Stack>
    </Card>
  );
} 