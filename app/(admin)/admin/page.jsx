'use client';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AdminNavbar from './AdminNavbar';
import CreateBlog from './CreateBlog';

const AdminDashboard = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AdminNavbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <CreateBlog />
        {/* <AllBlogs /> */}
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminDashboard;
