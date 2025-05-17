'use client';

import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';
import { AuthGuard } from '@/components/admin/layout/AuthGuard';
import { ActionIcon, AppShell, Button, Card, ColorInput, Group, Stack, Table, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconDeviceFloppy, IconEdit, IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import { useState } from 'react';

// Mock data for categories
const mockCategories = [
  { id: 1, name: 'Technology', slug: 'technology', posts: 15, color: '#3498db' },
  { id: 2, name: 'Lifestyle', slug: 'lifestyle', posts: 8, color: '#e74c3c' },
  { id: 3, name: 'Business', slug: 'business', posts: 5, color: '#2ecc71' },
  { id: 4, name: 'Health', slug: 'health', posts: 7, color: '#9b59b6' },
];

export default function CategoriesPage() {
  const [opened, { toggle }] = useDisclosure();
  const [categories, setCategories] = useState(mockCategories);
  const [editingId, setEditingId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      slug: '',
      color: '#1c7ed6',
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
    },
    validate: {
      name: (value) => (value.length < 3 ? 'Name must be at least 3 characters' : null),
      slug: (value) => (value.length < 3 ? 'Slug must be at least 3 characters' : null),
    },
  });

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleEditCategory = (category) => {
    setEditingId(category.id);
    form.setValues({
      name: category.name,
      slug: category.slug,
      color: category.color,
    });
  };

  const handleSaveEdit = () => {
    if (form.validate().hasErrors) return;

    setCategories(categories.map(category => 
      category.id === editingId 
        ? { ...category, ...form.values }
        : category
    ));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    form.reset();
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
  };

  const handleSaveNew = () => {
    if (newCategoryForm.validate().hasErrors) return;
    
    const newCategory = {
      id: Date.now(), // Generate a unique ID
      name: newCategoryForm.values.name,
      slug: newCategoryForm.values.slug,
      color: newCategoryForm.values.color,
      posts: 0,
    };
    
    setCategories([...categories, newCategory]);
    setIsAddingNew(false);
    newCategoryForm.reset();
  };

  const handleCancelNew = () => {
    setIsAddingNew(false);
    newCategoryForm.reset();
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
              <Button leftSection={<IconPlus size={16} />} onClick={handleAddNew}>
                Add Category
              </Button>
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

            <Table verticalSpacing="sm" withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Slug</Table.Th>
                  <Table.Th>Posts</Table.Th>
                  <Table.Th>Color</Table.Th>
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
          </Card>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 