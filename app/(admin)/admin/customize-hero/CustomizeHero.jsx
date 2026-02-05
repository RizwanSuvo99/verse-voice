'use client';

import { getSettings, updateSettings, uploadSiteLogo } from '@/api/siteSettings.mjs';
import FormSkeleton from '@/components/Skeletons/FormSkeleton';
import {
  Button,
  FileInput,
  Group,
  Image,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const CustomizeHero = () => {
  const queryClient = useQueryClient();
  const [siteTitle, setSiteTitle] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState('');

  const { data: settings, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  useEffect(() => {
    if (settings) {
      setSiteTitle(settings.siteTitle || '');
      setHeroTitle(settings.heroTitle || '');
      setHeroSubtitle(settings.heroSubtitle || '');
      setLogoUrl(settings.siteLogo || '');
    }
  }, [settings]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      toast.success('Hero updated!');
    },
    onError: () => {},
  });

  const { mutate: mutateLogo, isPending: isLogoUploading } = useMutation({
    mutationFn: uploadSiteLogo,
    onSuccess: (data) => {
      setLogoUrl(data.siteLogo);
      setLogoFile(null);
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      toast.success('Site logo updated!');
    },
    onError: () => {
      toast.error('Failed to upload logo');
    },
  });

  const previewUrl = logoFile ? URL.createObjectURL(logoFile) : logoUrl;

  const handleSave = () => {
    if (logoFile) {
      const formData = new FormData();
      formData.append('siteLogo', logoFile);
      mutateLogo(formData);
    }
    mutate({ siteTitle, heroTitle, heroSubtitle });
  };

  if (isLoading) {
    return <FormSkeleton fields={2} />;
  }

  return (
    <div>
      <Text component={Title} variant="gradient" className="!mb-4 !text-lg">
        Customize Hero Section
      </Text>

      <TextInput
        label="Site Title"
        value={siteTitle}
        onChange={(e) => setSiteTitle(e.target.value)}
        placeholder="Class Room Writers"
        description="Displayed in the navbar alongside the logo"
      />
      <Space h="md" />

      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Site logo preview"
          h={60}
          w={60}
          fit="contain"
          radius="md"
          mb="sm"
          fallbackSrc="https://placehold.co/60x60?text=Logo"
        />
      )}
      <FileInput
        label="Site Logo"
        placeholder="Choose logo file"
        accept="image/png,image/jpeg,image/jpg,image/svg+xml"
        leftSection={<IconPhoto size={16} />}
        value={logoFile}
        onChange={setLogoFile}
        clearable
        description="Displayed in the navbar and admin sidebar"
      />
      <Space h="md" />

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
          loading={isPending || isLogoUploading}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Group>
    </div>
  );
};

export default CustomizeHero;
