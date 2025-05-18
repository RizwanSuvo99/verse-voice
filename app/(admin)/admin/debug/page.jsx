'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { AppShell, Button, Card, FileInput, Group, Image, Stack, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [opened, { toggle }] = useDisclosure();
  const [faviconData, setFaviconData] = useState(null);
  const [allSettings, setAllSettings] = useState({});
  const [testKey, setTestKey] = useState('test-storage');
  const [testValue, setTestValue] = useState('test-value');
  const [storageTestResult, setStorageTestResult] = useState(null);
  const [storageStats, setStorageStats] = useState(null);
  
  useEffect(() => {
    loadData();
    checkStorageCapacity();
  }, []);
  
  const loadData = () => {
    if (typeof window !== 'undefined') {
      try {
        // Get favicon data
        const favicon = localStorage.getItem('siteFavicon');
        setFaviconData(favicon);
        
        // Get all settings
        const settings = localStorage.getItem('siteSettings');
        if (settings) {
          setAllSettings(JSON.parse(settings));
        }
      } catch (error) {
        console.error('Error reading localStorage:', error);
      }
    }
  };

  const clearFavicon = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('siteFavicon');
        setFaviconData(null);
        notifications.show({
          title: 'Favicon Cleared',
          message: 'Favicon data has been removed from localStorage',
          color: 'blue',
        });
        loadData();
      } catch (error) {
        console.error('Error clearing favicon:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to clear favicon: ' + error.message,
          color: 'red',
        });
      }
    }
  };

  const applyFavicon = () => {
    if (faviconData) {
      try {
        // Update favicon link elements
        const links = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
        links.forEach(link => {
          link.href = faviconData;
        });
        
        notifications.show({
          title: 'Favicon Applied',
          message: 'Favicon has been manually applied to the page',
          color: 'green',
          icon: <IconCheck />,
        });
      } catch (error) {
        console.error('Error applying favicon:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to apply favicon: ' + error.message,
          color: 'red',
        });
      }
    }
  };

  const handleDirectFaviconUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        try {
          // Save directly to localStorage
          localStorage.setItem('siteFavicon', dataUrl);
          setFaviconData(dataUrl);
          
          // Also apply it
          const links = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
          links.forEach(link => {
            link.href = dataUrl;
          });
          
          notifications.show({
            title: 'Success',
            message: 'Favicon uploaded and applied successfully',
            color: 'green',
            icon: <IconCheck />,
          });
          
          loadData();
        } catch (error) {
          console.error('Error saving favicon:', error);
          notifications.show({
            title: 'Error',
            message: 'Failed to save favicon: ' + error.message,
            color: 'red',
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const testLocalStorage = () => {
    try {
      // Test if localStorage is working
      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      
      if (retrieved === testValue) {
        setStorageTestResult({
          success: true,
          message: `LocalStorage test passed! Saved "${testValue}" with key "${testKey}" and retrieved it successfully.`
        });
      } else {
        setStorageTestResult({
          success: false,
          message: `LocalStorage test failed! Saved "${testValue}" but got "${retrieved}" back.`
        });
      }
    } catch (error) {
      console.error('LocalStorage test error:', error);
      setStorageTestResult({
        success: false,
        message: `LocalStorage test failed with error: ${error.message}`
      });
    }
  };

  const checkStorageCapacity = () => {
    try {
      if (typeof window === 'undefined') return;
      
      // Estimate localStorage capacity
      const testKey = '_storage_test_';
      const testValue = '0';
      let estimatedCapacity = 0;
      let minCapacity = 0;
      
      // Try to determine localStorage limits
      try {
        // First see if we can store anything
        localStorage.setItem(testKey, testValue);
        localStorage.removeItem(testKey);
        
        // Now get current usage
        const allKeys = Object.keys(localStorage);
        let totalSize = 0;
        
        allKeys.forEach(key => {
          const value = localStorage.getItem(key) || '';
          totalSize += (key.length + value.length) * 2; // UTF-16 uses 2 bytes per character
        });
        
        // Minimum size should be 5MB according to HTML5 spec
        minCapacity = 5 * 1024 * 1024;  
        
        setStorageStats({
          currentUsage: totalSize,
          currentUsageFormatted: (totalSize / 1024 / 1024).toFixed(2) + ' MB',
          estimatedCapacity: minCapacity,
          estimatedCapacityFormatted: (minCapacity / 1024 / 1024).toFixed(2) + ' MB',
          percentUsed: ((totalSize / minCapacity) * 100).toFixed(2) + '%',
          keys: allKeys.length
        });
      } catch (e) {
        console.error('Error checking storage capacity:', e);
        setStorageStats({
          error: 'Error checking localStorage capacity: ' + e.message
        });
      }
    } catch (error) {
      console.error('Error in storage analysis:', error);
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
          <Title order={2} mb="lg">Debug Information</Title>
          
          <Card withBorder mb="xl">
            <Title order={3} mb="md">LocalStorage Test</Title>
            <Group align="flex-end" mb="md">
              <TextInput 
                label="Key"
                value={testKey}
                onChange={(e) => setTestKey(e.currentTarget.value)}
              />
              <TextInput 
                label="Value"
                value={testValue}
                onChange={(e) => setTestValue(e.currentTarget.value)}
              />
              <Button onClick={testLocalStorage}>
                Test localStorage
              </Button>
            </Group>
            
            {storageTestResult && (
              <Text color={storageTestResult.success ? 'green' : 'red'}>
                {storageTestResult.message}
              </Text>
            )}
          </Card>
          
          <Card withBorder mb="xl">
            <Title order={3} mb="md">LocalStorage Stats</Title>
            {storageStats ? (
              <Stack>
                {storageStats.error ? (
                  <Text color="red">{storageStats.error}</Text>
                ) : (
                  <>
                    <Text>Current usage: {storageStats.currentUsageFormatted}</Text>
                    <Text>Estimated capacity: {storageStats.estimatedCapacityFormatted}</Text>
                    <Text>Percent used: {storageStats.percentUsed}</Text>
                    <Text>Number of keys: {storageStats.keys}</Text>
                  </>
                )}
                <Button onClick={checkStorageCapacity} mt="sm">
                  Refresh Storage Stats
                </Button>
              </Stack>
            ) : (
              <Text>Analyzing localStorage...</Text>
            )}
          </Card>
          
          <Card withBorder mb="xl">
            <Title order={3} mb="md">Direct Favicon Upload</Title>
            <Text mb="md">This will bypass the settings page and directly upload a favicon to localStorage:</Text>
            <FileInput
              label="Upload favicon image"
              placeholder="Choose image file"
              accept="image/png,image/jpeg,image/x-icon,image/svg+xml"
              onChange={handleDirectFaviconUpload}
              mb="md"
              leftSection={<IconUpload size={16} />}
            />
          </Card>
          
          <Card withBorder mb="xl">
            <Title order={3} mb="md">Favicon Data</Title>
            {faviconData ? (
              <>
                <Text mb="md">Favicon data is present in localStorage</Text>
                <Text size="sm" mb="md">Preview:</Text>
                <Image 
                  src={faviconData} 
                  alt="Favicon Preview" 
                  width={64} 
                  height={64} 
                  fit="contain"
                  mb="md"
                />
                <Group>
                  <Button color="blue" onClick={applyFavicon}>
                    Apply Favicon Manually
                  </Button>
                  <Button color="red" onClick={clearFavicon}>
                    Clear Favicon Data
                  </Button>
                </Group>
              </>
            ) : (
              <Text>No favicon data found in localStorage</Text>
            )}
          </Card>
          
          <Card withBorder>
            <Title order={3} mb="md">All Settings</Title>
            <Stack>
              {Object.keys(allSettings).length > 0 ? (
                <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '400px', overflow: 'auto' }}>
                  {JSON.stringify(allSettings, null, 2)}
                </pre>
              ) : (
                <Text>No settings found in localStorage</Text>
              )}
            </Stack>
          </Card>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 