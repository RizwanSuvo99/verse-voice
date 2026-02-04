'use client';

import { getCurrentUser, updateProfile } from '@/api/users.mjs';
import RequireAuth from '@/components/RequireAuth';
import {
  Avatar,
  Button,
  Center,
  Container,
  FileInput,
  Loader,
  Space,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconFileCv } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

const Profile = () => {
  const queryClient = useQueryClient();
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

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      notifications.show({ title: 'Profile updated!', color: 'green' });
      setAvatarFile(null);
    },
    onError: (err) => {
      notifications.show({
        title: err?.response?.data?.message || 'Failed to update profile',
        color: 'red',
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      notifications.show({ title: 'Name is required', color: 'red' });
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
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
      <Container size={600} className="!px-6 !py-4 !pt-[100px]">
        <Center py="xl">
          <Loader />
        </Center>
      </Container>
    );
  }

  return (
    <RequireAuth>
      <Container size={600} className="!px-6 !py-4 !pt-[100px]">
        <Text
          component={Title}
          variant="gradient"
          className="!mb-6 !text-center !text-[40px]"
        >
          Profile Settings
        </Text>

        <Center>
          <Avatar
            src={user?.avatar || null}
            size={120}
            radius="xl"
            alt={user?.name}
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
        </Center>

        <Space h="md" />

        <Center>
          <Text c="dimmed">{user?.email}</Text>
        </Center>

        <Space h="xl" />

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            radius="lg"
            classNames={{ input: '!h-[50px]' }}
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
            radius="lg"
            classNames={{ input: '!h-[50px]' }}
          />
          <Space h="xl" />
          <Center>
            <Button
              variant="gradient"
              size="lg"
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
