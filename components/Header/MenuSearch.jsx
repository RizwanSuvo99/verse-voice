import { Group, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import ThemeToggle from './ThemeToggle';

const MenuSearch = () => {
  return (
    <Group>
      <Input placeholder="Your email" leftSection={<IconSearch size={16} />} />
      <ThemeToggle />
    </Group>
  );
};

export default MenuSearch;
