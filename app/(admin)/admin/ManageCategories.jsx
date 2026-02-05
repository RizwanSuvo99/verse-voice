'use client';

import {
  getSettings,
  addCategory,
  updateCategory,
  deleteCategory,
} from '@/api/siteSettings.mjs';
import FormSkeleton from '@/components/Skeletons/FormSkeleton';
import {
  ActionIcon,
  Badge,
  Button,
  FileInput,
  Group,
  Image,
  Space,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core';
import { toast } from 'sonner';
import { IconEdit, IconFileCv, IconTrash } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const ManageCategories = () => {
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [editingCat, setEditingCat] = useState(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState(null);

  const { data: settings, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  const { mutate: addMutate, isPending } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      toast.success('Category added!');
      setNewName('');
      setNewImage(null);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to add');
    },
  });

  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      toast.success('Category updated!');
      setEditingCat(null);
      setEditImage(null);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to update');
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      toast.info('Category deleted');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to delete');
    },
  });

  const handleAdd = () => {
    if (!newName.trim()) {
      toast.error('Category name is required');
      return;
    }
    if (!newImage) {
      toast.error('Category image is required');
      return;
    }
    const formData = new FormData();
    formData.append('name', newName);
    formData.append('categoryImage', newImage);
    addMutate(formData);
  };

  const handleStartEdit = (cat) => {
    setEditingCat(cat.name);
    setEditName(cat.name);
    setEditImage(null);
  };

  const handleSaveEdit = () => {
    const formData = new FormData();
    formData.append('name', editName);
    if (editImage) {
      formData.append('categoryImage', editImage);
    }
    updateMutate({ oldName: editingCat, formData });
  };

  const icon = (
    <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  if (isLoading) {
    return <FormSkeleton fields={2} />;
  }

  return (
    <div>
      <Text component={Title} variant="gradient" className="!mb-4 !text-lg">
        Manage Categories
      </Text>

      <Group mb="lg" align="flex-end">
        <TextInput
          label="Category Name"
          placeholder="Category Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <FileInput
          label="Category Image"
          leftSection={icon}
          placeholder="Select image"
          clearable
          value={newImage}
          onChange={setNewImage}
          accept="image/png,image/jpeg,image/jpg"
        />
        <Button variant="gradient" loading={isPending} onClick={handleAdd}>
          Add Category
        </Button>
      </Group>

      {editingCat && (
        <>
          <Text fw={600} mb="xs">
            Editing: {editingCat}
          </Text>
          <Group mb="lg" align="flex-end">
            <TextInput
              label="New Name"
              placeholder="New name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <FileInput
              label="New Image (optional)"
              leftSection={icon}
              placeholder="Select new image"
              clearable
              value={editImage}
              onChange={setEditImage}
              accept="image/png,image/jpeg,image/jpg"
            />
            <Button
              variant="filled"
              loading={isUpdating}
              onClick={handleSaveEdit}
            >
              Save
            </Button>
            <Button variant="default" onClick={() => setEditingCat(null)}>
              Cancel
            </Button>
          </Group>
        </>
      )}

      <Space h="md" />

      <Group gap="md" wrap="wrap">
        {settings?.categories?.map((cat) => (
          <Badge
            key={cat.name}
            size="xl"
            variant="outline"
            leftSection={
              cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  w={20}
                  h={20}
                  radius="sm"
                  style={{ objectFit: 'cover' }}
                />
              ) : null
            }
            rightSection={
              <Group gap={2}>
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  size="sm"
                  onClick={() => handleStartEdit(cat)}
                >
                  <IconEdit size={14} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  size="sm"
                  onClick={() => deleteMutate(cat.name)}
                >
                  <IconTrash size={14} />
                </ActionIcon>
              </Group>
            }
          >
            {cat.name}
          </Badge>
        ))}
      </Group>
    </div>
  );
};

export default ManageCategories;
