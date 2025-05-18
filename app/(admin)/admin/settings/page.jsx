'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { HeroSettings } from '@/components/admin/layout/HeroSettings';
import { getImageFromLocalStorage, getSettings, saveImageToLocalStorage, saveSettings } from '@/services/settingsService';
import { AppShell, Button, Card, ColorInput, Divider, FileInput, Group, Image, NumberInput, Stack, Switch, Tabs, Text, TextInput, Textarea, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconCheck, IconDeviceFloppy, IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import ForceRefresh from './ForceRefresh';

export default function SettingsPage() {
  const [opened, { toggle }] = useDisclosure();
  const [logoPreview, setLogoPreview] = useState('/assets/logo-white.svg');
  const [faviconPreview, setFaviconPreview] = useState('/favicon.ico');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [faviconChanged, setFaviconChanged] = useState(false);
  
  const form = useForm({
    initialValues: getSettings(),
  });

  // Load settings when component mounts
  useEffect(() => {
    const settings = getSettings();
    form.setValues(settings);
    
    // Load favicon preview if available
    const savedFavicon = getImageFromLocalStorage('siteFavicon');
    if (savedFavicon) {
      setFaviconPreview(savedFavicon);
    }
  }, []);

  const handleLogoChange = (file) => {
    form.setFieldValue('logoImage', file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconChange = (file) => {
    if (file) {
      // Check if file is too large (max 2MB recommended for favicons)
      if (file.size > 2 * 1024 * 1024) {
        notifications.show({
          title: 'File too large',
          message: 'Favicon should be less than 2MB for optimal performance',
          color: 'yellow',
        });
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const faviconDataUrl = e.target.result;
        console.log('Favicon loaded as data URL, size:', Math.round(faviconDataUrl.length / 1024), 'KB');
        setFaviconPreview(faviconDataUrl);
        form.setFieldValue('faviconImage', file);
        
        // Save to localStorage and provide immediate feedback
        const success = saveImageToLocalStorage('siteFavicon', faviconDataUrl);
        if (success) {
          setFaviconChanged(true);
          notifications.show({
            title: 'Favicon saved',
            message: 'Favicon has been saved to localStorage successfully',
            color: 'green',
            icon: <IconCheck />,
          });
        } else {
          notifications.show({
            title: 'Error saving favicon',
            message: 'Failed to save favicon to localStorage. Check browser console for details.',
            color: 'red',
          });
        }
      };
      
      reader.onerror = (error) => {
        console.error('Error reading favicon file:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to read favicon file',
          color: 'red',
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values) => {
    setLoading(true);
    
    try {
      // Favicon handling moved to handleFaviconChange for immediate feedback
      
      // Save settings
      const success = saveSettings(values);
      
      if (success) {
        notifications.show({
          title: 'Settings saved',
          message: 'Your settings have been saved successfully',
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
        message: 'There was an error saving your settings: ' + error.message,
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
          <ForceRefresh trigger={faviconChanged} />
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Tabs 
              value={activeTab} 
              onChange={setActiveTab}
              variant="pills"
              radius="md"
            >
              <Tabs.List mb="xl" style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: '8px 0' }}>
                <Tabs.Tab value="general" fw={activeTab === 'general' ? 'bold' : 'normal'}>General</Tabs.Tab>
                <Tabs.Tab value="seo" fw={activeTab === 'seo' ? 'bold' : 'normal'}>SEO</Tabs.Tab>
                <Tabs.Tab value="appearance" fw={activeTab === 'appearance' ? 'bold' : 'normal'}>Appearance</Tabs.Tab>
                <Tabs.Tab value="hero" fw={activeTab === 'hero' ? 'bold' : 'normal'}>Hero Section</Tabs.Tab>
                <Tabs.Tab value="social" fw={activeTab === 'social' ? 'bold' : 'normal'}>Social Media</Tabs.Tab>
                <Tabs.Tab value="comments" fw={activeTab === 'comments' ? 'bold' : 'normal'}>Comments</Tabs.Tab>
                <Tabs.Tab value="contact" fw={activeTab === 'contact' ? 'bold' : 'normal'}>Contact</Tabs.Tab>
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

              <Tabs.Panel value="hero">
                <HeroSettings form={form} />
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
                  <Title order={5} mb="md">Contact Page Settings</Title>
                  <Stack gap="md">
                    <TextInput
                      label="Contact Page Title"
                      placeholder="Contact Us"
                      {...form.getInputProps('contactTitle')}
                    />
                    <Textarea
                      label="Contact Page Description"
                      placeholder="Description for the top of your contact page"
                      minRows={2}
                      {...form.getInputProps('contactDescription')}
                    />
                    <Divider my="xs" label="Contact Information" labelPosition="center" />
                    <TextInput
                      label="Primary Contact Email"
                      placeholder="contact@yoursite.com"
                      {...form.getInputProps('contactEmail')}
                    />
                    <TextInput
                      label="Secondary Contact Email"
                      placeholder="info@yoursite.com"
                      {...form.getInputProps('contactEmail2')}
                    />
                    <TextInput
                      label="Primary Phone Number"
                      placeholder="+1 (123) 456-7890"
                      {...form.getInputProps('contactPhone')}
                    />
                    <TextInput
                      label="Secondary Phone Number"
                      placeholder="+1 (123) 456-7890"
                      {...form.getInputProps('contactPhone2')}
                    />
                    <Textarea
                      label="Address"
                      placeholder="Your physical address (use comma to separate lines)"
                      minRows={2}
                      {...form.getInputProps('contactAddress')}
                      description="Use a comma to separate address lines, e.g. 'Street, City Postal'"
                    />
                    <Divider my="xs" label="Google Map" labelPosition="center" />
                    <Textarea
                      label="Google Maps Embed URL"
                      placeholder="https://www.google.com/maps/embed?pb=..."
                      minRows={2}
                      {...form.getInputProps('contactMapUrl')}
                      description="Get this from Google Maps by clicking Share > Embed a map > Copy HTML, then extract the src URL"
                    />
                    <Divider my="xs" label="Contact Form" labelPosition="center" />
                    <TextInput
                      label="Contact Form Title"
                      placeholder="Drop Us a Message"
                      {...form.getInputProps('contactFormTitle')}
                    />
                    <Textarea
                      label="Contact Form Description"
                      placeholder="Short text below the contact form title"
                      minRows={2}
                      {...form.getInputProps('contactFormDescription')}
                    />
                  </Stack>
                </Card>
              </Tabs.Panel>
            </Tabs>

            <Button 
              type="submit"
              leftSection={<IconDeviceFloppy size={16} />}
              loading={loading}
              fullWidth
              size="lg"
              mt="xl"
            >
              Save All Settings
            </Button>
          </form>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 