'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { getPostById, updatePost } from '@/services/postsService';
import { AppShell, Box, Button, Card, FileInput, Grid, Group, Image, Loader, Select, Stack, Switch, TextInput, Textarea, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft, IconCheck, IconDeviceFloppy, IconUpload } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Mock categories - in a real app, you'd fetch from API/service
const categories = [
  { value: 'Inspirational', label: 'Inspirational' },
  { value: 'Poetry', label: 'Poetry' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Education', label: 'Education' },
];

export default function EditPostClient({ params }) {
  const postId = parseInt(params.id, 10);
  const [opened, { toggle }] = useDisclosure();
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
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
      imgUrl: '',
    },
    validate: {
      title: (value) => (value.length < 5 ? 'Title must be at least 5 characters' : null),
      description: (value) => (value.length < 50 ? 'Content must be at least 50 characters' : null),
      category: (value) => (!value ? 'Please select a category' : null),
      authorName: (value) => (!value ? 'Author name is required' : null),
    },
  });

  // Load post data
  useEffect(() => {
    const fetchPost = () => {
      try {
        const post = getPostById(postId);
        
        if (!post) {
          notifications.show({
            title: 'Error',
            message: 'Post not found',
            color: 'red',
          });
          router.push('/admin/posts');
          return;
        }
        
        // Set form values from post
        form.setValues({
          title: post.title || '',
          description: post.description || '',
          category: post.category || '',
          authorName: post.authorName || '',
          authorDetails: post.authorDetails || '',
          isFeatured: post.isFeatured || false,
          isPopular: post.isPopular || false,
          imgUrl: post.imgUrl || '',
        });
        
        // Set preview image
        if (post.imgUrl) {
          setPreviewImage(post.imgUrl);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to load post data',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [postId, router]);

  const handleImageChange = (file) => {
    if (file) {
      form.setFieldValue('newImage', file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    
    try {
      let imageUrl = values.imgUrl;
      
      // If a new image was uploaded, generate a URL for it
      if (values.newImage) {
        const reader = new FileReader();
        imageUrl = await new Promise((resolve, reject) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = reject;
          reader.readAsDataURL(values.newImage);
        });
      }
      
      // Prepare updated post data
      const updatedPost = {
        title: values.title,
        description: values.description,
        category: values.category,
        authorName: values.authorName,
        authorDetails: values.authorDetails,
        isFeatured: values.isFeatured,
        isPopular: values.isPopular,
        imgUrl: imageUrl,
      };
      
      // Update post
      const result = updatePost(postId, updatedPost);
      
      if (result) {
        notifications.show({
          title: 'Success',
          message: 'Post updated successfully',
          color: 'green',
          icon: <IconCheck size={16} />,
        });
        router.push('/admin/posts');
      } else {
        throw new Error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to update post',
        color: 'red',
      });
    } finally {
      setSubmitting(false);
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
          {loading ? (
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
              <Loader size="xl" />
            </Box>
          ) : (
            <>
              <Group mb="md">
                <Link href="/admin/posts" passHref>
                  <Button variant="outline" leftSection={<IconArrowLeft size={16} />}>
                    Back to Posts
                  </Button>
                </Link>
                <Title order={3}>Edit Post</Title>
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
                        mb="md"
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
                            placeholder="Upload or change featured image"
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
                      
                      <Button 
                        type="submit"
                        leftSection={<IconDeviceFloppy size={16} />}
                        loading={submitting}
                        fullWidth
                        size="lg"
                      >
                        Save Changes
                      </Button>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </form>
            </>
          )}
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 