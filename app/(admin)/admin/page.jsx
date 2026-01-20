'use client';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import CreateBlog from './CreateBlog';
import AllBlogs from './AllBlogs';
import EditBlog from './EditBlog';
import BlogRequests from './BlogRequests';
import CustomizeHero from './CustomizeHero';
import CustomizeFooter from './CustomizeFooter';
import CustomizeAbout from './CustomizeAbout';
import CustomizeContact from './CustomizeContact';
import ManageCategories from './ManageCategories';
import ContactMessages from './ContactMessages';
import NewsletterSubs from './NewsletterSubs';

const AdminDashboard = () => {
  const [opened, { toggle }] = useDisclosure();
  const [activeView, setActiveView] = useState('Create Blog');
  const [editBlog, setEditBlog] = useState(null);

  const renderView = () => {
    switch (activeView) {
      case 'Create Blog':
        return <CreateBlog />;
      case 'All Blogs':
        return <AllBlogs setActiveView={setActiveView} setEditBlog={setEditBlog} />;
      case 'Edit Blog':
        return <EditBlog blog={editBlog} setActiveView={setActiveView} />;
      case 'Blog Requests':
        return <BlogRequests />;
      case 'Customize Hero':
        return <CustomizeHero />;
      case 'Customize Footer':
        return <CustomizeFooter />;
      case 'Customize About':
        return <CustomizeAbout />;
      case 'Customize Contact':
        return <CustomizeContact />;
      case 'Manage Categories':
        return <ManageCategories />;
      case 'Contact Messages':
        return <ContactMessages />;
      case 'Newsletter':
        return <NewsletterSubs />;
      default:
        return <CreateBlog />;
    }
  };

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
        <AdminNavbar activeView={activeView} setActiveView={setActiveView} />
      </AppShell.Navbar>

      <AppShell.Main>{renderView()}</AppShell.Main>
    </AppShell>
  );
};

export default AdminDashboard;
