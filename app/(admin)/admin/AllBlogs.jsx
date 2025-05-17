'use client';

import { getCategories } from '@/services/categoriesService';
import { getPosts } from '@/services/postsService';
import {
    ActionIcon,
    Anchor,
    Avatar,
    Badge,
    Center,
    Group,
    rem,
    Table,
    Text,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categoryColors, setCategoryColors] = useState({});
  
  // Load blogs and category colors
  const loadData = () => {
    // Get posts from the postsService which reads from localStorage
    const allBlogs = getPosts();
    setBlogs(allBlogs);
    
    // Get categories for colors
    const categories = getCategories();
    const colorMap = {};
    categories.forEach(cat => {
      colorMap[cat.name] = cat.color;
    });
    setCategoryColors(colorMap);
  };
  
  useEffect(() => {
    loadData();
    
    // Set up an interval to refresh data every 5 seconds to catch changes from category updates
    const refreshInterval = setInterval(() => {
      loadData();
    }, 5000);
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  const getCategoryColor = (category) => {
    return categoryColors[category] || '#777777';
  };
  
  const rows = blogs?.map((item) => (
    <Table.Tr key={item.id || item.title} className="!text-center">
      <Table.Td>
        <Group gap="sm">
          <Avatar size={80} src={item.authorAvatar} radius={'lg'} />
          <Text fz="md" fw={500} lineClamp={1} className="!max-w-[600px]">
            {item.title}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge
          color={getCategoryColor(item.category)}
          variant="light"
          className="!min-w-[100px]"
        >
          {item.category || 'Uncategorized'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm" className="!min-w-[100px]">
          {item.authorName}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Center>
          <Avatar size={40} src={item.authorAvatar} radius={30} />
        </Center>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.publishDate}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon 
            variant="subtle" 
            color="gray"
            component="a"
            href={`/admin/posts/edit/${item.id}`}
          >
            <IconPencil
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
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
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="!text-center">Blog Details</Table.Th>
            <Table.Th className="!text-center">Category</Table.Th>
            <Table.Th className="!text-center">Author</Table.Th>
            <Table.Th className="!text-center">Author Img</Table.Th>
            <Table.Th className="!text-center">Publish Date</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default AllBlogs;
