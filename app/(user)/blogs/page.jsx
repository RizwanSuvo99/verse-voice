'use client';

import { useBlogs, useSiteSettings } from '@/hooks/queries';
import BlogGridSkeleton from '@/components/Skeletons/BlogGridSkeleton';
import {
  Container,
  Group,
  Pagination,
  Select,
  SimpleGrid,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch, IconSortDescending } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import SingleBlog from './SingleBlog';

const SORT_OPTIONS = [
  { value: 'createdAt:desc', label: 'Newest First' },
  { value: 'createdAt:asc', label: 'Oldest First' },
  { value: 'title:asc', label: 'Title A-Z' },
  { value: 'title:desc', label: 'Title Z-A' },
];

const Blogs = () => {
  const [activePage, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortValue, setSortValue] = useState('createdAt:desc');

  const [debouncedSearch] = useDebouncedValue(search, 300);

  const { data: settings } = useSiteSettings();
  const categories = settings?.categories?.map((c) => c.name) || [];

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, sortValue]);

  const [sort, order] = sortValue.split(':');

  const { data, isLoading } = useBlogs({
    page: activePage,
    limit: 6,
    search: debouncedSearch,
    category,
    sort,
    order,
  });

  return (
    <Container size={1500} className="!pt-[24px]">
      <Text
        component={Title}
        variant="gradient"
        className="!text-center !text-[24px] !leading-[36px] md:!text-[28px]"
      >
        All Blogs
      </Text>
      <Text
        c="dimmed"
        className="!mb-4 !mt-1 !text-center !text-[13px] md:!text-[14px]"
      >
        Discover stories, ideas, and insights
      </Text>

      {/* Search and Filter Controls */}
      <Group mb="lg" grow preventGrowOverflow={false} wrap="wrap">
        <TextInput
          placeholder="Search blogs..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="!min-w-[200px] !flex-[2]"
        />
        <Select
          placeholder="All Categories"
          data={categories}
          value={category}
          onChange={setCategory}
          clearable
          className="!min-w-[150px] !flex-1"
        />
        <Select
          placeholder="Sort by"
          data={SORT_OPTIONS}
          value={sortValue}
          onChange={setSortValue}
          leftSection={<IconSortDescending size={16} />}
          className="!min-w-[150px] !flex-1"
        />
      </Group>

      {/* Results count */}
      {!isLoading && (
        <Text c="dimmed" size="sm" mb="md">
          {data?.total || 0} blog{data?.total !== 1 ? 's' : ''} found
          {debouncedSearch && ` for "${debouncedSearch}"`}
          {category && ` in ${category}`}
        </Text>
      )}

      {isLoading ? (
        <BlogGridSkeleton count={6} />
      ) : data?.blogs?.length > 0 ? (
        <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
          {data.blogs.map((blog) => (
            <SingleBlog blog={blog} key={blog._id} />
          ))}
        </SimpleGrid>
      ) : (
        <Text ta="center" c="dimmed" py="xl">
          No blogs found. Try adjusting your search or filters.
        </Text>
      )}

      <Space h="md" />
      {(data?.totalPages || 0) > 1 && (
        <Pagination
          total={data.totalPages}
          value={activePage}
          onChange={setPage}
          className="glass-pagination"
        />
      )}
    </Container>
  );
};

export default Blogs;
