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

const CustomizeHero = () => {
  const queryClient = useQueryClient();
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');

  const { data: settings, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  useEffect(() => {
    if (settings) {
      setHeroTitle(settings.heroTitle || '');
      setHeroSubtitle(settings.heroSubtitle || '');
    }
  }, [settings]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      notifications.show({ title: 'Hero updated!', color: 'green' });
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
        Customize Hero Section
      </Text>

      <TextInput
        label="Hero Title"
        value={heroTitle}
        onChange={(e) => setHeroTitle(e.target.value)}
        placeholder="Thoughts Meet Words"
        size="lg"
      />
      <Space h="md" />
      <Textarea
        label="Hero Subtitle"
        value={heroSubtitle}
        onChange={(e) => setHeroSubtitle(e.target.value)}
        placeholder="Explore authentic writings..."
        minRows={3}
        size="lg"
      />
      <Space h="xl" />
      <Group>
        <Button
          variant="gradient"
          size="lg"
          loading={isPending}
          onClick={() => mutate({ heroTitle, heroSubtitle })}
        >
          Save Changes
        </Button>
      </Group>
    </div>
  );
};

export default CustomizeHero;
