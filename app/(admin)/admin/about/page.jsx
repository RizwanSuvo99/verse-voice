'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { getImageFromLocalStorage, getSettings, saveImageToLocalStorage, saveSettings } from '@/services/settingsService';
import { ActionIcon, AppShell, Button, Card, Divider, FileInput, Group, Stack, Text, TextInput, Textarea, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy, IconTrash, IconUpload } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';

export default function AboutSettingsPage() {
  const [opened, { toggle }] = useDisclosure();
  const [saving, setSaving] = useState(false);
  const [aboutImage, setAboutImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('/assets/admin.png');
  
  const form = useForm({
    initialValues: {
      aboutName: 'Fakharuddin Pentu',
      aboutEmail: 'pintu.eng@gmail.com',
      aboutDescription: '',
      aboutCVLink: '#',
      roles: [
        { title: '', organization: '' }
      ],
      socials: {
        linkedin: '#',
        twitter: '#',
        facebook: '#',
        email: ''
      }
    },
    validate: {
      aboutName: (value) => (value.trim().length < 2 ? 'Name must be at least 2 characters' : null),
      aboutEmail: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  // Handle image upload
  const handleImageUpload = (file) => {
    if (!file) return;
    
    setAboutImage(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  
  // Add a new role field
  const addRole = () => {
    form.insertListItem('roles', { title: '', organization: '' });
  };
  
  // Remove a role field
  const removeRole = (index) => {
    if (form.values.roles.length > 1) {
      form.removeListItem('roles', index);
    } else {
      notifications.show({
        title: 'Cannot Remove',
        message: 'You must have at least one role',
        color: 'yellow',
      });
    }
  };

  // Load settings when component mounts
  useEffect(() => {
    const settings = getSettings();
    
    // Set form values from settings
    form.setValues({
      aboutName: settings.aboutName || 'Fakharuddin Pentu',
      aboutEmail: settings.aboutEmail || 'pintu.eng@gmail.com',
      aboutDescription: settings.aboutDescription || '',
      aboutCVLink: settings.aboutCVLink || '#',
      roles: Array.isArray(settings.aboutRoles) && settings.aboutRoles.length > 0 
        ? settings.aboutRoles 
        : [
            { title: 'Current Lecturer', organization: 'Comilla Govt. College, Comilla' },
            { title: 'Former Lecturer', organization: 'Chauddagram Govt. College, Comilla' },
            { title: 'Former Assistant Director', organization: 'Anti-Corruption Commission - Bangladesh' }
          ],
      socials: settings.aboutSocials || {
        linkedin: '#',
        twitter: '#',
        facebook: '#',
        email: ''
      }
    });
    
    // Set image preview from settings or localStorage
    const storedImage = getImageFromLocalStorage('aboutImage');
    if (storedImage) {
      setImagePreview(storedImage);
    } else if (settings.aboutImage) {
      setImagePreview(settings.aboutImage);
    }
  }, []);

  // Save about page settings
  const handleSave = useCallback((values) => {
    setSaving(true);
    try {
      // Convert image to base64 if a new image was uploaded
      if (aboutImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result;
          
          // Store image in localStorage
          saveImageToLocalStorage('aboutImage', base64Image);
          
          // Save settings
          const result = saveSettings({
            aboutName: values.aboutName,
            aboutEmail: values.aboutEmail,
            aboutDescription: values.aboutDescription,
            aboutImage: base64Image,
            aboutCVLink: values.aboutCVLink,
            aboutRoles: values.roles,
            aboutSocials: values.socials
          });
          
          if (result) {
            notifications.show({
              title: 'Success',
              message: 'About page content has been updated',
              color: 'green',
              icon: <IconCheck size={16} />,
            });
          } else {
            throw new Error('Failed to save settings');
          }
          setSaving(false);
        };
        reader.readAsDataURL(aboutImage);
      } else {
        // Save settings without changing the image
        const result = saveSettings({
          aboutName: values.aboutName,
          aboutEmail: values.aboutEmail,
          aboutDescription: values.aboutDescription,
          aboutCVLink: values.aboutCVLink,
          aboutRoles: values.roles,
          aboutSocials: values.socials
        });
        
        if (result) {
          notifications.show({
            title: 'Success',
            message: 'About page content has been updated',
            color: 'green',
            icon: <IconCheck size={16} />,
          });
        } else {
          throw new Error('Failed to save settings');
        }
        setSaving(false);
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to save about page settings',
        color: 'red',
      });
      setSaving(false);
    }
  }, [aboutImage, form]);

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
                <Title order={4}>About Page Settings</Title>
                <Button 
                  leftSection={<IconDeviceFloppy size={16} />}
                  type="submit"
                  loading={saving}
                >
                  Save Changes
                </Button>
              </Group>
              
              <Stack gap="md">
                <Title order={5}>Personal Information</Title>
                
                <Group grow>
                  <TextInput
                    label="Name"
                    placeholder="Your name"
                    required
                    {...form.getInputProps('aboutName')}
                  />
                  
                  <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    required
                    {...form.getInputProps('aboutEmail')}
                  />
                </Group>
                
                <Textarea
                  label="About Description"
                  placeholder="Enter a brief description about yourself"
                  minRows={4}
                  required
                  {...form.getInputProps('aboutDescription')}
                />
                
                <TextInput
                  label="CV Link"
                  placeholder="URL to your CV or resume"
                  {...form.getInputProps('aboutCVLink')}
                />
                
                <FileInput
                  label="Profile Image"
                  placeholder="Upload your profile image"
                  accept="image/png,image/jpeg,image/webp"
                  leftSection={<IconUpload size={16} />}
                  onChange={handleImageUpload}
                />
                
                {imagePreview && (
                  <Card withBorder p="xs" radius="md">
                    <Text size="sm" c="dimmed" mb="xs">Current Image:</Text>
                    <img 
                      src={imagePreview} 
                      alt="Profile Preview" 
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                  </Card>
                )}
                
                <Divider my="md" />
                
                <Group justify="space-between" align="center">
                  <Title order={5}>Roles & Experience</Title>
                  <Button onClick={addRole} size="xs">Add Role</Button>
                </Group>
                
                {form.values.roles.map((role, index) => (
                  <Card key={index} withBorder p="sm" radius="md">
                    <Group position="right" mb="xs">
                      <ActionIcon 
                        color="red" 
                        onClick={() => removeRole(index)}
                        disabled={form.values.roles.length <= 1}
                        variant="subtle"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                    <Group grow>
                      <TextInput
                        label="Title"
                        placeholder="Role title"
                        {...form.getInputProps(`roles.${index}.title`)}
                      />
                      <TextInput
                        label="Organization"
                        placeholder="Organization name"
                        {...form.getInputProps(`roles.${index}.organization`)}
                      />
                    </Group>
                  </Card>
                ))}
                
                <Divider my="md" />
                
                <Title order={5}>Social Links</Title>
                
                <Group grow>
                  <TextInput
                    label="LinkedIn"
                    placeholder="https://linkedin.com/in/username"
                    description="Enter complete URL with https://"
                    {...form.getInputProps('socials.linkedin')}
                  />
                  
                  <TextInput
                    label="Twitter/X"
                    placeholder="https://twitter.com/username"
                    description="Enter complete URL with https://"
                    {...form.getInputProps('socials.twitter')}
                  />
                </Group>
                
                <Group grow>
                  <TextInput
                    label="Facebook"
                    placeholder="https://facebook.com/username"
                    description="Enter complete URL with https://"
                    {...form.getInputProps('socials.facebook')}
                  />
                  
                  <TextInput
                    label="Contact Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('socials.email')}
                  />
                </Group>
              </Stack>
            </Card>
          </form>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 