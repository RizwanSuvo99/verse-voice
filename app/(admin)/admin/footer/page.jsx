'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { getSettings, saveSettings } from '@/services/settingsService';
import { AppShell, Button, Card, Group, Stack, Text, Textarea, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function FooterSettingsPage() {
  const [opened, { toggle }] = useDisclosure();
  const [saving, setSaving] = useState(false);
  
  const form = useForm({
    initialValues: {
      footerDescription1: '',
      footerDescription2: '',
    },
    validate: {
      footerDescription1: (value) => (value.length < 10 ? 'Description must be at least 10 characters' : null),
    },
  });

  // Load settings when component mounts
  useEffect(() => {
    const settings = getSettings();
    form.setValues({
      footerDescription1: settings.footerDescription1,
      footerDescription2: settings.footerDescription2,
    });
  }, []);

  // Save footer settings
  const handleSave = (values) => {
    setSaving(true);
    try {
      // Save settings
      const result = saveSettings({
        footerDescription1: values.footerDescription1,
        footerDescription2: values.footerDescription2,
      });
      
      if (result) {
        notifications.show({
          title: 'Success',
          message: 'Footer content has been updated',
          color: 'green',
          icon: <IconCheck size={16} />,
        });
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to save footer settings',
        color: 'red',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AuthGuard>
      <AppShell
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Navbar p="md">
          <AdminNavbar opened={opened} toggle={toggle} />
        </AppShell.Navbar>

        <AppShell.Main>
          <form onSubmit={form.onSubmit(handleSave)}>
            <Card withBorder p="lg" radius="md" mb="md">
              <Group justify="space-between" mb="lg">
                <Title order={4}>Footer Settings</Title>
                <Button 
                  leftSection={<IconDeviceFloppy size={16} />}
                  type="submit"
                  loading={saving}
                >
                  Save Changes
                </Button>
              </Group>
              
              <Stack gap="md">
                <Textarea
                  label="First Paragraph"
                  placeholder="Enter the first paragraph of the footer content"
                  minRows={4}
                  required
                  {...form.getInputProps('footerDescription1')}
                />
                
                <Textarea
                  label="Second Paragraph"
                  placeholder="Enter the second paragraph of the footer content"
                  minRows={4}
                  {...form.getInputProps('footerDescription2')}
                />

                <Card withBorder p="md" radius="md" bg="gray.0">
                  <Text size="sm" c="dimmed" mb="xs">Preview:</Text>
                  <Text mb="md">{form.values.footerDescription1}</Text>
                  {form.values.footerDescription2 && <Text>{form.values.footerDescription2}</Text>}
                </Card>
              </Stack>
            </Card>
          </form>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 