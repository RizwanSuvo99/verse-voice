'use client';

import { getSettings, updateSettings } from '@/api/siteSettings.mjs';
import FormSkeleton from '@/components/Skeletons/FormSkeleton';
import {
  Button,
  Group,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const CustomizeContact = () => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [mapEmbedUrl, setMapEmbedUrl] = useState('');
  const [formHeading, setFormHeading] = useState('');
  const [formDescription, setFormDescription] = useState('');

  useEffect(() => {
    if (settings?.contactPage) {
      const cp = settings.contactPage;
      setHeading(cp.heading || '');
      setDescription(cp.description || '');
      setPhone1(cp.phone1 || '');
      setPhone2(cp.phone2 || '');
      setEmail1(cp.email1 || '');
      setEmail2(cp.email2 || '');
      setAddress1(cp.address1 || '');
      setAddress2(cp.address2 || '');
      setMapEmbedUrl(cp.mapEmbedUrl || '');
      setFormHeading(cp.formHeading || '');
      setFormDescription(cp.formDescription || '');
    }
  }, [settings]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      toast.success('Contact page updated!');
    },
    onError: () => {},
  });

  const handleSubmit = () => {
    mutate({
      contactPage: {
        heading,
        description,
        phone1,
        phone2,
        email1,
        email2,
        address1,
        address2,
        mapEmbedUrl,
        formHeading,
        formDescription,
      },
    });
  };

  if (isLoading) {
    return <FormSkeleton fields={8} />;
  }

  return (
    <div>
      <Text component={Title} variant="gradient" className="!mb-4 !text-lg">
        Customize Contact Page
      </Text>

      <TextInput
        label="Page Heading"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        mb="md"
      />

      <Textarea
        label="Page Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        minRows={3}
        mb="md"
      />

      <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
        <TextInput
          label="Phone 1"
          value={phone1}
          onChange={(e) => setPhone1(e.target.value)}
        />
        <TextInput
          label="Phone 2"
          value={phone2}
          onChange={(e) => setPhone2(e.target.value)}
        />
        <TextInput
          label="Email 1"
          value={email1}
          onChange={(e) => setEmail1(e.target.value)}
        />
        <TextInput
          label="Email 2"
          value={email2}
          onChange={(e) => setEmail2(e.target.value)}
        />
        <TextInput
          label="Address Line 1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <TextInput
          label="Address Line 2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
      </SimpleGrid>

      <TextInput
        label="Google Maps Embed URL"
        value={mapEmbedUrl}
        onChange={(e) => setMapEmbedUrl(e.target.value)}
        mb="md"
      />

      <TextInput
        label="Form Heading"
        value={formHeading}
        onChange={(e) => setFormHeading(e.target.value)}
        mb="md"
      />

      <Textarea
        label="Form Description"
        value={formDescription}
        onChange={(e) => setFormDescription(e.target.value)}
        minRows={2}
        mb="md"
      />

      <Group justify="center" mt="xl">
        <Button
          variant="gradient"
          className="glow-btn"
          size="md"
          loading={isPending}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </Group>
    </div>
  );
};

export default CustomizeContact;
