'use client';

import { getSettings, updateSettings } from '@/api/siteSettings.mjs';
import {
  Button,
  Center,
  Group,
  Loader,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const CustomizeFooter = () => {
  const queryClient = useQueryClient();
  const [footerText, setFooterText] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');

  const { data: settings, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  useEffect(() => {
    if (settings) {
      setFooterText(settings.footerText || '');
      setTwitter(settings.socialLinks?.twitter || '');
      setLinkedin(settings.socialLinks?.linkedin || '');
      setInstagram(settings.socialLinks?.instagram || '');
    }
  }, [settings]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      notifications.show({ title: 'Footer updated!', color: 'green' });
    },
    onError: () => {
      notifications.show({ title: 'Failed to update', color: 'red' });
    },
  });

  if (isLoading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  return (
    <div>
      <Text component={Title} variant="gradient" className="!mb-6 !text-2xl">
        Customize Footer
      </Text>

      <Textarea
        label="Footer Text"
        value={footerText}
        onChange={(e) => setFooterText(e.target.value)}
        minRows={4}
        size="lg"
      />
      <Space h="md" />
      <TextInput
        label="Twitter URL"
        value={twitter}
        onChange={(e) => setTwitter(e.target.value)}
        placeholder="https://twitter.com/..."
      />
      <Space h="sm" />
      <TextInput
        label="LinkedIn URL"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        placeholder="https://linkedin.com/..."
      />
      <Space h="sm" />
      <TextInput
        label="Instagram URL"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
        placeholder="https://instagram.com/..."
      />
      <Space h="xl" />
      <Group>
        <Button
          variant="gradient"
          size="lg"
          loading={isPending}
          onClick={() =>
            mutate({
              footerText,
              socialLinks: { twitter, linkedin, instagram },
            })
          }
        >
          Save Changes
        </Button>
      </Group>
    </div>
  );
};

export default CustomizeFooter;
