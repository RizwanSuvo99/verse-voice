'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { getCategories } from '@/services/categoriesService';
import { addPost } from '@/services/postsService';
import { AppShell, Box, Button, Card, FileInput, Grid, Group, Image, Select, Stack, Switch, TextInput, Textarea, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft, IconDeviceFloppy, IconUpload } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Helper function to convert file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default function NewPostPage() {
  const [opened, { toggle }] = useDisclosure();
  const [previewImage, setPreviewImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load categories from service
    const allCategories = getCategories();
    setCategories(allCategories.map(cat => ({
      value: cat.name,
      label: cat.name
    })));
  }, []);

  const form = useForm({
    initialValues: {
      title: '',
      category: '',
      description: '',
      imgUrl: null,
      authorName: '',
      authorAvatar: null,
      authorDetails: '',
      isFeatured: false,
      isPopular: false,
    },
    validate: {
      title: (value) => (value.length < 5 ? 'Title must be at least 5 characters' : null),
      category: (value) => (!value ? 'Please select a category' : null),
      description: (value) => (value.length < 50 ? 'Description must be at least 50 characters' : null),
      authorName: (value) => (!value ? 'Author name is required' : null),
    },
  });

  const handleImageChange = async (file) => {
    if (!file) {
      setPreviewImage('');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setPreviewImage(base64);
      form.setFieldValue('imgUrl', base64);
    } catch (error) {
      console.error('Error converting image to base64:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to process the image',
        color: 'red',
      });
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Call the service to add a new post
      const result = addPost(values);
      
      if (result) {
        notifications.show({
          title: 'Success',
          message: 'Post created successfully',
          color: 'green',
        });
        router.push('/admin/posts');
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to create post',
        color: 'red',
      });
    } finally {
      setLoading(false);
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
        <AppShell.Navbar p="md">
          <AdminNavbar opened={opened} toggle={toggle} />
        </AppShell.Navbar>

        <AppShell.Main>
          <Card withBorder p="md" radius="md" mb="md">
            <Group justify="space-between" mb="lg">
              <Group>
                <Button
                  component={Link}
                  href="/admin/posts"
                  variant="subtle"
                  leftSection={<IconArrowLeft size={16} />}
                >
                  Back to Posts
                </Button>
                <Title order={4}>Create New Post</Title>
              </Group>
              <Button 
                leftSection={<IconDeviceFloppy size={16} />}
                onClick={form.onSubmit(handleSubmit)}
                loading={loading}
              >
                Save Post
              </Button>
            </Group>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Grid>
                <Grid.Col span={{ base: 12, md: 8 }}>
                  <Card withBorder p="lg" radius="md">
                    <TextInput
                      label="Title"
                      placeholder="Enter post title"
                      required
                      mb="md"
                      {...form.getInputProps('title')}
                    />
                    
                    <Select
                      label="Category"
                      placeholder="Select a category"
                      data={categories}
                      searchable
                      required
                      mb="md"
                      {...form.getInputProps('category')}
                    />
                    
                    <Textarea
                      label="Content"
                      placeholder="Write your post content here..."
                      required
                      minRows={15}
                      maxRows={20}
                      autosize
                      {...form.getInputProps('description')}
                    />
                  </Card>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Stack>
                    <Card withBorder p="lg" radius="md">
                      <Title order={5} mb="md">Post Details</Title>
                      
                      <TextInput
                        label="Author Name"
                        placeholder="Enter author name"
                        required
                        mb="md"
                        {...form.getInputProps('authorName')}
                      />
                      
                      <TextInput
                        label="Author Details"
                        placeholder="E.g. Role, Department"
                        mb="md"
                        {...form.getInputProps('authorDetails')}
                      />
                      
                      <Switch
                        label="Featured Post"
                        mb="sm"
                        {...form.getInputProps('isFeatured', { type: 'checkbox' })}
                      />
                      
                      <Switch
                        label="Popular Post"
                        mb="xl"
                        {...form.getInputProps('isPopular', { type: 'checkbox' })}
                      />
                    </Card>
                  
                    <Card withBorder p="lg" radius="md">
                      <Title order={5} mb="md">Featured Image</Title>
                      
                      <Box>
                        <FileInput
                          label="Upload Image"
                          placeholder="Upload featured image"
                          accept="image/png,image/jpeg,image/webp,image/jpg"
                          onChange={handleImageChange}
                          leftSection={<IconUpload size={16} />}
                          mb="md"
                        />
                        
                        {previewImage && (
                          <Image
                            src={previewImage}
                            alt="Preview"
                            radius="md"
                            mb="md"
                            style={{ maxWidth: '100%' }}
                          />
                        )}
                      </Box>
                    </Card>
                  </Stack>
                </Grid.Col>
              </Grid>
            </form>
          </Card>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 