'use client';

import { getBlogs } from '@/api/blogs.mjs';
import { getAllFavoriteCounts } from '@/api/favorites.mjs';
import { useDeleteBlog, useToggleFeatured } from '@/hooks/mutations';
import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Group,
  Pagination,
  rem,
  Switch,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconEdit, IconSearch, IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';

const LIMIT = 10;

const AllBlogs = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');

  const [debouncedTitle] = useDebouncedValue(searchTitle, 300);
  const [debouncedCategory] = useDebouncedValue(searchCategory, 300);
  const [debouncedAuthor] = useDebouncedValue(searchAuthor, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedTitle, debouncedCategory, debouncedAuthor]);

  const { data, isLoading } = useQuery({
    queryKey: [
      'adminBlogs',
      page,
      debouncedTitle,
      debouncedCategory,
      debouncedAuthor,
    ],
    queryFn: () =>
      getBlogs({
        page,
        limit: LIMIT,
        search: debouncedTitle,
        category: debouncedCategory,
        author: debouncedAuthor,
      }),
    placeholderData: (prev) => prev,
  });

  const { data: favCounts } = useQuery({
    queryKey: ['favoriteCounts'],
    queryFn: getAllFavoriteCounts,
  });

  // Use optimistic mutation hooks with current query params
  const queryParams = {
    page,
    title: debouncedTitle,
    category: debouncedCategory,
    author: debouncedAuthor,
  };

  const { mutate: deleteMutate } = useDeleteBlog(queryParams);
  const { mutate: toggleFeat } = useToggleFeatured(queryParams);

  if (isLoading) {
    return <TableSkeleton rows={5} columns={7} />;
  }

  const blogs = data?.blogs || [];

  const rows = blogs.map((item) => (
    <Table.Tr key={item._id} className="!text-center">
      <Table.Td>
        <Group gap="sm">
          <Avatar size={44} src={item.blogPicUrl} radius={'lg'} />
          <Text fz="sm" fw={500} lineClamp={1} className="!max-w-[300px]">
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
            onClick={() => router.push(`/admin/edit-blog/${item._id}`)}
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
      <Group mb="sm" justify="space-between">
        <Text fw={500} c="dimmed">
          {data?.total || 0} blog{data?.total !== 1 ? 's' : ''} total
        </Text>
      </Group>
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
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={7}>
                  <Text ta="center" c="dimmed" py="md">
                    No blogs found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {(data?.totalPages || 0) > 1 && (
        <Pagination
          className="glass-pagination"
          total={data.totalPages}
          value={page}
          onChange={setPage}
          mt="md"
        />
      )}
    </>
  );
};

export default AllBlogs;
