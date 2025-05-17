'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { addPost } from '@/services/postsService';
import { AppShell, Box, Button, Card, FileInput, Grid, Group, Image, Select, Stack, Switch, TextInput, Textarea, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft, IconCheck, IconDeviceFloppy, IconPencil, IconUpload } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Categories for the blog
const categories = [
  { value: 'Inspirational', label: 'Inspirational' },
  { value: 'Poetry', label: 'Poetry' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Education', label: 'Education' },
];

export default function NewPostPage() {
  const [opened, { toggle }] = useDisclosure();
  const [previewImage, setPreviewImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      category: '',
      authorName: '',
      authorDetails: '',
      isFeatured: false,
      isPopular: false,
      featuredImage: null,
    },
    validate: {
      title: (value) => (value.length < 5 ? 'Title must be at least 5 characters' : null),
      description: (value) => (value.length < 50 ? 'Content must be at least 50 characters' : null),
      category: (value) => (!value ? 'Please select a category' : null),
      authorName: (value) => (!value ? 'Author name is required' : null),
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

  const handleSubmit = async (values) => {
    setSubmitting(true);
    
    try {
      let imageUrl = '/assets/blog_1.jpg'; // Default image
      
      // If a featured image was uploaded, generate a URL for it
      if (values.featuredImage) {
        const reader = new FileReader();
        imageUrl = await new Promise((resolve, reject) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = reject;
          reader.readAsDataURL(values.featuredImage);
        });
      }
      
      // Prepare post data
      const newPost = {
        title: values.title,
        description: values.description,
        category: values.category,
        imgUrl: imageUrl,
        authorName: values.authorName,
        authorDetails: values.authorDetails,
        isFeatured: values.isFeatured,
        isPopular: values.isPopular,
      };
      
      // Add post
      const result = addPost(newPost);
      
      if (result) {
        notifications.show({
          title: 'Success',
          message: 'Post created successfully',
          color: 'green',
          icon: <IconCheck size={16} />,
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
      setSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    form.setFieldValue('isDraft', true);
    form.onSubmit(handleSubmit)();
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
          <Group mb="md">
            <Link href="/admin/posts" passHref>
              <Button variant="outline" leftSection={<IconArrowLeft size={16} />}>
                Back to Posts
              </Button>
            </Link>
            <Title order={3}>Create New Post</Title>
          </Group>
        
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
                    label="Content"
                    placeholder="Write your post content here..."
                    required
                    minRows={15}
                    {...form.getInputProps('description')}
                  />
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack>
                  <Card withBorder p="lg" radius="md">
                    <Title order={5} mb="md">Post Settings</Title>
                    
                    <Select
                      label="Category"
                      placeholder="Select a category"
                      data={categories}
                      required
                      mb="md"
                      {...form.getInputProps('category')}
                    />
                    
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
                
                  <Group grow>
                    <Button
                      variant="outline"
                      leftSection={<IconPencil size={16} />}
                      onClick={handleSaveDraft}
                      loading={submitting}
                      size="lg"
                    >
                      Save as Draft
                    </Button>
                    <Button
                      type="submit"
                      leftSection={<IconDeviceFloppy size={16} />}
                      loading={submitting}
                      size="lg"
                    >
                      Publish Post
                    </Button>
                  </Group>
                </Stack>
              </Grid.Col>
            </Grid>
          </form>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 