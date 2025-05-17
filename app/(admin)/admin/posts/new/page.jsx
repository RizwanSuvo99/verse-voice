'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { AppShell, Box, Burger, Button, Card, FileInput, Grid, Group, Image, Select, Switch, TextInput, Textarea, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconDeviceFloppy, IconPencil, IconUpload } from '@tabler/icons-react';
import { useState } from 'react';

// Mock categories
const mockCategories = [
  { value: 'technology', label: 'Technology' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'business', label: 'Business' },
  { value: 'health', label: 'Health' },
];

export default function NewPostPage() {
  const [opened, { toggle }] = useDisclosure();
  const [previewImage, setPreviewImage] = useState(null);
  
  const form = useForm({
    initialValues: {
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      featuredImage: null,
      isPublished: true,
    },
    validate: {
      title: (value) => (value.length < 5 ? 'Title must be at least 5 characters' : null),
      excerpt: (value) => (value.length < 10 ? 'Excerpt must be at least 10 characters' : null),
      content: (value) => (value.length < 50 ? 'Content must be at least 50 characters' : null),
      category: (value) => (!value ? 'Please select a category' : null),
    },
  });

  const handleImageChange = (file) => {
    form.setFieldValue('featuredImage', file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    // Here you would submit the form data to your API
    // For now, we'll just log the values
    alert('Post created successfully!');
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
            <Title order={4}>Create New Post</Title>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <AdminNavbar />
        </AppShell.Navbar>

        <AppShell.Main>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Card withBorder p="lg" radius="md" mb="md">
                  <TextInput
                    label="Title"
                    placeholder="Enter post title"
                    required
                    mb="md"
                    {...form.getInputProps('title')}
                  />
                  
                  <Textarea
                    label="Excerpt"
                    placeholder="Brief description of your post"
                    required
                    minRows={2}
                    mb="md"
                    {...form.getInputProps('excerpt')}
                  />
                  
                  <Textarea
                    label="Content"
                    placeholder="Write your post content here..."
                    required
                    minRows={10}
                    {...form.getInputProps('content')}
                  />
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card withBorder p="lg" radius="md" mb="md">
                  <Title order={5} mb="md">Post Settings</Title>
                  
                  <Select
                    label="Category"
                    placeholder="Select a category"
                    data={mockCategories}
                    required
                    mb="md"
                    {...form.getInputProps('category')}
                  />
                  
                  <TextInput
                    label="Tags"
                    placeholder="Enter tags separated by commas"
                    mb="md"
                    {...form.getInputProps('tags')}
                  />
                  
                  <Switch
                    label="Publish immediately"
                    checked={form.values.isPublished}
                    onChange={(event) => form.setFieldValue('isPublished', event.currentTarget.checked)}
                    mb="md"
                  />

                  <Box>
                    <FileInput
                      label="Featured Image"
                      placeholder="Upload image"
                      accept="image/png,image/jpeg,image/webp"
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

                  <Group justify="flex-end" mt="xl">
                    <Button variant="outline" leftSection={<IconPencil size={16} />}>
                      Save as Draft
                    </Button>
                    <Button type="submit" leftSection={<IconDeviceFloppy size={16} />}>
                      Publish Post
                    </Button>
                  </Group>
                </Card>
              </Grid.Col>
            </Grid>
          </form>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 