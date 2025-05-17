'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { AppShell, Burger, Card, Grid, Group, RingProgress, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArticle, IconEye, IconMessage, IconUsers } from '@tabler/icons-react';

// Dashboard stats mock data
const stats = [
  { title: 'Total Posts', value: '24', icon: IconArticle, color: 'blue' },
  { title: 'Total Users', value: '156', icon: IconUsers, color: 'teal' },
  { title: 'Page Views', value: '5.8K', icon: IconEye, color: 'violet' },
  { title: 'Comments', value: '87', icon: IconMessage, color: 'pink' },
];

// Placeholder data for charts
const categoryData = [
  { category: 'Technology', percentage: 45 },
  { category: 'Lifestyle', percentage: 25 },
  { category: 'Business', percentage: 15 },
  { category: 'Health', percentage: 15 },
];

export default function AdminDashboard() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AuthGuard>
      <AppShell
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header p="md">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={4}>Admin Dashboard</Title>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <AdminNavbar />
        </AppShell.Navbar>

        <AppShell.Main>
          <Grid gutter="md">
            {stats.map((stat, index) => (
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
                <Card withBorder p="lg" radius="md">
                  <Group justify="space-between">
                    <Text fz="lg" fw={500}>{stat.title}</Text>
                    <stat.icon size={20} color={`var(--mantine-color-${stat.color}-6)`} />
                  </Group>
                  <Text fz="30px" fw={700} mt="md" c={stat.color}>
                    {stat.value}
                  </Text>
                </Card>
              </Grid.Col>
            ))}

            <Grid.Col span={{ base: 12, md: 8 }}>
              <Card withBorder p="lg" radius="md">
                <Title order={4} mb="md">Recent Posts</Title>
                <Text>Here will be a table of recent posts</Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card withBorder p="lg" radius="md">
                <Title order={4} mb="md">Category Distribution</Title>
                <Group align="start" mt="md">
                  <RingProgress
                    size={160}
                    thickness={16}
                    roundCaps
                    sections={[
                      { value: 45, color: 'blue' },
                      { value: 25, color: 'teal' },
                      { value: 15, color: 'orange' },
                      { value: 15, color: 'grape' },
                    ]}
                  />
                  <div>
                    {categoryData.map((item, index) => (
                      <Group key={index} gap="xs" mb="xs">
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            backgroundColor: 
                              index === 0 ? 'var(--mantine-color-blue-6)' : 
                              index === 1 ? 'var(--mantine-color-teal-6)' : 
                              index === 2 ? 'var(--mantine-color-orange-6)' : 
                              'var(--mantine-color-grape-6)',
                            borderRadius: '50%',
                          }}
                        />
                        <Text size="sm">{item.category} ({item.percentage}%)</Text>
                      </Group>
                    ))}
                  </div>
                </Group>
              </Card>
            </Grid.Col>
          </Grid>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
}
