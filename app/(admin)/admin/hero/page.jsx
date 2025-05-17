'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { getSettings, saveSettings } from '@/services/settingsService';
import { AppShell, Button, Card, Stack, Text, TextInput, Textarea, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function HeroSettingsPage() {
  const [opened, { toggle }] = useDisclosure();
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    initialValues: {
      heroTitle: 'Thoughts Meet Words',
      heroSubtitle: 'Explore authentic writings from students, sharing their feelings, experiences, and imaginative stories that inspire.',
    },
  });

  // Load settings when component mounts
  useEffect(() => {
    const settings = getSettings();
    form.setValues({
      heroTitle: settings.heroTitle,
      heroSubtitle: settings.heroSubtitle,
    });
  }, []);

  const handleSubmit = (values) => {
    setLoading(true);
    
    try {
      // Save settings
      const allSettings = getSettings();
      const newSettings = {
        ...allSettings,
        heroTitle: values.heroTitle,
        heroSubtitle: values.heroSubtitle,
      };
      
      const success = saveSettings(newSettings);
      
      if (success) {
        notifications.show({
          title: 'Hero settings saved',
          message: 'Your hero settings have been saved successfully',
          color: 'green',
          icon: <IconCheck />,
        });
      } else {
        notifications.show({
          title: 'Error',
          message: 'There was an error saving your settings',
          color: 'red',
        });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      notifications.show({
        title: 'Error',
        message: 'There was an error saving your settings',
        color: 'red',
      });
    } finally {
      setLoading(false);
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
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Card withBorder p="lg" radius="md" mb="md">
              <Title order={5} mb="md">Edit Hero Section</Title>
              <Text c="dimmed" mb="lg">
                Customize the title and subtitle text that appears in the hero section of your homepage.
              </Text>
              
              <Stack gap="xl">
                <TextInput
                  label="Hero Title"
                  placeholder="Main hero title text"
                  size="lg"
                  {...form.getInputProps('heroTitle')}
                />
                
                <Textarea
                  label="Hero Subtitle"
                  placeholder="Hero subtitle or description text"
                  minRows={3}
                  size="lg"
                  {...form.getInputProps('heroSubtitle')}
                />

                <Card withBorder p="xl" radius="md" bg="gray.0">
                  <Title order={6} mb="md">Preview</Title>
                  <Text fw={700} size="xl" mb="md" c="blue">{form.values.heroTitle}</Text>
                  <Text size="md">{form.values.heroSubtitle}</Text>
                </Card>

                <Button 
                  type="submit"
                  leftSection={<IconDeviceFloppy size={16} />}
                  loading={loading}
                  size="lg"
                  mt="xl"
                >
                  Save Hero Settings
                </Button>
              </Stack>
            </Card>
          </form>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 