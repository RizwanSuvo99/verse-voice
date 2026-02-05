'use client';

import { getCurrentUser } from '@/api/users.mjs';
import { useUpdateProfile } from '@/hooks/mutations';
import { compressImage } from '@/utils/compressImage';
import RequireAuth from '@/components/RequireAuth';
import ProfileSkeleton from '@/components/Skeletons/ProfileSkeleton';
import { OptimizedAvatar } from '@/components/ui';
import {
  Button,
  Center,
  Container,
  FileInput,
  Space,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core';
import { toast } from 'sonner';
import { IconFileCv } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

const Profile = () => {
  const [name, setName] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  // Use optimistic mutation hook
  const { mutate, isPending } = useUpdateProfile({
    onSuccess: () => {
      setAvatarFile(null);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    const formData = new FormData();
    formData.append('fullName', name);

    // Compress avatar before upload
    if (avatarFile) {
      try {
        const compressed = await compressImage(avatarFile, { maxSizeMB: 0.5 });
        formData.append('avatar', compressed);
      } catch {
        formData.append('avatar', avatarFile);
      }
    }

    mutate(formData);
  };

  const icon = (
    <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  if (isLoading) {
    return (
      <Container size={600} className="!px-6 !py-4 !pt-[32px]">
        <ProfileSkeleton />
      </Container>
    );
  }

  return (
    <RequireAuth>
      <Container size={600} className="!px-6 !py-4 !pt-[32px]">
        <Text
          component={Title}
          variant="gradient"
          className="!mb-4 !text-center !text-[24px]"
        >
          Profile Settings
        </Text>

        <Center>
          <OptimizedAvatar
            src={user?.avatar}
            name={user?.name}
            size={90}
            alt={user?.name}
          />
        </Center>

        <Space h="sm" />

        <Center>
          <Text c="dimmed" size="sm">
            {user?.email}
          </Text>
        </Center>

        <Space h="md" />

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Space h="md" />
          <FileInput
            label="Profile Picture"
            leftSection={icon}
            placeholder="Upload new avatar"
            clearable
            value={avatarFile}
            onChange={setAvatarFile}
            accept="image/png,image/jpeg,image/jpg"
          />
          <Space h="md" />
          <Center>
            <Button
              variant="gradient"
              size="md"
              type="submit"
              loading={isPending}
            >
              Update Profile
            </Button>
          </Center>
        </form>
      </Container>
    </RequireAuth>
  );
};

export default Profile;
