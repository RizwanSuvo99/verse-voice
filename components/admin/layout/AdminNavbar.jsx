'use client';

import { useAuth } from '@/hooks/useAuth';
import { Divider, Flex, Group, Image, Text, UnstyledButton } from '@mantine/core';
import {
  IconArticle,
  IconCategoryPlus,
  IconDashboard,
  IconLayoutDashboard,
  IconLogout,
  IconPencilPlus,
  IconPhoto,
  IconSettings,
  IconUsers
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from '../../../app/(admin)/admin/NavbarSimpleColored.module.css';

// Navigation items with proper routes
const navItems = [
  { path: '/admin', label: 'Dashboard', icon: IconDashboard, exact: true },
  { path: '/admin/posts', label: 'Posts', icon: IconArticle },
  { path: '/admin/posts/new', label: 'Create Post', icon: IconPencilPlus },
  { path: '/admin/categories', label: 'Categories', icon: IconCategoryPlus },
  { path: '/admin/hero', label: 'Edit Hero', icon: IconLayoutDashboard },
  { path: '/admin/media', label: 'Media Library', icon: IconPhoto },
  { path: '/admin/users', label: 'Users', icon: IconUsers },
  { path: '/admin/settings', label: 'Settings', icon: IconSettings },
];

export function AdminNavbar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  // Check if the current path matches a nav item
  const isActive = (path, exact = false) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  // Create navigation links
  const links = navItems.map((item) => (
    <Link 
      href={item.path} 
      key={item.label}
      className={classes.link}
      data-active={isActive(item.path, item.exact) || undefined}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Flex>
      <div className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Image
              alt="classRoomWriters-logo"
              src="/assets/logo-white.svg"
              h={60}
            />
            <Text fw={600} c={'white'}>
              Admin Panel
            </Text>
          </Group>
          
          {links}
        </div>

        <div className={classes.footer}>
          {user && (
            <div className="py-2 px-4 mb-3">
              <Text size="xs" c="dimmed">
                Logged in as:
              </Text>
              <Text fw={500} c="white" size="sm">
                {user.name || user.email}
              </Text>
            </div>
          )}
          
          <Divider color="rgba(255, 255, 255, 0.1)" mb="sm" />
          
          <UnstyledButton
            className={classes.link}
            onClick={logout}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </UnstyledButton>
        </div>
      </div>
    </Flex>
  );
} 