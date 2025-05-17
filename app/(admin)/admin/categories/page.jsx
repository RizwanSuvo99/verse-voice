'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { addCategory, debugCategoryPosts, deleteCategory, fileToBase64, refreshCategoryCounts, updateCategory } from '@/services/categoriesService';
import { ActionIcon, AppShell, Button, Card, ColorInput, FileInput, Group, Image, Loader, Modal, Stack, Table, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconBug, IconDeviceFloppy, IconEdit, IconPlus, IconRefresh, IconTrash, IconUpload, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function CategoriesPage() {
  const [opened, { toggle }] = useDisclosure();
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ opened: false, categoryId: null, categoryName: '' });
  const [newPreviewImage, setNewPreviewImage] = useState('');
  const [editPreviewImage, setEditPreviewImage] = useState('');

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setLoading(true);
    // Refresh counts to ensure they're up to date with posts
    const updatedCategories = refreshCategoryCounts();
    setCategories(updatedCategories);
    setLoading(false);
  };

  const form = useForm({
    initialValues: {
      name: '',
      slug: '',
      color: '#1c7ed6',
      image: null,
    },
    validate: {
      name: (value) => (value.length < 3 ? 'Name must be at least 3 characters' : null),
      slug: (value) => (value.length < 3 ? 'Slug must be at least 3 characters' : null),
    },
  });

  const newCategoryForm = useForm({
    initialValues: {
      name: '',
      slug: '',
      color: '#1c7ed6',
      image: null,
    },
    validate: {
      name: (value) => (value.length < 3 ? 'Name must be at least 3 characters' : null),
      slug: (value) => (value.length < 3 ? 'Slug must be at least 3 characters' : null),
    },
  });

  // Auto-generate slug from name (for new category form)
  useEffect(() => {
    const name = newCategoryForm.values.name;
    if (name) {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      newCategoryForm.setFieldValue('slug', slug);
    }
  }, [newCategoryForm.values.name]);

  // Auto-generate slug from name (for edit form)
  useEffect(() => {
    const name = form.values.name;
    if (name) {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      form.setFieldValue('slug', slug);
    }
  }, [form.values.name]);

  const handleDeleteCategory = (id) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      setDeleteModal({
        opened: true,
        categoryId: id,
        categoryName: category.name
      });
    }
  };

  const confirmDeleteCategory = () => {
    const result = deleteCategory(deleteModal.categoryId);
    if (result) {
      notifications.show({
        title: 'Success',
        message: `Category "${deleteModal.categoryName}" has been deleted`,
        color: 'green',
      });
      setCategories(categories.filter(category => category.id !== deleteModal.categoryId));
    } else {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete category',
        color: 'red',
      });
    }
    setDeleteModal({ opened: false, categoryId: null, categoryName: '' });
  };

  const handleEditCategory = (category) => {
    setEditingId(category.id);
    form.setValues({
      name: category.name,
      slug: category.slug,
      color: category.color || '#1c7ed6',
      image: null,
    });
    setEditPreviewImage(category.image || '');
  };

  const handleEditImageChange = async (file) => {
    if (!file) {
      setEditPreviewImage('');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setEditPreviewImage(base64);
    } catch (error) {
      console.error('Error converting image to base64:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to process the image',
        color: 'red',
      });
    }
  };

  const handleNewImageChange = async (file) => {
    if (!file) {
      setNewPreviewImage('');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setNewPreviewImage(base64);
    } catch (error) {
      console.error('Error converting image to base64:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to process the image',
        color: 'red',
      });
    }
  };

  const handleSaveEdit = () => {
    if (form.validate().hasErrors) return;

    const updateData = {
      ...form.values
    };
    
    if (editPreviewImage) {
      updateData.image = editPreviewImage;
    }

    const result = updateCategory(editingId, updateData);
    
    if (result) {
      notifications.show({
        title: 'Success',
        message: `Category "${result.name}" has been updated`,
        color: 'green',
      });
      
      setCategories(categories.map(category => 
        category.id === editingId 
          ? { ...category, ...result }
          : category
      ));
      setEditingId(null);
      form.reset();
      setEditPreviewImage('');

      // Refresh categories after update to ensure post counts are correct
      setTimeout(() => {
        loadCategories();
      }, 500);
    } else {
      notifications.show({
        title: 'Error',
        message: 'Failed to update category',
        color: 'red',
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    form.reset();
    setEditPreviewImage('');
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    newCategoryForm.reset();
    setNewPreviewImage('');
  };

  const handleSaveNew = () => {
    if (newCategoryForm.validate().hasErrors) return;
    
    const newCategoryData = {
      ...newCategoryForm.values
    };
    
    if (newPreviewImage) {
      newCategoryData.image = newPreviewImage;
    }
    
    const result = addCategory(newCategoryData);
    
    if (result) {
      notifications.show({
        title: 'Success',
        message: `Category "${result.name}" has been created`,
        color: 'green',
      });
      
      setCategories([...categories, result]);
      setIsAddingNew(false);
      newCategoryForm.reset();
      setNewPreviewImage('');
    } else {
      notifications.show({
        title: 'Error',
        message: 'Failed to create category. It might already exist.',
        color: 'red',
      });
    }
  };

  const handleCancelNew = () => {
    setIsAddingNew(false);
    newCategoryForm.reset();
    setNewPreviewImage('');
  };

  const handleDebug = () => {
    debugCategoryPosts();
    notifications.show({
      title: 'Debug Info',
      message: 'Category and post information logged to console. Press F12 to view.',
      color: 'blue',
    });
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
          <Card withBorder p="lg" radius="md" mb="md">
            <Group justify="space-between" mb="lg">
              <Title order={4}>All Categories</Title>
              <Group>
                <Button 
                  variant="outline" 
                  leftSection={<IconRefresh size={16} />} 
                  onClick={loadCategories}
                >
                  Refresh
                </Button>
                <Button 
                  variant="outline" 
                  color="blue" 
                  leftSection={<IconBug size={16} />} 
                  onClick={handleDebug}
                >
                  Debug
                </Button>
                <Button leftSection={<IconPlus size={16} />} onClick={handleAddNew}>
                  Add Category
                </Button>
              </Group>
            </Group>

            {isAddingNew && (
              <Card withBorder shadow="sm" p="md" radius="md" mb="lg">
                <Stack gap="md">
                  <TextInput
                    label="Name"
                    placeholder="Category name"
                    required
                    {...newCategoryForm.getInputProps('name')}
                  />
                  <TextInput
                    label="Slug"
                    placeholder="category-slug"
                    required
                    {...newCategoryForm.getInputProps('slug')}
                  />
                  <ColorInput
                    label="Color"
                    format="hex"
                    swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                    {...newCategoryForm.getInputProps('color')}
                  />
                  
                  <FileInput
                    label="Background Image"
                    placeholder="Upload image"
                    accept="image/png,image/jpeg,image/webp"
                    leftSection={<IconUpload size={16} />}
                    onChange={handleNewImageChange}
                  />
                  
                  {newPreviewImage && (
                    <div>
                      <Text size="sm" mb="xs">Image Preview:</Text>
                      <Image 
                        src={newPreviewImage} 
                        alt="Category preview" 
                        radius="md"
                        h={150}
                        w="auto"
                        fit="cover"
                      />
                    </div>
                  )}
                  
                  <Group justify="flex-end">
                    <Button variant="outline" leftSection={<IconX size={16} />} onClick={handleCancelNew}>
                      Cancel
                    </Button>
                    <Button leftSection={<IconDeviceFloppy size={16} />} onClick={handleSaveNew}>
                      Save
                    </Button>
                  </Group>
                </Stack>
              </Card>
            )}

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <Loader size="lg" />
              </div>
            ) : categories.length === 0 ? (
              <Text c="dimmed" ta="center" py="xl">
                No categories found. Add your first category to get started.
              </Text>
            ) : (
              <Table verticalSpacing="sm" withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Slug</Table.Th>
                    <Table.Th>Posts</Table.Th>
                    <Table.Th>Color</Table.Th>
                    <Table.Th>Image</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {categories.map((category) => (
                    <Table.Tr key={category.id}>
                      {editingId === category.id ? (
                        <>
                          <Table.Td>
                            <TextInput 
                              {...form.getInputProps('name')} 
                              placeholder="Category name" 
                            />
                          </Table.Td>
                          <Table.Td>
                            <TextInput 
                              {...form.getInputProps('slug')} 
                              placeholder="category-slug" 
                            />
                          </Table.Td>
                          <Table.Td>{category.posts}</Table.Td>
                          <Table.Td>
                            <ColorInput 
                              {...form.getInputProps('color')} 
                              format="hex"
                              swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                            />
                          </Table.Td>
                          <Table.Td>
                            <Stack gap="xs">
                              <FileInput
                                placeholder="Upload new image"
                                accept="image/png,image/jpeg,image/webp"
                                leftSection={<IconUpload size={14} />}
                                size="xs"
                                onChange={handleEditImageChange}
                              />
                              {editPreviewImage && (
                                <Image 
                                  src={editPreviewImage} 
                                  alt="Category preview" 
                                  radius="md"
                                  h={60}
                                  w={100}
                                  fit="cover"
                                />
                              )}
                            </Stack>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              <Button size="xs" onClick={handleSaveEdit}>Save</Button>
                              <Button size="xs" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                            </Group>
                          </Table.Td>
                        </>
                      ) : (
                        <>
                          <Table.Td>{category.name}</Table.Td>
                          <Table.Td>{category.slug}</Table.Td>
                          <Table.Td>{category.posts}</Table.Td>
                          <Table.Td>
                            <div 
                              style={{ 
                                width: 24, 
                                height: 24, 
                                backgroundColor: category.color,
                                borderRadius: '4px'
                              }} 
                            />
                          </Table.Td>
                          <Table.Td>
                            {category.image ? (
                              <Image 
                                src={category.image} 
                                alt={category.name} 
                                radius="md"
                                h={60}
                                w={100}
                                fit="cover"
                              />
                            ) : (
                              <Text size="xs" c="dimmed">No image</Text>
                            )}
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              <ActionIcon 
                                variant="subtle" 
                                color="blue"
                                onClick={() => handleEditCategory(category)}
                              >
                                <IconEdit size={16} />
                              </ActionIcon>
                              <ActionIcon 
                                variant="subtle" 
                                color="red"
                                onClick={() => handleDeleteCategory(category.id)}
                                disabled={category.posts > 0}
                                title={category.posts > 0 ? "Cannot delete category with posts" : "Delete category"}
                              >
                                <IconTrash size={16} />
                              </ActionIcon>
                            </Group>
                          </Table.Td>
                        </>
                      )}
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}
          </Card>
        </AppShell.Main>
      </AppShell>

      {/* Delete Confirmation Modal */}
      <Modal 
        opened={deleteModal.opened} 
        onClose={() => setDeleteModal({ opened: false, categoryId: null, categoryName: '' })}
        title={<Group><IconAlertCircle color="red" /><Text>Delete Category</Text></Group>}
      >
        <Text mb="xl">
          Are you sure you want to delete the category "{deleteModal.categoryName}"?
          This action cannot be undone.
        </Text>
        <Group position="right">
          <Button 
            variant="outline" 
            onClick={() => setDeleteModal({ opened: false, categoryId: null, categoryName: '' })}
          >
            Cancel
          </Button>
          <Button 
            color="red" 
            onClick={confirmDeleteCategory}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </AuthGuard>
  );
} 