'use client';

import { Flex, Group, Image, Text } from '@mantine/core';
import {
  IconAddressBook,
  IconArticle,
  IconCategoryPlus,
  IconEdit,
  IconFileText,
  IconInfoCircle,
  IconLogout,
  IconMail,
  IconNews,
  IconPencilPlus,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@mantine/hooks';
import classes from './NavbarSimpleColored.module.css';

const data = [
  { label: 'Create Blog', icon: IconPencilPlus },
  { label: 'All Blogs', icon: IconArticle },
  { label: 'Blog Requests', icon: IconFileText },
  { label: 'Customize Hero', icon: IconEdit },
  { label: 'Customize Footer', icon: IconEdit },
  { label: 'Customize About', icon: IconInfoCircle },
  { label: 'Customize Contact', icon: IconAddressBook },
  { label: 'Manage Categories', icon: IconCategoryPlus },
  { label: 'Contact Messages', icon: IconMail },
  { label: 'Newsletter', icon: IconNews },
];

const AdminNavbar = ({ activeView, setActiveView }) => {
  const router = useRouter();
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

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === activeView || undefined}
      href="#"
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActiveView(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
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
