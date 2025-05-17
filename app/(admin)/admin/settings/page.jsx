'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { AppShell, Burger, Button, Card, ColorInput, Divider, FileInput, Group, Image, NumberInput, Stack, Switch, Tabs, Text, TextInput, Textarea, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconDeviceFloppy, IconUpload } from '@tabler/icons-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [opened, { toggle }] = useDisclosure();
  const [logoPreview, setLogoPreview] = useState('/assets/logo-white.svg');
  const [faviconPreview, setFaviconPreview] = useState('/favicon.ico');
  
  const form = useForm({
    initialValues: {
      // General settings
      siteName: 'Class Room Writers',
      siteDescription: 'A blog about writing and education',
      postsPerPage: 10,
      
      // SEO settings
      metaTitle: 'Class Room Writers - Education and Writing Blog',
      metaDescription: 'Discover the latest articles about writing, education, and classroom tips',
      googleAnalyticsId: 'UA-XXXXXXXXX-X',
      
      // Appearance settings
      logoImage: null,
      faviconImage: null,
      primaryColor: '#0ea5ea',
      secondaryColor: '#0bd1d1',
      
      // Social settings
      facebookUrl: 'https://facebook.com/classroomwriters',
      twitterUrl: 'https://twitter.com/classroomwriters',
      instagramUrl: 'https://instagram.com/classroomwriters',
      youtubeUrl: '',
      
      // Comments settings
      enableComments: true,
      moderateComments: true,
      
      // Contact settings
      contactEmail: 'info@classroomwriters.com',
      contactPhone: '+1 (123) 456-7890',
      contactAddress: '123 Education St, Learning City, 12345',
    },
  });

  const handleLogoChange = (file) => {
    form.setFieldValue('logoImage', file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconChange = (file) => {
    form.setFieldValue('faviconImage', file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setFaviconPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values) => {
    console.log('Settings values:', values);
    // Here you would save the settings to your backend
    alert('Settings saved successfully!');
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
        <AppShell.Header p="md">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={4}>Site Settings</Title>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <AdminNavbar />
        </AppShell.Navbar>

        <AppShell.Main>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Tabs defaultValue="general">
              <Tabs.List mb="md">
                <Tabs.Tab value="general">General</Tabs.Tab>
                <Tabs.Tab value="seo">SEO</Tabs.Tab>
                <Tabs.Tab value="appearance">Appearance</Tabs.Tab>
                <Tabs.Tab value="social">Social Media</Tabs.Tab>
                <Tabs.Tab value="comments">Comments</Tabs.Tab>
                <Tabs.Tab value="contact">Contact</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="general">
                <Card withBorder p="lg" radius="md" mb="md">
                  <Title order={5} mb="md">General Settings</Title>
                  <Stack gap="md">
                    <TextInput
                      label="Site Name"
                      placeholder="Your site name"
                      {...form.getInputProps('siteName')}
                    />
                    <Textarea
                      label="Site Description"
                      placeholder="Brief description of your site"
                      minRows={2}
                      {...form.getInputProps('siteDescription')}
                    />
                    <NumberInput
                      label="Posts Per Page"
                      placeholder="10"
                      min={1}
                      max={50}
                      {...form.getInputProps('postsPerPage')}
                    />
                  </Stack>
                </Card>
              </Tabs.Panel>

              <Tabs.Panel value="seo">
                <Card withBorder p="lg" radius="md" mb="md">
                  <Title order={5} mb="md">SEO Settings</Title>
                  <Stack gap="md">
                    <TextInput
                      label="Meta Title"
                      placeholder="Default meta title for your site"
                      {...form.getInputProps('metaTitle')}
                    />
                    <Textarea
                      label="Meta Description"
                      placeholder="Default meta description for your site"
                      minRows={2}
                      {...form.getInputProps('metaDescription')}
                    />
                    <TextInput
                      label="Google Analytics ID"
                      placeholder="UA-XXXXXXXXX-X"
                      {...form.getInputProps('googleAnalyticsId')}
                    />
                  </Stack>
                </Card>
              </Tabs.Panel>

              <Tabs.Panel value="appearance">
                <Card withBorder p="lg" radius="md" mb="md">
                  <Title order={5} mb="md">Appearance Settings</Title>
                  <Stack gap="md">
                    <div>
                      <Text size="sm" fw={500} mb={5}>Site Logo</Text>
                      <Group align="center" mb="md">
                        {logoPreview && (
                          <Image 
                            src={logoPreview} 
                            alt="Logo Preview" 
                            width={200} 
                            height={80} 
                            fit="contain"
                          />
                        )}
                        <FileInput
                          placeholder="Upload logo"
                          accept="image/png,image/jpeg,image/svg+xml"
                          onChange={handleLogoChange}
                          leftSection={<IconUpload size={16} />}
                        />
                      </Group>
                    </div>
                    
                    <Divider my="xs" />
                    
                    <div>
                      <Text size="sm" fw={500} mb={5}>Site Favicon</Text>
                      <Group align="center" mb="md">
                        {faviconPreview && (
                          <Image 
                            src={faviconPreview} 
                            alt="Favicon Preview" 
                            width={32} 
                            height={32} 
                          />
                        )}
                        <FileInput
                          placeholder="Upload favicon"
                          accept="image/x-icon,image/png"
                          onChange={handleFaviconChange}
                          leftSection={<IconUpload size={16} />}
                        />
                      </Group>
                    </div>
                    
                    <Divider my="xs" />
                    
                    <ColorInput
                      label="Primary Color"
                      format="hex"
                      swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                      {...form.getInputProps('primaryColor')}
                    />
                    
                    <ColorInput
                      label="Secondary Color"
                      format="hex"
                      swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                      {...form.getInputProps('secondaryColor')}
                    />
                  </Stack>
                </Card>
              </Tabs.Panel>

              <Tabs.Panel value="social">
                <Card withBorder p="lg" radius="md" mb="md">
                  <Title order={5} mb="md">Social Media Settings</Title>
                  <Stack gap="md">
                    <TextInput
                      label="Facebook URL"
                      placeholder="https://facebook.com/yourpage"
                      leftSection={<IconBrandFacebook size={16} />}
                      {...form.getInputProps('facebookUrl')}
                    />
                    <TextInput
                      label="Twitter URL"
                      placeholder="https://twitter.com/yourhandle"
                      leftSection={<IconBrandTwitter size={16} />}
                      {...form.getInputProps('twitterUrl')}
                    />
                    <TextInput
                      label="Instagram URL"
                      placeholder="https://instagram.com/yourhandle"
                      leftSection={<IconBrandInstagram size={16} />}
                      {...form.getInputProps('instagramUrl')}
                    />
                    <TextInput
                      label="YouTube URL"
                      placeholder="https://youtube.com/yourchannel"
                      leftSection={<IconBrandYoutube size={16} />}
                      {...form.getInputProps('youtubeUrl')}
                    />
                  </Stack>
                </Card>
              </Tabs.Panel>

              <Tabs.Panel value="comments">
                <Card withBorder p="lg" radius="md" mb="md">
                  <Title order={5} mb="md">Comments Settings</Title>
                  <Stack gap="md">
                    <Switch
                      label="Enable comments on posts"
                      checked={form.values.enableComments}
                      onChange={(event) => form.setFieldValue('enableComments', event.currentTarget.checked)}
                    />
                    <Switch
                      label="Moderate comments before publishing"
                      checked={form.values.moderateComments}
                      onChange={(event) => form.setFieldValue('moderateComments', event.currentTarget.checked)}
                    />
                  </Stack>
                </Card>
              </Tabs.Panel>

              <Tabs.Panel value="contact">
                <Card withBorder p="lg" radius="md" mb="md">
                  <Title order={5} mb="md">Contact Information</Title>
                  <Stack gap="md">
                    <TextInput
                      label="Contact Email"
                      placeholder="contact@yoursite.com"
                      {...form.getInputProps('contactEmail')}
                    />
                    <TextInput
                      label="Phone Number"
                      placeholder="+1 (123) 456-7890"
                      {...form.getInputProps('contactPhone')}
                    />
                    <Textarea
                      label="Address"
                      placeholder="Your physical address"
                      minRows={2}
                      {...form.getInputProps('contactAddress')}
                    />
                  </Stack>
                </Card>
              </Tabs.Panel>
            </Tabs>

            <Group justify="flex-end" mt="xl">
              <Button type="submit" leftSection={<IconDeviceFloppy size={16} />}>
                Save Settings
              </Button>
            </Group>
          </form>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 