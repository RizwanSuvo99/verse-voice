'use client';
import { Center, Container, Skeleton, Space } from '@mantine/core';

const ProfileSkeleton = () => (
  <Container size={600} className="!px-6 !py-4 !pt-[32px]">
    <Center>
      <Skeleton height={40} width={250} radius="sm" />
    </Center>
    <Space h="xl" />
    <Center>
      <Skeleton height={90} circle />
    </Center>
    <Space h="md" />
    <Center>
      <Skeleton height={16} width={180} radius="sm" />
    </Center>
    <Space h="xl" />
    <Skeleton height={44} radius="lg" />
    <Space h="md" />
    <Skeleton height={44} radius="lg" />
    <Space h="xl" />
    <Center>
      <Skeleton height={44} width={160} radius="md" />
    </Center>
  </Container>
);

export default ProfileSkeleton;
