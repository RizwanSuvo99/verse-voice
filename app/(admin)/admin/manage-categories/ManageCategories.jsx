'use client';

import { getSettings } from '@/api/siteSettings.mjs';
import { useAddCategory, useUpdateCategory, useDeleteCategory } from '@/hooks/mutations';
import FormSkeleton from '@/components/Skeletons/FormSkeleton';
import { OptimizedImage } from '@/components/ui';
import {
  ActionIcon,
  Badge,
  Button,
  FileInput,
  Group,
  Space,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core';
import { toast } from 'sonner';
import { modals } from '@mantine/modals';
import { IconEdit, IconFileCv, IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const ManageCategories = () => {
  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [editingCat, setEditingCat] = useState(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState(null);

  const { data: settings, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  // Use optimistic mutation hooks
  const { mutate: addMutate, isPending } = useAddCategory({
    onSuccess: () => {
      setNewName('');
      setNewImage(null);
    },
  });

  const { mutate: updateMutate, isPending: isUpdating } = useUpdateCategory({
    onSuccess: () => {
      setEditingCat(null);
      setEditImage(null);
    },
  });

  const { mutate: deleteMutate } = useDeleteCategory();

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
            style={{ opacity: cat._isOptimistic ? 0.7 : 1 }}
            leftSection={
              cat.image ? (
                <OptimizedImage
                  src={cat.image}
                  alt={cat.name}
                  width={20}
                  height={20}
                  style={{ objectFit: 'cover', borderRadius: 'var(--mantine-radius-sm)' }}
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
                  onClick={() =>
                    modals.openConfirmModal({
                      title: 'Delete Category',
                      children: 'Are you sure you want to delete this category? This action cannot be undone.',
                      labels: { confirm: 'Delete', cancel: 'Cancel' },
                      confirmProps: { color: 'red' },
                      onConfirm: () => deleteMutate(cat.name),
                    })
                  }
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
