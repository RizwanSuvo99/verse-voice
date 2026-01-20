'use client';

import { getBlogs } from '@/api/blogs.mjs';
import { deleteBlog, toggleFeatured } from '@/api/adminBlogs.mjs';
import { getAllFavoriteCounts } from '@/api/favorites.mjs';
import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Center,
  Group,
  Loader,
  rem,
  Switch,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconSearch, IconTrash } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

const AllBlogs = ({ setActiveView, setEditBlog }) => {
  const queryClient = useQueryClient();
  const [searchTitle, setSearchTitle] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['adminBlogs'],
    queryFn: () => getBlogs({ limit: 100 }),
  });

  const { data: favCounts } = useQuery({
    queryKey: ['favoriteCounts'],
    queryFn: getAllFavoriteCounts,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogs'] });
      notifications.show({ title: 'Blog deleted', color: 'green' });
    },
    onError: (err) => {
      notifications.show({
        title: err?.response?.data?.message || 'Failed to delete blog',
        color: 'red',
      });
    },
  });

  const { mutate: toggleFeat } = useMutation({
    mutationFn: toggleFeatured,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogs'] });
    },
  });

  const filteredBlogs = useMemo(() => {
    if (!data?.blogs) return [];
    return data.blogs.filter((item) => {
      const titleMatch = !searchTitle || item.title.toLowerCase().includes(searchTitle.toLowerCase());
      const categoryMatch = !searchCategory || item.category.toLowerCase().includes(searchCategory.toLowerCase());
      const authorMatch = !searchAuthor || (item.createdBy?.name || '').toLowerCase().includes(searchAuthor.toLowerCase());
      return titleMatch && categoryMatch && authorMatch;
    });
  }, [data?.blogs, searchTitle, searchCategory, searchAuthor]);

  if (isLoading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  const rows = filteredBlogs.map((item) => (
    <Table.Tr key={item._id} className="!text-center">
      <Table.Td>
        <Group gap="sm">
          <Avatar size={60} src={item.blogPicUrl} radius={'lg'} />
          <Text fz="md" fw={500} lineClamp={1} className="!max-w-[300px]">
            {item.title}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" className="!min-w-[80px]">
          {item.category}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {item.createdBy?.name}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">
          {item.publishDate ? dayjs(item.publishDate).format('D MMM YYYY') : ''}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{favCounts?.[item._id] || 0}</Text>
      </Table.Td>
      <Table.Td>
        <Switch
          checked={item.isFeatured}
          onChange={() => toggleFeat(item._id)}
          size="sm"
        />
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => {
              setEditBlog(item);
              setActiveView('Edit Blog');
            }}
          >
            <IconEdit
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => deleteMutate(item._id)}
          >
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Group mb="md" grow>
        <TextInput
          placeholder="Search by title..."
          leftSection={<IconSearch size={16} />}
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <TextInput
          placeholder="Search by category..."
          leftSection={<IconSearch size={16} />}
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
        <TextInput
          placeholder="Search by author..."
          leftSection={<IconSearch size={16} />}
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
      </Group>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Blog</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Author</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Favorites</Table.Th>
              <Table.Th>Featured</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? rows : (
              <Table.Tr>
                <Table.Td colSpan={7}>
                  <Text ta="center" c="dimmed" py="md">No blogs found</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
};

export default AllBlogs;
