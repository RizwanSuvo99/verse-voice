'use client';

import { Flex, Group, Image, Text } from '@mantine/core';
import {
  IconAddressBook,
  IconArticle,
  IconCategoryPlus,
  IconEdit,
  IconFileText,
  IconFlag,
  IconHome,
  IconInfoCircle,
  IconLogout,
  IconMail,
  IconNews,
  IconPencilPlus,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocalStorage } from '@mantine/hooks';
import { useComputedColorScheme } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getSettings } from '@/api/siteSettings.mjs';
import classes from './NavbarSimpleColored.module.css';
import ThemeToggle from '@/components/Header/ThemeToggle';

const data = [
  { label: 'Create Blog', href: '/admin/create-blog', icon: IconPencilPlus },
  { label: 'All Blogs', href: '/admin/all-blogs', icon: IconArticle },
  { label: 'Blog Requests', href: '/admin/blog-requests', icon: IconFileText },
  { label: 'Comment Reports', href: '/admin/comment-reports', icon: IconFlag },
  { label: 'Customize Hero', href: '/admin/customize-hero', icon: IconEdit },
  { label: 'Customize Footer', href: '/admin/customize-footer', icon: IconEdit },
  { label: 'Customize About', href: '/admin/customize-about', icon: IconInfoCircle },
  { label: 'Customize Contact', href: '/admin/customize-contact', icon: IconAddressBook },
  { label: 'Manage Categories', href: '/admin/manage-categories', icon: IconCategoryPlus },
  { label: 'Contact Messages', href: '/admin/contact-messages', icon: IconMail },
  { label: 'Newsletter', href: '/admin/newsletter', icon: IconNews },
];

const AdminNavbar = ({ onNavClick }) => {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useComputedColorScheme('dark');
  const { data: siteSettings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });
  const [, setToken] = useLocalStorage({ key: 'token', defaultValue: null });
  const [, setIsLoggedIn] = useLocalStorage({
    key: 'isLoggedIn',
    defaultValue: false,
  });

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    router.push('/');
  };

  const isActive = (href) => {
    if (href === '/admin/create-blog' && pathname === '/admin') return true;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={isActive(item.href) || undefined}
      href={item.href}
      key={item.label}
      onClick={onNavClick}
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
              alt="site-logo"
              src={siteSettings?.siteLogo || (colorScheme === 'dark' ? '/assets/logo-white.svg' : '/assets/logo.svg')}
              h={36}
            />
            <Text fw={600} c="var(--text-primary)">
              Admin Panel
            </Text>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <ThemeToggle />
          </div>
          <Link href="/" className={classes.link} onClick={onNavClick}>
            <IconHome className={classes.linkIcon} stroke={1.5} />
            <span>Go to Main Site</span>
          </Link>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              handleLogout();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </div>
    </Flex>
  );
};

export default AdminNavbar;
