'use client';

import { getMyRequests } from '@/api/blogRequests.mjs';
import RequireAuth from '@/components/RequireAuth';
import BlogGridSkeleton from '@/components/Skeletons/BlogGridSkeleton';
import {
  Badge,
  Card,
  Container,
  Center,
  Group,
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
      <Container size={1500} className="!pt-[24px]">
        <BlogGridSkeleton count={3} cols={{ base: 1, sm: 2, md: 3 }} />
      </Container>
    );
  }

  return (
    <RequireAuth>
      <Container size={1500} className="!pt-[24px]">
        <Text
          component={Title}
          variant="gradient"
          className="!mb-4 !text-center !text-[24px]"
        >
          My Blog Requests
        </Text>

        {!requests || requests.length === 0 ? (
          <Center py="xl">
            <Text c="dimmed" size="sm">
              You haven&apos;t submitted any blog requests yet.
            </Text>
          </Center>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            {requests.map((req) => (
              <Card key={req._id} withBorder padding="md" radius="md">
                <Group justify="space-between" mb="xs">
                  <Badge color={statusColors[req.status]} variant="filled">
                    {req.status}
                  </Badge>
                  <Text fz="xs" c="dimmed">
                    {dayjs(req.createdAt).format('D MMM YYYY')}
                  </Text>
                </Group>
                <Text fw={600} size="sm" lineClamp={2}>
                  {req.title}
                </Text>
                <Text fz="xs" c="dimmed" mt="xs">
                  Category: {req.category}
                </Text>
                <Text fz="xs" mt="xs" lineClamp={3}>
                  {req.content}
                </Text>
                {req.adminNote && (
                  <>
                    <Space h="xs" />
                    <Text fz="xs" c="red">
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
