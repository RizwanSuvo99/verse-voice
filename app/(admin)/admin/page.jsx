'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { getCategories } from '@/services/categoriesService';
import { getFeaturedPosts, getPopularPosts, getPosts } from '@/services/postsService';
import { ActionIcon, AppShell, Badge, Card, Grid, Group, RingProgress, ScrollArea, Table, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArticle, IconEdit, IconEye, IconMessage, IconUsers } from '@tabler/icons-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [opened, { toggle }] = useDisclosure();
  const [stats, setStats] = useState([
    { title: 'Total Posts', value: '0', icon: IconArticle, color: 'blue' },
    { title: 'Featured', value: '0', icon: IconUsers, color: 'teal' },
    { title: 'Popular', value: '0', icon: IconEye, color: 'violet' },
    { title: 'Categories', value: '0', icon: IconMessage, color: 'pink' },
  ]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [ringSections, setRingSections] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const loadDashboardData = useCallback(() => {
    if (dataLoaded) return; // Prevent multiple loads
    
    // Get all posts and categories
    const posts = getPosts();
    const categories = getCategories();
    const featuredPosts = getFeaturedPosts();
    const popularPosts = getPopularPosts();

    // Update stats
    setStats([
      { title: 'Total Posts', value: posts.length.toString(), icon: IconArticle, color: 'blue' },
      { title: 'Featured', value: featuredPosts.length.toString(), icon: IconUsers, color: 'teal' },
      { title: 'Popular', value: popularPosts.length.toString(), icon: IconEye, color: 'violet' },
      { title: 'Categories', value: categories.length.toString(), icon: IconMessage, color: 'pink' },
    ]);

    // Get most recent 5 posts for the table
    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
    setRecentPosts(sortedPosts.slice(0, 5));

    // Calculate category distribution
    const categoryCount = {};
    let totalPosts = posts.length;
    
    // Count posts in each category
    posts.forEach(post => {
      if (post.category) {
        categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
      } else {
        categoryCount['Uncategorized'] = (categoryCount['Uncategorized'] || 0) + 1;
      }
    });

    // Calculate percentages and prepare data for charts
    const colors = ['blue', 'teal', 'orange', 'grape', 'pink', 'cyan', 'indigo', 'green', 'red'];
    const categoryPercentages = Object.entries(categoryCount)
      .map(([category, count], index) => ({
        category,
        count,
        percentage: Math.round((count / totalPosts) * 100),
        color: colors[index % colors.length]
      }))
      .sort((a, b) => b.count - a.count);
    
    // Take top 6 categories
    const topCategories = categoryPercentages.slice(0, 6);
    
    // If there are more categories, group them as "Others"
    if (categoryPercentages.length > 6) {
      const otherCategories = categoryPercentages.slice(6);
      const otherCount = otherCategories.reduce((sum, cat) => sum + cat.count, 0);
      const otherPercentage = Math.round((otherCount / totalPosts) * 100);
      
      topCategories.push({
        category: 'Others',
        count: otherCount,
        percentage: otherPercentage,
        color: 'gray'
      });
    }
    
    setCategoryData(topCategories);
    
    // Create ring sections
    setRingSections(topCategories.map(cat => ({
      value: cat.percentage,
      color: cat.color
    })));
    
    setDataLoaded(true);
  }, [dataLoaded]);

  useEffect(() => {
    // Load real data for dashboard only once
    loadDashboardData();
  }, [loadDashboardData]);

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
        <AppShell.Navbar p="md">
          <AdminNavbar opened={opened} toggle={toggle} />
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
                <ScrollArea h={300}>
                  {recentPosts.length > 0 ? (
                    <Table striped verticalSpacing="sm">
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Title</Table.Th>
                          <Table.Th>Category</Table.Th>
                          <Table.Th>Status</Table.Th>
                          <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {recentPosts.map((post) => (
                          <Table.Tr key={post.id}>
                            <Table.Td>
                              <Text truncate maw={250}>{post.title}</Text>
                            </Table.Td>
                            <Table.Td>
                              <Badge color="blue">{post.category || 'Uncategorized'}</Badge>
                            </Table.Td>
                            <Table.Td>
                              <Group gap="xs">
                                {post.isFeatured && <Badge color="teal">Featured</Badge>}
                                {post.isPopular && <Badge color="violet">Popular</Badge>}
                              </Group>
                            </Table.Td>
                            <Table.Td>
                              <ActionIcon 
                                component={Link}
                                href={`/admin/posts/edit/${post.id}`}
                                color="blue"
                                variant="subtle"
                              >
                                <IconEdit size={16} />
                              </ActionIcon>
                            </Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  ) : (
                    <Text c="dimmed" ta="center">No posts found</Text>
                  )}
                </ScrollArea>
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
                    sections={ringSections}
                  />
                  <ScrollArea h={180}>
                    {categoryData.map((item, index) => (
                      <Group key={index} gap="xs" mb="xs">
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            backgroundColor: `var(--mantine-color-${item.color}-6)`,
                            borderRadius: '50%',
                          }}
                        />
                        <Text size="sm">{item.category} ({item.percentage}%)</Text>
                        <Text size="xs" c="dimmed">({item.count} posts)</Text>
                      </Group>
                    ))}
                  </ScrollArea>
                </Group>
              </Card>
            </Grid.Col>
          </Grid>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
}
