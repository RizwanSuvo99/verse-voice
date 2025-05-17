'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { ActionIcon, AppShell, Badge, Box, Burger, Button, Card, Group, Menu, Table, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconEye, IconFilter, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

// Mock data for posts
const mockPosts = [
  { id: 1, title: 'Getting Started with React', category: 'Technology', status: 'published', date: '2023-06-15', views: 1240 },
  { id: 2, title: 'Modern CSS Techniques', category: 'Technology', status: 'published', date: '2023-07-02', views: 980 },
  { id: 3, title: 'JavaScript Best Practices', category: 'Technology', status: 'draft', date: '2023-07-18', views: 0 },
  { id: 4, title: 'The Future of Web Development', category: 'Technology', status: 'published', date: '2023-08-05', views: 1560 },
  { id: 5, title: 'Introduction to Node.js', category: 'Technology', status: 'draft', date: '2023-08-20', views: 0 },
];

export default function PostsPage() {
  const [opened, { toggle }] = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(mockPosts);

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete post handler
  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'green';
      case 'draft': return 'yellow';
      default: return 'gray';
    }
  };

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
            <Title order={4}>Posts Management</Title>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <AdminNavbar />
        </AppShell.Navbar>

        <AppShell.Main>
          <Card withBorder p="lg" radius="md">
            <Group justify="space-between" mb="lg">
              <Title order={4}>All Posts</Title>
              
              <Group>
                <Link href="/admin/posts/new" passHref>
                  <Button leftSection={<IconPlus size={16} />}>
                    New Post
                  </Button>
                </Link>
              </Group>
            </Group>

            <Group mb="md">
              <TextInput
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftSection={<IconSearch size={16} />}
                style={{ flex: 1 }}
              />
              
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button variant="outline" leftSection={<IconFilter size={16} />}>
                    Filter
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Filter by Status</Menu.Label>
                  <Menu.Item>All Posts</Menu.Item>
                  <Menu.Item>Published Only</Menu.Item>
                  <Menu.Item>Drafts Only</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>

            <Box style={{ overflowX: 'auto' }}>
              <Table verticalSpacing="sm" withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Category</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Views</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <Table.Tr key={post.id}>
                        <Table.Td>{post.title}</Table.Td>
                        <Table.Td>{post.category}</Table.Td>
                        <Table.Td>
                          <Badge color={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td>{post.date}</Table.Td>
                        <Table.Td>{post.views}</Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <ActionIcon variant="subtle" color="blue">
                              <IconEye size={16} />
                            </ActionIcon>
                            <ActionIcon variant="subtle" color="blue">
                              <IconEdit size={16} />
                            </ActionIcon>
                            <ActionIcon 
                              variant="subtle" 
                              color="red"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={6}>
                        <Text ta="center" fz="sm" c="dimmed" py="md">
                          No posts found
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </Box>
          </Card>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 