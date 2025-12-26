'use client';

import { getMyRequests } from '@/api/blogRequests.mjs';
import RequireAuth from '@/components/RequireAuth';
import {
  Badge,
  Card,
  Container,
  Center,
  Group,
  Loader,
  SimpleGrid,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

const statusColors = {
  pending: 'yellow',
  approved: 'green',
  rejected: 'red',
};

const MyRequests = () => {
  const { data: requests, isLoading } = useQuery({
    queryKey: ['myRequests'],
    queryFn: getMyRequests,
  });

  if (isLoading) {
    return (
      <Container size={1300} className="!pt-[50px]">
        <Center py="xl">
          <Loader />
        </Center>
      </Container>
    );
  }

  return (
    <RequireAuth>
    <Container size={1300} className="!pt-[50px]">
      <Text
        component={Title}
        variant="gradient"
        className="!mb-6 !text-center !text-[40px]"
      >
        My Blog Requests
      </Text>

      {!requests || requests.length === 0 ? (
        <Center py="xl">
          <Text c="dimmed" size="lg">
            You haven&apos;t submitted any blog requests yet.
          </Text>
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
          {requests.map((req) => (
            <Card key={req._id} withBorder padding="lg" radius="md" className="glass-card">
              <Group justify="space-between" mb="sm">
                <Badge color={statusColors[req.status]} variant="filled">
                  {req.status}
                </Badge>
                <Text fz="xs" c="dimmed">
                  {dayjs(req.createdAt).format('D MMM YYYY')}
                </Text>
              </Group>
              <Text fw={600} size="lg" lineClamp={2}>
                {req.title}
              </Text>
              <Text fz="sm" c="dimmed" mt="xs">
                Category: {req.category}
              </Text>
              <Text fz="sm" mt="xs" lineClamp={3}>
                {req.content}
              </Text>
              {req.adminNote && (
                <>
                  <Space h="sm" />
                  <Text fz="sm" c="red">
                    Admin note: {req.adminNote}
                  </Text>
                </>
              )}
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
    </RequireAuth>
  );
};

export default MyRequests;
