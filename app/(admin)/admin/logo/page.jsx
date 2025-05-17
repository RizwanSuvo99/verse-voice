'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { getImageFromLocalStorage, getSetting, saveImageToLocalStorage, saveSettings } from '@/services/settingsService';
import { AppShell, Button, Card, Divider, FileInput, Group, Image, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy, IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function LogoSettingsPage() {
  const [opened, { toggle }] = useDisclosure();
  const [loading, setLoading] = useState(false);
  
  // State for logo upload
  const [mainLogo, setMainLogo] = useState(null);
  const [whiteLogo, setWhiteLogo] = useState(null);
  const [mainLogoPreview, setMainLogoPreview] = useState(getSetting('logoPath'));
  const [whiteLogoPreview, setWhiteLogoPreview] = useState(getSetting('logoWhitePath'));
  
  useEffect(() => {
    // Check if we have stored logos in localStorage
    const storedMainLogo = getImageFromLocalStorage('mainLogo', null);
    const storedWhiteLogo = getImageFromLocalStorage('whiteLogo', null);
    
    if (storedMainLogo) {
      setMainLogoPreview(storedMainLogo);
    }
    
    if (storedWhiteLogo) {
      setWhiteLogoPreview(storedWhiteLogo);
    }
  }, []);

  const handleMainLogoChange = async (file) => {
    setMainLogo(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMainLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWhiteLogoChange = async (file) => {
    setWhiteLogo(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setWhiteLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let mainLogoUrl = getSetting('logoPath');
      let whiteLogoUrl = getSetting('logoWhitePath');
      
      // If we have new logos, save them to local storage
      if (mainLogo) {
        mainLogoUrl = await saveImageToLocalStorage(mainLogo, 'mainLogo');
      }
      
      if (whiteLogo) {
        whiteLogoUrl = await saveImageToLocalStorage(whiteLogo, 'whiteLogo');
      }
      
      // Update settings with new logo paths
      const settings = {
        logoPath: mainLogoUrl,
        logoWhitePath: whiteLogoUrl,
      };
      
      const success = saveSettings(settings);
      
      if (success) {
        notifications.show({
          title: 'Logo settings saved',
          message: 'Your logo settings have been saved successfully',
          color: 'green',
          icon: <IconCheck />,
        });
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving logo settings:', error);
      notifications.show({
        title: 'Error',
        message: 'There was an error saving your logo settings',
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
          <AdminNavbar />
        </AppShell.Navbar>

        <AppShell.Main>
          <form onSubmit={handleSubmit}>
            <Card withBorder p="lg" radius="md" mb="md">
              <Title order={5} mb="md">Site Logo Settings</Title>
              <Text c="dimmed" mb="lg">
                Upload and manage the logos used throughout your website. For best results, use SVG or PNG files with transparent backgrounds.
              </Text>
              
              <Stack gap="xl">
                <div>
                  <Text fw={500} mb="sm">Main Logo (Used in the header)</Text>
                  <Text size="sm" c="dimmed" mb="md">Recommended size: 200x70 pixels</Text>
                  
                  <Group align="center" mb="lg">
                    {mainLogoPreview && (
                      <Card withBorder p="md" radius="md" style={{ width: 250 }}>
                        <Image 
                          src={mainLogoPreview} 
                          alt="Main Logo Preview"
                          height={100}
                          fit="contain"
                        />
                      </Card>
                    )}
                    
                    <FileInput
                      placeholder="Upload main logo"
                      accept="image/svg+xml,image/png,image/jpeg"
                      onChange={handleMainLogoChange}
                      leftSection={<IconUpload size={16} />}
                      style={{ maxWidth: 300 }}
                    />
                  </Group>
                </div>
                
                <Divider />
                
                <div>
                  <Text fw={500} mb="sm">White Logo (Used in dark sections and admin panel)</Text>
                  <Text size="sm" c="dimmed" mb="md">Recommended size: 200x70 pixels, white color scheme</Text>
                  
                  <Group align="center" mb="lg">
                    <Card 
                      withBorder 
                      p="md" 
                      radius="md" 
                      style={{ 
                        width: 250, 
                        backgroundColor: '#333' 
                      }}
                    >
                      {whiteLogoPreview && (
                        <Image 
                          src={whiteLogoPreview} 
                          alt="White Logo Preview"
                          height={100}
                          fit="contain"
                        />
                      )}
                    </Card>
                    
                    <FileInput
                      placeholder="Upload white logo"
                      accept="image/svg+xml,image/png,image/jpeg"
                      onChange={handleWhiteLogoChange}
                      leftSection={<IconUpload size={16} />}
                      style={{ maxWidth: 300 }}
                    />
                  </Group>
                </div>
                
                <Button 
                  type="submit"
                  leftSection={<IconDeviceFloppy size={16} />}
                  loading={loading}
                  size="lg"
                  mt="xl"
                >
                  Save Logo Settings
                </Button>
              </Stack>
            </Card>
          </form>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 