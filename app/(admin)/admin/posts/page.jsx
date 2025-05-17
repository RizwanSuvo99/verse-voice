'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { deletePost, getPosts, togglePostStatus } from '@/services/postsService';
import { ActionIcon, AppShell, Badge, Box, Button, Card, Group, Loader, Menu, Modal, Table, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconEdit, IconEye, IconFilter, IconPlus, IconSearch, IconStar, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostsPage() {
  const [opened, { toggle }] = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const router = useRouter();

  // Load posts on mount
  useEffect(() => {
    const loadPosts = () => {
      try {
        const allPosts = getPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to load posts',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter posts based on search query and status
  const filteredPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(post => {
      if (statusFilter === 'all') return true;
      if (statusFilter === 'featured') return post.isFeatured;
      if (statusFilter === 'popular') return post.isPopular;
      return true;
    });

  // Delete post handler
  const handleDeletePost = (post) => {
    setSelectedPost(post);
    openDeleteModal();
  };

  // Confirm delete handler
  const confirmDeletePost = () => {
    if (!selectedPost) return;
    
    try {
      const success = deletePost(selectedPost.id);
      
      if (success) {
        setPosts(posts.filter(post => post.id !== selectedPost.id));
        notifications.show({
          title: 'Success',
          message: 'Post deleted successfully',
          color: 'green',
          icon: <IconCheck size={16} />,
        });
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to delete post',
        color: 'red',
      });
    } finally {
      closeDeleteModal();
      setSelectedPost(null);
    }
  };

  // Toggle featured/popular status
  const handleToggleStatus = (post, statusKey) => {
    try {
      const updatedPost = togglePostStatus(post.id, statusKey);
      
      if (updatedPost) {
        setPosts(posts.map(p => p.id === post.id ? updatedPost : p));
        notifications.show({
          title: 'Success',
          message: `Post ${statusKey} status updated`,
          color: 'green',
          icon: <IconCheck size={16} />,
        });
      } else {
        throw new Error(`Failed to update ${statusKey} status`);
      }
    } catch (error) {
      console.error(`Error updating ${statusKey} status:`, error);
      notifications.show({
        title: 'Error',
        message: `Failed to update ${statusKey} status`,
        color: 'red',
      });
    }
  };

  // View post handler
  const handleViewPost = (post) => {
    // Open post in a new tab
    window.open(`/blogs/${post.id}`, '_blank');
  };

  // Edit post handler
  const handleEditPost = (post) => {
    router.push(`/admin/posts/edit/${post.id}`);
  };

  // Status badge color
  const getStatusColor = (isFeatured, isPopular) => {
    if (isFeatured && isPopular) return 'blue';
    if (isFeatured) return 'green';
    if (isPopular) return 'yellow';
    return 'gray';
  };

  // Status badge label
  const getStatusLabel = (isFeatured, isPopular) => {
    if (isFeatured && isPopular) return 'Featured & Popular';
    if (isFeatured) return 'Featured';
    if (isPopular) return 'Popular';
    return 'Standard';
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
        <AppShell.Navbar p="md">
          <AdminNavbar opened={opened} toggle={toggle} />
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
                onChange={handleSearch}
                leftSection={<IconSearch size={16} />}
                style={{ flex: 1 }}
              />
              
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button variant="outline" leftSection={<IconFilter size={16} />}>
                    {statusFilter === 'all' ? 'All Posts' : 
                     statusFilter === 'featured' ? 'Featured Only' : 
                     statusFilter === 'popular' ? 'Popular Only' : 'Filter'}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Filter by Status</Menu.Label>
                  <Menu.Item onClick={() => setStatusFilter('all')}>All Posts</Menu.Item>
                  <Menu.Item onClick={() => setStatusFilter('featured')}>Featured Only</Menu.Item>
                  <Menu.Item onClick={() => setStatusFilter('popular')}>Popular Only</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>

            {loading ? (
              <Box py="xl" style={{ display: 'flex', justifyContent: 'center' }}>
                <Loader size="md" />
              </Box>
            ) : (
              <Box style={{ overflowX: 'auto' }}>
                <Table verticalSpacing="sm" withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Title</Table.Th>
                      <Table.Th>Category</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Date</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                        <Table.Tr key={post.id}>
                          <Table.Td>{post.title}</Table.Td>
                          <Table.Td>{post.category || 'Uncategorized'}</Table.Td>
                          <Table.Td>
                            <Badge color={getStatusColor(post.isFeatured, post.isPopular)}>
                              {getStatusLabel(post.isFeatured, post.isPopular)}
                            </Badge>
                          </Table.Td>
                          <Table.Td>{post.publishDate}</Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              <ActionIcon variant="subtle" color="blue" onClick={() => handleViewPost(post)}>
                                <IconEye size={16} />
                              </ActionIcon>
                              <ActionIcon variant="subtle" color="blue" onClick={() => handleEditPost(post)}>
                                <IconEdit size={16} />
                              </ActionIcon>
                              <ActionIcon 
                                variant="subtle" 
                                color={post.isFeatured ? "green" : "gray"}
                                onClick={() => handleToggleStatus(post, 'isFeatured')}
                                title={post.isFeatured ? "Remove from featured" : "Add to featured"}
                              >
                                <IconStar size={16} />
                              </ActionIcon>
                              <ActionIcon 
                                variant="subtle" 
                                color="red"
                                onClick={() => handleDeletePost(post)}
                              >
                                <IconTrash size={16} />
                              </ActionIcon>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))
                    ) : (
                      <Table.Tr>
                        <Table.Td colSpan={5}>
                          <Text ta="center" fz="sm" c="dimmed" py="md">
                            No posts found
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    )}
                  </Table.Tbody>
                </Table>
              </Box>
            )}
          </Card>
        </AppShell.Main>
      </AppShell>

      {/* Delete confirmation modal */}
      <Modal opened={deleteModalOpened} onClose={closeDeleteModal} title="Confirm Delete" centered>
        <Text mb="md">Are you sure you want to delete "{selectedPost?.title}"?</Text>
        <Text mb="lg" c="dimmed" size="sm">This action cannot be undone.</Text>
        <Group justify="flex-end">
          <Button variant="outline" onClick={closeDeleteModal}>Cancel</Button>
          <Button color="red" onClick={confirmDeletePost}>Delete</Button>
        </Group>
      </Modal>
    </AuthGuard>
  );
} 