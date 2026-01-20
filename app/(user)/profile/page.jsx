'use client';

import { getCurrentUser } from '@/api/users.mjs';
import { useUpdateProfile } from '@/hooks/mutations';
import RequireAuth from '@/components/RequireAuth';
import ProfileSkeleton from '@/components/Skeletons/ProfileSkeleton';
import {
  Avatar,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    const formData = new FormData();
    formData.append('fullName', name);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
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
          <Avatar
            src={user?.avatar || null}
            size={90}
            radius="xl"
            alt={user?.name}
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
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
