'use client';

import { getSettings, updateSettings } from '@/api/siteSettings.mjs';
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Loader,
  SimpleGrid,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const CustomizeAbout = () => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [roles, setRoles] = useState([]);
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [socialEmail, setSocialEmail] = useState('');

  useEffect(() => {
    if (settings?.aboutPage) {
      const ap = settings.aboutPage;
      setName(ap.name || '');
      setEmail(ap.email || '');
      setImageUrl(ap.imageUrl || '');
      setAboutText(ap.aboutText || '');
      setRoles(ap.roles || []);
      setLinkedin(ap.socialLinks?.linkedin || '');
      setTwitter(ap.socialLinks?.twitter || '');
      setFacebook(ap.socialLinks?.facebook || '');
      setSocialEmail(ap.socialLinks?.email || '');
    }
  }, [settings]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      notifications.show({ title: 'About page updated!', color: 'green' });
    },
    onError: () => {
      notifications.show({ title: 'Failed to update', color: 'red' });
    },
  });

  const handleSubmit = () => {
    mutate({
      aboutPage: {
        name,
        email,
        imageUrl,
        aboutText,
        roles,
        socialLinks: { linkedin, twitter, facebook, email: socialEmail },
      },
    });
  };

  const addRole = () => {
    setRoles([...roles, { title: '', organization: '' }]);
  };

  const removeRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const updateRole = (index, field, value) => {
    const updated = [...roles];
    updated[index] = { ...updated[index], [field]: value };
    setRoles(updated);
  };

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
        Customize About Page
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </SimpleGrid>

      <TextInput
        label="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        mb="md"
      />

      <Textarea
        label="About Text"
        value={aboutText}
        onChange={(e) => setAboutText(e.target.value)}
        minRows={4}
        mb="md"
      />

      <Group justify="space-between" mb="xs">
        <Text fw={600}>Roles</Text>
        <ActionIcon variant="light" onClick={addRole}>
          <IconPlus size={16} />
        </ActionIcon>
      </Group>

      {roles.map((role, index) => (
        <Group key={index} mb="xs" align="flex-end">
          <TextInput
            placeholder="Title (e.g. Current Lecturer)"
            value={role.title}
            onChange={(e) => updateRole(index, 'title', e.target.value)}
            style={{ flex: 1 }}
          />
          <TextInput
            placeholder="Organization"
            value={role.organization}
            onChange={(e) => updateRole(index, 'organization', e.target.value)}
            style={{ flex: 1 }}
          />
          <ActionIcon variant="subtle" color="red" onClick={() => removeRole(index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      ))}

      <Space h="md" />

      <Text fw={600} mb="xs">
        Social Links
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
        <TextInput
          label="LinkedIn"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <TextInput
          label="Twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
        <TextInput
          label="Facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <TextInput
          label="Email"
          value={socialEmail}
          onChange={(e) => setSocialEmail(e.target.value)}
        />
      </SimpleGrid>

      <Group justify="center" mt="xl">
        <Button variant="gradient" size="lg" loading={isPending} onClick={handleSubmit}>
          Save Changes
        </Button>
      </Group>
    </div>
  );
};

export default CustomizeAbout;
