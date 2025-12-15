'use client';

import { getSettings, updateSettings } from '@/api/siteSettings.mjs';
import FormSkeleton from '@/components/Skeletons/FormSkeleton';
import {
  Button,
  Group,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { toast } from 'sonner';
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
      toast.success('Hero updated!');
    },
    onError: () => {
      toast.error('Failed to update');
    },
  });

  if (isLoading) {
    return <FormSkeleton fields={2} />;
  }

  return (
    <div>
      <Text component={Title} variant="gradient" className="!mb-4 !text-lg">
        Customize Hero Section
      </Text>

      <TextInput
        label="Hero Title"
        value={heroTitle}
        onChange={(e) => setHeroTitle(e.target.value)}
        placeholder="Thoughts Meet Words"
      />
      <Space h="md" />
      <Textarea
        label="Hero Subtitle"
        value={heroSubtitle}
        onChange={(e) => setHeroSubtitle(e.target.value)}
        placeholder="Explore authentic writings..."
        minRows={3}
      />
      <Space h="xl" />
      <Group>
        <Button
          variant="gradient"
          className="glow-btn"
          size="md"
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
